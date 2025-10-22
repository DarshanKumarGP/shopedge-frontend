import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'user' | 'admin';
}

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [user, setUser] = useState<User | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    // Check for existing user session
    const checkUserSession = () => {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      if (token && userData) {
        try {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
        } catch (error) {
          console.error('Error parsing user data:', error);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      }
    };

    // Load cart count
    const loadCartCount = () => {
      const cartCount = localStorage.getItem('cartCount') || '0';
      setCartItemsCount(parseInt(cartCount));
    };

    window.addEventListener('scroll', handleScroll);
    checkUserSession();
    loadCartCount();

    // Listen for storage changes (login/logout from other tabs)
    const handleStorageChange = () => {
      checkUserSession();
      loadCartCount();
    };
    
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      if (user) {
        // User is logged in, redirect to customer home with search
        navigate(`/customerhome?search=${encodeURIComponent(searchQuery)}`);
      } else {
        // User not logged in, store search and redirect to login
        sessionStorage.setItem('pendingSearch', searchQuery);
        sessionStorage.setItem('redirectAfterLogin', `/customerhome?search=${encodeURIComponent(searchQuery)}`);
        navigate('/login');
      }
    }
  };

  const handleTrackOrder = () => {
    if (user) {
      navigate('/orders');
    } else {
      sessionStorage.setItem('redirectAfterLogin', '/orders');
      navigate('/login');
    }
  };

  const handleViewAllProducts = () => {
    if (user) {
      navigate('/customerhome');
    } else {
      sessionStorage.setItem('redirectAfterLogin', '/customerhome');
      navigate('/login');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCartItemsCount(0);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('cartCount');
    sessionStorage.clear();
    setIsDropdownOpen(false);
    navigate('/');
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      {/* Top Bar */}
      <div className={styles.topBar}>
        <div className="container">
          <div className={styles.topBarContent}>
            <div className={styles.topBarLeft}>
              <span className={styles.offer}>🚚 Free Shipping on Orders Over ₹2000!</span>
            </div>
            <div className={styles.topBarRight}>
              <a href="tel:+919876543210" className={styles.topBarLink}>
                📞 Call Us: +91 98765-43210
              </a>
              <button onClick={handleTrackOrder} className={styles.topBarLink}>
                📦 Track Order
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className={styles.mainHeader}>
        <div className="container">
          <div className={styles.headerContent}>
            {/* Logo */}
            <Link to="/" className={styles.logo}>
              <div className={styles.logoIcon}>🛍️</div>
              <span className={styles.logoText}>
                Shop<span className={styles.logoAccent}>Edge</span>
              </span>
            </Link>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className={styles.searchForm}>
              <div className={styles.searchContainer}>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for products, brands, categories..."
                  className={styles.searchInput}
                />
                <button type="submit" className={styles.searchButton}>
                  🔍
                </button>
              </div>
            </form>

            {/* Header Actions */}
            <div className={styles.headerActions}>
              {/* User Account */}
              <div className={styles.userMenu}>
                {user ? (
                  <div className={styles.dropdown}>
                    <button 
                      className={styles.userButton}
                      onClick={toggleDropdown}
                    >
                      👤 {user.name}
                      <span className={styles.dropdownArrow}>▼</span>
                    </button>
                    {isDropdownOpen && (
                      <div className={styles.dropdownContent}>
                        <Link 
                          to="/customerhome" 
                          className={styles.dropdownItem}
                          onClick={closeDropdown}
                        >
                          🏠 Products
                        </Link>
                        <Link 
                          to="/orders" 
                          className={styles.dropdownItem}
                          onClick={closeDropdown}
                        >
                          📦 My Orders
                        </Link>
                        <Link 
                          to="/profile" 
                          className={styles.dropdownItem}
                          onClick={closeDropdown}
                        >
                          👤 Profile
                        </Link>
                        <Link 
                          to="/wishlist" 
                          className={styles.dropdownItem}
                          onClick={closeDropdown}
                        >
                          ❤️ Wishlist
                        </Link>
                        <button 
                          onClick={handleLogout} 
                          className={styles.dropdownItem}
                        >
                          🚪 Logout
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className={styles.authButtons}>
                    <Link to="/login" className={styles.loginButton}>
                      Login
                    </Link>
                    <Link to="/register" className={styles.registerButton}>
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>

              {/* Shopping Cart - Only show when logged in */}
              {user && (
                <Link to="/cart" className={styles.cartButton}>
                  <span className={styles.cartIcon}>🛒</span>
                  <span className={styles.cartText}>Cart</span>
                  {cartItemsCount > 0 && (
                    <span className={styles.cartBadge}>{cartItemsCount}</span>
                  )}
                </Link>
              )}

              {/* Mobile Menu Toggle */}
              <button
                className={styles.mobileMenuToggle}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? '✕' : '☰'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Static Navigation - No Click Functionality */}
      <nav className={styles.navigation}>
        <div className="container">
          <div className={`${styles.navContent} ${isMenuOpen ? styles.open : ''}`}>
            <div className={styles.navItem}>
              📱 Electronics
            </div>
            <div className={styles.navItem}>
              👗 Fashion
            </div>
            <div className={styles.navItem}>
              🏠 Home & Garden
            </div>
            <div className={styles.navItem}>
              ⚽ Sports
            </div>
            <div className={styles.navItem}>
              📚 Books
            </div>
            <div className={styles.navItem}>
              💄 Beauty
            </div>
            <div className={styles.navItem}>
              <span className={styles.dealsLabel}>🔥 Hot Deals</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Dropdown Overlay */}
      {isDropdownOpen && (
        <div 
          className={styles.dropdownOverlay}
          onClick={closeDropdown}
        />
      )}
    </header>
  );
};

export default Header;
