import React from 'react';
import "../../Styles/CommonStyle/_loading.scss";

const Loading = () => {
  return (
    <div className="loading-screen">
      <div className="loading-content">
        <div className="loading-spinner">
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
        </div>
        <h3>Summoning the App</h3>
      </div>
    </div>
  );
};

export default Loading;