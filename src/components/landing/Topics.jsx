import { motion } from "framer-motion";
import { 
  ArrowUpDown, 
  List, 
  Network, 
  GitBranch, 
  Link,
  ChevronRight,
  BarChart3
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAlgorithmCounts } from "../../hooks/useAlgorithmCounts.js";

// Static topic configuration (UI-related data)
const topicConfigs = [
  {
    id: "sorting",
    title: "Sorting Algorithms",
    icon: ArrowUpDown,
    color: "from-blue-500 to-blue-600",
    description: "Visualize how data gets organized",
    path: "/sorting"
  },
  {
    id: "array",
    title: "Array Algorithms", 
    icon: List,
    color: "from-green-500 to-green-600",
    description: "Master array manipulation techniques",
    path: "/array"
  },
  {
    id: "graph",
    title: "Graph Algorithms",
    icon: Network,
    color: "from-purple-500 to-purple-600", 
    description: "Navigate complex network structures",
    path: "/graph"
  },
  {
    id: "tree",
    title: "Tree Algorithms",
    icon: GitBranch,
    color: "from-orange-500 to-orange-600",
    description: "Explore hierarchical data structures", 
    path: "/tree"
  },
  {
    id: "linked-list",
    title: "Linked Lists",
    icon: Link,
    color: "from-red-500 to-red-600",
    description: "Connect and manipulate node structures",
    path: "/linked-list"
  }
];

export const Topics = () => {
  const navigate = useNavigate();
  const algorithmCounts = useAlgorithmCounts();

  // Generate topics with dynamic algorithm counts
  const topics = topicConfigs.map(config => ({
    ...config,
    algorithmCount: algorithmCounts[config.id] || 0
  }));

  const handleTopicClick = (topic) => {
    navigate(topic.path);
  };

  return (
    <section className="relative py-16 px-6 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-15">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.24) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.32) 1px, transparent 1px)`,
            backgroundSize: "3vw 3vw",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="backdrop-blur-md  border border-white/20 rounded-3xl px-12  mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900">
              Choose Your{" "}
              <span className="text-gray-700">Learning Path</span>
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto font-medium leading-relaxed">
              Explore our comprehensive collection of algorithm categories. 
              Each topic contains multiple algorithms with interactive visualizations and detailed explanations.
            </p>
          </div>
        </motion.div>

        {/* Topics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic, index) => (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => handleTopicClick(topic)}
              className="group cursor-pointer"
            >
              <div className="backdrop-blur-md bg-white/70 border border-gray-200/60 rounded-2xl px-6 py-8 shadow-xl h-full hover:bg-white hover:border-white/30 transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    className={`p-3 rounded-xl bg-gradient-to-br ${topic.color} shadow-lg`}
                  >
                    <topic.icon className="h-6 w-6 text-white" />
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronRight className="h-5 w-5 text-gray-600 group-hover:text-gray-900 transition-colors" />
                  </motion.div>
                </div>
                
                <h3 className="text-xl font-semibold mb-2 text-gray-900 group-hover:text-gray-700 transition-colors">
                  {topic.title}
                </h3>
                
                <p className="text-gray-700 mb-4 font-medium text-sm leading-relaxed">
                  {topic.description}
                </p>
                
                <div className="flex items-center text-sm text-gray-600">
                  <BarChart3 className="h-4 w-4 mr-1" />
                  {topic.algorithmCount} algorithms
                </div>

                <div className="mt-4 pt-4 border-t border-white/20">
                  <div className="text-xs text-gray-600 font-medium">
                    Click to explore →
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};