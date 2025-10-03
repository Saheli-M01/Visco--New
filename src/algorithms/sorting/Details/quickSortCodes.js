export const description = "Quick Sort is a divide-and-conquer algorithm that selects a pivot, partitions the array around the pivot, and recursively sorts the partitions.";
export const howItWorks = [
  "Choose a pivot element from the array",
  "Partition the remaining elements into left (< pivot) and right (> pivot)",
  "Recursively apply quick sort to left and right partitions",
  "Concatenate left, pivot, and right to get the sorted array",
];

export const timeComplexity = {
  best: "O(n log n)",
  average: "O(n log n)",
  worst: "O(n^2)",
};

export const spaceComplexity = "O(log n) (recursive stack)";

export const pseudoCode = `quickSort(A):\n  if len(A) <= 1: return A\n  pivot = choose_pivot(A)\n  left, right = partition(A, pivot)\n  return quickSort(left) + [pivot] + quickSort(right)`;

const codes = {
  javascript: `// Quick Sort - JavaScript (runnable)
function quickSort(arr) {
  if (arr.length <= 1) return arr;
  const pivot = arr[arr.length - 1];
  const left = [], right = [];
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] < pivot) left.push(arr[i]);
    else right.push(arr[i]);
  }
  return [...quickSort(left), pivot, ...quickSort(right)];
}
// Example usage
const arr = [10, 7, 8, 9, 1, 5];
console.log('Original:', arr);
console.log('Sorted:  ', quickSort(arr));
`,
};

export default codes;
