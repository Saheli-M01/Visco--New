export const description = "Shell Sort is an in-place comparison sort that generalizes insertion sort by allowing exchanges of elements far apart using gap sequences.";
export const howItWorks = [
  "Start with a large gap and perform gapped insertion sort",
  "Reduce the gap and repeat the gapped insertion sorts",
  "Finish with gap = 1 which is a regular insertion sort",
];

export const timeComplexity = {
  best: "O(n log n) (depends on gap sequence)",
  average: "Varies (commonly around O(n^(3/2)))",
  worst: "O(n^2)",
};

export const spaceComplexity = "O(1)";

export const pseudoCode = `shellSort(A):\n  gap = n/2\n  while gap > 0:\n    for i from gap to n-1:\n      temp = A[i]\n      j = i\n      while j >= gap and A[j-gap] > temp:\n        A[j] = A[j-gap]\n        j -= gap\n      A[j] = temp\n    gap = gap/2`;

const codes = {
  javascript: `// Shell Sort - JavaScript (runnable)
function shellSort(arr) {
  const a = [...arr];
  let n = a.length;
  for (let gap = Math.floor(n/2); gap > 0; gap = Math.floor(gap/2)) {
    for (let i = gap; i < n; i++) {
      let temp = a[i], j;
      for (j = i; j >= gap && a[j-gap] > temp; j -= gap) {
        a[j] = a[j-gap];
      }
      a[j] = temp;
    }
  }
  return a;
}
// Example usage
const arr = [12, 34, 54, 2, 3];
console.log('Original:', arr);
console.log('Sorted:  ', shellSort(arr));
`,
  python: `# Shell Sort - Python (runnable)
def shell_sort(arr):
    a = arr.copy()
    n = len(a)
    gap = n // 2
    while gap > 0:
        for i in range(gap, n):
            temp = a[i]
            j = i
            while j >= gap and a[j-gap] > temp:
                a[j] = a[j-gap]
                j -= gap
            a[j] = temp
        gap //= 2
    return a

if __name__ == '__main__':
    arr = [12, 34, 54, 2, 3]
    print('Original:', arr)
    print('Sorted:  ', shell_sort(arr))
`,
  java: `// Shell Sort - Java (runnable example)
import java.util.Arrays;

public class ShellSortExample {
    public static int[] shellSort(int[] arr) {
        int[] a = Arrays.copyOf(arr, arr.length);
        int n = a.length;
        for (int gap = n/2; gap > 0; gap /= 2) {
            for (int i = gap; i < n; i++) {
                int temp = a[i];
                int j = i;
                while (j >= gap && a[j-gap] > temp) {
                    a[j] = a[j-gap];
                    j -= gap;
                }
                a[j] = temp;
            }
        }
        return a;
    }

    public static void main(String[] args) {
        int[] arr = {12, 34, 54, 2, 3};
        System.out.println("Original: " + Arrays.toString(arr));
        System.out.println("Sorted:   " + Arrays.toString(shellSort(arr)));
    }
}
`,
  c: `/* Shell Sort - C (runnable) */
#include <stdio.h>
#include <stdlib.h>

void shellSort(int a[], int n) {
    for (int gap = n/2; gap > 0; gap /= 2) {
        for (int i = gap; i < n; ++i) {
            int temp = a[i];
            int j;
            for (j = i; j >= gap && a[j-gap] > temp; j -= gap)
                a[j] = a[j-gap];
            a[j] = temp;
        }
    }
}

int main() {
    int arr[] = {12, 34, 54, 2, 3};
    int n = sizeof(arr)/sizeof(arr[0]);
    printf("Original: "); for (int i = 0; i < n; ++i) printf("%d ", arr[i]); printf("\n");
    shellSort(arr, n);
    printf("Sorted:   "); for (int i = 0; i < n; ++i) printf("%d ", arr[i]); printf("\n");
    return 0;
}
`,
  cpp: `// Shell Sort - C++ (runnable)
#include <bits/stdc++.h>
using namespace std;

vector<int> shellSort(vector<int> a) {
    int n = a.size();
    for (int gap = n/2; gap > 0; gap /= 2) {
        for (int i = gap; i < n; ++i) {
            int temp = a[i];
            int j;
            for (j = i; j >= gap && a[j-gap] > temp; j -= gap) a[j] = a[j-gap];
            a[j] = temp;
        }
    }
    return a;
}

int main() {
    vector<int> arr = {12, 34, 54, 2, 3};
    cout << "Original: "; for (int v: arr) cout << v << ' '; cout << "\n";
    auto sorted = shellSort(arr);
    cout << "Sorted:   "; for (int v: sorted) cout << v << ' '; cout << "\n";
    return 0;
}
`,
};

export default codes;
