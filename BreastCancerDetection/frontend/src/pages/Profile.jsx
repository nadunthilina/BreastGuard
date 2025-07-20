import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDetectionHistory } from '../services/historyService';

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [history, setHistory] = useState([]); // State for patient history
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

    const fetchUserHistory = async () => {
      try {
        const data = await getDetectionHistory();
        setHistory(data);
      } catch (err) {
        // Only update the history state with error message, don't affect the whole profile
        setHistory([{ error: 'Failed to fetch history' }]);
        console.error(err.message || 'Failed to load history');
      }
    };

    fetchUserProfile();
    fetchUserHistory();
  }, [navigate]);

  if (loading) {
    return <div className="container" style={{ padding: '2rem' }}>Loading...</div>;
  }
  
  // We'll show specific errors in their respective sections rather than blocking the whole page

  return (
    <div className="container" style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ borderBottom: '2px solid #0066cc', paddingBottom: '0.5rem', marginBottom: '2rem', color: '#0066cc' }}>Patient Profile</h1>
      
      <div className="profile-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
        {/* Patient Personal Details Section */}
        <div className="profile-card" style={{ 
          background: '#f8f9fa', 
          borderRadius: '8px', 
          padding: '1.5rem', 
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' 
        }}>
          <h2 style={{ marginBottom: '1.5rem', color: '#333', borderBottom: '1px solid #ddd', paddingBottom: '0.5rem' }}>Personal Information</h2>
          
          {error ? (
            <div style={{ 
              padding: '1.5rem', 
              textAlign: 'center', 
              color: '#666',
              border: '1px dashed #ddd',
              borderRadius: '4px',
              backgroundColor: '#f9f9f9'
            }}>
              <p>Unable to load profile information.</p>
              <button 
                onClick={() => window.location.reload()}
                style={{
                  backgroundColor: '#0066cc',
                  color: 'white',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  marginTop: '1rem',
                  fontWeight: '500'
                }}
              >
                Retry
              </button>
            </div>
          ) : user && (
            <div className="profile-info">
              {user.profileImage && (
                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                  <img 
                    src={user.profileImage} 
                    alt="Profile" 
                    style={{ 
                      width: '120px', 
                      height: '120px', 
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '3px solid #0066cc'
                    }} 
                  />
                </div>
              )}
              
              <div className="info-group" style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', color: '#666', fontSize: '0.85rem', marginBottom: '0.3rem' }}>Full Name</label>
                <div style={{ fontSize: '1.1rem', fontWeight: '500' }}>{user.name}</div>
              </div>
              
              <div className="info-group" style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', color: '#666', fontSize: '0.85rem', marginBottom: '0.3rem' }}>Username</label>
                <div style={{ fontSize: '1.1rem' }}>{user.username}</div>
              </div>
              
              <div className="info-group" style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', color: '#666', fontSize: '0.85rem', marginBottom: '0.3rem' }}>Email Address</label>
                <div style={{ fontSize: '1.1rem' }}>{user.email}</div>
              </div>
              
              {user.phone && (
                <div className="info-group" style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', color: '#666', fontSize: '0.85rem', marginBottom: '0.3rem' }}>Phone Number</label>
                  <div style={{ fontSize: '1.1rem' }}>{user.phone}</div>
                </div>
              )}
              
              {user.dateOfBirth && (
                <div className="info-group" style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', color: '#666', fontSize: '0.85rem', marginBottom: '0.3rem' }}>Date of Birth</label>
                  <div style={{ fontSize: '1.1rem' }}>{user.dateOfBirth}</div>
                </div>
              )}
              
              <button 
                onClick={() => navigate('/edit-profile')} 
                style={{
                  backgroundColor: '#0066cc',
                  color: 'white',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  marginTop: '1rem',
                  fontWeight: '500'
                }}
              >
                Edit Profile
              </button>
            </div>
          )}
        </div>

        {/* Patient History Records Section */}
        <div className="history-card" style={{ 
          background: '#fff', 
          borderRadius: '8px', 
          padding: '1.5rem', 
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' 
        }}>
          <h2 style={{ marginBottom: '1.5rem', color: '#333', borderBottom: '1px solid #ddd', paddingBottom: '0.5rem' }}>Medical History</h2>
          
          {history.length > 0 && history[0].error ? (
            <div style={{ 
              padding: '2rem', 
              textAlign: 'center', 
              color: '#d9534f',
              border: '1px dashed #d9534f',
              borderRadius: '4px',
              backgroundColor: '#fff5f5'
            }}>
              <p style={{ fontWeight: '500' }}>{history[0].error}</p>
              <p style={{ marginTop: '1rem', fontSize: '0.9rem' }}>There was a problem connecting to the server. Please try again later.</p>
            </div>
          ) : history.length > 0 ? (
            <div className="history-table-container" style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f0f0f0' }}>
                    <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Date</th>
                    <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Diagnosis</th>
                    <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Confidence</th>
                    <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Tumor Size</th>
                    <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Stage</th>
                    <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((record, index) => (
                    <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff' }}>
                      <td style={{ border: '1px solid #ddd', padding: '12px' }}>{record.date}</td>
                      <td style={{ border: '1px solid #ddd', padding: '12px' }}>
                        <span style={{ 
                          color: record.diagnosis === 'Positive' ? '#d9534f' : '#5cb85c',
                          fontWeight: '500' 
                        }}>
                          {record.diagnosis}
                        </span>
                      </td>
                      <td style={{ border: '1px solid #ddd', padding: '12px' }}>
                        <div className="progress-bar" style={{ 
                          height: '20px', 
                          background: '#e9ecef', 
                          borderRadius: '4px', 
                          overflow: 'hidden' 
                        }}>
                          <div style={{ 
                            height: '100%', 
                            width: `${record.confidence}%`, 
                            background: record.confidence > 70 ? '#d9534f' : 
                                       record.confidence > 40 ? '#f0ad4e' : '#5cb85c', 
                            textAlign: 'center', 
                            color: '#fff', 
                            lineHeight: '20px',
                            fontSize: '0.8rem'
                          }}>
                            {record.confidence}%
                          </div>
                        </div>
                      </td>
                      <td style={{ border: '1px solid #ddd', padding: '12px' }}>
                        {record.tumorSize || 'N/A'}
                      </td>
                      <td style={{ border: '1px solid #ddd', padding: '12px' }}>
                        {record.stage || 'N/A'}
                      </td>
                      <td style={{ border: '1px solid #ddd', padding: '12px' }}>
                        <button 
                          onClick={() => navigate(`/record-details/${record.id}`)}
                          style={{
                            backgroundColor: '#0066cc',
                            color: 'white',
                            border: 'none',
                            padding: '5px 10px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '0.9rem'
                          }}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div style={{ 
              padding: '2rem', 
              textAlign: 'center', 
              color: '#666',
              border: '1px dashed #ddd',
              borderRadius: '4px'
            }}>
              <p>No medical history records found.</p>
              <p style={{ marginTop: '1rem', fontSize: '0.9rem' }}>When you complete breast cancer screenings, your results will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
