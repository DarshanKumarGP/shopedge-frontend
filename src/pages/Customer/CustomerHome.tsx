import React, { useState } from 'react';
import { Box, CssBaseline } from '@mui/material';
import { Header } from '../../components/customer/Header/Header';
import { CategoryNavigation } from '../../components/customer/CategoryNavigation/CategoryNavigation';
import { ProductGrid } from '../../components/customer/ProductGrid/ProductGrid';
import { Footer } from '../../components/customer/Footer/Footer';
import { useProducts, useCategories } from '../../hooks/useProducts';
import toast from 'react-hot-toast';

const CustomerHome: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [cartCount, setCartCount] = useState(0);

  // Fetch products based on selected category
  const { data: productsData, isLoading: isLoadingProducts, error: productsError } = useProducts(selectedCategory || undefined);
  
  // Fetch categories for navigation
  const { data: categoriesData } = useCategories();

  const handleCategoryClick = (category: string | null) => {
    setSelectedCategory(category);
  };

  const handleAddToCart = (productId: number) => {
    // TODO: Implement actual cart functionality with backend
    setCartCount(prev => prev + 1);
    console.log('Adding product to cart:', productId);
    // For now, just show success message
    // Later integrate with cart API
  };

  // Extract data with fallbacks
  const products = productsData?.products || [];
  const username = productsData?.user?.name || 'Guest';
  const categories = categoriesData?.map((cat: any) => cat.categoryName) || [
    'Shirts', 'Pants', 'Accessories', 'Mobiles', 'Mobile Accessories'
  ];

  const errorMessage = productsError instanceof Error ? productsError.message : null;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />
      
      {/* Header */}
      <Header cartCount={cartCount} username={username} />
      
      {/* Category Navigation */}
      <CategoryNavigation
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryClick={handleCategoryClick}
      />
      
      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          backgroundColor: '#f8fafc',
          minHeight: 'calc(100vh - 200px)',
        }}
      >
        <ProductGrid
          products={products}
          isLoading={isLoadingProducts}
          error={errorMessage}
          onAddToCart={handleAddToCart}
        />
      </Box>
      
      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default CustomerHome;
