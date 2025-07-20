import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AddNotesModal from '../components/AddNotesModal';

function RecordDetails() {
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddNotesModal, setShowAddNotesModal] = useState(false);
  const [actionMessage, setActionMessage] = useState({ text: '', type: '' });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecordDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await fetch(`http://localhost:4000/api/detection/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch record details');
        }

        const data = await response.json();
        
        // Transform data for display
        setRecord({
          id: data._id,
          date: new Date(data.timestamp || data.uploadDate).toLocaleDateString(),
          diagnosis: data.prediction === 'malignant' ? 'Positive (Malignant)' : 'Negative (Benign)',
          confidence: Math.round(data.confidence * 100),
          features: data.features || {},
          details: data.details || {},
          notes: data.notes || '',
          imageUrl: data.imageUrl
        });
      } catch (err) {
        setError(err.message || 'Failed to load record details');
      } finally {
        setLoading(false);
      }
    };

    fetchRecordDetails();
  }, [id, navigate]);

  const handleAddNotes = async (newNotes) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await fetch(`http://localhost:4000/api/detection/${id}/notes`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ notes: newNotes })
      });

      if (!response.ok) {
        throw new Error('Failed to add notes');
      }

      const updatedRecord = { ...record, notes: newNotes };
      setRecord(updatedRecord);
      setActionMessage({ text: 'Notes added successfully', type: 'success' });
    } catch (err) {
      setActionMessage({ text: err.message || 'Failed to add notes', type: 'error' });
    } finally {
      setShowAddNotesModal(false);
    }
  };

  const deleteRecord = async () => {
    if (!window.confirm('Are you sure you want to delete this medical record? This action cannot be undone.')) {
      return;
    }
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await fetch(`http://localhost:4000/api/detection/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete record');
      }

      setActionMessage({
        text: 'Record deleted successfully, returning to profile...',
        type: 'success'
      });
      
      // Navigate back to profile after short delay
      setTimeout(() => {
        navigate('/profile');
      }, 1500);
    } catch (err) {
      setActionMessage({
        text: err.message || 'Failed to delete record',
        type: 'error'
      });
    }
  };

  const saveNotes = async (recordId, notes) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await fetch(`http://localhost:4000/api/detection/${recordId}/notes`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ notes })
      });

      if (!response.ok) {
        throw new Error('Failed to save notes');
      }

      const updatedRecord = await response.json();
      setRecord(prevRecord => ({
        ...prevRecord,
        notes: updatedRecord.notes
      }));
      
      setShowAddNotesModal(false);
      setActionMessage({
        text: 'Notes saved successfully',
        type: 'success'
      });
      
      // Clear the message after 3 seconds
      setTimeout(() => {
        setActionMessage({ text: '', type: '' });
      }, 3000);
    } catch (err) {
      setActionMessage({
        text: err.message || 'Failed to save notes',
        type: 'error'
      });
    }
  };

  if (loading) {
    return (
      <div className="container" style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
        <h1>Loading medical record...</h1>
        <div className="loading-spinner" style={{ textAlign: 'center', padding: '3rem' }}>
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container" style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
        <h1>Error</h1>
        <div style={{ 
          padding: '2rem', 
          backgroundColor: '#ffebee', 
          borderRadius: '8px',
          marginTop: '1rem' 
        }}>
          {error}
        </div>
        <button 
          onClick={() => navigate('/profile')}
          style={{
            backgroundColor: '#0066cc',
            color: 'white',
            border: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: '4px',
            cursor: 'pointer',
            marginTop: '1.5rem',
            fontSize: '1rem'
          }}
        >
          Back to Profile
        </button>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 style={{ margin: 0 }}>Medical Record Details</h1>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button 
            onClick={deleteRecord}
            style={{
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}
          >
            Delete Record
          </button>
          <button 
            onClick={() => navigate('/profile')}
            style={{
              backgroundColor: '#f0f0f0',
              color: '#333',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}
          >
            Back to Profile
          </button>
        </div>
      </div>

      {record && (
        <>
          <div className="record-header" style={{ 
            backgroundColor: record.diagnosis.includes('Positive') ? '#fff5f5' : '#f5fff5', 
            padding: '1.5rem',
            borderRadius: '8px',
            marginBottom: '2rem',
            borderLeft: `6px solid ${record.diagnosis.includes('Positive') ? '#d9534f' : '#5cb85c'}`
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
              <div>
                <h2 style={{ margin: '0 0 0.5rem 0', color: record.diagnosis.includes('Positive') ? '#d9534f' : '#5cb85c' }}>
                  {record.diagnosis}
                </h2>
                <p style={{ margin: '0', fontSize: '1.1rem' }}>
                  <strong>Date:</strong> {record.date} | <strong>Confidence:</strong> {record.confidence}%
                </p>
              </div>
              <div>
                <button 
                  onClick={() => setShowAddNotesModal(true)}
                  style={{
                    backgroundColor: '#0066cc',
                    color: 'white',
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                  }}
                >
                  {record.notes ? 'Edit Notes' : 'Add Notes'}
                </button>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div className="record-details" style={{ 
              backgroundColor: '#fff',
              borderRadius: '8px',
              padding: '1.5rem',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ borderBottom: '1px solid #ddd', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Clinical Details</h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', rowGap: '1rem', columnGap: '2rem' }}>
                {record.details && Object.entries(record.details).map(([key, value]) => (
                  <div key={key} className="detail-item">
                    <div style={{ color: '#666', fontSize: '0.85rem', marginBottom: '0.2rem' }}>
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </div>
                    <div style={{ fontSize: '1rem' }}>{value !== null && value !== undefined ? value.toString() : 'N/A'}</div>
                  </div>
                ))}
              </div>
              
              {record.notes && (
                <>
                  <h3 style={{ borderBottom: '1px solid #ddd', paddingBottom: '0.5rem', margin: '1.5rem 0 1rem' }}>Clinical Notes</h3>
                  <p style={{ lineHeight: '1.6' }}>{record.notes}</p>
                </>
              )}
            </div>

            <div className="record-features" style={{
              backgroundColor: '#fff',
              borderRadius: '8px',
              padding: '1.5rem',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ borderBottom: '1px solid #ddd', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Measurement Features</h3>
              
              {record.features && Object.entries(record.features).map(([feature, value]) => (
                <div key={feature} style={{ marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                    <span style={{ textTransform: 'capitalize' }}>{feature.replace('_', ' ')}</span>
                    <span>{typeof value === 'number' ? value.toFixed(2) : value}</span>
                  </div>
                  <div style={{ 
                    height: '8px', 
                    backgroundColor: '#f0f0f0', 
                    borderRadius: '4px' 
                  }}>
                    <div 
                      style={{ 
                        width: `${(typeof value === 'number' ? value * 100 : 0)}%`, 
                        height: '100%', 
                        backgroundColor: record.diagnosis.includes('Positive') ? 
                          `rgba(217, 83, 79, ${typeof value === 'number' ? value : 0.5})` : 
                          `rgba(92, 184, 92, ${typeof value === 'number' ? value : 0.5})`,
                        borderRadius: '4px'
                      }}
                    />
                  </div>
                </div>
              ))}

              <div style={{ marginTop: '2rem' }}>
                <h3 style={{ borderBottom: '1px solid #ddd', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Image</h3>
                {record.imageUrl ? (
                  <div style={{ textAlign: 'center' }}>
                    <img 
                      src={record.imageUrl} 
                      alt="Breast cancer scan" 
                      style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '8px' }}
                    />
                  </div>
                ) : (
                  <p>No image available</p>
                )}
              </div>
            </div>
          </div>

          <div style={{ 
            backgroundColor: '#f9f9f9',
            borderRadius: '8px',
            padding: '1rem 1.5rem',
            marginTop: '2rem',
            fontSize: '0.9rem',
            color: '#666'
          }}>
            <p><strong>Disclaimer:</strong> This medical record is generated by an AI detection system and should be used only as a supportive diagnostic tool. Always consult with healthcare professionals for accurate diagnosis and treatment options.</p>
          </div>

          {showAddNotesModal && (
            <AddNotesModal
              recordId={record.id}
              existingNotes={record.notes}
              onSave={saveNotes}
              onCancel={() => setShowAddNotesModal(false)}
            />
          )}

          {actionMessage.text && (
            <div style={{
              padding: '0.75rem 1.5rem',
              marginBottom: '1.5rem',
              borderRadius: '4px',
              backgroundColor: actionMessage.type === 'success' ? '#d4edda' : '#f8d7da',
              color: actionMessage.type === 'success' ? '#155724' : '#721c24',
              border: `1px solid ${actionMessage.type === 'success' ? '#c3e6cb' : '#f5c6cb'}`
            }}>
              {actionMessage.text}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default RecordDetails;
