import React from "react";
import { motion } from "framer-motion";
import { CategoryLayout } from "@/components/layout";
import { categories } from "@/data/categories";

const LinkedListPage = () => {
  const linkedListCategory = categories.linkedList;

  const listTypes = [
    {
      title: "Singly Linked List",
      description: "Each node contains data and pointer to the next node",
      structure: "Data → Next",
      advantages: ["Simple implementation", "Memory efficient", "Dynamic size"],
      disadvantages: ["No backward traversal", "No random access"],
      timeComplexity: {
        search: "O(n)",
        insertion: "O(1) at head, O(n) at position",
        deletion: "O(1) at head, O(n) at position"
      }
    },
    {
      title: "Doubly Linked List", 
      description: "Each node has pointers to both next and previous nodes",
      structure: "Prev ← Data → Next",
      advantages: ["Bidirectional traversal", "Easier deletion", "Better for certain algorithms"],
      disadvantages: ["Extra memory overhead", "More complex implementation"],
      timeComplexity: {
        search: "O(n)",
        insertion: "O(1) at any position with node reference",
        deletion: "O(1) at any position with node reference"
      }
    },
    {
      title: "Circular Linked List",
      description: "Last node points back to the first node forming a circle",
      structure: "Data → Next → ... → First",
      advantages: ["No null pointers", "Useful for round-robin", "Can traverse entire list from any node"],
      disadvantages: ["Risk of infinite loops", "More complex termination conditions"],
      timeComplexity: {
        search: "O(n)",
        insertion: "O(1) at any position with node reference", 
        deletion: "O(1) at any position with node reference"
      }
    }
  ];

  const commonPatterns = [
    {
      name: "Two Pointers",
      description: "Use slow and fast pointers for cycle detection and middle finding",
      techniques: ["Floyd's Cycle Detection", "Find middle element", "Remove nth from end"],
      code: "slow = slow.next; fast = fast.next.next;"
    },
    {
      name: "Dummy Head",
      description: "Add dummy node to simplify edge cases in insertion/deletion",
      techniques: ["Uniform handling", "Avoid null checks", "Simplify logic"],
      code: "dummy = new Node(0); dummy.next = head;"
    },
    {
      name: "Recursive Processing",
      description: "Process list recursively for certain operations",
      techniques: ["Reverse list", "Merge sorted lists", "Remove duplicates"],
      code: "return reverseList(head.next); head.next = null;"
    },
    {
      name: "Multiple Pass",
      description: "First pass to get length/info, second pass to perform operation",
      techniques: ["Remove nth from end", "Reorder list", "Split list"],
      code: "length = getLength(head); // process with length info"
    }
  ];

  const vsArrays = [
    {
      aspect: "Memory",
      array: "Contiguous memory allocation",
      linkedList: "Non-contiguous, dynamic allocation",
      winner: "Array (cache-friendly)"
    },
    {
      aspect: "Access Time", 
      array: "O(1) random access by index",
      linkedList: "O(n) sequential access only",
      winner: "Array"
    },
    {
      aspect: "Insertion/Deletion",
      array: "O(n) - requires shifting elements", 
      linkedList: "O(1) - with node reference",
      winner: "Linked List"
    },
    {
      aspect: "Memory Overhead",
      array: "Only data storage needed",
      linkedList: "Extra pointer storage per node",
      winner: "Array"
    },
    {
      aspect: "Dynamic Size",
      array: "Fixed size (in most languages)",
      linkedList: "Dynamic size, grows/shrinks easily", 
      winner: "Linked List"
    }
  ];

  const applications = [
    {
      title: "Undo/Redo Systems",
      description: "Implement undo functionality in text editors and applications",
      why: "Easy insertion and deletion of states"
    },
    {
      title: "Music/Video Playlists", 
      description: "Navigate through songs or videos with next/previous",
      why: "Natural sequential access pattern"
    },
    {
      title: "Browser History",
      description: "Back and forward navigation in web browsers",
      why: "Dynamic history size, easy navigation"
    },
    {
      title: "Implementation of Other Data Structures",
      description: "Foundation for stacks, queues, and graphs",
      why: "Flexible node-based structure"
    },
    {
      title: "Memory Management",
      description: "Free memory blocks in operating systems",
      why: "Dynamic allocation and deallocation"
    },
    {
      title: "Polynomial Representation",
      description: "Represent sparse polynomials in mathematics",
      why: "Only store non-zero terms efficiently"
    }
  ];

  return (
    <CategoryLayout category={linkedListCategory}>
      {/* List Types */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-16"
      >
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl px-8 py-12 shadow-xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Types of Linked Lists
          </h2>
          <p className="text-lg text-gray-700 font-medium leading-relaxed mb-8">
            {linkedListCategory.longDescription}
          </p>
          
          <div className="space-y-6">
            {listTypes.map((type, index) => (
              <motion.div
                key={type.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="backdrop-blur-sm bg-white/20 border border-white/30 rounded-xl p-6"
              >
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {type.title}
                    </h3>
                    <p className="text-gray-700 font-medium text-sm leading-relaxed mb-3">
                      {type.description}
                    </p>
                    <div className="bg-white/30 p-2 rounded text-center">
                      <p className="text-xs font-mono text-gray-900">{type.structure}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-900 mb-2">Advantages:</p>
                      <ul className="space-y-1">
                        {type.advantages.map((adv, idx) => (
                          <li key={idx} className="text-xs text-gray-700 flex items-start">
                            <span className="w-1 h-1 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {adv}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <p className="text-sm font-semibold text-gray-900 mb-2">Disadvantages:</p>
                      <ul className="space-y-1">
                        {type.disadvantages.map((dis, idx) => (
                          <li key={idx} className="text-xs text-gray-700 flex items-start">
                            <span className="w-1 h-1 bg-red-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {dis}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-white/30 p-4 rounded-lg">
                    <p className="text-sm font-semibold text-gray-900 mb-3">Time Complexity:</p>
                    <div className="space-y-2">
                      <div className="text-xs">
                        <span className="font-medium">Search:</span> {type.timeComplexity.search}
                      </div>
                      <div className="text-xs">
                        <span className="font-medium">Insert:</span> {type.timeComplexity.insertion}
                      </div>
                      <div className="text-xs">
                        <span className="font-medium">Delete:</span> {type.timeComplexity.deletion}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Common Patterns */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="mb-16"
      >
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl px-8 py-12 shadow-xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Common Programming Patterns
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {commonPatterns.map((pattern, index) => (
              <motion.div
                key={pattern.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="backdrop-blur-sm bg-white/20 border border-white/30 rounded-xl p-6"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {pattern.name}
                </h3>
                <p className="text-gray-700 font-medium mb-4 text-sm leading-relaxed">
                  {pattern.description}
                </p>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-900 mb-2">Techniques:</p>
                    <div className="flex flex-wrap gap-2">
                      {pattern.techniques.map((technique, idx) => (
                        <span
                          key={idx}
                          className="bg-white/30 px-2 py-1 rounded text-xs font-medium text-gray-900"
                        >
                          {technique}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-gray-900/20 p-3 rounded-lg">
                    <p className="text-xs font-semibold text-gray-900 mb-1">Example Code:</p>
                    <p className="text-xs text-gray-700 font-mono">{pattern.code}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Linked List vs Arrays */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-16"
      >
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl px-8 py-12 shadow-xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Linked Lists vs Arrays
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-4 px-4 font-semibold text-gray-900">Aspect</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-900">Array</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-900">Linked List</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-900">Winner</th>
                </tr>
              </thead>
              <tbody>
                {vsArrays.map((comparison, index) => (
                  <motion.tr
                    key={comparison.aspect}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="border-b border-white/10"
                  >
                    <td className="py-3 px-4 font-medium text-gray-900">{comparison.aspect}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{comparison.array}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{comparison.linkedList}</td>
                    <td className="py-3 px-4">
                      <span className="bg-white/30 px-2 py-1 rounded text-xs font-medium text-gray-900">
                        {comparison.winner}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      {/* Applications */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mb-16"
      >
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl px-8 py-12 shadow-xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Real-World Applications
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {applications.map((app, index) => (
              <motion.div
                key={app.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="backdrop-blur-sm bg-white/20 border border-white/30 rounded-xl p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {app.title}
                </h3>
                <p className="text-gray-700 font-medium mb-3 text-sm leading-relaxed">
                  {app.description}
                </p>
                
                <div className="bg-white/30 p-3 rounded-lg">
                  <p className="text-xs font-semibold text-gray-900 mb-1">Why Linked Lists?</p>
                  <p className="text-xs text-gray-700">{app.why}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </CategoryLayout>
  );
};

export default LinkedListPage;