import React, { useState, useRef, useEffect } from 'react';
import { RxAvatar } from 'react-icons/rx';
import LoginForm from './LoginForm';
import Cookies from 'js-cookie';
import Details from "./Details.jsx";

const DropdownLoginForm = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('jwtToken'));
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsDropdownOpen(prevState => !prevState);
    };

    const handleLoginStatus = success => {
        if (success) {
            setIsAuthenticated(true);
            setIsDropdownOpen(false);
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
        <div className="relative">
            <button
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition duration-300"
                onClick={toggleDropdown}
            >
                <RxAvatar className="h-6 w-6" />
                <span>{isAuthenticated ? 'Logout' : 'Login'}</span>
            </button>
            {isDropdownOpen && (
                <div
                    ref={dropdownRef}
                    className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-md shadow-lg z-10 p-4"
                >
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

export default DropdownLoginForm;
