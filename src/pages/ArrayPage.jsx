import React from "react";
import { motion } from "framer-motion";
import CategoryLayout from "@/components/CategoryLayout";
import { categories } from "@/data/categories";

const ArrayPage = () => {
  const arrayCategory = categories.array;

  const arrayPatterns = [
    {
      title: "Two Pointers",
      description: "Use two pointers moving toward each other or in same direction to solve problems in O(n) time.",
      useCases: ["Pair sum problems", "Palindrome checking", "Container with most water"]
    },
    {
      title: "Sliding Window",
      description: "Maintain a window of elements and slide it across the array to find optimal solutions.",
      useCases: ["Maximum sum subarray", "Longest substring", "Minimum window substring"]
    },
    {
      title: "Binary Search",
      description: "Efficiently search in sorted arrays by eliminating half of search space in each step.",
      useCases: ["Search in rotated array", "Find peak element", "Search insert position"]
    }
  ];

  const complexityGuide = [
    { operation: "Access element", complexity: "O(1)", description: "Direct index access" },
    { operation: "Search (unsorted)", complexity: "O(n)", description: "Linear scan required" },
    { operation: "Search (sorted)", complexity: "O(log n)", description: "Binary search possible" },
    { operation: "Insert at end", complexity: "O(1)", description: "Amortized for dynamic arrays" },
    { operation: "Insert at beginning", complexity: "O(n)", description: "Shift all elements" },
    { operation: "Delete at end", complexity: "O(1)", description: "No shifting needed" },
    { operation: "Delete at beginning", complexity: "O(n)", description: "Shift all elements" }
  ];

  return (
    <CategoryLayout category={arrayCategory}>
      {/* Array Patterns */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-16"
      >
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl px-8 py-12 shadow-xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Common Array Patterns
          </h2>
          <p className="text-lg text-gray-700 font-medium leading-relaxed mb-8">
            {arrayCategory.longDescription}
          </p>
          
          <div className="grid lg:grid-cols-3 gap-6">
            {arrayPatterns.map((pattern, index) => (
              <motion.div
                key={pattern.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="backdrop-blur-sm bg-white/20 border border-white/30 rounded-xl p-6"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {pattern.title}
                </h3>
                <p className="text-gray-700 font-medium mb-4 text-sm leading-relaxed">
                  {pattern.description}
                </p>
                
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-gray-900 mb-2">Use Cases:</p>
                  <ul className="space-y-1">
                    {pattern.useCases.map((useCase, idx) => (
                      <li key={idx} className="text-sm text-gray-700 flex items-start">
                        <span className="w-1.5 h-1.5 bg-gray-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                        {useCase}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Array Operations Complexity */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="mb-16"
      >
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl px-8 py-12 shadow-xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Array Operations Complexity
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {complexityGuide.map((item, index) => (
              <motion.div
                key={item.operation}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="backdrop-blur-sm bg-white/20 border border-white/30 rounded-xl p-6 flex items-center justify-between"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {item.operation}
                  </h3>
                  <p className="text-sm text-gray-700 font-medium">
                    {item.description}
                  </p>
                </div>
                <code className="bg-white/30 px-3 py-1 rounded-lg text-gray-900 font-mono font-bold">
                  {item.complexity}
                </code>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </CategoryLayout>
  );
};

export default ArrayPage;