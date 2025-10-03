export const description = "Counting Sort counts the occurrences of each value and computes positions; it's efficient when the range of input (k) is not much larger than the number of elements.";
export const howItWorks = [
  "Count occurrences of each distinct element",
  "Compute prefix sums to determine positions",
  "Place elements into output array using counts to ensure stability",
];

export const timeComplexity = {
  best: "O(n + k)",
  average: "O(n + k)",
  worst: "O(n + k)",
};

export const spaceComplexity = "O(n + k)";

export const pseudoCode = `countingSort(A, k):\n  let count[0..k] = 0\n  for each a in A: count[a]++\n  for i from 1 to k: count[i] += count[i-1]\n  for each a in A (reverse): output[count[a]-1] = a; count[a]--`;

const codes = {
  javascript: `// Counting Sort - JavaScript (runnable)
function countingSort(arr, max) {
  let count = new Array(max + 1).fill(0);
  let output = new Array(arr.length);
  for (let i = 0; i < arr.length; i++) count[arr[i]]++;
  for (let i = 1; i <= max; i++) count[i] += count[i - 1];
  for (let i = arr.length - 1; i >= 0; i--) {
    output[count[arr[i]] - 1] = arr[i];
    count[arr[i]]--;
  }
  for (let i = 0; i < arr.length; i++) arr[i] = output[i];
  return arr;
}
// Example usage
const arr = [1, 4, 1, 2, 7, 5, 2];
console.log('Original:', arr);
console.log('Sorted:  ', countingSort([...arr], 9));
`,
};

export default codes;
