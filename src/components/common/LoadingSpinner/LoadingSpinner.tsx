import React from 'react';
import styles from './LoadingSpinner.module.css';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'white';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  color = 'primary' 
}) => {
  return (
    <div className={`${styles.spinner} ${styles[size]} ${styles[color]}`}>
      <div className={styles.circle}></div>
    </div>
  );
};

export default LoadingSpinner;
