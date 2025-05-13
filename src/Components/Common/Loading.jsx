import React, { useState, useEffect } from 'react';
import "../../Styles/CommonStyle/_loading.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faLaptopCode, faChartLine, faRocket } from '@fortawesome/free-solid-svg-icons';

const Loading = () => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing');
  
  // Simulate loading progress
  useEffect(() => {
    const loadingTexts = [
      'Initializing',
      'Loading algorithms',
      'Preparing visualizations',
      'Configuring interface',
      'Almost ready',
      'Summoning the App'
    ];
    
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 15;
        if (newProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return newProgress;
      });
    }, 700);
    
    const textInterval = setInterval(() => {
      setLoadingText(prev => {
        const currentIndex = loadingTexts.indexOf(prev);
        const nextIndex = (currentIndex + 1) % loadingTexts.length;
        return loadingTexts[nextIndex];
      });
    }, 1500);
    
    return () => {
      clearInterval(interval);
      clearInterval(textInterval);
    };
  }, []);
  
  return (
    <div className="loading-screen">
      <div className="loading-content">
        <div className="loading-logo">
          <span className="logo-letter">V</span>
          <span className="logo-letter">I</span>
          <span className="logo-letter">S</span>
          <span className="logo-letter">C</span>
          <span className="logo-letter">O</span>
        </div>
        
        <div className="loading-spinner">
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
        </div>
        
        <h3>{loadingText}</h3>
        
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
          <span className="progress-text">{Math.round(progress)}%</span>
        </div>
        
        <div className="loading-icons">
          <FontAwesomeIcon icon={faCode} className="loading-icon" />
          <FontAwesomeIcon icon={faLaptopCode} className="loading-icon" />
          <FontAwesomeIcon icon={faChartLine} className="loading-icon" />
          <FontAwesomeIcon icon={faRocket} className="loading-icon" />
        </div>
        
        <p className="loading-tip">Tip: Visualize algorithms step by step to understand them better</p>
      </div>
    </div>
  );
};

export default Loading;