// Merge Sort Algorithm Implementation (instrumented for visualization)
export const mergeSort = {
  name: "Merge Sort",

  generateSteps: (arr, language = "javascript") => {
    const steps = [];
    const a = [...arr];

    // Merge helper that records step-by-step actions for visualization
    function merge(left, mid, right) {
      const n1 = mid - left + 1;
      const n2 = right - mid;
      const L = new Array(n1);
      const R = new Array(n2);
      for (let i = 0; i < n1; i++) L[i] = a[left + i];
      for (let j = 0; j < n2; j++) R[j] = a[mid + 1 + j];

      // pointers into L, R and the main array
      let i = 0,
        j = 0,
        k = left;

      // Visualize the ranges being merged with mid information
      steps.push({
        array: [...a],
        comparing: [],
        swapped: [],
        description: `Merging ranges [${left}-${mid}] and [${
          mid + 1
        }-${right}]`,
        codeLine: 7,
        phase: "merge-start",
        mergeRange: [left, right],
        leftRange: [left, mid],
        rightRange: [mid + 1, right],
        mid: { value: mid, leftIndex: left, rightIndex: right },
      });

      // merge while both have elements
      while (i < n1 && j < n2) {
        // show comparison between the two candidates
        steps.push({
          array: [...a],
          comparing: [left + i, mid + 1 + j],
          swapped: [],
          description: `Compare ${L[i]} and ${R[j]}`,
          codeLine: 10,
          phase: "comparison",
          mid: { value: mid, leftIndex: left, rightIndex: right },
        });

        if (L[i] <= R[j]) {
          a[k] = L[i];
          // highlight the index written to and the source
          steps.push({
            array: [...a],
            comparing: [],
            swapped: [k],
            description: `Write ${L[i]} to index ${k}`,
            codeLine: 11,
            phase: "write",
            mid: { value: mid, leftIndex: left, rightIndex: right },
          });
          i++;
        } else {
          a[k] = R[j];
          steps.push({
            array: [...a],
            comparing: [],
            swapped: [k],
            description: `Write ${R[j]} to index ${k}`,
            codeLine: 11,
            phase: "write",
            mid: { value: mid, leftIndex: left, rightIndex: right },
          });
          j++;
        }
        k++;
      }

      // remaining elements from left
      while (i < n1) {
        steps.push({
          array: [...a],
          comparing: [],
          swapped: [k],
          description: `Write remainder ${L[i]} from left to index ${k}`,
          codeLine: 13,
          phase: "write",
          mid: { value: mid, leftIndex: left, rightIndex: right },
        });
        a[k] = L[i];
        i++;
        k++;
      }

      // remaining elements from right
      while (j < n2) {
        steps.push({
          array: [...a],
          comparing: [],
          swapped: [k],
          description: `Write remainder ${R[j]} from right to index ${k}`,
          codeLine: 14,
          phase: "write",
          mid: { value: mid, leftIndex: left, rightIndex: right },
        });
        a[k] = R[j];
        j++;
        k++;
      }

      // mark the merged range as completed (for coloration)
      const mergedIndices = [];
      for (let idx = left; idx <= right; idx++) mergedIndices.push(idx);
      steps.push({
        array: [...a],
        comparing: [],
        swapped: mergedIndices,
        description: `Merged [${left}-${right}]`,
        codeLine: 15,
        phase: "merge-complete",
        mergeRange: [left, right],
        mid: { value: mid, leftIndex: left, rightIndex: right },
      });
    }

    function mergeSortRec(l, r) {
      if (l >= r) {
        // single element - base case (visualize as a completed single-item range)
        steps.push({
          array: [...a],
          comparing: [],
          swapped: [l],
          description: `Base case: single element at ${l}`,
          codeLine: 0,
          phase: "base",
        });
        return;
      }

      const m = Math.floor((l + r) / 2);

      // Show the mid calculation step
      steps.push({
        array: [...a],
        comparing: [],
        swapped: [],
        description: `Calculate mid: (${l} + ${r}) / 2 = ${m}`,
        codeLine: 1,
        phase: "mid-calculation",
        mid: { value: m, leftIndex: l, rightIndex: r },
      });

      // Show the divide operation
      steps.push({
        array: [...a],
        comparing: [],
        swapped: [],
        description: `Divide [${l}-${r}] -> [${l}-${m}] & [${m + 1}-${r}]`,
        codeLine: 1,
        phase: "divide",
        mid: { value: m, leftIndex: l, rightIndex: r },
      });

      // Enter left recursion
      steps.push({
        array: [...a],
        comparing: [],
        swapped: [],
        description: `Enter left: [${l}-${m}]`,
        codeLine: 2,
        phase: "divide-enter",
        mid: { value: m, leftIndex: l, rightIndex: r },
      });
      mergeSortRec(l, m);
      steps.push({
        array: [...a],
        comparing: [],
        swapped: [],
        description: `Left complete: [${l}-${m}]`,
        codeLine: 2,
        phase: "divide-done",
      });

      // Enter right recursion
      steps.push({
        array: [...a],
        comparing: [],
        swapped: [],
        description: `Enter right: [${m + 1}-${r}]`,
        codeLine: 2,
        phase: "divide-enter",
        mid: { value: m, leftIndex: l, rightIndex: r },
      });
      mergeSortRec(m + 1, r);
      steps.push({
        array: [...a],
        comparing: [],
        swapped: [],
        description: `Right complete: [${m + 1}-${r}]`,
        codeLine: 2,
        phase: "divide-done",
      });

      // Conquer: about to merge the two halves
      steps.push({
        array: [...a],
        comparing: [],
        swapped: [],
        description: `Conquer: merge [${l}-${m}] & [${m + 1}-${r}]`,
        codeLine: 1,
        phase: "conquer",
        mid: { value: m, leftIndex: l, rightIndex: r },
      });
      merge(l, m, r);

      // Subarray sorted
      steps.push({
        array: [...a],
        comparing: [],
        swapped: [],
        description: `Subarray sorted: [${l}-${r}]`,
        codeLine: 6,
        phase: "subarray-sorted",
      });
    }

    mergeSortRec(0, a.length - 1);

    steps.push({
      array: [...a],
      comparing: [],
      swapped: [],
      description: "Array sorted",
      codeLine: -1,
      phase: "completed",
    });
    return steps;
  },

  getCodeLines: (language) => {
    const lines = {
      javascript: [
        "function mergeSort(arr) {",
        "  const mid = Math.floor(arr.length / 2);",
        "  const left = arr.slice(0, mid);",
        "  const right = arr.slice(mid);",
        "  return merge(mergeSort(left), mergeSort(right));",
        "}",
        "",
        "function merge(left, right) {",
        "  const res = [];",
        "  let i = 0, j = 0;",
        "  while (i < left.length && j < right.length) {",
        "    if (left[i] <= right[j]) res.push(left[i++]); else res.push(right[j++]);",
        "  }",
        "  while (i < left.length) res.push(left[i++]);",
        "  while (j < right.length) res.push(right[j++]);",
        "  return res;",
        "}",
      ],
      python: [
        "def merge_sort(arr):",
        "        return arr",
        "    mid = len(arr) // 2",
        "    left = merge_sort(arr[:mid])",
        "    right = merge_sort(arr[mid:])",
        "    return merge(left, right)",
        "",
        "def merge(left, right):",
        "    res = []",
        "    i = j = 0",
        "    while i < len(left) and j < len(right):",
        "        if left[i] <= right[j]:",
        "            res.append(left[i]); i += 1",
        "        else:",
        "            res.append(right[j]); j += 1",
        "    res.extend(left[i:])",
        "    res.extend(right[j:])",
        "    return res",
      ],
      java: [
        "public static int[] mergeSort(int[] arr) {",
        "    int mid = arr.length / 2;",
        "    int[] left = Arrays.copyOfRange(arr, 0, mid);",
        "    int[] right = Arrays.copyOfRange(arr, mid, arr.length);",
        "    return merge(mergeSort(left), mergeSort(right));",
        "}",
        "",
        "public static int[] merge(int[] left, int[] right) {",
        "    int[] res = new int[left.length + right.length];",
        "    int i=0, j=0, k=0;",
        "    while (i < left.length && j < right.length) {",
        "        if (left[i] <= right[j]) res[k++] = left[i++]; else res[k++] = right[j++];",
        "    }",
        "    while (i < left.length) res[k++] = left[i++];",
        "    while (j < right.length) res[k++] = right[j++];",
        "    return res;",
        "}",
      ],
      c: [
        "void mergeSort(int arr[], int l, int r) {",
        "    if (l >= r) return;",
        "    int m = (l + r) / 2;",
        "    mergeSort(arr, l, m);",
        "    mergeSort(arr, m+1, r);",
        "    merge(arr, l, m, r);",
        "}",
        "",
        "void merge(int arr[], int l, int m, int r) {",
        "    int n1 = m - l + 1;",
        "    int n2 = r - m;",
        "    int L[n1], R[n2];",
        "}",
      ],
    };

    return lines[language] || lines.javascript;
  },

  getCode: (language) => {
    const codes = {
      javascript: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);
  return merge(mergeSort(left), mergeSort(right));

  function merge(left, right) {
    const res = [];
    let i = 0, j = 0;
    while (i < left.length && j < right.length) {
      if (left[i] <= right[j]) res.push(left[i++]); else res.push(right[j++]);
    }
    while (i < left.length) res.push(left[i++]);
    while (j < right.length) res.push(right[j++]);
    return res;
  }
}`,
      python: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(left, right):
  res = []
  i = j = 0
  while i < len(left) and j < len(right):
    if left[i] <= right[j]:
      res.append(left[i]); i += 1
    else:
      res.append(right[j]); j += 1
  res.extend(left[i:])
  res.extend(right[j:])
  return res`,
      java: `public static int[] mergeSort(int[] arr) {
    if (arr.length <= 1) return arr;
    int mid = arr.length / 2;
    int[] left = Arrays.copyOfRange(arr, 0, mid);
    int[] right = Arrays.copyOfRange(arr, mid, arr.length);
    return merge(mergeSort(left), mergeSort(right));

  }

  public static int[] merge(int[] left, int[] right) {
    int[] res = new int[left.length + right.length];
    int i=0, j=0, k=0;
    while (i < left.length && j < right.length) {
      if (left[i] <= right[j]) res[k++] = left[i++]; else res[k++] = right[j++];
    }
    while (i < left.length) res[k++] = left[i++];
    while (j < right.length) res[k++] = right[j++];
    return res;
  }`,
      c: `void mergeSort(int arr[], int l, int r) {
  if (l >= r) return;
  int m = (l + r) / 2;
  mergeSort(arr, l, m);
  mergeSort(arr, m + 1, r);
  merge(arr, l, m, r);
}

void merge(int arr[], int l, int m, int r) {
  int n1 = m - l + 1;
  int n2 = r - m;
  int L[n1], R[n2];
  for (int i = 0; i < n1; i++) L[i] = arr[l + i];
  for (int j = 0; j < n2; j++) R[j] = arr[m + 1 + j];
  int i = 0, j = 0, k = l;
  while (i < n1 && j < n2) {
    if (L[i] <= R[j]) arr[k++] = L[i++]; else arr[k++] = R[j++];
  }
  while (i < n1) arr[k++] = L[i++];
  while (j < n2) arr[k++] = R[j++];
}`,
    };

    return codes[language] || codes.javascript;
  },
};
