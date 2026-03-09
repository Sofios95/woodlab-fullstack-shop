import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Aboutus from "./pages/Aboutus";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import CheckoutPage from "./components/CheckoutPage";
import OrderSuccess from "./components/OrderSuccess";
import "./index.css";

function App() {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/secret-admin-gate" element={<Admin />} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-success" element={<OrderSuccess />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
