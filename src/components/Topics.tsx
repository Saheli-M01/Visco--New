import { motion } from "framer-motion";
import { 
  ArrowUpDown, 
  List, 
  Network, 
  GitBranch, 
  Link,
  ChevronRight,
  Clock,
  BarChart3
} from "lucide-react";
import { useState } from "react";

const topics = [
  {
    id: "sorting",
    title: "Sorting Algorithms",
    icon: ArrowUpDown,
    color: "from-blue-500 to-blue-600",
    description: "Visualize how data gets organized",
    algorithms: [
      { name: "Bubble Sort", complexity: "O(n²)", difficulty: "Easy" },
      { name: "Merge Sort", complexity: "O(n log n)", difficulty: "Medium" },
      { name: "Quick Sort", complexity: "O(n log n)", difficulty: "Medium" },
      { name: "Insertion Sort", complexity: "O(n²)", difficulty: "Easy" },
      { name: "Selection Sort", complexity: "O(n²)", difficulty: "Easy" },
      { name: "Heap Sort", complexity: "O(n log n)", difficulty: "Hard" }
    ]
  },
  {
    id: "array",
    title: "Array Algorithms",
    icon: List,
    color: "from-green-500 to-green-600",
    description: "Master array manipulation techniques",
    algorithms: [
      { name: "Binary Search", complexity: "O(log n)", difficulty: "Easy" },
      { name: "Linear Search", complexity: "O(n)", difficulty: "Easy" },
      { name: "Two Pointers", complexity: "O(n)", difficulty: "Medium" },
      { name: "Sliding Window", complexity: "O(n)", difficulty: "Medium" }
    ]
  },
  {
    id: "graph",
    title: "Graph Algorithms",
    icon: Network,
    color: "from-purple-500 to-purple-600",
    description: "Navigate complex network structures",
    algorithms: [
      { name: "Breadth-First Search", complexity: "O(V + E)", difficulty: "Medium" },
      { name: "Depth-First Search", complexity: "O(V + E)", difficulty: "Medium" },
      { name: "Dijkstra's Algorithm", complexity: "O(V²)", difficulty: "Hard" },
      { name: "Kruskal's Algorithm", complexity: "O(E log V)", difficulty: "Hard" },
      { name: "Prim's Algorithm", complexity: "O(V²)", difficulty: "Hard" }
    ]
  },
  {
    id: "tree",
    title: "Tree Algorithms",
    icon: GitBranch,
    color: "from-orange-500 to-orange-600",
    description: "Explore hierarchical data structures",
    algorithms: [
      { name: "Binary Search Tree", complexity: "O(log n)", difficulty: "Medium" },
      { name: "AVL Tree", complexity: "O(log n)", difficulty: "Hard" },
      { name: "Tree Traversals", complexity: "O(n)", difficulty: "Easy" },
      { name: "Red-Black Tree", complexity: "O(log n)", difficulty: "Hard" }
    ]
  },
  {
    id: "linked-list",
    title: "Linked Lists",
    icon: Link,
    color: "from-red-500 to-red-600",
    description: "Connect and manipulate node structures",
    algorithms: [
      { name: "Singly Linked List", complexity: "O(n)", difficulty: "Easy" },
      { name: "Doubly Linked List", complexity: "O(n)", difficulty: "Medium" },
      { name: "Circular Linked List", complexity: "O(n)", difficulty: "Medium" },
      { name: "List Reversal", complexity: "O(n)", difficulty: "Easy" }
    ]
  }
];

export const Topics = () => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30";
      case "Medium": return "text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30";
      case "Hard": return "text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30";
      default: return "text-muted-foreground bg-muted";
    }
  };

  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
            Choose Your{" "}
            <span className="gradient-text">Learning Path</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Explore our comprehensive collection of algorithm categories. 
            Each topic contains multiple algorithms with interactive visualizations.
          </p>
        </motion.div>

        {/* Topics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {topics.map((topic, index) => (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => setSelectedTopic(selectedTopic === topic.id ? null : topic.id)}
              className="card-topic group cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                  className={`p-3 rounded-xl bg-gradient-to-br ${topic.color} shadow-lg`}
                >
                  <topic.icon className="h-6 w-6 text-white" />
                </motion.div>
                
                <motion.div
                  animate={{ rotate: selectedTopic === topic.id ? 90 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </motion.div>
              </div>
              
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                {topic.title}
              </h3>
              
              <p className="text-muted-foreground mb-4">
                {topic.description}
              </p>
              
              <div className="flex items-center text-sm text-muted-foreground">
                <BarChart3 className="h-4 w-4 mr-1" />
                {topic.algorithms.length} algorithms
              </div>
            </motion.div>
          ))}
        </div>

        {/* Expanded Algorithm List */}
        {selectedTopic && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-card to-muted/50 border border-border/50 rounded-2xl p-8 overflow-hidden"
          >
            <h3 className="text-2xl font-bold mb-6">
              {topics.find(t => t.id === selectedTopic)?.title} Algorithms
            </h3>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {topics.find(t => t.id === selectedTopic)?.algorithms.map((algorithm, index) => (
                <motion.div
                  key={algorithm.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="card-algorithm group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold group-hover:text-primary transition-colors">
                      {algorithm.name}
                    </h4>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  
                  <div className="flex items-center gap-3 text-sm">
                    <div className="flex items-center text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      {algorithm.complexity}
                    </div>
                    
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(algorithm.difficulty)}`}>
                      {algorithm.difficulty}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};