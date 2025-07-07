import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <h1 className="hero-title">Advanced Heart Disease Prediction</h1>
          <p className="hero-subtitle">
            Using machine learning to help identify your risk factors early. Our AI-powered system analyzes your health data 
            to provide accurate predictions and personalized recommendations.
          </p>
          <div className="hero-buttons">
            <Link to="/signup" className="btn btn-primary btn-lg">Get Started</Link>
            <Link to="/about" className="btn btn-outline btn-lg">Learn More</Link>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2 className="features-title">Why Choose Our Platform?</h2>
          <div className="row">
            <div className="col">
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-heartbeat"></i>
                </div>
                <h3 className="feature-title">Advanced Prediction</h3>
                <p className="feature-text">
                  Our algorithm uses 13 key health indicators to provide an accurate assessment of your heart disease risk.
                </p>
              </div>
            </div>
            <div className="col">
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-shield-alt"></i>
                </div>
                <h3 className="feature-title">Data Security</h3>
                <p className="feature-text">
                  Your health data is encrypted and protected with industry-leading security practices.
                </p>
              </div>
            </div>
            <div className="col">
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-user-md"></i>
                </div>
                <h3 className="feature-title">Medical Expertise</h3>
                <p className="feature-text">
                  Developed in collaboration with cardiologists to ensure medical accuracy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials">
        <div className="container">
          <h2 className="testimonials-title">What Our Users Say</h2>
          <div className="row">
            <div className="col">
              <div className="testimonial-card">
                <p className="testimonial-quote">
                  "The HeartCare Prediction system helped me identify my risk factors early. I was able to make lifestyle changes 
                  that improved my heart health dramatically."
                </p>
                <div className="testimonial-author">
                  <img src="/testimonial-1.jpg" alt="John D." className="testimonial-avatar" />
                  <div>
                    <p className="testimonial-name">John D.</p>
                    <p className="testimonial-role">Patient</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="testimonial-card">
                <p className="testimonial-quote">
                  "As a cardiologist, I recommend this tool to my patients. It helps them understand their risk factors and 
                  encourages preventive care."
                </p>
                <div className="testimonial-author">
                  <img src="/testimonial-2.jpg" alt="Dr. Sarah Johnson" className="testimonial-avatar" />
                  <div>
                    <p className="testimonial-name">Dr. Sarah Johnson</p>
                    <p className="testimonial-role">Cardiologist</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="testimonial-card">
                <p className="testimonial-quote">
                  "The interface is user-friendly and the predictions are backed by solid data. This has become an essential 
                  tool in our preventive healthcare program."
                </p>
                <div className="testimonial-author">
                  <img src="/testimonial-3.jpg" alt="Mark Wilson" className="testimonial-avatar" />
                  <div>
                    <p className="testimonial-name">Mark Wilson</p>
                    <p className="testimonial-role">Healthcare Administrator</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <h2 className="cta-title">Ready to take control of your heart health?</h2>
          <p className="cta-text">
            Sign up today and get a comprehensive analysis of your heart disease risk factors. Early detection saves lives.
          </p>
          <Link to="/signup" className="btn btn-primary btn-lg">Create Your Free Account</Link>
        </div>
      </section>
    </>
  );
}

export default Home;
