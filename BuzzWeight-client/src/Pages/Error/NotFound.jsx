import React from 'react';
import { Link } from 'react-router-dom';
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import styles from './NotFound.module.css';

const NotFound = () => {

    return (
        <>
            <div className={styles.mainContainer}>
                <div className={styles.container}>
                    <h1 className={styles.notFoundText}>404</h1>
                    <h3 className={styles.notFoundMessage}>The page you're looking for was not found!</h3>
                    <Link to="/" className={styles.returnButton}><KeyboardBackspaceRoundedIcon className={styles.styledIcon} />Return To Home</Link>
                </div>
            </div>
        </>
    );
};

export default NotFound;
