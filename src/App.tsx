import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, GlobalStyles } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import { theme } from './styles/theme';
import { CartPage } from './pages/Customer/CartPage';
import { OrdersPage } from './pages/Customer/OrdersPage';
import RegisterPage from './pages/Auth/Register';
import LoginPage from './pages/Auth/Login';
import CustomerHome from './pages/Customer/CustomerHome';

import AdminLogin from './pages/Admin/AdminLogin/AdminLogin';
import AdminDashboard from './pages/Admin/AdminDashboard/AdminDashboard';
import AdminGuard from './pages/Admin/AdminGuard/AdminGuard';

// NEW: Import your stunning homepage
import Homepage from './pages/Home/Homepage';
import './styles/globals.css';

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
      '::selection': {
        background: 'rgba(102, 126, 234, 0.2)',
        color: '#1e293b',
      },
      '::-moz-selection': {
        background: 'rgba(102, 126, 234, 0.2)',
        color: '#1e293b',
      },
      'button:focus-visible, a:focus-visible, input:focus-visible, select:focus-visible, textarea:focus-visible': {
        outline: '2px solid #667eea',
        outlineOffset: '2px',
        borderRadius: '4px',
      },
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
          transform: 'translateY(20px)',
        },
        to: {
          opacity: 1,
          transform: 'translateY(0)',
        },
      },
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
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: true,
      retry: (failureCount, error: any) => {
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
        {/* UPDATED: Changed root route to show Homepage instead of redirecting to login */}
        <Route path="/" element={<Homepage />} />
        
        {/* NEW: Add dedicated homepage route */}
        <Route path="/home" element={<Homepage />} />

        {/* Authentication */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Customer */}
        <Route path="/customerhome" element={<CustomerHome />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/orders" element={<OrdersPage />} />

        {/* Admin */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <AdminGuard>
              <AdminDashboard />
            </AdminGuard>
          }
        />

        {/* NEW: Add category routes for homepage navigation */}
        <Route path="/categories/:category" element={<Homepage />} />
        <Route path="/deals" element={<Homepage />} />
        <Route path="/products" element={<Homepage />} />
        <Route path="/product/:id" element={<Homepage />} />

        {/* Fallback - Keep your existing fallback */}
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
      boxShadow:
        '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
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

            {/* Toasts */}
            <Toaster {...toastConfig} />

            {/* Devtools */}
            {process.env.NODE_ENV === 'development' && (
              <ReactQueryDevtools initialIsOpen={false} />
            )}
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
