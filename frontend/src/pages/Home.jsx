import { useState, useEffect } from "react";
import axios from "axios";
import { useCart } from '../context/useCart';
import { toast, ToastContainer } from 'react-toastify'; // Προσθήκη Toast
import 'react-toastify/dist/ReactToastify.css'; // Προσθήκη CSS του Toast

function Home() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart(); 

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("https://woodlab-fullstack-shop.onrender.com/api/home");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchData();
  }, []);

  // Συνάρτηση για την εμφάνιση του notification
  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} προστέθηκε στο καλάθι! 🪵`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    });
  };

  return (
    <div className="home-main">
      {/* Το Container πρέπει να υπάρχει στη σελίδα για να φαίνονται τα μηνύματα */}
      <ToastContainer />

      <div className="home-header">
        <h1>Welcome</h1>
        <h2>Check out our new E-shop</h2>
      </div>

      <div className="product-grid">
        {products.map((p) => (
          <div key={p.id} className="product-card">
            <img src={p.image_url} alt={p.name} />

            <div className="product-info">
              <h3>{p.name}</h3>
              <p>{p.description}</p>
              <div className="price-tag">{p.price}€</div>

              {/* Εδώ καλούμε τη νέα συνάρτηση handleAddToCart */}
              <button className="about-btn" onClick={() => handleAddToCart(p)}>
                ADD TO CART
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;