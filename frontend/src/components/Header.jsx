import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/useCart';
import { 
  AppBar, Toolbar, Box, Badge, IconButton, Button, Container 
} from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function Header() {
  const { cartItems = [] } = useCart() || {}; 
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const navigate = useNavigate();

  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        bgcolor: "#fff", 
        color: "#4a3728", 
        boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
        borderBottom: "3px solid #a67c52" 
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
          
          {/* Logo */}
          <Box 
            component={Link} 
            to="/" 
            sx={{ display: "flex", alignItems: "center", textDecoration: "none" }}
          >
            <img 
              src="https://woodlab.gr/wp-content/uploads/2022/06/circle-and-logo.png" 
              alt="Woodlab Logo" 
              style={{ height: "60px", width: "auto" }} 
            />
          </Box>

          {/* Navigation Links & Cart */}
          <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1, md: 3 } }}>
            <Button 
              component={Link} 
              to="/" 
              sx={{ color: "#4a3728", fontWeight: 600, textTransform: "none" }}
            >
              Home
            </Button>
            <Button 
              component={Link} 
              to="/aboutus" 
              sx={{ color: "#4a3728", fontWeight: 600, textTransform: "none" }}
            >
              About
            </Button>
            <Button 
              component={Link} 
              to="/contact" 
              sx={{ color: "#4a3728", fontWeight: 600, textTransform: "none" }}
            >
              Contact
            </Button>

            <IconButton 
              onClick={() => navigate('/cart')}
              sx={{ 
                color: "#a67c52",
                ml: 1,
                "&:hover": { bgcolor: "rgba(166, 124, 82, 0.1)" }
              }}
            >
              <Badge badgeContent={totalItems} color="error" sx={{
                "& .MuiBadge-badge": {
                  backgroundColor: "#a67c52", // Custom χρώμα για να ταιριάζει με το ξύλο
                }
              }}>
                <ShoppingCartIcon fontSize="medium" />
              </Badge>
            </IconButton>
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;