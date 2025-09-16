import React, { useState, useEffect } from 'react';
import { Box, CssBaseline } from '@mui/material';
import { Header } from '../../components/customer/Header/Header';
import { CategoryNavigation } from '../../components/customer/CategoryNavigation/CategoryNavigation';
import { ProductGrid } from '../../components/customer/ProductGrid/ProductGrid';
import { Footer } from '../../components/customer/Footer/Footer';
import { useProducts, useCategories } from '../../hooks/useProducts';
import toast from 'react-hot-toast';

const fetchCartCount = async (username: string): Promise<number> => {
  if (!username || username === 'Guest') return 0;
  try {
    const resp = await fetch(
      `http://localhost:9090/api/cart/items/count?username=${encodeURIComponent(username)}`,
      { credentials: 'include' }
    );
    if (!resp.ok) throw new Error('Cart count fetch failed');
    const data = await resp.json();
    return data.cartCount || 0;
  } catch {
    return 0;
  }
};

const CustomerHome: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [cartCount, setCartCount] = useState(0);

  // Fetch products based on selected category
  const { data: productsData, isLoading: isLoadingProducts, error: productsError } =
    useProducts(selectedCategory || undefined);
  // Fetch categories for navigation
  const { data: categoriesData } = useCategories();

  // Read username from localStorage, which should be set after login
  const username = localStorage.getItem('username') || productsData?.user?.name || 'Guest';

  // Keep cart count always in sync
  useEffect(() => {
    if (username && username !== 'Guest') {
      fetchCartCount(username).then(setCartCount);
    }
  }, [username]);

  const handleCategoryClick = (category: string | null) => {
    setSelectedCategory(category);
  };

  const handleAddToCart = async (productId: number) => {
    try {
      const resp = await fetch('http://localhost:9090/api/cart/add', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          productId,
          quantity: 1,
        }),
      });
      const data = await resp.json();
      if (resp.ok) {
        // Re-fetch cart count from backend for true sync
        fetchCartCount(username).then(setCartCount);
        toast.success('Added to cart!');
      } else {
        toast.error(data.error || 'Failed to add to cart');
      }
      console.log('Add to cart:', productId, 'Response:', data);
    } catch (err) {
      console.error(err);
      toast.error('Failed to add to cart (network)');
    }
  };

  // Extract data with fallbacks
  const products = productsData?.products || [];
  const categories =
    categoriesData?.map((cat: any) => cat.categoryName) || [
      'Shirts',
      'Pants',
      'Accessories',
      'Mobiles',
      'Mobile Accessories',
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
