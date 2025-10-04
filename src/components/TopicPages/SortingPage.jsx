import React from "react";
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

  const complexityData = [
    {
      name: "Bubble Sort",
      best: "O(n)",
      average: "O(n²)",
      worst: "O(n²)",
      space: "O(1)"
    },
    {
      name: "Selection Sort",
      best: "O(n²)",
      average: "O(n²)",
      worst: "O(n²)",
      space: "O(1)"
    },
    {
      name: "Insertion Sort",
      best: "O(n)",
      average: "O(n²)",
      worst: "O(n²)",
      space: "O(1)"
    },
    {
      name: "Shell Sort",
      best: "O(n log n)",
      average: "O(n¹·²⁵)",
      worst: "O(n²)",
      space: "O(1)"
    },
    {
      name: "Counting Sort",
      best: "O(n + k)",
      average: "O(n + k)",
      worst: "O(n + k)",
      space: "O(n + k)"
    },
    {
      name: "Radix Sort",
      best: "O(nk)",
      average: "O(nk)",
      worst: "O(nk)",
      space: "O(n + k)"
    },
    {
      name: "Bucket Sort",
      best: "O(n + k)",
      average: "O(n + k)",
      worst: "O(n²)",
      space: "O(n + k)"
    },
    {
      name: "Merge Sort",
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n log n)",
      space: "O(n)"
    },
    {
      name: "Quick Sort",
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n²)",
      space: "O(log n)"
    },
    {
      name: "Heap Sort",
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n log n)",
      space: "O(1)"
    }
  ];

  return (
    <CategoryLayout 
      category={sortingCategory}
      features={sortingFeatures}
      complexityData={complexityData}
    />
  );
};

export default SortingPage;