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
      if (l < n) steps.push({ array: [...a], comparing: [i, l], swapped: [], description: `Compare parent ${a[i]} with left ${a[l]}`, codeLine: 3, phase: 'comparison' });
      if (r < n) steps.push({ array: [...a], comparing: [i, r], swapped: [], description: `Compare parent ${a[i]} with right ${a[r]}`, codeLine: 3, phase: 'comparison' });
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
          steps.push({ array: [...a], comparing: [i, largest], swapped: [i, largest], description: `Swap ${t1} ↔ ${t2}`, codeLine: 4, phase: 'swap' });
        }
        heapify(n, largest);
      }
    }

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) heapify(n, i);
    for (let i = n - 1; i > 0; i--) {
  const t = a[0];
      if (language === 'c' || language === 'java') {
        steps.push({ array: [...a], comparing: [0, i], swapped: [], description: `temp = ${t}`, temp: { value: t, index: 0 }, codeLine: 7, phase: 'swap_step' });
        a[0] = a[i];
        steps.push({ array: [...a], comparing: [0, i], swapped: [0, i], description: `arr[0] = ${a[0]}`, temp: { value: t, index: 0 }, codeLine: 8, phase: 'swap_step' });
        a[i] = t;
        steps.push({ array: [...a], comparing: [], swapped: [0, i], description: `arr[${i}] = ${t}`, temp: { value: t, index: 0 }, codeLine: 9, phase: 'swap' });
      } else {
        [a[0], a[i]] = [a[i], a[0]];
        steps.push({ array: [...a], comparing: [0, i], swapped: [0, i], description: `Swap root with index ${i}`, codeLine: 7, phase: 'swap' });
      }
      heapify(i, 0);
    }

    steps.push({ array: [...a], comparing: [], swapped: [], description: 'Array sorted', codeLine: -1, phase: 'completed' });
    return steps;
  },

  getCodeLines: (language) => [
    'function heapSort(arr) {',                       // 0
    '  const n = arr.length;',                         // 1
    '  function heapify(n, i) {',                      // 2
    '    let largest = i;',                             // 3
    '    const l = 2 * i + 1;',                        // 4
    '    const r = 2 * i + 2;',                        // 5
    '    if (l < n && arr[l] > arr[largest]) largest = l;', // 6
    '    if (r < n && arr[r] > arr[largest]) largest = r;', // 7
    '    if (largest !== i) {',                         // 8
    '      [arr[i], arr[largest]] = [arr[largest], arr[i]];', // 9
    '      heapify(n, largest);',                       // 10
    '    }',                                           // 11
    '  }',                                             // 12
    '  for (let i = Math.floor(n/2) - 1; i >= 0; i--) heapify(n, i);', //13
    '  for (let i = n - 1; i > 0; i--) {',             // 14
    '    [arr[0], arr[i]] = [arr[i], arr[0]];',         // 15
    '    heapify(i, 0);',                              // 16
    '  }',                                             // 17
    '  return arr;',                                   // 18
    '}',                                               // 19
  ],

  getCode: (language) => `function heapSort(arr) {
  const n = arr.length;
  function heapify(n, i) {
    let largest = i;
    const l = 2 * i + 1;
    const r = 2 * i + 2;
    if (l < n && arr[l] > arr[largest]) largest = l;
    if (r < n && arr[r] > arr[largest]) largest = r;
    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      heapify(n, largest);
    }
  }
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) heapify(n, i);
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(i, 0);
  }
  return arr;
}`
};
