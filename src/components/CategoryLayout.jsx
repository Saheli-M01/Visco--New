import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Clock, ChevronRight, ArrowLeft } from "lucide-react";
import Modal from "@/components/ui/Modal";
import AlgorithmDetails from "@/components/AlgorithmDetails";

const CategoryLayout = ({ category, children }) => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBack = () => {
    window.history.back();
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy": return "text-green-600 bg-green-100/50";
      case "Medium": return "text-yellow-600 bg-yellow-100/50"; 
      case "Hard": return "text-red-600 bg-red-100/50";
      default: return "text-gray-600 bg-gray-100/50";
    }
  };

  const handleAlgorithmClick = (algorithm) => {
    setSelectedAlgorithm({ algorithm, topic: category });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAlgorithm(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
      <Navigation />
      
      <main className="relative overflow-hidden">
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

        <div className="relative z-10 pt-8 pb-24 px-6">
          <div className="max-w-6xl mx-auto">
            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <button
                onClick={handleBack}
                className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl px-4 py-2 shadow-lg hover:bg-white/15 transition-all flex items-center gap-2 text-gray-900 font-medium"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </button>
            </motion.div>

          
            {/* Available Algorithms - Moved to top */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mb-16"
            >
              <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl px-8 py-12 shadow-xl">
                <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
                  Available Algorithms
                </h2>
                
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.algorithms.map((algorithm, index) => (
                    <motion.div
                      key={algorithm.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.05 * index }}
                      onClick={() => handleAlgorithmClick(algorithm)}
                      className="backdrop-blur-sm bg-white/20 border border-white/30 rounded-xl px-6 py-6 shadow-md hover:bg-white/25 transition-all cursor-pointer group"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
                          {algorithm.name}
                        </h3>
                        <ChevronRight className="h-4 w-4 text-gray-600 group-hover:text-gray-900 transition-colors" />
                      </div>
                      
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex items-center text-gray-600">
                          <Clock className="h-3 w-3 mr-1" />
                          <code className="font-mono text-xs">{algorithm.complexity}</code>
                        </div>
                        
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(algorithm.difficulty)}`}>
                          {algorithm.difficulty}
                        </span>
                      </div>

                      <p className="text-gray-700 text-sm font-medium leading-relaxed">
                        {algorithm.shortDescription || `Learn about ${algorithm.name} algorithm and its implementation.`}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Custom content from children */}
            {children}
          </div>
        </div>
      </main>

      {/* Algorithm Details Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={selectedAlgorithm?.algorithm?.name || "Algorithm Details"}
      >
        {selectedAlgorithm && (
          <AlgorithmDetails
            algorithm={selectedAlgorithm.algorithm}
            topic={selectedAlgorithm.topic}
          />
        )}
      </Modal>
    </div>
  );
};

export default CategoryLayout;