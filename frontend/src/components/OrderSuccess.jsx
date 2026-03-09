import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './OrderSuccess.css'; // Το δικό του CSS

function OrderSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Αν κάποιος μπει στη σελίδα χωρίς παραγγελία (π.χ. refresh), δείχνουμε N/A
  const orderId = location.state?.orderId || "N/A";

  return (
    <div className="success-container">
      <div className="success-card">
        <div className="success-icon">
          <span role="img" aria-label="success">✅</span>
        </div>
        <h1>Η παραγγελία ολοκληρώθηκε!</h1>
        <p>Ευχαριστούμε για την εμπιστοσύνη σας στο <strong>Woodlab</strong>.</p>
        
        <div className="order-info">
          <span>Αριθμός Παραγγελίας:</span>
          <strong> #{orderId}</strong>
        </div>
        
        <p className="success-msg">Θα λάβετε σύντομα email με τις λεπτομέρειες της αποστολής.</p>
        
        <button className="back-home-btn" onClick={() => navigate('/')}>
          Επιστροφή στο Κατάστημα
        </button>
      </div>
    </div>
  );
}

export default OrderSuccess;