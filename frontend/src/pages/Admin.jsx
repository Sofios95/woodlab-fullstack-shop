import { useState, useEffect } from "react";
import axios from "axios";

function Admin() {
  const [activeTab, setActiveTab] = useState("products");
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    image_url: "",
    stock_quantity: "",
  });

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://woodlab-fullstack-shop.onrender.com/api/home");
      setProducts(response.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        "https://woodlab-fullstack-shop.onrender.com/api/admin/orders",
      );
      setOrders(response.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleEdit = (p) => {
    setEditingId(p.id);
    setProduct({
      name: p.name,
      price: p.price,
      description: p.description,
      image_url: p.image_url,
      stock_quantity: p.stock_quantity,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Θέλεις σίγουρα να διαγράψεις αυτό το προϊόν;")) {
      try {
        await axios.delete(`https://woodlab-fullstack-shop.onrender.com/api/admin/${id}`);
        fetchProducts();
      } catch (err) {
        alert("Σφάλμα κατά τη διαγραφή του προϊόντος");
      }
    }
  };

  const handleDeleteOrder = async (id) => {
    if (window.confirm("Θέλεις σίγουρα να διαγράψεις αυτή την παραγγελία;")) {
      try {
        await axios.delete(`https://woodlab-fullstack-shop.onrender.com/api/admin/orders/${id}`);
        fetchOrders();
      } catch (err) {
        alert("Σφάλμα κατά τη διαγραφή της παραγγελίας");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(
          `https://woodlab-fullstack-shop.onrender.com/api/admin/${editingId}`,
          product,
        );
      } else {
        await axios.post("https://woodlab-fullstack-shop.onrender.com/api/admin", product);
      }
      setProduct({
        name: "",
        price: "",
        description: "",
        image_url: "",
        stock_quantity: "",
      });
      setEditingId(null);
      fetchProducts();
    } catch (err) {
      alert("Error saving product");
    }
  };

  const updateOrderStatus = async (id, currentStatus) => {
    const nextStatus = currentStatus === "pending" ? "completed" : "pending";
    try {
      await axios.put(`https://woodlab-fullstack-shop.onrender.com/api/admin/orders/${id}/status`, {
        status: nextStatus,
      });
      fetchOrders();
    } catch (err) {
      alert("Error updating status");
    }
  };

  return (
    <div className="admin-page-container">
      <h1
        style={{ textAlign: "center", color: "#2c3e50", marginBottom: "30px" }}
      >
        Woodlab Admin Dashboard 🪵
      </h1>

      <div className="admin-nav-tabs">
        <button
          className={
            activeTab === "products"
              ? "admin-tab-button active"
              : "admin-tab-button"
          }
          onClick={() => setActiveTab("products")}
        >
          📦 Products & Stock
        </button>
        <button
          className={
            activeTab === "orders"
              ? "admin-tab-button active"
              : "admin-tab-button"
          }
          onClick={() => setActiveTab("orders")}
        >
          🛒 Order Management
        </button>
      </div>

      <hr style={{ border: "0.5px solid #eee", margin: "20px 0" }} />

      {activeTab === "products" && (
        <div className="admin-content-fade">
          <form onSubmit={handleSubmit} className="admin-form">
            <h3 style={{ gridColumn: "span 2" }}>
              {editingId ? "Edit Product" : "New Product"}
            </h3>
            <input
              name="name"
              placeholder="Name"
              value={product.name}
              onChange={handleChange}
              required
            />
            <input
              name="price"
              type="number"
              step="0.01"
              placeholder="Price (€)"
              value={product.price}
              onChange={handleChange}
              required
            />
            <input
              name="stock_quantity"
              type="number"
              placeholder="Stock"
              value={product.stock_quantity}
              onChange={handleChange}
              required
            />
            <input
              name="image_url"
              placeholder="Image URL"
              value={product.image_url}
              onChange={handleChange}
            />
            <textarea
              name="description"
              placeholder="Description"
              value={product.description}
              onChange={handleChange}
            />
            <button
              type="submit"
              className="save-btn"
              style={{ gridColumn: "span 2" }}
            >
              {editingId ? "Update Product" : "Save Product"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setProduct({
                    name: "",
                    price: "",
                    description: "",
                    image_url: "",
                    stock_quantity: "",
                  });
                }}
                style={{
                  gridColumn: "span 2",
                  backgroundColor: "#95a5a6",
                  marginTop: "5px",
                }}
              >
                Cancel Edit
              </button>
            )}
          </form>

          <div className="admin-list-container" style={{ marginTop: "30px" }}>
            {products.map((p) => (
              <div
                key={p.id}
                className="admin-order-card"
                style={{
                  borderLeftColor: p.stock_quantity < 5 ? "#fa5252" : "#27ae60",
                }}
              >
                <div style={{ flex: 1 }}>
                  <span className="admin-order-id">{p.name}</span>
                  <span
                    className="stock-badge"
                    style={{
                      backgroundColor:
                        p.stock_quantity < 5 ? "#fff5f5" : "#ebfbee",
                      color: p.stock_quantity < 5 ? "#fa5252" : "#2b8a3e",
                      padding: "4px 10px",
                      borderRadius: "20px",
                      fontSize: "0.8rem",
                      marginLeft: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    {p.stock_quantity} in stock
                  </span>
                </div>
                <div
                  className="admin-actions"
                  style={{ display: "flex", gap: "10px" }}
                >
                  <button
                    className="edit-btn-small"
                    onClick={() => handleEdit(p)}
                  >
                    Edit
                  </button>
                  <button
                    className="edit-btn-small"
                    onClick={() => handleDeleteProduct(p.id)}
                    style={{ backgroundColor: "#e74c3c" }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "orders" && (
        <div className="admin-content-fade">
          <h2 style={{ color: "#2c3e50", marginBottom: "20px" }}>
            Recent Sales
          </h2>
          {orders.map((o) => (
            <div
              key={o.id}
              className="admin-order-card"
              style={{
                borderLeftColor: o.status === "pending" ? "#f39c12" : "#27ae60",
              }}
            >
              <div className="admin-order-info" style={{ flex: 1 }}>
                <div className="admin-order-id">Order #{o.id}</div>
                <div style={{ fontWeight: "bold", color: "#34495e" }}>
                  👤 Customer: {o.customer_name || "Guest User"}
                </div>
                <div
                  style={{
                    fontSize: "0.85rem",
                    color: "#7f8c8d",
                    marginTop: "5px",
                  }}
                >
                  📞 {o.customer_phone} | 📍 {o.customer_address}
                </div>
              </div>

              <div
                style={{ display: "flex", alignItems: "center", gap: "15px" }}
              >
                <div style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                  {o.total_amount}€
                </div>
                <button
                  className="edit-btn-small"
                  onClick={() => updateOrderStatus(o.id, o.status)}
                  style={{
                    backgroundColor:
                      o.status === "pending" ? "#f39c12" : "#27ae60",
                    color: "white",
                    border: "none",
                    minWidth: "120px",
                  }}
                >
                  {o.status === "pending" ? "🔔 Pending" : "✅ Completed"}
                </button>
                <button
                  className="edit-btn-small"
                  onClick={() => handleDeleteOrder(o.id)}
                  style={{
                    backgroundColor: "#e74c3c",
                    color: "white",
                    border: "none",
                  }}
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Admin;
