// Bucket Sort (simple visualization) - works for numbers in reasonable ranges
export const bucketSort = {
  name: "Bucket Sort",

  generateSteps: (arr, language = 'javascript') => {
    const steps = [];
    if (arr.length === 0) return steps;
    const a = [...arr];
    const n = a.length;
    const min = Math.min(...a);
    const max = Math.max(...a);
    const bucketCount = Math.min(n, 10);
    const buckets = Array.from({ length: bucketCount }, () => []);

    for (let i = 0; i < n; i++) {
      const idx = Math.floor(((a[i] - min) / (max - min + 1)) * bucketCount);
      buckets[idx].push(a[i]);
      steps.push({ array: [...a], comparing: [i], swapped: [], description: `Put ${a[i]} into bucket ${idx}`, codeLine: 2, phase: 'distribute' });
    }

    let idx = 0;
    for (let b = 0; b < buckets.length; b++) {
      buckets[b].sort((x, y) => x - y);
      for (let v of buckets[b]) {
        a[idx++] = v;
        steps.push({ array: [...a], comparing: [], swapped: [idx - 1], description: `Take ${v} from bucket ${b} to array`, codeLine: 3, phase: 'collect' });
      }
    }

    steps.push({ array: [...a], comparing: [], swapped: [], description: 'Array sorted', codeLine: -1, phase: 'completed' });
    return steps;
  },

  getCodeLines: (language) => [
    'function bucketSort(arr) {',
    '  // distribute into buckets and concatenate',
  ],

  getCode: (language) => `function bucketSort(arr) {
  if (arr.length === 0) return arr;
  const min = Math.min(...arr), max = Math.max(...arr);
  const bucketCount = Math.min(arr.length, 10);
  const buckets = Array.from({ length: bucketCount }, () => []);
  for (const v of arr) {
    const idx = Math.floor(((v - min) / (max - min + 1)) * bucketCount);
    buckets[idx].push(v);
  }
  let res = [];
  for (const b of buckets) {
    res = res.concat(b.sort((a, b) => a - b));
  }
  return res;
}`
};
