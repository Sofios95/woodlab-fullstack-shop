import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Container, Paper, Typography, Button, Box, CircularProgress } from '@mui/material';
import { useCart } from '../context/useCart';
import axios from 'axios';

// Εδώ βάζεις το PUBLIC KEY σου από το Stripe Dashboard
const stripePromise = loadStripe('pk_test_51T9TX30bOZflHyLJ1ASd4tTH6DPwIOn2NTCI2DkuXQKIB5ZksUn5iGh9EEgTU9GCjniDhiDYQRuwxsD5mmJQ4uOS00gIsQOWJR');

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { totalAmount, cartItems, clearCart } = useCart();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    try {
      // 1. Δημιουργία Payment Intent στο Backend
      const { data: { clientSecret } } = await axios.post('https://woodlab-fullstack-shop.onrender.com/api/create-payment-intent', {
        amount: totalAmount * 100, // Η Stripe θέλει cents (π.χ. 10€ = 1000)
      });

      // 2. Επιβεβαίωση πληρωμής
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        alert(result.error.message);
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          alert("Η πληρωμή ολοκληρώθηκε! 🪵");
          clearCart();
          // Εδώ θα κάνεις navigate στο success page
        }
      }
    } catch (err) {
      console.error(err);
      alert("Κάτι πήγε στραβά με την πληρωμή.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ mb: 3, p: 2, border: '1px solid #ccc', borderRadius: 2, bgcolor: '#fff' }}>
        <CardElement options={{ style: { base: { fontSize: '16px' } } }} />
      </Box>
      <Button 
        fullWidth 
        variant="contained" 
        type="submit" 
        disabled={!stripe || loading}
        sx={{ bgcolor: 'primary.main', py: 1.5 }}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : `ΠΛΗΡΩΜΗ ${totalAmount.toFixed(2)}€`}
      </Button>
    </form>
  );
};

function CheckoutPage() {
  return (
    <Container maxWidth="sm" sx={{ py: 10 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 800, color: 'primary.main', textAlign: 'center' }}>
          Ολοκλήρωση Παραγγελίας
        </Typography>
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </Paper>
    </Container>
  );
}

export default CheckoutPage;