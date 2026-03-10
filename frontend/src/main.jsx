import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom' 
import { CartProvider } from './context/CartContext.jsx'; 

// --- ΠΡΟΣΘΕΣΕ ΑΥΤΑ ΤΑ 3 ---
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme'; 
// --------------------------

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}> {/* 1. Τυλίγουμε τα πάντα με το Theme */}
      <CssBaseline />             {/* 2. Καθαρίζουμε τα default CSS */}
      <BrowserRouter>
        <CartProvider>            {/* 3. Το καλάθι μένει ως έχει */}
          <App />
        </CartProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
)