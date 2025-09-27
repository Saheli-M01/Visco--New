import { bubbleSort } from "./sorting/bubbleSort.js";
import { selectionSort } from "./sorting/selectionSort.js";
import { insertionSort } from "./sorting/insertionSort.js";
import { mergeSort } from "./sorting/mergeSort.js";
import { quickSort } from "./sorting/quickSort.js";
import { heapSort } from "./sorting/heapSort.js";
import { bucketSort } from "./sorting/bucketSort.js";
import { radixSort } from "./sorting/radixSort.js";
import { shellSort } from "./sorting/shellSort.js";
import { countingSort } from "./sorting/countingSort.js";

// Algorithm factory to get the appropriate algorithm implementation
export const getAlgorithm = (algorithmName) => {
  const algorithmMap = {
    "Bubble Sort": bubbleSort,
    "bubble sort": bubbleSort,
    bubblesort: bubbleSort,
    "Selection Sort": selectionSort,
    "selection sort": selectionSort,
    selectionsort: selectionSort,
    "Insertion Sort": insertionSort,
    "insertion sort": insertionSort,
    insertionsort: insertionSort,
    "Merge Sort": mergeSort,
    "merge sort": mergeSort,
    mergesort: mergeSort,
    "Quick Sort": quickSort,
    "quick sort": quickSort,
    quicksort: quickSort,
    "Heap Sort": heapSort,
    "heap sort": heapSort,
    heapsort: heapSort,
    "Bucket Sort": bucketSort,
    "bucket sort": bucketSort,
    bucketsort: bucketSort,
    "Radix Sort": radixSort,
    "radix sort": radixSort,
    radixsort: radixSort,
    "Shell Sort": shellSort,
    "shell sort": shellSort,
    shellsort: shellSort,
    "Counting Sort": countingSort,
    "counting sort": countingSort,
    countingsort: countingSort,
  };

  const normalizedName = algorithmName?.toLowerCase().replace(/\s+/g, "");

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
    name: algorithmName || "Unknown Algorithm",
    generateSteps: (arr) => [
      {
        array: [...arr],
        comparing: [],
        swapped: [],
        description: `${algorithmName} implementation coming soon!`,
      },
    ],
    getCode: (language) => `// ${algorithmName} implementation in ${language}
// Coming soon...

function ${
      algorithmName
        ? algorithmName.toLowerCase().replace(/\s+/g, "")
        : "algorithm"
    }() {
    // Implementation will be added soon
}`,
  };
};

// Helper function to parse array input
export const parseArray = (input) => {
  return input
    .split(",")
    .map((item) => parseFloat(item.trim()))
    .filter((num) => !isNaN(num));
};
