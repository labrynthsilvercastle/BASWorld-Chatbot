import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthentication } from '../apis/AuthApi.jsx';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuthentication();

    if (!isAuthenticated) {
        return <Navigate to="/registration" />;
    }

    return children;
};

export default ProtectedRoute;