import React from "react";

function Contact() {
  return (
    <div className="contact-container">
      <div className="contact-card">
        <h1>Επικοινωνήστε μαζί μας</h1>
        <div className="underline"></div>

        <div className="contact-info">
          <div className="contact-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3146.3456!2d23.7634!3d37.9345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14a19796677f240f%3A0x67990422c54780!2sMavili%201%2C%20Ilioupoli%20163%2045!5e0!3m2!1sen!2sgr!4v1700000000000"
              width="100%"
              height="300"
              style={{ border: 0, borderRadius: "10px", marginTop: "20px" }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
          <div className="info-item">
            <span className="icon">📧</span>
            <h2>info@woodlab.gr</h2>
          </div>

          <div className="info-item">
            <span className="icon">📍</span>
            <h3>Μαβίλη 1, Ηλιούπολη, 16345</h3>
          </div>

          <div className="info-item">
            <span className="icon">📞</span>
            <div className="phones">
              <h3>6945663004 (Στέλιος)</h3>
              <h3>6946548303 (Μάριος)</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
