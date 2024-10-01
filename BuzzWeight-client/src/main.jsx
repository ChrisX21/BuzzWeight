import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './index.css';

const theme = createTheme({
  typography: {
    fontFamily: 'Montserrat, sans-serif',

    h1: {
      fontSize: '6rem',
      fontWeight: 700,
      color: 'black',

      '@media (max-width:600px)': {
        fontSize: '3rem',
        margin: '1rem 2rem'
      }

    },
    h5: {
      color: '#818182',
      fontSize: '1.5rem',
      fontWeight: 500,

      '@media (max-width:600px)': {
        fontSize: '1rem',
        margin: '1rem 2rem'
      }
    }

  },

});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>
);
