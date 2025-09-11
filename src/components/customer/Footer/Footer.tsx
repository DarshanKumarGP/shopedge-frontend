import React from 'react';
import { Box, Container, Typography, Link, Grid } from '@mui/material';
import { motion } from 'framer-motion';

export const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#2c3e50',
        color: 'white',
        mt: 8,
        py: 6,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  mb: 2,
                }}
              >
                ShopEdge
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: '#bdc3c7',
                  lineHeight: 1.6,
                }}
              >
                Your one-stop shop for all your needs. Discover amazing products with the best prices and quality.
              </Typography>
            </motion.div>
          </Grid>
          
          <Grid size={{ xs: 12, md: 8 }}>
            <Grid container spacing={4}>
              <Grid size={{ xs: 6, md: 3 }}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    Company
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Link href="#" color="inherit" sx={{ color: '#bdc3c7', '&:hover': { color: 'white' } }}>
                      About Us
                    </Link>
                    <Link href="#" color="inherit" sx={{ color: '#bdc3c7', '&:hover': { color: 'white' } }}>
                      Contact
                    </Link>
                    <Link href="#" color="inherit" sx={{ color: '#bdc3c7', '&:hover': { color: 'white' } }}>
                      Careers
                    </Link>
                  </Box>
                </motion.div>
              </Grid>
              
              <Grid size={{ xs: 6, md: 3 }}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    Support
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Link href="#" color="inherit" sx={{ color: '#bdc3c7', '&:hover': { color: 'white' } }}>
                      Help Center
                    </Link>
                    <Link href="#" color="inherit" sx={{ color: '#bdc3c7', '&:hover': { color: 'white' } }}>
                      Returns
                    </Link>
                    <Link href="#" color="inherit" sx={{ color: '#bdc3c7', '&:hover': { color: 'white' } }}>
                      Shipping
                    </Link>
                  </Box>
                </motion.div>
              </Grid>
              
              <Grid size={{ xs: 12, md: 6 }}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    Legal
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Link href="#" color="inherit" sx={{ color: '#bdc3c7', '&:hover': { color: 'white' } }}>
                      Terms of Service
                    </Link>
                    <Link href="#" color="inherit" sx={{ color: '#bdc3c7', '&:hover': { color: 'white' } }}>
                      Privacy Policy
                    </Link>
                  </Box>
                </motion.div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        
        <Box
          sx={{
            borderTop: '1px solid rgba(255,255,255,0.1)',
            mt: 4,
            pt: 3,
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" sx={{ color: '#95a5a6' }}>
            © 2025 ShopEdge. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};
