import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  serverTimestamp,
  query,
} from "firebase/firestore";
import { askQuestion, handleVirusTotalCheck, sentQuestion } from "../apis/ChatService.js";
import jwtDecode from "jwt-decode";

const firebaseConfig = {
  apiKey: "AIzaSyA5LK-DFogzAOVCVkvinUgg4216B2Ybbfw",
  authDomain: "basworld-chat.firebaseapp.com",
  projectId: "basworld-chat",
  storageBucket: "basworld-chat.appspot.com",
  messagingSenderId: "233207142389",
  appId: "1:233207142389:web:a01f860e329ecf83fe32bc",
  measurementId: "G-3DWZSDZNCY",
};

const MessageParser = ({ children, actions, employeeTakeover }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [virusTotalResult, setVirusTotalResult] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [role, setRole] = useState("");
  const [recipient, setRecipient] = useState("");
  const [messages, setMessages] = useState([]);
  const [db, setDb] = useState();
  const [lastMessageTimestamp, setLastMessageTimestamp] = useState(null); // Track last message timestamp
  const [lastAnswer, setLastAnswer] = useState(null);
  const [sameAnswerCount, setSameAnswerCount] = useState(0);
  const [myMessage, setMyMessage] = useState("");

  const getEmailFromToken = () => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      const decodedToken = jwtDecode(token);
      const { sub: email, roles } = decodedToken;
      const role = roles.includes("ADMIN")
          ? "ADMIN"
          : roles.includes("BUYER")
              ? "BUYER"
              : null;
      return { email, role };
    }
    return { email: "johndoe", role: "USER" };
  };

  useEffect(() => {
    if (employeeTakeover) {
      const user = getEmailFromToken();
      if (user) {
        const { email, role } = user;
        setUserEmail(email);
        setRole(role);
        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);
        setDb(db);
        setRecipient("admin@admin");
        const q = query(
            collection(db, "messages"),
            orderBy("timestamp")
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
          const newMessages = snapshot.docs.map((doc) => doc.data());
          setMessages(newMessages);
          if (newMessages.length > 0) {
            const latestMessage = newMessages[newMessages.length - 1];
            if (latestMessage.to === email && (!lastMessageTimestamp || latestMessage.timestamp > lastMessageTimestamp)) {
              actions.handleQuestion(latestMessage.message);
              setLastMessageTimestamp(latestMessage.timestamp);
            }
          }
        });

        return () => unsubscribe();
      }
    }
  }, [employeeTakeover, actions]);

  const sendMessage = async (message) => {
    if (employeeTakeover && message.trim() !== "" && db && userEmail && recipient) {
      await addDoc(collection(db, "messages"), {
        from: userEmail,
        to: recipient,
        message: message,
        timestamp: serverTimestamp(),
      });
    }
  };

  const handleVirus = async (url) => {
    try {
      setLoading(true);
      setError(null);
      const result = await handleVirusTotalCheck(url);
      setVirusTotalResult(result);
      setLoading(false);

      if (result.data.malicious > 0) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      setLoading(false);
      setError(error.message);
      setVirusTotalResult(null);
      return false;
    }
  };

  const parse = async (message) => {
    const urls = message.match(/\bhttps?:\/\/\S+/gi);
    if (urls) {
      for (const url of urls) {

        try {
          let isMalicious = await handleVirus(url);
          if (isMalicious) {
            message = "deleted message";
            actions.handleLink();
          }
          else{
            if (employeeTakeover) {
              sendMessage(message);
            }
          }
          console.log(isMalicious)
        } catch (error) {
          console.error("Error checking VirusTotal:", error);
        }
      }
    } else {
      if (employeeTakeover) {
        sendMessage(message);
      }
      else {
        console.log(localStorage.getItem("jwtToken"));
        const que = await askQuestion(
            message,
            localStorage.getItem("jwtToken")
        );
        if (que.answer === lastAnswer) {
          setSameAnswerCount((prevCount) => prevCount + 1);
          console.log(sameAnswerCount);
          if (sameAnswerCount === 1) {
            console.log("Takeover!");
            actions.handleCustomerSupport();
            return;
          }
        } else {
          setSameAnswerCount(0);
          setLastAnswer(que.answer);
        }

        actions.handleQuestion(que.answer);
        if (!employeeTakeover) {
          sentQuestion(message);
        }
      }
    }
  };

  return (
      <div>
        {React.Children.map(children, (child) => {
          return React.cloneElement(child, {
            parse: parse,
            actions,
          });
        })}
      </div>
  );
};

export default MessageParser;
