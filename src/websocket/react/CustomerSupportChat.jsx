import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import jwtDecode from "jwt-decode";
import Chat from "./Chat";

const firebaseConfig = {
  apiKey: "AIzaSyA5LK-DFogzAOVCVkvinUgg4216B2Ybbfw",
  authDomain: "basworld-chat.firebaseapp.com",
  projectId: "basworld-chat",
  storageBucket: "basworld-chat.appspot.com",
  messagingSenderId: "233207142389",
  appId: "1:233207142389:web:a01f860e329ecf83fe32bc",
  measurementId: "G-3DWZSDZNCY",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const getEmailFromToken = () => {
  const token = localStorage.getItem("jwtToken");
  if (token) {
    const decodedToken = jwtDecode(token);
    const { sub: email, roles } = decodedToken;
    const role = roles.includes("ADMIN") ? "ADMIN" : roles.includes("BUYER") ? "BUYER" : null;
    return { email, role };
  }
  return null;
};

function CustomerSupportChat() {
  const [userEmail, setUserEmail] = useState("");
  const [role, setRole] = useState("");
  const [recipient, setRecipient] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const user = getEmailFromToken();
    if (user) {
      const { email, role } = user;
      setUserEmail(email);
      setRole(role);
      setDoc(doc(db, "users", email), { email });

      if (role === "ADMIN") {
        const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
          const usersList = snapshot.docs.map((doc) => doc.data().email);
          setUsers(usersList);
        });

        return () => unsubscribe();
      } else if (role === "BUYER") {
        setRecipient("admin@admin");
      }
    }
  }, []);

  const handleRecipientSelect = (email) => {
    setRecipient(email);
    localStorage.setItem("recipient", email);
  };

  const handleDeleteChat = async (email) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete the chat with ${email}?`);
    if (confirmDelete) {
      await deleteDoc(doc(db, "users", email));
      setUsers(users.filter((user) => user !== email));
      if (recipient === email) {
        setRecipient("");
      }
    }
  };

  return (
      <div className="flex flex-col items-center justify-center p-5 h-screen">
        <h1 className="text-2xl font-bold mb-5">Customer Support Chat</h1>
        {userEmail ? (
            <div className="flex w-full max-w-5xl border border-gray-300 rounded-lg overflow-hidden h-5/6">
              {role === "ADMIN" ? (
                  <div className="w-64 bg-gray-100 border-r border-gray-300 p-5 overflow-y-auto">
                    <h2 className="text-lg font-semibold mb-3">Active chats</h2>
                    <ul className="space-y-2">
                      {users.map((user) => (
                          <li key={user} className="flex justify-between items-center p-2 border-b border-gray-300">
                    <span className="cursor-pointer flex-1" onClick={() => handleRecipientSelect(user)}>
                      {user}
                    </span>
                            <button
                                className="text-red-600 hover:text-red-800"
                                onClick={() => handleDeleteChat(user)}
                            >
                              🗑️
                            </button>
                          </li>
                      ))}
                    </ul>
                  </div>
              ) : (
                  <div className="w-64 bg-gray-100 border-r border-gray-300 p-5 overflow-y-auto">
                    <h2 className="text-lg font-semibold mb-3">FAQs</h2>
                    <ul className="space-y-2">
                      <li>How to reset my password?</li>
                      <li>How to update my profile?</li>
                      <li>How to contact support?</li>
                    </ul>
                    <h2 className="text-lg font-semibold mt-5 mb-3">Contact Information</h2>
                    <p>Email: support@company.com</p>
                    <p>Phone: 123-456-7890</p>
                  </div>
              )}
              <div className="flex-1 flex flex-col">
                <Chat userEmail={userEmail} recipient={recipient} db={db} />
              </div>
            </div>
        ) : (
            <p>Loading...</p>
        )}
      </div>
  );
}

export default CustomerSupportChat;
