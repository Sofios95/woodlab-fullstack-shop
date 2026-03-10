import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  Container, Typography, Box, Paper, Tab, Tabs, TextField, 
  Button, Grid, Card, Divider, Chip, IconButton 
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import InventoryIcon from '@mui/icons-material/Inventory';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

function Admin() {
  const [activeTab, setActiveTab] = useState(0); // MUI Tabs use index 0, 1
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
    } catch (err) { console.error("Error:", err); }
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get("https://woodlab-fullstack-shop.onrender.com/api/orders/admin");
      setOrders(response.data);
    } catch (err) { console.error("Error:", err); }
  };

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`https://woodlab-fullstack-shop.onrender.com/api/admin/${editingId}`, product);
      } else {
        await axios.post("https://woodlab-fullstack-shop.onrender.com/api/admin", product);
      }
      setProduct({ name: "", price: "", description: "", image_url: "", stock_quantity: "" });
      setEditingId(null);
      fetchProducts();
    } catch (err) { alert("Error saving product"); }
  };

  const handleEdit = (p) => {
    setEditingId(p.id);
    setProduct({ ...p });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const updateOrderStatus = async (id, currentStatus) => {
    const nextStatus = currentStatus === "pending" ? "completed" : "pending";
    try {
      await axios.put(`https://woodlab-fullstack-shop.onrender.com/api/orders/admin/${id}/status`, { status: nextStatus });
      fetchOrders();
    } catch (err) { alert("Error updating status"); }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Typography variant="h3" align="center" sx={{ mb: 4, fontWeight: 800, color: "primary.main" }}>
        Admin Dashboard 🪵
      </Typography>

      <Paper sx={{ mb: 4, borderRadius: 3 }}>
        <Tabs 
          value={activeTab} 
          onChange={(e, newVal) => setActiveTab(newVal)} 
          centered
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab icon={<InventoryIcon />} label="Products & Stock" />
          <Tab icon={<ReceiptLongIcon />} label="Order Management" />
        </Tabs>
      </Paper>

      {activeTab === 0 && (
        <Box className="admin-content-fade">
          <Paper sx={{ p: 4, borderRadius: 3, mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
              {editingId ? "Επεξεργασία Προϊόντος" : "Προσθήκη Νέου Προϊόντος"}
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="Όνομα" name="name" value={product.name} onChange={handleChange} required variant="outlined" />
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
                  <TextField fullWidth multiline rows={3} label="Περιγραφή" name="description" value={product.description} onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', gap: 2 }}>
                  <Button fullWidth variant="contained" type="submit" startIcon={<SaveIcon />} sx={{ bgcolor: "primary.main", py: 1.5 }}>
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

          {/* Product List */}
          <Stack spacing={2}>
            {products.map((p) => (
              <Card key={p.id} sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderLeft: "6px solid", borderColor: p.stock_quantity < 5 ? "error.main" : "success.main" }}>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{p.name}</Typography>
                  <Chip 
                    label={`${p.stock_quantity} σε απόθεμα`} 
                    size="small" 
                    color={p.stock_quantity < 5 ? "error" : "success"} 
                    variant="outlined"
                    sx={{ mt: 1 }}
                  />
                </Box>
                <Box>
                  <IconButton onClick={() => handleEdit(p)} color="primary"><EditIcon /></IconButton>
                  <IconButton onClick={() => alert("Delete logic here")} sx={{ color: "error.main" }}><DeleteIcon /></IconButton>
                </Box>
              </Card>
            ))}
          </Stack>
        </Box>
      )}

      {activeTab === 1 && (
        <Box className="admin-content-fade">
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>Πρόσφατες Πωλήσεις</Typography>
          {orders.map((o) => (
            <Card key={o.id} sx={{ p: 3, mb: 2, borderLeft: "6px solid", borderColor: o.status === "pending" ? "warning.main" : "success.main" }}>
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
                      bgcolor: o.status === "pending" ? "warning.main" : "success.main",
                      color: "white"
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

// Χρησιμοποιούμε το Stack από το MUI
import { Stack } from "@mui/material";

export default Admin;