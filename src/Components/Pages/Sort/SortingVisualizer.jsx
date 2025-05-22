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

const SortingVisualizer = ({ algorithm, onClose }) => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(algorithm);
  const [array, setArray] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [stepHistory, setStepHistory] = useState([]);

  useEffect(() => {
    setSelectedAlgorithm(algorithm);
  }, [algorithm]);

  const handleAlgorithmChange = (algorithmName) => {
    setSelectedAlgorithm(algorithmName);
  };

  const handleArraySubmit = (newArray) => {
    console.log("SortingVisualizer received array:", newArray);
    setArray(newArray);
    setStepHistory([{ array: [...newArray], description: 'Initial array' }]);
    setCurrentStep(0);
  };

  const renderVisualization = () => {
    console.log("Rendering visualization with array:", array);
    return (
      <div className="array-container">
        {array.map((value, idx) => (
          <div 
            key={idx} 
            className="array-block"
          >
            <span className="block-value">{value}</span>
          </div>
        ))}
      </div>
    );
  };

  const renderCode = (language) => {
    let codeForAlgorithm;
    // Determine the string name of the algorithm for conditions and display
    const algorithmNameString = (selectedAlgorithm && selectedAlgorithm.name) 
                              ? selectedAlgorithm.name 
                              : (typeof selectedAlgorithm === 'string' ? selectedAlgorithm : "UnknownAlgorithm");
  
    if (algorithmNameString === "Bubble Sort") {
      const bubbleSortCodes = {
        Python: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):
       
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr`,
        'C++': `void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
               
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}`,
        Java: `public class BubbleSort {
    void bubbleSort(int arr[]) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    arr[j+1] and arr[j]
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
    }
}`,
        JavaScript: `function bubbleSort(arr) {
    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                arr[j] and arr[j+1]
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
}`,
        C: `void bubbleSort(int arr[], int n) {
    int i, j, temp;
    for (i = 0; i < n - 1; i++) {
        
        for (j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}`
      };
      codeForAlgorithm = bubbleSortCodes[language];
    } else {
      // For other algorithms, use the placeholder structure
      // Sanitize algorithmNameString for use in function names
      const pyFuncName = algorithmNameString.replace(/\s+/g, '_').toLowerCase();
      const genericFuncName = algorithmNameString.replace(/\s+/g, '');
      const cFuncName = algorithmNameString.replace(/\s+/g, '_').toLowerCase();
  
      const placeholderCodes = {
        Python: `# Python implementation\ndef ${pyFuncName}(arr):`,
        'C++': `// C++ implementation\nvoid ${genericFuncName}(int arr[]) {`,
        Java: `// Java implementation\npublic void ${genericFuncName.toLowerCase()}(int[] arr) {`,
        JavaScript: `// JavaScript implementation\nfunction ${genericFuncName}(arr) {`,
        C: `// C implementation\nvoid ${cFuncName}(int arr[]) {`
      };
      codeForAlgorithm = placeholderCodes[language];
    }
  
    return <pre><code>{codeForAlgorithm || `// Code for ${language} not available for ${algorithmNameString}`}</code></pre>;
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
      renderVisualization={renderVisualization}
      renderCode={renderCode}
      renderStepHistory={renderStepHistory}
      onArraySubmit={handleArraySubmit}
    />
  );
};

export default SortingVisualizer;