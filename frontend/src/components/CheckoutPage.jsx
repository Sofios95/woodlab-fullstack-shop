import React, { useState } from 'react';
import { useCart } from '../context/useCart'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  Container, Typography, Box, Paper, Grid, TextField, 
  Button, List, ListItem, ListItemText, Divider, Alert 
} from "@mui/material";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

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
      <Container maxWidth="sm" sx={{ py: 10, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>Το καλάθι σου είναι άδειο! 🪵</Typography>
        <Button 
          variant="contained" 
          onClick={() => navigate('/')}
          sx={{ mt: 2, bgcolor: "#4a3728", "&:hover": { bgcolor: "#a67c52" } }}
        >
          Επιστροφή στα Προϊόντα
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', color: "#4a3728" }}>
        Ολοκλήρωση Παραγγελίας
      </Typography>

      <Grid container spacing={4}>
        {/* Φόρμα Στοιχείων */}
        <Grid item xs={12} md={7}>
          <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 1 }}>
              <LocalShippingIcon color="action" />
              <Typography variant="h6">Στοιχεία Αποστολής</Typography>
            </Box>
            
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Ονοματεπώνυμο"
                    name="fullName"
                    variant="outlined"
                    required
                    onChange={handleChange}
                    placeholder="π.χ. Γιάννης Παπαδόπουλος"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    variant="outlined"
                    required
                    onChange={handleChange}
                    placeholder="example@mail.com"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Τηλέφωνο"
                    name="phone"
                    type="tel"
                    variant="outlined"
                    required
                    onChange={handleChange}
                    placeholder="6971234567"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Διεύθυνση"
                    name="address"
                    variant="outlined"
                    required
                    onChange={handleChange}
                    placeholder="π.χ. Αθηνάς 10, Αθήνα"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button 
                    type="submit" 
                    variant="contained" 
                    fullWidth 
                    size="large"
                    sx={{ 
                      py: 2, 
                      mt: 2, 
                      bgcolor: "#4a3728", 
                      fontWeight: 'bold',
                      fontSize: '1.1rem',
                      borderRadius: 2,
                      "&:hover": { bgcolor: "#2c1e14" }
                    }}
                  >
                    ΕΠΙΒΕΒΑΙΩΣΗ ΑΓΟΡΑΣ
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>

        {/* Σύνοψη Παραγγελίας */}
        <Grid item xs={12} md={5}>
          <Paper elevation={3} sx={{ p: 4, borderRadius: 3, bgcolor: "#fdfbf9" }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 1 }}>
              <ShoppingBasketIcon color="action" />
              <Typography variant="h6">Η Παραγγελία σου</Typography>
            </Box>
            
            <List disablePadding>
              {cartItems.map((item) => (
                <ListItem key={item.id} sx={{ py: 1.5, px: 0 }}>
                  <ListItemText 
                    primary={item.name} 
                    secondary={`Ποσότητα: ${item.quantity}`} 
                  />
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {(item.price * item.quantity).toFixed(2)}€
                  </Typography>
                </ListItem>
              ))}
              
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Σύνολο:</Typography>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: "#4a3728" }}>
                  {totalAmount.toFixed(2)}€
                </Typography>
              </Box>
            </List>

            <Alert severity="info" sx={{ mt: 4, bgcolor: "transparent", border: "1px solid #e3f2fd" }}>
              Η πληρωμή γίνεται με αντικαταβολή κατά την παράδοση.
            </Alert>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default CheckoutPage;