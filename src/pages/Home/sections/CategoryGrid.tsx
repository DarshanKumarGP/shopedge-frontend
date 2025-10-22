import React from 'react';
import styles from './CategoryGrid.module.css';

interface Category {
  id: string;
  name: string;
  image: string;
  itemCount: number;
  color: string;
  icon: string;
}

const CategoryGrid: React.FC = () => {
  const categories: Category[] = [
    {
      id: '1',
      name: 'Electronics',
      image: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=400&h=300&fit=crop',
      itemCount: 1250,
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      icon: '📱'
    },
    {
      id: '2',
      name: 'Fashion',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop',
      itemCount: 890,
      color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      icon: '👗'
    },
    {
      id: '3',
      name: 'Home & Garden',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
      itemCount: 675,
      color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      icon: '🏠'
    },
    {
      id: '4',
      name: 'Sports',
      image: 'https://images.unsplash.com/photo-1571019613914-85e2f5ac70b8?w=400&h=300&fit=crop',
      itemCount: 445,
      color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      icon: '⚽'
    },
    {
      id: '5',
      name: 'Beauty',
      image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=300&fit=crop',
      itemCount: 320,
      color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      icon: '💄'
    },
    {
      id: '6',
      name: 'Books',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop',
      itemCount: 780,
      color: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      icon: '📚'
    }
  ];

  return (
    <section className={`${styles.categorySection} section`}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Shop by Category</h2>
          <p className={styles.sectionDescription}>
            Explore our wide range of product categories
          </p>
        </div>

        <div className={styles.categoryGrid}>
          {categories.map((category) => (
            <div
              key={category.id}
              className={styles.categoryCard}
              style={{ background: category.color }}
            >
              <div className={styles.categoryOverlay}>
                <div className={styles.categoryContent}>
                  <div className={styles.categoryIcon}>
                    {category.icon}
                  </div>
                  <h3 className={styles.categoryName}>{category.name}</h3>
                  <p className={styles.categoryCount}>
                    {category.itemCount.toLocaleString()} items
                  </p>
                </div>
              </div>
              <img
                src={category.image}
                alt={category.name}
                className={styles.categoryImage}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
