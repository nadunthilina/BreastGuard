import React, { useState } from 'react';

function UploadImage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setSelectedFile(null);
      setPreview(null);
      return;
    }
    
    // Check if file is an image
    if (!file.type.match('image.*')) {
      setError('Please select an image file');
      return;
    }
    
    setSelectedFile(file);
    setError('');
    
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };
  
  const handleUpload = async (e) => {
    e.preventDefault();
    
    if (!selectedFile) {
      setError('Please select an image to upload');
      return;
    }
    
    setLoading(true);
    setError('');
    setResult(null);
    
    try {
      // Create form data for image upload
      const formData = new FormData();
      formData.append('image', selectedFile);
      
      // This would be replaced with actual API call in production
      // const response = await fetch('http://localhost:9090/api/breast-cancer-detection', {
      //   method: 'POST',
      //   body: formData
      // });
      
      // Mock response for demo
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // if (!response.ok) {
      //   throw new Error('Error processing image. Please try again.');
      // }
      
      // const data = await response.json();
      
      // Mock result for demo
      const mockResult = {
        prediction: Math.random() > 0.5 ? 'malignant' : 'benign',
        confidence: Math.floor(Math.random() * 30 + 70) / 100,
        features: {
          texture: Math.random() * 0.5 + 0.2,
          perimeter: Math.random() * 0.5 + 0.3,
          area: Math.random() * 0.5 + 0.4,
          smoothness: Math.random() * 0.5 + 0.25,
          concavity: Math.random() * 0.5 + 0.3
        }
      };
      
      setResult(mockResult);
      
    } catch (err) {
      setError(err.message || 'Error processing image. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="container" style={{ maxWidth: '900px', padding: '2rem 1rem' }}>
      <h1 style={{ textAlign: 'center', color: 'var(--header-color)', marginBottom: '2rem' }}>Breast Cancer Detection</h1>
      
      <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '2rem', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}>
        <div className="row" style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
          <div style={{ flex: '1', minWidth: '300px' }}>
            <h2 style={{ color: 'var(--primary-color)', marginBottom: '1.5rem' }}>Upload Ultrasound Image</h2>
            
            {error && (
              <div style={{ padding: '0.75rem', backgroundColor: '#ffebee', borderRadius: '4px', marginBottom: '1rem' }}>
                {error}
              </div>
            )}
            
            <form onSubmit={handleUpload}>
              <div className="form-group">
                <label htmlFor="image">Select Image</label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="form-control"
                />
              </div>
              
              {preview && (
                <div style={{ marginTop: '1rem', marginBottom: '1rem' }}>
                  <h3>Preview</h3>
                  <img 
                    src={preview} 
                    alt="Image preview" 
                    style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '8px' }} 
                  />
                </div>
              )}
              
              <button 
                type="submit" 
                style={{ marginTop: '1rem', width: '100%' }}
                disabled={loading || !selectedFile}
              >
                {loading ? <div className="spinner"></div> : 'Analyze Image'}
              </button>
            </form>
            
            <div style={{ marginTop: '1.5rem' }}>
              <h3>Important Notes:</h3>
              <ul>
                <li>Upload high-quality ultrasound images</li>
                <li>Image should be in JPEG or PNG format</li>
                <li>For optimal results, ensure the tumor region is clearly visible</li>
              </ul>
            </div>
          </div>
          
          <div style={{ flex: '1', minWidth: '300px' }}>
            <h2 style={{ color: 'var(--primary-color)', marginBottom: '1.5rem' }}>Results</h2>
            
            {loading && (
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <div className="spinner" style={{ width: '60px', height: '60px', borderWidth: '6px' }}></div>
                <p style={{ marginTop: '1rem' }}>Processing image...</p>
              </div>
            )}
            
            {!loading && !result && (
              <div style={{ 
                backgroundColor: 'var(--background-light)', 
                borderRadius: '8px',
                padding: '3rem 1rem',
                textAlign: 'center',
                color: 'var(--gray-600)'
              }}>
                <p>Upload and analyze an image to see results</p>
              </div>
            )}
            
            {result && (
              <div>
                <div style={{ 
                  backgroundColor: result.prediction === 'benign' ? '#e8f5e9' : '#ffebee',
                  padding: '1rem',
                  borderRadius: '8px',
                  marginBottom: '1.5rem'
                }}>
                  <h3 style={{ 
                    color: result.prediction === 'benign' ? 'var(--success)' : 'var(--danger)',
                    marginBottom: '0.5rem'
                  }}>
                    {result.prediction === 'benign' ? 'Benign' : 'Malignant'}
                  </h3>
                  <p>Confidence: <strong>{(result.confidence * 100).toFixed(1)}%</strong></p>
                </div>
                
                <h3>Feature Analysis</h3>
                <div style={{ marginTop: '1rem' }}>
                  {Object.entries(result.features).map(([feature, value]) => (
                    <div key={feature} style={{ marginBottom: '0.75rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                        <span style={{ textTransform: 'capitalize' }}>{feature}</span>
                        <span>{value.toFixed(2)}</span>
                      </div>
                      <div style={{ 
                        height: '8px', 
                        backgroundColor: 'var(--gray-200)', 
                        borderRadius: '4px' 
                      }}>
                        <div 
                          style={{ 
                            width: `${value * 100}%`, 
                            height: '100%', 
                            backgroundColor: 'var(--primary-color)',
                            borderRadius: '4px'
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                
                <div style={{ marginTop: '2rem' }}>
                  <p><strong>Note:</strong> This analysis is a preliminary result and should be used as a supportive tool for medical professionals. Always consult with a healthcare provider for diagnosis.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadImage;
