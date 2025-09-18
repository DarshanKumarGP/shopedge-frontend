import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { usePayment } from '../../hooks/usePayment';
import { Header } from '../../components/customer/Header/Header';
import { Footer } from '../../components/customer/Footer/Footer';
import { PaymentOrderRequest } from '../../types/payment';
import './CartPage.css';

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    username, items, subtotal, shippingCost,
    totalItems, totalAmount, loading, error,
    updateQty, remove
  } = useCart();
  
  const { processPayment, isProcessing } = usePayment();

  // Calculate if there's actual discount per item
  const getItemDiscount = (item: any) => {
    const originalPrice = item.pricePerUnit * item.quantity;
    const actualDiscount = originalPrice - item.totalPrice;
    return actualDiscount > 0 ? actualDiscount : 0;
  };

  // Sample recommended product (you can fetch from API later)
  const recommendedProduct = {
    id: 9,
    name: 'Wireless Bluetooth Headset',
    price: 1499,
    image: '/placeholder.png'
  };

  const handleCheckout = async () => {
    if (!username || username === 'Guest') {
      alert('Please login to proceed with checkout');
      return;
    }

    if (items.length === 0) {
      alert('Your cart is empty');
      return;
    }

    try {
      const orderData: PaymentOrderRequest = {
        totalAmount: totalAmount,
        cartItems: items.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.pricePerUnit,
        })),
      };

      const userDetails = {
        name: username,
        email: 'customer@shopedge.com',
        contact: '9999999999',
      };

      await processPayment(orderData, userDetails);
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to proceed to checkout. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="cart-page">
        <Header cartCount={0} username={username} />
        <div className="cart-loading-container">
          <div className="cart-loading">
            <div className="loading-spinner-modern"></div>
            <h3>Loading your cart...</h3>
            <p>Please wait while we fetch your items</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="cart-page">
        <Header cartCount={0} username={username} />
        <div className="cart-error-container">
          <div className="cart-error-modern">
            <div className="error-icon">⚠️</div>
            <h3>Oops! Something went wrong</h3>
            <p>{error}</p>
            <button onClick={() => window.location.reload()} className="retry-btn">
              Try Again
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="cart-page">
      <Header cartCount={totalItems} username={username} />
      
      {/* Page Header */}
      <div className="cart-header-section">
        <div className="container">
          <h1 className="page-title">Shopping Cart</h1>
          <p className="page-subtitle">Review your items before checkout</p>
        </div>
      </div>

      <div className="container">
        {items.length === 0 ? (
          <div className="empty-cart-modern">
            <div className="empty-cart-illustration">
              <div className="empty-cart-icon">🛒</div>
            </div>
            <div className="empty-cart-content">
              <h2>Your cart feels lonely</h2>
              <p>Add some amazing products to get started on your shopping journey!</p>
              <button
                className="continue-shopping-modern"
                onClick={() => navigate('/customerhome')}
              >
                <span>🛍️</span>
                Start Shopping
              </button>
            </div>
          </div>
        ) : (
          <div className="cart-content-modern">
            {/* Cart Items Section */}
            <div className="cart-items-section">
              <div className="cart-items-header">
                <h2>Cart Items ({totalItems} {totalItems === 1 ? 'item' : 'items'})</h2>
                <div className="security-badge">
                  <span className="security-icon">🔒</span>
                  <span>Secure Checkout</span>
                </div>
              </div>

              <div className="cart-items-list">
                {items.map((item, index) => (
                  <div key={item.productId} className="cart-item-modern" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="item-checkbox">
                      <input type="checkbox" defaultChecked />
                    </div>
                    
                    <div className="item-image-container">
                      <img
                        src={item.imageUrl || '/placeholder.png'}
                        alt={item.name}
                        className="item-image-modern"
                        onError={e => {
                          (e.target as HTMLImageElement).src = '/placeholder.png';
                        }}
                      />
                      <div className="image-overlay"></div>
                    </div>
                    
                    <div className="item-details-modern">
                      <div className="item-header">
                        <h3 className="item-name">{item.name}</h3>
                        <div className="item-badges">
                          <span className="badge badge-available">✓ In Stock</span>
                          {/* Only show free delivery if shipping is actually 0 */}
                          {shippingCost === 0 && (
                            <span className="badge badge-shipping">🚚 Free Delivery</span>
                          )}
                        </div>
                      </div>
                      <p className="item-description">{item.description}</p>
                      
                      <div className="item-pricing">
                        <span className="current-price">₹{item.pricePerUnit.toFixed(2)}</span>
                        <span className="price-label">per unit</span>
                      </div>
                      
                      <div className="item-actions">
                        <div className="quantity-section">
                          <label className="quantity-label">Quantity</label>
                          <div className="quantity-controls-modern">
                            <button
                              className="qty-btn decrease"
                              onClick={() => updateQty(item.productId, item.quantity - 1)}
                              disabled={item.quantity <= 1 || isProcessing}
                            >
                              −
                            </button>
                            <span className="quantity-display">{item.quantity}</span>
                            <button
                              className="qty-btn increase"
                              onClick={() => updateQty(item.productId, item.quantity + 1)}
                              disabled={isProcessing}
                            >
                              +
                            </button>
                          </div>
                        </div>
                        
                        <button
                          className="remove-item-btn"
                          onClick={() => remove(item.productId)}
                          disabled={isProcessing}
                        >
                          <span className="remove-icon">🗑️</span>
                          Remove
                        </button>
                      </div>
                    </div>
                    
                    <div className="item-total-section">
                      <div className="item-total-price">
                        ₹{item.totalPrice.toFixed(2)}
                      </div>
                      {/* Only show savings if there's actual discount */}
                      {getItemDiscount(item) > 0 && (
                        <div className="savings-indicator">
                          <span className="savings-text">You save ₹{getItemDiscount(item).toFixed(0)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Cart Actions */}
              <div className="cart-actions-bar">
                <button 
                  className="continue-shopping-link"
                  onClick={() => navigate('/customerhome')}
                >
                  ← Continue Shopping
                </button>
                
                <div className="cart-actions-right">
                  <button className="clear-cart-btn" disabled={isProcessing}>
                    Clear Cart
                  </button>
                  <button className="save-later-btn" disabled={isProcessing}>
                    💾 Save for Later
                  </button>
                </div>
              </div>
            </div>
            
            {/* Order Summary Sidebar */}
            <div className="order-summary-section">
              <div className="order-summary-modern">
                <div className="summary-header">
                  <h3>Order Summary</h3>
                  <div className="summary-animation">💳</div>
                </div>
                
                <div className="summary-details">
                  <div className="summary-row">
                    <span className="summary-label">
                      <span className="label-icon">📦</span>
                      Items ({totalItems})
                    </span>
                    <span className="summary-value">₹{subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="summary-row">
                    <span className="summary-label">
                      <span className="label-icon">🚚</span>
                      Shipping
                    </span>
                    <span className="summary-value shipping-value">₹{shippingCost.toFixed(2)}</span>
                  </div>
                  
                  <div className="summary-row discount-row">
                    <span className="summary-label">
                      <span className="label-icon">🎁</span>
                      Discount
                    </span>
                    <span className="summary-value discount-value">-₹0.00</span>
                  </div>
                  
                  <div className="summary-divider"></div>
                  
                  <div className="summary-row total-row">
                    <span className="summary-label total-label">Total Amount</span>
                    <span className="summary-value total-value">₹{totalAmount.toFixed(2)}</span>
                  </div>
                  
                  <div className="tax-info">
                    <small>*Including all taxes</small>
                  </div>
                </div>
                
                <div className="promo-section">
                  <div className="promo-input">
                    <input 
                      type="text" 
                      placeholder="Enter promo code" 
                      className="promo-code-input"
                    />
                    <button className="apply-promo-btn">Apply</button>
                  </div>
                </div>
                
                <div className="checkout-section">
                  <button 
                    className={`checkout-btn-modern ${isProcessing ? 'processing' : ''}`}
                    onClick={handleCheckout}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <div className="processing-spinner"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <span className="checkout-icon">🔒</span>
                        Proceed to Checkout
                        <span className="checkout-amount">₹{totalAmount.toFixed(2)}</span>
                      </>
                    )}
                  </button>
                  
                  <div className="payment-methods">
                    <small>We accept:</small>
                    <div className="payment-icons">
                      <span className="payment-icon">💳</span>
                      <span className="payment-icon">📱</span>
                      <span className="payment-icon">💰</span>
                      <span className="payment-icon">🏦</span>
                    </div>
                  </div>
                  
                  <div className="guarantee-badges">
                    <div className="guarantee-item">
                      <span className="guarantee-icon">🔒</span>
                      <span>SSL Secured</span>
                    </div>
                    <div className="guarantee-item">
                      <span className="guarantee-icon">↩️</span>
                      <span>Easy Returns</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Recommendations */}
              <div className="recommendations-section">
                <h4>You might also like</h4>
                <div className="recommended-items">
                  <Link 
                    to={`/product/${recommendedProduct.id}`} 
                    className="recommended-item"
                  >
                    <img src={recommendedProduct.image} alt={recommendedProduct.name} />
                    <span className="recommended-name">{recommendedProduct.name}</span>
                    <span className="recommended-price">₹{recommendedProduct.price}</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};
