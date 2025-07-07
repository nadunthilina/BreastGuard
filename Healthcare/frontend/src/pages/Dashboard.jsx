import { useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [activeTab, setActiveTab] = useState('prediction');
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
      <div className="dashboard-header">
        <div className="container">
          <h1 className="dashboard-title">Heart Health Dashboard</h1>
          <p className="dashboard-subtitle">
            Enter your health data below to receive a personalized heart disease risk assessment.
          </p>
          
          <div className="dashboard-tabs">
            <button 
              className={`btn ${activeTab === 'prediction' ? 'btn-primary' : 'btn-outline'} me-2`}
              onClick={() => setActiveTab('prediction')}
            >
              Prediction Tool
            </button>
            <button 
              className={`btn ${activeTab === 'history' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setActiveTab('history')}
            >
              History
            </button>
          </div>
        </div>
      </div>
      
      <div className="container">
        {activeTab === 'prediction' ? (
          <>
            {error && <div className="alert alert-danger">{error}</div>}
            
            <form className="prediction-form" onSubmit={handleSubmit}>
              <div className="form-section">
                <h3 className="form-section-title">Personal Information</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Age</label>
                    <input 
                      type="number" 
                      name="age" 
                      value={formData.age} 
                      onChange={handleChange} 
                      className="form-control"
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Sex</label>
                    <select 
                      name="sex" 
                      value={formData.sex} 
                      onChange={handleChange} 
                      className="form-control"
                      required
                    >
                      <option value="1">Male</option>
                      <option value="0">Female</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="form-section">
                <h3 className="form-section-title">Cardiac Symptoms</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Chest Pain Type</label>
                    <select 
                      name="cp" 
                      value={formData.cp} 
                      onChange={handleChange} 
                      className="form-control"
                      required
                    >
                      <option value="0">Typical Angina</option>
                      <option value="1">Atypical Angina</option>
                      <option value="2">Non-anginal Pain</option>
                      <option value="3">Asymptomatic</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Exercise Induced Angina</label>
                    <select 
                      name="exang" 
                      value={formData.exang} 
                      onChange={handleChange}
                      className="form-control" 
                      required
                    >
                      <option value="0">No</option>
                      <option value="1">Yes</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="form-section">
                <h3 className="form-section-title">Vital Measurements</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Resting Blood Pressure (mm Hg)</label>
                    <input 
                      type="number" 
                      name="trestbps" 
                      value={formData.trestbps} 
                      onChange={handleChange}
                      className="form-control" 
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Cholesterol (mg/dl)</label>
                    <input 
                      type="number" 
                      name="chol" 
                      value={formData.chol} 
                      onChange={handleChange}
                      className="form-control" 
                      required 
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Fasting Blood Sugar > 120 mg/dl</label>
                    <select 
                      name="fbs" 
                      value={formData.fbs} 
                      onChange={handleChange}
                      className="form-control" 
                      required
                    >
                      <option value="0">No</option>
                      <option value="1">Yes</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Maximum Heart Rate</label>
                    <input 
                      type="number" 
                      name="thalach" 
                      value={formData.thalach} 
                      onChange={handleChange}
                      className="form-control" 
                      required 
                    />
                  </div>
                </div>
              </div>
              
              <div className="form-section">
                <h3 className="form-section-title">ECG Results</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Resting Electrocardiographic Results</label>
                    <select 
                      name="restecg" 
                      value={formData.restecg} 
                      onChange={handleChange}
                      className="form-control" 
                      required
                    >
                      <option value="0">Normal</option>
                      <option value="1">ST-T Wave Abnormality</option>
                      <option value="2">Left Ventricular Hypertrophy</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">ST Depression Induced by Exercise</label>
                    <input 
                      type="number" 
                      step="0.1" 
                      name="oldpeak" 
                      value={formData.oldpeak} 
                      onChange={handleChange}
                      className="form-control" 
                      required 
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Slope of the Peak Exercise ST Segment</label>
                  <select 
                    name="slope" 
                    value={formData.slope} 
                    onChange={handleChange}
                    className="form-control" 
                    required
                  >
                    <option value="0">Upsloping</option>
                    <option value="1">Flat</option>
                    <option value="2">Downsloping</option>
                  </select>
                </div>
              </div>
              
              <div className="form-section">
                <h3 className="form-section-title">Additional Cardiac Information</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Number of Major Vessels Colored by Fluoroscopy</label>
                    <select 
                      name="ca" 
                      value={formData.ca} 
                      onChange={handleChange}
                      className="form-control" 
                      required
                    >
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Thalassemia</label>
                    <select 
                      name="thal" 
                      value={formData.thal} 
                      onChange={handleChange}
                      className="form-control" 
                      required
                    >
                      <option value="1">Normal</option>
                      <option value="2">Fixed Defect</option>
                      <option value="3">Reversible Defect</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="form-submit">
                <button 
                  type="submit" 
                  className="btn btn-primary btn-lg btn-block"
                  disabled={loading}
                >
                  {loading ? 'Analyzing Your Data...' : 'Get Heart Disease Risk Prediction'}
                </button>
              </div>
            </form>
            
            {prediction !== null && (
              <div className="result-container">
                <h2 className="result-title">Your Heart Disease Risk Assessment</h2>
                
                <div className={prediction === 1 ? 'positive-result' : 'negative-result'}>
                  {prediction === 1 ? (
                    <>
                      <i className="fas fa-exclamation-triangle me-2"></i>
                      Elevated Risk Detected: Based on the provided information, our AI model indicates you may have an elevated risk of heart disease.
                    </>
                  ) : (
                    <>
                      <i className="fas fa-check-circle me-2"></i>
                      Low Risk Detected: Based on the provided information, our AI model indicates you likely have a lower risk of heart disease.
                    </>
                  )}
                </div>
                
                <div className="mt-4">
                  <h4>Important Note:</h4>
                  <p>
                    This prediction is based solely on the data you've provided and should not be considered a medical diagnosis. 
                    Please consult with a healthcare professional for a complete evaluation of your cardiovascular health.
                  </p>
                  
                  <div className="d-flex justify-content-center mt-4">
                    <button onClick={() => window.print()} className="btn btn-outline me-2">
                      <i className="fas fa-print me-2"></i> Print Results
                    </button>
                    <button onClick={() => setPrediction(null)} className="btn btn-outline">
                      <i className="fas fa-redo me-2"></i> New Prediction
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="card">
            <div className="card-body">
              <h3>Your Prediction History</h3>
              <p>This feature will be available soon. You'll be able to view your past predictions and track changes in your heart health over time.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
