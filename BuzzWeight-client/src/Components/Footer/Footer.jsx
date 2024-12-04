import React from 'react';
import { Grid2 as Grid, Typography, Link, Box } from '@mui/material';
import styles from './Footer.module.css';

function Footer() {
    return (
        <Box className={styles.footer}>
            <Grid container spacing={4} justifyContent="center">
                <Grid item xs={12} md={4}>
                    <Typography variant="h6" className={styles.footerTitle}>
                        About Us
                    </Typography>
                    <Typography className={styles.footerText}>
                        BuzzWeight is your reliable platform for real-time sensor data analytics.
                    </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Typography variant="h6" className={styles.footerTitle}>
                        Quick Links
                    </Typography>
                    <Box className={styles.linkList}>
                        <Link href="/" className={styles.footerLink}>Home</Link>
                        <Link href="/contacts" className={styles.footerLink}>Contacts</Link>
                    </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Typography variant="h6" className={styles.footerTitle}>
                        Contact Us
                    </Typography>
                    <Typography className={styles.footerText}>
                        Email: i.ivanov@airsofia.com
                    </Typography>
                    <Typography className={styles.footerText}>
                        Phone: +359 888 888 888
                    </Typography>
                </Grid>
            </Grid>
            <Typography className={styles.footerCopy}>
                © 2024 BuzzWeight. All rights reserved.
            </Typography>
        </Box>
    );
}

export default Footer;
