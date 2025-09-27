// Merge Sort Algorithm Implementation (instrumented for visualization)
export const mergeSort = {
  name: "Merge Sort",

  generateSteps: (arr, language = 'javascript') => {
    const steps = [];
    const a = [...arr];

    function merge(left, mid, right) {
      const n1 = mid - left + 1;
      const n2 = right - mid;
      const L = [];
      const R = [];
      for (let i = 0; i < n1; i++) L.push(a[left + i]);
      for (let j = 0; j < n2; j++) R.push(a[mid + 1 + j]);

      let i = 0, j = 0, k = left;
      while (i < n1 && j < n2) {
        steps.push({ array: [...a], comparing: [left + i, mid + 1 + j], swapped: [], description: `Compare ${L[i]} and ${R[j]}`, codeLine: 3, phase: 'comparison' });
        if (L[i] <= R[j]) {
          a[k] = L[i++];
        } else {
          a[k] = R[j++];
        }
        steps.push({ array: [...a], comparing: [], swapped: [k], description: `Write to index ${k}`, codeLine: 4, phase: 'write' });
        k++;
      }
      while (i < n1) {
        a[k] = L[i++];
        steps.push({ array: [...a], comparing: [], swapped: [k], description: `Write remainder from left to ${k}`, codeLine: 5, phase: 'write' });
        k++;
      }
      while (j < n2) {
        a[k] = R[j++];
        steps.push({ array: [...a], comparing: [], swapped: [k], description: `Write remainder from right to ${k}`, codeLine: 5, phase: 'write' });
        k++;
      }
    }

    function mergeSortRec(l, r) {
      if (l >= r) return;
      const m = Math.floor((l + r) / 2);
      steps.push({ array: [...a], comparing: [], swapped: [], description: `Divide [${l}-${r}] -> [${l}-${m}] & [${m + 1}-${r}]`, codeLine: 1, phase: 'divide' });
      mergeSortRec(l, m);
      mergeSortRec(m + 1, r);
      merge(l, m, r);
    }

    mergeSortRec(0, a.length - 1);

    steps.push({ array: [...a], comparing: [], swapped: [], description: 'Array sorted', codeLine: -1, phase: 'completed' });
    return steps;
  },

  getCodeLines: (language) => {
    const lines = {
      javascript: [
        'function mergeSort(arr) {',
        '  if (arr.length <= 1) return arr;',
        '  const mid = Math.floor(arr.length / 2);',
        '  const left = arr.slice(0, mid);',
        '  const right = arr.slice(mid);',
        '  return merge(mergeSort(left), mergeSort(right));',
        '}',
        '',
        'function merge(a, b) {',
        '  const res = [];',
        '  let i = 0, j = 0;',
        '  while (i < a.length && j < b.length) {',
        '    if (a[i] <= b[j]) res.push(a[i++]); else res.push(b[j++]);',
        '  }',
        '  while (i < a.length) res.push(a[i++]);',
        '  while (j < b.length) res.push(b[j++]);',
        '  return res;',
        '}',
      ],
      python: [
        'def merge_sort(arr):',
        '    if len(arr) <= 1:',
        '        return arr',
        '    mid = len(arr) // 2',
        '    left = merge_sort(arr[:mid])',
        '    right = merge_sort(arr[mid:])',
        '    return merge(left, right)',
        '',
        'def merge(a, b):',
        '    res = []',
        '    i = j = 0',
        '    while i < len(a) and j < len(b):',
        '        if a[i] <= b[j]:',
        '            res.append(a[i]); i += 1',
        '        else:',
        '            res.append(b[j]); j += 1',
        '    res.extend(a[i:])',
        '    res.extend(b[j:])',
        '    return res',
      ],
      java: [
        'public static int[] mergeSort(int[] arr) {',
        '    if (arr.length <= 1) return arr;',
        '    int mid = arr.length / 2;',
        '    int[] left = Arrays.copyOfRange(arr, 0, mid);',
        '    int[] right = Arrays.copyOfRange(arr, mid, arr.length);',
        '    return merge(mergeSort(left), mergeSort(right));',
        '}',
        '',
        'public static int[] merge(int[] a, int[] b) {',
        '    int[] res = new int[a.length + b.length];',
        '    int i=0, j=0, k=0;',
        '    while (i < a.length && j < b.length) {',
        '        if (a[i] <= b[j]) res[k++] = a[i++]; else res[k++] = b[j++];',
        '    }',
        '    while (i < a.length) res[k++] = a[i++];',
        '    while (j < b.length) res[k++] = b[j++];',
        '    return res;',
        '}',
      ],
      c: [
        'void mergeSort(int arr[], int l, int r) {',
        '    if (l >= r) return;',
        '    int m = (l + r) / 2;',
        '    mergeSort(arr, l, m);',
        '    mergeSort(arr, m+1, r);',
        '    merge(arr, l, m, r);',
        '}',
        '',
        'void merge(int arr[], int l, int m, int r) {',
        '    int n1 = m - l + 1;',
        '    int n2 = r - m;',
        '    int L[n1], R[n2];',
        '    // copy and merge',
        '}',
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

  function merge(a, b) {
    const res = [];
    let i = 0, j = 0;
    while (i < a.length && j < b.length) {
      if (a[i] <= b[j]) res.push(a[i++]); else res.push(b[j++]);
    }
    while (i < a.length) res.push(a[i++]);
    while (j < b.length) res.push(b[j++]);
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

def merge(a, b):
    res = []
    i = j = 0
    while i < len(a) and j < len(b):
        if a[i] <= b[j]:
            res.append(a[i]); i += 1
        else:
            res.append(b[j]); j += 1
    res.extend(a[i:])
    res.extend(b[j:])
    return res`,
      java: `public static int[] mergeSort(int[] arr) {
    if (arr.length <= 1) return arr;
    int mid = arr.length / 2;
    int[] left = Arrays.copyOfRange(arr, 0, mid);
    int[] right = Arrays.copyOfRange(arr, mid, arr.length);
    return merge(mergeSort(left), mergeSort(right));

  }

  public static int[] merge(int[] a, int[] b) {
    int[] res = new int[a.length + b.length];
    int i=0, j=0, k=0;
    while (i < a.length && j < b.length) {
      if (a[i] <= b[j]) res[k++] = a[i++]; else res[k++] = b[j++];
    }
    while (i < a.length) res[k++] = a[i++];
    while (j < b.length) res[k++] = b[j++];
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
}`
    };

    return codes[language] || codes.javascript;
  }
};
