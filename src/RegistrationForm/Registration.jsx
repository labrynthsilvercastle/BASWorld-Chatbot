import React, { useState } from 'react';
import axios from 'axios';
import styles from "../RegistrationForm/Registration.module.css";
import logo from "../assets/logo-desktop.svg";
import Chatbot from "react-chatbot-kit";
import config from "../ChatbotDependencies/config.js";
import ActionProvider from "../ChatbotDependencies/ActionProvider.jsx";
import MessageParser from "../ChatbotDependencies/MessageParser.jsx";
import "./Chatbot.css"
import ToggleButton from "../ChatbotDependencies/ToggleButton.jsx";
import ChatbotComponent from "../ChatbotDependencies/ChatbotComponent.jsx";

const RegistrationForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [duplicatePassword, setDuplicatePassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [duplicatePasswordError, setDuplicatePasswordError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showChatbot, setShowChatbot] = useState(false);

    const passwordRegex = /^(?=.*\d)(?!.*\s).{8,}$/;

    const handleRegistration = async (e) => {
        e.preventDefault();

        setPasswordError('');
        setDuplicatePasswordError('');
        setSuccessMessage('');
        setErrorMessage('');

        if (password !== duplicatePassword) {
            setDuplicatePasswordError("Passwords don't match");
            return;
        }

        if (!password.match(passwordRegex)) {
            setPasswordError("Password must be at least 8 characters long and should not contain empty spaces.");
            setDuplicatePasswordError("Password must be at least 8 characters long and should not contain empty spaces.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/register', {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
            });

            setSuccessMessage('Registration successful');
            setFirstName('');
            setLastName('');
            setEmail('');
            setPassword('');
            setDuplicatePassword('');
        } catch (error) {
            console.error('Registration failed:', error.response.data);
            if (error.response.data.detail === "Invalid request" && error.response.data.errors && error.response.data.errors[0].error === "EMAIL_ALREADY_EXISTS") {
                setErrorMessage("Email already in use. Please use a different email address.");
            } else {
                setErrorMessage("Registration failed. Please try again later.");
            }
        }
    };
    const toggleChatbot = () => {
        setShowChatbot(!showChatbot);
    };

    return (
        <form onSubmit={handleRegistration} className={styles.mainPage}>
            <div className={styles.Form_Container}>
                <div className={styles.Logo}>
                    <img
                        src={logo}
                        alt="Basworld Logo"
                    />
                </div>
                <h3 className={styles.Example}>Register for a BAS World account.</h3>

                <div className={styles.Input_group}>
                    <div className={styles.Input_template}>
                        <p className={styles.Placeholder}>Name *</p>
                        <input
                            className={styles.Input_name}
                            type="text"
                            placeholder="Please enter your first name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div className={styles.Input_template}>
                        <p className={styles.Placeholder}>Last Name *</p>
                        <input
                            className={styles.Input_name}
                            type="text"
                            placeholder="Please enter your last name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                </div>
                <div className={styles.Input_group_v_2}>
                    <div className={styles.Input_template}>
                        <p className={styles.Placeholder}>Email *</p>
                        <input
                            className={styles.Input_name_v2}
                            type="text"
                            placeholder="Please enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                </div>

                <div className={styles.Input_group_v_2}>
                    <div className={styles.Input_template}>
                        <p className={styles.Placeholder}>Password *</p>
                        <input
                            className={styles.Input_name_v2}
                            type="password"
                            placeholder="Please enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {passwordError && <p style={{color: 'red'}}>{passwordError}</p>}
                    </div>

                </div>

                <div className={styles.Input_group_v_2}>
                    <div className={styles.Input_template}>
                        <p className={styles.Placeholder}>Repeat Password *</p>
                        <input
                            className={styles.Input_name_v2}
                            type="password"
                            placeholder="Please repeat your password "
                            value={duplicatePassword}
                            onChange={(e) => setDuplicatePassword(e.target.value)}
                        />
                        {duplicatePasswordError && <p style={{color: 'red'}}>{duplicatePasswordError}</p>}
                        {successMessage && <p style={{color: 'green'}}>{successMessage}</p>}
                        {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}
                    </div>

                </div>
                <button className={styles.Register_button} type="submit">Register</button>
            </div>
            <div className="Chatbot_register">
                <div className="chatbot-wrapper">
                    <ToggleButton onClick={toggleChatbot}/>
                    <ChatbotComponent showChatbot={showChatbot}/>
                </div>
            </div>
        </form>


    );
};

export default RegistrationForm;
