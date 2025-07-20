// historyService.js - Service for managing patient detection history

/**
 * Saves a new detection record to the patient's history
 * @param {Object} detectionData - The detection data object containing diagnosis information
 * @returns {Promise} Promise that resolves to the saved record or rejects with an error
 */
export const saveDetectionToHistory = async (detectionData) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication required');
    }

    // Prepare the record data
    const recordData = {
      prediction: detectionData.diagnosis === 'Positive' ? 'malignant' : 'benign',
      confidence: detectionData.confidenceLevel ? detectionData.confidenceLevel / 100 : 0.8,
      imageUrl: detectionData.imageUrl || null,
      imageBase64: detectionData.imageUrl || null, // Including as imageBase64 for backend compatibility
      features: detectionData.details || {}
    };

    // Send the record to the backend
    const response = await fetch('http://localhost:4000/api/detection', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(recordData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to save detection record');
    }

    // Return the saved record
    const savedRecord = await response.json();
    return savedRecord;
  } catch (error) {
    console.error('Error saving detection record:', error);
    throw error;
  }
};

/**
 * Gets all detection history records for the current user
 * @returns {Promise} Promise that resolves to an array of history records
 */
export const getDetectionHistory = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication required');
    }

    const response = await fetch('http://localhost:4000/api/detection/history', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch history');
    }

    const data = await response.json();
    
    // Transform data to match the expected format in Profile.jsx
    return data.map(record => ({
      id: record._id,
      date: new Date(record.timestamp || record.uploadDate).toLocaleDateString(),
      diagnosis: record.prediction === 'malignant' ? 'Positive' : 'Negative',
      confidence: Math.round(record.confidence * 100),
      features: record.features || {},
      details: record.details || {},
      notes: record.notes || '',
      imageUrl: record.imageUrl,
      tumorSize: record.details?.tumorSize || 'Not specified',
      stage: record.details?.stageClassification || 'Not specified',
      followUp: record.details?.recommendedFollowUp || 'Not specified'
    }));
  } catch (error) {
    console.error('Error fetching detection history:', error);
    throw error;
  }
};

/**
 * Gets a single detection record by ID
 * @param {string} recordId - The ID of the record to retrieve
 * @returns {Promise} Promise that resolves to the detection record
 */
export const getDetectionById = async (recordId) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication required');
    }

    const response = await fetch(`http://localhost:4000/api/detection/${recordId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch record details');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching detection record:', error);
    throw error;
  }
};

/**
 * Deletes a detection record from the user's history
 * @param {string} recordId - The ID of the record to delete
 * @returns {Promise} Promise that resolves when the record is deleted
 */
export const deleteDetectionRecord = async (recordId) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication required');
    }

    const response = await fetch(`http://localhost:4000/api/detection/${recordId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to delete record');
    }

    return true;
  } catch (error) {
    console.error('Error deleting detection record:', error);
    throw error;
  }
};
