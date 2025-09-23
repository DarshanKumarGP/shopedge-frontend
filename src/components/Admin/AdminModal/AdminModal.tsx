import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2 } from 'lucide-react';
import { BusinessAnalytics } from '../../../hooks/useAdminBusiness';
import { ProductData } from '../../../hooks/useAdminProducts';
import { UserResponse } from '../../../hooks/useAdminUsers';
import styles from './AdminModal.module.css';

export type ModalType =
  | 'addProduct'
  | 'deleteProduct'
  | 'viewUser'
  | 'modifyUser'
  | 'monthlyBusiness'
  | 'dailyBusiness'
  | 'yearlyBusiness'
  | 'overallBusiness'
  | 'response';

interface AdminModalProps {
  isOpen: boolean;
  modalType: ModalType;
  onClose: () => void;
  onSubmit: (data: any) => Promise<UserResponse | void>;
  isLoading?: boolean;
  response?: {
    success?: boolean;
    data?: BusinessAnalytics | UserResponse | any;
    message?: string;
    error?: string;
  };
}

const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  modalType,
  onClose,
  onSubmit,
  isLoading = false,
  response,
}) => {
  const [formData, setFormData] = useState<any>({});
  const [inputValue, setInputValue] = useState('');
  const [fetchedUser, setFetchedUser] = useState<UserResponse | null>(null);

  // Analytics params
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setFormData({});
      setInputValue('');
      setFetchedUser(null);
      setMonth('');
      setYear('');
      setDate('');
    }
  }, [isOpen, modalType]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const processedValue = type === 'number' ? Number(value) : value;
    setFormData((prev: any) => ({ ...prev, [name]: processedValue }));
  };

  const handleGeneralInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    try {
      switch (modalType) {
        case 'addProduct':
          await onSubmit(formData as ProductData);
          break;
        case 'deleteProduct':
          await onSubmit({ productId: Number(inputValue) });
          break;
        case 'viewUser':
          await onSubmit(Number(inputValue));
          break;
        case 'modifyUser':
          if (fetchedUser) {
            await onSubmit({ ...formData, userId: fetchedUser.userId });
          } else {
            const userData = await onSubmit(Number(inputValue));
            if (userData) setFetchedUser(userData as UserResponse);
          }
          break;
        case 'monthlyBusiness':
          await onSubmit({ month: Number(month), year: Number(year) });
          break;
        case 'dailyBusiness':
          await onSubmit(date);
          break;
        case 'yearlyBusiness':
          await onSubmit(Number(year));
          break;
        case 'overallBusiness':
          await onSubmit({});
          break;
      }
    } catch (error) {
      console.error('Modal submission error:', error);
    }
  };

  // Dashboard-style analytics render
  const renderBusinessAnalytics = (data: BusinessAnalytics) => {
    if (!data) return null;
    return (
      <div
        style={{
          background: 'rgba(30,32,40,0.93)',
          borderRadius: 12,
          padding: 24,
          color: '#fff',
          marginTop: 24,
          boxShadow: '0 4px 24px 0 #0d10221a',
          fontFamily: 'Inter,Segoe UI,sans-serif'
        }}
      >
        <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 8, color: '#59d1fe' }}>
         {data.period ||
          (data as any).date ||
            (data as any).year ||
         ''}

        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', marginBottom: 12 }}>
          <div>
            <div style={{ fontSize: 13, color: '#b8cfff' }}>Total Revenue</div>
            <div style={{ fontSize: 21, fontWeight: 700 }}>
              ₹{data.totalRevenue?.toLocaleString() ?? 0}
            </div>
          </div>
          {data.totalOrders !== undefined &&
            <div>
              <div style={{ fontSize: 13, color: '#b8cfff' }}>Total Orders</div>
              <div style={{ fontSize: 21, fontWeight: 700 }}>{data.totalOrders}</div>
            </div>}
          {data.averageOrderValue !== undefined &&
            <div>
              <div style={{ fontSize: 13, color: '#b8cfff' }}>Avg Order Value</div>
              <div style={{ fontSize: 21, fontWeight: 700 }}>
                ₹{data.averageOrderValue.toLocaleString()}
              </div>
            </div>}
          <div>
            <div style={{ fontSize: 13, color: '#b8cfff' }}>Items Sold</div>
            <div style={{ fontSize: 21, fontWeight: 700 }}>{data.totalItemsSold}</div>
          </div>
          <div>
            <div style={{ fontSize: 13, color: '#b8cfff' }}>Unique Categories</div>
            <div style={{ fontSize: 21, fontWeight: 700 }}>{data.uniqueCategories}</div>
          </div>
        </div>
        <div style={{ margin: '10px 0 14px 0', color: '#e68efc' }}>
          <b>Top Revenue Category:</b> {data.topRevenueCategory} &nbsp;|&nbsp;
          <b>Top Selling:</b> {data.topPerformingCategory}
        </div>
        {(data.categorySales && Object.keys(data.categorySales).length > 0) &&
          <div>
            <div style={{ fontSize: 15, fontWeight: 600, color: '#67beff', marginBottom: 8 }}>
              Category Breakdown:
            </div>
            <table style={{
              width: "100%", borderCollapse: "collapse", color: "#e3e7ef",
              background: "rgba(36,39,52,0.7)", borderRadius: 6, fontSize: 15
            }}>
              <thead>
                <tr>
                  <th style={{ padding: 7 }}>Category</th>
                  <th style={{ padding: 7 }}>Sold</th>
                  <th style={{ padding: 7 }}>Revenue</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(data.categorySales).map(category => (
                  <tr key={category}>
                    <td style={{ padding: 7 }}>{category}</td>
                    <td style={{ padding: 7 }}>{data.categorySales[category]}</td>
                    <td style={{ padding: 7 }}>
                      ₹{data.categoryRevenue?.[category]?.toLocaleString() ?? "0"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        }
        {data.period === 'Overall' && data.totalBusiness !== undefined && (
          <div style={{
            color: "#fe55a5", marginTop: 18, fontWeight: 600, fontSize: 17
          }}>
            Lifetime Business: ₹{data.totalBusiness?.toLocaleString()}
          </div>
        )}
      </div>
    );
  };

  const renderModalContent = () => {
    switch (modalType) {
      case 'addProduct':
        return (
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <div className={styles.modalIcon}>📦</div>
              <h2>Add New Product</h2>
              <p>Create a new product listing for your inventory</p>
            </div>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formRow}>
                <div className={styles.inputGroup}>
                  <label>Product Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name || ''}
                    onChange={handleInputChange}
                    placeholder="iPhone 15 Pro"
                    required
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Price ($)</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price || ''}
                    onChange={handleInputChange}
                    placeholder="999.99"
                    step="0.01"
                    required
                  />
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.inputGroup}>
                  <label>Stock Quantity</label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock || ''}
                    onChange={handleInputChange}
                    placeholder="50"
                    required
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Category ID</label>
                  <input
                    type="number"
                    name="categoryId"
                    value={formData.categoryId || ''}
                    onChange={handleInputChange}
                    placeholder="1"
                    required
                  />
                </div>
              </div>
              <div className={styles.inputGroup}>
                <label>Image URL</label>
                <input
                  type="url"
                  name="imageUrl"
                  value={formData.imageUrl || ''}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </div>
              <div className={styles.inputGroup}>
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description || ''}
                  onChange={handleInputChange}
                  placeholder="Latest iPhone with Pro camera system..."
                  rows={3}
                  required
                />
              </div>
              <button
                type="submit"
                className={styles.submitButton}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className={styles.spinning} />
                    Adding Product...
                  </>
                ) : (
                  'Add Product'
                )}
              </button>
            </form>
          </div>
        );
      case 'deleteProduct':
        return (
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <div className={styles.modalIcon}>🗑️</div>
              <h2>Delete Product</h2>
              <p>Remove a product from your inventory</p>
            </div>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                <label>Product ID</label>
                <input
                  type="number"
                  value={inputValue}
                  onChange={handleGeneralInputChange}
                  placeholder="Enter Product ID"
                  required
                />
              </div>
              <button
                type="submit"
                className={`${styles.submitButton} ${styles.danger}`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className={styles.spinning} />
                    Deleting...
                  </>
                ) : (
                  'Delete Product'
                )}
              </button>
            </form>
          </div>
        );
      case 'viewUser':
        return (
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <div className={styles.modalIcon}>👤</div>
              <h2>View User Details</h2>
              <p>Fetch and display user information</p>
            </div>
            {!response?.data ? (
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                  <label>User ID</label>
                  <input
                    type="number"
                    value={inputValue}
                    onChange={handleGeneralInputChange}
                    placeholder="Enter User ID"
                    required
                  />
                </div>
                <button type="submit" className={styles.submitButton} disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className={styles.spinning} />
                      Fetching...
                    </>
                  ) : (
                    'Get User Details'
                  )}
                </button>
              </form>
            ) : (
              <div className={styles.userDisplay}>
                <div className={styles.userCard}>
                  <div className={styles.userInfo}>
                    <div className={styles.userField}>
                      <label>User ID:</label>
                      <span>{response.data.userId}</span>
                    </div>
                    <div className={styles.userField}>
                      <label>Username:</label>
                      <span>{response.data.username}</span>
                    </div>
                    <div className={styles.userField}>
                      <label>Email:</label>
                      <span>{response.data.email}</span>
                    </div>
                    <div className={styles.userField}>
                      <label>Role:</label>
                      <span className={styles.roleBadge}>{response.data.role}</span>
                    </div>
                    <div className={styles.userField}>
                      <label>Created:</label>
                      <span>{new Date(response.data.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      case 'modifyUser':
        return (
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <div className={styles.modalIcon}>✏️</div>
              <h2>Modify User</h2>
              <p>Update user details and manage roles</p>
            </div>
            {!fetchedUser ? (
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                  <label>User ID</label>
                  <input
                    type="number"
                    value={inputValue}
                    onChange={handleGeneralInputChange}
                    placeholder="Enter User ID to fetch details"
                    required
                  />
                </div>
                <button type="submit" className={styles.submitButton} disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className={styles.spinning} />
                      Fetching...
                    </>
                  ) : (
                    'Fetch User Details'
                  )}
                </button>
              </form>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formRow}>
                  <div className={styles.inputGroup}>
                    <label>Username</label>
                    <input
                      type="text"
                      name="username"
                      defaultValue={fetchedUser.username}
                      onChange={handleInputChange}
                      placeholder="Username"
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      defaultValue={fetchedUser.email}
                      onChange={handleInputChange}
                      placeholder="Email"
                    />
                  </div>
                </div>
                <div className={styles.inputGroup}>
                  <label>Role</label>
                  <select
                    name="role"
                    defaultValue={fetchedUser.role}
                    onChange={handleInputChange as any}
                    className={styles.select}
                  >
                    <option value="CUSTOMER">CUSTOMER</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </div>
                <button type="submit" className={styles.submitButton} disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className={styles.spinning} />
                      Updating...
                    </>
                  ) : (
                    'Update User'
                  )}
                </button>
              </form>
            )}
          </div>
        );
      case 'monthlyBusiness':
        return (
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <div className={styles.modalIcon}>📅</div>
              <h2>Monthly Analytics</h2>
              <p>View business statistics for a specific month</p>
            </div>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formRow}>
                <div className={styles.inputGroup}>
                  <label>Month</label>
                  <input
                    type="number"
                    min={1}
                    max={12}
                    value={month}
                    onChange={e => setMonth(e.target.value)}
                    required
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Year</label>
                  <input
                    type="number"
                    min={2020}
                    max={2030}
                    value={year}
                    onChange={e => setYear(e.target.value)}
                    required
                  />
                </div>
              </div>
              <button type="submit" className={styles.submitButton} disabled={isLoading}>
                {isLoading ? <Loader2 className={styles.spinning} /> : "Get Analytics"}
              </button>
            </form>
            {response?.data && renderBusinessAnalytics(response.data)}
            {response?.error && (
              <div className={styles.error}>{response.error}</div>
            )}
          </div>
        );
      case 'dailyBusiness':
        return (
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <div className={styles.modalIcon}>📆</div>
              <h2>Daily Analytics</h2>
              <p>View business statistics for a specific day</p>
            </div>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                <label>Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className={styles.submitButton} disabled={isLoading}>
                {isLoading ? <Loader2 className={styles.spinning} /> : "Get Analytics"}
              </button>
            </form>
            {response?.data && renderBusinessAnalytics(response.data)}
            {response?.error && (
              <div className={styles.error}>{response.error}</div>
            )}
          </div>
        );
      case 'yearlyBusiness':
        return (
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <div className={styles.modalIcon}>📊</div>
              <h2>Yearly Analytics</h2>
              <p>View business statistics for a specific year</p>
            </div>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                <label>Year</label>
                <input
                  type="number"
                  min={2020}
                  max={2030}
                  value={year}
                  onChange={e => setYear(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className={styles.submitButton} disabled={isLoading}>
                {isLoading ? <Loader2 className={styles.spinning} /> : "Get Analytics"}
              </button>
            </form>
            {response?.data && renderBusinessAnalytics(response.data)}
            {response?.error && (
              <div className={styles.error}>{response.error}</div>
            )}
          </div>
        );
      case 'overallBusiness':
        return (
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <div className={styles.modalIcon}>💎</div>
              <h2>Overall Analytics</h2>
              <p>View statistics for the entire business history</p>
            </div>
            <form className={styles.form} onSubmit={handleSubmit}>
              <button type="submit" className={styles.submitButton} disabled={isLoading}>
                {isLoading ? <Loader2 className={styles.spinning} /> : "Get Analytics"}
              </button>
            </form>
            {response?.data && renderBusinessAnalytics(response.data)}
            {response?.error && (
              <div className={styles.error}>{response.error}</div>
            )}
          </div>
        );
      default:
        return <div className={styles.modalContent}><span style={{ color: "#fff" }}>Invalid modal type</span></div>;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.modalOverlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className={styles.modal}
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.closeButton} onClick={onClose}>
              <X size={24} />
            </button>
            {renderModalContent()}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AdminModal;
