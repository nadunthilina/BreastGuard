import { Link } from 'react-router-dom';

function CookieConsent({ onAccept }) {
  return (
    <div className="cookie-consent">
      <div className="cookie-text">
        <p>
          We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies. 
          Learn more in our <Link to="/privacy-policy">Privacy Policy</Link>.
        </p>
      </div>
      <div className="cookie-buttons">
        <button className="btn btn-outline btn-sm" onClick={onAccept}>Accept</button>
      </div>
    </div>
  );
}

export default CookieConsent;
