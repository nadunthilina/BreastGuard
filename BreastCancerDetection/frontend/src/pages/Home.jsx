import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <section className="hero-section">
        <h1 className="hero-title">Breast Cancer Detection System</h1>
        <p className="hero-subtitle">
          Advanced deep learning for early and accurate detection of breast cancer.
          Our system analyzes 3D transrectal ultrasound images with CNN-LSTM technology.
        </p>
        <Link to="/signup">
          <button style={{ padding: '12px 24px', fontSize: '1.1rem' }}>
            Get Started
          </button>
        </Link>
      </section>
      
      <div className="info-cards" style={{ padding: '0 2rem' }}>
        <div className="info-card">
          <h3 className="info-card-title">Early Detection</h3>
          <p>Early detection of breast cancer significantly increases treatment success rates. Our system provides quick analysis of ultrasound images to assist in early diagnosis.</p>
        </div>
        
        <div className="info-card">
          <h3 className="info-card-title">Advanced Analysis</h3>
          <p>Using CNN-LSTM integration for feature extraction and detection, our system captures intricate patterns in breast ultrasound images to identify malignant patterns.</p>
        </div>
        
        <div className="info-card">
          <h3 className="info-card-title">For Healthcare Professionals</h3>
          <p>Designed for radiologists, oncologists, and other healthcare professionals, our system serves as a supporting tool for diagnostic decisions.</p>
        </div>
      </div>
      
      <section style={{ padding: '3rem 2rem', textAlign: 'center', backgroundColor: 'var(--background-light)' }}>
        <h2>How It Works</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap', marginTop: '2rem' }}>
          <div style={{ flex: '1', minWidth: '250px', maxWidth: '300px' }}>
            <div style={{ backgroundColor: 'var(--primary-color)', color: 'white', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto', fontWeight: 'bold', fontSize: '1.5rem' }}>1</div>
            <h3>Image Acquisition</h3>
            <p>Upload breast ultrasound images to the system</p>
          </div>
          <div style={{ flex: '1', minWidth: '250px', maxWidth: '300px' }}>
            <div style={{ backgroundColor: 'var(--primary-color)', color: 'white', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto', fontWeight: 'bold', fontSize: '1.5rem' }}>2</div>
            <h3>Deep Learning Analysis</h3>
            <p>CNN-LSTM processes image features using our trained model</p>
          </div>
          <div style={{ flex: '1', minWidth: '250px', maxWidth: '300px' }}>
            <div style={{ backgroundColor: 'var(--primary-color)', color: 'white', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto', fontWeight: 'bold', fontSize: '1.5rem' }}>3</div>
            <h3>Results</h3>
            <p>Receive detailed analysis with detection results and confidence levels</p>
          </div>
        </div>
      </section>
      
      <section style={{ padding: '3rem 2rem', textAlign: 'center' }}>
        <h2>Why Choose Breast Guard</h2>
        <div style={{ maxWidth: '800px', margin: '0 auto', marginTop: '1rem' }}>
          <p>Our system combines the latest in deep learning technology with medical expertise to provide accurate and reliable breast cancer detection. The integration of CNN-LSTM models allows for better feature extraction and pattern recognition in ultrasound images.</p>
          <div style={{ marginTop: '2rem' }}>
            <Link to="/about">
              <button>Learn More About Our Technology</button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
