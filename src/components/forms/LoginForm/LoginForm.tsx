import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Paper,
  Divider,
  Link,
  CircularProgress,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Person,
  Lock,
  ShoppingBag,
  ArrowForward,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface LoginFormProps {
  onSubmit: (data: { username: string; password: string }) => void;
  isLoading: boolean;
  error?: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  isLoading,
  error,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset errors
    setUsernameError('');
    setPasswordError('');

    // Validate
    let hasError = false;
    
    if (!username) {
      setUsernameError('Username is required');
      hasError = true;
    } else if (username.length < 3) {
      setUsernameError('Username must be at least 3 characters');
      hasError = true;
    }

    if (!password) {
      setPasswordError('Password is required');
      hasError = true;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      hasError = true;
    }

    if (!hasError) {
      onSubmit({ username, password });
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        width: '100%',
        maxWidth: 400,
        padding: { xs: 3, sm: 4 },
        borderRadius: 3,
        backgroundColor: '#ffffff',
        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)',
        border: '1px solid rgba(0, 0, 0, 0.06)',
      }}
    >
      {/* Logo & Header */}
      <Box sx={{ textAlign: 'center', mb: 3.5 }}>
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 56,
            height: 56,
            borderRadius: 3,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            mb: 2,
            boxShadow: '0 8px 24px rgba(102, 126, 234, 0.25)',
          }}
        >
          <ShoppingBag sx={{ fontSize: 28, color: '#ffffff' }} />
        </Box>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: '#1a1a1a',
            mb: 1,
            fontSize: { xs: '1.5rem', sm: '1.75rem' },
          }}
        >
          Welcome Back
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: '#6b7280',
            fontSize: '0.9rem',
          }}
        >
          Sign in to continue shopping
        </Typography>
      </Box>

      {/* Error Alert */}
      {error && (
        <Box
          sx={{
            mb: 3,
            p: 2,
            borderRadius: 2,
            backgroundColor: '#fef2f2',
            border: '1px solid #fecaca',
          }}
        >
          <Typography
            sx={{
              color: '#dc2626',
              fontSize: '0.875rem',
              fontWeight: 500,
            }}
          >
            {error}
          </Typography>
        </Box>
      )}

      {/* Login Form */}
      <form onSubmit={handleSubmit}>
        <Box sx={{ mb: 2.5 }}>
          <Typography
            sx={{
              mb: 1,
              fontSize: '0.875rem',
              fontWeight: 600,
              color: '#374151',
            }}
          >
            Username
          </Typography>
          <TextField
            fullWidth
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setUsernameError('');
            }}
            error={!!usernameError}
            helperText={usernameError}
            disabled={isLoading}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person sx={{ color: '#9ca3af', fontSize: 20 }} />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                backgroundColor: '#f9fafb',
                transition: 'all 0.2s',
                '& fieldset': {
                  borderColor: '#e5e7eb',
                },
                '&:hover fieldset': {
                  borderColor: '#667eea',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#667eea',
                  borderWidth: 2,
                },
                '&.Mui-focused': {
                  backgroundColor: '#ffffff',
                },
              },
              '& .MuiInputBase-input': {
                padding: '14px 12px',
                fontSize: '0.95rem',
              },
            }}
          />
        </Box>

        <Box sx={{ mb: 2.5 }}>
          <Typography
            sx={{
              mb: 1,
              fontSize: '0.875rem',
              fontWeight: 600,
              color: '#374151',
            }}
          >
            Password
          </Typography>
          <TextField
            fullWidth
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError('');
            }}
            error={!!passwordError}
            helperText={passwordError}
            disabled={isLoading}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock sx={{ color: '#9ca3af', fontSize: 20 }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    disabled={isLoading}
                    sx={{ color: '#9ca3af' }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                backgroundColor: '#f9fafb',
                transition: 'all 0.2s',
                '& fieldset': {
                  borderColor: '#e5e7eb',
                },
                '&:hover fieldset': {
                  borderColor: '#667eea',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#667eea',
                  borderWidth: 2,
                },
                '&.Mui-focused': {
                  backgroundColor: '#ffffff',
                },
              },
              '& .MuiInputBase-input': {
                padding: '14px 12px',
                fontSize: '0.95rem',
              },
            }}
          />
        </Box>

        {/* Login Button */}
        <Button
          fullWidth
          type="submit"
          variant="contained"
          disabled={isLoading}
          endIcon={
            isLoading ? (
              <CircularProgress size={20} sx={{ color: '#ffffff' }} />
            ) : (
              <ArrowForward />
            )
          }
          sx={{
            py: 1.5,
            borderRadius: 2,
            textTransform: 'none',
            fontSize: '1rem',
            fontWeight: 600,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            boxShadow: '0 4px 16px rgba(102, 126, 234, 0.3)',
            transition: 'all 0.3s',
            '&:hover': {
              background: 'linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)',
              boxShadow: '0 6px 24px rgba(102, 126, 234, 0.4)',
              transform: 'translateY(-2px)',
            },
            '&:disabled': {
              background: '#e5e7eb',
              color: '#9ca3af',
              boxShadow: 'none',
            },
          }}
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>

      {/* Divider */}
      <Box sx={{ my: 3, position: 'relative' }}>
        <Divider sx={{ borderColor: '#e5e7eb' }} />
        <Typography
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#ffffff',
            px: 2,
            color: '#9ca3af',
            fontSize: '0.875rem',
            fontWeight: 500,
          }}
        >
          New to ShopEdge?
        </Typography>
      </Box>

      {/* Sign Up Link */}
      <Button
        fullWidth
        variant="outlined"
        onClick={() => navigate('/register')}
        disabled={isLoading}
        sx={{
          py: 1.5,
          borderRadius: 2,
          textTransform: 'none',
          fontSize: '1rem',
          fontWeight: 600,
          borderColor: '#667eea',
          color: '#667eea',
          borderWidth: 2,
          transition: 'all 0.3s',
          '&:hover': {
            borderWidth: 2,
            borderColor: '#667eea',
            backgroundColor: 'rgba(102, 126, 234, 0.05)',
            transform: 'translateY(-2px)',
          },
        }}
      >
        Create an Account
      </Button>

      {/* Footer Links */}
      <Box sx={{ mt: 3, textAlign: 'center' }}>
        <Typography
          sx={{
            fontSize: '0.8rem',
            color: '#6b7280',
          }}
        >
          By continuing, you agree to our{' '}
          <Link
            href="/terms"
            sx={{
              color: '#667eea',
              textDecoration: 'none',
              fontWeight: 500,
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link
            href="/privacy"
            sx={{
              color: '#667eea',
              textDecoration: 'none',
              fontWeight: 500,
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            Privacy Policy
          </Link>
        </Typography>
      </Box>
    </Paper>
  );
};
