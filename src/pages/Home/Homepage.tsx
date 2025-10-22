import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import HeroSection from './sections/HeroSection';
import FeaturedProducts from './sections/FeaturedProducts';
import CategoryGrid from './sections/CategoryGrid';
import SpecialOffers from './sections/SpecialOffers';
import Newsletter from './sections/Newsletter';
import styles from './Homepage.module.css';

const Homepage: React.FC = () => {
  return (
    <div className={styles.homepage}>
      <Header />
      <main className={styles.mainContent}>
        <HeroSection />
        <FeaturedProducts />
        <CategoryGrid />
        <SpecialOffers />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Homepage;
