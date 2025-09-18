import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/customer/Header/Header';
import { Footer } from '../../components/customer/Footer/Footer';
import { useOrders } from '../../hooks/useOrders';
import { useCart } from '../../hooks/useCart';
import { OrderProduct } from '../../types/order.types';
import './OrdersPage.css';

export const OrdersPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    orders,
    filteredOrders,
    loading,
    error,
    username,
    totalOrders,
    totalSpent,
    filters,
    updateFilters,
    clearFilters,
    refreshOrders,
    hasOrders,
    hasFilteredResults,
  } = useOrders();

  const { totalItems } = useCart();

  // Local state for UI interactions
  const [isRefreshing, setIsRefreshing] = useState(false);

  /**
   * Handle refresh button click
   */
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshOrders();
    setTimeout(() => setIsRefreshing(false), 500); // Visual feedback
  };

  /**
   * Handle search input change
   */
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFilters({ searchTerm: e.target.value });
  };

  /**
   * Handle sort change
   */
  const handleSortChange = (sortBy: string) => {
    updateFilters({ sortBy: sortBy as 'date' | 'amount' | 'name' });
  };

  /**
   * Handle sort order change
   */
  const handleSortOrderChange = () => {
    updateFilters({ 
      sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc' 
    });
  };

  /**
   * Format currency
   */
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  /**
   * Get placeholder image
   */
  const getImageSrc = (imageUrl: string | null): string => {
    return imageUrl || '/placeholder.png';
  };

  /**
   * Handle image load error
   */
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.src = '/placeholder.png';
  };

  /**
   * Render loading state
   */
  const renderLoading = () => (
    <div className="orders-loading">
      <div className="loading-spinner"></div>
      <h2 className="loading-text">Loading your orders...</h2>
      <p>Please wait while we fetch your order history</p>
    </div>
  );

  /**
   * Render error state
   */
  const renderError = () => (
    <div className="orders-error">
      <div className="error-icon">⚠️</div>
      <h2 className="error-title">Oops! Something went wrong</h2>
      <p className="error-message">{error}</p>
      <div className="error-actions">
        <button onClick={handleRefresh} className="retry-btn">
          Try Again
        </button>
        <button 
          onClick={() => navigate('/customerhome')} 
          className="start-shopping-btn"
        >
          🏠 Go Home
        </button>
      </div>
    </div>
  );

  /**
   * Render empty state
   */
  const renderEmpty = () => (
    <div className="orders-empty">
      <div className="empty-icon">🛒</div>
      <h2 className="empty-title">No Orders Yet!</h2>
      <p className="empty-message">
        You haven't placed any orders yet. Start exploring our amazing products and make your first purchase!
      </p>
      <button
        onClick={() => navigate('/customerhome')}
        className="start-shopping-btn"
      >
        🛍️ Start Shopping
      </button>
    </div>
  );

  /**
   * Render no search results
   */
  const renderNoResults = () => (
    <div className="orders-empty">
      <div className="empty-icon">🔍</div>
      <h2 className="empty-title">No Results Found</h2>
      <p className="empty-message">
        No orders match your current search criteria. Try adjusting your filters or search terms.
      </p>
      <button onClick={clearFilters} className="clear-filters-btn">
        Clear All Filters
      </button>
    </div>
  );

  /**
   * Render individual order card
   */
  const renderOrderCard = (order: OrderProduct, index: number) => (
    <div 
      key={`${order.order_id}-${order.product_id}`} 
      className="order-card"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="order-header">
        <h3 className="order-id">Order #{order.order_id}</h3>
        <span className="order-badge">✅ Completed</span>
      </div>
      
      <div className="order-body">
        <div className="order-image-container">
          <img
            src={getImageSrc(order.image_url)}
            alt={order.name}
            className="order-image"
            onError={handleImageError}
          />
          <div className="image-overlay"></div>
        </div>
        
        <div className="order-details">
          <h2 className="product-name">{order.name}</h2>
          <p className="product-description">{order.description}</p>
          
          <div className="order-details-grid">
            <div className="detail-item">
              <div className="detail-label">Quantity</div>
              <div className="detail-value">{order.quantity} {order.quantity === 1 ? 'item' : 'items'}</div>
            </div>
            
            <div className="detail-item">
              <div className="detail-label">Price per Unit</div>
              <div className="detail-value price-value">{formatCurrency(order.price_per_unit)}</div>
            </div>
            
            <div className="detail-item">
              <div className="detail-label">Total Amount</div>
              <div className="detail-value price-value">{formatCurrency(order.total_price)}</div>
            </div>
            
            <div className="detail-item">
              <div className="detail-label">Product ID</div>
              <div className="detail-value">#{order.product_id}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  /**
   * Render statistics cards
   */
  const renderStats = () => (
    <div className="orders-stats">
      <div className="stat-card">
        <div className="stat-icon">📦</div>
        <div className="stat-value">{totalOrders}</div>
        <div className="stat-label">Total Orders</div>
      </div>
      
      <div className="stat-card">
        <div className="stat-icon">💰</div>
        <div className="stat-value">{formatCurrency(totalSpent)}</div>
        <div className="stat-label">Total Spent</div>
      </div>
      
      <div className="stat-card">
        <div className="stat-icon">🛍️</div>
        <div className="stat-value">{orders.reduce((sum, order) => sum + order.quantity, 0)}</div>
        <div className="stat-label">Items Purchased</div>
      </div>
    </div>
  );

  /**
   * Render controls section
   */
  const renderControls = () => (
    <div className="orders-controls">
      <div className="controls-container">
        <div className="search-section">
          <div className="search-icon">🔍</div>
          <input
            type="text"
            placeholder="Search orders by product name, description, or order ID..."
            value={filters.searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>
        
        <div className="filter-section">
          <div className="filter-group">
            <label className="filter-label">Sort By</label>
            <select
              value={filters.sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className="filter-select"
            >
              <option value="date">Order Date</option>
              <option value="amount">Total Amount</option>
              <option value="name">Product Name</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label className="filter-label">Order</label>
            <button
              onClick={handleSortOrderChange}
              className="filter-select"
            >
              {filters.sortOrder === 'asc' ? '↑ Ascending' : '↓ Descending'}
            </button>
          </div>
          
          <button onClick={clearFilters} className="clear-filters-btn">
            Clear Filters
          </button>
          
          <button 
            onClick={handleRefresh} 
            className="refresh-btn"
            disabled={isRefreshing}
          >
            {isRefreshing ? '🔄' : '↻'} Refresh
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="orders-page">
      <Header cartCount={totalItems} username={username} />
      
      {/* Page Header */}
      <div className="orders-header">
        <div className="orders-header-content">
          <h1 className="orders-title">Your Order History</h1>
          <p className="orders-subtitle">Track and review all your past purchases</p>
        </div>
      </div>

      {/* Statistics Section */}
      {hasOrders && !loading && renderStats()}

      {/* Controls Section */}
      {hasOrders && !loading && !error && renderControls()}

      {/* Main Content */}
      <div className="orders-content">
        {loading && renderLoading()}
        {error && !loading && renderError()}
        {!loading && !error && !hasOrders && renderEmpty()}
        {!loading && !error && hasOrders && !hasFilteredResults && renderNoResults()}
        
        {!loading && !error && hasFilteredResults && (
          <div className="orders-list">
            {filteredOrders.map((order, index) => renderOrderCard(order, index))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};
