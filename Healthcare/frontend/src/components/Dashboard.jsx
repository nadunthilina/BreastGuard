import { useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [formData, setFormData] = useState({
    age: 50,
    sex: 1, // 1 = male, 0 = female
    cp: 0, // chest pain type
    trestbps: 120, // resting blood pressure
    chol: 200, // cholesterol
    fbs: 0, // fasting blood sugar
    restecg: 0, // resting electrocardiographic results
    thalach: 150, // maximum heart rate achieved
    exang: 0, // exercise induced angina
    oldpeak: 1.0, // ST depression induced by exercise
    slope: 1, // the slope of the peak exercise ST segment
    ca: 0, // number of major vessels colored by fluoroscopy
    thal: 2 // thalassemia
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'oldpeak' ? parseFloat(value) : parseInt(value)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setPrediction(null);

    try {
      const response = await axios.post('http://localhost:8081/heart_disease/predictAndAddRecord', formData);
      setPrediction(response.data.prediction);
    } catch (err) {
      console.error('Prediction error:', err);
      setError('Failed to get prediction. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard">
      <h2>Heart Disease Prediction</h2>
      <p>Enter patient details to predict the risk of heart disease:</p>

      {error && <div className="error">{error}</div>}

      <form className="prediction-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Age</label>
            <input type="number" name="age" value={formData.age} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Sex</label>
            <select name="sex" value={formData.sex} onChange={handleChange} required>
              <option value="1">Male</option>
              <option value="0">Female</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Chest Pain Type</label>
            <select name="cp" value={formData.cp} onChange={handleChange} required>
              <option value="0">Typical Angina</option>
              <option value="1">Atypical Angina</option>
              <option value="2">Non-anginal Pain</option>
              <option value="3">Asymptomatic</option>
            </select>
          </div>
          <div className="form-group">
            <label>Resting Blood Pressure (mm Hg)</label>
            <input type="number" name="trestbps" value={formData.trestbps} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Cholesterol (mg/dl)</label>
            <input type="number" name="chol" value={formData.chol} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Fasting Blood Sugar > 120 mg/dl</label>
            <select name="fbs" value={formData.fbs} onChange={handleChange} required>
              <option value="0">No</option>
              <option value="1">Yes</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Resting Electrocardiographic Results</label>
          <select name="restecg" value={formData.restecg} onChange={handleChange} required>
            <option value="0">Normal</option>
            <option value="1">ST-T Wave Abnormality</option>
            <option value="2">Left Ventricular Hypertrophy</option>
          </select>
        </div>

        <div className="form-group">
          <label>Maximum Heart Rate</label>
          <input type="number" name="thalach" value={formData.thalach} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Exercise Induced Angina</label>
          <select name="exang" value={formData.exang} onChange={handleChange} required>
            <option value="0">No</option>
            <option value="1">Yes</option>
          </select>
        </div>

        <div className="form-group">
          <label>ST Depression Induced by Exercise</label>
          <input type="number" step="0.1" name="oldpeak" value={formData.oldpeak} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Slope of the Peak Exercise ST Segment</label>
          <select name="slope" value={formData.slope} onChange={handleChange} required>
            <option value="0">Upsloping</option>
            <option value="1">Flat</option>
            <option value="2">Downsloping</option>
          </select>
        </div>

        <div className="form-group">
          <label>Number of Major Vessels</label>
          <select name="ca" value={formData.ca} onChange={handleChange} required>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>

        <div className="form-group">
          <label>Thalassemia</label>
          <select name="thal" value={formData.thal} onChange={handleChange} required>
            <option value="1">Normal</option>
            <option value="2">Fixed Defect</option>
            <option value="3">Reversible Defect</option>
          </select>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Predict Heart Disease Risk'}
        </button>
      </form>

      {prediction !== null && (
        <div className="result-container">
          <h3>Prediction Result</h3>
          <p className={prediction === 1 ? 'positive-result' : 'negative-result'}>
            {prediction === 1 ? 
              'Risk Detected: Patient may have heart disease.' : 
              'No Risk Detected: Patient likely does not have heart disease.'}
          </p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
