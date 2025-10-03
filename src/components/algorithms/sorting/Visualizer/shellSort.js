// Shell Sort visualization
export const shellSort = {
  name: "Shell Sort",

  generateSteps: (arr, language = 'javascript') => {
    const steps = [];
    const a = [...arr];
    const n = a.length;
    let gap = Math.floor(n / 2);
    while (gap > 0) {
      for (let i = gap; i < n; i++) {
        const temp = a[i];
        let j = i;
        steps.push({ array: [...a], comparing: [i], swapped: [], description: `Start gap-insertion at index ${i} gap ${gap}`, codeLine: 1, phase: 'start' });
        while (j >= gap && a[j - gap] > temp) {
          a[j] = a[j - gap];
          steps.push({ array: [...a], comparing: [j, j - gap], swapped: [j], description: `Shift ${a[j - gap]} to index ${j}`, codeLine: 2, phase: 'shift' });
          j -= gap;
        }
        a[j] = temp;
        steps.push({ array: [...a], comparing: [], swapped: [j], description: `Place temp ${temp} at ${j}`, codeLine: 3, phase: 'insert' });
      }
      gap = Math.floor(gap / 2);
    }
    steps.push({ array: [...a], comparing: [], swapped: [], description: 'Array sorted', codeLine: -1, phase: 'completed' });
    return steps;
  },

  getCodeLines: (language) => ['function shellSort(arr) {', '  // shell sort implementation',],
  getCode: (language) => `function shellSort(arr) {
  const n = arr.length;
  for (let gap = Math.floor(n/2); gap > 0; gap = Math.floor(gap/2)) {
    for (let i = gap; i < n; i++) {
      const temp = arr[i];
      let j = i;
      while (j >= gap && arr[j - gap] > temp) {
        arr[j] = arr[j - gap];
        j -= gap;
      }
      arr[j] = temp;
    }
  }
  return arr;
}`
};
