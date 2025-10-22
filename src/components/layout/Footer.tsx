import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const currentYear = new Date().getFullYear();

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      // Handle newsletter subscription
      console.log('Newsletter subscription:', email);
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const quickLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Shipping Info', path: '/shipping' },
    { name: 'Returns', path: '/returns' },
    { name: 'Size Guide', path: '/size-guide' }
  ];

  const categories = [
    { name: 'Electronics', path: '/categories/electronics' },
    { name: 'Fashion', path: '/categories/fashion' },
    { name: 'Home & Garden', path: '/categories/home' },
    { name: 'Sports', path: '/categories/sports' },
    { name: 'Beauty', path: '/categories/beauty' },
    { name: 'Books', path: '/categories/books' }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: '📘', url: 'https://facebook.com' },
    { name: 'Twitter', icon: '🐦', url: 'https://twitter.com' },
    { name: 'Instagram', icon: '📷', url: 'https://instagram.com' },
    { name: 'YouTube', icon: '📺', url: 'https://youtube.com' },
    { name: 'LinkedIn', icon: '💼', url: 'https://linkedin.com' }
  ];

  return (
    <footer className={styles.footer}>
      {/* Newsletter Section */}
      <div className={styles.newsletter}>
        <div className="container">
          <div className={styles.newsletterContent}>
            <div className={styles.newsletterText}>
              <h3 className={styles.newsletterTitle}>Stay Updated!</h3>
              <p className={styles.newsletterDescription}>
                Subscribe to get special offers, free giveaways, and insider deals.
              </p>
            </div>
            <form className={styles.newsletterForm} onSubmit={handleNewsletterSubmit}>
              <div className={styles.inputGroup}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className={styles.emailInput}
                  required
                />
                <button type="submit" className={styles.subscribeButton}>
                  {subscribed ? '✓ Subscribed!' : 'Subscribe'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className={styles.mainFooter}>
        <div className="container">
          <div className={styles.footerGrid}>
            {/* Company Info */}
            <div className={styles.footerSection}>
              <div className={styles.brandSection}>
                <Link to="/" className={styles.footerLogo}>
                  <span className={styles.logoIcon}>🛍️</span>
                  <span className={styles.logoText}>
                    Shop<span className={styles.logoAccent}>Edge</span>
                  </span>
                </Link>
                <p className={styles.brandDescription}>
                  Your ultimate destination for premium products at unbeatable prices. 
                  We're committed to providing exceptional quality and service.
                </p>
                <div className={styles.contactInfo}>
                  <div className={styles.contactItem}>
                    <span className={styles.contactIcon}>📍</span>
                    <span>123 Commerce St, Shopping District, NY 10001</span>
                  </div>
                  <div className={styles.contactItem}>
                    <span className={styles.contactIcon}>📞</span>
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className={styles.contactItem}>
                    <span className={styles.contactIcon}>✉️</span>
                    <span>support@shopedge.com</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className={styles.footerSection}>
              <h4 className={styles.sectionTitle}>Quick Links</h4>
              <ul className={styles.linkList}>
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link to={link.path} className={styles.footerLink}>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories */}
            <div className={styles.footerSection}>
              <h4 className={styles.sectionTitle}>Categories</h4>
              <ul className={styles.linkList}>
                {categories.map((category, index) => (
                  <li key={index}>
                    <Link to={category.path} className={styles.footerLink}>
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Customer Service */}
            <div className={styles.footerSection}>
              <h4 className={styles.sectionTitle}>Customer Service</h4>
              <div className={styles.serviceInfo}>
                <div className={styles.serviceItem}>
                  <strong>Hours:</strong>
                  <span>Mon-Fri: 9AM-6PM EST</span>
                </div>
                <div className={styles.serviceItem}>
                  <strong>Support:</strong>
                  <span>24/7 Live Chat</span>
                </div>
                <div className={styles.serviceItem}>
                  <strong>Phone:</strong>
                  <span>+1 (555) 123-4567</span>
                </div>
              </div>
              
              {/* Social Links */}
              <div className={styles.socialSection}>
                <h5 className={styles.socialTitle}>Follow Us</h5>
                <div className={styles.socialLinks}>
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialLink}
                      title={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className={styles.footerBottom}>
        <div className="container">
          <div className={styles.bottomContent}>
            <div className={styles.copyright}>
              <p>© {currentYear} ShopEdge. All rights reserved.</p>
            </div>
            <div className={styles.legalLinks}>
              <Link to="/privacy" className={styles.legalLink}>Privacy Policy</Link>
              <Link to="/terms" className={styles.legalLink}>Terms of Service</Link>
              <Link to="/cookies" className={styles.legalLink}>Cookie Policy</Link>
            </div>
            <div className={styles.paymentMethods}>
              <span className={styles.paymentText}>We Accept:</span>
              <div className={styles.paymentIcons}>
                <span className={styles.paymentIcon} title="Credit Cards">💳</span>
                <span className={styles.paymentIcon} title="PayPal">💰</span>
                <span className={styles.paymentIcon} title="Bank Transfer">🏦</span>
                <span className={styles.paymentIcon} title="Mobile Pay">📱</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
