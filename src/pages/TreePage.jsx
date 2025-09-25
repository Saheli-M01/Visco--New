import React from "react";
import { motion } from "framer-motion";
import CategoryLayout from "@/components/CategoryLayout";
import { categories } from "@/data/categories";

const TreePage = () => {
  const treeCategory = categories.tree;

  const treeTypes = [
    {
      title: "Binary Tree",
      description: "Each node has at most two children (left and right)",
      characteristics: ["Max 2 children per node", "Simple structure", "Foundation for other trees"],
      timeComplexity: "Search: O(n), Insert: O(n), Delete: O(n)"
    },
    {
      title: "Binary Search Tree",
      description: "Binary tree with ordering property (left < root < right)",
      characteristics: ["Sorted structure", "Efficient searching", "In-order gives sorted sequence"],
      timeComplexity: "Search: O(log n), Insert: O(log n), Delete: O(log n)"
    },
    {
      title: "AVL Tree",
      description: "Self-balancing BST where heights of children differ by at most 1",
      characteristics: ["Always balanced", "Guaranteed O(log n)", "Requires rotations"],
      timeComplexity: "Search: O(log n), Insert: O(log n), Delete: O(log n)"
    },
    {
      title: "Red-Black Tree",
      description: "Self-balancing BST with color properties ensuring balance",
      characteristics: ["Loosely balanced", "Fewer rotations than AVL", "Used in many libraries"],
      timeComplexity: "Search: O(log n), Insert: O(log n), Delete: O(log n)"
    }
  ];

  const treeTraversals = [
    {
      name: "Pre-order",
      pattern: "Root → Left → Right",
      useCase: "Tree copying, expression trees",
      code: "visit(root) → traverse(left) → traverse(right)"
    },
    {
      name: "In-order", 
      pattern: "Left → Root → Right",
      useCase: "BST sorted output, expression evaluation",
      code: "traverse(left) → visit(root) → traverse(right)"
    },
    {
      name: "Post-order",
      pattern: "Left → Right → Root", 
      useCase: "Tree deletion, directory sizes",
      code: "traverse(left) → traverse(right) → visit(root)"
    },
    {
      name: "Level-order",
      pattern: "Level by level (BFS)",
      useCase: "Tree serialization, level-wise processing", 
      code: "Use queue to process nodes level by level"
    }
  ];

  const treeApplications = [
    {
      title: "Database Indexing",
      description: "B-trees and B+ trees for efficient database queries",
      examples: ["MySQL InnoDB", "PostgreSQL indexes", "File system directories"]
    },
    {
      title: "Expression Parsing",
      description: "Parse and evaluate mathematical/logical expressions",
      examples: ["Compilers", "Calculators", "Formula evaluation"]
    },
    {
      title: "Hierarchical Data",
      description: "Represent nested structures and relationships",
      examples: ["File systems", "Organization charts", "XML/JSON parsing"]
    },
    {
      title: "Decision Making",
      description: "Decision trees for classification and machine learning",
      examples: ["AI algorithms", "Game trees", "Expert systems"]
    }
  ];

  return (
    <CategoryLayout category={treeCategory}>
      {/* Tree Types */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-16"
      >
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl px-8 py-12 shadow-xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Types of Trees
          </h2>
          <p className="text-lg text-gray-700 font-medium leading-relaxed mb-8">
            {treeCategory.longDescription}
          </p>
          
          <div className="grid lg:grid-cols-2 gap-6">
            {treeTypes.map((type, index) => (
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
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-900 mb-2">Characteristics:</p>
                    <ul className="space-y-1">
                      {type.characteristics.map((char, idx) => (
                        <li key={idx} className="text-sm text-gray-700 flex items-start">
                          <span className="w-1.5 h-1.5 bg-gray-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {char}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-white/30 p-3 rounded-lg">
                    <p className="text-xs font-semibold text-gray-900 mb-1">Time Complexity:</p>
                    <p className="text-xs text-gray-700 font-mono">{type.timeComplexity}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Tree Traversals */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="mb-16"
      >
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl px-8 py-12 shadow-xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Tree Traversal Methods
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {treeTraversals.map((traversal, index) => (
              <motion.div
                key={traversal.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="backdrop-blur-sm bg-white/20 border border-white/30 rounded-xl p-6"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {traversal.name}
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-900 mb-1">Pattern:</p>
                    <p className="text-sm text-gray-700 font-medium">{traversal.pattern}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-semibold text-gray-900 mb-1">Use Case:</p>
                    <p className="text-sm text-gray-700 font-medium">{traversal.useCase}</p>
                  </div>
                  
                  <div className="bg-white/30 p-3 rounded-lg">
                    <p className="text-xs font-semibold text-gray-900 mb-1">Implementation:</p>
                    <p className="text-xs text-gray-700 font-mono leading-relaxed">{traversal.code}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Applications */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-16"
      >
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl px-8 py-12 shadow-xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Real-World Applications
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {treeApplications.map((app, index) => (
              <motion.div
                key={app.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
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
                  <p className="text-sm font-semibold text-gray-900 mb-2">Examples:</p>
                  <div className="flex flex-wrap gap-2">
                    {app.examples.map((example, idx) => (
                      <span
                        key={idx}
                        className="bg-white/30 px-3 py-1 rounded-full text-xs font-medium text-gray-900"
                      >
                        {example}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </CategoryLayout>
  );
};

export default TreePage;