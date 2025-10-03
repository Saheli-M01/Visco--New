export const description = "Heap Sort builds a heap from the input, then repeatedly extracts the maximum element to produce a sorted array.";
export const howItWorks = [
  "Build a max-heap from the input array",
  "Swap the root (max) with the last element and reduce the heap size",
  "Heapify the root to restore max-heap property and repeat",
];

export const timeComplexity = {
  best: "O(n log n)",
  average: "O(n log n)",
  worst: "O(n log n)",
};

export const spaceComplexity = "O(1)";

export const pseudoCode = `heapSort(A):\n  buildMaxHeap(A)\n  for i = n-1 downto 1:\n    swap(A[0], A[i])\n    heapSize--\n    heapify(A, 0)`;

const codes = {
  javascript: `// Heap Sort - JavaScript (runnable)
function heapify(arr, n, i) {
  let largest = i;
  let l = 2 * i + 1;
  let r = 2 * i + 2;
  if (l < n && arr[l] > arr[largest]) largest = l;
  if (r < n && arr[r] > arr[largest]) largest = r;
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest);
  }
}
function heapSort(arr) {
  let n = arr.length;
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--)
    heapify(arr, n, i);
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, i, 0);
  }
  return arr;
}
// Example usage
const arr = [12, 11, 13, 5, 6, 7];
console.log('Original:', arr);
console.log('Sorted:  ', heapSort([...arr]));
`,
};

export default codes;
