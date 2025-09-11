import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Menu,
  MenuItem,
  Typography,
  Divider,
  ListItemIcon,
} from '@mui/material';
import {
  Person,
  ShoppingBag,
  Logout,
  ExpandMore,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

interface ProfileDropdownProps {
  username: string;
}

export const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ username }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      // Clear the auth cookie
      document.cookie = 'authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      toast.error('Logout failed');
    }
    handleClose();
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          onClick={handleClick}
          sx={{
            color: 'white',
            textTransform: 'none',
            borderRadius: '20px',
            px: 2,
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
          }}
          endIcon={<ExpandMore />}
        >
          <Avatar
            sx={{
              width: 32,
              height: 32,
              mr: 1,
              background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
              fontSize: '0.875rem',
            }}
          >
            {username.charAt(0).toUpperCase()}
          </Avatar>
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            {username}
          </Typography>
        </Button>
      </motion.div>

      <AnimatePresence>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          PaperProps={{
            sx: {
              mt: 1,
              minWidth: 200,
              borderRadius: 2,
              boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
            },
          }}
        >
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Person fontSize="small" />
            </ListItemIcon>
            Profile
          </MenuItem>
          
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <ShoppingBag fontSize="small" />
            </ListItemIcon>
            My Orders
          </MenuItem>
          
          <Divider />
          
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </AnimatePresence>
    </Box>
  );
};
