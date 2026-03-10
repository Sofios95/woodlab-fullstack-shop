import React from 'react';
import { useCart } from '../context/useCart';
import { useNavigate } from 'react-router-dom';
import { 
  Container, Typography, Box, Paper, IconButton, Button, 
  List, ListItem, Divider, Avatar, Stack 
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';

function Cart() {
  const { cartItems, addToCart, removeFromCart, clearCart, totalAmount } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <Container maxWidth="sm" sx={{ py: 10, textAlign: 'center' }}>
        <Typography variant="h5" sx={{ mb: 3, color: "#4a3728" }}>Το καλάθι σου είναι άδειο! 🪵</Typography>
        <Button variant="contained" onClick={() => navigate('/')} sx={{ bgcolor: "#4a3728" }}>
          Επιστροφή στα Προϊόντα
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 800, color: "#4a3728" }}>
        Το Καλάθι μου
      </Typography>

      <Paper elevation={3} sx={{ borderRadius: 4, overflow: 'hidden' }}>
        <List disablePadding>
          {cartItems.map((item) => (
            <React.Fragment key={item.id}>
              <ListItem sx={{ py: 3, px: { xs: 2, md: 4 } }}>
                <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', gap: 2 }}>
                  
                  {/* Εικόνα Προϊόντος */}
                  <Avatar 
                    src={item.image_url} 
                    variant="rounded" 
                    sx={{ width: 80, height: 80, border: "1px solid #eee" }} 
                  />

                  {/* Πληροφορίες & Controls (Αριστερά/Κέντρο) */}
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.1rem' }}>
                      {item.name}
                    </Typography>
                    
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Τιμή μονάδας: {item.price.toFixed(2)}€
                    </Typography>

                    <Stack direction="row" alignItems="center" spacing={1}>
                      <IconButton size="small" onClick={() => removeFromCart(item.id)} sx={{ border: "1px solid #ddd" }}>
                        <RemoveIcon fontSize="small" />
                      </IconButton>
                      <Typography sx={{ px: 2, fontWeight: 'bold' }}>{item.quantity}</Typography>
                      <IconButton size="small" onClick={() => addToCart(item)} sx={{ border: "1px solid #ddd" }}>
                        <AddIcon fontSize="small" />
                      </IconButton>
                    </Stack>
                  </Box>

                  {/* Σύνολο Προϊόντος (Δεξιά) - Εδώ διορθώθηκε το overlap */}
                  <Box sx={{ textAlign: 'right', minWidth: '100px' }}>
                    <Typography variant="h6" sx={{ fontWeight: 800, color: "#4a3728" }}>
                      {(item.price * item.quantity).toFixed(2)}€
                    </Typography>
                  </Box>

                </Box>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>

        {/* Footer Καλαθιού */}
        <Box sx={{ p: 4, bgcolor: "#fdfbf9", display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 800 }}>
            Σύνολο: {totalAmount.toFixed(2)}€
          </Typography>
          
          <Stack direction="row" spacing={2}>
            <Button color="error" onClick={clearCart} startIcon={<DeleteIcon />}>
              Καθαρισμός
            </Button>
            <Button 
              variant="contained" 
              size="large"
              startIcon={<ShoppingCartCheckoutIcon />}
              onClick={() => navigate('/checkout')}
              sx={{ bgcolor: "#4a3728", px: 4, py: 1.5, "&:hover": { bgcolor: "#a67c52" } }}
            >
              ΟΛΟΚΛΗΡΩΣΗ
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
}

export default Cart;