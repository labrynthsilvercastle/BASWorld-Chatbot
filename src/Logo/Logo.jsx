import React, { useState } from 'react';
import styles from './logo.module.css';
import logo from '../assets/bw-logo-text.svg';
import logobw from '../assets/bw-logo.svg';
import { useEffect } from 'react';
import DropdownLoginForm from "../LoginForm/Login.jsx"
import {RxAvatar} from "react-icons/rx";
import { Link } from "react-router-dom";
import Details from "../LoginForm/Details.jsx";
import LoginForm from "../LoginForm/LoginForm.jsx";

const Logo = () => {
    const [hideLogo, setHideLogo] = useState(false);
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [isAdmin, setIsAdmin] = useState(!!localStorage.getItem('jwtToken'));

    useEffect(() => {
        const timer = setTimeout(() => {
            setHideLogo(true);
        }, 3000);

        return () => {
            clearTimeout(timer);
        };

    }, []);

    useEffect(() => {
        if (hideLogo) {
            const logoImage = document.querySelector('.' + styles.logoImage);
            if (logoImage) {
                logoImage.classList.add(styles.hide);
            }
        }
    }, [hideLogo]);

    const toggleLoginForm = () => {
        setShowLoginForm(!showLoginForm);
    };

    return (
        <header className={styles.stickyHeader}>
            {isAdmin ? (
                <Link to="/dashboard">
                <button className={styles.bw_btn_black} >
                    <span>Support page</span>
                </button>
                </Link>
            ) : (
                <div>
                <button className="custom-navbar__button">
                    <span>Categories</span>
                </button>
                <button className="custom-navbar__button">
                <a href="/sell-your-vehicle" className={styles.bw_btn_black}>Start selling</a>
                </button>
                </div>
            )}

            <div className={styles.logoContainer}>
                <img
                    src={logobw}
                    alt="bw logo"
                    loading="lazy"
                />
                {!hideLogo && (
                    <img
                        src={logo}
                        alt="Basworld Logo"
                        loading="lazy"
                        className={`${styles.logoImage} ${hideLogo ? styles.hide : ''}`}
                    />
                )}
            </div>
            <div className="custom-navbar__right">
                <div className="custom-navbar__dropdown">
                    <DropdownLoginForm/>
                    {showLoginForm && (
                        <div className="dropdown-content">
                            <form>
                                <input type="text" placeholder="Username"/>
                                <input type="password" placeholder="Password"/>
                                <button type="submit">Login</button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Logo;
