import React, { useState, useEffect } from 'react';
import BaseVisualizer from '../BaseVisualizer';
import '../../../Styles/PageStyle/Visualizerstyle/_sortingVisualizer.scss';

const sortingAlgorithms = [
  { name: "Bubble Sort" },
  { name: "Selection Sort" },
  { name: "Insertion Sort" },
  { name: "Merge Sort" },
  { name: "Quick Sort" },
  { name: "Heap Sort" },
  { name: "Shell Sort" },
  { name: "Counting Sort" },
  { name: "Radix Sort" },
  { name: "Bucket Sort" }
];

const SortingVisualizer = ({ algorithm, onClose }) => { // Changed from initialAlgorithm to algorithm
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(algorithm); // Changed from initialAlgorithm to algorithm
  const [array, setArray] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [stepHistory, setStepHistory] = useState([]);

  // Add useEffect to update selectedAlgorithm when algorithm prop changes
  useEffect(() => {
    setSelectedAlgorithm(algorithm);
    generateRandomArray(); // Reset array when algorithm changes
  }, [algorithm]);

  const handleAlgorithmChange = (algorithmName) => {
    setSelectedAlgorithm(algorithmName);
    generateRandomArray(); // Reset array when algorithm changes
  };

  const generateRandomArray = (size = 10) => {
    const newArray = Array.from({ length: size }, () => 
      Math.floor(Math.random() * 100) + 1
    );
    setArray(newArray);
    setStepHistory([{ array: [...newArray], description: 'Initial array' }]);
    setCurrentStep(0);
  };

  const renderControls = ({ speed, setSpeed, isPlaying, togglePlayPause }) => (
    <div className="sorting-controls">
      <button onClick={() => generateRandomArray()}>Generate New Array</button>
      <input 
        type="range" 
        min="1" 
        max="5" 
        value={speed} 
        onChange={(e) => setSpeed(Number(e.target.value))}
      />
      <button onClick={togglePlayPause}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
    </div>
  );

  const renderVisualization = () => (
    <div className="array-container">
      {array.map((value, idx) => (
        <div 
          key={idx} 
          className="array-bar"
          style={{ height: `${value * 3}px` }}
        />
      ))}
    </div>
  );

  const renderCode = (language) => {
    // Placeholder for algorithm code in different languages
    const codes = {
      Python: '# Python implementation\ndef ' + selectedAlgorithm + '(arr):',
      'C++': '// C++ implementation\nvoid ' + selectedAlgorithm + '(int arr[]) {',
      Java: '// Java implementation\npublic void ' + selectedAlgorithm + '(int[] arr) {',
      JavaScript: '// JavaScript implementation\nfunction ' + selectedAlgorithm + '(arr) {',
      C: '// C implementation\nvoid ' + selectedAlgorithm + '(int arr[]) {'
    };
    return <pre><code>{codes[language]}</code></pre>;
  };

  const renderStepHistory = () => (
    <div className="step-history-content">
      {stepHistory.map((step, index) => (
        <div 
          key={index} 
          className={`step ${currentStep === index ? 'active' : ''}`}
        >
          <span>Step {index + 1}:</span>
          <p>{step.description}</p>
        </div>
      ))}
    </div>
  );

  return (
    <BaseVisualizer
      title="Sorting Visualization"
      onClose={onClose}
      algorithms={sortingAlgorithms}
      selectedAlgorithm={selectedAlgorithm}
      onAlgorithmChange={handleAlgorithmChange}
      renderControls={renderControls}
      renderVisualization={renderVisualization}
      renderCode={renderCode}
      renderStepHistory={renderStepHistory}
    />
  );
};

export default SortingVisualizer;