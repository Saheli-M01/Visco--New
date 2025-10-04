export const description = "Bucket Sort distributes elements into buckets, sorts each bucket, and concatenates them. Works well when input is uniformly distributed.";
export const howItWorks = [
  "Create several buckets and distribute elements based on value ranges",
  "Sort each non-empty bucket (often using insertion sort)",
  "Concatenate buckets in order to produce the sorted array",
];

export const timeComplexity = {
  best: "O(n + k)",
  average: "O(n + k)",
  worst: "O(n^2) (if all elements land in one bucket)",
};

export const spaceComplexity = "O(n + k)";

export const pseudoCode = `bucketSort(A, k):\n  create k empty buckets\n  for each element x in A: put x into appropriate bucket\n  for each bucket: sort(bucket)\n  return concatenation of all buckets`;

const codes = {
  javascript: `// Bucket Sort - JavaScript (runnable)
function bucketSort(arr, bucketSize = 5) {
  if (arr.length === 0) return arr;
  let i, min = arr[0], max = arr[0];
  arr.forEach(val => {
    if (val < min) min = val;
    if (val > max) max = val;
  });
  const bucketCount = Math.floor((max - min) / bucketSize) + 1;
  const buckets = Array.from({ length: bucketCount }, () => []);
  arr.forEach(val => {
    buckets[Math.floor((val - min) / bucketSize)].push(val);
  });
  return buckets.reduce((acc, b) => acc.concat(b.sort((a, b) => a - b)), []);
}
// Example usage
const arr = [42, 32, 33, 52, 37, 47, 51];
console.log('Original:', arr);
console.log('Sorted:  ', bucketSort(arr));
`,
  python: `# Bucket Sort - Python (runnable)
def bucket_sort(arr, bucket_size=5):
    if not arr:
        return []
    minv, maxv = min(arr), max(arr)
    bucket_count = (maxv - minv) // bucket_size + 1
    buckets = [[] for _ in range(bucket_count)]
    for v in arr:
        buckets[(v - minv) // bucket_size].append(v)
    res = []
    for b in buckets:
        res.extend(sorted(b))
    return res

if __name__ == '__main__':
    arr = [42, 32, 33, 52, 37, 47, 51]
    print('Original:', arr)
    print('Sorted:  ', bucket_sort(arr))
`,
  java: `// Bucket Sort - Java (runnable example)
import java.util.*;

public class BucketSortExample {
    public static List<Integer> bucketSort(List<Integer> arr, int bucketSize) {
        if (arr.isEmpty()) return arr;
        int min = Collections.min(arr), max = Collections.max(arr);
        int bucketCount = (max - min) / bucketSize + 1;
        List<List<Integer>> buckets = new ArrayList<>();
        for (int i = 0; i < bucketCount; i++) buckets.add(new ArrayList<>());
        for (int v: arr) buckets.get((v - min)/bucketSize).add(v);
        List<Integer> res = new ArrayList<>();
        for (List<Integer> b: buckets) {
            Collections.sort(b);
            res.addAll(b);
        }
        return res;
    }

    public static void main(String[] args) {
        List<Integer> arr = Arrays.asList(42,32,33,52,37,47,51);
        System.out.println("Original: " + arr);
        System.out.println("Sorted:   " + bucketSort(arr, 5));
    }
}
`,
  c: `/* Bucket Sort - C (simple runnable) */
#include <stdio.h>
#include <stdlib.h>

/* For simplicity this C example maps values into buckets and uses qsort on each bucket */
int cmp(const void* a, const void* b) { return (*(int*)a - *(int*)b); }

int main() {
    int arr[] = {42,32,33,52,37,47,51};
    int n = sizeof(arr)/sizeof(arr[0]);
    int bucketSize = 5;
    int min = arr[0], max = arr[0];
    for (int i = 0; i < n; ++i) { if (arr[i] < min) min = arr[i]; if (arr[i] > max) max = arr[i]; }
    int bucketCount = (max - min) / bucketSize + 1;
    int** buckets = malloc(sizeof(int*) * bucketCount);
    int* sizes = calloc(bucketCount, sizeof(int));
    int* caps = malloc(sizeof(int) * bucketCount);
    for (int i = 0; i < bucketCount; ++i) { caps[i] = 4; buckets[i] = malloc(sizeof(int) * caps[i]); }
    for (int i = 0; i < n; ++i) {
        int idx = (arr[i] - min) / bucketSize;
        if (sizes[idx] >= caps[idx]) { caps[idx] *= 2; buckets[idx] = realloc(buckets[idx], sizeof(int) * caps[idx]); }
        buckets[idx][sizes[idx]++] = arr[i];
    }
    int* res = malloc(sizeof(int) * n); int ri = 0;
    for (int b = 0; b < bucketCount; ++b) {
        qsort(buckets[b], sizes[b], sizeof(int), cmp);
        for (int k = 0; k < sizes[b]; ++k) res[ri++] = buckets[b][k];
        free(buckets[b]);
    }
    free(buckets); free(sizes); free(caps);
    printf("Original: 42 32 33 52 37 47 51\n");
    printf("Sorted:   "); for (int i = 0; i < n; ++i) printf("%d ", res[i]); printf("\n");
    free(res);
    return 0;
}
`,
  cpp: `// Bucket Sort - C++ (runnable)
#include <bits/stdc++.h>
using namespace std;

vector<int> bucketSort(const vector<int>& arr, int bucketSize = 5) {
    if (arr.empty()) return {};
    int minv = *min_element(arr.begin(), arr.end());
    int maxv = *max_element(arr.begin(), arr.end());
    int bucketCount = (maxv - minv) / bucketSize + 1;
    vector<vector<int>> buckets(bucketCount);
    for (int v: arr) buckets[(v - minv) / bucketSize].push_back(v);
    vector<int> res;
    for (auto &b: buckets) {
        sort(b.begin(), b.end());
        res.insert(res.end(), b.begin(), b.end());
    }
    return res;
}

int main() {
    vector<int> arr = {42,32,33,52,37,47,51};
    cout << "Original: "; for (int v: arr) cout << v << ' '; cout << "\n";
    auto sorted = bucketSort(arr);
    cout << "Sorted:   "; for (int v: sorted) cout << v << ' '; cout << "\n";
    return 0;
}
`,
};

export default codes;
