import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAdminAuth } from '../../../hooks/useAdminAuth';
import { 
  Shield, 
  User, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  AlertCircle,
  CheckCircle,
  Globe,
  Server
} from 'lucide-react';
import styles from './AdminLogin.module.css';

const AdminLogin: React.FC = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [securityChecks, setSecurityChecks] = useState({
    connection: false,
    encryption: false,
    server: false,
  });

  const { adminLogin, isAdminLoggingIn } = useAdminAuth();

  // Simulate security checks on component mount
  useEffect(() => {
    const checkSequence = [
      () => setSecurityChecks(prev => ({ ...prev, connection: true })),
      () => setSecurityChecks(prev => ({ ...prev, encryption: true })),
      () => setSecurityChecks(prev => ({ ...prev, server: true })),
    ];

    checkSequence.forEach((check, index) => {
      setTimeout(check, (index + 1) * 500);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!credentials.username.trim()) {
      return;
    }
    if (!credentials.password.trim()) {
      return;
    }

    try {
      await adminLogin(credentials);
    } catch (error) {
      // Error handled by hook
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const allSecurityChecksComplete = Object.values(securityChecks).every(Boolean);

  return (
    <div className={styles.adminLoginContainer}>
      {/* Animated Background */}
      <div className={styles.backgroundEffect}>
        <div className={styles.gradientOrb1}></div>
        <div className={styles.gradientOrb2}></div>
        <div className={styles.gradientOrb3}></div>
        <div className={styles.gridPattern}></div>
        <div className={styles.scanLines}></div>
      </div>

      {/* Security Status Bar */}
      <motion.div 
        className={styles.securityBar}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.securityChecks}>
          <div className={`${styles.check} ${securityChecks.connection ? styles.complete : ''}`}>
            <Globe className={styles.checkIcon} />
            <span>Secure Connection</span>
            {securityChecks.connection && <CheckCircle className={styles.successIcon} />}
          </div>
          <div className={`${styles.check} ${securityChecks.encryption ? styles.complete : ''}`}>
            <Lock className={styles.checkIcon} />
            <span>End-to-End Encryption</span>
            {securityChecks.encryption && <CheckCircle className={styles.successIcon} />}
          </div>
          <div className={`${styles.check} ${securityChecks.server ? styles.complete : ''}`}>
            <Server className={styles.checkIcon} />
            <span>Server Authentication</span>
            {securityChecks.server && <CheckCircle className={styles.successIcon} />}
          </div>
        </div>
      </motion.div>

      {/* Main Login Card */}
      <motion.div 
        className={styles.loginCard}
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {/* Header */}
        <div className={styles.loginHeader}>
          <motion.div 
            className={styles.logoContainer}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
          >
            <Shield className={styles.logoIcon} />
            <div className={styles.logoGlow}></div>
          </motion.div>
          <h1 className={styles.title}>
            <span>ShopEdge</span>
            <span className={styles.titleAccent}>Admin Portal</span>
          </h1>
          <p className={styles.subtitle}>
            Ultra-secure administrative access to your e-commerce platform
          </p>
        </div>

        {/* Security Notice */}
        <motion.div 
          className={styles.securityNoticeTop}
          initial={{ opacity: 0 }}
          animate={{ opacity: allSecurityChecksComplete ? 1 : 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <AlertCircle className={styles.warningIcon} />
          <span>This portal is monitored and logged. Unauthorized access is prohibited.</span>
        </motion.div>

        {/* Login Form */}
        <motion.form 
          className={styles.loginForm}
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: allSecurityChecksComplete ? 1 : 0.3 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          {/* Username Field */}
          <div className={styles.inputGroup}>
            <label htmlFor="username" className={styles.inputLabel}>
              Administrator Username
            </label>
            <div className={styles.inputWrapper}>
              <User className={styles.inputIcon} />
              <input
                type="text"
                id="username"
                name="username"
                value={credentials.username}
                onChange={handleInputChange}
                className={styles.input}
                placeholder="Enter administrator username"
                required
                autoComplete="username"
                disabled={!allSecurityChecksComplete}
              />
              <div className={styles.inputGlow}></div>
            </div>
          </div>

          {/* Password Field */}
          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.inputLabel}>
              Administrator Password
            </label>
            <div className={styles.inputWrapper}>
              <Lock className={styles.inputIcon} />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleInputChange}
                className={styles.input}
                placeholder="Enter secure admin password"
                required
                autoComplete="current-password"
                disabled={!allSecurityChecksComplete}
              />
              <button
                type="button"
                className={styles.togglePassword}
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
                disabled={!allSecurityChecksComplete}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              <div className={styles.inputGlow}></div>
            </div>
          </div>

          {/* Login Button */}
          <motion.button
            type="submit"
            className={styles.loginButton}
            disabled={isAdminLoggingIn || !allSecurityChecksComplete || !credentials.username || !credentials.password}
            whileHover={{ scale: 1.02, boxShadow: '0 10px 40px rgba(59, 130, 246, 0.3)' }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            {isAdminLoggingIn ? (
              <div className={styles.loadingContainer}>
                <div className={styles.loadingSpinner}></div>
                <span>Authenticating...</span>
              </div>
            ) : (
              <>
                <Shield className={styles.buttonIconLeft} />
                Access Administrator Dashboard
                <ArrowRight className={styles.buttonIconRight} />
              </>
            )}
          </motion.button>
        </motion.form>

        {/* Security Footer */}
        <div className={styles.securityFooter}>
          <div className={styles.securityBadge}>
            <Lock size={14} />
            <span>256-bit SSL Encryption</span>
          </div>
          <div className={styles.securityBadge}>
            <Shield size={14} />
            <span>Multi-Factor Authentication</span>
          </div>
          <div className={styles.securityBadge}>
            <AlertCircle size={14} />
            <span>Activity Monitoring</span>
          </div>
        </div>
      </motion.div>

      {/* Footer */}
      <div className={styles.loginFooter}>
        <p>&copy; 2025 ShopEdge Admin Portal. All rights reserved.</p>
        <p className={styles.securityText}>
          Protected by enterprise-grade security • All sessions monitored
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
