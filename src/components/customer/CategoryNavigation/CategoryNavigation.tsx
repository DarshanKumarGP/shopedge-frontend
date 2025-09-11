import React from 'react';
import { Box, Chip, Container } from '@mui/material';
import { motion } from 'framer-motion';

interface CategoryNavigationProps {
  categories: string[];
  selectedCategory: string | null;
  onCategoryClick: (category: string | null) => void;
}

export const CategoryNavigation: React.FC<CategoryNavigationProps> = ({
  categories,
  selectedCategory,
  onCategoryClick,
}) => {
  return (
    <Box
      sx={{
        backgroundColor: '#1e293b',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        py: 2,
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            overflowX: 'auto',
            pb: 1,
            '&::-webkit-scrollbar': {
              height: 4,
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: 'rgba(255,255,255,0.05)',
              borderRadius: 2,
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'rgba(255,255,255,0.2)',
              borderRadius: 2,
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.3)',
              },
            },
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Chip
              label="All Products"
              onClick={() => onCategoryClick(null)}
              variant={selectedCategory === null ? 'filled' : 'outlined'}
              sx={{
                color: 'white',
                borderColor: 'rgba(255,255,255,0.3)',
                backgroundColor: selectedCategory === null ? '#667eea' : 'transparent',
                fontWeight: 600,
                fontSize: '0.9rem',
                height: 40,
                px: 2,
                '&:hover': {
                  backgroundColor: selectedCategory === null ? '#5a67d8' : 'rgba(255,255,255,0.1)',
                  borderColor: 'rgba(255,255,255,0.5)',
                },
                cursor: 'pointer',
                minWidth: 'auto',
                whiteSpace: 'nowrap',
                transition: 'all 0.3s ease',
              }}
            />
          </motion.div>

          {categories.map((category, index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * (index + 2) }}
            >
              <Chip
                label={category}
                onClick={() => onCategoryClick(category)}
                variant={selectedCategory === category ? 'filled' : 'outlined'}
                sx={{
                  color: 'white',
                  borderColor: 'rgba(255,255,255,0.3)',
                  backgroundColor: selectedCategory === category ? '#667eea' : 'transparent',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  height: 40,
                  px: 2,
                  '&:hover': {
                    backgroundColor: selectedCategory === category ? '#5a67d8' : 'rgba(255,255,255,0.1)',
                    borderColor: 'rgba(255,255,255,0.5)',
                  },
                  cursor: 'pointer',
                  minWidth: 'auto',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.3s ease',
                }}
              />
            </motion.div>
          ))}
        </Box>
      </Container>
    </Box>
  );
};
