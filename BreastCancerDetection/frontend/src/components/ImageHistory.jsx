import React from 'react';

function ImageHistory({ imageHistory }) {
  if (!imageHistory || imageHistory.length === 0) {
    return <div>No uploaded images found.</div>;
  }

  return (
    <div className="image-history-list">
      {imageHistory.map((image, index) => (
        <div key={index} className="image-item" style={{ marginBottom: '1rem' }}>
          <img src={image.url} alt={`Uploaded on ${image.uploadDate}`} style={{ maxWidth: '100%' }} />
          <div><strong>Upload Date:</strong> {image.uploadDate}</div>
          <div><strong>Diagnosis:</strong> {image.diagnosis}</div>
        </div>
      ))}
    </div>
  );
}

export default ImageHistory;
