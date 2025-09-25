import React from "react";
import { motion } from "framer-motion";
import { Clock, BarChart3, Code, Play, BookOpen } from "lucide-react";

const AlgorithmDetails = ({ algorithm, topic }) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "text-green-600 bg-green-100/50";
      case "Medium":
        return "text-yellow-600 bg-yellow-100/50";
      case "Hard":
        return "text-red-600 bg-red-100/50";
      default:
        return "text-gray-600 bg-gray-100/50";
    }
  };

  // Sample algorithm data - you can expand this based on your needs
  const getAlgorithmContent = (algorithmName) => {
    const content = {
      "Bubble Sort": {
        description:
          "Bubble Sort is the simplest sorting algorithm that works by repeatedly swapping the adjacent elements if they are in the wrong order. This algorithm is not suitable for large data sets as its average and worst-case time complexity is quite high.",
        howItWorks: [
          "Compare adjacent elements in the array",
          "Swap them if they are in the wrong order",
          "Continue until no more swaps are needed",
          "The largest element 'bubbles' to the end in each pass",
        ],
        pseudoCode: `procedure bubbleSort(A : list of sortable items)
    n := length(A)
    repeat
        swapped := false
        for i := 1 to n - 1 inclusive do
            if A[i - 1] > A[i] then
                swap(A[i - 1], A[i])
                swapped = true
            end if
        end for
        n := n - 1
    until not swapped
end procedure`,
        timeComplexity: {
          best: "O(n)",
          average: "O(n²)",
          worst: "O(n²)",
        },
        spaceComplexity: "O(1)",
      },
      "Binary Search": {
        description:
          "Binary Search is a searching algorithm used in a sorted array by repeatedly dividing the search interval in half. It compares the target value to the middle element of the array.",
        howItWorks: [
          "Start with the entire sorted array",
          "Find the middle element",
          "Compare with target value",
          "If equal, return the position",
          "If target is smaller, search the left half",
          "If target is larger, search the right half",
          "Repeat until found or array is exhausted",
        ],
        pseudoCode: `procedure binarySearch(A, target)
    low := 0
    high := length(A) - 1
    
    while low <= high do
        mid := floor((low + high) / 2)
        if A[mid] = target then
            return mid
        else if A[mid] < target then
            low := mid + 1
        else
            high := mid - 1
        end if
    end while
    
    return -1
end procedure`,
        timeComplexity: {
          best: "O(1)",
          average: "O(log n)",
          worst: "O(log n)",
        },
        spaceComplexity: "O(1)",
      },
      // Add more algorithms as needed
    };

    return (
      content[algorithmName] || {
        description: `${algorithmName} is an important algorithm in computer science. This is a placeholder description that will be replaced with detailed content.`,
        howItWorks: [
          "Step 1: Algorithm initialization",
          "Step 2: Main processing logic",
          "Step 3: Result computation",
          "Step 4: Return final result",
        ],
        pseudoCode: `// Pseudocode for ${algorithmName}
// Implementation details coming soon...`,
        timeComplexity: {
          best: algorithm.complexity,
          average: algorithm.complexity,
          worst: algorithm.complexity,
        },
        spaceComplexity: "O(1)",
      }
    );
  };

  const content = getAlgorithmContent(algorithm.name);

  return (
    <div className="space-y-8">
      {/* Algorithm Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="backdrop-blur-sm bg-white/20 border border-white/30 rounded-2xl p-6 shadow-xl"
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {algorithm.name}
            </h3>
            <p className="text-gray-700 font-medium">{topic.title}</p>
          </div>
          <div className="flex items-center gap-3">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(
                algorithm.difficulty
              )}`}
            >
              {algorithm.difficulty}
            </span>
            <div className="flex items-center text-gray-600 bg-white/30 px-3 py-1 rounded-full">
              <Clock className="h-4 w-4 mr-1" />
              <span className="font-mono text-sm">{algorithm.complexity}</span>
            </div>
          </div>
        </div>

        <p className="text-gray-700 leading-relaxed font-medium">
          {content.description}
        </p>
      </motion.div>

      {/* How It Works */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="backdrop-blur-sm bg-white/20 border border-white/30 rounded-2xl p-6 shadow-xl"
      >
        <div className="flex items-center mb-4">
          <BookOpen className="h-5 w-5 text-gray-900 mr-2" />
          <h4 className="text-xl font-semibold text-gray-900">How It Works</h4>
        </div>
        <ol className="space-y-3">
          {content.howItWorks.map((step, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
              className="flex items-start"
            >
              <span className="inline-flex items-center justify-center w-6 h-6 bg-white/30 text-gray-900 rounded-full text-sm font-bold mr-3 mt-0.5 flex-shrink-0">
                {index + 1}
              </span>
              <span className="text-gray-700 font-medium">{step}</span>
            </motion.li>
          ))}
        </ol>
      </motion.div>

      {/* Time & Space Complexity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid md:grid-cols-2 gap-6"
      >
        <div className="backdrop-blur-sm bg-white/20 border border-white/30 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center mb-4">
            <BarChart3 className="h-5 w-5 text-gray-900 mr-2" />
            <h4 className="text-lg font-semibold text-gray-900">
              Time Complexity
            </h4>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-700">Best Case:</span>
              <code className="bg-white/30 px-2 py-1 rounded text-gray-900 font-mono">
                {content.timeComplexity.best}
              </code>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Average Case:</span>
              <code className="bg-white/30 px-2 py-1 rounded text-gray-900 font-mono">
                {content.timeComplexity.average}
              </code>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Worst Case:</span>
              <code className="bg-white/30 px-2 py-1 rounded text-gray-900 font-mono">
                {content.timeComplexity.worst}
              </code>
            </div>
          </div>
        </div>

        <div className="backdrop-blur-sm bg-white/20 border border-white/30 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center mb-4">
            <BarChart3 className="h-5 w-5 text-gray-900 mr-2" />
            <h4 className="text-lg font-semibold text-gray-900">
              Space Complexity
            </h4>
          </div>
          <code className="bg-white/30 px-4 py-2 rounded-lg text-gray-900 font-mono text-lg">
            {content.spaceComplexity}
          </code>
        </div>
      </motion.div>
    </div>
  );
};

export default AlgorithmDetails;
