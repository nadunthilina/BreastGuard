import React, { useState } from 'react';

function AddNotesModal({ recordId, existingNotes = '', onSave, onCancel }) {
  const [notes, setNotes] = useState(existingNotes);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await onSave(recordId, notes);
      // Let the parent component handle the success message and closing
    } catch (error) {
      console.error("Failed to save notes:", error);
      // The parent component will handle errors
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div className="modal-content" style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '2rem',
        width: '90%',
        maxWidth: '600px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <h2 style={{ margin: 0 }}>Medical Notes</h2>
          <button 
            onClick={onCancel}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              color: '#666'
            }}
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label 
              htmlFor="medical-notes" 
              style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '500'
              }}
            >
              Add Medical Notes
            </label>
            <textarea 
              id="medical-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Enter clinical observations, treatment recommendations, or follow-up plans..."
              style={{
                width: '100%',
                minHeight: '150px',
                padding: '0.75rem',
                borderRadius: '4px',
                border: '1px solid #ddd',
                fontSize: '1rem',
                lineHeight: '1.5'
              }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
            <button
              type="button"
              onClick={onCancel}
              disabled={isSubmitting}
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: '4px',
                border: '1px solid #ddd',
                background: '#f5f5f5',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: '4px',
                border: 'none',
                background: '#0066cc',
                color: 'white',
                cursor: isSubmitting ? 'default' : 'pointer',
                opacity: isSubmitting ? 0.7 : 1
              }}
            >
              {isSubmitting ? 'Saving...' : 'Save Notes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddNotesModal;
