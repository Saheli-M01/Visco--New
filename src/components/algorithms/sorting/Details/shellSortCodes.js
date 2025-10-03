export const description = "Shell Sort is an in-place comparison sort that generalizes insertion sort by allowing exchanges of elements far apart using gap sequences.";
export const howItWorks = [
  "Start with a large gap and perform gapped insertion sort",
  "Reduce the gap and repeat the gapped insertion sorts",
  "Finish with gap = 1 which is a regular insertion sort",
];

export const timeComplexity = {
  best: "O(n log n) (depends on gap sequence)",
  average: "Varies (commonly around O(n^(3/2)))",
  worst: "O(n^2)",
};

export const spaceComplexity = "O(1)";

export const pseudoCode = `shellSort(A):\n  gap = n/2\n  while gap > 0:\n    for i from gap to n-1:\n      temp = A[i]\n      j = i\n      while j >= gap and A[j-gap] > temp:\n        A[j] = A[j-gap]\n        j -= gap\n      A[j] = temp\n    gap = gap/2`;

const codes = {
  javascript: `// Shell Sort - JavaScript (runnable)
function shellSort(arr) {
  const a = [...arr];
  let n = a.length;
  for (let gap = Math.floor(n/2); gap > 0; gap = Math.floor(gap/2)) {
    for (let i = gap; i < n; i++) {
      let temp = a[i], j;
      for (j = i; j >= gap && a[j-gap] > temp; j -= gap) {
        a[j] = a[j-gap];
      }
      a[j] = temp;
    }
  }
  return a;
}
// Example usage
const arr = [12, 34, 54, 2, 3];
console.log('Original:', arr);
console.log('Sorted:  ', shellSort(arr));
`,
};

export default codes;
