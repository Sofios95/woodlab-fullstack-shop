import { useState, useEffect } from "react";
import axios from "axios";
import { useCart } from '../context/useCart';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Home.css';


function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Loader State
  const [error, setError] = useState(null);    // Error State
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
        setLoading(false); // Σταματάει ο loader ό,τι και να γίνει
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

  // 1. Εμφάνιση Loader όσο φορτώνει
  if (loading) {
    return (
      <div className="loader-container">
        <div className="spinner"></div> 
        <p>Φορτώνουμε τα ξύλινα αριστουργήματα... 🪵</p>
      </div>
    );
  }

  // 2. Εμφάνιση Error αν κάτι πάει στραβά
  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="home-main">
      <ToastContainer />

      <div className="home-header">
        <h1>Welcome</h1>
        <h2>Check out our new E-shop</h2>
      </div>

      <div className="product-grid">
        {products.length > 0 ? (
          products.map((p) => (
            <div key={p.id} className="product-card">
              <img src={p.image_url} alt={p.name} />
              <div className="product-info">
                <h3>{p.name}</h3>
                <p>{p.description}</p>
                <div className="price-tag">{p.price}€</div>
                <button className="about-btn" onClick={() => handleAddToCart(p)}>
                  ADD TO CART
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Δεν βρέθηκαν προϊόντα.</p>
        )}
      </div>
    </div>
  );
}

export default Home;