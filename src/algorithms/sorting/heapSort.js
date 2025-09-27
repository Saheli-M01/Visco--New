// Heap Sort Algorithm Implementation (visualized)
export const heapSort = {
  name: "Heap Sort",

  generateSteps: (arr, language = 'javascript') => {
    const steps = [];
    const a = [...arr];
    const n = a.length;

    function heapify(n, i) {
      let largest = i;
      const l = 2 * i + 1;
      const r = 2 * i + 2;
      if (l < n) steps.push({ array: [...a], comparing: [i, l], swapped: [], description: `Compare parent ${a[i]} with left ${a[l]}`, codeLine: 2, phase: 'compare' });
      if (r < n) steps.push({ array: [...a], comparing: [i, r], swapped: [], description: `Compare parent ${a[i]} with right ${a[r]}`, codeLine: 2, phase: 'compare' });
      if (l < n && a[l] > a[largest]) largest = l;
      if (r < n && a[r] > a[largest]) largest = r;
      if (largest !== i) {
        const t1 = a[i], t2 = a[largest];
        if (language === 'c' || language === 'java') {
          steps.push({ array: [...a], comparing: [i, largest], swapped: [], description: `temp = ${t1}`, temp: { value: t1, index: i }, codeLine: 3, phase: 'swap_step' });
          a[i] = t2;
          steps.push({ array: [...a], comparing: [i, largest], swapped: [i, largest], description: `arr[${i}] = ${t2}`, temp: { value: t1, index: i }, codeLine: 4, phase: 'swap_step' });
          a[largest] = t1;
          steps.push({ array: [...a], comparing: [], swapped: [i, largest], description: `arr[${largest}] = ${t1}`, temp: { value: t1, index: i }, codeLine: 5, phase: 'swap' });
        } else {
          [a[i], a[largest]] = [a[largest], a[i]];
          steps.push({ array: [...a], comparing: [i, largest], swapped: [i, largest], description: `Swap ${t1} ↔ ${t2}`, codeLine: 3, phase: 'swap' });
        }
        heapify(n, largest);
      }
    }

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) heapify(n, i);
    for (let i = n - 1; i > 0; i--) {
      const t = a[0];
      if (language === 'c' || language === 'java') {
        steps.push({ array: [...a], comparing: [0, i], swapped: [], description: `temp = ${t}`, temp: { value: t, index: 0 }, codeLine: 6, phase: 'swap_step' });
        a[0] = a[i];
        steps.push({ array: [...a], comparing: [0, i], swapped: [0, i], description: `arr[0] = ${a[0]}`, temp: { value: t, index: 0 }, codeLine: 7, phase: 'swap_step' });
        a[i] = t;
        steps.push({ array: [...a], comparing: [], swapped: [0, i], description: `arr[${i}] = ${t}`, temp: { value: t, index: 0 }, codeLine: 8, phase: 'swap' });
      } else {
        [a[0], a[i]] = [a[i], a[0]];
        steps.push({ array: [...a], comparing: [0, i], swapped: [0, i], description: `Swap root with index ${i}`, codeLine: 6, phase: 'swap' });
      }
      heapify(i, 0);
    }

    steps.push({ array: [...a], comparing: [], swapped: [], description: 'Array sorted', codeLine: -1, phase: 'completed' });
    return steps;
  },

  getCodeLines: (language) => [
    'function heapSort(arr) {',
    '  // build heap and extract',
    '}',
  ],

  getCode: (language) => `function heapSort(arr) {
  const n = arr.length;
  function heapify(a, n, i) {
    let largest = i;
    const l = 2 * i + 1;
    const r = 2 * i + 2;
    if (l < n && a[l] > a[largest]) largest = l;
    if (r < n && a[r] > a[largest]) largest = r;
    if (largest !== i) {
      [a[i], a[largest]] = [a[largest], a[i]];
      heapify(a, n, largest);
    }
  }
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) heapify(arr, n, i);
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, i, 0);
  }
  return arr;
}`
};
