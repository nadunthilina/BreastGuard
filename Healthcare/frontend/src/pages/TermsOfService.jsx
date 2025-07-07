import React from 'react';

function TermsOfService() {
  return (
    <div className="terms-of-service py-5">
      <div className="container">
        <h1 className="mb-4">Terms of Service</h1>
        <p className="mb-4">Last updated: June 15, 2023</p>
        
        <div className="card mb-4">
          <div className="card-body">
            <h2 className="mb-3">1. Introduction</h2>
            <p>
              These Terms of Service ("Terms") govern your use of the HeartCare Prediction platform 
              and service (the "Service") provided by HeartCare Prediction ("we," "our," or "us").
            </p>
            <p>
              By accessing or using our Service, you agree to be bound by these Terms. 
              If you disagree with any part of the Terms, you may not access the Service.
            </p>
          </div>
        </div>
        
        <div className="card mb-4">
          <div className="card-body">
            <h2 className="mb-3">2. Medical Disclaimer</h2>
            <p>
              <strong>IMPORTANT:</strong> HeartCare Prediction is not a substitute for professional medical advice, 
              diagnosis, or treatment. The Service provides risk assessment tools based on statistical models and 
              should be used for informational purposes only.
            </p>
            <p>
              Always seek the advice of your physician or other qualified health provider with any questions 
              you may have regarding a medical condition. Never disregard professional medical advice or delay in 
              seeking it because of something you have read on our Service.
            </p>
            <p>
              Our predictions are based on data patterns and machine learning algorithms, which have inherent 
              limitations and may not be accurate for all individuals. The Service is intended to supplement, 
              not replace, proper medical care.
            </p>
          </div>
        </div>
        
        <div className="card mb-4">
          <div className="card-body">
            <h2 className="mb-3">3. Account Registration</h2>
            <p>
              To use certain features of our Service, you may need to register for an account. You agree to provide 
              accurate, current, and complete information during the registration process and to update such information 
              to keep it accurate, current, and complete.
            </p>
            <p>
              You are responsible for safeguarding your password and for all activities that occur under your account. 
              You agree to notify us immediately of any unauthorized use of your account.
            </p>
            <p>
              We reserve the right to disable any user account if we believe you have violated any provisions of these Terms.
            </p>
          </div>
        </div>
        
        <div className="card mb-4">
          <div className="card-body">
            <h2 className="mb-3">4. User Data</h2>
            <p>
              You retain all rights to your data that you upload, submit, or otherwise transmit to our Service ("User Data"). 
              By providing User Data to us, you grant us a worldwide, non-exclusive, royalty-free license to use, copy, 
              modify, and display your User Data for the purposes of operating and improving our Service.
            </p>
            <p>
              We take reasonable measures to protect the security and privacy of your User Data in accordance with our 
              Privacy Policy. However, you acknowledge that transmission of information over the Internet is not completely 
              secure, and we cannot guarantee the security of your User Data.
            </p>
          </div>
        </div>
        
        <div className="card mb-4">
          <div className="card-body">
            <h2 className="mb-3">5. Acceptable Use</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Use the Service for any illegal purpose or in violation of any local, state, national, or international law</li>
              <li>Submit false or misleading information</li>
              <li>Attempt to gain unauthorized access to systems or networks connected to the Service</li>
              <li>Interfere with or disrupt the integrity or performance of the Service</li>
              <li>Attempt to reverse engineer, decompile, or otherwise try to extract the source code of the Service</li>
              <li>Use the Service to collect or harvest any personally identifiable information</li>
              <li>Use the Service for any harmful or malicious purpose</li>
            </ul>
          </div>
        </div>
        
        <div className="card mb-4">
          <div className="card-body">
            <h2 className="mb-3">6. Intellectual Property</h2>
            <p>
              The Service and its original content, features, and functionality are and will remain the exclusive property of 
              HeartCare Prediction and its licensors. The Service is protected by copyright, trademark, and other laws of both 
              the United States and foreign countries.
            </p>
            <p>
              Our trademarks and trade dress may not be used in connection with any product or service without the prior written 
              consent of HeartCare Prediction.
            </p>
          </div>
        </div>
        
        <div className="card mb-4">
          <div className="card-body">
            <h2 className="mb-3">7. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, in no event shall HeartCare Prediction, its directors, employees, partners, 
              agents, suppliers, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, 
              including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
            </p>
            <ul>
              <li>Your access to or use of or inability to access or use the Service</li>
              <li>Any conduct or content of any third party on the Service</li>
              <li>Any content obtained from the Service</li>
              <li>Unauthorized access, use, or alteration of your transmissions or content</li>
            </ul>
          </div>
        </div>
        
        <div className="card mb-4">
          <div className="card-body">
            <h2 className="mb-3">8. Changes to Terms</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, 
              we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will 
              be determined at our sole discretion.
            </p>
            <p>
              By continuing to access or use our Service after any revisions become effective, you agree to be bound by the revised terms. 
              If you do not agree to the new terms, you are no longer authorized to use the Service.
            </p>
          </div>
        </div>
        
        <div className="card">
          <div className="card-body">
            <h2 className="mb-3">9. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
            </p>
            <address>
              <p>HeartCare Prediction</p>
              <p>123 Healthcare Avenue, Medical District</p>
              <p>New York, NY 10001</p>
              <p>Email: legal@heartcare-prediction.com</p>
              <p>Phone: +1 (234) 567-8900</p>
            </address>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TermsOfService;
