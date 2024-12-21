import React from "react";
import { FaGithub, FaBehance, FaLinkedin } from "react-icons/fa"; // React-Icons
import logo from "../../../public/anant infinity logomark.png";
import packageInfo from "../../../package.json"; // Adjust path if needed
import "./Footer.css"; // Import the CSS file

const Footer = () => {
    return (
      <footer className="footer">
        <div className="footer-container">
          {/* Branding on the Left */}
          <div className="footer-branding">
            <img src={logo} alt="MovieChowk Logo" className="footer-logo" />
            <div>
              <h2 className="footer-title">MovieChowk</h2>
              <p className="footer-text">
                Built by <span className="footer-highlight">Anant Katyayn</span>
              </p>
            </div>
          </div>
  
          {/* Version in the Center */}
          <div className="footer-version">
            v<span className="footer-version-number">{packageInfo.version}</span>
          </div>
  
          {/* Social Links on the Right */}
          <div className="footer-socials">
            <a
              href="https://github.com/anantkatyayn"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-icon"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.behance.net/anantkatyayn"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-icon"
            >
              <FaBehance />
            </a>
            <a
              href="https://www.linkedin.com/in/anantkatyayn/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-icon"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} MovieChowk. All Rights Reserved.</p>
        </div>
      </footer>
    );
  };
  
  export default Footer;