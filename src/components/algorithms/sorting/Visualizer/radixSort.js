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
        // codeLine 9 corresponds to the buckets[d].push line in getCodeLines
        steps.push({ array: [...a], comparing: [i], swapped: [], description: `Place ${a[i]} in bucket ${d} for exp ${exp}`, codeLine: 9, phase: 'bucket' });
      }
      let idx = 0;
      for (let b = 0; b < buckets.length; b++) {
        for (const v of buckets[b]) {
          a[idx++] = v;
          // codeLine 14 corresponds to the a[idx++] = v collection line
          steps.push({ array: [...a], comparing: [], swapped: [idx - 1], description: `Collect ${v} from bucket ${b}`, codeLine: 14, phase: 'collect' });
        }
      }
      exp *= 10;
    }

    steps.push({ array: [...a], comparing: [], swapped: [], description: 'Array sorted', codeLine: -1, phase: 'completed' });
    return steps;
  },

  getCodeLines: (language) => [
    'function radixSort(arr) {',                           // 0
    '  const getMax = (arr) => Math.max(...arr.map(v => Math.abs(Math.floor(v))));', //1
    '  const max = getMax(arr);',                          // 2
    '  let exp = 1;',                                      // 3
    '  let a = arr.map(v => Math.floor(Math.abs(v)));',    // 4
    '  while (Math.floor(max / exp) > 0) {',               // 5
    '    const buckets = Array.from({ length: 10 }, () => []);', // 6
    '    for (let i = 0; i < a.length; i++) {',            // 7
    '      const d = Math.floor((a[i] / exp) % 10);',      // 8
    '      buckets[d].push(a[i]);',                        // 9
    '    }',                                               //10
    '    let idx = 0;',                                    //11
    '    for (let b = 0; b < buckets.length; b++) {',     //12
    '      for (const v of buckets[b]) {',                //13
    '        a[idx++] = v;',                              //14
    '      }',                                            //15
    '    }',                                              //16
    '    exp *= 10;',                                     //17
    '  }',                                                //18
    '  return a;',                                        //19
    '}',                                                  //20
  ],
  getCode: (language) => `function radixSort(arr) {
  const getMax = (arr) => Math.max(...arr.map(v => Math.abs(Math.floor(v))));
  const max = getMax(arr);
  let exp = 1;
  let a = arr.map(v => Math.floor(Math.abs(v)));
  while (Math.floor(max / exp) > 0) {
    const buckets = Array.from({ length: 10 }, () => []);
    for (let i = 0; i < a.length; i++) {
      const d = Math.floor((a[i] / exp) % 10);
      buckets[d].push(a[i]);
    }
    let idx = 0;
    for (let b = 0; b < buckets.length; b++) {
      for (const v of buckets[b]) {
        a[idx++] = v;
      }
    }
    exp *= 10;
  }
  return a;
}`
};
