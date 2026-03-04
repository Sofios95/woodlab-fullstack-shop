import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <div className="footer-container">
      <div className="footer-links">
        <a href="https://www.facebook.com/Woodlab.gr/?locale=el_GR">Facebook</a>
        <br />
        <a href="https://www.instagram.com/woodlabgr/">Instagram</a>
        <br />
        <a href="https://woodlab.gr/">Woodlab®</a>
      </div>
      <Link to="/aboutus">About us</Link>
      <p className="copyright">© Copyright {currentYear} | by DevSof</p>
      <Link to="/secret-admin-gate" style={{ color: 'transparent' }}>.</Link>
    </div>
    
  );
}
export default Footer;
