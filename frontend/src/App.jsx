import React from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from "@mui/material";
import theme from "./theme"; // Το αρχείο που φτιάξαμε

// Components & Pages
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Aboutus from "./pages/Aboutus";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import CheckoutPage from "./components/CheckoutPage";
import OrderSuccess from "./components/OrderSuccess";

// CSS
import "./index.css";

function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* Το CssBaseline διορθώνει τα default styles του browser για να φαίνονται όλα ομοιόμορφα */}
      <CssBaseline /> 
      
      {/* Το κύριο container που κρατάει το Footer πάντα κάτω */}
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          minHeight: '100vh' 
        }}
      >
        <Header />

        {/* Η main περιοχή παίρνει όλο τον διαθέσιμο χώρο (flexGrow: 1) */}
        <Box 
          component="main" 
          sx={{ flexGrow: 1 }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/secret-admin-gate" element={<Admin />} />
            <Route path="/aboutus" element={<Aboutus />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-success" element={<OrderSuccess />} />
          </Routes>
        </Box>

        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App;