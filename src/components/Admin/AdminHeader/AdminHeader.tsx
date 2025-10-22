import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  User, 
  LogOut, 
  ChevronDown,
  Activity,
  Crown,
  BarChart3,
  Users,
  Package,
  Settings
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from '../../../hooks/useAdminAuth';
import styles from './AdminHeader.module.css';

interface AdminHeaderProps {
  adminData?: {
    username: string;
    role: string;
    userId: number;
  };
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ adminData }) => {
  const { adminLogout, isAdminLoggingOut } = useAdminAuth();
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleLogout = async () => {
    try {
      setIsDropdownOpen(false);
      await adminLogout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleNavigation = (path: string) => {
    setIsDropdownOpen(false);
    // Only navigate if not already on the page
    if (location.pathname !== path) {
      navigate(path);
    }
  };

  return (
    <motion.header 
      className={styles.adminHeader}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
    >
      {/* Background Effects */}
      <div className={styles.headerBackground}>
        <div className={styles.gradientOverlay}></div>
        <div className={styles.patternOverlay}></div>
      </div>

      {/* Logo & Branding */}
      <div className={styles.logoSection}>
        <motion.div 
          className={styles.logoContainer}
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          onClick={() => handleNavigation('/admin/dashboard')}
        >
          <Shield className={styles.logoIcon} />
          <div className={styles.logoGlow}></div>
        </motion.div>
        <div className={styles.brandInfo}>
          <h1 className={styles.title}>ShopEdge Admin</h1>
          <div className={styles.statusIndicator}>
            <Activity className={styles.statusIcon} />
            <span>System Online</span>
          </div>
        </div>
      </div>

      {/* Admin Controls */}
      <div className={styles.adminControls}>
        {/* Admin Profile Dropdown */}
        <div className={styles.profileSection} ref={dropdownRef}>
          <motion.button 
            className={styles.profileButton}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className={styles.profileInfo}>
              <div className={styles.profileAvatar}>
                <User className={styles.avatarIcon} />
                <Crown className={styles.adminCrown} />
              </div>
              <div className={styles.profileText}>
                <span className={styles.adminName}>
                  {adminData?.username || 'ADMIN'}
                </span>
                <span className={styles.adminRole}>Super Admin</span>
              </div>
            </div>
            <ChevronDown 
              className={`${styles.dropdownIcon} ${isDropdownOpen ? styles.rotated : ''}`} 
            />
          </motion.button>

          {/* Dropdown Menu */}
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div 
                className={styles.dropdownMenu}
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <div className={styles.dropdownHeader}>
                  <div className={styles.adminDetails}>
                    <strong>{adminData?.username || 'ADMIN'}</strong>
                    <span>ID: #{adminData?.userId || 'N/A'}</span>
                    <span className={styles.onlineStatus}>● Online</span>
                  </div>
                </div>
                
                <div className={styles.dropdownDivider}></div>
                
                {/* Dashboard Link */}
                <motion.button 
                  className={styles.dropdownItem}
                  onClick={() => handleNavigation('/admin/dashboard')}
                  whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                  transition={{ duration: 0.2 }}
                >
                  <BarChart3 className={styles.dropdownItemIcon} />
                  <span>Dashboard</span>
                </motion.button>

                {/* User Management */}
                <motion.button 
                  className={styles.dropdownItem}
                  onClick={() => handleNavigation('/admin/users')}
                  whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                  transition={{ duration: 0.2 }}
                >
                  <Users className={styles.dropdownItemIcon} />
                  <span>User Management</span>
                </motion.button>

                {/* Product Management */}
                <motion.button 
                  className={styles.dropdownItem}
                  onClick={() => handleNavigation('/admin/products')}
                  whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                  transition={{ duration: 0.2 }}
                >
                  <Package className={styles.dropdownItemIcon} />
                  <span>Product Management</span>
                </motion.button>

                {/* Settings */}
                <motion.button 
                  className={styles.dropdownItem}
                  onClick={() => handleNavigation('/admin/settings')}
                  whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                  transition={{ duration: 0.2 }}
                >
                  <Settings className={styles.dropdownItemIcon} />
                  <span>Settings</span>
                </motion.button>
                
                <div className={styles.dropdownDivider}></div>
                
                {/* Logout */}
                <motion.button 
                  className={`${styles.dropdownItem} ${styles.logoutItem}`}
                  onClick={handleLogout}
                  disabled={isAdminLoggingOut}
                  whileHover={{ backgroundColor: 'rgba(239, 68, 68, 0.1)' }}
                  transition={{ duration: 0.2 }}
                >
                  <LogOut className={styles.dropdownItemIcon} />
                  <span>
                    {isAdminLoggingOut ? 'Signing out...' : 'Sign Out'}
                  </span>
                  {isAdminLoggingOut && (
                    <div className={styles.loadingSpinner}></div>
                  )}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
  );
};

export default AdminHeader;
