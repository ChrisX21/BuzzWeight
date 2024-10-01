import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { TiThMenu } from 'react-icons/ti';
import { GiTreeBeehive } from 'react-icons/gi';
import styles from './Navbar.module.css';

function Navbar() {
    const [menuVisible, setMenuVisible] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const toggleMenu = () => {
        setMenuVisible(prevState => !prevState);
    };

    return (
        <nav className={styles.navbar}>
            <NavLink to="/" className={styles.linkTitle}>
                BuzzWeight<GiTreeBeehive className={styles.icon} />
            </NavLink>

            {/* Menu button for mobile */}
            <TiThMenu className={styles.menuButton} onClick={toggleMenu} />

            {/* Conditionally apply class to show/hide menu */}
            <div className={`${styles.menuWrapper} ${menuVisible ? styles.show : ''}`}>
                <NavLink to="/contacts" className={styles.link}>Contacts</NavLink>
                {!isLoggedIn && <NavLink to="/login" className={styles.link}>Login</NavLink>}
                {isLoggedIn && (
                    <>
                        <NavLink to="/dashboard" className={styles.link}>Dashboard</NavLink>
                        {isAdmin && <NavLink to="/users" className={styles.link}>Users</NavLink>}
                        <NavLink to="/" className={styles.link}>Logout</NavLink>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
