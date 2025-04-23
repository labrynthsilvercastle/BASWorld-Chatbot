import React from "react";
import logo from "../assets/bw-logo.svg";
import "./Chatbot.css"

const BotAvatar = () => {


    return (
    <div>
        <img
            src={logo}
            alt="Basworld Logo"
            loading="lazy"
            className="avatar"
        />
    </div>
    );
}

export default BotAvatar;