'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff, School } from '@mui/icons-material';
import useAuthStore from '@/store/authStore';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();

  const [username, setUsername] = useState('emilys');
  const [password, setPassword] = useState('emilyspass');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      // Save token + user to Zustand (persisted in localStorage)
      await login(username, password);
      // NextAuth session for server-side session support
      const result = await signIn('credentials', {
        username,
        password,
        redirect: false,
      });
      if (result?.error) throw new Error('Invalid credentials');
      router.push('/dashboard');
    } catch {
      setError('Invalid credentials. Try: emilys / emilyspass');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
      }}>
      <Card sx={{ width: '100%', maxWidth: 420, mx: 2, boxShadow: 4 }}>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <School sx={{ fontSize: 48, color: 'primary.main' }} />
            <Typography variant='h5' fontWeight={700}>
              Help Study Abroad
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              Admin Portal
            </Typography>
          </Box>

          {error && (
            <Alert severity='error' sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component='form' onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label='Username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              margin='normal'
              required
              autoFocus
            />
            <TextField
              fullWidth
              label='Password'
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin='normal'
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge='end'>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              size='large'
              disabled={loading}
              sx={{ mt: 3, py: 1.5 }}>
              {loading ? (
                <CircularProgress size={24} color='inherit' />
              ) : (
                'Sign In'
              )}
            </Button>
          </Box>

          <Typography
            variant='caption'
            color='text.secondary'
            sx={{ display: 'block', textAlign: 'center', mt: 2 }}>
            Demo: emilys / emilyspass
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
