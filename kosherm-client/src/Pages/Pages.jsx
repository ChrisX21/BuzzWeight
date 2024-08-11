import React, { useState, useEffect } from 'react';
import Home from './Home';
import Contacts from './Contacts';
import Login from './Login';
import Dashboard from './Dashboard';
import Users from './Users';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import NotFound from './NotFound';
import TrailerData from './TrailerData';
import CreateUser from './CreateUser';
import EditUser from './EditUser';

function Pages() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const isTokenValid = async () => {
            try {
                const response = await fetch('/api/auth');
                const data = await response.json();
                if (data.authenticated) {
                    setIsLoggedIn(true);
                    if (data.admin) {
                        setIsAdmin(true);
                    }
                }
            }
            catch (error) {
                console.error('Error validating token:', error);
            }
        };
        isTokenValid();
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/contacts" element={<Contacts />} />
                {!isLoggedIn && <Route path="/login" element={<Login />} />}
                {isLoggedIn && (
                    <>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/dashboard/:id" element={<TrailerData />} />
                    </>
                )}

                {isAdmin && (
                    <>
                        <Route path="/users" element={<Users />} />
                        <Route path='users/new/user' element={<CreateUser />} />
                        <Route path='users/edit/:id' element={<EditUser />} />
                    </>
                )}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}
export default Pages;