'use client';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { SessionProvider } from 'next-auth/react';

const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' },
    background: { default: '#f5f5f5' },
  },
});

export default function MuiSetup({ children }) {
  return (
    <SessionProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
}
