import React, { useState, useRef, useEffect } from 'react';
import { RxAvatar } from 'react-icons/rx';
import LoginForm from './LoginForm';
import Cookies from 'js-cookie';
import Details from "../LoginForm/Details.jsx";


const DropdownLoginMain = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('jwtToken'));
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsDropdownOpen(prevState => !prevState);
    };

    const handleLoginStatus = success => {
        if (success) {
            setIsAuthenticated(true);
            console.log('Redirecting after successful login...');
        } else {
            setIsAuthenticated(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('jwtToken');
        Cookies.remove('csrfToken');
        Cookies.remove('signedCsrfToken');
        setIsAuthenticated(false);
        console.log('Logged out successfully');
    };

    useEffect(() => {
        const handleClickOutside = event => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="Login_main">
            <button className={`LoginButton`} onClick={toggleDropdown}>
                <RxAvatar className="Avatar" />
                <span>{isAuthenticated ? 'Logout' : 'Login'}</span>
            </button>
            {isDropdownOpen && (
                <div ref={dropdownRef} className="DropdownContent">
                    {isAuthenticated ? (
                        <Details handleLogout={handleLogout} />
                    ) : (
                        <LoginForm onLogin={handleLoginStatus} />
                    )}
                </div>
            )}
        </div>
    );
};

export default DropdownLoginMain;
