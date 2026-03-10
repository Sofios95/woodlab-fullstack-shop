import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-container">
      <div className="footer-links">
        <a
          href="https://www.facebook.com/Woodlab.gr/?locale=el_GR"
          target="_blank"
          rel="noopener noreferrer"
        >
          Facebook
        </a>
        <br />
        <a
          href="https://www.instagram.com/woodlabgr/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagram
        </a>
        <br />
        <a href="https://woodlab.gr/" target="_blank" rel="noopener noreferrer">
          Woodlab®
        </a>
        <br />
      </div>

      <Link to="/aboutus" className="about-link">
        About us
      </Link>

      <p className="copyright">© Copyright {currentYear} | by DevSof</p>

      
      <Link to="/secret-admin-gate" className="secret-link">
        .
      </Link>
    </footer>
  );
}

export default Footer;
