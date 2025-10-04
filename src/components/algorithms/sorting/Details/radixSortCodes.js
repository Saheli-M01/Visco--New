export const description = "Radix Sort sorts integers by processing individual digits. It groups numbers by digit position, using a stable sort like counting sort as a subroutine.";
export const howItWorks = [
  "Find the maximum number to determine the number of digits",
  "Starting from least significant digit, use a stable sort to sort by that digit",
  "Repeat for each digit position until most significant digit is processed",
];

export const timeComplexity = {
  best: "O(nk)",
  average: "O(nk)",
  worst: "O(nk)",
};

export const spaceComplexity = "O(n + k)";

export const pseudoCode = `radixSort(A):\n  for d from LSD to MSD:\n    stableSort(A, key = digit d)\n  return A`;

const codes = {
  javascript: `// Radix Sort - JavaScript (runnable)
function getMax(arr) {
  let mx = arr[0];
  for (let i = 1; i < arr.length; i++)
    if (arr[i] > mx) mx = arr[i];
  return mx;
}
function countingSort(arr, exp) {
  let output = new Array(arr.length).fill(0);
  let count = new Array(10).fill(0);
  for (let i = 0; i < arr.length; i++)
    count[Math.floor(arr[i] / exp) % 10]++;
  for (let i = 1; i < 10; i++)
    count[i] += count[i - 1];
  for (let i = arr.length - 1; i >= 0; i--) {
    output[count[Math.floor(arr[i] / exp) % 10] - 1] = arr[i];
    count[Math.floor(arr[i] / exp) % 10]--;
  }
  for (let i = 0; i < arr.length; i++)
    arr[i] = output[i];
}
function radixSort(arr) {
  let m = getMax(arr);
  for (let exp = 1; Math.floor(m / exp) > 0; exp *= 10)
    countingSort(arr, exp);
  return arr;
}
// Example usage
const arr = [170, 45, 75, 90, 802, 24, 2, 66];
console.log('Original:', arr);
console.log('Sorted:  ', radixSort([...arr]));
`,
  python: `# Radix Sort - Python (runnable)
def counting_sort_for_radix(a, exp):
    n = len(a)
    output = [0] * n
    count = [0] * 10
    for i in range(n):
        index = (a[i] // exp) % 10
        count[index] += 1
    for i in range(1, 10):
        count[i] += count[i-1]
    for i in range(n-1, -1, -1):
        index = (a[i] // exp) % 10
        output[count[index] - 1] = a[i]
        count[index] -= 1
    for i in range(n):
        a[i] = output[i]

def radix_sort(a):
    m = max(a)
    exp = 1
    while m // exp > 0:
        counting_sort_for_radix(a, exp)
        exp *= 10
    return a

if __name__ == '__main__':
    arr = [170,45,75,90,802,24,2,66]
    print('Original:', arr)
    print('Sorted:  ', radix_sort(arr.copy()))
`,
  java: `// Radix Sort - Java (runnable example)
import java.util.*;

public class RadixSortExample {
    static void countingSort(int[] a, int exp) {
        int n = a.length;
        int[] output = new int[n];
        int[] count = new int[10];
        for (int i = 0; i < n; i++) count[(a[i] / exp) % 10]++;
        for (int i = 1; i < 10; i++) count[i] += count[i-1];
        for (int i = n - 1; i >= 0; i--) {
            output[count[(a[i] / exp) % 10] - 1] = a[i];
            count[(a[i] / exp) % 10]--;
        }
        System.arraycopy(output, 0, a, 0, n);
    }

    static void radixSort(int[] a) {
        int m = Arrays.stream(a).max().getAsInt();
        for (int exp = 1; m / exp > 0; exp *= 10) countingSort(a, exp);
    }

    public static void main(String[] args) {
        int[] arr = {170,45,75,90,802,24,2,66};
        System.out.println("Original: " + Arrays.toString(arr));
        radixSort(arr);
        System.out.println("Sorted:   " + Arrays.toString(arr));
    }
}
`,
  c: `/* Radix Sort - C (runnable) */
#include <stdio.h>
#include <stdlib.h>

int getMax(int a[], int n) { int mx = a[0]; for (int i = 1; i < n; ++i) if (a[i] > mx) mx = a[i]; return mx; }
void countingSort(int a[], int n, int exp) {
    int* output = malloc(sizeof(int) * n);
    int count[10] = {0};
    for (int i = 0; i < n; ++i) count[(a[i] / exp) % 10]++;
    for (int i = 1; i < 10; ++i) count[i] += count[i - 1];
    for (int i = n -1; i >= 0; --i) {
        output[count[(a[i] / exp) % 10] - 1] = a[i];
        count[(a[i] / exp) % 10]--;
    }
    for (int i = 0; i < n; ++i) a[i] = output[i];
    free(output);
}
void radixSort(int a[], int n) {
    int m = getMax(a, n);
    for (int exp = 1; m/exp > 0; exp *= 10) countingSort(a, n, exp);
}
int main() {
    int a[] = {170,45,75,90,802,24,2,66};
    int n = sizeof(a)/sizeof(a[0]);
    printf("Original: "); for (int i = 0; i < n; ++i) printf("%d ", a[i]); printf("\n");
    radixSort(a, n);
    printf("Sorted:   "); for (int i = 0; i < n; ++i) printf("%d ", a[i]); printf("\n");
    return 0;
}
`,
  cpp: `// Radix Sort - C++ (runnable)
#include <bits/stdc++.h>
using namespace std;

int getMax(const vector<int>& a) { return *max_element(a.begin(), a.end()); }
void countingSort(vector<int>& a, int exp) {
    int n = a.size();
    vector<int> output(n);
    vector<int> count(10);
    for (int i = 0; i < n; ++i) count[(a[i] / exp) % 10]++;
    for (int i = 1; i < 10; ++i) count[i] += count[i - 1];
    for (int i = n - 1; i >= 0; --i) {
        output[count[(a[i] / exp) % 10] - 1] = a[i];
        count[(a[i] / exp) % 10]--;
    }
    a = output;
}
vector<int> radixSort(vector<int> a) {
    int m = getMax(a);
    for (int exp = 1; m / exp > 0; exp *= 10) countingSort(a, exp);
    return a;
}
int main() {
    vector<int> arr = {170,45,75,90,802,24,2,66};
    cout << "Original: "; for (int v: arr) cout << v << ' '; cout << "\n";
    auto sorted = radixSort(arr);
    cout << "Sorted:   "; for (int v: sorted) cout << v << ' '; cout << "\n";
    return 0;
}
`,
};

export default codes;
