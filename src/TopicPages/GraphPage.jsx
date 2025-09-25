import React from "react";
import { motion } from "framer-motion";
import { CategoryLayout } from "@/components/layout";
import { categories } from "@/data/categories";

const GraphPage = () => {
  const graphCategory = categories.graph;

  const graphTypes = [
    {
      title: "Directed Graph",
      description: "Edges have direction, representing one-way relationships",
      examples: ["Social media follows", "Web page links", "Task dependencies"]
    },
    {
      title: "Undirected Graph", 
      description: "Edges are bidirectional, representing mutual relationships",
      examples: ["Friendship networks", "Road networks", "Computer networks"]
    },
    {
      title: "Weighted Graph",
      description: "Edges have associated costs or distances",
      examples: ["GPS navigation", "Network routing", "Flight connections"]
    }
  ];

  const graphApplications = [
    {
      title: "Social Networks",
      description: "Find mutual friends, recommend connections, analyze influence patterns",
      algorithms: ["BFS for shortest path", "DFS for connected components"]
    },
    {
      title: "Navigation Systems",
      description: "Calculate shortest routes, optimize delivery paths, traffic analysis", 
      algorithms: ["Dijkstra's algorithm", "A* search algorithm"]
    },
    {
      title: "Network Analysis",
      description: "Internet routing, network topology, bottleneck identification",
      algorithms: ["Minimum spanning tree", "Max flow algorithms"]
    },
    {
      title: "Dependency Resolution",
      description: "Package managers, build systems, task scheduling",
      algorithms: ["Topological sorting", "Cycle detection"]
    }
  ];

  return (
    <CategoryLayout category={graphCategory}>
      {/* Graph Types */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-16"
      >
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl px-8 py-12 shadow-xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Types of Graphs
          </h2>
          <p className="text-lg text-gray-700 font-medium leading-relaxed mb-8">
            {graphCategory.longDescription}
          </p>
          
          <div className="grid lg:grid-cols-3 gap-6">
            {graphTypes.map((type, index) => (
              <motion.div
                key={type.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="backdrop-blur-sm bg-white/20 border border-white/30 rounded-xl p-6"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {type.title}
                </h3>
                <p className="text-gray-700 font-medium mb-4 text-sm leading-relaxed">
                  {type.description}
                </p>
                
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-gray-900 mb-2">Examples:</p>
                  <ul className="space-y-1">
                    {type.examples.map((example, idx) => (
                      <li key={idx} className="text-sm text-gray-700 flex items-start">
                        <span className="w-1.5 h-1.5 bg-gray-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Real-World Applications */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="mb-16"
      >
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl px-8 py-12 shadow-xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Real-World Applications
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {graphApplications.map((app, index) => (
              <motion.div
                key={app.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="backdrop-blur-sm bg-white/20 border border-white/30 rounded-xl p-6"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {app.title}
                </h3>
                <p className="text-gray-700 font-medium mb-4 text-sm leading-relaxed">
                  {app.description}
                </p>
                
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-gray-900 mb-2">Key Algorithms:</p>
                  <div className="flex flex-wrap gap-2">
                    {app.algorithms.map((algorithm, idx) => (
                      <span
                        key={idx}
                        className="bg-white/30 px-3 py-1 rounded-full text-xs font-medium text-gray-900"
                      >
                        {algorithm}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Graph Representation */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-16"
      >
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl px-8 py-12 shadow-xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Graph Representations
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="backdrop-blur-sm bg-white/20 border border-white/30 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Adjacency Matrix</h3>
              <div className="space-y-3 text-sm text-gray-700">
                <p className="font-medium">• 2D array where matrix[i][j] = 1 if edge exists</p>
                <p className="font-medium">• Space: O(V²) - good for dense graphs</p>
                <p className="font-medium">• Edge lookup: O(1) - very fast</p>
                <p className="font-medium">• Adding vertex: O(V²) - expensive</p>
              </div>
            </div>
            
            <div className="backdrop-blur-sm bg-white/20 border border-white/30 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Adjacency List</h3>
              <div className="space-y-3 text-sm text-gray-700">
                <p className="font-medium">• Array of lists, each storing vertex neighbors</p>
                <p className="font-medium">• Space: O(V + E) - good for sparse graphs</p>
                <p className="font-medium">• Edge lookup: O(degree) - depends on connections</p>
                <p className="font-medium">• Adding vertex: O(1) - very efficient</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </CategoryLayout>
  );
};

export default GraphPage;