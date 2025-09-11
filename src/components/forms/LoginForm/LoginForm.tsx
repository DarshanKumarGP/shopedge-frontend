import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTheme } from '@mui/material/styles';
import * as yup from 'yup';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Link,
  Alert,
  Divider,
} from '@mui/material';
import {
  Person,
  Visibility,
  VisibilityOff,
  Login as LoginIcon,
} from '@mui/icons-material';
import styled from '@emotion/styled';

// Validation Schema
const validationSchema = yup.object({
  username: yup
    .string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

// Styled Components
const StyledCard = styled(Card)`
  background: linear-gradient(145deg, #ffffff 0%, #f8fafc 100%);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15),
              0 0 0 1px rgba(255, 255, 255, 0.1);
  overflow: visible;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.5), transparent);
  }
`;

const GlowButton = styled(Button)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 8px 32px rgba(102, 126, 234, 0.4);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }
  
  &:hover {
    box-shadow: 0 12px 40px rgba(102, 126, 234, 0.6);
    transform: translateY(-2px);
    
    &::before {
      left: 100%;
    }
  }
`;

interface LoginFormProps {
  onSubmit: (data: any) => void;
  isLoading?: boolean;
  error?: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  isLoading,
  error,
}) => {
  const theme = useTheme();
  const [showPassword, setShowPassword] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
    defaultValues: {
      username: '',
      password: '',
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <StyledCard sx={{ maxWidth: 420, margin: 'auto', mt: 4 }}>
        <CardContent sx={{ p: 4 }}>
          {/* Header */}
          <Box textAlign="center" mb={4}>
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            >
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                  boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
                }}
              >
                <LoginIcon sx={{ color: 'white', fontSize: 28 }} />
              </Box>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Typography
                variant="h4"
                sx={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  fontWeight: 700,
                  mb: 1,
                }}
              >
                Welcome Back
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Sign in to your ShopEdge account
              </Typography>
            </motion.div>
          </Box>

          {error && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            </motion.div>
          )}

          {/* Form */}
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            {/* Username Field */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Box position="relative" mb={3}>
                <TextField
                  {...register('username')}
                  fullWidth
                  label="Username"
                  placeholder="Enter your username"
                  error={!!errors.username}
                  helperText={errors.username?.message}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person color="primary" />
                        </InputAdornment>
                      ),
                    },
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '& fieldset': {
                        borderColor: 'rgba(102, 126, 234, 0.2)',
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(102, 126, 234, 0.4)',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: theme.palette.primary.main,
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: theme.palette.primary.main,
                      fontWeight: 600,
                      '&.Mui-focused': {
                        color: theme.palette.primary.main,
                      },
                    },
                  }}
                />
              </Box>
            </motion.div>

            {/* Password Field */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Box position="relative" mb={3}>
                <TextField
                  {...register('password')}
                  fullWidth
                  label="Password"
                  placeholder="Enter your password"
                  type={showPassword ? 'text' : 'password'}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                            sx={{ color: 'primary.main' }}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '& fieldset': {
                        borderColor: 'rgba(102, 126, 234, 0.2)',
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(102, 126, 234, 0.4)',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: theme.palette.primary.main,
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: theme.palette.primary.main,
                      fontWeight: 600,
                      '&.Mui-focused': {
                        color: theme.palette.primary.main,
                      },
                    },
                  }}
                />
              </Box>
            </motion.div>

            {/* Forgot Password Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <Box textAlign="right" mb={3}>
                <Link
                  href="/forgot-password"
                  sx={{
                    color: 'primary.main',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Forgot your password?
                </Link>
              </Box>
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <GlowButton
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={!isValid || isLoading}
                sx={{ 
                  py: 1.5, 
                  fontSize: '1.1rem', 
                  fontWeight: 600,
                  mb: 2,
                }}
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </GlowButton>
            </motion.div>

            {/* Divider */}
            <Divider sx={{ my: 2, opacity: 0.5 }}>
              <Typography variant="body2" color="text.secondary">
                or
              </Typography>
            </Divider>

            {/* Register Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <Box textAlign="center">
                <Typography variant="body2" color="text.secondary">
                  Don't have an account?{' '}
                  <Link
                    href="/register"
                    sx={{
                      color: 'primary.main',
                      textDecoration: 'none',
                      fontWeight: 600,
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    Create one now
                  </Link>
                </Typography>
              </Box>
            </motion.div>
          </Box>
        </CardContent>
      </StyledCard>
    </motion.div>
  );
};
