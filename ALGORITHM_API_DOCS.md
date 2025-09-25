# Dynamic Algorithm Counting System

## Overview

This system automatically counts algorithms from the `categories.js` data file and displays the counts in the Topics page. When you add or remove algorithms, the counts update automatically without any manual intervention.

## 🚀 Key Features

- **Automatic Counting**: Algorithm counts are calculated dynamically from the data source
- **Real-time Updates**: Changes reflect immediately in the UI
- **API Interface**: Easy-to-use functions for managing algorithms
- **Type Safety**: Validation and error handling for data integrity
- **Performance Optimized**: Uses React hooks and memoization

## 📁 File Structure

```
src/
├── data/
│   ├── categories.js       # Main data source
│   └── algorithmAPI.js     # Management API functions
├── hooks/
│   └── useAlgorithmCounts.js # Custom hook for counting
└── components/
    ├── Topics.jsx          # Updated to use dynamic counts
    └── AlgorithmAPIDemo.jsx # Demo component (optional)
```

## 🔧 How to Add New Algorithms

### Method 1: Using the API Functions

```javascript
import { addAlgorithm } from '../data/algorithmAPI.js';

// Add a new sorting algorithm
const success = addAlgorithm('sorting', {
  name: "Tim Sort",
  complexity: "O(n log n)",
  difficulty: "Hard",
  shortDescription: "Hybrid sorting algorithm derived from merge sort and insertion sort."
});

if (success) {
  console.log("Algorithm added successfully!");
  // The Topics page will automatically show the updated count
}
```

### Method 2: Direct Data Modification

Simply add the algorithm object to the appropriate category in `src/data/categories.js`:

```javascript
export const categories = {
  sorting: {
    id: "sorting",
    algorithms: [
      // ... existing algorithms
      {
        name: "New Algorithm",
        complexity: "O(n)",
        difficulty: "Easy",
        shortDescription: "Description of the new algorithm."
      }
    ]
  }
  // ... other categories
};
```

## 📊 API Reference

### Core Functions

#### `addAlgorithm(categoryId, algorithm)`
- **Purpose**: Add a new algorithm to a category
- **Parameters**:
  - `categoryId`: string ('sorting', 'array', 'graph', 'tree', 'linkedList')
  - `algorithm`: object with required fields (name, complexity, difficulty, shortDescription)
- **Returns**: boolean (success status)

#### `removeAlgorithm(categoryId, algorithmName)`
- **Purpose**: Remove an algorithm from a category
- **Parameters**:
  - `categoryId`: string
  - `algorithmName`: string (name of algorithm to remove)
- **Returns**: boolean (success status)

#### `getAlgorithmCount(categoryId)`
- **Purpose**: Get count for specific category
- **Parameters**: `categoryId`: string
- **Returns**: number

#### `updateAlgorithm(categoryId, algorithmName, updates)`
- **Purpose**: Update an existing algorithm
- **Parameters**:
  - `categoryId`: string
  - `algorithmName`: string (current name)
  - `updates`: object (fields to update)
- **Returns**: boolean (success status)

### React Hooks

#### `useAlgorithmCounts()`
- **Purpose**: Get all algorithm counts for UI display
- **Returns**: object with counts for each category
- **Example**: `{ sorting: 6, array: 8, graph: 7, tree: 6, 'linked-list': 5 }`

#### `useAlgorithmCount(categoryId)`
- **Purpose**: Get count for a single category
- **Parameters**: `categoryId`: string
- **Returns**: number

#### `useTotalAlgorithmCount()`
- **Purpose**: Get total count across all categories
- **Returns**: number

## 🎯 Usage Examples

### Adding Multiple Algorithms

```javascript
import { addAlgorithm } from '../data/algorithmAPI.js';

const newSortingAlgorithms = [
  {
    name: "Counting Sort",
    complexity: "O(n + k)",
    difficulty: "Medium",
    shortDescription: "Integer sorting algorithm using counting technique."
  },
  {
    name: "Bucket Sort", 
    complexity: "O(n + k)",
    difficulty: "Medium",
    shortDescription: "Distributes elements into buckets then sorts buckets individually."
  }
];

newSortingAlgorithms.forEach(algorithm => {
  addAlgorithm('sorting', algorithm);
});
```

### Creating a Custom Management Interface

```javascript
import React from 'react';
import { useAlgorithmCounts, addAlgorithm } from '../hooks/useAlgorithmCounts.js';
import { addAlgorithm } from '../data/algorithmAPI.js';

const AlgorithmManager = () => {
  const counts = useAlgorithmCounts();
  
  const handleAddAlgorithm = (category) => {
    const algorithm = {
      name: prompt("Algorithm name:"),
      complexity: prompt("Time complexity:"),
      difficulty: prompt("Difficulty:"),
      shortDescription: prompt("Short description:")
    };
    
    if (algorithm.name) {
      addAlgorithm(category, algorithm);
    }
  };

  return (
    <div>
      <h2>Algorithm Counts</h2>
      {Object.entries(counts).map(([category, count]) => (
        <div key={category}>
          <span>{category}: {count}</span>
          <button onClick={() => handleAddAlgorithm(category)}>
            Add Algorithm
          </button>
        </div>
      ))}
    </div>
  );
};
```

## 🔄 Real-time Updates

The system automatically updates when:
- Algorithms are added via API functions
- Algorithms are removed via API functions  
- The categories.js file is modified directly
- The component re-renders (React's reactive system)

## ⚡ Performance

- **Memoization**: Counts are memoized to prevent unnecessary recalculations
- **Optimized Rendering**: Only affected components re-render when data changes
- **Efficient Mapping**: Smart mapping between route paths and data keys

## 🛠️ Integration with CMS

This system is perfect for CMS integration:

```javascript
// Example CMS integration
const cmsAddAlgorithm = async (categoryId, algorithmData) => {
  try {
    // Save to CMS/Database
    await cms.saveAlgorithm(categoryId, algorithmData);
    
    // Update local state
    const success = addAlgorithm(categoryId, algorithmData);
    
    if (success) {
      // Notify UI of update
      window.dispatchEvent(new CustomEvent('algorithmUpdate'));
    }
    
    return success;
  } catch (error) {
    console.error('CMS save failed:', error);
    return false;
  }
};
```

## 🎉 Benefits

1. **Zero Manual Updates**: Never manually update algorithm counts again
2. **Data Integrity**: Single source of truth for algorithm data
3. **Developer Friendly**: Easy-to-use API for adding/removing algorithms
4. **Scalable**: Easily extensible for new categories or features
5. **Type Safe**: Built-in validation prevents data corruption
6. **Performance**: Optimized for React's rendering system

## 🔍 Debugging

Use the development helpers:

```javascript
import { logAlgorithmCounts } from '../data/algorithmAPI.js';

// Log current counts to console
logAlgorithmCounts();

// Output:
// 📊 Current Algorithm Counts:
//   sorting: 6 algorithms  
//   array: 8 algorithms
//   graph: 7 algorithms
//   tree: 6 algorithms
//   linkedList: 5 algorithms
//   Total: 32 algorithms
```