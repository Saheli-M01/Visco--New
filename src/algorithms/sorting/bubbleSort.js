// Bubble Sort Algorithm Implementation
export const bubbleSort = {
  name: "Bubble Sort",
  
  // Generate step-by-step visualization data with code line tracking
  generateSteps: (arr) => {
    const steps = [];
    const sortedArray = [...arr];
    const n = sortedArray.length;
    
    // Check if array is already sorted
    let isSorted = true;
    for (let k = 0; k < n - 1; k++) {
      if (sortedArray[k] > sortedArray[k + 1]) {
        isSorted = false;
        break;
      }
    }
    
    // If array is already sorted, return with no steps and no code highlighting
    if (isSorted) {
      steps.push({
        array: [...sortedArray],
        comparing: [],
        swapped: [],
        description: "Array is already sorted!",
        codeLine: -1, // No code highlighting
        phase: "completed"
      });
      return steps;
    }

    for (let i = 0; i < n - 1; i++) {
      let swappedInThisPass = false;
      
      // Outer loop start
      steps.push({
        array: [...sortedArray],
        comparing: [],
        swapped: [],
        description: `Pass ${i + 1}: Starting outer loop (i = ${i})`,
        codeLine: 1, // for (let i = 0; i < n - 1; i++)
        phase: "outer_loop"
      });

      for (let j = 0; j < n - i - 1; j++) {
        // Inner loop start
        steps.push({
          array: [...sortedArray],
          comparing: [],
          swapped: [],
          description: `Inner loop: j = ${j}`,
          codeLine: 2, // for (let j = 0; j < n - i - 1; j++)
          phase: "inner_loop"
        });

        // Comparison step
        steps.push({
          array: [...sortedArray],
          comparing: [j, j + 1],
          swapped: [],
          description: `Comparing arr[${j}] (${sortedArray[j]}) with arr[${j + 1}] (${sortedArray[j + 1]})`,
          codeLine: 3, // if (arr[j] > arr[j + 1])
          phase: "comparison"
        });

        if (sortedArray[j] > sortedArray[j + 1]) {
          // Swap step
          const temp1 = sortedArray[j];
          const temp2 = sortedArray[j + 1];
          [sortedArray[j], sortedArray[j + 1]] = [sortedArray[j + 1], sortedArray[j]];
          swappedInThisPass = true;
          
          steps.push({
            array: [...sortedArray],
            comparing: [j, j + 1],
            swapped: [j, j + 1],
            description: `Swapping: ${temp1} ↔ ${temp2}`,
            codeLine: 4, // swap operation
            phase: "swap"
          });
        } else {
          steps.push({
            array: [...sortedArray],
            comparing: [j, j + 1],
            swapped: [],
            description: `No swap needed: ${sortedArray[j]} ≤ ${sortedArray[j + 1]}`,
            codeLine: 3, // staying in comparison
            phase: "no_swap"
          });
        }
      }
      
      // If no swaps were made in this pass, array is sorted
      if (!swappedInThisPass) {
        steps.push({
          array: [...sortedArray],
          comparing: [],
          swapped: [],
          description: `Array is now sorted! No swaps needed in pass ${i + 1}`,
          codeLine: -1, // No code highlighting since we're done
          phase: "completed"
        });
        break;
      }
    }
    
    return steps;
  },

  // Get code lines for highlighting
  getCodeLines: (language) => {
    const codeLines = {
      javascript: [
        "function bubbleSort(arr) {",                    // 0
        "  for (let i = 0; i < n - 1; i++) {",         // 1
        "    for (let j = 0; j < n - i - 1; j++) {",   // 2
        "      if (arr[j] > arr[j + 1]) {",             // 3
        "        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];", // 4
        "      }",                                       // 5
        "    }",                                         // 6
        "  }",                                           // 7
        "  return arr;",                                 // 8
        "}"                                              // 9
      ],
      
      python: [
        "def bubble_sort(arr):",                         // 0
        "    for i in range(len(arr) - 1):",            // 1
        "        for j in range(len(arr) - i - 1):",    // 2
        "            if arr[j] > arr[j + 1]:",           // 3
        "                arr[j], arr[j + 1] = arr[j + 1], arr[j]", // 4
        "    return arr"                                 // 5
      ],
      
      java: [
        "public static void bubbleSort(int[] arr) {",    // 0
        "    for (int i = 0; i < arr.length - 1; i++) {", // 1
        "        for (int j = 0; j < arr.length - i - 1; j++) {", // 2
        "            if (arr[j] > arr[j + 1]) {",         // 3
        "                int temp = arr[j];",             // 4
        "                arr[j] = arr[j + 1];",           // 5
        "                arr[j + 1] = temp;",             // 6
        "            }",                                  // 7
        "        }",                                      // 8
        "    }",                                         // 9
        "}"                                              // 10
      ],
      
      cpp: [
        "void bubbleSort(vector<int>& arr) {",           // 0
        "    for (int i = 0; i < arr.size() - 1; i++) {", // 1
        "        for (int j = 0; j < arr.size() - i - 1; j++) {", // 2
        "            if (arr[j] > arr[j + 1]) {",         // 3
        "                swap(arr[j], arr[j + 1]);",      // 4
        "            }",                                  // 5
        "        }",                                      // 6
        "    }",                                         // 7
        "}"                                              // 8
      ],
      
      c: [
        "void bubbleSort(int arr[], int n) {",           // 0
        "    for (int i = 0; i < n - 1; i++) {",        // 1
        "        for (int j = 0; j < n - i - 1; j++) {", // 2
        "            if (arr[j] > arr[j + 1]) {",         // 3
        "                int temp = arr[j];",             // 4
        "                arr[j] = arr[j + 1];",           // 5
        "                arr[j + 1] = temp;",             // 6
        "            }",                                  // 7
        "        }",                                      // 8
        "    }",                                         // 9
        "}"                                              // 10
      ]
    };

    return codeLines[language] || [];
  },

  // Code templates for different languages (function only)
  getCode: (language) => {
    const codes = {
      javascript: `function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}`,

      python: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr`,

      java: `public static void bubbleSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}`,

      cpp: `void bubbleSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
            }
        }
    }
}`,

      c: `void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}`
    };

    return codes[language] || `// ${language} implementation not available yet`;
  }
};