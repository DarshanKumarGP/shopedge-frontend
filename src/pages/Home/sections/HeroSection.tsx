import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './HeroSection.module.css';
import { HeroSlide } from '../../../types';

const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const heroSlides: HeroSlide[] = [
    {
      id: 1,
      title: "Premium Electronics",
      subtitle: "Up to 50% Off",
      description: "Discover the latest smartphones, laptops, and gadgets from top brands. Quality guaranteed with free shipping.",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop",
      ctaText: "Shop Electronics",
      ctaLink: "/categories/electronics",
      backgroundColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    },
    {
      id: 2,
      title: "Fashion Forward",
      subtitle: "New Collection",
      description: "Step into style with our curated fashion collection. From casual wear to formal attire, find your perfect look.",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
      ctaText: "Explore Fashion",
      ctaLink: "/categories/fashion",
      backgroundColor: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
    },
    {
      id: 3,
      title: "Home & Garden",
      subtitle: "Transform Your Space",
      description: "Create your dream home with our premium collection of furniture, decor, and garden essentials.",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
      ctaText: "Shop Home",
      ctaLink: "/categories/home",
      backgroundColor: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <section className={styles.heroSection}>
      <div className={styles.heroContainer}>
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`${styles.heroSlide} ${index === currentSlide ? styles.active : ''}`}
            style={{ background: slide.backgroundColor }}
          >
            <div className={styles.heroContent}>
              <div className="container">
                <div className={styles.heroGrid}>
                  {/* Content */}
                  <div className={styles.heroText}>
                    <div className={styles.heroSubtitle}>{slide.subtitle}</div>
                    <h1 className={styles.heroTitle}>{slide.title}</h1>
                    <p className={styles.heroDescription}>{slide.description}</p>
                    <div className={styles.heroActions}>
                      <Link to={slide.ctaLink} className={styles.heroCta}>
                        {slide.ctaText}
                      </Link>
                      <Link to="/deals" className={styles.heroSecondary}>
                        View All Deals
                      </Link>
                    </div>
                    
                    {/* Features */}
                    <div className={styles.heroFeatures}>
                      <div className={styles.feature}>
                        <span className={styles.featureIcon}>🚚</span>
                        <span>Free Shipping</span>
                      </div>
                      <div className={styles.feature}>
                        <span className={styles.featureIcon}>↩️</span>
                        <span>Easy Returns</span>
                      </div>
                      <div className={styles.feature}>
                        <span className={styles.featureIcon}>🛡️</span>
                        <span>Secure Payment</span>
                      </div>
                    </div>
                  </div>

                  {/* Image */}
                  <div className={styles.heroImage}>
                    <img 
                      src={slide.image} 
                      alt={slide.title}
                      className={styles.heroImg}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation */}
        <div className={styles.heroNavigation}>
          <button onClick={prevSlide} className={styles.navButton} aria-label="Previous slide">
            ❮
          </button>
          <button onClick={nextSlide} className={styles.navButton} aria-label="Next slide">
            ❯
          </button>
        </div>

        {/* Dots Indicator */}
        <div className={styles.heroIndicators}>
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`${styles.indicator} ${index === currentSlide ? styles.active : ''}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
