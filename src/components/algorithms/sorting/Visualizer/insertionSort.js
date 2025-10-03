// Insertion Sort Algorithm Implementation
export const insertionSort = {
  name: "Insertion Sort",

  generateSteps: (arr, language = 'javascript') => {
    const steps = [];
    const a = [...arr];
    const n = a.length;

    // Check sorted
    let isSorted = true;
    for (let k = 0; k < n - 1; k++) {
      if (a[k] > a[k + 1]) { isSorted = false; break; }
    }
    if (isSorted) {
      steps.push({ array: [...a], comparing: [], swapped: [], description: "Array is already sorted!", codeLine: -1, phase: "completed" });
      return steps;
    }

    for (let i = 1; i < n; i++) {
      let key = a[i];
      let j = i - 1;
      // start insertion of key
      steps.push({ array: [...a], comparing: [i], swapped: [], description: `Insert element at index ${i} (value ${key})`, codeLine: 1, phase: 'start_insert' });

      // For languages with explicit temp, show temp assignment
      if (language === 'c' || language === 'java') {
        steps.push({ array: [...a], comparing: [i], swapped: [], description: `temp = ${key}`, temp: { value: key, index: i }, codeLine: 2, phase: 'temp' });
      }

      while (j >= 0 && a[j] > key) {
        // shift a[j] to a[j+1]
        a[j + 1] = a[j];
        steps.push({ array: [...a], comparing: [j, j + 1], swapped: [j + 1], description: `Shift arr[${j}] (${a[j]}) to position ${j + 1}`, temp: (language === 'c' || language === 'java') ? { value: key, index: i } : undefined, codeLine: 3, phase: 'shift' });
        j = j - 1;
      }

      // place key
      a[j + 1] = key;
      steps.push({ array: [...a], comparing: [], swapped: [j + 1], description: `Place key ${key} at position ${j + 1}`, temp: (language === 'c' || language === 'java') ? { value: key, index: i } : undefined, codeLine: 4, phase: 'insert' });
    }

    // propagate temp for C/Java
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

  getCodeLines: (language) => {
    const codeLines = {
      javascript: [
        "function insertionSort(arr) {",
        "  for (let i = 1; i < arr.length; i++) {",
        "    let key = arr[i];",
        "    let j = i - 1;",
        "    while (j >= 0 && arr[j] > key) {",
        "      arr[j + 1] = arr[j];",
        "      j = j - 1;",
        "    }",
        "    arr[j + 1] = key;",
        "  }",
        "  return arr;",
        "}"
      ],
      python: [
        "def insertion_sort(arr):",
        "    for i in range(1, len(arr)):",
        "        key = arr[i]",
        "        j = i - 1",
        "        while j >= 0 and arr[j] > key:",
        "            arr[j + 1] = arr[j]",
        "            j -= 1",
        "        arr[j + 1] = key",
        "    return arr"
      ],
      java: [
        "public static void insertionSort(int[] arr) {",
        "    for (int i = 1; i < arr.length; i++) {",
        "        int key = arr[i];",
        "        int j = i - 1;",
        "        while (j >= 0 && arr[j] > key) {",
        "            arr[j + 1] = arr[j];",
        "            j = j - 1;",
        "        }",
        "        arr[j + 1] = key;",
        "    }",
        "}"
      ],
      c: [
        "void insertionSort(int arr[], int n) {",
        "    for (int i = 1; i < n; i++) {",
        "        int key = arr[i];",
        "        int j = i - 1;",
        "        while (j >= 0 && arr[j] > key) {",
        "            arr[j + 1] = arr[j];",
        "            j = j - 1;",
        "        }",
        "        arr[j + 1] = key;",
        "    }",
        "}"
      ]
    };

    return codeLines[language] || [];
  },

  getCode: (language) => {
    const codes = {
      javascript: `function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j = j - 1;
    }
    arr[j + 1] = key;
  }
  return arr;
}`,
      python: `def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr`,
      java: `public static void insertionSort(int[] arr) {
    for (int i = 1; i < arr.length; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}`
    };

    return codes[language] || `// ${language} implementation not available yet`;
  }
};
