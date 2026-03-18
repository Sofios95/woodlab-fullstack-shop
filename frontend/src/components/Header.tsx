import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/useCart';
import { 
  AppBar, Toolbar, Box, Badge, IconButton, Button, Container 
} from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function Header() {
  // Χρησιμοποιούμε το hook κανονικά - το safety check γίνεται εντός του hook συνήθως
  const { cartItems } = useCart();
  const navigate = useNavigate();

  // Υπολογισμός συνολικών αντικειμένων με έλεγχο αν το cartItems υπάρχει
  const totalItems = (cartItems || []).reduce((total, item) => total + (item.quantity || 0), 0);

  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        bgcolor: "#ffffff", 
        color: "#4a3728", 
        boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
        borderBottom: "3px solid #a67c52",
        zIndex: 1100 // Σιγουρευόμαστε ότι είναι πάνω από όλα
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: "space-between", py: 0.5 }}>
          
          {/* Logo - Woodlab Branding */}
          <Box 
            component={Link} 
            to="/" 
            sx={{ 
              display: "flex", 
              alignItems: "center", 
              textDecoration: "none",
              transition: "transform 0.2s",
              "&:hover": { transform: "scale(1.02)" }
            }}
          >
            <img 
              src="https://woodlab.gr/wp-content/uploads/2022/06/circle-and-logo.png" 
              alt="Woodlab Logo" 
              style={{ height: "65px", width: "auto" }} 
            />
          </Box>

          {/* Navigation & Cart */}
          <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 0.5, md: 2 } }}>
            <Button 
              component={Link} 
              to="/" 
              sx={{ 
                color: "#4a3728", 
                fontWeight: 700, 
                textTransform: "none",
                fontSize: { xs: "0.85rem", md: "1rem" } 
              }}
            >
              Home
            </Button>
            <Button 
              component={Link} 
              to="/aboutus" 
              sx={{ 
                color: "#4a3728", 
                fontWeight: 700, 
                textTransform: "none",
                fontSize: { xs: "0.85rem", md: "1rem" }
              }}
            >
              About
            </Button>
            <Button 
              component={Link} 
              to="/contact" 
              sx={{ 
                color: "#4a3728", 
                fontWeight: 700, 
                textTransform: "none",
                fontSize: { xs: "0.85rem", md: "1rem" }
              }}
            >
              Contact
            </Button>

            <IconButton 
              onClick={() => navigate('/cart')}
              sx={{ 
                color: "#a67c52",
                ml: { xs: 0.5, md: 1 },
                "&:hover": { bgcolor: "rgba(166, 124, 82, 0.1)" }
              }}
            >
              <Badge 
                badgeContent={totalItems} 
                sx={{
                  "& .MuiBadge-badge": {
                    backgroundColor: "#a67c52", 
                    color: "white",
                    fontWeight: "bold"
                  }
                }}
              >
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