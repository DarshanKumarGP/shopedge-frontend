import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Variants } from 'framer-motion';
import { 
  Package, Trash2, Users, UserCheck, TrendingUp, Calendar, BarChart3,
  Diamond, Sparkles, Zap, Clock, Shield
} from 'lucide-react';

import { useAdminVerification } from '../../../hooks/useAdminAuth';
import { useAddProduct, useDeleteProduct } from '../../../hooks/useAdminProducts';
import { useGetUser, useModifyUser } from '../../../hooks/useAdminUsers';
import { 
  useMonthlyBusiness, 
  useDailyBusiness, 
  useYearlyBusiness, 
  useOverallBusiness 
} from '../../../hooks/useAdminBusiness';

import AdminHeader from '../../../components/Admin/AdminHeader/AdminHeader';
import AdminCard from '../../../components/Admin/AdminCard/AdminCard';
import AdminModal, { ModalType } from '../../../components/Admin/AdminModal/AdminModal';

import styles from './AdminDashboard.module.css';

interface CardConfig {
  id: string;
  title: string;
  description: string;
  team: string;
  icon: any;
  color: string;
  modalType: ModalType;
}

const cardData: CardConfig[] = [
  {
    id: 'add-product',
    title: 'Add Product',
    description: 'Create and manage new product listings with advanced validation',
    team: 'Product Management',
    icon: Package,
    color: 'blue',
    modalType: 'addProduct',
  },
  {
    id: 'delete-product',
    title: 'Delete Product',
    description: 'Remove products from inventory system with safety checks',
    team: 'Product Management',
    icon: Trash2,
    color: 'rose',
    modalType: 'deleteProduct',
  },
  {
    id: 'view-user',
    title: 'View User Details',
    description: 'Fetch and display comprehensive user information',
    team: 'User Management',
    icon: Users,
    color: 'emerald',
    modalType: 'viewUser',
  },
  {
    id: 'modify-user',
    title: 'Modify User',
    description: 'Update user details and manage roles with precision',
    team: 'User Management',
    icon: UserCheck,
    color: 'purple',
    modalType: 'modifyUser',
  },
  {
    id: 'monthly-business',
    title: 'Monthly Analytics',
    description: 'View detailed revenue metrics for specific months',
    team: 'Business Intelligence',
    icon: TrendingUp,
    color: 'amber',
    modalType: 'monthlyBusiness',
  },
  {
    id: 'daily-business',
    title: 'Daily Analytics',
    description: 'Track daily revenue and transaction patterns',
    team: 'Business Intelligence',
    icon: Calendar,
    color: 'cyan',
    modalType: 'dailyBusiness',
  },
  {
    id: 'yearly-business',
    title: 'Yearly Analytics',
    description: 'Analyze comprehensive annual revenue performance',
    team: 'Business Intelligence',
    icon: BarChart3,
    color: 'indigo',
    modalType: 'yearlyBusiness',
  },
  {
    id: 'overall-business',
    title: 'Overall Analytics',
    description: 'Complete business performance since platform inception',
    team: 'Executive Dashboard',
    icon: Diamond,
    color: 'pink',
    modalType: 'overallBusiness',
  },
];

const AdminDashboard: React.FC = () => {
  const { data: adminData } = useAdminVerification();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [modalType, setModalType] = useState<ModalType | null>(null);
  const [response, setResponse] = useState<any>(null);

  // Business analytics triggers
  const [monthYear, setMonthYear] = useState<{ month: number, year: number } | null>(null);
  const [day, setDay] = useState<string | null>(null);
  const [year, setYear] = useState<number | null>(null);
  const [fetchOverall, setFetchOverall] = useState(false);

  // Mutations
  const addProductMutation = useAddProduct();
  const deleteProductMutation = useDeleteProduct();
  const getUserMutation = useGetUser();
  const modifyUserMutation = useModifyUser();

  const monthlyBusiness = useMonthlyBusiness(monthYear);
  const dailyBusiness = useDailyBusiness(day);
  const yearlyBusiness = useYearlyBusiness(year);
  const overallBusiness = useOverallBusiness(fetchOverall);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (modalType === 'monthlyBusiness' && monthlyBusiness.data) {
      setResponse({
        success: true,
        data: { ...monthlyBusiness.data, period: monthYear ? `${getMonthName(monthYear.month)} ${monthYear.year}` : '' },
      });
      toast.success('📊 Monthly analytics generated!');
    }
  }, [monthlyBusiness.data]);

  useEffect(() => {
    if (modalType === 'dailyBusiness' && dailyBusiness.data) {
      setResponse({ success: true, data: { ...dailyBusiness.data, date: day } });
      toast.success('📈 Daily analytics generated!');
    }
  }, [dailyBusiness.data]);

  useEffect(() => {
    if (modalType === 'yearlyBusiness' && yearlyBusiness.data) {
      setResponse({ success: true, data: { ...yearlyBusiness.data, year } });
      toast.success('📊 Yearly analytics generated!');
    }
  }, [yearlyBusiness.data]);

  useEffect(() => {
    if (modalType === 'overallBusiness' && overallBusiness.data) {
      setResponse({ success: true, data: overallBusiness.data });
      toast.success('💎 Overall business analytics generated!');
      setFetchOverall(false); // Reset flag for future requests
    }
  }, [overallBusiness.data]);

  const getLoadingState = () => {
    switch (modalType) {
      case 'addProduct': return addProductMutation.isPending;
      case 'deleteProduct': return deleteProductMutation.isPending;
      case 'viewUser': return getUserMutation.isPending;
      case 'modifyUser': return modifyUserMutation.isPending;
      case 'monthlyBusiness': return monthlyBusiness.isFetching;
      case 'dailyBusiness': return dailyBusiness.isFetching;
      case 'yearlyBusiness': return yearlyBusiness.isFetching;
      case 'overallBusiness': return overallBusiness.isFetching;
      default: return false;
    }
  };

  const handleSubmit = async (data: any) => {
    try {
      let result: any = null;
      switch (modalType) {
        case 'addProduct':
          result = await addProductMutation.mutateAsync(data);
          setResponse({ success: true, data: result, message: `Product "${result.name}" added successfully!` });
          toast.success('🎉 Product added to inventory!');
          break;
        case 'deleteProduct':
          await deleteProductMutation.mutateAsync(data.productId);
          setResponse({ success: true, message: 'Product deleted successfully!' });
          toast.success('🗑️ Product removed from inventory!');
          break;
        case 'viewUser':
          result = await getUserMutation.mutateAsync(data);
          setResponse({ success: true, data: result });
          return result;
        case 'modifyUser':
          if (data.userId) {
            result = await modifyUserMutation.mutateAsync(data);
            setResponse({ success: true, data: result, message: `User "${result.username}" updated successfully!` });
            toast.success('✨ User details updated!');
          } else {
            result = await getUserMutation.mutateAsync(data);
            return result;
          }
          break;
        case 'monthlyBusiness':
          setMonthYear({ month: data.month, year: data.year });
          break;
        case 'dailyBusiness':
          setDay(data);
          break;
        case 'yearlyBusiness':
          setYear(data);
          break;
        case 'overallBusiness':
          setFetchOverall(true);
          break;
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || error.message || 'Operation failed';
      setResponse({ success: false, error: errorMessage });
      toast.error(`❌ ${errorMessage}`);
      console.error('Admin operation error:', error);
    }
  };

  const handleCardClick = (card: CardConfig) => {
    setModalType(card.modalType);
    setResponse(null);
    toast.success(`🚀 Launching ${card.title}...`);
  };

  const handleCloseModal = () => {
    setModalType(null);
    setResponse(null);
  };

  const getMonthName = (monthNum: number) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[monthNum - 1] || 'Unknown';
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 100, damping: 15 },
    },
  };

  return (
    <div className={styles.adminDashboard}>
      <div className={styles.backgroundEffects}>
        <div className={styles.gradientOrb1}></div>
        <div className={styles.gradientOrb2}></div>
        <div className={styles.gradientOrb3}></div>
        <div className={styles.gridPattern}></div>
        <div className={styles.floatingParticles}>
          {[...Array(20)].map((_, i) => (
            <div key={i} className={styles.particle}
              style={{ 
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}></div>
          ))}
        </div>
      </div>
      <AdminHeader adminData={adminData} />
      <main className={styles.mainContent}>
        <motion.section 
          className={styles.welcomeSection}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className={styles.welcomeContent}>
            <div className={styles.welcomeText}>
              <h1 className={styles.welcomeTitle}>
                <Sparkles className={styles.sparkleIcon} />
                Welcome back, Administrator
                <span className={styles.titleAccent}>!</span>
              </h1>
              <p className={styles.welcomeSubtitle}>
                Manage your ShopEdge platform with advanced tools and real-time analytics
              </p>
            </div>
            <div className={styles.dashboardStats}>
              <div className={styles.statItem}>
                <Clock className={styles.statIcon} />
                <div className={styles.statContent}>
                  <span className={styles.statLabel}>Current Time</span>
                  <span className={styles.statValue}>{currentTime.toLocaleTimeString()}</span>
                </div>
              </div>
              <div className={styles.statItem}>
                <Shield className={styles.statIcon} />
                <div className={styles.statContent}>
                  <span className={styles.statLabel}>Session Status</span>
                  <span className={styles.statValue}>Secure</span>
                </div>
              </div>
              <div className={styles.statItem}>
                <Zap className={styles.statIcon} />
                <div className={styles.statContent}>
                  <span className={styles.statLabel}>System Status</span>
                  <span className={styles.statValue}>Optimal</span>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
        <motion.section 
          className={styles.cardsSection}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              <Diamond className={styles.sectionIcon} />
              Administrative Functions
            </h2>
            <p className={styles.sectionSubtitle}>
              Comprehensive tools for platform management and business intelligence
            </p>
          </div>
          <div className={styles.cardsGrid}>
            {cardData.map((card) => (
              <motion.div
                key={card.id}
                variants={cardVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <AdminCard
                  title={card.title}
                  description={card.description}
                  team={card.team}
                  icon={card.icon}
                  color={card.color}
                  onClick={() => handleCardClick(card)}
                  disabled={getLoadingState() && modalType !== card.modalType}
                />
              </motion.div>
            ))}
          </div>
        </motion.section>
        <motion.section 
          className={styles.quickActions}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <div className={styles.quickActionsContent}>
            <h3 className={styles.quickActionsTitle}>
              <Zap className={styles.quickActionIcon} />
              Quick Actions
            </h3>
            <div className={styles.quickActionButtons}>
              <button 
                className={styles.quickActionBtn}
                onClick={() => handleCardClick(cardData[6])}
              >
                <BarChart3 size={20} />
                View Analytics
              </button>
              <button 
                className={styles.quickActionBtn}
                onClick={() => handleCardClick(cardData[0])}
              >
                <Package size={20} />
                Add Product
              </button>
              <button 
                className={styles.quickActionBtn}
                onClick={() => handleCardClick(cardData[2])}
              >
                <Users size={20} />
                Manage Users
              </button>
            </div>
          </div>
        </motion.section>
      </main>
      {modalType && (
        <AdminModal
          isOpen={!!modalType}
          modalType={modalType}
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
          isLoading={getLoadingState()}
          response={response}
        />
      )}
      <footer className={styles.adminFooter}>
        <div className={styles.footerContent}>
          <div className={styles.footerBrand}>
            <Shield className={styles.footerIcon} />
            <span>ShopEdge Admin Portal</span>
          </div>
          <div className={styles.footerStats}>
            <span>Secure Session</span>
            <span>•</span>
            <span>Version 2.0</span>
            <span>•</span>
            <span>© 2025 ShopEdge</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AdminDashboard;
