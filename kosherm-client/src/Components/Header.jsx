import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { NavLink, Navigate } from 'react-router-dom';
import { TiThMenu } from 'react-icons/ti';
import { GiTreeBeehive } from "react-icons/gi";

function Header() {
    const [menuActive, setMenuActive] = useState(false);

    const logOut = async () => {
        if (window.confirm("Are you sure you want to Log out?")) {
            <Navigate to={"/"} />
            await fetch("/logout");
            window.location.reload();
        }
    }

    const toggleMenu = () => {
        setMenuActive(!menuActive);
    };

    const closeMenuOnResize = () => {
        if (window.innerWidth > 768) {
            setMenuActive(false);
        }
    };

    useEffect(() => {
        window.addEventListener('resize', closeMenuOnResize);
        return () => {
            window.removeEventListener('resize', closeMenuOnResize);
        };
    }, []);

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const isTokenValid = async () => {
            try {
                const response = await fetch('/auth');
                const data = await response.json();
                setIsLoggedIn(data.authenticated);
            } catch (error) {
                console.error('Error validating token:', error);
                setIsLoggedIn(false);
            }
        };
        isTokenValid();
    }, []);

    useEffect(() => {
        const isAdminUser = async () => {
            try {
                const response = await fetch('/admin');
                const data = await response.json();
                setIsAdmin(data.admin);
            } catch (error) {
                console.error('Error checking admin status:', error);
                setIsAdmin(false);
            }
        };
        if (isLoggedIn) {
            isAdminUser();
        }
    }, [isLoggedIn]);

    return (
        <>
            <Navbar>
                <SLinkTitle to="/">BuzzWeight<Icon /></SLinkTitle>
                <MenuButton onClick={toggleMenu} />
                <MenuWrapper active={menuActive}>
                    <SLink to="/about">About</SLink>
                    {!isLoggedIn && <SLink to="/login">Login</SLink>}
                    {isLoggedIn && (
                        <>
                            <SLink to="/dashboard">Dashboard</SLink>
                            {isAdmin && <SLink to="/users">Users</SLink>}
                            <SLink onClick={logOut}>Logout</SLink>
                        </>
                    )}
                </MenuWrapper>
            </Navbar>
        </>
    );
}

const Navbar = styled.nav`
    display: flex;
    background-color: #e9ab17;
    height: 4rem;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
    position: relative;
`

const SLink = styled(NavLink)`
    display: flex;
    text-decoration: none;
    margin: 0 1rem;
    font-size: 1.2rem;
    align-items: center;
    color: black;

    &:hover {
        color: white;
        transition: 0.3s, out;
    }

    @media (max-width: 768px) {
        font-size: 1.5rem;
        justify-content: center;
        margin-top: 1rem;
        position: static;
        transform: none;
        overflow: hidden;
    }
`;

const SLinkTitle = styled(NavLink)`
    display: flex;
    text-decoration: none;
    margin: 0 1rem;
    font-size: 1.5rem;
    font-weight: bold;
    color: black;

    &:hover {
        color: white;
        transition: 0.3s, out;
    }
`;

const MenuButton = styled(TiThMenu)`
    display: none;
    @media (max-width: 768px) {
        display: block;
        font-size: 1.5rem;
        cursor: pointer;
    }
`;

const Icon = styled(GiTreeBeehive)`
    font-size: 2.5rem;
    margin-right: auto;
`;

const MenuWrapper = styled.div`
    display: flex;
    z-index: 1;
    @media (max-width: 768px) {
        flex-direction: column;
        position: absolute;
        right: 0;
        visibility: ${({ active }) => (active ? 'visible' : 'hidden')};
        top: 4rem;
        transform: translateY(${({ active }) => (active ? '0' : '-100%')}); 
        transition: transform 0.3s ease-in-out, visibility 0.2s ease-in-out; 
        width: 100%; 
        padding: 1rem;
        background-color: rgba(233, 171, 23, 0.9);
    }
`;

export default Header;
