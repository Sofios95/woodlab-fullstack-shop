import { useCart } from '../context/useCart';
import { Link, useNavigate } from "react-router-dom"; // 1. Πρόσθεσε το useNavigate

function Cart() {
  // 2. Πάρε το totalAmount και το clearCart (αν χρειαστεί) από το useCart
  const { cartItems, addToCart, removeFromCart, totalAmount } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Το καλάθι σου είναι άδειο 🪵</h2>
        <Link title="Επιστροφή στα προϊόντα" to="/">
          <h3> Πίσω στην αρχική</h3>
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Το Καλάθι μου</h1>
      <div className="cart-container">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.image_url} alt={item.name} />
            <div className="item-details">
              <h3>{item.name}</h3>
              <p>Τιμή: {item.price}€</p>

              <div className="quantity-controls">
                <button onClick={() => removeFromCart(item.id)} className="btn-minus">-</button>
                <span className="quantity-num"> {item.quantity} </span>
                <button onClick={() => addToCart(item)} className="btn-plus">+</button>
              </div>
            </div>
            <div className="item-total">
              {/* Χρησιμοποίησε toFixed(2) για να φαίνονται σωστά τα δεκαδικά (π.χ. 10.50€) */}
              <strong>{(item.price * item.quantity).toFixed(2)}€</strong>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        {/* 3. Χρησιμοποίησε το έτοιμο totalAmount από το Context */}
        <h2>Σύνολο: {totalAmount.toFixed(2)}€</h2>
        
        {/* 4. Σύνδεσε το κουμπί με τη σελίδα Checkout */}
        <button 
          className="checkout-btn" 
          onClick={() => navigate("/checkout")}
        >
          Ολοκλήρωση Παραγγελίας
        </button>
      </div>
    </div>
  );
}

export default Cart;