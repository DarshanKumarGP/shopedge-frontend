import React from 'react';
import { AppBar, Toolbar, Box, Container, Typography, IconButton, Badge } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../../common/Logo/Logo';
import { ShoppingCart } from '@mui/icons-material';
import { ProfileDropdown } from '../../common/ProfileDropdown/ProfileDropdown';

interface HeaderProps {
  cartCount: number;
  username: string;
}

export const Header: React.FC<HeaderProps> = ({ cartCount, username }) => {
  const navigate = useNavigate();

  return (
    <AppBar
      position="sticky"
      elevation={4}
      sx={{
        backgroundColor: 'white',
        color: '#1e293b',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid #e2e8f0',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          sx={{
            justifyContent: 'space-between',
            py: { xs: 1, md: 0.75 },
            minHeight: { xs: '56px', md: '64px' },
          }}
        >
          <Box
            sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
            <Logo />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, md: 3 } }}>
            <Typography
              variant="body2"
              sx={{
                display: { xs: 'none', sm: 'block' },
                fontWeight: 500,
              }}
            >
              Welcome, {username}!
            </Typography>

            <IconButton
              onClick={() => navigate('/cart')}
              color="primary"
              size="large"
              sx={{ ml: 1 }}
            >
              <Badge
                badgeContent={cartCount}
                color="success"
                sx={{
                  '& .MuiBadge-badge': {
                    fontSize: '0.75rem',
                    height: '18px',
                    minWidth: '18px',
                  },
                }}
              >
                <ShoppingCart />
              </Badge>
            </IconButton>

            <ProfileDropdown username={username} />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
