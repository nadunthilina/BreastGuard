import React from 'react';

function Resources() {
  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Breast Cancer Resources</h1>
      
      <div style={{ 
        backgroundColor: 'white', 
        borderRadius: '8px', 
        padding: '2rem', 
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', 
        marginBottom: '2rem'
      }}>
        <div className="resources-section" style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: 'var(--primary-color)', marginBottom: '1rem' }}>Educational Resources</h2>
          <ul className="resource-list" style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '1rem', borderBottom: '1px solid var(--gray-200)', paddingBottom: '1rem' }}>
              <a href="https://www.cancer.gov/types/breast" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                National Cancer Institute - Breast Cancer
              </a>
              <p>Comprehensive information about breast cancer types, causes, screening, and treatment options.</p>
            </li>
            <li style={{ marginBottom: '1rem', borderBottom: '1px solid var(--gray-200)', paddingBottom: '1rem' }}>
              <a href="https://www.cancer.org/cancer/breast-cancer.html" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                American Cancer Society - Breast Cancer
              </a>
              <p>Detailed guides about breast cancer detection, diagnosis, and treatment.</p>
            </li>
            <li style={{ marginBottom: '1rem', borderBottom: '1px solid var(--gray-200)', paddingBottom: '1rem' }}>
              <a href="https://medlineplus.gov/breastcancer.html" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                MedlinePlus - Breast Cancer
              </a>
              <p>Reliable health information from the National Library of Medicine.</p>
            </li>
          </ul>
        </div>
        
        <div className="resources-section" style={{ marginBottom: '2rem', padding: '1rem', backgroundColor: 'var(--background-light)', borderRadius: '8px' }}>
          <h2 style={{ color: 'var(--primary-color)', marginBottom: '1rem' }}>Support Organizations</h2>
          <ul className="resource-list" style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '1rem', borderBottom: '1px solid var(--gray-200)', paddingBottom: '1rem' }}>
              <a href="https://www.breastcancer.org/" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                BreastCancer.org
              </a>
              <p>Comprehensive information about breast cancer symptoms, diagnosis, and treatment</p>
            </li>
            <li style={{ marginBottom: '1rem', borderBottom: '1px solid var(--gray-200)', paddingBottom: '1rem' }}>
              <a href="https://www.nationalbreastcancer.org/" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                National Breast Cancer Foundation
              </a>
              <p>Early detection, education, and support services</p>
            </li>
            <li style={{ marginBottom: '1rem', borderBottom: '1px solid var(--gray-200)', paddingBottom: '1rem' }}>
              <a href="https://www.komen.org/" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                Susan G. Komen
              </a>
              <p>Funding for research, community health outreach, and advocacy programs</p>
            </li>
          </ul>
        </div>
        
        <div className="resources-section">
          <h2 style={{ color: 'var(--primary-color)', marginBottom: '1rem' }}>Research and Technology</h2>
          <ul className="resource-list" style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '1rem', borderBottom: '1px solid var(--gray-200)', paddingBottom: '1rem' }}>
              <a href="https://www.cancer.gov/research/key-initiatives/moonshot-cancer-initiative" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                Cancer Moonshot
              </a>
              <p>Initiative aimed at accelerating cancer research to make more therapies available to more patients.</p>
            </li>
            <li style={{ marginBottom: '1rem', borderBottom: '1px solid var(--gray-200)', paddingBottom: '1rem' }}>
              <a href="https://www.bcrf.org/" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                Breast Cancer Research Foundation
              </a>
              <p>Organization dedicated to preventing and curing breast cancer by advancing the world's most promising research.</p>
            </li>
            <li style={{ marginBottom: '1rem' }}>
              <a href="https://www.cancer.gov/about-cancer/treatment/clinical-trials/search" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                Clinical Trials Database
              </a>
              <p>Find clinical trials for breast cancer research and experimental treatments.</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Resources;
