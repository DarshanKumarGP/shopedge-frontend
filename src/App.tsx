import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, GlobalStyles } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';
import { theme } from './styles/theme';
import { CartPage } from './pages/Customer/CartPage';
import { OrdersPage } from './pages/Customer/OrdersPage';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import RegisterPage from './pages/Auth/Register';
import LoginPage from './pages/Auth/Login';
import CustomerHome from './pages/Customer/CustomerHome';
import AdminHome from './pages/Admin/AdminHome';

// Enhanced Global Styles for modern look
const globalStyles = (
  <GlobalStyles
    styles={{
      '*': {
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
      },
      html: {
        height: '100%',
        scrollBehavior: 'smooth',
      },
      body: {
        height: '100%',
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        minHeight: '100vh',
      },
      '#root': {
        height: '100%',
        minHeight: '100vh',
      },
      // Custom scrollbar styles
      '::-webkit-scrollbar': {
        width: '8px',
        height: '8px',
      },
      '::-webkit-scrollbar-track': {
        background: '#f1f5f9',
        borderRadius: '4px',
      },
      '::-webkit-scrollbar-thumb': {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '4px',
        '&:hover': {
          background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
        },
      },
      '::-webkit-scrollbar-corner': {
        background: '#f1f5f9',
      },
      // Selection styles
      '::selection': {
        background: 'rgba(102, 126, 234, 0.2)',
        color: '#1e293b',
      },
      '::-moz-selection': {
        background: 'rgba(102, 126, 234, 0.2)',
        color: '#1e293b',
      },
      // Focus styles
      'button:focus-visible, a:focus-visible, input:focus-visible, select:focus-visible, textarea:focus-visible': {
        outline: '2px solid #667eea',
        outlineOffset: '2px',
        borderRadius: '4px',
      },
      // Animation utilities
      '.fade-in': {
        animation: 'fadeIn 0.5s ease-in-out',
      },
      '.slide-in': {
        animation: 'slideIn 0.6s ease-out',
      },
      '@keyframes fadeIn': {
        from: { opacity: 0 },
        to: { opacity: 1 },
      },
      '@keyframes slideIn': {
        from: { 
          opacity: 0, 
          transform: 'translateY(20px)' 
        },
        to: { 
          opacity: 1, 
          transform: 'translateY(0)' 
        },
      },
      // Loading states
      '.loading': {
        position: 'relative',
        overflow: 'hidden',
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
          transform: 'translateX(-100%)',
          animation: 'loading 1.5s infinite',
        },
      },
      '@keyframes loading': {
        '100%': {
          transform: 'translateX(100%)',
        },
      },
    }}
  />
);

// Enhanced Query Client with better defaults
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: true,
      retry: (failureCount, error: any) => {
        // Don't retry on 4xx errors except 408, 429
        if (error?.status >= 400 && error?.status < 500 && ![408, 429].includes(error.status)) {
          return false;
        }
        return failureCount < 3;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
    mutations: {
      retry: 1,
      retryDelay: 1000,
    },
  },
});

// Enhanced Route Animation Wrapper
const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        {/* Default route redirects to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Authentication Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Role-based Home Routes */}
        <Route path="/customerhome" element={<CustomerHome />} />
        <Route path="/adminhome" element={<AdminHome />} />
        
        {/* Customer Feature Routes */}
        <Route path="/cart" element={<CartPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        
        {/* Future routes (placeholder for now) */}
        <Route path="/profile" element={<Navigate to="/customerhome" />} />
        <Route path="/wishlist" element={<Navigate to="/customerhome" />} />
        <Route path="/track-orders" element={<Navigate to="/orders" />} />
        <Route path="/payment-methods" element={<Navigate to="/customerhome" />} />
        <Route path="/settings" element={<Navigate to="/customerhome" />} />
        <Route path="/support" element={<Navigate to="/customerhome" />} />
        <Route path="/language" element={<Navigate to="/customerhome" />} />
        
        {/* Catch all route - redirect to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </AnimatePresence>
  );
};

// Enhanced Toast Configuration
const toastConfig = {
  position: 'top-right' as const,
  toastOptions: {
    duration: 4000,
    style: {
      background: 'rgba(255, 255, 255, 0.95)',
      color: '#1e293b',
      borderRadius: '12px',
      padding: '16px 20px',
      fontSize: '14px',
      fontWeight: '500',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      maxWidth: '420px',
    },
    success: {
      iconTheme: {
        primary: '#10b981',
        secondary: '#ffffff',
      },
      style: {
        background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
        color: '#065f46',
        border: '1px solid #10b981',
      },
    },
    error: {
      iconTheme: {
        primary: '#ef4444',
        secondary: '#ffffff',
      },
      style: {
        background: 'linear-gradient(135deg, #fef2f2 0%, #fecaca 100%)',
        color: '#991b1b',
        border: '1px solid #ef4444',
      },
    },
    loading: {
      iconTheme: {
        primary: '#667eea',
        secondary: '#ffffff',
      },
      style: {
        background: 'linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)',
        color: '#3730a3',
        border: '1px solid #667eea',
      },
    },
  },
};

// Main App Component
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {globalStyles}
        <BrowserRouter>
          <div className="app-container fade-in">
            <AnimatedRoutes />
            
            {/* Enhanced Toast Notifications */}
            <Toaster {...toastConfig} />
            
            {/* React Query Devtools (only in development) - FIXED */}
            {process.env.NODE_ENV === 'development' && (
              <ReactQueryDevtools 
                initialIsOpen={false}
              />
            )}
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
