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
  TextField,
} from "@mui/material";
import { useCart } from "../context/useCart";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// PRO TIP: Καλό είναι το κλειδί να μπαίνει σε .env αρχείο, αλλά για το demo είναι οκ εδώ
const stripePromise = loadStripe(
  "pk_test_51T9TX30bOZflHyLJ1ASd4tTH6DPwIOn2NTCI2DkuXQKIB5ZksUn5iGh9EEgTU9GCjniDhiDYQRuwxsD5mmJQ4uOS00gIsQOWJR",
);

interface CustomerInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
}

const CheckoutForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { totalAmount, cartItems, clearCart } = useCart();
  const [loading, setLoading] = useState<boolean>(false);

  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
  });

  // Type-safe handler για τα inputs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerInfo({ ...customerInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    try {
      // 1. Δημιουργία Payment Intent (Backend)
      // Στέλνουμε το ποσό * 100 γιατί η Stripe δουλεύει με cents (π.χ. 10€ = 1000)
      const {
        data: { clientSecret },
      } = await axios.post(
        "https://woodlab-fullstack-shop.onrender.com/api/stripe/create-payment-intent",
        { amount: totalAmount }
      );

      // 2. Επιβεβαίωση πληρωμής στη Stripe
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) return;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: customerInfo.fullName,
            email: customerInfo.email,
          }
        },
      });

      if (result.error) {
        alert(result.error.message);
      } else if (result.paymentIntent?.status === "succeeded") {
        // 3. Αποθήκευση παραγγελίας στη βάση
        const response = await axios.post(
          "https://woodlab-fullstack-shop.onrender.com/api/orders",
          {
            fullName: customerInfo.fullName,
            email: customerInfo.email,
            phone: customerInfo.phone,
            address: customerInfo.address,
            items: cartItems,
            total: totalAmount,
            paymentId: result.paymentIntent.id,
            status: "Paid",
          },
        );

        const newOrderId = response.data?.id || "WOOD-" + Math.floor(Math.random() * 1000);

        clearCart();
        navigate("/order-success", { state: { orderId: newOrderId } });
      }
    } catch (err) {
      console.error("Checkout Error:", err);
      alert("Σφάλμα κατά την πληρωμή. Δοκιμάστε ξανά.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3 }}>
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
        <TextField
          label="Διεύθυνση Αποστολής"
          name="address"
          variant="outlined"
          fullWidth
          required
          value={customerInfo.address}
          onChange={handleInputChange}
        />
      </Box>

      <Typography variant="subtitle2" sx={{ mb: 1, color: "#666" }}>
        Στοιχεία Κάρτας
      </Typography>
      <Box
        sx={{
          mb: 3,
          p: 2,
          border: "1px solid #ccc",
          borderRadius: 2,
          bgcolor: "#fff",
        }}
      >
        <CardElement
          options={{
            hidePostalCode: true,
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": { color: "#aab7c4" },
              },
              invalid: { color: "#9e2146" },
            },
          }}
        />
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
          `ΠΛΗΡΩΜΗ ${Number(totalAmount).toFixed(2)}€`
        )}
      </Button>
    </form>
  );
};

const CheckoutPage: React.FC = () => {
  return (
    <Container maxWidth="sm" sx={{ py: { xs: 4, md: 10 } }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
        <Typography
          variant="h5"
          sx={{ mb: 3, fontWeight: 800, color: "#4a3728", textAlign: "center" }}
        >
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