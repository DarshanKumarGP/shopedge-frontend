import React from 'react';
import { AppBar, Toolbar, Box, Container, Typography } from '@mui/material';
import { Logo } from '../../common/Logo/Logo';
import { CartIcon } from '../../common/CartIcon/CartIcon';
import { ProfileDropdown } from '../../common/ProfileDropdown/ProfileDropdown';

interface HeaderProps {
  cartCount: number;
  username: string;
}

export const Header: React.FC<HeaderProps> = ({ cartCount, username }) => {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar 
          sx={{ 
            justifyContent: 'space-between', 
            py: 1.5,
            minHeight: { xs: '64px', md: '70px' },
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Logo />
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Typography
              variant="body1"
              sx={{
                color: 'rgba(255,255,255,0.9)',
                fontWeight: 500,
                display: { xs: 'none', sm: 'block' },
              }}
            >
              Welcome, {username}!
            </Typography>
            <CartIcon count={cartCount} />
            <ProfileDropdown username={username} />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
