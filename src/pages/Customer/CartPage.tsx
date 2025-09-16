import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { Header } from '../../components/customer/Header/Header';
import { Footer } from '../../components/customer/Footer/Footer';
import './CartPage.css';

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    username, items, subtotal, shippingCost,
    totalItems, totalAmount, loading, error,
    updateQty, remove
  } = useCart();

  const fmt = (v: number) => `₹${v.toFixed(2)}`;

  if (loading) {
    return (
      <div className="cart-page">
        <Header cartCount={0} username={username}/>
        <div className="cart-loading">
          <div className="loading-spinner"></div>
          <p>Loading your cart...</p>
        </div>
        <Footer/>
      </div>
    );
  }

  if (error) {
    return (
      <div className="cart-page">
        <Header cartCount={0} username={username}/>
        <div className="cart-error">{error}</div>
        <Footer/>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <Header cartCount={totalItems} username={username}/>
      <div className="cart-container">
        {items.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>
            <h2>Your Cart is Empty</h2>
            <p>Add some items to get started!</p>
            <button
              className="continue-shopping-btn"
              onClick={() => navigate('/customerhome')}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-items">
              {items.map(item => (
                <div key={item.productId} className="cart-item">
                  <div className="item-image">
                    <img
                      src={item.imageUrl ? item.imageUrl : '/placeholder.png'}
                      alt={item.name}
                      onError={e => {
                        (e.target as HTMLImageElement).src = '/placeholder.png';
                      }}
                    />
                  </div>
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <div className="item-price">{fmt(item.pricePerUnit)} each</div>
                  </div>
                  <div className="item-controls">
                    <div className="quantity-controls">
                      <button
                        className="quantity-btn"
                        onClick={() => updateQty(item.productId, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >-</button>
                      <span className="quantity">{item.quantity}</span>
                      <button
                        className="quantity-btn"
                        onClick={() => updateQty(item.productId, item.quantity + 1)}
                      >+</button>
                    </div>
                    <div className="item-total">{fmt(item.totalPrice)}</div>
                    <button
                      className="remove-btn"
                      onClick={() => remove(item.productId)}
                    >Remove</button>
                  </div>
                </div>
              ))}
            </div>
            <aside className="order-summary">
              <h2>Order Summary</h2>
              <div className="summary-row">
                <span>Products:</span>
                <span>{totalItems}</span>
              </div>
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>{fmt(subtotal)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping:</span>
                <span>{fmt(shippingCost)}</span>
              </div>
              <div className="summary-divider"></div>
              <div className="summary-row total">
                <span>Total:</span>
                <span>{fmt(totalAmount)}</span>
              </div>
              <button className="checkout-btn">Proceed to Checkout</button>
            </aside>
          </div>
        )}
      </div>
      <Footer/>
    </div>
  );
};
