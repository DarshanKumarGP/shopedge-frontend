import React from 'react';
import { motion } from 'framer-motion';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
  Link,
  Alert,
  FormHelperText,
} from '@mui/material';
import {
  Person,
  Email,
  Visibility,
  VisibilityOff,
  AdminPanelSettings,
  ShoppingCart,
} from '@mui/icons-material';
import styled from '@emotion/styled';

// Validation Schema
const validationSchema = yup.object({
  username: yup
    .string()
    .min(5, 'Username must be at least 5 characters')
    .max(50, 'Username must not exceed 50 characters')
    .required('Username is required'),
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
      'Password must contain uppercase, lowercase, number, and special character'
    )
    .required('Password is required'),
  role: yup.string().required('Please select a role'),
});

// Styled Components
const StyledCard = styled(Card)`
  background: linear-gradient(145deg, #ffffff 0%, #f8fafc 100%);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
              0 10px 10px -5px rgba(0, 0, 0, 0.04);
  overflow: visible;
`;

const GlowButton = styled(Button)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
    transform: translateY(-2px);
  }
`;

interface RegisterFormProps {
  onSubmit: (data: any) => void;
  isLoading?: boolean;
  error?: string;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  onSubmit,
  isLoading,
  error,
}) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
    defaultValues: {
      username: '',
      email: '',
      password: '',
      role: '',
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <StyledCard sx={{ maxWidth: 450, margin: 'auto', mt: 4 }}>
        <CardContent sx={{ p: 4 }}>
          {/* Header */}
          <Box textAlign="center" mb={3}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
            >
              <Typography
                variant="h2"
                sx={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  fontWeight: 700,
                  mb: 1,
                }}
              >
                Join ShopEdge
              </Typography>
            </motion.div>
            <Typography variant="body1" color="text.secondary">
              Create your account and start shopping
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {/* Form */}
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            {/* Username Field */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <TextField
                {...register('username')}
                fullWidth
                label="Username"
                placeholder="Enter your username"
                error={!!errors.username}
                helperText={errors.username?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person color="primary" />
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 2 }}
              />
            </motion.div>

            {/* Email Field */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <TextField
                {...register('email')}
                fullWidth
                label="Email Address"
                placeholder="Enter your email"
                type="email"
                error={!!errors.email}
                helperText={errors.email?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email color="primary" />
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 2 }}
              />
            </motion.div>

            {/* Password Field */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <TextField
                {...register('password')}
                fullWidth
                label="Password"
                placeholder="Enter your password"
                type={showPassword ? 'text' : 'password'}
                error={!!errors.password}
                helperText={errors.password?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 2 }}
              />
            </motion.div>

            {/* Role Selection - FIXED */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <FormControl fullWidth sx={{ mb: 3 }} error={!!errors.role}>
                <InputLabel>Select Role</InputLabel>
                <Controller
                  name="role"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Select
                      {...field}
                      label="Select Role"
                      error={!!errors.role}
                    >
                      <MenuItem value="CUSTOMER">
                        <Box display="flex" alignItems="center" gap={1}>
                          <ShoppingCart fontSize="small" />
                          Customer
                        </Box>
                      </MenuItem>
                      <MenuItem value="ADMIN">
                        <Box display="flex" alignItems="center" gap={1}>
                          <AdminPanelSettings fontSize="small" />
                          Admin
                        </Box>
                      </MenuItem>
                    </Select>
                  )}
                />
                {errors.role && (
                  <FormHelperText error>
                    {errors.role.message}
                  </FormHelperText>
                )}
              </FormControl>
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <GlowButton
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={!isValid || isLoading}
                sx={{ py: 1.5, fontSize: '1.1rem', fontWeight: 600 }}
              >
                {isLoading ? 'Creating Account...' : 'Sign Up'}
              </GlowButton>
            </motion.div>

            {/* Login Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <Box textAlign="center" mt={3}>
                <Typography variant="body2" color="text.secondary">
                  Already have an account?{' '}
                  <Link
                    href="/login"
                    sx={{
                      color: 'primary.main',
                      textDecoration: 'none',
                      fontWeight: 600,
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    Sign in here
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
