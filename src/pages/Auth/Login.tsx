import React from "react";
import { Box } from '@mui/material';
import { useLogin } from "../../hooks/useLogin";
import { LoginForm } from "../../components/forms/LoginForm/LoginForm";

const LoginPage: React.FC = () => {
  const loginMutation = useLogin();

  const handleSubmit = (data: any) => {
    // Use mutate instead of mutateAsync to avoid runtime errors
    loginMutation.mutate(data);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
        position: 'relative',
        overflow: 'hidden',
        
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)',
          pointerEvents: 'none',
        },
        
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 70% 80%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)',
          pointerEvents: 'none',
        },
      }}
    >
      <LoginForm
        onSubmit={handleSubmit}
        isLoading={loginMutation.isPending}
        error={undefined} // Remove error prop since onError handles it
      />
    </Box>
  );
};

export default LoginPage;
