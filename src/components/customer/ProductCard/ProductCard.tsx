import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Chip,
} from '@mui/material';
import { ShoppingCart, Inventory } from '@mui/icons-material';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

interface Product {
  product_id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const handleAddToCart = () => {
    if (product.stock > 0) {
      onAddToCart(product.product_id);
      toast.success(`${product.name} added to cart!`);
    } else {
      toast.error('Product is out of stock');
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(price);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      style={{ height: '100%' }}
    >
      <Card
        sx={{
          height: '480px', // FIXED HEIGHT for consistency
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 3,
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          overflow: 'hidden',
          position: 'relative',
          backgroundColor: '#ffffff',
          border: '1px solid #f0f0f0',
          '&:hover': {
            boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
            borderColor: '#667eea',
          },
        }}
      >
        {/* Stock Status Badge */}
        <Box
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            zIndex: 2,
          }}
        >
          <Chip
            icon={<Inventory sx={{ fontSize: 14 }} />}
            label={product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            size="small"
            sx={{
              backgroundColor: product.stock > 0 ? '#22c55e' : '#ef4444',
              color: 'white',
              fontWeight: 600,
              fontSize: '0.75rem',
              height: 24,
              '& .MuiChip-icon': {
                color: 'white',
              },
            }}
          />
        </Box>

        {/* Product Image - FIXED ASPECT RATIO */}
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: '280px', // FIXED HEIGHT
            overflow: 'hidden',
            backgroundColor: '#f8f9fa',
          }}
        >
          <CardMedia
            component="img"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover', // PROPER IMAGE FIT
              objectPosition: 'center',
              transition: 'transform 0.4s ease',
              '&:hover': {
                transform: 'scale(1.08)',
              },
            }}
            image={product.images[0] || 'https://via.placeholder.com/300x280/f1f5f9/64748b?text=No+Image'}
            alt={product.name}
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x280/f1f5f9/64748b?text=Image+Error';
            }}
          />
        </Box>

        {/* Product Details - FIXED SPACING */}
        <CardContent 
          sx={{ 
            flexGrow: 1, 
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Box>
            {/* Product Name */}
            <Typography
              variant="h6"
              component="h3"
              sx={{
                fontWeight: 600,
                color: '#1e293b',
                mb: 1,
                fontSize: '1.1rem',
                lineHeight: 1.3,
                height: '2.6rem', // FIXED HEIGHT for consistency
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {product.name}
            </Typography>

            {/* Product Description */}
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mb: 2,
                height: '2.4rem', // FIXED HEIGHT
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                lineHeight: 1.2,
                fontSize: '0.875rem',
              }}
            >
              {product.description}
            </Typography>
          </Box>

          {/* Price and Button */}
          <Box>
            <Box sx={{ mb: 2 }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  color: '#667eea',
                  fontSize: '1.5rem',
                }}
              >
                {formatPrice(product.price)}
              </Typography>
            </Box>

            {/* Add to Cart Button */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                fullWidth
                variant="contained"
                startIcon={<ShoppingCart sx={{ fontSize: 18 }} />}
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                sx={{
                  py: 1.2,
                  borderRadius: 2,
                  background: product.stock > 0 
                    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                    : '#e2e8f0',
                  color: product.stock > 0 ? 'white' : '#64748b',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  textTransform: 'none',
                  transition: 'all 0.3s ease',
                  boxShadow: product.stock > 0 
                    ? '0 4px 12px rgba(102, 126, 234, 0.4)' 
                    : 'none',
                  '&:hover': {
                    background: product.stock > 0 
                      ? 'linear-gradient(135deg, #5a67d8 0%, #667eea 100%)' 
                      : '#e2e8f0',
                    boxShadow: product.stock > 0 
                      ? '0 6px 20px rgba(102, 126, 234, 0.6)' 
                      : 'none',
                  },
                  '&:disabled': {
                    background: '#e2e8f0',
                    color: '#94a3b8',
                  },
                }}
              >
                {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
              </Button>
            </motion.div>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};
