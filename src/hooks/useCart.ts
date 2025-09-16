import { useState, useEffect } from 'react';

export interface CartItem {
  productId: number;
  imageUrl: string;
  name: string;
  description: string;
  pricePerUnit: number;
  quantity: number;
  totalPrice: number;
}

interface RawCart {
  username: string;
  role: string;
  cart: {
    overall_total_price: number;
    products: Array<{
      product_id: number;
      image_url: string;
      name: string;
      description: string;
      price_per_unit: number;
      quantity: number;
      total_price: number;
    }>;
  };
}

export const useCart = () => {
  // Get username from localStorage or default to empty string
  const [username, setUsername] = useState(() => localStorage.getItem('username') || '');
  const [items, setItems] = useState<CartItem[]>([]);
  const [subtotal, setSubtotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const SHIPPING = 370;

  // Optionally update username from backend response on fetch
  const fetchCart = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('http://localhost:9090/api/cart/items?username=' + encodeURIComponent(username), {
        credentials: 'include'
      });
      if (!res.ok) throw new Error(`Cart API ${res.status}`);
      const raw: RawCart = await res.json();
      if (raw.username) setUsername(raw.username); // Sync username if needed

      const mapped = raw.cart.products.map(p => ({
        productId: p.product_id,
        imageUrl: p.image_url,
        name: p.name,
        description: p.description,
        pricePerUnit: p.price_per_unit,
        quantity: p.quantity,
        totalPrice: p.total_price
      }));
      setItems(mapped);
      setSubtotal(mapped.reduce((sum, x) => sum + x.totalPrice, 0));
    } catch (e) {
      setError((e as Error).message);
      setItems([]);
      setSubtotal(0);
    }
    setLoading(false);
  };

  const updateQty = async (pid: number, qty: number) => {
    await fetch('http://localhost:9090/api/cart/update', {
      method: 'PUT',
      credentials: 'include',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ username, productId: pid, quantity: qty })
    });
    fetchCart();
  };

  const remove = async (pid: number) => {
    await fetch('http://localhost:9090/api/cart/delete', {
      method: 'DELETE',
      credentials: 'include',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ username, productId: pid })
    });
    fetchCart();
  };

  useEffect(() => {
    fetchCart();
  }, [username]);

  return {
    username,
    items,
    subtotal,
    shippingCost: SHIPPING,
    totalItems: items.reduce((sum, x) => sum + x.quantity, 0),
    totalAmount: subtotal + SHIPPING,
    loading,
    error,
    updateQty,
    remove
  };
};
