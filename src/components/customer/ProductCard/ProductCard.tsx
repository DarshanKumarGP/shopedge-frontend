import React, { useState, useRef } from 'react';
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
  const [imageError, setImageError] = useState(false);
  const imageAttempts = useRef(0);

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

  // Fallback image logic
  const getImageSources = () => {
    const sources: string[] = [];
    if (product.images && product.images.length > 0) {
      product.images.forEach(img => {
        if (img) {
          sources.push(img.replace(/\s+/g, '%20'));
          sources.push(img.replace(/\s+/g, '%20').replace(/\.png$/i, '.jpg'));
          sources.push(img.replace(/\s+/g, '%20').replace(/\.jpg$/i, '.png'));
        }
      });
    }
    const categoryFallbacks: Record<string, string> = {
      shirt: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=550&q=90',
      pant: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=550&q=90',
      mobile: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=550&q=90',
      tv: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=550&q=90',
      camera: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=550&q=90',
      laptop: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=550&q=90',
      accessory: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?auto=format&fit=crop&w=550&q=90'
    };
    const name = product.name.toLowerCase();
    if (name.includes('shirt')) sources.push(categoryFallbacks.shirt);
    else if (name.includes('pant') || name.includes('jean') || name.includes('trouser')) sources.push(categoryFallbacks.pant);
    else if (name.includes('mobile') || name.includes('phone') || name.includes('iphone') || name.includes('samsung')) sources.push(categoryFallbacks.mobile);
    else if (name.includes('tv') || name.includes('television')) sources.push(categoryFallbacks.tv);
    else if (name.includes('camera') || name.includes('dslr')) sources.push(categoryFallbacks.camera);
    else if (name.includes('laptop') || name.includes('macbook')) sources.push(categoryFallbacks.laptop);
    else sources.push(categoryFallbacks.accessory);

    sources.push(`https://picsum.photos/550/550?random=${product.product_id}`);
    sources.push(`https://via.placeholder.com/550x550/6366f1/fff?text=${encodeURIComponent(product.name.split(' ').slice(0, 2).join(' '))}`);
    return sources;
  };

  const imageSources = getImageSources();

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    imageAttempts.current += 1;
    if (imageAttempts.current < imageSources.length) {
      img.src = imageSources[imageAttempts.current];
    } else {
      setImageError(true);
    }
  };

  const handleImageLoad = () => {
    setImageError(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 260, damping: 24 }}
      style={{ height: '100%' }}
    >
      <Card
        sx={{
          height: '590px',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 4,
          boxShadow: '0 6px 32px 0 rgba(80,80,140,0.09)',
          border: '1.5px solid #f6f6fa',
          background: '#fff',
          transition: 'box-shadow 0.32s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.2s',
          overflow: 'hidden',
          position: 'relative',
          '&:hover': {
            boxShadow: '0 18px 60px 0 rgba(80, 80, 180, 0.17)',
            borderColor: '#6366f1'
          },
        }}
      >
        {/* Stock Status Badge */}
        <Box sx={{
          position: 'absolute',
          top: 18,
          right: 18,
          zIndex: 2,
        }}>
          <Chip
            icon={<Inventory sx={{ fontSize: 16 }} />}
            label={product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            size="small"
            sx={{
              backgroundColor: product.stock > 0 ? '#22c55e' : '#ef4444',
              color: 'white',
              fontWeight: 600,
              fontSize: '0.77rem',
              height: 24,
              px: 1.4,
              '& .MuiChip-icon': { color: 'white' },
            }}
          />
        </Box>

        {/* Product Image Placement */}
        <Box sx={{
          width: '100%',
          height: '340px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          backgroundColor: '#f7f7fa',
          borderBottom: '1px solid #eeeeee'
        }}>
          {!imageError ? (
            <CardMedia
              component="img"
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'contain', // crucial for showing whole image
                objectPosition: 'center',
                transition: 'transform 0.4s cubic-bezier(0.2,0.85,0.4,1)',
                '&:hover': { transform: 'scale(1.06)' }
              }}
              image={imageSources[0]}
              alt={product.name}
              onError={handleImageError}
              onLoad={handleImageLoad}
              loading="lazy"
            />
          ) : (
            <Box
              sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f1f5f9',
                color: '#64748b',
                textAlign: 'center',
                p: 2
              }}
            >
              <Box sx={{
                width: 68,
                height: 68,
                backgroundColor: '#e2e8f0',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 2
              }}>
                <ShoppingCart sx={{ fontSize: 30, color: '#94a3b8' }} />
              </Box>
              <Typography variant="caption" sx={{ fontWeight: 500 }}>
                {product.name.split(' ').slice(0, 2).join(' ')}
              </Typography>
              <Typography variant="caption" sx={{ fontSize: '0.7rem', mt: 0.5 }}>
                Image not available
              </Typography>
            </Box>
          )}
        </Box>

        {/* Product Details */}
        <CardContent 
          sx={{
            flexGrow: 1,
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: 0
          }}
        >
          <Box sx={{ flex: '1 1 auto', mb: 2 }}>
            <Typography
              variant="h6"
              component="h3"
              sx={{
                fontWeight: 700,
                color: '#1e293b',
                mb: 1,
                fontSize: '1.17rem',
                lineHeight: 1.33,
                height: '2.5rem',
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {product.name}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mb: 2,
                height: '2.25rem',
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                lineHeight: 1.25,
                fontSize: '0.92rem'
              }}
            >
              {product.description}
            </Typography>
          </Box>
          <Box>
            <Box sx={{ mb: 2 }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  color: '#6366f1',
                  fontSize: '1.47rem',
                }}
              >
                {formatPrice(product.price)}
              </Typography>
            </Box>
            <motion.div whileHover={{ scale: 1.025 }} whileTap={{ scale: 0.97 }}>
              <Button
                fullWidth
                variant="contained"
                startIcon={<ShoppingCart sx={{ fontSize: 19 }} />}
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                sx={{
                  py: 1.35,
                  borderRadius: 2.2,
                  background: product.stock > 0 
                    ? 'linear-gradient(135deg, #6366f1 0%, #5f59e5 100%)' 
                    : '#f0f0f0',
                  color: product.stock > 0 ? 'white' : '#64748b',
                  fontWeight: 700,
                  fontSize: '1.01rem',
                  textTransform: 'none',
                  boxShadow: product.stock > 0
                    ? '0 2px 12px rgba(102, 102, 241, 0.13)'
                    : 'none',
                  '&:hover': {
                    background: product.stock > 0 
                      ? 'linear-gradient(135deg, #5145ea 0%, #6366f1 100%)'
                      : '#e5e7eb'
                  },
                  '&:disabled': {
                    background: '#f3f4f6',
                    color: '#94a3b8',
                  }
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
