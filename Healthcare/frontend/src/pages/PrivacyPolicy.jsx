import React from 'react';

function PrivacyPolicy() {
  return (
    <div className="privacy-policy py-5">
      <div className="container">
        <h1 className="mb-4">Privacy Policy</h1>
        <p className="mb-4">Last updated: June 15, 2023</p>
        
        <div className="card mb-4">
          <div className="card-body">
            <h2 className="mb-3">Introduction</h2>
            <p>
              HeartCare Prediction ("we," "our," or "us") respects your privacy and is committed to protecting your personal information. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our heart disease prediction service.
            </p>
            <p>
              Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access the service.
            </p>
          </div>
        </div>
        
        <div className="card mb-4">
          <div className="card-body">
            <h2 className="mb-3">Information We Collect</h2>
            <h4>Personal Information</h4>
            <p>We may collect personal information that you voluntarily provide to us when you:</p>
            <ul>
              <li>Create an account</li>
              <li>Fill out health assessment forms</li>
              <li>Contact our customer support</li>
              <li>Participate in surveys or promotions</li>
            </ul>
            <p>This information may include:</p>
            <ul>
              <li>Name, email address, and demographic information</li>
              <li>Medical history and health data</li>
              <li>Payment information for premium services</li>
            </ul>
            
            <h4 className="mt-4">Health Data</h4>
            <p>
              To provide our heart disease prediction service, we collect specific health-related data including:
            </p>
            <ul>
              <li>Age, sex, and other demographic information</li>
              <li>Chest pain characteristics</li>
              <li>Blood pressure readings</li>
              <li>Cholesterol levels</li>
              <li>Blood sugar levels</li>
              <li>Electrocardiographic results</li>
              <li>Heart rate data</li>
              <li>Exercise information</li>
              <li>Other cardiovascular health metrics</li>
            </ul>
            
            <h4 className="mt-4">Automatically Collected Information</h4>
            <p>
              When you access our service, we may automatically collect certain information about your device, including:
            </p>
            <ul>
              <li>IP address</li>
              <li>Browser type</li>
              <li>Operating system</li>
              <li>Access times and dates</li>
              <li>Referring website addresses</li>
            </ul>
          </div>
        </div>
        
        <div className="card mb-4">
          <div className="card-body">
            <h2 className="mb-3">How We Use Your Information</h2>
            <p>We may use the information we collect for various purposes, including to:</p>
            <ul>
              <li>Provide, maintain, and improve our services</li>
              <li>Generate heart disease risk predictions and health recommendations</li>
              <li>Process payments and provide requested services</li>
              <li>Communicate with you about updates, support, and promotional offers</li>
              <li>Monitor and analyze usage patterns and trends</li>
              <li>Enhance the security of our services</li>
              <li>Comply with legal obligations</li>
            </ul>
          </div>
        </div>
        
        <div className="card mb-4">
          <div className="card-body">
            <h2 className="mb-3">Data Security</h2>
            <p>
              We use administrative, technical, and physical security measures to protect your personal information. 
              While we strive to protect your information, no method of transmission over the Internet or electronic storage is 100% secure, 
              and we cannot guarantee absolute security.
            </p>
          </div>
        </div>
        
        <div className="card mb-4">
          <div className="card-body">
            <h2 className="mb-3">Third-Party Disclosure</h2>
            <p>We may share your information with:</p>
            <ul>
              <li>Healthcare partners who assist in analyzing your data and providing recommendations</li>
              <li>Service providers who perform services on our behalf</li>
              <li>Legal authorities when required by law or to protect our rights</li>
              <li>Business partners in the event of a merger, acquisition, or sale of assets</li>
            </ul>
            <p>
              We do not sell your personal information to third parties for marketing purposes.
            </p>
          </div>
        </div>
        
        <div className="card mb-4">
          <div className="card-body">
            <h2 className="mb-3">Your Rights</h2>
            <p>Depending on your location, you may have rights regarding your personal information, including:</p>
            <ul>
              <li>Access to your personal data</li>
              <li>Correction of inaccurate information</li>
              <li>Deletion of your personal data</li>
              <li>Restriction of processing</li>
              <li>Data portability</li>
              <li>Objection to processing</li>
            </ul>
            <p>
              To exercise these rights, please contact us using the information provided at the end of this policy.
            </p>
          </div>
        </div>
        
        <div className="card mb-4">
          <div className="card-body">
            <h2 className="mb-3">Children's Privacy</h2>
            <p>
              Our service is not intended for individuals under the age of 18. We do not knowingly collect personal information from children.
              If we learn that we have collected personal information from a child under 18, we will promptly delete that information.
            </p>
          </div>
        </div>
        
        <div className="card mb-4">
          <div className="card-body">
            <h2 className="mb-3">Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
              You are advised to review this Privacy Policy periodically for any changes.
            </p>
          </div>
        </div>
        
        <div className="card">
          <div className="card-body">
            <h2 className="mb-3">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <address>
              <p>HeartCare Prediction</p>
              <p>123 Healthcare Avenue, Medical District</p>
              <p>New York, NY 10001</p>
              <p>Email: privacy@heartcare-prediction.com</p>
              <p>Phone: +1 (234) 567-8900</p>
            </address>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
