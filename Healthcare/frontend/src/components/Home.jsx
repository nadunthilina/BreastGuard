import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <section className="hero-section">
        <h1 className="hero-title">Breast Cancer Detection System</h1>
        <p className="hero-subtitle">
          Advanced machine learning for early and accurate detection of breast cancer.
          Our system analyzes cell nuclei features from fine needle aspirations.
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
          <p>Early detection of breast cancer significantly increases treatment success rates. Our system provides quick analysis of cell samples to assist in early diagnosis.</p>
        </div>
        
        <div className="info-card">
          <h3 className="info-card-title">Advanced Analysis</h3>
          <p>Using machine learning algorithms trained on the Wisconsin Breast Cancer Diagnostic dataset, our system analyzes multiple features of cell nuclei to identify malignant patterns.</p>
        </div>
        
        <div className="info-card">
          <h3 className="info-card-title">For Healthcare Professionals</h3>
          <p>Designed for pathologists, oncologists, and other healthcare professionals, our system serves as a supporting tool for diagnostic decisions.</p>
        </div>
      </div>
      
      <section style={{ padding: '3rem 2rem', textAlign: 'center', backgroundColor: 'var(--background-light)' }}>
        <h2>How It Works</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap', marginTop: '2rem' }}>
          <div style={{ flex: '1', minWidth: '250px', maxWidth: '300px' }}>
            <div style={{ backgroundColor: 'var(--primary-color)', color: 'white', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto', fontWeight: 'bold', fontSize: '1.5rem' }}>1</div>
            <h3>Input Data</h3>
            <p>Enter cell nuclei measurements from breast mass FNA samples</p>
          </div>
          <div style={{ flex: '1', minWidth: '250px', maxWidth: '300px' }}>
            <div style={{ backgroundColor: 'var(--primary-color)', color: 'white', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto', fontWeight: 'bold', fontSize: '1.5rem' }}>2</div>
            <h3>Analysis</h3>
            <p>Our algorithm analyzes the features to identify patterns</p>
          </div>
          <div style={{ flex: '1', minWidth: '250px', maxWidth: '300px' }}>
            <div style={{ backgroundColor: 'var(--primary-color)', color: 'white', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto', fontWeight: 'bold', fontSize: '1.5rem' }}>3</div>
            <h3>Results</h3>
            <p>Receive a prediction of benign or malignant classification</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
