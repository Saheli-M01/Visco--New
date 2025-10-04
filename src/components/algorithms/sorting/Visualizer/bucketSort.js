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
      // codeLine 6 corresponds to pushing into bucket
      steps.push({ array: [...a], comparing: [i], swapped: [], description: `Put ${a[i]} into bucket ${idx}`, codeLine: 6, phase: 'distribute' });
    }

    let idx = 0;
    for (let b = 0; b < buckets.length; b++) {
      buckets[b].sort((x, y) => x - y);
      for (let v of buckets[b]) {
        a[idx++] = v;
        // codeLine 11 corresponds to taking from bucket into array
        steps.push({ array: [...a], comparing: [], swapped: [idx - 1], description: `Take ${v} from bucket ${b} to array`, codeLine: 11, phase: 'collect' });
      }
    }

    steps.push({ array: [...a], comparing: [], swapped: [], description: 'Array sorted', codeLine: -1, phase: 'completed' });
    return steps;
  },

  getCodeLines: (language) => [
    'function bucketSort(arr) {', //0
    '  if (arr.length === 0) return arr;', //1
    '  const min = Math.min(...arr), max = Math.max(...arr);', //2
    '  const bucketCount = Math.min(arr.length, 10);', //3
    '  const buckets = Array.from({ length: bucketCount }, () => []);', //4
    '  for (let i = 0; i < arr.length; i++) {', //5
    '    const idx = Math.floor(((arr[i] - min) / (max - min + 1)) * bucketCount);', //6
    '    buckets[idx].push(arr[i]);', //7
    '  }', //8
    '  let res = [];', //9
    '  for (const b of buckets) {', //10
    '    for (const v of b) {', //11
    '      res.push(v);', //12
    '    }', //13
    '  }', //14
    '  return res;', //15
    '}', //16
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
