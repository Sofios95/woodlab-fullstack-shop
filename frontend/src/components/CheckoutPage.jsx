import React, { useState } from 'react';
import { useCart } from '../context/useCart'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CheckoutPage.css';


function CheckoutPage() {
  const { cartItems, totalAmount, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    phone: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    
    const orderData = {
      fullName: formData.fullName,
      email: formData.email,
      address: formData.address,
      phone: formData.phone,
      items: cartItems,
      total: totalAmount, 
    };

    try {
      const response = await axios.post("https://woodlab-fullstack-shop.onrender.com/api/orders", orderData);

      if (response.status === 201 || response.status === 200) {
        clearCart();
        navigate('/order-success', { state: { orderId: response.data.orderId } });
      }
    } catch (error) {
      console.error("Error details:", error.response?.data || error.message);
      alert("Κάτι πήγε στραβά με την αποστολή της παραγγελίας.");
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="checkout-empty" style={{textAlign: 'center', padding: '50px'}}>
        <h2>Το καλάθι σου είναι άδειο! 🪵</h2>
        <button onClick={() => navigate('/')}>Επιστροφή στα Προϊόντα</button>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <h1 className="checkout-title">Ολοκλήρωση Παραγγελίας</h1>
      <div className="checkout-container">
        <div className="checkout-form-section">
          <h3>Στοιχεία Αποστολής</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Ονοματεπώνυμο</label>
              <input type="text" name="fullName" placeholder="π.χ. Γιάννης Παπαδόπουλος" required onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" placeholder="π.χ. example@mail.com" required onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Διεύθυνση</label>
              <input type="text" name="address" placeholder="π.χ. Αθηνάς 10, Αθήνα" required onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Τηλέφωνο</label>
              <input type="tel" name="phone" placeholder="π.χ. 6971234567" required onChange={handleChange} />
            </div>
            <button type="submit" className="confirm-btn">ΕΠΙΒΕΒΑΙΩΣΗ ΑΓΟΡΑΣ</button>
          </form>
        </div>

        <div className="order-summary-section">
          <h3>Η Παραγγελία σου</h3>
          <div className="summary-list">
            {cartItems.map(item => (
              <div key={item.id} className="summary-item">
                <span className="item-name">{item.name} <small>x{item.quantity}</small></span>
                <span className="item-price">{(item.price * item.quantity).toFixed(2)}€</span>
              </div>
            ))}
          </div>
          <div className="total-row">
            <span>Σύνολο:</span>
            <span>{totalAmount.toFixed(2)}€</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;