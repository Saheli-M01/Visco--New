// Selection Sort Algorithm Implementation
export const selectionSort = {
  name: "Selection Sort",

  generateSteps: (arr, language = 'javascript') => {
    const steps = [];
    const a = [...arr];
    const n = a.length;

    // Check if array is already sorted
    let isSorted = true;
    for (let k = 0; k < n - 1; k++) {
      if (a[k] > a[k + 1]) {
        isSorted = false;
        break;
      }
    }

    if (isSorted) {
      steps.push({ array: [...a], comparing: [], swapped: [], description: "Array is already sorted!", codeLine: -1, phase: "completed" });
      return steps;
    }

    for (let i = 0; i < n - 1; i++) {
      // Start pass
      steps.push({ array: [...a], comparing: [], swapped: [], description: `Pass ${i + 1}: select min for position ${i}`, codeLine: 1, phase: 'outer_loop' });

      let minIndex = i;
      for (let j = i + 1; j < n; j++) {
        // compare
        steps.push({ array: [...a], comparing: [minIndex, j], swapped: [], description: `Comparing arr[${minIndex}] (${a[minIndex]}) with arr[${j}] (${a[j]})`, codeLine: 2, phase: 'comparison' });
        if (a[j] < a[minIndex]) {
          minIndex = j;
          steps.push({ array: [...a], comparing: [minIndex], swapped: [], description: `New min found at index ${minIndex} (value ${a[minIndex]})`, codeLine: 3, phase: 'min_update' });
        } else {
          steps.push({ array: [...a], comparing: [], swapped: [], description: `No change`, codeLine: 3, phase: 'no_change' });
        }
      }

      if (minIndex !== i) {
        // Swap using language-appropriate steps
        const v1 = a[i];
        const v2 = a[minIndex];
        if (language === 'c' || language === 'java') {
          // temp = a[i]
          steps.push({ array: [...a], comparing: [i, minIndex], swapped: [], description: `temp = ${v1}`, temp: { value: v1, index: i }, codeLine: 4, phase: 'swap_step' });
          // a[i] = a[minIndex]
          a[i] = v2;
          steps.push({ array: [...a], comparing: [i, minIndex], swapped: [i, minIndex], description: `arr[${i}] = ${v2}`, temp: { value: v1, index: i }, codeLine: 5, phase: 'swap_step' });
          // a[minIndex] = temp
          a[minIndex] = v1;
          steps.push({ array: [...a], comparing: [i, minIndex], swapped: [i, minIndex], description: `arr[${minIndex}] = ${v1}`, temp: { value: v1, index: i }, codeLine: 6, phase: 'swap' });
        } else {
          // JS-like single swap
          [a[i], a[minIndex]] = [a[minIndex], a[i]];
          steps.push({ array: [...a], comparing: [i, minIndex], swapped: [i, minIndex], description: `Swapping: ${v1} ↔ ${v2}`, codeLine: 4, phase: 'swap' });
        }
      } else {
        steps.push({ array: [...a], comparing: [], swapped: [], description: `No swap needed for position ${i}`, codeLine: -1, phase: 'no_swap' });
      }
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
        "function selectionSort(arr) {", //0
        "  for (let i = 0; i < n - 1; i++) {", //1
        "    let minIndex = i;", //2
        "    for (let j = i + 1; j < n; j++) {", //3
        "      if (arr[j] < arr[minIndex]) {", //4
        "        minIndex = j;", //5
        "      }", //6
        "    }", //7
        "    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];", //8
        "  }", //9
        "  return arr;", //10
        "}" //11
      ],
      python: [
        "def selection_sort(arr):",
        "    for i in range(len(arr) - 1):",
        "        min_index = i",
        "        for j in range(i + 1, len(arr)):",
        "            if arr[j] < arr[min_index]:",
        "                min_index = j",
        "        arr[i], arr[min_index] = arr[min_index], arr[i]",
        "    return arr"
      ],
      java: [
        "public static void selectionSort(int[] arr) {",
        "    for (int i = 0; i < arr.length - 1; i++) {",
        "        int minIndex = i;",
        "        for (int j = i + 1; j < arr.length; j++) {",
        "            if (arr[j] < arr[minIndex]) {",
        "                minIndex = j;",
        "            }",
        "        }",
        "        int temp = arr[i];",
        "        arr[i] = arr[minIndex];",
        "        arr[minIndex] = temp;",
        "    }",
        "}"
      ],
      c: [
        "void selectionSort(int arr[], int n) {",
        "    for (int i = 0; i < n - 1; i++) {",
        "        int minIndex = i;",
        "        for (int j = i + 1; j < n; j++) {",
        "            if (arr[j] < arr[minIndex]) {",
        "                minIndex = j;",
        "            }",
        "        }",
        "        int temp = arr[i];",
        "        arr[i] = arr[minIndex];",
        "        arr[minIndex] = temp;",
        "    }",
        "}"
      ],
      cpp: [
        "void selectionSort(vector<int>& arr) {",
        "    for (int i = 0; i < arr.size() - 1; i++) {",
        "        int minIndex = i;",
        "        for (int j = i + 1; j < arr.size(); j++) {",
        "            if (arr[j] < arr[minIndex]) {",
        "                minIndex = j;",
        "            }",
        "        }",
        "        swap(arr[i], arr[minIndex]);",
        "    }",
        "}"
      ]
    };

    return codeLines[language] || [];
  },

  getCode: (language) => {
    const codes = {
      javascript: `function selectionSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) minIndex = j;
    }
    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
  }
  return arr;
}`,
      python: `def selection_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        min_index = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_index]:
                min_index = j
        arr[i], arr[min_index] = arr[min_index], arr[i]
    return arr`,
      java: `public static void selectionSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++) {
        int minIndex = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) minIndex = j;
        }
        int temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
    }
}`,
      c: `void selectionSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int minIndex = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) minIndex = j;
        }
        int temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
    }
}`
    };

    return codes[language] || `// ${language} implementation not available yet`;
  }
};
