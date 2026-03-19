import { useContext } from "react";
import { CartContext } from "./CartContext";

export const useCart = () => {
  const context = useContext(CartContext);
  
  // Η TypeScript εδώ καταλαβαίνει ότι αν το context ΔΕΝ είναι undefined,
  // τότε είναι σίγουρα τύπου CartContextType
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  
  return context;
};