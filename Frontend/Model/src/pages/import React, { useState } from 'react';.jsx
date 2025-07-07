import React, { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState({ 
    type: '', 
    message: '' 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus({ type: 'success', message: 'Your message has been sent. We will contact you soon!' });
    // In a real application, you would send this data to your backend
    console.log('Form submitted:', formData);
    
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="contact-section">
      <div className="container">
        <div className="contact-header mb-5">
          <h1 className="text-center">Contact Us</h1>
          <p className="text-center">
            Have questions about our heart disease prediction system? 
            We're here to help. Reach out to our team using the form below.
          </p>
        </div>

        <div className="row">
          <div className="col">
            <div className="contact-info mb-5">
              <div className="contact-item">
                <div className="contact-icon">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div className="contact-text">
                  <h4>Our Location</h4>
                  <p>123 Healthcare Avenue, Medical District<br />New York, NY 10001</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <i className="fas fa-envelope"></i>
                </div>
                <div className="contact-text">
                  <h4>Email Us</h4>
                  <p>info@heartcare-prediction.com<br />support@heartcare-prediction.com</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <i className="fas fa-phone-alt"></i>
                </div>
                <div className="contact-text">
                  <h4>Call Us</h4>
                  <p>+1 (234) 567-8900<br />+1 (234) 567-8901</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="contact-form card">
              <div className="card-body">
                <h3 className="mb-4">Send Us a Message</h3>
                
                {status.message && (
                  <div className={`alert ${status.type === 'success' ? 'alert-success' : 'alert-danger'}`}>
                    {status.message}
                  </div>
                )}
                
                <form onSubmit={handleSubmit}>
                  <div className="form-group mb-3">
                    <label className="form-label">Your Name</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group mb-3">
                    <label className="form-label">Your Email</label>
                    <input 
                      type="email" 
                      className="form-control" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group mb-3">
                    <label className="form-label">Subject</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group mb-4">
                    <label className="form-label">Your Message</label>
                    <textarea 
                      className="form-control" 
                      rows="5" 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                  
                  <button type="submit" className="btn btn-primary">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="map-container mt-5">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d48371.66637222668!2d-74.03697090277576!3d40.71277565523031!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25903e7f4d387%3A0x8946df645a82da5c!2sManhattan%2C%20New%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1659887711510!5m2!1sen!2s" 
            width="100%" 
            height="450" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Office Location"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default Contact;
