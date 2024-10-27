import React, { useEffect, useState, createContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        fetch('/api/auth', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.auth) {
                    setIsLoggedIn(data.auth);
                    if (data.admin) {
                        setIsAdmin(true);
                    }
                }
            })
            .catch((error) => {
                console.error('Error fetching auth data:', error);
            });
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin }}>
            {children}
        </AuthContext.Provider>
    );
};
