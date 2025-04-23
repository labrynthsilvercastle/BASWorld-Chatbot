import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import DropdownLoginForm from '../LoginForm/Login.jsx';
import { Link } from "react-router-dom";
import logo from "../assets/bw-logo-text.svg";

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">

                <Link to="/" className="flex items-center space-x-2">
                    <img src={logo} alt="Basworld Logo" loading="lazy" className="h-8"/>
                </Link>
                
                <div className="hidden md:flex space-x-6">
                    <Link to="/services" className="text-gray-700 hover:text-blue-600 transition duration-300">
                        Services
                    </Link>
                    <Link to="/about" className="text-gray-700 hover:text-blue-600 transition duration-300">
                        About
                    </Link>
                </div>

                <div className="flex items-center space-x-4">
                    <DropdownLoginForm />
                    <button onClick={toggleMobileMenu} className="md:hidden">
                        {isMobileMenuOpen ? <FaTimes className="text-gray-700"/> : <FaBars className="text-gray-700"/>}
                    </button>
                </div>
            </div>

            {isMobileMenuOpen && (
                <div className="md:hidden px-4 py-2 bg-white shadow-lg">
                    <Link to="/services" className="block text-gray-700 hover:text-blue-600 transition duration-300 py-2">Services</Link>
                    <Link to="/about" className="block text-gray-700 hover:text-blue-600 transition duration-300 py-2">About</Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
