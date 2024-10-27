import { React, useState, useContext } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import styles from './Login.module.css';

function Login() {
    const [emailError, setEmailError] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!validateInputs())
            return;

        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: document.getElementById('email').value,
                password: document.getElementById('password').value,
            }),
        }).then((response) => {
            if (response.status === 200) {
                window.location.href = '/dashboard';
            }
            else {
                setPasswordError(true);
                setPasswordErrorMessage('Invalid login attempt!');
            }
        });

    };

    const validateInputs = () => {
        const email = document.getElementById('email');
        const password = document.getElementById('password');

        let isValid = true;

        if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
            setEmailError(true);
            setEmailErrorMessage('Please enter a valid email address.');
            isValid = false;
        }

        else {
            setEmailError(false);
            setEmailErrorMessage('');
        }

        if (!password.value || password.value.length < 6 || !/\d/.test(password.value)) {
            setPasswordError(true);
            setPasswordErrorMessage('Password must be at least 6 characters long and contain at least one number.');
            isValid = false;
        }

        else {
            setPasswordError(false);
            setPasswordErrorMessage('');
        }

        return isValid;
    };

    return (
        <Stack className={styles.signInContainer} direction="column" justifyContent="space-between">
            <Card className={styles.card} variant="outlined">
                <Typography
                    component="h1"
                    variant="h4"
                    sx={{
                        width: '100%',
                        fontSize: 'clamp(2rem, 10vw, 2.15rem)',
                        color: '#e9ab17',
                    }}
                >
                    Sign in
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        gap: 2,
                    }}
                >
                    <FormControl>
                        <FormLabel htmlFor="email" sx={{ color: '#333' }}>
                            Email
                        </FormLabel>
                        <TextField
                            error={emailError}
                            helperText={emailErrorMessage}
                            id="email"
                            type="email"
                            name="email"
                            placeholder="your@email.com"
                            autoComplete="email"
                            autoFocus
                            required
                            fullWidth
                            variant="outlined"
                            sx={{
                                backgroundColor: '#fff',
                                '&:hover': { backgroundColor: '#f5f5f5' },
                            }}
                        />
                    </FormControl>
                    <FormControl>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <FormLabel htmlFor="password" sx={{ color: '#333' }}>
                                Password
                            </FormLabel>
                        </Box>
                        <TextField
                            error={passwordError}
                            helperText={passwordErrorMessage}
                            name="password"
                            placeholder="••••••"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            required
                            fullWidth
                            variant="outlined"
                            sx={{
                                backgroundColor: '#fff',
                                '&:hover': { backgroundColor: '#f5f5f5' },
                            }}
                        />
                    </FormControl>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                            backgroundColor: '#e9ab17',
                            color: '#fff',
                            '&:hover': { backgroundColor: '#fff', color: '#e9ab17' },
                            transition: '0.3s',
                        }}
                        onClick={validateInputs}
                    >Sign in</Button>
                </Box>
            </Card>
        </Stack>
    );
}

export default Login;
