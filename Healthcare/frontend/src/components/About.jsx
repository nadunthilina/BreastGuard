function About() {
  return (
    <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{ color: 'var(--header-color)', textAlign: 'center', marginBottom: '2rem' }}>
        About the Breast Cancer Detection System
      </h1>
      
      <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '2rem', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}>
        <h2 style={{ color: 'var(--primary-color)' }}>Our Mission</h2>
        <p>
          The Breast Cancer Detection System is designed to assist healthcare professionals in the early detection and 
          diagnosis of breast cancer. Our mission is to improve breast cancer outcomes through advanced technology 
          that enables faster, more accurate diagnostic assessments.
        </p>
        
        <h2 style={{ color: 'var(--primary-color)', marginTop: '2rem' }}>How It Works</h2>
        <p>
          Our system uses machine learning algorithms to analyze cell nuclei features from fine needle aspiration (FNA) 
          biopsies of breast masses. By examining characteristics like radius, texture, perimeter, area, smoothness, 
          compactness, concavity, and symmetry, our system can help differentiate between benign and malignant samples.
        </p>
        
        <p>
          This technology is based on research using the Wisconsin Breast Cancer Diagnostic dataset, which has shown 
          high accuracy in classifying breast masses based on cell nuclei characteristics.
        </p>
        
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
            }}>👩‍⚕️</div>
            <h3>Dr. Sarah Johnson</h3>
            <p>Oncology Specialist</p>
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
            <h3>Dr. Michael Chen</h3>
            <p>AI Research Lead</p>
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
            }}>👩‍🔬</div>
            <h3>Dr. Emily Rodriguez</h3>
            <p>Pathology Director</p>
          </div>
        </div>
        
        <h2 style={{ color: 'var(--primary-color)', marginTop: '2rem' }}>Disclaimer</h2>
        <p>
          The Breast Cancer Detection System is a diagnostic aid tool and should be used in conjunction with other 
          clinical assessments. Final diagnostic decisions should always be made by qualified healthcare professionals 
          based on multiple factors beyond the analysis provided by this system.
        </p>
      </div>
    </div>
  );
}

export default About;
