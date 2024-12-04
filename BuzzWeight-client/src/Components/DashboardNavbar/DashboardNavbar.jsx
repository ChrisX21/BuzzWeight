import React, { useState } from 'react';
import { Box, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { TiThMenu } from 'react-icons/ti';
import { Home, Analytics, People, Settings } from '@mui/icons-material';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { GiTreeBeehive } from 'react-icons/gi';
import { NavLink, Link } from 'react-router-dom';
import { AuthContext } from '../../Auth/AuthContext';
import CallIcon from '@mui/icons-material/Call';
import styles from './DashboardNavbar.module.css';
import { CiTextAlignCenter } from 'react-icons/ci';
import LogoutIcon from '@mui/icons-material/Logout';

const DashboardNavbar = () => {
    const { isAdmin } = React.useContext(AuthContext);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const menuItems = [
        { text: 'Home', icon: <Home />, path: '/' },
        { text: 'Dashboard', icon: <Analytics />, path: '/dashboard' },
        ...(isAdmin ? [{ text: 'Users', icon: <People />, path: '/users' }] : []),
        { text: 'Settings', icon: <Settings />, path: '/settings' },
        { text: 'Contact', icon: <AssignmentIndIcon />, path: '/contacts' }
    ];

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.titleWrapper}>
                    <h1 className={styles.title} >Title</h1>
                </div>
                <IconButton
                    color="inherit"
                    edge="start"
                    onClick={toggleDrawer}
                    className={styles.menuIconButton}
                    sx={{ display: { sm: 'none' } }}
                >
                    <TiThMenu />
                </IconButton>
            </div>

            <Drawer
                className={styles.sidebar}
                variant="permanent"
                anchor="left"
                classes={{ paper: styles.sidebarPaper }}
                sx={{ display: { xs: 'none', sm: 'block' } }}
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
                <ListItem disablePadding onClick={() => {
                     if (window.confirm('Are you sure you want to logout?')){
                        fetch('/api/logout', {
                        }).then(() => {
                            window.location.href = '/';
                        });
                    }
                }}>
                    <ListItemButton className={styles.logoutButton}>
                        <ListItemIcon className={styles.menuIco}><LogoutIcon /></ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItemButton>
                </ListItem>
                <Box className={styles.footer}>
                    <Typography variant="body2" className={styles.footerText}>
                        In need of support? <br />
                        <span className={styles.discount}><CallIcon className={styles.call} />+359886262026</span>
                    </Typography>
                </Box>
            </Drawer>

            <Drawer
                variant="temporary"
                open={drawerOpen}
                onClose={toggleDrawer}
                classes={{ paper: styles.sidebarPaper }}
                sx={{ display: { xs: 'block', sm: 'none' } }}
                ModalProps={{
                    keepMounted: true,
                }}
            >
                <Box className={styles.sidebarHeader}>
                    <NavLink to="/" className={styles.linkTitle}>
                        BuzzWeight <GiTreeBeehive />
                    </NavLink>
                </Box>
                <List>
                    {menuItems.map((item) => (
                        <ListItem key={item.text} disablePadding onClick={toggleDrawer}>
                            <ListItemButton component={Link} to={item.path} className={styles.menuItem}>
                                <ListItemIcon className={styles.menuIcon}>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <ListItem disablePadding onClick={() => {
                    if (window.confirm('Are you sure you want to logout?')){
                        fetch('/api/logout', {
                        }).then(() => {
                            window.location.href = '/';
                        });
                    }
                }}>
                    <ListItemButton className={styles.logoutButton}>
                        <ListItemIcon className={styles.menuIco}><LogoutIcon /></ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItemButton>
                </ListItem>
                <Box className={styles.footer}>
                    <Typography variant="body2" className={styles.footerText}>
                        In need of support? <br />
                        <span className={styles.discount}><CallIcon className={styles.call} />+359886262026</span>
                    </Typography>
                </Box>
            </Drawer>
        </>
    );
};

export default DashboardNavbar;
