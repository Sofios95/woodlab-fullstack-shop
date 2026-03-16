import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCart } from '../context/useCart';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { 
  Container, Typography, Box, Grid, Card, CardMedia, 
  CardContent, CardActions, Button, CircularProgress, Alert 
} from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart(); 

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await axios.get("https://woodlab-fullstack-shop.onrender.com/api/home");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Αποτυχία φόρτωσης προϊόντων. Δοκιμάστε ξανά αργότερα.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} προστέθηκε στο καλάθι! 🪵`, {
      position: "bottom-right",
      autoClose: 2000,
      theme: "dark",
    });
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', gap: 2 }}>
        <CircularProgress sx={{ color: "#a67c52" }} size={60} />
        <Typography variant="h6" sx={{ color: "#4a3728" }}>
          Loading... 🪵
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Container sx={{ py: 10 }}>
        <Alert severity="error" variant="filled" sx={{ borderRadius: 2 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Box sx={{ bgcolor: "#fdfbf9", minHeight: "100vh" }}>
      <ToastContainer />

      <Box sx={{ 
        bgcolor: "#4a3728", 
        color: "white", 
        py: { xs: 6, md: 10 }, 
        textAlign: "center",
        mb: 6,
        backgroundImage: 'linear-gradient(rgba(74, 55, 40, 0.8), rgba(74, 55, 40, 0.8)), url("https://woodlab.gr/wp-content/uploads/2022/05/WoodLab_Background.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}>
        <Typography variant="h2" sx={{ fontWeight: 800, mb: 2, fontSize: { xs: '2.5rem', md: '4rem' } }}>
          Welcome
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 300, opacity: 0.9 }}>
          Check out our new E-shop
        </Typography>
      </Box>

      <Container maxWidth="lg" sx={{ pb: 10 }}>
        <Grid container spacing={4}>
          {products.length > 0 ? (
  products.map((p) => (
    <Grid item key={p.id} xs={12} sm={6} md={4}>
      <Card 
        elevation={2}
        sx={{ 
          minHeight: '480px',      // ΤΟ ΣΤΑΝΤΑΡ ΥΨΟΣ: Για να μην είναι "νάνος" χωρίς περιγραφή
          height: '100%',          // ΤΟ ΕΛΑΣΤΙΚΟ: Επιτρέπει στην κάρτα να ανοίξει προς τα κάτω
          display: 'flex', 
          flexDirection: 'column',
          borderRadius: 4,
          transition: "transform 0.3s, box-shadow 0.3s",
          "&:hover": {
            transform: "translateY(-8px)",
            boxShadow: "0 12px 30px rgba(0,0,0,0.12)"
          }
        }}
      >
        <CardMedia
          component="img"
          image={p.image_url}
          alt={p.name}
          sx={{ 
            height: '240px',       // ΚΛΕΙΔΩΜΕΝΟ ΥΨΟΣ ΕΙΚΟΝΑΣ
            minHeight: '240px', 
            width: "100%",
            objectFit: "cover",    // Για να μην ξεχειλώνει η φωτό
            flexShrink: 0          // Απαγορεύει στην εικόνα να αλλάξει μέγεθος
          }}
        />
        <CardContent sx={{ flexGrow: 1, p: 3, display: 'flex', flexDirection: 'column' }}>
          <Typography gutterBottom variant="h5" component="h2" sx={{ fontWeight: 'bold', color: "#2c3e50" }}>
            {p.name}
          </Typography>
          
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ 
              mb: 2, 
              whiteSpace: 'pre-line',     // ΑΝΑΓΝΩΡΙΖΕΙ ΤΑ NEWLINES ΠΟΥ ΕΙΠΕΣ
              minHeight: '60px',          // Κρατάει έναν ελάχιστο χώρο για το κείμενο
              // Αν θες να "μαζεύεται" μετά από 6-7 γραμμές βάλε τα WebkitBoxOrient κλπ.
              // Αν θες να ανοίγει ΑΠΕΡΙΟΡΙΣΤΑ, άφησέ το έτσι.
            }}
          >
            {p.description}
          </Typography>

          <Typography variant="h6" sx={{ color: "#a67c52", fontWeight: 800, mt: 'auto' }}>
            {p.price}€
          </Typography>
        </CardContent>
        <CardActions sx={{ p: 2, pt: 0 }}>
          <Button 
            fullWidth 
            variant="contained" 
            startIcon={<AddShoppingCartIcon />}
            onClick={() => handleAddToCart(p)}
            sx={{ 
              bgcolor: "#4a3728", 
              py: 1.2,
              borderRadius: 2,
              "&:hover": { bgcolor: "#a67c52" }
            }}
          >
            ADD TO CART
          </Button>
        </CardActions>
      </Card>
    </Grid>
  ))
) : (
  <Grid item xs={12}>
    <Typography variant="h6" align="center">Δεν βρέθηκαν προϊόντα.</Typography>
  </Grid>
)}
        </Grid>
      </Container>
    </Box>
  );
}

export default Home;