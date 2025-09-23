import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useAdminVerification } from '../../../hooks/useAdminAuth';
import { Shield, AlertTriangle, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import { AxiosError } from 'axios';

interface AdminGuardProps {
  children: React.ReactNode;
}

function isAxiosError(error: unknown): error is AxiosError {
  return typeof error === 'object' && error !== null && 'isAxiosError' in error;
}

const AdminGuard: React.FC<AdminGuardProps> = ({ children }) => {
  const { data: adminData, isLoading, isError, error } = useAdminVerification();
  const location = useLocation();
  const shouldRedirectRef = useRef(false);

  // Always define this effect so hooks order remains consistent
  useEffect(() => {
    if (shouldRedirectRef.current) {
      const timer = setTimeout(() => {
        window.location.href = '/admin/login';
      }, 7000); // 7 seconds delay
      return () => clearTimeout(timer);
    }
  }, []); // Empty deps, runs once

  useEffect(() => {
    console.info(
      `[ADMIN GUARD] Access attempt to ${location.pathname} at ${new Date().toISOString()}`
    );
  }, [location.pathname]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <motion.div
          className="text-center p-8 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="inline-block"
          >
            <Shield className="w-16 h-16 text-blue-400 mb-4" />
          </motion.div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Verifying Admin Credentials
          </h2>
          <p className="text-blue-200">
            Securing access to administrator portal...
          </p>
          <div className="mt-4 flex items-center justify-center space-x-2 text-sm text-blue-300">
            <Lock className="w-4 h-4" />
            <span>SSL Encrypted • Session Validated • Role Verified</span>
          </div>
        </motion.div>
      </div>
    );
  }

  const statusCode = isAxiosError(error) ? error.response?.status : undefined;
  const isAuthError = isError || statusCode === 401;

  if (isAuthError) {
    // Mark that we need to redirect (hooks already set up above)
    shouldRedirectRef.current = true;

    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-slate-900 to-gray-900 flex items-center justify-center">
        <motion.div
          className="text-center p-8 bg-white/10 backdrop-blur-lg rounded-2xl border border-red-500/30 shadow-2xl max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Access Restricted</h2>
          <p className="text-red-200 mb-4">
            {statusCode === 401
              ? 'Your session has expired or insufficient privileges.'
              : 'Administrator credentials required.'}
          </p>
          <div className="space-y-2 text-sm text-red-300">
            <div className="flex items-center justify-center space-x-2">
              <Lock className="w-4 h-4" />
              <span>Secure Admin Portal</span>
            </div>
            <div>Redirecting to login in 7 seconds...</div>
          </div>
        </motion.div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AdminGuard;
