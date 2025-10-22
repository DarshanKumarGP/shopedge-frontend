import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './SpecialOffers.module.css';
import { SpecialOffer } from '../../../types';

const SpecialOffers: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<{ [key: string]: string }>({});
  const [offerEndTimes, setOfferEndTimes] = useState<{ [key: string]: number }>({});

  const [offers] = useState<SpecialOffer[]>([
    {
      id: '1',
      title: 'Flash Sale',
      description: 'Up to 70% off on electronics',
      discount: '70% OFF',
      image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=500&h=300&fit=crop',
      link: '/deals/flash-sale',
      validUntil: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours timer
      backgroundColor: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)'
    },
    {
      id: '2',
      title: 'Weekend Special',
      description: 'Free shipping on all orders',
      discount: 'FREE SHIPPING',
      image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=500&h=300&fit=crop',
      link: '/deals/weekend-special',
      validUntil: new Date(Date.now() + 4 * 60 * 60 * 1000), // 4 hours timer
      backgroundColor: 'linear-gradient(135deg, #54a0ff 0%, #2e86de 100%)'
    },
    {
      id: '3',
      title: 'New Customer Deal',
      description: 'Extra 30% off first purchase',
      discount: '30% OFF',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop',
      link: '/deals/new-customer',
      validUntil: new Date(Date.now() + 6 * 60 * 60 * 1000), // 6 hours timer
      backgroundColor: 'linear-gradient(135deg, #5f27cd 0%, #341f97 100%)'
    }
  ]);

  // Initialize end times for each offer
  useEffect(() => {
    const initialEndTimes: { [key: string]: number } = {};
    offers.forEach(offer => {
      const duration = offer.id === '1' ? 2 * 60 * 60 * 1000 : 
                      offer.id === '2' ? 4 * 60 * 60 * 1000 : 
                      6 * 60 * 60 * 1000;
      initialEndTimes[offer.id] = Date.now() + duration;
    });
    setOfferEndTimes(initialEndTimes);
  }, [offers]);

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft: { [key: string]: string } = {};
      const newEndTimes = { ...offerEndTimes };
      
      offers.forEach(offer => {
        const now = Date.now();
        const endTime = offerEndTimes[offer.id] || now;
        const distance = endTime - now;
        
        if (distance > 0) {
          const days = Math.floor(distance / (1000 * 60 * 60 * 24));
          const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);
          
          if (days > 0) {
            newTimeLeft[offer.id] = `${days}d ${hours}h ${minutes}m`;
          } else {
            newTimeLeft[offer.id] = `${hours}h ${minutes}m ${seconds}s`;
          }
        } else {
          // Timer expired, reset it
          const duration = offer.id === '1' ? 2 * 60 * 60 * 1000 : 
                          offer.id === '2' ? 4 * 60 * 60 * 1000 : 
                          6 * 60 * 60 * 1000;
          newEndTimes[offer.id] = Date.now() + duration;
          newTimeLeft[offer.id] = 'Resetting...';
        }
      });
      
      setTimeLeft(newTimeLeft);
      setOfferEndTimes(newEndTimes);
    }, 1000);

    return () => clearInterval(timer);
  }, [offers, offerEndTimes]);

  return (
    <section className={`${styles.offersSection} section`}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Special Offers</h2>
          <p className={styles.sectionDescription}>
            Don't miss out on these amazing limited-time deals
          </p>
        </div>

        <div className={styles.offersGrid}>
          {offers.map(offer => (
            <Link
              key={offer.id}
              to={offer.link}
              className={styles.offerCard}
              style={{ background: offer.backgroundColor }}
            >
              <div className={styles.offerContent}>
                <div className={styles.offerText}>
                  <div className={styles.offerBadge}>
                    {offer.discount}
                  </div>
                  <h3 className={styles.offerTitle}>{offer.title}</h3>
                  <p className={styles.offerDescription}>{offer.description}</p>
                  <div className={styles.countdown}>
                    <span className={styles.countdownLabel}>⏰ Ends in:</span>
                    <span className={styles.countdownTime}>
                      {timeLeft[offer.id] || 'Loading...'}
                    </span>
                  </div>
                </div>
                <div className={styles.offerImage}>
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className={styles.offerImg}
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers;