import React from "react";
import { motion } from "framer-motion";
import { CategoryLayout } from "@/components/layout";
import { categories } from "@/data/categories";

const SortingPage = () => {
  const sortingCategory = categories.sorting;

  const sortingFeatures = [
    {
      title: "Time Complexity Analysis",
      description: "Learn to evaluate and compare different sorting algorithms based on their performance characteristics."
    },
    {
      title: "Stability & In-Place Sorting", 
      description: "Understand the difference between stable and unstable sorts, and memory-efficient in-place algorithms."
    },
    {
      title: "Real-World Applications",
      description: "Discover where each sorting algorithm excels in practical scenarios and system design."
    }
  ];

  return (
    <CategoryLayout category={sortingCategory}>
      {/* Why Sorting Matters */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-16"
      >
        <div className="backdrop-blur-md bg-white/50 border border-white/20 rounded-3xl px-8 py-12 shadow-xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Why Learn Sorting Algorithms?
          </h2>
          <p className="text-lg text-gray-700 font-medium leading-relaxed mb-8">
            {sortingCategory.longDescription}
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {sortingFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="backdrop-blur-sm bg-white  border border-gray-300/30 rounded-xl p-6 text-center"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-700 font-medium text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Sorting Complexity Comparison */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="mb-16"
      >
        <div className="backdrop-blur-md bg-white/10 border border-white/60 rounded-3xl px-8 py-12 shadow-xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Complexity Comparison
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="pb-4 text-gray-900 font-semibold">Algorithm</th>
                  <th className="pb-4 text-gray-900 font-semibold text-center">Best Case</th>
                  <th className="pb-4 text-gray-900 font-semibold text-center">Average Case</th>
                  <th className="pb-4 text-gray-900 font-semibold text-center">Worst Case</th>
                  <th className="pb-4 text-gray-900 font-semibold text-center">Space</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr className="border-b border-white/10">
                  <td className="py-3 font-medium">Bubble Sort</td>
                  <td className="py-3 text-center font-mono">O(n)</td>
                  <td className="py-3 text-center font-mono">O(n²)</td>
                  <td className="py-3 text-center font-mono">O(n²)</td>
                  <td className="py-3 text-center font-mono">O(1)</td>
                </tr>

                <tr className="border-b border-white/10">
                  <td className="py-3 font-medium">Selection Sort</td>
                  <td className="py-3 text-center font-mono">O(n²)</td>
                  <td className="py-3 text-center font-mono">O(n²)</td>
                  <td className="py-3 text-center font-mono">O(n²)</td>
                  <td className="py-3 text-center font-mono">O(1)</td>
                </tr>

                <tr className="border-b border-white/10">
                  <td className="py-3 font-medium">Insertion Sort</td>
                  <td className="py-3 text-center font-mono">O(n)</td>
                  <td className="py-3 text-center font-mono">O(n²)</td>
                  <td className="py-3 text-center font-mono">O(n²)</td>
                  <td className="py-3 text-center font-mono">O(1)</td>
                </tr>

                <tr className="border-b border-white/10">
                  <td className="py-3 font-medium">Shell Sort</td>
                  <td className="py-3 text-center font-mono">O(n log n)</td>
                  <td className="py-3 text-center font-mono">O(n¹·²⁵)</td>
                  <td className="py-3 text-center font-mono">O(n²)</td>
                  <td className="py-3 text-center font-mono">O(1)</td>
                </tr>

                <tr className="border-b border-white/10">
                  <td className="py-3 font-medium">Counting Sort</td>
                  <td className="py-3 text-center font-mono">O(n + k)</td>
                  <td className="py-3 text-center font-mono">O(n + k)</td>
                  <td className="py-3 text-center font-mono">O(n + k)</td>
                  <td className="py-3 text-center font-mono">O(n + k)</td>
                </tr>

                <tr className="border-b border-white/10">
                  <td className="py-3 font-medium">Radix Sort</td>
                  <td className="py-3 text-center font-mono">O(nk)</td>
                  <td className="py-3 text-center font-mono">O(nk)</td>
                  <td className="py-3 text-center font-mono">O(nk)</td>
                  <td className="py-3 text-center font-mono">O(n + k)</td>
                </tr>

                <tr className="border-b border-white/10">
                  <td className="py-3 font-medium">Bucket Sort</td>
                  <td className="py-3 text-center font-mono">O(n + k)</td>
                  <td className="py-3 text-center font-mono">O(n + k)</td>
                  <td className="py-3 text-center font-mono">O(n²)</td>
                  <td className="py-3 text-center font-mono">O(n + k)</td>
                </tr>

                <tr className="border-b border-white/10">
                  <td className="py-3 font-medium">Merge Sort</td>
                  <td className="py-3 text-center font-mono">O(n log n)</td>
                  <td className="py-3 text-center font-mono">O(n log n)</td>
                  <td className="py-3 text-center font-mono">O(n log n)</td>
                  <td className="py-3 text-center font-mono">O(n)</td>
                </tr>

                <tr className="border-b border-white/10">
                  <td className="py-3 font-medium">Quick Sort</td>
                  <td className="py-3 text-center font-mono">O(n log n)</td>
                  <td className="py-3 text-center font-mono">O(n log n)</td>
                  <td className="py-3 text-center font-mono">O(n²)</td>
                  <td className="py-3 text-center font-mono">O(log n)</td>
                </tr>

                <tr className="border-b border-white/10">
                  <td className="py-3 font-medium">Heap Sort</td>
                  <td className="py-3 text-center font-mono">O(n log n)</td>
                  <td className="py-3 text-center font-mono">O(n log n)</td>
                  <td className="py-3 text-center font-mono">O(n log n)</td>
                  <td className="py-3 text-center font-mono">O(1)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </CategoryLayout>
  );
};

export default SortingPage;