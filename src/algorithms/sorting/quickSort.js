// Quick Sort Algorithm Implementation (Lomuto partition) with visualization steps
export const quickSort = {
  name: "Quick Sort",

  generateSteps: (arr, language = 'javascript') => {
    const steps = [];
    const a = [...arr];

    function partition(low, high) {
      const pivot = a[high];
      let i = low - 1;
      for (let j = low; j <= high - 1; j++) {
        steps.push({ array: [...a], comparing: [j, high], swapped: [], description: `Compare arr[${j}] (${a[j]}) with pivot ${pivot}`, codeLine: 3, phase: 'comparison' });
        if (a[j] < pivot) {
          i++;
          const t1 = a[i], t2 = a[j];
          if (language === 'c' || language === 'java') {
            steps.push({ array: [...a], comparing: [i, j], swapped: [], description: `temp = ${t1}`, temp: { value: t1, index: i }, codeLine: 4, phase: 'swap_step' });
            a[i] = t2;
            steps.push({ array: [...a], comparing: [i, j], swapped: [i, j], description: `arr[${i}] = ${t2}`, temp: { value: t1, index: i }, codeLine: 5, phase: 'swap_step' });
            a[j] = t1;
            steps.push({ array: [...a], comparing: [i, j], swapped: [i, j], description: `arr[${j}] = ${t1}`, temp: { value: t1, index: i }, codeLine: 6, phase: 'swap' });
          } else {
            [a[i], a[j]] = [a[j], a[i]];
            steps.push({ array: [...a], comparing: [i, j], swapped: [i, j], description: `Swapping: ${t1} ↔ ${t2}`, codeLine: 4, phase: 'swap' });
          }
        }
      }
      const t = a[i + 1];
      if (language === 'c' || language === 'java') {
        steps.push({ array: [...a], comparing: [], swapped: [], description: `temp = ${t}`, temp: { value: t, index: i + 1 }, codeLine: 7, phase: 'swap_step' });
        a[i + 1] = a[high];
        steps.push({ array: [...a], comparing: [], swapped: [i + 1, high], description: `arr[${i + 1}] = ${a[i + 1]}`, temp: { value: t, index: i + 1 }, codeLine: 8, phase: 'swap_step' });
        a[high] = t;
        steps.push({ array: [...a], comparing: [], swapped: [i + 1, high], description: `arr[${high}] = ${t}`, temp: { value: t, index: i + 1 }, codeLine: 9, phase: 'swap' });
      } else {
        [a[i + 1], a[high]] = [a[high], a[i + 1]];
        steps.push({ array: [...a], comparing: [], swapped: [i + 1, high], description: `Place pivot at ${i + 1}`, codeLine: 7, phase: 'swap' });
      }
      return i + 1;
    }

    function quickRec(low, high) {
      if (low < high) {
        const pi = partition(low, high);
        steps.push({ array: [...a], comparing: [], swapped: [], description: `Partitioned at ${pi}`, codeLine: -1, phase: 'partition' });
        quickRec(low, pi - 1);
        quickRec(pi + 1, high);
      }
    }

    quickRec(0, a.length - 1);
    steps.push({ array: [...a], comparing: [], swapped: [], description: 'Array sorted', codeLine: -1, phase: 'completed' });
    return steps;
  },

  getCodeLines: (language) => [
    'function quickSort(arr) {',
    '  // quicksort implementation',
    '  // partition and swap',
  ],

  getCode: (language) => `function quickSort(arr) {
  function partition(a, low, high) {
    const pivot = a[high];
    let i = low - 1;
    for (let j = low; j <= high - 1; j++) {
      if (a[j] < pivot) {
        i++;
        [a[i], a[j]] = [a[j], a[i]];
      }
    }
    [a[i + 1], a[high]] = [a[high], a[i + 1]];
    return i + 1;
  }
  function quick(a, low, high) {
    if (low < high) {
      const pi = partition(a, low, high);
      quick(a, low, pi - 1);
      quick(a, pi + 1, high);
    }
  }
  quick(arr, 0, arr.length - 1);
  return arr;
}`
};
