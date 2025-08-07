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
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisualizationReady, setIsVisualizationReady] = useState(false);

  useEffect(() => {
    setSelectedAlgorithm(algorithm);
  }, [algorithm]);

  const handleAlgorithmChange = (algorithmName) => {
    setSelectedAlgorithm(algorithmName);
    // Reset visualization when algorithm changes
    setSteps([]);
    setCurrentStep(0);
    setIsVisualizationReady(false);
  };

  const bubbleSort = (arr) => {
    console.log("BubbleSort called with array:", arr);
    const steps = [];
    const array = [...arr];
    const n = array.length;
    
    // Initial state
    steps.push({
      array: [...array],
      comparing: [],
      swapped: [],
      description: "Initial array",
      highlightedLines: [1]
    });

    for (let i = 0; i < n - 1; i++) {
      let swapped = false;
      
      steps.push({
        array: [...array],
        comparing: [],
        swapped: [],
        description: `Pass ${i + 1}: Starting outer loop iteration`,
        highlightedLines: [2, 3]
      });

      for (let j = 0; j < n - i - 1; j++) {
        // Comparing elements
        steps.push({
          array: [...array],
          comparing: [j, j + 1],
          swapped: [],
          description: `Comparing elements at positions ${j} and ${j + 1}: ${array[j]} and ${array[j + 1]}`,
          highlightedLines: [4, 5]
        });

        if (array[j] > array[j + 1]) {
          // Store original values for description
          const leftVal = array[j];
          const rightVal = array[j + 1];
          
          // Swap elements
          [array[j], array[j + 1]] = [array[j + 1], array[j]];
          swapped = true;
          
          steps.push({
            array: [...array],
            comparing: [j, j + 1],
            swapped: [j, j + 1],
            description: `Swapped ${leftVal} and ${rightVal} because ${leftVal} > ${rightVal}`,
            highlightedLines: [6, 7, 8]
          });
        } else {
          steps.push({
            array: [...array],
            comparing: [j, j + 1],
            swapped: [],
            description: `No swap needed: ${array[j]} <= ${array[j + 1]}`,
            highlightedLines: [5]
          });
        }
      }

      if (!swapped) {
        steps.push({
          array: [...array],
          comparing: [],
          swapped: [],
          description: `Pass ${i + 1} completed. No swaps made - array is sorted!`,
          highlightedLines: [9, 10, 11]
        });
        break;
      } else {
        steps.push({
          array: [...array],
          comparing: [],
          swapped: [],
          description: `Pass ${i + 1} completed`,
          highlightedLines: [2]
        });
      }
    }

    steps.push({
      array: [...array],
      comparing: [],
      swapped: [],
      description: "Sorting completed!",
      highlightedLines: [12]
    });

    return steps;
  };

  const generateSteps = (arr, algorithmName) => {
    switch (algorithmName) {
      case "Bubble Sort":
        return bubbleSort(arr);
      default:
        return [{
          array: [...arr],
          comparing: [],
          swapped: [],
          description: `${algorithmName} implementation coming soon!`,
          highlightedLines: [1]
        }];
    }
  };

  const handleArraySubmit = (newArray) => {
    console.log("SortingVisualizer received array:", newArray);
    const algorithmName = selectedAlgorithm?.name || selectedAlgorithm;
    console.log("Algorithm name:", algorithmName);
    const generatedSteps = generateSteps(newArray, algorithmName);
    console.log("Generated steps count:", generatedSteps.length);
    console.log("First few steps:", generatedSteps.slice(0, 3));
    setSteps(generatedSteps);
    setCurrentStep(0);
    setIsVisualizationReady(true);
  };

  const handleProgressChange = (progress) => {
    if (steps.length > 0) {
      const stepIndex = Math.floor((progress / 100) * (steps.length - 1));
      setCurrentStep(Math.max(0, Math.min(stepIndex, steps.length - 1)));
    }
  };

  const renderVisualization = () => {
    console.log("renderVisualization called, isReady:", isVisualizationReady, "steps.length:", steps.length, "currentStep:", currentStep);
    
    if (!isVisualizationReady || steps.length === 0) {
      return (
        <div className="array-container">
          <div className="placeholder-message">
            Enter an array and click Generate to start visualization
          </div>
        </div>
      );
    }

    const currentStepData = steps[currentStep];
    console.log("Current step data:", currentStepData);
    
    // Determine CSS class based on array length
    let visualizationClass = "array-visualization";
    if (currentStepData.array.length >= 15) {
      visualizationClass += " very-many-elements";
    } else if (currentStepData.array.length >= 10) {
      visualizationClass += " many-elements";
    }
    
    return (
      <div className="array-container">
        <div className={visualizationClass}>
          {currentStepData.array.map((value, idx) => {
            let className = "array-block";
            
            if (currentStepData.comparing.includes(idx)) {
              className += " comparing";
            }
            if (currentStepData.swapped.includes(idx)) {
              className += " swapped";
            }
            
            return (
              <div key={idx} className={className}>
                <span className="block-value">{value}</span>
                <span className="block-index">{idx}</span>
              </div>
            );
          })}
        </div>
        <div className="step-description">
          <p>{currentStepData.description}</p>
        </div>
      </div>
    );
  };

  const renderCode = (language) => {
    const algorithmNameString = (selectedAlgorithm && selectedAlgorithm.name) 
      ? selectedAlgorithm.name 
      : (typeof selectedAlgorithm === 'string' ? selectedAlgorithm : "UnknownAlgorithm");

    if (algorithmNameString === "Bubble Sort") {
      const currentStepData = steps[currentStep] || { highlightedLines: [] };
      
      const bubbleSortCodes = {
        Python: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        swapped = False
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:
            break
    return arr`,
        
        'C++': `void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        bool swapped = false;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }
        if (!swapped) break;
    }
}`,
        
        Java: `public void bubbleSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++) {
        boolean swapped = false;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = true;
            }
        }
        if (!swapped) break;
    }
}`,
        
        JavaScript: `function bubbleSort(arr) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        let swapped = false;
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapped = true;
            }
        }
        if (!swapped) break;
    }
    return arr;
}`,
        
        C: `void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int swapped = 0;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = 1;
            }
        }
        if (!swapped) break;
    }
}`
      };

      const code = bubbleSortCodes[language] || bubbleSortCodes.JavaScript;
      const lines = code.split('\n');
      
      return (
        <pre>
          <code>
            {lines.map((line, index) => {
              const lineNumber = index + 1;
              const isHighlighted = currentStepData.highlightedLines.includes(lineNumber);
              
              return (
                <div 
                  key={index} 
                  className={`code-line ${isHighlighted ? 'highlighted' : ''}`}
                  style={{
                    backgroundColor: isHighlighted ? '#ffd700' : 'transparent',
                    padding: '2px 4px',
                    margin: '1px 0'
                  }}
                >
                  <span className="line-number" style={{ 
                    color: '#666', 
                    marginRight: '10px', 
                    minWidth: '20px', 
                    display: 'inline-block' 
                  }}>
                    {lineNumber}
                  </span>
                  {line}
                </div>
              );
            })}
          </code>
        </pre>
      );
    }

    // For other algorithms
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

    return <pre><code>{placeholderCodes[language] || `// Code for ${language} not available for ${algorithmNameString}`}</code></pre>;
  };

  const renderStepHistory = () => {
    if (!isVisualizationReady || steps.length === 0) {
      return (
        <div className="step-history-content">
          <p>No steps to display. Enter an array to begin.</p>
        </div>
      );
    }

    return (
      <div className="step-history-content">
        <div className="step-counter">
          Step {currentStep + 1} of {steps.length}
        </div>
        <div className="steps-list">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className={`step-item ${index === currentStep ? 'active' : ''} ${index <= currentStep ? 'completed' : 'pending'}`}
              onClick={() => setCurrentStep(index)}
              style={{ cursor: 'pointer' }}
            >
              <div className="step-number">{index + 1}</div>
              <div className="step-description">{step.description}</div>
              <div className="step-array">
                [{step.array.join(', ')}]
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

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
      onProgressChange={handleProgressChange}
      totalSteps={steps.length}
      currentStep={currentStep}
    />
  );
};

export default SortingVisualizer;