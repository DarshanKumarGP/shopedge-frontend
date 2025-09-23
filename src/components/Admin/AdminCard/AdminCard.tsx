import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import styles from './AdminCard.module.css';

interface AdminCardProps {
  title: string;
  description: string;
  team: string;
  icon: LucideIcon;
  color: string;
  onClick: () => void;
  disabled?: boolean;
}

const AdminCard: React.FC<AdminCardProps> = ({
  title,
  description,
  team,
  icon: Icon,
  color,
  onClick,
  disabled = false,
}) => {
  return (
    <motion.div
      className={`${styles.adminCard} ${styles[color]} ${disabled ? styles.disabled : ''}`}
      onClick={disabled ? undefined : onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={disabled ? undefined : { 
        y: -8, 
        scale: 1.02,
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)'
      }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
    >
      {/* Background Effects */}
      <div className={styles.cardBackground}>
        <div className={styles.gradientOverlay}></div>
        <div className={styles.patternOverlay}></div>
      </div>

      {/* Content */}
      <div className={styles.cardContent}>
        {/* Icon */}
        <div className={styles.iconContainer}>
          <Icon className={styles.icon} />
          <div className={styles.iconGlow}></div>
        </div>

        {/* Text Content */}
        <div className={styles.textContent}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{description}</p>
          
          {/* Team Badge */}
          <div className={styles.teamBadge}>
            <span className={styles.teamLabel}>Team:</span>
            <span className={styles.teamName}>{team}</span>
          </div>
        </div>

        {/* Action Indicator */}
        <div className={styles.actionIndicator}>
          <motion.div 
            className={styles.arrowIcon}
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            →
          </motion.div>
        </div>
      </div>

      {/* Status Indicator */}
      <div className={styles.statusIndicator}>
        <div className={styles.statusDot}></div>
      </div>
    </motion.div>
  );
};

export default AdminCard;
