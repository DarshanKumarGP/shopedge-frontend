// src/common/ProfileDropdown/ProfileDropdown.tsx

import React, { useState } from 'react';
import {
  Avatar, Box, Button, Menu, MenuItem, Typography, Divider,
  ListItemIcon, Badge, Chip, Paper, Stack
} from '@mui/material';
import {
  Person, ShoppingBag, Logout, ExpandMore, Settings, FavoriteBorder,
  LocalShipping, Support, AccountBalance, NotificationsOutlined, Language,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:9090/api',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

export interface ProfileDropdownProps {
  username: string;
  orderCount?: number;
}

export const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
  username,
  orderCount = 0
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const queryClient = useQueryClient();

  const logoutMutation = useMutation({
    mutationFn: () => api.post<{ message: string }>('/auth/logout').then(res => res.data),
    onSuccess: () => {
      // Also clear client cookie for safety
      document.cookie = 'authToken=; path=/; max-age=0';
      toast.success('Logged out successfully! 👋');
      queryClient.clear();
      navigate('/login', { replace: true });
    },
    onError: (error: any) => {
      const msg = error.response?.data?.message || 'Logout failed. Please try again.';
      toast.error(msg);
    },
  });

  const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleNavigation = (path: string) => {
    navigate(path);
    handleClose();
  };

  const handleLogout = async () => {
    await logoutMutation.mutateAsync();
    handleClose();
  };

  const getUserInitials = (name: string): string =>
    name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);

  const menuItems = [
    {
      icon: <Person fontSize="small" />,
      label: 'My Profile',
      description: 'Account settings & preferences',
      action: () => handleNavigation('/profile'),
      color: '#667eea',
    },
    {
      icon: <ShoppingBag fontSize="small" />,
      label: 'My Orders',
      description: `${orderCount} order${orderCount !== 1 ? 's' : ''} placed`,
      action: () => handleNavigation('/orders'),
      color: '#10b981',
      badge: orderCount > 0 ? orderCount : undefined,
    },
    {
      icon: <FavoriteBorder fontSize="small" />,
      label: 'Wishlist',
      description: 'Saved items & favorites',
      action: () => handleNavigation('/wishlist'),
      color: '#ef4444',
    },
    {
      icon: <LocalShipping fontSize="small" />,
      label: 'Track Orders',
      description: 'Delivery status & updates',
      action: () => handleNavigation('/track-orders'),
      color: '#f59e0b',
    },
  ];

  const secondaryItems = [
    {
      icon: <AccountBalance fontSize="small" />,
      label: 'Payment Methods',
      action: () => handleNavigation('/payment-methods'),
    },
    {
      icon: <Settings fontSize="small" />,
      label: 'Account Settings',
      action: () => handleNavigation('/settings'),
    },
    {
      icon: <Support fontSize="small" />,
      label: 'Help & Support',
      action: () => handleNavigation('/support'),
    },
    {
      icon: <Language fontSize="small" />,
      label: 'Language & Region',
      action: () => handleNavigation('/language'),
    },
  ];

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button
          onClick={handleClick}
          sx={{
            color: 'white',
            textTransform: 'none',
            borderRadius: '50px',
            px: 2,
            py: 0.75,
            background: open
              ? 'rgba(255, 255, 255, 0.15)'
              : 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              transform: 'translateY(-1px)',
            },
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
          endIcon={
            <ExpandMore
              sx={{
                transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s ease',
              }}
            />
          }
        >
          <Avatar
            sx={{
              width: 36,
              height: 36,
              mr: 1.5,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              fontSize: '0.875rem',
              fontWeight: 600,
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            }}
          >
            {getUserInitials(username)}
          </Avatar>
          <Stack direction="column" alignItems="flex-start" spacing={0}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                lineHeight: 1.2,
                textAlign: 'left',
              }}
            >
              {username}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                opacity: 0.8,
                fontSize: '0.7rem',
                textAlign: 'left',
              }}
            >
              Premium Member
            </Typography>
          </Stack>
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
            component: motion.div,
            initial: { opacity: 0, scale: 0.95, y: -10 },
            animate: { opacity: 1, scale: 1, y: 0 },
            exit: { opacity: 0, scale: 0.95, y: -10 },
            transition: { duration: 0.2, ease: 'easeOut' },
            sx: {
              mt: 1,
              minWidth: 320,
              maxWidth: 380,
              borderRadius: 3,
              boxShadow: '0 20px 40px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,255,255,0.05)',
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              overflow: 'visible',
            },
          }}
          MenuListProps={{
            sx: { p: 1 },
          }}
        >
          {/* User Header */}
          <Box sx={{ px: 2, py: 2, mb: 1 }}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar
                sx={{
                  width: 50,
                  height: 50,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                }}
              >
                {getUserInitials(username)}
              </Avatar>
              <Stack spacing={0.5} flex={1}>
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e293b' }}>
                  {username}
                </Typography>
                <Chip
                  label="Premium Member"
                  size="small"
                  sx={{
                    background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '0.7rem',
                    height: 20,
                    alignSelf: 'flex-start',
                  }}
                />
              </Stack>
              <Badge badgeContent={3} color="error">
                <NotificationsOutlined sx={{ color: '#64748b' }} />
              </Badge>
            </Stack>
          </Box>

          <Divider sx={{ mx: 1, mb: 1 }} />

          {/* Primary Menu Items */}
          {menuItems.map((item, index) => (
            <MenuItem
              key={item.label}
              onClick={item.action}
              component={motion.div}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              sx={{
                borderRadius: 2,
                mx: 1,
                my: 0.5,
                px: 2,
                py: 1.5,
                '&:hover': {
                  backgroundColor: `${item.color}15`,
                  transform: 'translateX(4px)',
                },
                transition: 'all 0.2s ease',
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                <Paper
                  sx={{
                    width: 32,
                    height: 32,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: `${item.color}15`,
                    border: `1px solid ${item.color}30`,
                  }}
                >
                  {React.cloneElement(item.icon, {
                    sx: { color: item.color, fontSize: '1.1rem' }
                  })}
                </Paper>
              </ListItemIcon>
              <Stack spacing={0.2} flex={1}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Typography variant="body2" sx={{ fontWeight: 500, color: '#1e293b' }}>
                    {item.label}
                  </Typography>
                  {item.badge && (
                    <Chip
                      label={item.badge}
                      size="small"
                      color="primary"
                      sx={{ height: 18, fontSize: '0.65rem' }}
                    />
                  )}
                </Stack>
                <Typography variant="caption" sx={{ color: '#64748b' }}>
                  {item.description}
                </Typography>
              </Stack>
            </MenuItem>
          ))}

          <Divider sx={{ mx: 1, my: 1 }} />

          {/* Secondary Menu Items */}
          {secondaryItems.map((item, index) => (
            <MenuItem
              key={item.label}
              onClick={item.action}
              component={motion.div}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: (menuItems.length + index) * 0.05 }}
              sx={{
                borderRadius: 1.5,
                mx: 1,
                my: 0.2,
                px: 2,
                py: 1,
                '&:hover': {
                  backgroundColor: '#f1f5f9',
                },
                transition: 'all 0.2s ease',
              }}
            >
              <ListItemIcon sx={{ minWidth: 36 }}>
                {React.cloneElement(item.icon, {
                  sx: { color: '#64748b', fontSize: '1rem' }
                })}
              </ListItemIcon>
              <Typography variant="body2" sx={{ color: '#475569' }}>
                {item.label}
              </Typography>
            </MenuItem>
          ))}

          <Divider sx={{ mx: 1, my: 1 }} />

          {/* Logout Button */}
          <MenuItem
            onClick={handleLogout}
            disabled={logoutMutation.isPending}
            component={motion.div}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            sx={{
              borderRadius: 2,
              mx: 1,
              my: 0.5,
              px: 2,
              py: 1.5,
              backgroundColor: '#fee2e2',
              '&:hover': {
                backgroundColor: '#fecaca',
                transform: 'translateX(4px)',
              },
              transition: 'all 0.2s ease',
              opacity: logoutMutation.isPending ? 0.5 : 1
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <Paper
                sx={{
                  width: 32,
                  height: 32,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#ef444415',
                  border: '1px solid #ef444430',
                }}
              >
                <Logout sx={{ color: '#ef4444', fontSize: '1.1rem' }} />
              </Paper>
            </ListItemIcon>
            <Typography variant="body2" sx={{ fontWeight: 500, color: '#ef4444' }}>
              {logoutMutation.isPending ? 'Signing Out...' : 'Sign Out'}
            </Typography>
          </MenuItem>

          {/* Footer */}
          <Box sx={{ px: 2, py: 1.5, mt: 1 }}>
            <Typography variant="caption" sx={{ color: '#94a3b8', textAlign: 'center', display: 'block' }}>
              ShopEdge v2.0 • Premium Experience
            </Typography>
          </Box>
        </Menu>
      </AnimatePresence>
    </Box>
  );
};
