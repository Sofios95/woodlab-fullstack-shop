import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCart } from '../context/useCart';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { 
  Container, Typography, Box, Card, CardMedia, 
  CardContent, CardActions, Button, CircularProgress, Alert 
} from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
}

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const { addToCart } = useCart(); 

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await axios.get<Product[]>("https://woodlab-fullstack-shop.onrender.com/api/home");
        setProducts(response.data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Αποτυχία φόρτωσης προϊόντων.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast.success(`${product.name} προστέθηκε στο καλάθι! 🪵`);
  };

  if (loading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
      <CircularProgress sx={{ color: "#a67c52" }} />
    </Box>
  );

  return (
    <Box sx={{ bgcolor: "#fdfbf9", minHeight: "100vh" }}>
      <ToastContainer position="bottom-right" theme="dark" />

      
      <Box sx={{ 
        bgcolor: "#4a3728", color: "white", py: 8, textAlign: "center", mb: 6,
        backgroundImage: 'linear-gradient(rgba(74, 55, 40, 0.8), rgba(74, 55, 40, 0.8)), url("https://woodlab.gr/wp-content/uploads/2022/05/WoodLab_Background.jpg")',
        backgroundSize: "cover", backgroundPosition: "center"
      }}>
        <Typography variant="h2" sx={{ fontWeight: 800 }}>Welcome</Typography>
        <Typography variant="h5">Check out our new E-shop</Typography>
      </Box>

      <Container maxWidth="lg" sx={{ pb: 10 }}>
        
        <Box sx={{ 
          display: 'grid', 
          gap: 4, 
          gridTemplateColumns: { 
            xs: '1fr', 
            sm: 'repeat(2, 1fr)', 
            md: 'repeat(3, 1fr)' 
          } 
        }}>
          {products.map((p) => (
            <Card key={p.id} sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 4 }}>
              <CardMedia component="img" height="240" image={p.image_url} alt={p.name} />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{p.name}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>{p.description}</Typography>
                <Typography variant="h6" sx={{ color: "#a67c52", fontWeight: 800 }}>{p.price}€</Typography>
              </CardContent>
              <CardActions sx={{ p: 2 }}>
                <Button 
                  fullWidth variant="contained" 
                  startIcon={<AddShoppingCartIcon />}
                  onClick={() => handleAddToCart(p)}
                  sx={{ bgcolor: "#4a3728", "&:hover": { bgcolor: "#a67c52" } }}
                >
                  ADD TO CART
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

export default Home;