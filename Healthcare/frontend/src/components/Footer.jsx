import { Link } from 'react-router-dom';

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h5>HeartCare Prediction</h5>
            <p>Advanced heart disease prediction using machine learning to help patients identify risk factors early.</p>
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
          
          <div className="footer-section">
            <h5>Quick Links</h5>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/signup">Sign Up</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h5>Important Information</h5>
            <ul className="footer-links">
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service">Terms of Service</Link></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Healthcare Resources</a></li>
              <li><a href="#">Heart Health Blog</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h5>Contact Us</h5>
            <address>
              <p>123 Medical Center Drive<br />Health District, NY 10001</p>
              <p>Email: <a href="mailto:info@heartcare.com">info@heartcare.com</a></p>
              <p>Phone: <a href="tel:+1234567890">+1 (234) 567-890</a></p>
            </address>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {currentYear} HeartCare Prediction System. All Rights Reserved.</p>
          <p>Medical Disclaimer: This application provides predictions based on data patterns and should not replace professional medical advice.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
