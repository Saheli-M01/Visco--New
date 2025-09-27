// Counting Sort visualization - assumes non-negative integer inputs
export const countingSort = {
  name: "Counting Sort",

  generateSteps: (arr, language = 'javascript') => {
    const steps = [];
    if (arr.length === 0) return steps;
    const a = [...arr].map((v) => Math.floor(v));
    const max = Math.max(...a);
    const count = new Array(max + 1).fill(0);

    for (let i = 0; i < a.length; i++) {
      count[a[i]]++;
      steps.push({ array: [...a], comparing: [i], swapped: [], description: `Increment count[${a[i]}] to ${count[a[i]]}`, codeLine: 2, phase: 'count' });
    }

    let idx = 0;
    for (let v = 0; v < count.length; v++) {
      while (count[v] > 0) {
        a[idx++] = v;
        count[v]--;
        steps.push({ array: [...a], comparing: [], swapped: [idx - 1], description: `Place ${v} into array at ${idx - 1}`, codeLine: 3, phase: 'reconstruct' });
      }
    }

    steps.push({ array: [...a], comparing: [], swapped: [], description: 'Array sorted', codeLine: -1, phase: 'completed' });
    return steps;
  },

  getCodeLines: (language) => ['function countingSort(arr) {', '  // counting sort implementation',],
  getCode: (language) => `function countingSort(arr) {
  if (arr.length === 0) return arr;
  const max = Math.max(...arr);
  const count = new Array(max + 1).fill(0);
  for (const v of arr) count[v]++;
  let idx = 0;
  for (let v = 0; v <= max; v++) {
    while (count[v]-- > 0) arr[idx++] = v;
  }
  return arr;
}`
};
