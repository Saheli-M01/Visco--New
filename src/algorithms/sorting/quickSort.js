// Quick Sort Algorithm Implementation (Lomuto partition) with visualization steps
export const quickSort = {
  name: "Quick Sort",

  generateSteps: (arr, language = 'javascript', pivotStrategy = 'last') => {
    const steps = [];
    const a = [...arr];

    function partition(low, high) {
      // Choose pivot based on strategy
      let pivotIdx = high; // default: last element
      
      if (pivotStrategy === 'first') {
        pivotIdx = low;
      } else if (pivotStrategy === 'middle') {
        pivotIdx = Math.floor((low + high) / 2);
      } else if (typeof pivotStrategy === 'number') {
        // Index-based pivot selection
        pivotIdx = Math.min(Math.max(pivotStrategy, low), high);
      }
      // For 'last', pivotIdx remains high
      
      // Move chosen pivot to last position if not already there
      if (pivotIdx !== high) {
        const temp = a[pivotIdx];
        a[high] = a[pivotIdx];
        a[pivotIdx] = temp;
        
        steps.push({ 
          array: [...a], 
          comparing: [], 
          swapped: [pivotIdx, high], 
          description: `Move pivot from position ${pivotIdx} to end (position ${high})`, 
          codeLine: 7,
          phase: 'pivot-move',
          pivotIndex: high,
          partitionRange: [low, high]
        });
      }
      
      const pivot = a[high];
      let i = low - 1;
      
      // Show pivot selection
      steps.push({ 
        array: [...a], 
        comparing: [], 
        swapped: [], 
        description: `Select pivot (${typeof pivotStrategy === 'number' ? `index ${pivotStrategy}` : pivotStrategy}): arr[${high}] = ${pivot}`, 
        codeLine: 7,
        phase: 'pivot-selection',
        pivotIndex: high,
        partitionRange: [low, high],
        pivotStrategy: pivotStrategy
      });

      // Show partition start
      steps.push({ 
        array: [...a], 
        comparing: [], 
        swapped: [], 
        description: `Partitioning range [${low}-${high}], i = ${i}`, 
        codeLine: 8,
        phase: 'partition-start',
        pivotIndex: high,
        partitionRange: [low, high]
      });

      for (let j = low; j <= high - 1; j++) {
        steps.push({ 
          array: [...a], 
          comparing: [j, high], 
          swapped: [], 
          description: `Compare arr[${j}] (${a[j]}) with pivot ${pivot}`, 
          codeLine: 10, 
          phase: 'comparison',
          pivotIndex: high,
          partitionRange: [low, high]
        });
        
        if (a[j] < pivot) {
          i++;
          const t1 = a[i], t2 = a[j];
          
          if (language === 'c' || language === 'java') {
            steps.push({ 
              array: [...a], 
              comparing: [i, j], 
              swapped: [], 
              description: `arr[${j}] < pivot, increment i to ${i}, temp = ${t1}`, 
              temp: { value: t1, index: i }, 
              codeLine: 12, 
              phase: 'swap_step',
              pivotIndex: high,
              partitionRange: [low, high]
            });
            a[i] = t2;
            steps.push({ 
              array: [...a], 
              comparing: [i, j], 
              swapped: [i], 
              description: `arr[${i}] = ${t2}`, 
              temp: { value: t1, index: i }, 
              codeLine: 13, 
              phase: 'swap_step',
              pivotIndex: high,
              partitionRange: [low, high]
            });
            a[j] = t1;
            steps.push({ 
              array: [...a], 
              comparing: [i, j], 
              swapped: [i, j], 
              description: `arr[${j}] = ${t1}`, 
              temp: { value: t1, index: i }, 
              codeLine: 14, 
              phase: 'swap',
              pivotIndex: high,
              partitionRange: [low, high]
            });
          } else {
            steps.push({ 
              array: [...a], 
              comparing: [i, j], 
              swapped: [], 
              description: `arr[${j}] < pivot, increment i to ${i}`, 
              codeLine: 12, 
              phase: 'increment',
              pivotIndex: high,
              partitionRange: [low, high]
            });
            [a[i], a[j]] = [a[j], a[i]];
            steps.push({ 
              array: [...a], 
              comparing: [i, j], 
              swapped: [i, j], 
              description: `Swap arr[${i}] and arr[${j}]: ${t1} ↔ ${t2}`, 
              codeLine: 13, 
              phase: 'swap',
              pivotIndex: high,
              partitionRange: [low, high]
            });
          }
        }
      }
      
      // Place pivot in correct position
      const t = a[i + 1];
      const pivotPos = i + 1;
      
      if (language === 'c' || language === 'java') {
        steps.push({ 
          array: [...a], 
          comparing: [], 
          swapped: [], 
          description: `Place pivot at position ${pivotPos}, temp = ${t}`, 
          temp: { value: t, index: pivotPos }, 
          codeLine: 16, 
          phase: 'pivot_placement',
          pivotIndex: high,
          partitionRange: [low, high]
        });
        a[i + 1] = a[high];
        steps.push({ 
          array: [...a], 
          comparing: [], 
          swapped: [pivotPos], 
          description: `arr[${pivotPos}] = ${a[pivotPos]}`, 
          temp: { value: t, index: pivotPos }, 
          codeLine: 17, 
          phase: 'pivot_placement',
          pivotIndex: pivotPos,
          partitionRange: [low, high]
        });
        a[high] = t;
        steps.push({ 
          array: [...a], 
          comparing: [], 
          swapped: [pivotPos, high], 
          description: `arr[${high}] = ${t}`, 
          temp: { value: t, index: pivotPos }, 
          codeLine: 18, 
          phase: 'pivot_placed',
          pivotIndex: pivotPos,
          partitionRange: [low, high]
        });
      } else {
        [a[i + 1], a[high]] = [a[high], a[i + 1]];
        steps.push({ 
          array: [...a], 
          comparing: [], 
          swapped: [pivotPos, high], 
          description: `Place pivot ${pivot} at position ${pivotPos}`, 
          codeLine: 16, 
          phase: 'pivot_placed',
          pivotIndex: pivotPos,
          partitionRange: [low, high]
        });
      }
      
      return i + 1;
    }

    function quickRec(low, high) {
      if (low < high) {
        // Show recursive call start
        steps.push({ 
          array: [...a], 
          comparing: [], 
          swapped: [], 
          description: `QuickSort range [${low}-${high}]`, 
          codeLine: 1, 
          phase: 'recursive-call',
          partitionRange: [low, high]
        });
        
        const pi = partition(low, high);
        
        // Show partition result
        steps.push({ 
          array: [...a], 
          comparing: [], 
          swapped: [], 
          description: `Pivot placed at ${pi}. Left: [${low}-${pi-1}], Right: [${pi+1}-${high}]`, 
          codeLine: 4, 
          phase: 'partition-complete',
          pivotIndex: pi,
          leftRange: low < pi ? [low, pi - 1] : null,
          rightRange: pi + 1 <= high ? [pi + 1, high] : null
        });
        
        // Recurse on left
        if (low < pi - 1) {
          steps.push({ 
            array: [...a], 
            comparing: [], 
            swapped: [], 
            description: `Recursively sort left part [${low}-${pi-1}]`, 
            codeLine: 5, 
            phase: 'recurse-left',
            partitionRange: [low, pi - 1],
            pivotIndex: pi
          });
        }
        quickRec(low, pi - 1);
        
        // Recurse on right
        if (pi + 1 <= high) {
          steps.push({ 
            array: [...a], 
            comparing: [], 
            swapped: [], 
            description: `Recursively sort right part [${pi+1}-${high}]`, 
            codeLine: 6, 
            phase: 'recurse-right',
            partitionRange: [pi + 1, high],
            pivotIndex: pi
          });
        }
        quickRec(pi + 1, high);
        
        // Show completion of current range
        steps.push({ 
          array: [...a], 
          comparing: [], 
          swapped: [], 
          description: `Completed sorting range [${low}-${high}]`, 
          codeLine: 6, 
          phase: 'range-complete',
          partitionRange: [low, high]
        });
      } else {
        // Base case
        steps.push({ 
          array: [...a], 
          comparing: [], 
          swapped: [], 
          description: `Base case: range [${low}-${high}] has ${high - low + 1} element(s)`, 
          codeLine: 2, 
          phase: 'base-case',
          partitionRange: [low, high]
        });
      }
    }

    steps.push({ 
      array: [...a], 
      comparing: [], 
      swapped: [], 
      description: 'Starting QuickSort...', 
      codeLine: 0, 
      phase: 'start' 
    });
    
    quickRec(0, a.length - 1);
    
    steps.push({ 
      array: [...a], 
      comparing: [], 
      swapped: [], 
      description: 'Array sorted!', 
      codeLine: -1, 
      phase: 'completed' 
    });
    
    return steps;
  },

  getCodeLines: (language) => {
    const lines = {
      javascript: [
        "function quickSort(arr, low, high) {",
        "  if (low < high) {",
        "    return;",
        "  }",
        "  const pi = partition(arr, low, high);",
        "  quickSort(arr, low, pi - 1);",
        "  quickSort(arr, pi + 1, high);",
        "function partition(arr, low, high) {",
        "  let i = low - 1;",
        "  const pivot = arr[high];",
        "  for (let j = low; j < high; j++) {",
        "    if (arr[j] < pivot) {",
        "      i++;",
        "      [arr[i], arr[j]] = [arr[j], arr[i]];",
        "    }",
        "  }",
        "  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];",
        "  return i + 1;",
        "}",
      ],
      python: [
        "def quick_sort(arr, low, high):",
        "    if low < high:",
        "        return",
        "    pi = partition(arr, low, high)",
        "    quick_sort(arr, low, pi - 1)",
        "    quick_sort(arr, pi + 1, high)",
        "",
        "def partition(arr, low, high):",
        "    i = low - 1",
        "    pivot = arr[high]",
        "    for j in range(low, high):",
        "        if arr[j] < pivot:",
        "            i += 1",
        "            arr[i], arr[j] = arr[j], arr[i]",
        "    arr[i + 1], arr[high] = arr[high], arr[i + 1]",
        "    return i + 1",
      ],
      java: [
        "public static void quickSort(int[] arr, int low, int high) {",
        "    if (low < high) {",
        "        return;",
        "    }",
        "    int pi = partition(arr, low, high);",
        "    quickSort(arr, low, pi - 1);",
        "    quickSort(arr, pi + 1, high);",
        "public static int partition(int[] arr, int low, int high) {",
        "    int i = low - 1;",
        "    int pivot = arr[high];",
        "    for (int j = low; j < high; j++) {",
        "        if (arr[j] < pivot) {",
        "            i++;",
        "            int temp = arr[i];",
        "            arr[i] = arr[j];",
        "            arr[j] = temp;",
        "        }",
        "    }",
        "    int temp = arr[i + 1];",
        "    arr[i + 1] = arr[high];",
        "    arr[high] = temp;",
        "    return i + 1;",
        "}",
      ],
      c: [
        "void quickSort(int arr[], int low, int high) {",
        "    if (low < high) {",
        "        return;",
        "    }",
        "    int pi = partition(arr, low, high);",
        "    quickSort(arr, low, pi - 1);",
        "    quickSort(arr, pi + 1, high);",
        "int partition(int arr[], int low, int high) {",
        "    int i = low - 1;",
        "    int pivot = arr[high];",
        "    for (int j = low; j < high; j++) {",
        "        if (arr[j] < pivot) {",
        "            i++;",
        "            int temp = arr[i];",
        "            arr[i] = arr[j];",
        "            arr[j] = temp;",
        "        }",
        "    }",
        "    int temp = arr[i + 1];",
        "    arr[i + 1] = arr[high];",
        "    arr[high] = temp;",
        "    return i + 1;",
        "}",
      ],
    };
    
    return lines[language] || lines.javascript;
  },

  getCode: (language) => {
    const codes = {
      javascript: `function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
  return arr;
}

function partition(arr, low, high) {
  let i = low - 1;
  const pivot = arr[high];
  
  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}`,

      python: `def quick_sort(arr, low=0, high=None):
    if high is None:
        high = len(arr) - 1
    
    if low < high:
        pi = partition(arr, low, high)
        quick_sort(arr, low, pi - 1)
        quick_sort(arr, pi + 1, high)
    
    return arr

def partition(arr, low, high):
    i = low - 1
    pivot = arr[high]
    
    for j in range(low, high):
        if arr[j] < pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1`,

      java: `public static void quickSort(int[] arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

public static int partition(int[] arr, int low, int high) {
    int i = low - 1;
    int pivot = arr[high];
    
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
    
    int temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    return i + 1;
}`,

      c: `void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

int partition(int arr[], int low, int high) {
    int i = low - 1;
    int pivot = arr[high];
    
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
    
    int temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    return i + 1;
}`,
    };
    
    return codes[language] || codes.javascript;
  }
};
