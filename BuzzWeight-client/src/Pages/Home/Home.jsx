import React from 'react';
import { Grid2 as Grid, Typography, Button, Box } from '@mui/material';
import styles from './Home.module.css';

function Home() {
    return (
        <Box className={styles.container}>
            <Grid container className={styles.heroSection} alignItems="center" justifyContent="center">
                <Grid item xs={12} md={8} className={styles.heroContent}>
                    <Typography variant="h1" className={styles.heroTitle}>
                        BuzzWeight <br /> Sensor Data Platform
                    </Typography>
                    <Typography variant="h5" className={styles.heroSubtitle}>
                        Easily track and manage weight, temperature, and humidity sensor data in real-time.
                    </Typography>
                </Grid>
            </Grid>

            <Grid container className={styles.imagePlaceholder} justifyContent="center">
                <Typography className={styles.placeholderText}>
                    [Future carousel or images here]
                </Typography>
            </Grid>

        </Box>
    );
}

export default Home;