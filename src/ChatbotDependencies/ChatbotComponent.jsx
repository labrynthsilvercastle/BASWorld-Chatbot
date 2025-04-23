import React from "react";
import Chatbot from "react-chatbot-kit";
import config from "../ChatbotDependencies/config.js";
import ActionProvider from "../ChatbotDependencies/ActionProvider.jsx";
import MessageParser from "../ChatbotDependencies/MessageParser.jsx";
import "./Chatbot.css";
import "react-chatbot-kit/build/main.css";
import { useState, useEffect } from "react";

const ChatbotComponent = ({ showChatbot, setShowChatbot }) => {
  let [employeeTakeover, setEmployeeTakeover] = useState(false);

  const toggleButton = () => {
    setShowChatbot(!showChatbot);
  };
  return (
    <div className="Chatbot_registe">
      {showChatbot && (
        <div className="chatbot-container">
          <button className="close-button" onClick={toggleButton}>
            ×
          </button>

          <Chatbot
            className="chatbot"
            config={config}
            actionProvider={(props) => (
              <ActionProvider
                {...props}
                setEmployeeTakeover={setEmployeeTakeover}
              />
            )}
            messageParser={(props) => (
              <MessageParser {...props} employeeTakeover={employeeTakeover} />
            )}
          />
        </div>
      )}
    </div>
  );
};

export default ChatbotComponent;
