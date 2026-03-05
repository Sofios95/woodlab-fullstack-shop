import { useState, useEffect } from "react";
import axios from "axios";
import { useCart } from '../context/useCart';

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

  return (
    <div className="home-main">
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

              <button className="about-btn" onClick={() => addToCart(p)}>
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