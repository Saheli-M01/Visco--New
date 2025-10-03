export const description = "Bubble Sort is the simplest sorting algorithm that works by repeatedly swapping the adjacent elements if they are in the wrong order. This algorithm is not suitable for large data sets as its average and worst-case time complexity is quite high.";
export const howItWorks = [
  "Compare adjacent elements in the array",
  "Swap them if they are in the wrong order",
  "Continue until no more swaps are needed",
  "The largest element 'bubbles' to the end in each pass",
];

export const timeComplexity = {
  best: "O(n)",
  average: "O(n²)",
  worst: "O(n²)",
};

export const spaceComplexity = "O(1)";
const codes = {
  javascript: `// Bubble Sort - JavaScript (runnable)
function bubbleSort(arr) {
  const a = [...arr];
  const n = a.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
      }
    }
  }
  return a;
}

// Example usage
const arr = [5, 1, 4, 2, 8];
console.log('Original:', arr);
console.log('Sorted:  ', bubbleSort(arr));
`,
  python: `# Bubble Sort - Python (runnable)
def bubble_sort(arr):
    a = arr.copy()
    n = len(a)
    for i in range(n - 1):
        for j in range(n - i - 1):
            if a[j] > a[j + 1]:
                a[j], a[j + 1] = a[j + 1], a[j]
    return a

if __name__ == '__main__':
    arr = [5, 1, 4, 2, 8]
    print('Original:', arr)
    print('Sorted:  ', bubble_sort(arr))
`,
  java: `// Bubble Sort - Java (runnable)
import java.util.Arrays;

public class BubbleSortExample {
    public static int[] bubbleSort(int[] arr) {
        int[] a = Arrays.copyOf(arr, arr.length);
        int n = a.length;
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - i - 1; j++) {
                if (a[j] > a[j + 1]) {
                    int tmp = a[j];
                    a[j] = a[j + 1];
                    a[j + 1] = tmp;
                }
            }
        }
        return a;
    }

    public static void main(String[] args) {
        int[] arr = {5, 1, 4, 2, 8};
        System.out.println("Original: " + Arrays.toString(arr));
        System.out.println("Sorted:   " + Arrays.toString(bubbleSort(arr)));
    }
}
`,
  c: `/* Bubble Sort - C (runnable with a main) */
#include <stdio.h>

void bubbleSort(int a[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (a[j] > a[j + 1]) {
                int tmp = a[j];
                a[j] = a[j + 1];
                a[j + 1] = tmp;
            }
        }
    }
}

int main() {
    int arr[] = {5, 1, 4, 2, 8};
    int n = sizeof(arr) / sizeof(arr[0]);
    printf("Original: ");
    for (int i = 0; i < n; ++i) printf("%d ", arr[i]);
    printf("\n");
    bubbleSort(arr, n);
    printf("Sorted:   ");
    for (int i = 0; i < n; ++i) printf("%d ", arr[i]);
    printf("\n");
    return 0;
}
`,
  cpp: `// Bubble Sort - C++ (runnable)
#include <bits/stdc++.h>
using namespace std;

vector<int> bubbleSort(const vector<int>& arr) {
  vector<int> a = arr;
  int n = a.size();
  for (int i = 0; i < n - 1; ++i) {
    for (int j = 0; j < n - i - 1; ++j) {
      if (a[j] > a[j + 1]) swap(a[j], a[j + 1]);
    }
  }
  return a;
}

int main() {
  vector<int> arr = {5, 1, 4, 2, 8};
  cout << "Original: "; for (int v: arr) cout << v << ' ';
  cout << "\n";
  auto sorted = bubbleSort(arr);
  cout << "Sorted:   "; for (int v: sorted) cout << v << ' ';
  cout << "\n";
  return 0;
}
`,
};

export default codes;
