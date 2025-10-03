export const description = "Merge Sort is a divide-and-conquer algorithm that divides the array into halves, sorts each half, and then merges the sorted halves.";
export const howItWorks = [
  "Divide the array into two halves",
  "Recursively sort each half",
  "Merge the two sorted halves into a single sorted array",
];

export const timeComplexity = {
  best: "O(n log n)",
  average: "O(n log n)",
  worst: "O(n log n)",
};

export const spaceComplexity = "O(n)";
const codes = {
  javascript: `// Merge Sort - JavaScript (runnable)
function mergeSort(arr) {
  if (arr.length <= 1) return [...arr];
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  const merged = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) merged.push(left[i++]);
    else merged.push(right[j++]);
  }
  return merged.concat(left.slice(i)).concat(right.slice(j));
}

// Example usage
const arr = [38, 27, 43, 3, 9, 82, 10];
console.log('Original:', arr);
console.log('Sorted:  ', mergeSort(arr));
`,
  python: `# Merge Sort - Python (runnable)
def merge_sort(a):
    if len(a) <= 1:
        return a.copy()
    mid = len(a) // 2
    left = merge_sort(a[:mid])
    right = merge_sort(a[mid:])
    merged = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            merged.append(left[i]); i += 1
        else:
            merged.append(right[j]); j += 1
    merged.extend(left[i:])
    merged.extend(right[j:])
    return merged

if __name__ == '__main__':
    arr = [38, 27, 43, 3, 9, 82, 10]
    print('Original:', arr)
    print('Sorted:  ', merge_sort(arr))
`,
  java: `// Merge Sort - Java (runnable)
import java.util.Arrays;

public class MergeSortExample {
    public static void merge(int[] a, int l, int m, int r) {
        int n1 = m - l + 1;
        int n2 = r - m;
        int[] L = new int[n1];
        int[] R = new int[n2];
        for (int i = 0; i < n1; ++i) L[i] = a[l + i];
        for (int j = 0; j < n2; ++j) R[j] = a[m + 1 + j];
        int i = 0, j = 0, k = l;
        while (i < n1 && j < n2) {
            if (L[i] <= R[j]) a[k++] = L[i++];
            else a[k++] = R[j++];
        }
        while (i < n1) a[k++] = L[i++];
        while (j < n2) a[k++] = R[j++];
    }

    public static void mergeSort(int[] a, int l, int r) {
        if (l < r) {
            int m = (l + r) / 2;
            mergeSort(a, l, m);
            mergeSort(a, m + 1, r);
            merge(a, l, m, r);
        }
    }

    public static void main(String[] args) {
        int[] arr = {38, 27, 43, 3, 9, 82, 10};
        System.out.println("Original: " + Arrays.toString(arr));
        mergeSort(arr, 0, arr.length - 1);
        System.out.println("Sorted:   " + Arrays.toString(arr));
    }
}
`,
  c: `/* Merge Sort - C (runnable with a main) */
#include <stdio.h>
#include <stdlib.h>

void merge(int a[], int l, int m, int r) {
    int n1 = m - l + 1;
    int n2 = r - m;
    int *L = malloc(n1 * sizeof(int));
    int *R = malloc(n2 * sizeof(int));
    for (int i = 0; i < n1; ++i) L[i] = a[l + i];
    for (int j = 0; j < n2; ++j) R[j] = a[m + 1 + j];
    int i = 0, j = 0, k = l;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) a[k++] = L[i++];
        else a[k++] = R[j++];
    }
    while (i < n1) a[k++] = L[i++];
    while (j < n2) a[k++] = R[j++];
    free(L);
    free(R);
}

void mergeSort(int a[], int l, int r) {
    if (l < r) {
        int m = (l + r) / 2;
        mergeSort(a, l, m);
        mergeSort(a, m + 1, r);
        merge(a, l, m, r);
    }
}

int main() {
    int arr[] = {38, 27, 43, 3, 9, 82, 10};
    int n = sizeof(arr) / sizeof(arr[0]);
    printf("Original: "); for (int i = 0; i < n; ++i) printf("%d ", arr[i]);
    printf("\n");
    mergeSort(arr, 0, n - 1);
    printf("Sorted:   "); for (int i = 0; i < n; ++i) printf("%d ", arr[i]);
    printf("\n");
    return 0;
}
`,
  cpp: `// Merge Sort - C++ (runnable)
#include <bits/stdc++.h>
using namespace std;

vector<int> mergeSort(const vector<int>& a) {
  if (a.size() <= 1) return a;
  size_t mid = a.size() / 2;
  vector<int> left(a.begin(), a.begin() + mid);
  vector<int> right(a.begin() + mid, a.end());
  left = mergeSort(left);
  right = mergeSort(right);
  vector<int> merged;
  merged.reserve(a.size());
  size_t i = 0, j = 0;
  while (i < left.size() && j < right.size()) {
    if (left[i] <= right[j]) merged.push_back(left[i++]);
    else merged.push_back(right[j++]);
  }
  while (i < left.size()) merged.push_back(left[i++]);
  while (j < right.size()) merged.push_back(right[j++]);
  return merged;
}

int main() {
  vector<int> arr = {38, 27, 43, 3, 9, 82, 10};
  cout << "Original: "; for (int v: arr) cout << v << ' ';
  cout << "\n";
  auto sorted = mergeSort(arr);
  cout << "Sorted:   "; for (int v: sorted) cout << v << ' ';
  cout << "\n";
  return 0;
}
`,
};

export default codes;
