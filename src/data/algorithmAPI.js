import { categories } from './categories.js';

/**
 * Algorithm Management API
 * These functions provide an API-like interface to manage algorithms
 */

/**
 * Add a new algorithm to a specific category
 * @param {string} categoryId - The category ID (sorting, array, graph, tree, linkedList)
 * @param {Object} algorithm - Algorithm object with name, complexity, difficulty, shortDescription
 * @returns {boolean} Success status
 */
export const addAlgorithm = (categoryId, algorithm) => {
  try {
    // Validate inputs
    if (!categoryId || !algorithm) {
      console.error('Category ID and algorithm object are required');
      return false;
    }

    const requiredFields = ['name', 'complexity', 'difficulty', 'shortDescription'];
    const missingFields = requiredFields.filter(field => !algorithm[field]);
    
    if (missingFields.length > 0) {
      console.error(`Missing required fields: ${missingFields.join(', ')}`);
      return false;
    }

    // Check if category exists
    if (!categories[categoryId]) {
      console.error(`Category '${categoryId}' does not exist`);
      return false;
    }

    // Check if algorithm already exists
    const existingAlgorithm = categories[categoryId].algorithms.find(
      alg => alg.name.toLowerCase() === algorithm.name.toLowerCase()
    );

    if (existingAlgorithm) {
      console.error(`Algorithm '${algorithm.name}' already exists in category '${categoryId}'`);
      return false;
    }

    // Add the algorithm
    categories[categoryId].algorithms.push({
      name: algorithm.name,
      complexity: algorithm.complexity,
      difficulty: algorithm.difficulty,
      shortDescription: algorithm.shortDescription,
      ...(algorithm.longDescription && { longDescription: algorithm.longDescription }),
      ...(algorithm.tags && { tags: algorithm.tags })
    });

    console.log(`✅ Successfully added '${algorithm.name}' to '${categoryId}' category`);
    return true;

  } catch (error) {
    console.error('Error adding algorithm:', error);
    return false;
  }
};

/**
 * Remove an algorithm from a category
 * @param {string} categoryId - The category ID
 * @param {string} algorithmName - The name of the algorithm to remove
 * @returns {boolean} Success status
 */
export const removeAlgorithm = (categoryId, algorithmName) => {
  try {
    if (!categories[categoryId]) {
      console.error(`Category '${categoryId}' does not exist`);
      return false;
    }

    const algorithmIndex = categories[categoryId].algorithms.findIndex(
      alg => alg.name.toLowerCase() === algorithmName.toLowerCase()
    );

    if (algorithmIndex === -1) {
      console.error(`Algorithm '${algorithmName}' not found in category '${categoryId}'`);
      return false;
    }

    categories[categoryId].algorithms.splice(algorithmIndex, 1);
    console.log(`✅ Successfully removed '${algorithmName}' from '${categoryId}' category`);
    return true;

  } catch (error) {
    console.error('Error removing algorithm:', error);
    return false;
  }
};

/**
 * Get algorithm count for a specific category
 * @param {string} categoryId - The category ID
 * @returns {number} Number of algorithms in the category
 */
export const getAlgorithmCount = (categoryId) => {
  return categories[categoryId]?.algorithms?.length || 0;
};

/**
 * Get all algorithms from a category
 * @param {string} categoryId - The category ID
 * @returns {Array} Array of algorithms
 */
export const getAlgorithms = (categoryId) => {
  return categories[categoryId]?.algorithms || [];
};

/**
 * Update an existing algorithm
 * @param {string} categoryId - The category ID
 * @param {string} algorithmName - Current name of the algorithm
 * @param {Object} updates - Fields to update
 * @returns {boolean} Success status
 */
export const updateAlgorithm = (categoryId, algorithmName, updates) => {
  try {
    if (!categories[categoryId]) {
      console.error(`Category '${categoryId}' does not exist`);
      return false;
    }

    const algorithmIndex = categories[categoryId].algorithms.findIndex(
      alg => alg.name.toLowerCase() === algorithmName.toLowerCase()
    );

    if (algorithmIndex === -1) {
      console.error(`Algorithm '${algorithmName}' not found in category '${categoryId}'`);
      return false;
    }

    // Update the algorithm
    categories[categoryId].algorithms[algorithmIndex] = {
      ...categories[categoryId].algorithms[algorithmIndex],
      ...updates
    };

    console.log(`✅ Successfully updated '${algorithmName}' in '${categoryId}' category`);
    return true;

  } catch (error) {
    console.error('Error updating algorithm:', error);
    return false;
  }
};

/**
 * Get total count across all categories
 * @returns {number} Total number of algorithms
 */
export const getTotalAlgorithmCount = () => {
  return Object.values(categories).reduce((total, category) => {
    return total + (category.algorithms?.length || 0);
  }, 0);
};

/**
 * Example usage functions for demonstration
 */
export const examples = {
  // Add a new sorting algorithm
  addBubbleSortVariant: () => {
    return addAlgorithm('sorting', {
      name: "Cocktail Shaker Sort",
      complexity: "O(n²)",
      difficulty: "Easy",
      shortDescription: "Bidirectional bubble sort that alternates between forward and backward passes.",
      tags: ["comparison", "stable", "in-place"]
    });
  },

  // Add a new array algorithm
  addArrayAlgorithm: () => {
    return addAlgorithm('array', {
      name: "Boyer-Moore Majority Vote",
      complexity: "O(n)",
      difficulty: "Medium", 
      shortDescription: "Find majority element in array using constant space algorithm.",
      tags: ["voting", "majority", "linear-time"]
    });
  }
};

// Development helper - log current counts
export const logAlgorithmCounts = () => {
  console.log("📊 Current Algorithm Counts:");
  Object.entries(categories).forEach(([key, category]) => {
    console.log(`  ${key}: ${category.algorithms?.length || 0} algorithms`);
  });
  console.log(`  Total: ${getTotalAlgorithmCount()} algorithms`);
};