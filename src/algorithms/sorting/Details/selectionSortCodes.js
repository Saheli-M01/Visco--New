export const description = "Selection Sort divides the array into a sorted and unsorted region. It repeatedly selects the minimum from the unsorted portion and swaps it into the sorted portion.";
export const howItWorks = [
  "Find the minimum element in the unsorted portion",
  "Swap it with the first unsorted element",
  "Move the boundary of the sorted portion one step to the right",
];

export const timeComplexity = {
  best: "O(n^2)",
  average: "O(n^2)",
  worst: "O(n^2)",
};

export const spaceComplexity = "O(1)";
const codes = {
  javascript: `// Selection Sort - JavaScript (runnable)
function selectionSort(arr) {
  const a = [...arr];
  const n = a.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (a[j] < a[minIdx]) minIdx = j;
    }
    if (minIdx !== i) [a[i], a[minIdx]] = [a[minIdx], a[i]];
  }
  return a;
}

// Example usage
const arrSel = [64, 25, 12, 22, 11];
console.log('Original:', arrSel);
console.log('Sorted:  ', selectionSort(arrSel));
`,
  python: `# Selection Sort - Python (runnable)
def selection_sort(arr):
    a = arr.copy()
    n = len(a)
    for i in range(n-1):
        min_idx = i
        for j in range(i+1, n):
            if a[j] < a[min_idx]:
                min_idx = j
        if min_idx != i:
            a[i], a[min_idx] = a[min_idx], a[i]
    return a

if __name__ == '__main__':
    arr = [64, 25, 12, 22, 11]
    print('Original:', arr)
    print('Sorted:  ', selection_sort(arr))
`,
  java: `// Selection Sort - Java (runnable)
import java.util.Arrays;

public class SelectionSortExample {
    public static int[] selectionSort(int[] arr) {
        int[] a = Arrays.copyOf(arr, arr.length);
        int n = a.length;
        for (int i = 0; i < n - 1; i++) {
            int minIdx = i;
            for (int j = i + 1; j < n; j++) {
                if (a[j] < a[minIdx]) minIdx = j;
            }
            if (minIdx != i) {
                int tmp = a[i];
                a[i] = a[minIdx];
                a[minIdx] = tmp;
            }
        }
        return a;
    }

    public static void main(String[] args) {
        int[] arr = {64, 25, 12, 22, 11};
        System.out.println("Original: " + Arrays.toString(arr));
        System.out.println("Sorted:   " + Arrays.toString(selectionSort(arr)));
    }
}
`,
  c: `/* Selection Sort - C (runnable with a main) */
#include <stdio.h>

void selectionSort(int a[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (a[j] < a[minIdx]) minIdx = j;
        }
        if (minIdx != i) {
            int tmp = a[i];
            a[i] = a[minIdx];
            a[minIdx] = tmp;
        }
    }
}

int main() {
    int arr[] = {64, 25, 12, 22, 11};
    int n = sizeof(arr) / sizeof(arr[0]);
    printf("Original: ");
    for (int i = 0; i < n; ++i) printf("%d ", arr[i]);
    printf("\n");
    selectionSort(arr, n);
    printf("Sorted:   ");
    for (int i = 0; i < n; ++i) printf("%d ", arr[i]);
    printf("\n");
    return 0;
}
`,
  cpp: `// Selection Sort - C++ (runnable)
#include <bits/stdc++.h>
using namespace std;

vector<int> selectionSort(const vector<int>& arr) {
  vector<int> a = arr;
  int n = a.size();
  for (int i = 0; i < n - 1; ++i) {
    int minIdx = i;
    for (int j = i + 1; j < n; ++j) if (a[j] < a[minIdx]) minIdx = j;
    if (minIdx != i) swap(a[i], a[minIdx]);
  }
  return a;
}

int main() {
  vector<int> arr = {64, 25, 12, 22, 11};
  cout << "Original: "; for (int v: arr) cout << v << ' ';
  cout << "\n";
  auto sorted = selectionSort(arr);
  cout << "Sorted:   "; for (int v: sorted) cout << v << ' ';
  cout << "\n";
  return 0;
}
`,
};

export default codes;
