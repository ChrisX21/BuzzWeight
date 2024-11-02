import React from 'react';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { Home, Analytics, People, Settings } from '@mui/icons-material';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { GiTreeBeehive } from 'react-icons/gi';
import { NavLink, Link } from 'react-router-dom';
import { AuthContext } from '../../Auth/AuthContext';
import styles from './DashboardNavbar.module.css';

const DashboardNavbar = () => {
    const { isAdmin, setIsAdmin } = React.useContext(AuthContext);

    const menuItems = [
        { text: 'Home', icon: <Home />, path: '/' },
        { text: 'Dashboard', icon: <Analytics />, path: '/dashboard' },
        ...(isAdmin ? [{ text: 'Users', icon: <People />, path: '/users' }] : []),
        { text: 'Settings', icon: <Settings />, path: '/settings' },
        { text: 'Contact', icon: <AssignmentIndIcon />, path: '/contacts' }
    ];


    return (
        <Drawer
            className={styles.sidebar}
            variant="permanent"
            anchor="left"
            classes={{ paper: styles.sidebarPaper }}
        >
            <Box className={styles.sidebarHeader}>
                <NavLink to="/" className={styles.linkTitle}>
                    BuzzWeight <GiTreeBeehive />
                </NavLink>
            </Box>

            <List>
                {menuItems.map((item) => (
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton component={Link} to={item.path} className={styles.menuItem}>
                            <ListItemIcon className={styles.menuIcon}>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

            <Box className={styles.footer}>
                <Typography variant="body2" className={styles.footerText}>
                    Plan about to expire? <br />
                    <span className={styles.discount}>Get the discount</span>
                </Typography>
            </Box>
        </Drawer>
    );
};

export default DashboardNavbar;
