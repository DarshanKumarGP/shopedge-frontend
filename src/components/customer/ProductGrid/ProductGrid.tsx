import React from 'react';
import { Box, Typography, CircularProgress, Alert, Container } from '@mui/material';
import { motion } from 'framer-motion';
import { ProductCard } from '../ProductCard/ProductCard';

interface Product {
  product_id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
}

interface ProductGridProps {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  onAddToCart: (productId: number) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  isLoading,
  error,
  onAddToCart,
}) => {
  if (isLoading) {
    return (
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '400px',
            gap: 3,
          }}
        >
          <CircularProgress size={50} sx={{ color: '#667eea' }} />
          <Typography variant="h6" color="text.secondary">
            Loading amazing products...
          </Typography>
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ borderRadius: 2, fontSize: '1rem' }}>
          {error}
        </Alert>
      </Container>
    );
  }

  if (products.length === 0) {
    return (
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Box
          sx={{
            textAlign: 'center',
            py: 8,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: '#64748b',
              fontWeight: 600,
              mb: 2,
            }}
          >
            No products found
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#94a3b8',
              fontSize: '1.1rem',
            }}
          >
            Try selecting a different category or check back later.
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Products Grid - PERFECT RESPONSIVE LAYOUT */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',                    // 1 column on mobile
              sm: 'repeat(2, 1fr)',         // 2 columns on small tablets
              md: 'repeat(3, 1fr)',         // 3 columns on medium screens
              lg: 'repeat(4, 1fr)',         // 4 columns on large screens
              xl: 'repeat(5, 1fr)',         // 5 columns on extra large
            },
            gap: {
              xs: 2,
              sm: 3,
              md: 3,
              lg: 3,
            },
            px: {
              xs: 1,
              sm: 2,
            },
          }}
        >
          {products.map((product, index) => (
            <motion.div
              key={product.product_id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: index * 0.05, // Staggered animation
                duration: 0.5,
                ease: 'easeOut',
              }}
            >
              <ProductCard product={product} onAddToCart={onAddToCart} />
            </motion.div>
          ))}
        </Box>
      </motion.div>
    </Container>
  );
};
