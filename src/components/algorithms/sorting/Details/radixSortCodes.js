export const description = "Radix Sort sorts integers by processing individual digits. It groups numbers by digit position, using a stable sort like counting sort as a subroutine.";
export const howItWorks = [
  "Find the maximum number to determine the number of digits",
  "Starting from least significant digit, use a stable sort to sort by that digit",
  "Repeat for each digit position until most significant digit is processed",
];

export const timeComplexity = {
  best: "O(nk)",
  average: "O(nk)",
  worst: "O(nk)",
};

export const spaceComplexity = "O(n + k)";

export const pseudoCode = `radixSort(A):\n  for d from LSD to MSD:\n    stableSort(A, key = digit d)\n  return A`;

const codes = {
  javascript: `// Radix Sort - JavaScript (runnable)
function getMax(arr) {
  let mx = arr[0];
  for (let i = 1; i < arr.length; i++)
    if (arr[i] > mx) mx = arr[i];
  return mx;
}
function countingSort(arr, exp) {
  let output = new Array(arr.length).fill(0);
  let count = new Array(10).fill(0);
  for (let i = 0; i < arr.length; i++)
    count[Math.floor(arr[i] / exp) % 10]++;
  for (let i = 1; i < 10; i++)
    count[i] += count[i - 1];
  for (let i = arr.length - 1; i >= 0; i--) {
    output[count[Math.floor(arr[i] / exp) % 10] - 1] = arr[i];
    count[Math.floor(arr[i] / exp) % 10]--;
  }
  for (let i = 0; i < arr.length; i++)
    arr[i] = output[i];
}
function radixSort(arr) {
  let m = getMax(arr);
  for (let exp = 1; Math.floor(m / exp) > 0; exp *= 10)
    countingSort(arr, exp);
  return arr;
}
// Example usage
const arr = [170, 45, 75, 90, 802, 24, 2, 66];
console.log('Original:', arr);
console.log('Sorted:  ', radixSort([...arr]));
`,
};

export default codes;
