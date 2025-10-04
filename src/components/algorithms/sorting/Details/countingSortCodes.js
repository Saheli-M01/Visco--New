export const description = "Counting Sort counts the occurrences of each value and computes positions; it's efficient when the range of input (k) is not much larger than the number of elements.";
export const howItWorks = [
  "Count occurrences of each distinct element",
  "Compute prefix sums to determine positions",
  "Place elements into output array using counts to ensure stability",
];

export const timeComplexity = {
  best: "O(n + k)",
  average: "O(n + k)",
  worst: "O(n + k)",
};

export const spaceComplexity = "O(n + k)";

export const pseudoCode = `countingSort(A, k):\n  let count[0..k] = 0\n  for each a in A: count[a]++\n  for i from 1 to k: count[i] += count[i-1]\n  for each a in A (reverse): output[count[a]-1] = a; count[a]--`;

const codes = {
  javascript: `// Counting Sort - JavaScript (runnable)
function countingSort(arr, max) {
  let count = new Array(max + 1).fill(0);
  let output = new Array(arr.length);
  for (let i = 0; i < arr.length; i++) count[arr[i]]++;
  for (let i = 1; i <= max; i++) count[i] += count[i - 1];
  for (let i = arr.length - 1; i >= 0; i--) {
    output[count[arr[i]] - 1] = arr[i];
    count[arr[i]]--;
  }
  for (let i = 0; i < arr.length; i++) arr[i] = output[i];
  return arr;
}
// Example usage
const arr = [1, 4, 1, 2, 7, 5, 2];
console.log('Original:', arr);
console.log('Sorted:  ', countingSort([...arr], 9));
`,
  python: `# Counting Sort - Python (runnable)
def counting_sort(arr, maximum):
    count = [0] * (maximum + 1)
    for v in arr:
        count[v] += 1
    for i in range(1, len(count)):
        count[i] += count[i - 1]
    output = [0] * len(arr)
    for v in reversed(arr):
        output[count[v] - 1] = v
        count[v] -= 1
    return output

if __name__ == '__main__':
    arr = [1,4,1,2,7,5,2]
    print('Original:', arr)
    print('Sorted:  ', counting_sort(arr, 9))
`,
  java: `// Counting Sort - Java (runnable example)
import java.util.Arrays;

public class CountingSortExample {
    public static int[] countingSort(int[] arr, int max) {
        int[] count = new int[max + 1];
        for (int v : arr) count[v]++;
        for (int i = 1; i < count.length; i++) count[i] += count[i - 1];
        int[] output = new int[arr.length];
        for (int i = arr.length - 1; i >= 0; i--) {
            output[count[arr[i]] - 1] = arr[i];
            count[arr[i]]--;
        }
        return output;
    }

    public static void main(String[] args) {
        int[] arr = {1,4,1,2,7,5,2};
        System.out.println("Original: " + Arrays.toString(arr));
        System.out.println("Sorted:   " + Arrays.toString(countingSort(arr, 9)));
    }
}
`,
  c: `/* Counting Sort - C (runnable) */
#include <stdio.h>
#include <stdlib.h>

int* countingSort(const int* arr, int n, int max) {
    int* count = calloc(max + 1, sizeof(int));
    for (int i = 0; i < n; ++i) count[arr[i]]++;
    for (int i = 1; i <= max; ++i) count[i] += count[i - 1];
    int* output = malloc(sizeof(int) * n);
    for (int i = n - 1; i >= 0; --i) {
        output[count[arr[i]] - 1] = arr[i];
        count[arr[i]]--;
    }
    free(count);
    return output;
}

int main() {
    int arr[] = {1,4,1,2,7,5,2};
    int n = sizeof(arr)/sizeof(arr[0]);
    int* sorted = countingSort(arr, n, 9);
    printf("Original: "); for (int i = 0; i < n; ++i) printf("%d ", arr[i]); printf("\n");
    printf("Sorted:   "); for (int i = 0; i < n; ++i) printf("%d ", sorted[i]); printf("\n");
    free(sorted);
    return 0;
}
`,
  cpp: `// Counting Sort - C++ (runnable)
#include <bits/stdc++.h>
using namespace std;

vector<int> countingSort(const vector<int>& arr, int maxv) {
    vector<int> count(maxv + 1);
    for (int v: arr) count[v]++;
    for (int i = 1; i < (int)count.size(); ++i) count[i] += count[i-1];
    vector<int> output(arr.size());
    for (int i = (int)arr.size() - 1; i >= 0; --i) {
        output[count[arr[i]] - 1] = arr[i];
        count[arr[i]]--;
    }
    return output;
}

int main() {
    vector<int> arr = {1,4,1,2,7,5,2};
    cout << "Original: "; for (int v: arr) cout << v << ' '; cout << "\n";
    auto sorted = countingSort(arr, 9);
    cout << "Sorted:   "; for (int v: sorted) cout << v << ' '; cout << "\n";
    return 0;
}
`,
};

export default codes;
