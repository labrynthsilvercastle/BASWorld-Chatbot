// AuthenticationProvider.jsx
import React, { createContext, useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';

const AuthenticationContext = createContext();

export const useAuthentication = () => React.useContext(AuthenticationContext);
// this auth needs to be edited but works for now
export const AuthenticationProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const jwtToken = localStorage.getItem('jwtToken');
        if (jwtToken) {
            try {
                const decodedToken = jwtDecode(jwtToken);
                const { sub: email, roles: role } = decodedToken;
                setUser({ email, role });
                setIsAuthenticated(true);
                console.log(role)
            } catch (error) {
                console.error('Error decoding JWT token:', error);
                setIsAuthenticated(false);
            }
        } else {
            setIsAuthenticated(false);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
    }, [user]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <AuthenticationContext.Provider value={{ isAuthenticated, user }}>
            {children}
        </AuthenticationContext.Provider>
    );
};
