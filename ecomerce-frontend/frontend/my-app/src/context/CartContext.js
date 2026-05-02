// src/context/CartContext.js
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  // ✅ load from localStorage
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem("carryonix_cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // ✅ save to localStorage
  useEffect(() => {
    localStorage.setItem("carryonix_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // ✅ Add (increment if exists)
  const addToCart = (product, qty = 1) => {
  setCartItems((prev) => {
    const found = prev.find((x) => x.id === product.id);
    if (found) {
      return prev.map((x) =>
        x.id === product.id ? { ...x, qty: (x.qty || 1) + qty } : x
      );
    }
    return [...prev, { ...product, qty }];
  });
};


  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((x) => x.id !== id));
  };

  // ✅ changeQty (inc/dec)
  const changeQty = (id, type) => {
    setCartItems((prev) =>
      prev.map((x) => {
        if (x.id !== id) return x;
        const current = x.qty || 1;
        const next = type === "inc" ? current + 1 : current - 1;
        return { ...x, qty: next < 1 ? 1 : next };
      })
    );
  };

  // ✅ Set qty directly (input field এ কাজে লাগবে)
  const setQty = (id, qty) => {
    const q = Math.max(1, Number(qty || 1));
    setCartItems((prev) =>
      prev.map((x) => (x.id === id ? { ...x, qty: q } : x))
    );
  };

  const clearCart = () => setCartItems([]);

  // ✅ total items count
  const cartCount = useMemo(() => {
    return cartItems.reduce((sum, x) => sum + (x.qty || 1), 0);
  }, [cartItems]);

  // ✅ subtotal (price string -> number safe)
  const subtotal = useMemo(() => {
    return cartItems.reduce(
      (sum, x) => sum + Number(x.price) * (x.qty || 1),
      0
    );
  }, [cartItems]);

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    changeQty,
    setQty,
    clearCart,
    cartCount,
    subtotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
