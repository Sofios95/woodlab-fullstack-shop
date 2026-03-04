/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect } from "react";

// Το εξάγουμε για να το βλέπει το UseCart.jsx
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem("woodlab_cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Error")
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("woodlab_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const isItemInCart = prevItems.find((item) => item.id === product.id);
      if (isItemInCart) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === productId);
      if (existingItem && existingItem.quantity === 1) {
        return prevItems.filter((item) => item.id !== productId);
      } else {
        return prevItems.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
    });
  };

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + Number(item.price) * item.quantity, 
    0
  );

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("woodlab_cart");
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, totalAmount }}>
      {children}
    </CartContext.Provider>
  );
};