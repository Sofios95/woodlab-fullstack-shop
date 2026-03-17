import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  Container, Typography, Box, Paper, Tab, Tabs, TextField, 
  Button, Grid, Card, Divider, Chip, IconButton, Stack 
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import InventoryIcon from '@mui/icons-material/Inventory';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Admin() {
  const [activeTab, setActiveTab] = useState(0);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [product, setProduct] = useState({
    name: "", price: "", description: "", image_url: "", stock_quantity: "",
  });

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://woodlab-fullstack-shop.onrender.com/api/home");
      setProducts(response.data);
    } catch (err) { console.error("Error fetching products:", err); }
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get("https://woodlab-fullstack-shop.onrender.com/api/orders/admin");
      setOrders(response.data);
    } catch (err) { console.error("Error fetching orders:", err); }
  };

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`https://woodlab-fullstack-shop.onrender.com/api/admin/${editingId}`, product);
        toast.info("Το προϊόν ενημερώθηκε! 🪵");
      } else {
        await axios.post("https://woodlab-fullstack-shop.onrender.com/api/admin", product);
        toast.success("Νέο προϊόν προστέθηκε! ✨");
      }
      setProduct({ name: "", price: "", description: "", image_url: "", stock_quantity: "" });
      setEditingId(null);
      fetchProducts();
    } catch (err) { 
      toast.error("Σφάλμα κατά την αποθήκευση");
    }
  };

  const handleEdit = (p) => {
    setEditingId(p.id);
    setProduct({ ...p });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Η ΛΕΙΤΟΥΡΓΙΑ ΔΙΑΓΡΑΦΗΣ ΠΟΥ ΕΛΕΙΠΕ
  const handleDelete = async (id) => {
    if (window.confirm("Είσαι σίγουρος ότι θέλεις να διαγράψεις οριστικά αυτό το προϊόν;")) {
      try {
        await axios.delete(`https://woodlab-fullstack-shop.onrender.com/api/admin/${id}`);
        toast.warn("Το προϊόν διαγράφηκε επιτυχώς.");
        fetchProducts();
      } catch (err) {
        console.error("Delete error:", err);
        toast.error("Αποτυχία διαγραφής. Ελέγξτε το backend.");
      }
    }
  };

  const updateOrderStatus = async (id, currentStatus) => {
    const nextStatus = currentStatus === "pending" ? "completed" : "pending";
    try {
      await axios.put(`https://woodlab-fullstack-shop.onrender.com/api/orders/admin/${id}/status`, { status: nextStatus });
      fetchOrders();
      toast.success("Η κατάσταση της παραγγελίας ενημερώθηκε!");
    } catch (err) { toast.error("Σφάλμα στην ενημέρωση παραγγελίας"); }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <ToastContainer position="bottom-right" theme="dark" />
      <Typography variant="h3" align="center" sx={{ mb: 4, fontWeight: 800, color: "#4a3728" }}>
        Admin Dashboard 🪵
      </Typography>

      <Paper sx={{ mb: 4, borderRadius: 3 }}>
        <Tabs 
          value={activeTab} 
          onChange={(e, newVal) => setActiveTab(newVal)} 
          centered
          sx={{
            '& .MuiTabs-indicator': { bgcolor: '#a67c52' },
            '& .MuiTab-root': { color: '#4a3728' },
            '& .Mui-selected': { color: '#a67c52 !important' },
          }}
        >
          <Tab icon={<InventoryIcon />} label="Products & Stock" />
          <Tab icon={<ReceiptLongIcon />} label="Order Management" />
        </Tabs>
      </Paper>

      {activeTab === 0 && (
        <Box>
          <Paper sx={{ p: 4, borderRadius: 3, mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
              {editingId ? "Επεξεργασία Προϊόντος" : "Προσθήκη Νέου Προϊόντος"}
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="Όνομα" name="name" value={product.name} onChange={handleChange} required />
                </Grid>
                <Grid item xs={6} md={3}>
                  <TextField fullWidth label="Τιμή (€)" type="number" name="price" value={product.price} onChange={handleChange} required />
                </Grid>
                <Grid item xs={6} md={3}>
                  <TextField fullWidth label="Απόθεμα" type="number" name="stock_quantity" value={product.stock_quantity} onChange={handleChange} required />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="URL Εικόνας" name="image_url" value={product.image_url} onChange={handleChange} />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth multiline rows={4} label="Περιγραφή" name="description" value={product.description} onChange={handleChange} helperText="Μπορείτε να πατήσετε Enter για νέες γραμμές." />
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', gap: 2 }}>
                  <Button fullWidth variant="contained" type="submit" startIcon={<SaveIcon />} sx={{ bgcolor: "#4a3728", py: 1.5, "&:hover": { bgcolor: "#a67c52" } }}>
                    {editingId ? "Ενημέρωση" : "Αποθήκευση"}
                  </Button>
                  {editingId && (
                    <Button fullWidth variant="outlined" color="inherit" onClick={() => { setEditingId(null); setProduct({ name: "", price: "", description: "", image_url: "", stock_quantity: "" }); }}>
                      Ακύρωση
                    </Button>
                  )}
                </Grid>
              </Grid>
            </form>
          </Paper>

          <Stack spacing={2}>
            {products.map((p) => (
              <Card key={p.id} sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderLeft: "6px solid", borderColor: p.stock_quantity < 5 ? "#d32f2f" : "#2e7d32" }}>
                <Box sx={{ flexGrow: 1, mr: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{p.name}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'pre-line', fontSize: '0.85rem' }}>
                    {p.description}
                  </Typography>
                  <Chip 
                    label={`${p.stock_quantity} σε απόθεμα`} 
                    size="small" 
                    color={p.stock_quantity < 5 ? "error" : "success"} 
                    sx={{ mt: 1 }}
                  />
                </Box>
                <Box sx={{ display: 'flex' }}>
                  <IconButton onClick={() => handleEdit(p)} color="primary"><EditIcon /></IconButton>
                  <IconButton onClick={() => handleDelete(p.id)} sx={{ color: "#d32f2f" }}><DeleteIcon /></IconButton>
                </Box>
              </Card>
            ))}
          </Stack>
        </Box>
      )}

      {activeTab === 1 && (
        <Box>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>Πρόσφατες Πωλήσεις</Typography>
          {orders.map((o) => (
            <Card key={o.id} sx={{ p: 3, mb: 2, borderLeft: "6px solid", borderColor: o.status === "pending" ? "#ed6c02" : "#2e7d32" }}>
              <Grid container alignItems="center" spacing={2}>
                <Grid item xs={12} md={4}>
                  <Typography variant="h6">Order #{o.id}</Typography>
                  <Typography variant="body2" color="text.secondary">👤 {o.customer_name || "Guest"}</Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="body2">📞 {o.customer_phone}</Typography>
                  <Typography variant="body2">📍 {o.customer_address}</Typography>
                </Grid>
                <Grid item xs={12} md={4} sx={{ textAlign: { md: 'right' } }}>
                  <Typography variant="h6" sx={{ mb: 1 }}>{o.total_amount}€</Typography>
                  <Button 
                    variant="contained" 
                    size="small"
                    onClick={() => updateOrderStatus(o.id, o.status)}
                    sx={{ 
                      bgcolor: o.status === "pending" ? "#ed6c02" : "#2e7d32",
                      color: "white",
                      "&:hover": { opacity: 0.9 }
                    }}
                  >
                    {o.status === "pending" ? "🔔 Εκκρεμεί" : "✅ Ολοκληρώθηκε"}
                  </Button>
                </Grid>
              </Grid>
            </Card>
          ))}
        </Box>
      )}
    </Container>
  );
}

export default Admin;