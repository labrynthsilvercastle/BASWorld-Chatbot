import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import './Login.css';
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
const MainForm = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    };

    const handleLogin = async e => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/tokens', {
                email: email,
                password: password
            });


            const jwtToken = response.headers['jwt-token'];
            const csrfToken = response.headers['x-csrf-token'];
            const signedCsrfToken = response.headers['x-signed-csrf-token'];


            Cookies.set('csrfToken', csrfToken);
            Cookies.set('signedCsrfToken', signedCsrfToken);
            localStorage.setItem('jwtToken', jwtToken);

            onLogin(true);
        } catch (error) {
            console.error('Login failed:', error.response.data);
            setErrorMessage(error.response.data.message);
            onLogin(false);
        }
    };

    return (
        <div className="LoginForm">
            <form className="DropFormMain" onSubmit={handleLogin}>
                <p className="Placeholder">Email</p>
                <div className="EmailInput">
                    <input
                        className="Input_Placeholder"
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className="Wrapper">
                    <p className="Placeholder">Password</p>
                    <label className="Hide_Password">
                        Show Password
                        <input
                            className="Input_Placeholder_Check"
                            type="checkbox"
                            checked={showPassword}
                            onChange={togglePasswordVisibility}
                        />
                    </label>
                </div>
                <div className="PasswordInput">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>

                <Link to="/Registration" className="Custom_Register_Button">
                        Create account?
                    </Link>

                {errorMessage && <p className="ErrorMessage">{errorMessage}</p>}
                <button className="Login_button" type="submit">Login</button>
            </form>
        </div>
    );
};

MainForm.propTypes = {
    onLogin: PropTypes.func.isRequired
};

export default MainForm;
