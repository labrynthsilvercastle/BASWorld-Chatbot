import { useState, useEffect } from "react";
import { addDoc, collection, query, where, onSnapshot, orderBy, serverTimestamp } from "firebase/firestore";

const Chat = ({ userEmail, recipient, db }) => {
  const [myMessage, setMyMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (userEmail && recipient) {
      const q = query(
          collection(db, "messages"),
          where("to", "in", [recipient, userEmail]),
          where("from", "in", [recipient, userEmail]),
          orderBy("timestamp")
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const newMessages = snapshot.docs.map((doc) => doc.data());
        setMessages(newMessages);
      });

      return () => unsubscribe();
    }
  }, [userEmail, recipient, db]);

  const onSend = async () => {
    if (myMessage.trim() !== "") {
      await addDoc(collection(db, "messages"), {
        from: userEmail,
        to: recipient,
        message: myMessage,
        timestamp: serverTimestamp(),
      });
      setMyMessage("");
    }
    console.log(myMessage);
  };

  return (
      <div className="flex flex-col flex-1 h-full">
        <div className="bg-blue-500 text-white p-3 text-center">
          Chat with {recipient}
        </div>
        <div className="flex-1 p-3 overflow-y-auto bg-gray-50 max-h-full">
          {messages.map((message, key) => (
              <div
                  key={key}
                  className={`mb-3 p-2 rounded-lg max-w-xs ${
                      userEmail === message.from ? "bg-blue-500 text-white self-end ml-auto" : "bg-gray-200 text-black self-start mr-auto"
                  }`}
              >
                <div className="flex flex-col">
                  <span className="font-bold">{message.from}</span>
                  <p>{message.message}</p>
                </div>
              </div>
          ))}
        </div>
        <div className="flex p-3 border-t bg-white">
          <input
              value={myMessage}
              onChange={(e) => setMyMessage(e.target.value)}
              onKeyUp={(e) => e.key === "Enter" && onSend()}
              type="text"
              placeholder="Type a message"
              className="flex-1 p-2 border rounded-l-lg"
          />
          <button
              onClick={onSend}
              className="p-2 bg-blue-500 text-white rounded-r-lg"
          >
            Send
          </button>
        </div>
      </div>
  );
};

export default Chat;
