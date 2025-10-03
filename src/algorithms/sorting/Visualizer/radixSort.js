// Radix Sort (LSD) visualization for non-negative integers
export const radixSort = {
  name: "Radix Sort",

  generateSteps: (arr, language = 'javascript') => {
    const steps = [];
    const a = [...arr].map((v) => Math.floor(Math.abs(v)));
    if (a.length === 0) return steps;
    const max = Math.max(...a);
    let exp = 1;

    while (Math.floor(max / exp) > 0) {
      const buckets = Array.from({ length: 10 }, () => []);
      for (let i = 0; i < a.length; i++) {
        const d = Math.floor((a[i] / exp) % 10);
        buckets[d].push(a[i]);
        steps.push({ array: [...a], comparing: [i], swapped: [], description: `Place ${a[i]} in bucket ${d} for exp ${exp}`, codeLine: 2, phase: 'bucket' });
      }
      let idx = 0;
      for (let b = 0; b < buckets.length; b++) {
        for (const v of buckets[b]) {
          a[idx++] = v;
          steps.push({ array: [...a], comparing: [], swapped: [idx - 1], description: `Collect ${v} from bucket ${b}`, codeLine: 3, phase: 'collect' });
        }
      }
      exp *= 10;
    }

    steps.push({ array: [...a], comparing: [], swapped: [], description: 'Array sorted', codeLine: -1, phase: 'completed' });
    return steps;
  },

  getCodeLines: (language) => ['function radixSort(arr) {', '  // LSD radix',],
  getCode: (language) => `function radixSort(arr) {
  const getMax = (arr) => Math.max(...arr.map(v => Math.abs(Math.floor(v))));
  const max = getMax(arr);
  let exp = 1;
  let a = arr.map(v => Math.floor(Math.abs(v)));
  while (Math.floor(max / exp) > 0) {
    const buckets = Array.from({ length: 10 }, () => []);
    for (const v of a) buckets[Math.floor((v / exp) % 10)].push(v);
    a = [].concat(...buckets.map(b => b));
    exp *= 10;
  }
  return a;
}`
};
