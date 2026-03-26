import React from "react";
import { useCart } from "../context/useCart";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Paper,
  IconButton,
  Button,
  List,
  ListItem,
  Divider,
  Avatar,
  Stack,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";

function Cart() {
  const { cartItems, addToCart, removeFromCart, clearCart, totalAmount } =
    useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <Container maxWidth="sm" sx={{ py: 10, textAlign: "center" }}>
        <Typography
          variant="h5"
          sx={{ mb: 3, color: "#4a3728", fontWeight: 700 }}
        >
          Το καλάθι σου είναι άδειο! 🪵
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate("/")}
          sx={{ bgcolor: "#4a3728", "&:hover": { bgcolor: "#a67c52" } }}
        >
          Επιστροφή στα Προϊόντα
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Typography
        variant="h4"
        sx={{ mb: 4, fontWeight: 800, color: "#4a3728" }}
      >
        Το Καλάθι μου
      </Typography>

      <Paper
        elevation={4}
        sx={{ borderRadius: 4, overflow: "hidden", border: "1px solid #eee" }}
      >
        <List disablePadding>
          {cartItems.map((item) => (
            <React.Fragment key={item.id}>
              <ListItem sx={{ py: 3, px: { xs: 2, md: 4 } }}>
                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                    flexDirection: { xs: "column", sm: "row" },
                    gap: 3,
                  }}
                >
                  <Avatar
                    src={item.image_url}
                    variant="rounded"
                    sx={{
                      width: 90,
                      height: 90,
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    }}
                  />

                  <Box
                    sx={{
                      flexGrow: 1,
                      textAlign: { xs: "center", sm: "left" },
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 700, color: "text.primary" }}
                    >
                      {item.name}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary", mb: 1.5 }}
                    >
                      Τιμή: {Number(item.price).toFixed(2)}€
                    </Typography>

                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={1}
                      justifyContent={{ xs: "center", sm: "flex-start" }}
                    >
                      <IconButton
                        size="small"
                        onClick={() => removeFromCart(item.id)}
                        sx={{ border: "1px solid", borderColor: "divider" }}
                      >
                        <RemoveIcon fontSize="small" />
                      </IconButton>
                      <Typography sx={{ px: 2, fontWeight: 800 }}>
                        {item.quantity}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => addToCart(item)}
                        sx={{ border: "1px solid", borderColor: "divider" }}
                      >
                        <AddIcon fontSize="small" />
                      </IconButton>
                    </Stack>
                  </Box>

                  {/* Price Label */}
                  <Box
                    sx={{
                      textAlign: { xs: "center", sm: "right" },
                      minWidth: "110px",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 900, color: "#4a3728" }}
                    >
                      {(Number(item.price) * item.quantity).toFixed(2)}€
                    </Typography>
                  </Box>
                </Box>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>

        <Box
          sx={{
            p: 4,
            bgcolor: "#f9f9f9",
            display: "flex",
            flexDirection: "column",
            alignItems: { xs: "center", sm: "flex-end" },
            gap: 2,
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 900, color: "#4a3728" }}>
            Σύνολο: {Number(totalAmount).toFixed(2)}€
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ width: { xs: "100%", sm: "auto" } }}
          >
            <Button
              sx={{ color: "#d32f2f", fontWeight: 600 }}
              onClick={clearCart}
              startIcon={<DeleteIcon />}
            >
              Καθαρισμός
            </Button>
            <Button
              variant="contained"
              size="large"
              startIcon={<ShoppingCartCheckoutIcon />}
              onClick={() => navigate("/checkout")}
              sx={{
                bgcolor: "#4a3728",
                px: 5,
                py: 1.5,
                borderRadius: "10px",
                "&:hover": { bgcolor: "#a67c52" },
              }}
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
