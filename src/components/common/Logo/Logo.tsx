import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { ShoppingBag } from '@mui/icons-material';

export const Logo: React.FC = () => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mr: 2,
            boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
          }}
        >
          <ShoppingBag sx={{ color: 'white', fontSize: 24 }} />
        </Box>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
          }}
        >
          ShopEdge
        </Typography>
      </Box>
    </motion.div>
  );
};
