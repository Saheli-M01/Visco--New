import { useMemo } from 'react';
import { categories } from '../data/categories.js';

/**
 * Custom hook to get algorithm counts for all categories
 * This automatically updates when categories data changes
 */
export const useAlgorithmCounts = () => {
  const algorithmCounts = useMemo(() => {
    const counts = {};
    
    // Map through all categories and count algorithms
    Object.entries(categories).forEach(([key, category]) => {
      counts[key] = category.algorithms?.length || 0;
    });
    
    // Handle the mapping between route paths and data keys
    const pathMapping = {
      'sorting': 'sorting',
      'array': 'array', 
      'graph': 'graph',
      'tree': 'tree',
      'linked-list': 'linkedList' // Route uses hyphen, data uses camelCase
    };
    
    const mappedCounts = {};
    Object.entries(pathMapping).forEach(([routePath, dataKey]) => {
      mappedCounts[routePath] = counts[dataKey] || 0;
    });
    
    return mappedCounts;
  }, []);
  
  return algorithmCounts;
};

/**
 * Get count for a specific category
 */
export const useAlgorithmCount = (categoryId) => {
  const counts = useAlgorithmCounts();
  return counts[categoryId] || 0;
};

/**
 * Get total algorithm count across all categories
 */
export const useTotalAlgorithmCount = () => {
  const counts = useAlgorithmCounts();
  return Object.values(counts).reduce((total, count) => total + count, 0);
};