import React, { useState } from 'react';
import styles from './Newsletter.module.css';
import Button from '../../../components/common/Button/Button';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Newsletter subscription:', email);
      setSubscribed(true);
      setEmail('');
      setLoading(false);
      
      // Reset success message after 3 seconds
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <section className={styles.newsletterSection}>
      <div className="container">
        <div className={styles.newsletterContainer}>
          <div className={styles.newsletterContent}>
            <div className={styles.newsletterIcon}>📬</div>
            <h2 className={styles.newsletterTitle}>Stay in the Loop!</h2>
            <p className={styles.newsletterDescription}>
              Subscribe to our newsletter and be the first to know about new products, 
              exclusive deals, and special offers.
            </p>
            
            {subscribed ? (
              <div className={styles.successMessage}>
                <span className={styles.successIcon}>✅</span>
                <p>Thank you for subscribing! Check your email for confirmation.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.newsletterForm}>
                <div className={styles.inputWrapper}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className={styles.emailInput}
                    required
                  />
                  <Button
                    type="submit"
                    loading={loading}
                    className={styles.subscribeButton}
                  >
                    Subscribe
                  </Button>
                </div>
              </form>
            )}
            
            <div className={styles.newsletterFeatures}>
              <div className={styles.feature}>
                <span className={styles.featureIcon}>🎁</span>
                <span>Exclusive Deals</span>
              </div>
              <div className={styles.feature}>
                <span className={styles.featureIcon}>🆕</span>
                <span>New Arrivals</span>
              </div>
              <div className={styles.feature}>
                <span className={styles.featureIcon}>📢</span>
                <span>Special Events</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
