import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="not-found-page py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 text-center">
            <div className="error-content">
              <h1 className="display-1 mb-4">404</h1>
              <h2 className="mb-4">Page Not Found</h2>
              <p className="lead mb-5">
                The page you are looking for might have been removed, had its name changed,
                or is temporarily unavailable.
              </p>
              <div className="error-actions">
                <Link to="/" className="btn btn-primary btn-lg me-3">
                  <i className="fas fa-home me-2"></i>Go to Homepage
                </Link>
                <Link to="/contact" className="btn btn-outline-secondary btn-lg">
                  <i className="fas fa-envelope me-2"></i>Contact Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
