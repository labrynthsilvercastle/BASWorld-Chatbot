import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const LoginForm = ({ onLogin }) => {
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
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form className="bg-white p-12 rounded-lg shadow-lg w-full h-full max-w-lg" onSubmit={handleLogin}>
        <h2 className="text-3xl font-bold mb-8 text-center">Login</h2>
        <div className="mb-8">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="email">Email</label>
          <input
            className="w-full px-5 py-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-8">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="password">Password</label>
          <div className="relative">
            <input
              className="w-full px-5 py-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 px-5 flex items-center text-gray-600"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>
        <div className="mb-6 text-right">
          <Link to="/Registration" className="text-blue-500 hover:text-blue-700">Create account?</Link>
        </div>
        {errorMessage && <p className="text-red-500 text-sm mb-6">{errorMessage}</p>}
        <button
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired
};

export default LoginForm;
