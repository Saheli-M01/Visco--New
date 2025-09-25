import { bubbleSort } from './sorting/bubbleSort.js';

// Algorithm factory to get the appropriate algorithm implementation
export const getAlgorithm = (algorithmName) => {
  const algorithmMap = {
    'Bubble Sort': bubbleSort,
    'bubble sort': bubbleSort,
    'bubblesort': bubbleSort,
  };

  const normalizedName = algorithmName?.toLowerCase().replace(/\s+/g, '');
  
  // Try exact match first
  if (algorithmMap[algorithmName]) {
    return algorithmMap[algorithmName];
  }
  
  // Try normalized match
  if (algorithmMap[normalizedName]) {
    return algorithmMap[normalizedName];
  }

  // Return placeholder for unsupported algorithms
  return {
    name: algorithmName || 'Unknown Algorithm',
    generateSteps: (arr) => [
      {
        array: [...arr],
        comparing: [],
        swapped: [],
        description: `${algorithmName} implementation coming soon!`
      }
    ],
    getCode: (language) => `// ${algorithmName} implementation in ${language}
// Coming soon...

function ${algorithmName ? algorithmName.toLowerCase().replace(/\s+/g, '') : 'algorithm'}() {
    // Implementation will be added soon
}`
  };
};

// Helper function to parse array input
export const parseArray = (input) => {
  return input
    .split(',')
    .map(item => parseFloat(item.trim()))
    .filter(num => !isNaN(num));
};