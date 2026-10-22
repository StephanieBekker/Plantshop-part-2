"use client";

import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);

export default function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    if (!orderPlaced) return;

    // Keep the confirmation timer running across route changes.
    const timer = setTimeout(() => {
      setOrderPlaced(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, [orderPlaced]);

  function addToCart(product, quantity = 1) {
    if (!Number.isInteger(quantity) || quantity < 1) return;

    setOrderPlaced(false);

    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id);

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }

      return [
        ...currentItems,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity,
        },
      ];
    });
  }

  function setQuantity(id, quantity) {
    if (!Number.isInteger(quantity) || quantity < 1) return;

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id ? { ...item, quantity } : item,
      ),
    );
  }

  function removeItem(id) {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id));
  }

  function clearCart() {
    setItems([]);
    setOrderPlaced(false);
  }

  function completeOrder() {
    setItems([]);
    setOrderPlaced(true);
  }

  function dismissOrderConfirmation() {
    setOrderPlaced(false);
  }

  // Derive totals from the items so all views use the same values.
  const itemCount = items.reduce((count, item) => count + item.quantity, 0);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        total,
        orderPlaced,
        addToCart,
        setQuantity,
        removeItem,
        clearCart,
        completeOrder,
        dismissOrderConfirmation,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (context === null) {
    throw new Error("useCart must be used inside CartProvider.");
  }

  return context;
}
