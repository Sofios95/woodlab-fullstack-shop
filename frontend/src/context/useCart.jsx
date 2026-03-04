import { useContext } from "react";
import { CartContext } from "./CartContext"; // Σιγουρέψου ότι η διαδρομή είναι σωστή

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};