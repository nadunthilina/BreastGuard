import React from 'react';

function Resources() {
  return (
    <div className="resources-container">
      <h2>Healthcare Resources</h2>
      
      <div className="resources-section">
        <h3>Heart Disease Resources</h3>
        <ul className="resource-list">
          <li>
            <a href="https://www.heart.org/" target="_blank" rel="noopener noreferrer">
              American Heart Association
            </a>
            <p>Information on heart disease prevention, treatment, and research</p>
          </li>
          <li>
            <a href="https://www.nhlbi.nih.gov/" target="_blank" rel="noopener noreferrer">
              National Heart, Lung, and Blood Institute
            </a>
            <p>Research and resources on heart and vascular diseases</p>
          </li>
          <li>
            <a href="https://www.cdc.gov/heartdisease/" target="_blank" rel="noopener noreferrer">
              CDC Heart Disease Information
            </a>
            <p>Facts, statistics, and prevention strategies</p>
          </li>
        </ul>
      </div>
      
      <div className="resources-section highlight">
        <h3>Breast Cancer Resources</h3>
        <ul className="resource-list">
          <li>
            <a href="https://www.breastcancer.org/" target="_blank" rel="noopener noreferrer">
              BreastCancer.org
            </a>
            <p>Comprehensive information about breast cancer symptoms, diagnosis, and treatment</p>
          </li>
          <li>
            <a href="https://www.nationalbreastcancer.org/" target="_blank" rel="noopener noreferrer">
              National Breast Cancer Foundation
            </a>
            <p>Early detection, education, and support services</p>
          </li>
          <li>
            <a href="https://www.cancer.gov/types/breast" target="_blank" rel="noopener noreferrer">
              National Cancer Institute - Breast Cancer
            </a>
            <p>Research-based information and clinical trials</p>
          </li>
          <li>
            <a href="https://www.komen.org/" target="_blank" rel="noopener noreferrer">
              Susan G. Komen
            </a>
            <p>Funding for research, community health outreach, and advocacy programs</p>
          </li>
        </ul>
      </div>
      
      <div className="resources-section">
        <h3>General Healthcare Tools</h3>
        <ul className="resource-list">
          <li>
            <a href="https://www.cdc.gov/" target="_blank" rel="noopener noreferrer">
              Centers for Disease Control and Prevention
            </a>
            <p>Health information and disease prevention guidelines</p>
          </li>
          <li>
            <a href="https://www.who.int/" target="_blank" rel="noopener noreferrer">
              World Health Organization
            </a>
            <p>Global health information and resources</p>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Resources;
