import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, Alert, Container, Fab, Zoom } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { KeyboardArrowUp, ViewModule, ViewList, FilterList } from '@mui/icons-material';
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
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Handle scroll to show/hide scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Loading State with Modern Skeleton
  if (isLoading) {
    return (
      <Container maxWidth="xl" sx={{ py: 8 }}>
        {/* Modern Loading Header */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mb: 6,
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: -20,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '100px',
              height: '4px',
              background: 'linear-gradient(90deg, #667eea, #764ba2)',
              borderRadius: '2px',
              animation: 'pulse 2s infinite'
            }
          }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Box
              sx={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 3
              }}
            >
              <Box
                sx={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    inset: '4px',
                    borderRadius: '50%',
                    background: '#fff',
                    zIndex: 1
                  }
                }}
              >
                <CircularProgress 
                  size={40} 
                  sx={{ 
                    color: '#667eea',
                    zIndex: 2,
                    position: 'relative'
                  }} 
                />
              </Box>
            </Box>
          </motion.div>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 700,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 1,
                textAlign: 'center'
              }}
            >
              Curating Amazing Products
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: '#64748b',
                textAlign: 'center',
                fontSize: '1.1rem'
              }}
            >
              Discovering the perfect items just for you...
            </Typography>
          </motion.div>
        </Box>

        {/* Modern Skeleton Grid - 3 columns max */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)'
            },
            gap: 3,
            px: { xs: 1, sm: 2 }
          }}
        >
          {[...Array(6)].map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Box
                sx={{
                  height: '400px',
                  borderRadius: '24px',
                  background: 'linear-gradient(145deg, #f8fafc 0%, #f1f5f9 100%)',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)',
                    animation: 'shimmer 2s infinite'
                  }
                }}
              >
                <Box sx={{ p: 3 }}>
                  <Box
                    sx={{
                      height: '200px',
                      borderRadius: '16px',
                      backgroundColor: '#e2e8f0',
                      mb: 3
                    }}
                  />
                  <Box
                    sx={{
                      height: '20px',
                      borderRadius: '10px',
                      backgroundColor: '#cbd5e1',
                      mb: 2
                    }}
                  />
                  <Box
                    sx={{
                      height: '16px',
                      borderRadius: '8px',
                      backgroundColor: '#e2e8f0',
                      width: '70%',
                      mb: 3
                    }}
                  />
                  <Box
                    sx={{
                      height: '40px',
                      borderRadius: '20px',
                      backgroundColor: '#cbd5e1'
                    }}
                  />
                </Box>
              </Box>
            </motion.div>
          ))}
        </Box>

        <style>
          {`
            @keyframes shimmer {
              0% { transform: translateX(-100%); }
              100% { transform: translateX(100%); }
            }
            @keyframes pulse {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.5; }
            }
          `}
        </style>
      </Container>
    );
  }

  // Error State with Modern Design
  if (error) {
    return (
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Box
            sx={{
              textAlign: 'center',
              py: 8,
              px: 4,
              borderRadius: '32px',
              background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
              border: '1px solid #fca5a5',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: 'linear-gradient(90deg, #ef4444, #dc2626)'
              }
            }}
          >
            <Typography
              variant="h4"
              sx={{
                color: '#dc2626',
                fontWeight: 700,
                mb: 2
              }}
            >
              Oops! Something went wrong
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#991b1b',
                fontSize: '1.1rem',
                maxWidth: '600px',
                mx: 'auto'
              }}
            >
              {error}
            </Typography>
          </Box>
        </motion.div>
      </Container>
    );
  }

  // Empty State with Modern Design
  if (products.length === 0) {
    return (
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Box
            sx={{
              textAlign: 'center',
              py: 12,
              px: 4,
              borderRadius: '32px',
              background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
              border: '1px solid #e2e8f0',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <Box
              sx={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 4,
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  inset: '8px',
                  borderRadius: '50%',
                  background: '#fff'
                }
              }}
            >
              <FilterList sx={{ fontSize: '48px', color: '#667eea', zIndex: 1 }} />
            </Box>
            
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                background: 'linear-gradient(135deg, #1e293b 0%, #475569 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 3
              }}
            >
              No Products Found
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#64748b',
                fontSize: '1.2rem',
                maxWidth: '500px',
                mx: 'auto',
                lineHeight: 1.6
              }}
            >
              We couldn't find any products matching your criteria. Try adjusting your filters or explore our other categories.
            </Typography>
          </Box>
        </motion.div>
      </Container>
    );
  }

  // Main Product Grid
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Modern Header with View Controls */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 6,
            py: 3,
            px: 4,
            borderRadius: '24px',
            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(102, 126, 234, 0.1)'
          }}
        >
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                background: 'linear-gradient(135deg, #1e293b 0%, #475569 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 1
              }}
            >
              Discover Products
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#64748b',
                fontSize: '1.1rem'
              }}
            >
              {products.length} premium items curated for you
            </Typography>
          </Box>

          {/* View Mode Toggle */}
          <Box
            sx={{
              display: 'flex',
              borderRadius: '16px',
              background: '#fff',
              p: 0.5,
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              border: '1px solid #e2e8f0'
            }}
          >
            <Box
              onClick={() => setViewMode('grid')}
              sx={{
                p: 1.5,
                borderRadius: '12px',
                cursor: 'pointer',
                background: viewMode === 'grid' 
                  ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                  : 'transparent',
                color: viewMode === 'grid' ? '#fff' : '#64748b',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                '&:hover': {
                  background: viewMode === 'grid' 
                    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                    : '#f8fafc'
                }
              }}
            >
              <ViewModule />
            </Box>
            <Box
              onClick={() => setViewMode('list')}
              sx={{
                p: 1.5,
                borderRadius: '12px',
                cursor: 'pointer',
                background: viewMode === 'list' 
                  ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                  : 'transparent',
                color: viewMode === 'list' ? '#fff' : '#64748b',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                '&:hover': {
                  background: viewMode === 'list' 
                    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                    : '#f8fafc'
                }
              }}
            >
              <ViewList />
            </Box>
          </Box>
        </Box>
      </motion.div>

      {/* Products Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={viewMode}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: viewMode === 'grid' 
                ? {
                    xs: '1fr',
                    sm: 'repeat(2, 1fr)',
                    md: 'repeat(3, 1fr)'
                  }
                : '1fr',
              gap: {
                xs: 2,
                sm: 3,
                md: 4
              },
              px: { xs: 1, sm: 2 }
            }}
          >
            {products.map((product, index) => (
              <motion.div
                key={product.product_id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.05,
                  duration: 0.6,
                  ease: [0.25, 0.4, 0.25, 1]
                }}
              >
                <Box
                  sx={{
                    height: '100%',
                    borderRadius: '28px',
                    overflow: 'hidden',
                    background: '#fff',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
                    border: '1px solid #f1f5f9',
                    position: 'relative',
                    cursor: 'pointer',
                    transform: 'translateY(0)',
                    transformOrigin: 'center',
                    backfaceVisibility: 'hidden',
                    willChange: 'transform, box-shadow',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '4px',
                      background: 'transparent',
                      borderTopLeftRadius: '28px',
                      borderTopRightRadius: '28px',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      zIndex: 1
                    },
                    '&:hover': {
                      transform: 'translateY(-12px) scale(1.02)',
                      boxShadow: '0 20px 40px rgba(102, 126, 234, 0.15), 0 8px 16px rgba(0,0,0,0.1)',
                      '&::before': {
                        background: 'linear-gradient(90deg, #667eea, #764ba2)'
                      }
                    }
                  }}
                >
                  <ProductCard 
                    product={product} 
                    onAddToCart={onAddToCart}
                  />
                </Box>
              </motion.div>
            ))}
          </Box>
        </motion.div>
      </AnimatePresence>

      {/* Floating Scroll to Top Button */}
      <Zoom in={showScrollTop}>
        <Fab
          onClick={scrollToTop}
          sx={{
            position: 'fixed',
            bottom: 32,
            right: 32,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: '#fff',
            width: 56,
            height: 56,
            boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
            '&:hover': {
              background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
              transform: 'translateY(-2px)',
              boxShadow: '0 12px 40px rgba(102, 126, 234, 0.4)'
            },
            transition: 'all 0.3s ease'
          }}
        >
          <KeyboardArrowUp />
        </Fab>
      </Zoom>
    </Container>
  );
};