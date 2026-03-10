import React from "react";
import { useCart } from "../context/useCart";
import { Link, useNavigate } from "react-router-dom";
import { 
  Container, Typography, Box, Button, Paper, 
  List, ListItem, ListItemAvatar, Avatar, ListItemText, 
  IconButton, Divider, Stack 
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function Cart() {
  const { cartItems, addToCart, removeFromCart, totalAmount } = useCart();
  const navigate = useNavigate();

  // Άδειο Καλάθι
  if (cartItems.length === 0) {
    return (
      <Container maxWidth="sm" sx={{ py: 10, textAlign: "center" }}>
        <ShoppingBagOutlinedIcon sx={{ fontSize: 80, color: "#ccc", mb: 2 }} />
        <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
          Το καλάθι σου είναι άδειο 🪵
        </Typography>
        <Button 
          component={Link} 
          to="/" 
          startIcon={<ArrowBackIcon />}
          sx={{ mt: 2, color: "#4a3728" }}
        >
          Πίσω στην αρχική
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: "bold", color: "#2c3e50" }}>
        Το Καλάθι μου
      </Typography>

      <Grid container spacing={4}>
        {/* Λίστα Προϊόντων */}
        <Grid item xs={12} md={8}>
          <Paper elevation={2} sx={{ borderRadius: 3, overflow: "hidden" }}>
            <List sx={{ p: 0 }}>
              {cartItems.map((item, index) => (
                <React.Fragment key={item.id}>
                  <ListItem 
                    sx={{ py: 3, px: 2, display: { xs: "block", sm: "flex" } }}
                    secondaryAction={
                      <Typography variant="subtitle1" sx={{ fontWeight: "bold", display: {xs: "none", sm: "block"} }}>
                        {(item.price * item.quantity).toFixed(2)}€
                      </Typography>
                    }
                  >
                    <ListItemAvatar sx={{ mb: { xs: 2, sm: 0 } }}>
                      <Avatar 
                        src={item.image_url} 
                        variant="rounded" 
                        sx={{ width: 80, height: 80, mr: 2, border: "1px solid #eee" }} 
                      />
                    </ListItemAvatar>
                    
                    <ListItemText
                      primary={<Typography variant="h6" sx={{ fontSize: "1.1rem" }}>{item.name}</Typography>}
                      secondary={
                        <Box sx={{ mt: 1 }}>
                          <Typography variant="body2" color="text.secondary">
                            Τιμή μονάδας: {item.price}€
                          </Typography>
                          
                          {/* Controls */}
                          <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1 }}>
                            <IconButton 
                              size="small" 
                              onClick={() => removeFromCart(item.id)}
                              sx={{ border: "1px solid #ddd" }}
                            >
                              <RemoveIcon fontSize="small" />
                            </IconButton>
                            <Typography sx={{ px: 1, fontWeight: "bold" }}>{item.quantity}</Typography>
                            <IconButton 
                              size="small" 
                              onClick={() => addToCart(item)}
                              sx={{ border: "1px solid #ddd" }}
                            >
                              <AddIcon fontSize="small" />
                            </IconButton>
                          </Stack>
                        </Box>
                      }
                    />
                    {/* Total για Mobile */}
                    <Typography sx={{ display: { xs: "block", sm: "none" }, mt: 2, fontWeight: "bold", textAlign: "right" }}>
                       {(item.price * item.quantity).toFixed(2)}€
                    </Typography>
                  </ListItem>
                  {index < cartItems.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Σύνολο & Checkout */}
        <Grid item xs={12} md={4}>
          <Paper elevation={4} sx={{ p: 3, borderRadius: 3, bgcolor: "#fdfbf9", border: "1px solid #f0e6dd" }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
              Σύνοψη Παραγγελίας
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
              <Typography color="text.secondary">Σύνολο:</Typography>
              <Typography variant="h5" sx={{ fontWeight: "bold", color: "#4a3728" }}>
                {totalAmount.toFixed(2)}€
              </Typography>
            </Box>
            <Button 
              variant="contained" 
              fullWidth 
              size="large"
              onClick={() => navigate("/checkout")}
              sx={{ 
                bgcolor: "#4a3728", 
                py: 1.5,
                borderRadius: "12px",
                "&:hover": { bgcolor: "#35281e" }
              }}
            >
              Ολοκλήρωση
            </Button>
            <Button 
              component={Link} 
              to="/" 
              fullWidth 
              sx={{ mt: 2, color: "#7f8c8d", textTransform: "none" }}
            >
              Συνέχεια Αγορών
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

// Χρειαζόμαστε και το Grid από το MUI, οπότε πρόσθεσέ το στο import
import { Grid } from "@mui/material";

export default Cart;