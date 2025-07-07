import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await fetch('http://localhost:4000/api/users/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }

        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  if (loading) {
    return <div className="container" style={{ padding: '2rem' }}>Loading...</div>;
  }

  if (error) {
    return <div className="container" style={{ padding: '2rem', color: 'red' }}>{error}</div>;
  }

  return (
    <div className="container" style={{ padding: '2rem' }}>
      <div className="profile-container" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h1>Profile</h1>
        {user && (
          <div className="profile-info" style={{ marginTop: '2rem' }}>
            <div className="info-item" style={{ marginBottom: '1rem' }}>
              <strong>Name:</strong> {user.name}
            </div>
            <div className="info-item" style={{ marginBottom: '1rem' }}>
              <strong>Username:</strong> {user.username}
            </div>
            <div className="info-item" style={{ marginBottom: '1rem' }}>
              <strong>Email:</strong> {user.email}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
