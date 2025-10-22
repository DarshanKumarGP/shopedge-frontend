import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './FeaturedProducts.module.css';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  badge?: 'bestseller' | 'new' | 'sale';
  category: string;
  inStock: boolean;
}

const FeaturedProducts: React.FC = () => {
  const [activeTab, setActiveTab] = useState('bestsellers');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const tabs = [
    { id: 'bestsellers', label: '🔥 Bestsellers', icon: '⭐' },
    { id: 'new', label: '✨ New Arrivals', icon: '🆕' },
    { id: 'deals', label: '💰 Hot Deals', icon: '🎯' },
  ];

  // Different products for each tab
  const productsByTab = useMemo(() => ({
    bestsellers: [
      {
        id: 'b1',
        name: 'Premium Wireless Headphones',
        description: 'High-quality sound with noise cancellation',
        price: 12999,
        originalPrice: 15999,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
        rating: 4.8,
        reviewCount: 1284,
        badge: 'bestseller' as const,
        category: 'Electronics',
        inStock: true
      },
      {
        id: 'b2',
        name: 'Smart Fitness Tracker',
        description: 'Track your health and fitness goals',
        price: 5999,
        image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=300&fit=crop',
        rating: 4.6,
        reviewCount: 892,
        badge: 'bestseller' as const,
        category: 'Electronics',
        inStock: true
      },
      {
        id: 'b3',
        name: 'Professional Coffee Maker',
        description: 'Brew perfect coffee every time',
        price: 8999,
        image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=300&fit=crop',
        rating: 4.9,
        reviewCount: 2134,
        badge: 'bestseller' as const,
        category: 'Home',
        inStock: true
      },
      {
        id: 'b4',
        name: 'Gaming Mechanical Keyboard',
        description: 'RGB backlit with tactile switches',
        price: 4999,
        originalPrice: 6999,
        image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=300&h=300&fit=crop',
        rating: 4.7,
        reviewCount: 1567,
        badge: 'bestseller' as const,
        category: 'Electronics',
        inStock: true
      }
    ],
    new: [
      {
        id: 'n1',
        name: 'Latest Smartphone',
        description: '5G enabled with triple camera',
        price: 45999,
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop',
        rating: 4.5,
        reviewCount: 234,
        badge: 'new' as const,
        category: 'Electronics',
        inStock: true
      },
      {
        id: 'n2',
        name: 'Eco-Friendly Water Bottle',
        description: 'Sustainable and insulated design',
        price: 1299,
        image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300&h=300&fit=crop',
        rating: 4.4,
        reviewCount: 156,
        badge: 'new' as const,
        category: 'Lifestyle',
        inStock: true
      },
      {
        id: 'n3',
        name: 'Smart Home Speaker',
        description: 'Voice controlled with AI assistant',
        price: 7999,
        image: 'https://images.unsplash.com/photo-1543512214-318c7553f230?w=300&h=300&fit=crop',
        rating: 4.3,
        reviewCount: 89,
        badge: 'new' as const,
        category: 'Electronics',
        inStock: true
      },
      {
        id: 'n4',
        name: 'Wireless Charging Pad',
        description: 'Fast charging for all devices',
        price: 2999,
        image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&h=300&fit=crop',
        rating: 4.2,
        reviewCount: 67,
        badge: 'new' as const,
        category: 'Electronics',
        inStock: true
      }
    ],
    deals: [
      {
        id: 'd1',
        name: 'Designer Backpack',
        description: 'Stylish and spacious for daily use',
        price: 2499,
        originalPrice: 4999,
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop',
        rating: 4.6,
        reviewCount: 445,
        badge: 'sale' as const,
        category: 'Fashion',
        inStock: true
      },
      {
        id: 'd2',
        name: 'Bluetooth Earbuds',
        description: 'True wireless with charging case',
        price: 1999,
        originalPrice: 3999,
        image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=300&h=300&fit=crop',
        rating: 4.4,
        reviewCount: 678,
        badge: 'sale' as const,
        category: 'Electronics',
        inStock: true
      },
      {
        id: 'd3',
        name: 'LED Desk Lamp',
        description: 'Adjustable brightness and color',
        price: 1799,
        originalPrice: 2999,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
        rating: 4.5,
        reviewCount: 234,
        badge: 'sale' as const,
        category: 'Home',
        inStock: true
      },
      {
        id: 'd4',
        name: 'Sports Water Bottle',
        description: 'Leak-proof with measurement markers',
        price: 699,
        originalPrice: 1299,
        image: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=300&h=300&fit=crop',
        rating: 4.3,
        reviewCount: 189,
        badge: 'sale' as const,
        category: 'Sports',
        inStock: true
      }
    ]
  }), []);

  const currentProducts = productsByTab[activeTab as keyof typeof productsByTab] || [];

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [activeTab]);

  const getBadgeColor = (badge?: string) => {
    switch (badge) {
      case 'bestseller': return 'var(--error-color)';
      case 'new': return 'var(--success-color)';
      case 'sale': return 'var(--warning-color)';
      default: return 'var(--primary-color)';
    }
  };

  const getBadgeText = (badge?: string) => {
    switch (badge) {
      case 'bestseller': return 'Best Seller';
      case 'new': return 'New';
      case 'sale': return 'Sale';
      default: return '';
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span 
        key={index} 
        className={index < Math.floor(rating) ? styles.starFilled : styles.starEmpty}
      >
        ⭐
      </span>
    ));
  };

  const handleViewAllProducts = () => {
    const user = localStorage.getItem('user');
    if (user) {
      navigate('/customerhome');
    } else {
      sessionStorage.setItem('redirectAfterLogin', '/customerhome');
      navigate('/login');
    }
  };

  const ProductCard = ({ product }: { product: Product }) => (
    <div className={styles.productCard}>
      <div className={styles.productImageContainer}>
        <img 
          src={product.image} 
          alt={product.name}
          className={styles.productImage}
        />
        {product.badge && (
          <div 
            className={styles.productBadge}
            style={{ background: getBadgeColor(product.badge) }}
          >
            {getBadgeText(product.badge)}
          </div>
        )}
      </div>
      
      <div className={styles.productInfo}>
        <div className={styles.productCategory}>{product.category}</div>
        <h3 className={styles.productName}>{product.name}</h3>
        
        <div className={styles.productRating}>
          <div className={styles.stars}>
            {renderStars(product.rating)}
          </div>
          <span className={styles.ratingText}>
            {product.rating} ({product.reviewCount.toLocaleString()} reviews)
          </span>
        </div>
        
        <div className={styles.productPrice}>
          <span className={styles.currentPrice}>₹{product.price.toLocaleString()}</span>
          {product.originalPrice && (
            <>
              <span className={styles.originalPrice}>₹{product.originalPrice.toLocaleString()}</span>
              <span className={styles.discount}>
                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% Off
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );

  const LoadingCard = () => (
    <div className={styles.loadingCard}>
      <div className={styles.loadingSkeleton}></div>
      <div className={styles.loadingContent}>
        <div className={styles.loadingLine}></div>
        <div className={styles.loadingLine}></div>
        <div className={styles.loadingLine}></div>
      </div>
    </div>
  );

  return (
    <section className={`${styles.featuredSection} section`}>
      <div className="container">
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <div className={styles.headerContent}>
            <h2 className={styles.sectionTitle}>Featured Products</h2>
            <p className={styles.sectionDescription}>
              Discover our handpicked selection of premium products
            </p>
          </div>
          
          {/* Tabs */}
          <div className={styles.tabContainer}>
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${styles.tab} ${activeTab === tab.id ? styles.active : ''}`}
              >
                <span className={styles.tabIcon}>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className={styles.productsGrid}>
          {loading ? (
            Array.from({ length: 4 }, (_, index) => (
              <LoadingCard key={index} />
            ))
          ) : (
            currentProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>

        {/* View More Button */}
        <div className={styles.viewMoreContainer}>
          <button onClick={handleViewAllProducts} className={styles.viewMoreButton}>
            View All Products
            <span className={styles.arrow}>→</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
