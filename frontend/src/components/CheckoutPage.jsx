import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  CircularProgress,
  TextField, // Προσθήκη TextField
} from "@mui/material";
import { useCart } from "../context/useCart";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51T9TX30bOZflHyLJ1ASd4tTH6DPwIOn2NTCI2DkuXQKIB5ZksUn5iGh9EEgTU9GCjniDhiDYQRuwxsD5mmJQ4uOS00gIsQOWJR"
);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { totalAmount, cartItems, clearCart } = useCart();
  const [loading, setLoading] = useState(false);

  // PRO TAKE: State για τα στοιχεία που απαιτεί ο Validator στο Backend
  const [customerInfo, setCustomerInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  const handleInputChange = (e) => {
    setCustomerInfo({ ...customerInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    try {
      // 1. Δημιουργία Payment Intent (Backend)
      const { data: { clientSecret } } = await axios.post(
        "https://woodlab-fullstack-shop.onrender.com/api/stripe/create-payment-intent",
        { amount: totalAmount }
      );

      // 2. Επιβεβαίωση πληρωμής στη Stripe
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        alert(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        
        // 3. Αποθήκευση παραγγελίας στη Postgres
        // Στέλνουμε fullName, email, phone για να περάσει το validateOrder middleware
        const response = await axios.post(
          "https://woodlab-fullstack-shop.onrender.com/api/orders",
          {
            fullName: customerInfo.fullName,
            email: customerInfo.email,
            phone: customerInfo.phone,
            items: cartItems,
            total: totalAmount,
            paymentId: result.paymentIntent.id,
            status: "Paid",
          }
        );

        const newOrderId = response.data?.id || "WOOD-" + Math.floor(Math.random() * 1000);

        clearCart();
        
        // 4. Πάμε στη σελίδα επιτυχίας
        navigate("/order-success", { state: { orderId: newOrderId } });
      }
    } catch (err) {
      console.error("Checkout Error:", err);
      alert("Κάτι πήγε στραβά. Ελέγξτε τα στοιχεία σας και δοκιμάστε ξανά.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Στοιχεία Πελάτη */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
        <TextField
          label="Ονοματεπώνυμο"
          name="fullName"
          variant="outlined"
          fullWidth
          required
          value={customerInfo.fullName}
          onChange={handleInputChange}
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          variant="outlined"
          fullWidth
          required
          value={customerInfo.email}
          onChange={handleInputChange}
        />
        <TextField
          label="Τηλέφωνο"
          name="phone"
          variant="outlined"
          fullWidth
          required
          value={customerInfo.phone}
          onChange={handleInputChange}
        />
      </Box>

      {/* Stripe Card Input */}
      <Typography variant="subtitle2" sx={{ mb: 1, color: "#666" }}>
        Στοιχεία Κάρτας
      </Typography>
      <Box sx={{ mb: 3, p: 2, border: "1px solid #ccc", borderRadius: 2, bgcolor: "#fff" }}>
        <CardElement options={{ style: { base: { fontSize: "16px" } } }} />
      </Box>

      <Button
        fullWidth
        variant="contained"
        type="submit"
        disabled={!stripe || loading}
        sx={{ bgcolor: "#4a3728", py: 1.5, "&:hover": { bgcolor: "#a67c52" } }}
      >
        {loading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          `ΠΛΗΡΩΜΗ ${totalAmount.toFixed(2)}€`
        )}
      </Button>
    </form>
  );
};

function CheckoutPage() {
  return (
    <Container maxWidth="sm" sx={{ py: 10 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 800, color: "#4a3728", textAlign: "center" }}>
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