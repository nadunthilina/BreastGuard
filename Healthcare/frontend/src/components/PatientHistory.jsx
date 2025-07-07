import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PatientHistory() {
  const [patientRecords, setPatientRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchId, setSearchId] = useState('');
  const [filteredRecord, setFilteredRecord] = useState(null);

  useEffect(() => {
    // Fetch all patient records when component mounts
    fetchPatientRecords();
  }, []);

  const fetchPatientRecords = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8081/heart_disease/getRecords');
      setPatientRecords(response.data);
      setError('');
    } catch (err) {
      console.error('Error fetching records:', err);
      setError('Failed to load patient records. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchId) {
      setError('Please enter a patient ID');
      setFilteredRecord(null);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:8081/heart_disease/getRecordById/${searchId}`);
      
      if (typeof response.data === 'string' && response.data.includes('No record found')) {
        setError(response.data);
        setFilteredRecord(null);
      } else {
        setFilteredRecord(response.data);
        setError('');
      }
    } catch (err) {
      console.error('Error searching for record:', err);
      setError('Failed to find patient record. Please try again.');
      setFilteredRecord(null);
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchId('');
    setFilteredRecord(null);
    setError('');
  };

  return (
    <div className="patient-history-container">
      <h2>Patient Prediction History</h2>
      
      <div className="search-container">
        <input 
          type="number" 
          placeholder="Enter Patient ID" 
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        <button onClick={clearSearch} className="secondary-btn">Clear</button>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      {loading ? (
        <div className="loading">Loading patient records...</div>
      ) : filteredRecord ? (
        <div className="single-record">
          <h3>Patient Record #{filteredRecord.patient_id}</h3>
          <div className="record-details">
            <div className="record-column">
              <p><strong>Age:</strong> {filteredRecord.age}</p>
              <p><strong>Sex:</strong> {filteredRecord.sex === 1 ? 'Male' : 'Female'}</p>
              <p><strong>Chest Pain Type:</strong> {filteredRecord.cp}</p>
              <p><strong>Resting BP:</strong> {filteredRecord.trestbps} mm Hg</p>
            </div>
            <div className="record-column">
              <p><strong>Cholesterol:</strong> {filteredRecord.chol} mg/dl</p>
              <p><strong>Fasting Blood Sugar:</strong> {filteredRecord.fbs === 1 ? '> 120 mg/dl' : '≤ 120 mg/dl'}</p>
              <p><strong>Max Heart Rate:</strong> {filteredRecord.thalach}</p>
              <p><strong>Exercise Angina:</strong> {filteredRecord.exang === 1 ? 'Yes' : 'No'}</p>
            </div>
            <div className="record-column">
              <p><strong>ST Depression:</strong> {filteredRecord.oldpeak}</p>
              <p><strong>ST Slope:</strong> {filteredRecord.slope}</p>
              <p><strong>Major Vessels:</strong> {filteredRecord.ca}</p>
              <p><strong>Thalassemia:</strong> {filteredRecord.thal}</p>
            </div>
          </div>
          <div className="prediction-result">
            <h4>Prediction Result:</h4>
            <span className={filteredRecord.target === 1 ? "positive-result" : "negative-result"}>
              {filteredRecord.target === 1 ? 
                'Positive: Heart Disease Detected' : 
                'Negative: No Heart Disease Detected'}
            </span>
          </div>
        </div>
      ) : (
        <div className="record-table">
          <h3>All Patient Records</h3>
          {patientRecords.length === 0 ? (
            <p>No patient records found.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Age</th>
                  <th>Sex</th>
                  <th>Chest Pain</th>
                  <th>Blood Pressure</th>
                  <th>Cholesterol</th>
                  <th>Prediction</th>
                </tr>
              </thead>
              <tbody>
                {patientRecords.map((record) => (
                  <tr key={record.patient_id} onClick={() => setFilteredRecord(record)}>
                    <td>{record.patient_id}</td>
                    <td>{record.age}</td>
                    <td>{record.sex === 1 ? 'M' : 'F'}</td>
                    <td>{record.cp}</td>
                    <td>{record.trestbps}</td>
                    <td>{record.chol}</td>
                    <td className={record.target === 1 ? "positive-cell" : "negative-cell"}>
                      {record.target === 1 ? 'Positive' : 'Negative'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

export default PatientHistory;
