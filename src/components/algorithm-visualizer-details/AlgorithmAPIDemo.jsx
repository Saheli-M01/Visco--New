import React, { useState } from 'react';
import { 
  addAlgorithm, 
  removeAlgorithm, 
  getAlgorithmCount, 
  examples,
  logAlgorithmCounts 
} from '../../data/algorithmAPI.js';
import { useAlgorithmCounts } from '../../hooks/useAlgorithmCounts.js';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Minus, Info } from 'lucide-react';

/**
 * Demo component showing the dynamic algorithm counting API
 * This would typically be used in admin panels or development tools
 */
export const AlgorithmAPIDemo = () => {
  const algorithmCounts = useAlgorithmCounts();
  const [lastAction, setLastAction] = useState('');

  // Example: Add a new sorting algorithm
  const handleAddSortingAlgorithm = () => {
    const success = addAlgorithm('sorting', {
      name: "Radix Sort",
      complexity: "O(d × n)",
      difficulty: "Medium",
      shortDescription: "Non-comparative sorting algorithm that sorts integers digit by digit."
    });
    
    if (success) {
      setLastAction('✅ Added Radix Sort to Sorting algorithms');
      // Force re-render by updating a state
      window.dispatchEvent(new CustomEvent('algorithmUpdate'));
    } else {
      setLastAction('❌ Failed to add Radix Sort (might already exist)');
    }
  };

  // Example: Add array algorithm
  const handleAddArrayAlgorithm = () => {
    const success = addAlgorithm('array', {
      name: "Floyd's Cycle Detection",
      complexity: "O(n)",
      difficulty: "Medium", 
      shortDescription: "Detect cycles in sequences using tortoise and hare pointers."
    });
    
    if (success) {
      setLastAction('✅ Added Floyd\'s Cycle Detection to Array algorithms');
      window.dispatchEvent(new CustomEvent('algorithmUpdate'));
    } else {
      setLastAction('❌ Failed to add Floyd\'s Cycle Detection (might already exist)');
    }
  };

  // Example: Remove an algorithm  
  const handleRemoveAlgorithm = () => {
    const success = removeAlgorithm('sorting', 'Radix Sort');
    
    if (success) {
      setLastAction('✅ Removed Radix Sort from Sorting algorithms');
      window.dispatchEvent(new CustomEvent('algorithmUpdate'));
    } else {
      setLastAction('❌ Failed to remove Radix Sort (might not exist)');
    }
  };

  // Log current counts to console
  const handleLogCounts = () => {
    logAlgorithmCounts();
    setLastAction('📊 Check console for detailed algorithm counts');
  };

  return (
    <Card className="w-full max-w-4xl mx-auto mt-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Info className="h-5 w-5" />
          Algorithm Management API Demo
        </CardTitle>
        <p className="text-sm text-gray-600">
          This demo shows how the algorithm counting system works dynamically. 
          The counts in the Topics page will update automatically when algorithms are added or removed.
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Current Counts Display */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Current Algorithm Counts</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {Object.entries(algorithmCounts).map(([category, count]) => (
              <Badge key={category} variant="outline" className="p-2 text-center">
                <div className="flex flex-col">
                  <span className="capitalize text-xs">{category.replace('-', ' ')}</span>
                  <span className="font-bold text-lg">{count}</span>
                </div>
              </Badge>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Test API Functions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Button 
                onClick={handleAddSortingAlgorithm}
                className="w-full"
                variant="default"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Sorting Algorithm
              </Button>
              
              <Button 
                onClick={handleAddArrayAlgorithm}
                className="w-full"
                variant="default"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Array Algorithm
              </Button>
            </div>
            
            <div className="space-y-2">
              <Button 
                onClick={handleRemoveAlgorithm}
                className="w-full"
                variant="destructive"
              >
                <Minus className="h-4 w-4 mr-2" />
                Remove Algorithm
              </Button>
              
              <Button 
                onClick={handleLogCounts}
                className="w-full"
                variant="outline"
              >
                <Info className="h-4 w-4 mr-2" />
                Log Counts to Console
              </Button>
            </div>
          </div>
        </div>

        {/* Last Action Status */}
        {lastAction && (
          <div className="bg-gray-50 p-3 rounded-lg">
            <h4 className="text-sm font-semibold mb-1">Last Action:</h4>
            <p className="text-sm">{lastAction}</p>
          </div>
        )}

        {/* Usage Instructions */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="text-sm font-semibold mb-2">💡 How it Works:</h4>
          <ul className="text-sm space-y-1 list-disc list-inside">
            <li>The Topics page automatically reads algorithm counts from the categories.js file</li>
            <li>When you add/remove algorithms using the API, the counts update immediately</li>
            <li>No manual count updates needed - it's all automatic!</li>
            <li>Perfect for CMS integration, admin panels, or dynamic content management</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default AlgorithmAPIDemo;