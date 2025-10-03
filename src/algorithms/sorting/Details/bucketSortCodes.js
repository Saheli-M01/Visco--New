export const description = "Bucket Sort distributes elements into buckets, sorts each bucket, and concatenates them. Works well when input is uniformly distributed.";
export const howItWorks = [
  "Create several buckets and distribute elements based on value ranges",
  "Sort each non-empty bucket (often using insertion sort)",
  "Concatenate buckets in order to produce the sorted array",
];

export const timeComplexity = {
  best: "O(n + k)",
  average: "O(n + k)",
  worst: "O(n^2) (if all elements land in one bucket)",
};

export const spaceComplexity = "O(n + k)";

export const pseudoCode = `bucketSort(A, k):\n  create k empty buckets\n  for each element x in A: put x into appropriate bucket\n  for each bucket: sort(bucket)\n  return concatenation of all buckets`;

const codes = {
  javascript: `// Bucket Sort - JavaScript (runnable)
function bucketSort(arr, bucketSize = 5) {
  if (arr.length === 0) return arr;
  let i, min = arr[0], max = arr[0];
  arr.forEach(val => {
    if (val < min) min = val;
    if (val > max) max = val;
  });
  const bucketCount = Math.floor((max - min) / bucketSize) + 1;
  const buckets = Array.from({ length: bucketCount }, () => []);
  arr.forEach(val => {
    buckets[Math.floor((val - min) / bucketSize)].push(val);
  });
  return buckets.reduce((acc, b) => acc.concat(b.sort((a, b) => a - b)), []);
}
// Example usage
const arr = [42, 32, 33, 52, 37, 47, 51];
console.log('Original:', arr);
console.log('Sorted:  ', bucketSort(arr));
`,
};

export default codes;
