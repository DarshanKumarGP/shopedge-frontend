import React from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  User, 
  LogOut, 
  Settings, 
  Bell,
  ChevronDown,
  Activity,
  Crown
} from 'lucide-react';
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

  const handleLogout = async () => {
    try {
      await adminLogout();
    } catch (error) {
      console.error('Logout error:', error);
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
        {/* Notifications */}
        <motion.button 
          className={styles.notificationButton}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Bell className={styles.controlIcon} />
          <div className={styles.notificationBadge}>3</div>
        </motion.button>

        {/* Settings */}
        <motion.button 
          className={styles.settingsButton}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Settings className={styles.controlIcon} />
        </motion.button>

        {/* Admin Profile Dropdown */}
        <div className={styles.profileSection}>
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
                  {adminData?.username || 'Administrator'}
                </span>
                <span className={styles.adminRole}>Super Admin</span>
              </div>
            </div>
            <ChevronDown 
              className={`${styles.dropdownIcon} ${isDropdownOpen ? styles.rotated : ''}`} 
            />
          </motion.button>

          {/* Dropdown Menu */}
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
                  <strong>{adminData?.username || 'Administrator'}</strong>
                  <span>ID: {adminData?.userId || 'N/A'}</span>
                  <span className={styles.onlineStatus}>● Online</span>
                </div>
              </div>
              
              <div className={styles.dropdownDivider}></div>
              
              <motion.button 
                className={styles.dropdownItem}
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
        </div>
      </div>

      {/* Security Badge */}
      <div className={styles.securityBadge}>
        <Shield size={16} />
        <span>Secure Session</span>
      </div>
    </motion.header>
  );
};

export default AdminHeader;
