import React from 'react';

function About() {
  return (
    <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{ color: 'var(--header-color)', textAlign: 'center', marginBottom: '2rem' }}>
        About Breast Guard
      </h1>
      
      <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '2rem', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}>
        <h2 style={{ color: 'var(--primary-color)' }}>Our Mission</h2>
        <p>
          Breast Guard is designed to assist healthcare professionals in the early detection and 
          diagnosis of breast cancer. Our mission is to improve breast cancer outcomes through advanced technology 
          that enables faster, more accurate diagnostic assessments.
        </p>
        
        <h2 style={{ color: 'var(--primary-color)', marginTop: '2rem' }}>How It Works</h2>
        <p>
          Our system uses deep learning algorithms to analyze 3D transrectal ultrasound images of breast tissues. By 
          integrating Convolutional Neural Networks (CNN) and Long Short-Term Memory (LSTM) networks, our technology
          can extract features and detect patterns that might be missed by the human eye.
        </p>
        
        <p>
          Additional techniques employed by our system include:
        </p>
        <ul style={{ marginLeft: '2rem', marginTop: '1rem' }}>
          <li>Multi-atlas registration for alignment and standardization of ultrasound images</li>
          <li>Super pixel segmentation for improved delineation of tumor regions</li>
          <li>Statistical texture priors to enhance identification of tumor textures</li>
          <li>Gabor filters to enhance image features and improve detection accuracy</li>
        </ul>
        
        <h2 style={{ color: 'var(--primary-color)', marginTop: '2rem' }}>Our Team</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', marginTop: '1rem' }}>
          <div style={{ flex: '1', minWidth: '200px' }}>
            <div style={{ 
              width: '100px', 
              height: '100px', 
              borderRadius: '50%', 
              backgroundColor: 'var(--light-pink)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              fontSize: '2rem'
            }}>👨‍💻</div>
            <h3>WMN.Thilina</h3>
            <p>Team Leader</p>
          </div>
          <div style={{ flex: '1', minWidth: '200px' }}>
            <div style={{ 
              width: '100px', 
              height: '100px', 
              borderRadius: '50%', 
              backgroundColor: 'var(--light-pink)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              fontSize: '2rem'
            }}>👨‍💻</div>
            <h3>MAR.Kaveesha</h3>
            <p>Team Member</p>
          </div>
          <div style={{ flex: '1', minWidth: '200px' }}>
            <div style={{ 
              width: '100px', 
              height: '100px', 
              borderRadius: '50%', 
              backgroundColor: 'var(--light-pink)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              fontSize: '2rem'
            }}>👨‍💻</div>
            <h3>DMP.Indunil</h3>
            <p>Team Member</p>
          </div>
          <div style={{ flex: '1', minWidth: '200px' }}>
            <div style={{ 
              width: '100px', 
              height: '100px', 
              borderRadius: '50%', 
              backgroundColor: 'var(--light-pink)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              fontSize: '2rem'
            }}>👨‍💻</div>
            <h3>PK.Wellappili</h3>
            <p>Team Member</p>
          </div>
        </div>
        
        
        <h2 style={{ color: 'var(--primary-color)', marginTop: '2rem' }}>Disclaimer</h2>
        <p>
          Breast Guard is a diagnostic aid tool and should be used in conjunction with other 
          clinical assessments. Final diagnostic decisions should always be made by qualified healthcare professionals 
          based on multiple factors beyond the analysis provided by this system.
        </p>
      </div>
    </div>
  );
}

export default About;
