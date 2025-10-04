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
        // Start of insertion for this gap - record temp for C/Java
        if (language === 'c' || language === 'java') {
          steps.push({ array: [...a], comparing: [i], swapped: [], description: `temp = ${temp}`, temp: { value: temp, index: i }, codeLine: 4, phase: 'start' });
        } else {
          steps.push({ array: [...a], comparing: [i], swapped: [], description: `Start gap-insertion at index ${i} gap ${gap}`, codeLine: 4, phase: 'start' });
        }
        while (j >= gap && a[j - gap] > temp) {
          a[j] = a[j - gap];
          steps.push({ array: [...a], comparing: [j, j - gap], swapped: [j], description: `Shift ${a[j - gap]} to index ${j}`, codeLine: 7, phase: 'shift' });
          j -= gap;
        }
        a[j] = temp;
        // Insert step - show placement of temp
        steps.push({ array: [...a], comparing: [], swapped: [j], description: `Place temp ${temp} at ${j}`, codeLine: 10, phase: 'insert' });
      }
      gap = Math.floor(gap / 2);
    }
    steps.push({ array: [...a], comparing: [], swapped: [], description: 'Array sorted', codeLine: -1, phase: 'completed' });

    // Propagate temp for C/Java so UI can persist the temp value across steps
    const languageUsesTemp = language === 'c' || language === 'java';
    if (languageUsesTemp) {
      let lastTemp = null;
      for (let k = 0; k < steps.length; k++) {
        if (steps[k].hasOwnProperty('temp')) {
          if (steps[k].temp) lastTemp = steps[k].temp;
        } else {
          if (lastTemp) steps[k].temp = lastTemp;
        }
      }
    }
    return steps;
  },
  getCodeLines: (language) => [
    'function shellSort(arr) {', //0
    '  const n = arr.length;', //1
    '  for (let gap = Math.floor(n/2); gap > 0; gap = Math.floor(gap/2)) {', //2
    '    for (let i = gap; i < n; i++) {', //3
    '      const temp = arr[i];', //4
    '      let j = i;', //5
    '      while (j >= gap && arr[j - gap] > temp) {', //6
    '        arr[j] = arr[j - gap];', //7
    '        j -= gap;', //8
    '      }', //9
    '      arr[j] = temp;', //10
    '    }', //11
    '  }', //12
    '  return arr;', //13
    '}', //14
  ],
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
