import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-brand">
          <img src="/breast-cancer-ribbon.svg" alt="Pink Ribbon" />
          <span>Breast Guard</span>
        </Link>
        
        <div className={`navbar-links ${mobileMenuOpen ? 'navbar-mobile' : ''}`}>
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/about">About</NavLink>
          {isLoggedIn && (
            <NavLink to="/upload">Detection</NavLink>
          )}
          <NavLink to="/resources">Resources</NavLink>
          {isLoggedIn ? (
            <>
              <NavLink to="/profile">Profile</NavLink>
              <button
                onClick={handleLogout}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/signup">
                <button>Sign Up</button>
              </NavLink>
            </>
          )}
        </div>
        
        <button className="navbar-toggle" onClick={toggleMobileMenu} aria-label="Toggle navigation">
          {mobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
