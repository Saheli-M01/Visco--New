export const description = "Heap Sort builds a heap from the input, then repeatedly extracts the maximum element to produce a sorted array.";
export const howItWorks = [
  "Build a max-heap from the input array",
  "Swap the root (max) with the last element and reduce the heap size",
  "Heapify the root to restore max-heap property and repeat",
];

export const timeComplexity = {
  best: "O(n log n)",
  average: "O(n log n)",
  worst: "O(n log n)",
};

export const spaceComplexity = "O(1)";

export const pseudoCode = `heapSort(A):\n  buildMaxHeap(A)\n  for i = n-1 downto 1:\n    swap(A[0], A[i])\n    heapSize--\n    heapify(A, 0)`;

const codes = {
  javascript: `// Heap Sort - JavaScript (runnable)
function heapify(arr, n, i) {
  let largest = i;
  let l = 2 * i + 1;
  let r = 2 * i + 2;
  if (l < n && arr[l] > arr[largest]) largest = l;
  if (r < n && arr[r] > arr[largest]) largest = r;
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest);
  }
}
function heapSort(arr) {
  let n = arr.length;
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--)
    heapify(arr, n, i);
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, i, 0);
  }
  return arr;
}
// Example usage
const arr = [12, 11, 13, 5, 6, 7];
console.log('Original:', arr);
console.log('Sorted:  ', heapSort([...arr]));
`,
  python: `# Heap Sort - Python (runnable)
def heapify(a, n, i):
    largest = i
    l = 2 * i + 1
    r = 2 * i + 2
    if l < n and a[l] > a[largest]:
        largest = l
    if r < n and a[r] > a[largest]:
        largest = r
    if largest != i:
        a[i], a[largest] = a[largest], a[i]
        heapify(a, n, largest)

def heap_sort(a):
    n = len(a)
    for i in range(n // 2 - 1, -1, -1):
        heapify(a, n, i)
    for i in range(n - 1, 0, -1):
        a[0], a[i] = a[i], a[0]
        heapify(a, i, 0)
    return a

if __name__ == '__main__':
    arr = [12, 11, 13, 5, 6, 7]
    print('Original:', arr)
    print('Sorted:  ', heap_sort(arr.copy()))
`,
  java: `// Heap Sort - Java (runnable example)
import java.util.Arrays;

public class HeapSortExample {
    static void heapify(int[] a, int n, int i) {
        int largest = i;
        int l = 2 * i + 1;
        int r = 2 * i + 2;
        if (l < n && a[l] > a[largest]) largest = l;
        if (r < n && a[r] > a[largest]) largest = r;
        if (largest != i) {
            int tmp = a[i]; a[i] = a[largest]; a[largest] = tmp;
            heapify(a, n, largest);
        }
    }

    public static void heapSort(int[] a) {
        int n = a.length;
        for (int i = n / 2 - 1; i >= 0; i--) heapify(a, n, i);
        for (int i = n - 1; i > 0; i--) {
            int tmp = a[0]; a[0] = a[i]; a[i] = tmp;
            heapify(a, i, 0);
        }
    }

    public static void main(String[] args) {
        int[] arr = {12, 11, 13, 5, 6, 7};
        System.out.println("Original: " + Arrays.toString(arr));
        heapSort(arr);
        System.out.println("Sorted:   " + Arrays.toString(arr));
    }
}
`,
  c: `/* Heap Sort - C (runnable) */
#include <stdio.h>
#include <stdlib.h>

void heapify(int a[], int n, int i) {
    int largest = i;
    int l = 2 * i + 1;
    int r = 2 * i + 2;
    if (l < n && a[l] > a[largest]) largest = l;
    if (r < n && a[r] > a[largest]) largest = r;
    if (largest != i) {
        int tmp = a[i]; a[i] = a[largest]; a[largest] = tmp;
        heapify(a, n, largest);
    }
}

void heapSort(int a[], int n) {
    for (int i = n/2 - 1; i >= 0; --i) heapify(a, n, i);
    for (int i = n - 1; i > 0; --i) {
        int tmp = a[0]; a[0] = a[i]; a[i] = tmp;
        heapify(a, i, 0);
    }
}

int main() {
    int arr[] = {12, 11, 13, 5, 6, 7};
    int n = sizeof(arr)/sizeof(arr[0]);
    printf("Original: "); for (int i = 0; i < n; ++i) printf("%d ", arr[i]); printf("\n");
    heapSort(arr, n);
    printf("Sorted:   "); for (int i = 0; i < n; ++i) printf("%d ", arr[i]); printf("\n");
    return 0;
}
`,
  cpp: `// Heap Sort - C++ (runnable)
#include <bits/stdc++.h>
using namespace std;

void heapify(vector<int>& a, int n, int i) {
    int largest = i;
    int l = 2 * i + 1;
    int r = 2 * i + 2;
    if (l < n && a[l] > a[largest]) largest = l;
    if (r < n && a[r] > a[largest]) largest = r;
    if (largest != i) {
        swap(a[i], a[largest]);
        heapify(a, n, largest);
    }
}

vector<int> heapSort(vector<int> a) {
    int n = a.size();
    for (int i = n/2 - 1; i >= 0; --i) heapify(a, n, i);
    for (int i = n - 1; i > 0; --i) {
        swap(a[0], a[i]);
        heapify(a, i, 0);
    }
    return a;
}

int main() {
    vector<int> arr = {12, 11, 13, 5, 6, 7};
    cout << "Original: "; for (int v: arr) cout << v << ' '; cout << "\n";
    auto sorted = heapSort(arr);
    cout << "Sorted:   "; for (int v: sorted) cout << v << ' '; cout << "\n";
    return 0;
}
`,
};

export default codes;
