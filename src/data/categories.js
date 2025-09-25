export const categories = {
  sorting: {
    id: "sorting",

    algorithms: [
      {
        name: "Bubble Sort",
        complexity: "O(n²)",
        difficulty: "Easy",
        shortDescription:
          "Simple comparison-based algorithm that repeatedly swaps adjacent elements.",
      },
      {
        name: "Merge Sort",
        complexity: "O(n log n)",
        difficulty: "Medium",
        shortDescription:
          "Divide-and-conquer algorithm that splits arrays and merges them back sorted.",
      },
      {
        name: "Quick Sort",
        complexity: "O(n log n)",
        difficulty: "Medium",
        shortDescription:
          "Efficient in-place sorting using partitioning around a pivot element.",
      },
      {
        name: "Insertion Sort",
        complexity: "O(n²)",
        difficulty: "Easy",
        shortDescription:
          "Builds sorted array one item at a time, good for small datasets.",
      },
      {
        name: "Selection Sort",
        complexity: "O(n²)",
        difficulty: "Easy",
        shortDescription:
          "Repeatedly finds minimum element and places it at the beginning.",
      },
      {
        name: "Heap Sort",
        complexity: "O(n log n)",
        difficulty: "Hard",
        shortDescription:
          "Uses binary heap data structure for efficient in-place sorting.",
      },
    ],
  },

  array: {
    id: "array",

    algorithms: [
      {
        name: "Binary Search",
        complexity: "O(log n)",
        difficulty: "Easy",
        shortDescription:
          "Efficient search algorithm for sorted arrays using divide and conquer.",
      },
      {
        name: "Linear Search",
        complexity: "O(n)",
        difficulty: "Easy",
        shortDescription:
          "Simple sequential search through array elements one by one.",
      },
      {
        name: "Two Pointers",
        complexity: "O(n)",
        difficulty: "Medium",
        shortDescription:
          "Technique using two pointers to solve problems in linear time.",
      },
      {
        name: "Sliding Window",
        complexity: "O(n)",
        difficulty: "Medium",
        shortDescription:
          "Pattern for problems involving subarrays of fixed or variable size.",
      },
      {
        name: "Kadane's Algorithm",
        complexity: "O(n)",
        difficulty: "Medium",
        shortDescription:
          "Find maximum sum subarray in linear time using dynamic programming.",
      },
      {
        name: "Dutch Flag",
        complexity: "O(n)",
        difficulty: "Medium",
        shortDescription:
          "Partition array into three parts in single pass (0s, 1s, 2s).",
      },
    ],
  },

  graph: {
    id: "graph",

    algorithms: [
      {
        name: "Breadth-First Search",
        complexity: "O(V + E)",
        difficulty: "Medium",
        shortDescription:
          "Level-by-level traversal using queue, finds shortest unweighted paths.",
      },
      {
        name: "Depth-First Search",
        complexity: "O(V + E)",
        difficulty: "Medium",
        shortDescription:
          "Deep exploration using recursion or stack, useful for cycle detection.",
      },
      {
        name: "Dijkstra's Algorithm",
        complexity: "O(V²)",
        difficulty: "Hard",
        shortDescription:
          "Find shortest paths from source to all vertices in weighted graphs.",
      },
      {
        name: "Kruskal's Algorithm",
        complexity: "O(E log V)",
        difficulty: "Hard",
        shortDescription:
          "Find minimum spanning tree using union-find data structure.",
      },
      {
        name: "Prim's Algorithm",
        complexity: "O(V²)",
        difficulty: "Hard",
        shortDescription:
          "Build minimum spanning tree by growing from starting vertex.",
      },
      {
        name: "Topological Sort",
        complexity: "O(V + E)",
        difficulty: "Medium",
        shortDescription:
          "Linear ordering of vertices in directed acyclic graphs.",
      },
    ],
  },

  tree: {
    id: "tree",

    algorithms: [
      {
        name: "Binary Search Tree",
        complexity: "O(log n)",
        difficulty: "Medium",
        shortDescription:
          "Self-organizing tree maintaining sorted order for efficient operations.",
      },
      {
        name: "AVL Tree",
        complexity: "O(log n)",
        difficulty: "Hard",
        shortDescription:
          "Self-balancing BST ensuring optimal height for guaranteed performance.",
      },
      {
        name: "Tree Traversals",
        complexity: "O(n)",
        difficulty: "Easy",
        shortDescription:
          "In-order, pre-order, post-order, and level-order tree exploration.",
      },
      {
        name: "Red-Black Tree",
        complexity: "O(log n)",
        difficulty: "Hard",
        shortDescription:
          "Balanced BST with color properties ensuring optimal performance.",
      },
      {
        name: "Trie (Prefix Tree)",
        complexity: "O(m)",
        difficulty: "Medium",
        shortDescription:
          "Tree for storing strings efficiently, great for autocomplete features.",
      },
      {
        name: "Segment Tree",
        complexity: "O(log n)",
        difficulty: "Hard",
        shortDescription:
          "Tree for range queries and updates in logarithmic time.",
      },
    ],
  },

  linkedList: {
    id: "linkedList",

    algorithms: [
      {
        name: "Singly Linked List",
        complexity: "O(n)",
        difficulty: "Easy",
        shortDescription:
          "Basic linear data structure with nodes containing data and next pointer.",
      },
      {
        name: "Doubly Linked List",
        complexity: "O(n)",
        difficulty: "Medium",
        shortDescription:
          "Bidirectional list with previous and next pointers for efficient traversal.",
      },
      {
        name: "Circular Linked List",
        complexity: "O(n)",
        difficulty: "Medium",
        shortDescription:
          "List where last node points back to first, creating circular structure.",
      },
      {
        name: "List Reversal",
        complexity: "O(n)",
        difficulty: "Easy",
        shortDescription:
          "Reverse linked list iteratively or recursively by changing pointers.",
      },
      {
        name: "Cycle Detection",
        complexity: "O(n)",
        difficulty: "Medium",
        shortDescription:
          "Floyd's cycle detection algorithm using slow and fast pointers.",
      },
      {
        name: "Merge Two Lists",
        complexity: "O(n + m)",
        difficulty: "Easy",
        shortDescription:
          "Combine two sorted linked lists into single sorted list.",
      },
    ],
  },
};

export default categories;
