import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-section">
          <h3>Breast Guard</h3>
          <p>Advanced breast cancer detection using deep learning on ultrasound images.</p>
        </div>
        
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/resources">Resources</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Resources</h3>
          <ul className="footer-links">
            <li><a href="https://www.breastcancer.org/" target="_blank" rel="noopener noreferrer">BreastCancer.org</a></li>
            <li><a href="https://www.nationalbreastcancer.org/" target="_blank" rel="noopener noreferrer">National Breast Cancer Foundation</a></li>
            <li><a href="https://www.cancer.gov/types/breast" target="_blank" rel="noopener noreferrer">National Cancer Institute</a></li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom container">
        <p>&copy; {new Date().getFullYear()} Breast Guard by Team Yunera. All rights reserved.</p>
        <p>
          <a href="/privacy-policy">Privacy Policy</a> | 
          <a href="/terms-of-service">Terms of Service</a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
