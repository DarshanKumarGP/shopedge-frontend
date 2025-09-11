import React from 'react';
import { Badge, IconButton, Tooltip } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface CartIconProps {
  count: number;
}

export const CartIcon: React.FC<CartIconProps> = ({ count }) => {
  const navigate = useNavigate();

  const handleCartClick = () => {
    navigate('/cart');
  };

  return (
    <Tooltip title="View Cart" arrow>
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <IconButton
          onClick={handleCartClick}
          sx={{
            color: 'white',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
          }}
        >
          <Badge
            badgeContent={count}
            color="error"
            sx={{
              '& .MuiBadge-badge': {
                backgroundColor: '#ff4444',
                color: 'white',
                fontWeight: 'bold',
              },
            }}
          >
            <ShoppingCart />
          </Badge>
        </IconButton>
      </motion.div>
    </Tooltip>
  );
};
