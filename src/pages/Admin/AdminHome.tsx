import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AdminHome: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear cookies and redirect to login
    document.cookie = 'authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    navigate('/login');
  };

  return (
    <Box sx={{ p: 4, textAlign: 'center' }}>
      <Typography variant="h3" gutterBottom>
        ⚡ Admin Dashboard
      </Typography>
      <Typography variant="h6" color="text.secondary" gutterBottom>
        Welcome to your ShopEdge Admin Portal!
      </Typography>
      <Button onClick={handleLogout} variant="outlined" sx={{ mt: 2 }}>
        Logout
      </Button>
    </Box>
  );
};

export default AdminHome;
