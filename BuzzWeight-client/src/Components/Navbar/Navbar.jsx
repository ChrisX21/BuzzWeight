import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { TiThMenu } from 'react-icons/ti';
import { GiTreeBeehive } from 'react-icons/gi';
import styles from './Navbar.module.css';
import { useContext } from 'react';
import { AuthContext } from '../../Auth/AuthContext';

function Navbar() {
    const [menuVisible, setMenuVisible] = useState(false);
    const { isLoggedIn, isAdmin } = useContext(AuthContext);
    const toggleMenu = () => {
        setMenuVisible(prevState => !prevState);
    };
    const closeMenu = () => {
        setMenuVisible(false);
    };

    const logout = () => {
        window.confirm('Are you sure you want to logout?');
        fetch('/api/logout', {
        }).then(() => {
            window.location.href = '/';
        });
    }

    return (
        <nav className={styles.navbar}>
            <NavLink to="/" className={styles.linkTitle}>
                BuzzWeight <GiTreeBeehive className={styles.icon} />
            </NavLink>

            <TiThMenu className={styles.menuButton} onClick={toggleMenu} />

            <div className={`${styles.menuWrapper} ${menuVisible ? styles.show : ''}`}>
                <NavLink to="/contacts" className={styles.link} onClick={closeMenu}>Contacts</NavLink>
                {!isLoggedIn && <NavLink to="/login" className={styles.link} onClick={closeMenu}>Login</NavLink>}
                {isLoggedIn && (
                    <>
                        <NavLink to="/dashboard" className={styles.link} onClick={closeMenu}>Dashboard</NavLink>
                        <NavLink to="/" className={styles.link} onClick={() => { closeMenu(); logout(); }}>Logout</NavLink>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
