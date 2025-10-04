import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Navigation } from "@/components/landing";
import { Clock, ChevronRight, ArrowLeft, BookOpen, Lightbulb, BarChart3 } from "lucide-react";
import {
  FullScreenModal,
  AlgorithmDetails,
} from "@/components/algorithm-visualizer-details";

const CategoryLayout = ({ category, features, complexityData }) => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState("algorithms");

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      const q = e?.detail?.query || "";
      setSearchQuery(q.toLowerCase());
    };
    window.addEventListener("algorithmSearch", handler);
    return () => window.removeEventListener("algorithmSearch", handler);
  }, []);

  // Listen for requests to open a specific algorithm (e.g., Enter in navbar)
  useEffect(() => {
    const openHandler = (e) => {
      const name = e?.detail?.name;
      if (!name) return;
      const match = category.algorithms.find(
        (a) =>
          a.name.toLowerCase() === name.toLowerCase() ||
          a.name.toLowerCase().includes(name.toLowerCase())
      );
      if (match) handleAlgorithmClick(match);
    };
    window.addEventListener("openAlgorithm", openHandler);
    return () => window.removeEventListener("openAlgorithm", openHandler);
  }, [category]);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["algorithms", "why-learn", "complexity"];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleBack = () => {
    window.history.back();
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth"
      });
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "text-green-600 bg-green-100/50";
      case "Medium":
        return "text-yellow-600 bg-yellow-100/50";
      case "Hard":
        return "text-red-600 bg-red-100/50";
      default:
        return "text-gray-600 bg-gray-100/50";
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

  const filteredAlgorithms = category.algorithms.filter((algorithm) => {
    if (!searchQuery) return true;
    return algorithm.name.toLowerCase().includes(searchQuery);
  });

  const sidebarItems = [
    { id: "algorithms", label: "Available Algorithms", icon: BookOpen },
    { id: "why-learn", label: "Why Learn This?", icon: Lightbulb },
  ];

  if (complexityData && complexityData.length > 0) {
    sidebarItems.push({ id: "complexity", label: "Complexity Comparison", icon: BarChart3 });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
      <Navigation />

      <div className="flex">
        {/* Sidebar */}
        <aside className="fixed left-0 top-0 h-screen w-64 bg-white/80 backdrop-blur-md border-r border-gray-200 z-40 pt-20 pb-8 px-6 flex flex-col">
          {/* Back Button */}
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-900 font-medium mb-8 hover:text-gray-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>

          {/* Navigation Items */}
          <nav className="flex-1 space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full flex items-start gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? "bg-gray-900 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="relative overflow-hidden ml-64 flex-1">
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
              {/* Available Algorithms */}
              <div id="algorithms" className="scroll-mt-24">
                <h2 className="text-3xl font-bold text-gray-900 text-center mb-2">
                  Available Algorithms
                </h2>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="mb-16"
                >
                  <div className="backdrop-blur-md bg-white/40 border border-white/20 rounded-3xl px-8 py-12 shadow-xl">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredAlgorithms.map((algorithm, index) => (
                        <motion.div
                          key={algorithm.name}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.05 * index }}
                          onClick={() => handleAlgorithmClick(algorithm)}
                          className="backdrop-blur-sm bg-white/60 border border-white/30 rounded-xl px-6 py-6 shadow-md hover:bg-white/85 transition-all cursor-pointer group"
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
                              <code className="font-mono text-xs">
                                {algorithm.complexity}
                              </code>
                            </div>

                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
                                algorithm.difficulty
                              )}`}
                            >
                              {algorithm.difficulty}
                            </span>
                          </div>

                          <p className="text-gray-700 text-sm font-medium leading-relaxed">
                            {algorithm.shortDescription ||
                              `Learn about ${algorithm.name} algorithm and its implementation.`}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Why Learn This Category */}
              <div id="why-learn" className="scroll-mt-24">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="mb-16"
                >
                  <div className="backdrop-blur-md bg-white/50 border border-white/20 rounded-3xl px-8 py-12 shadow-xl">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">
                      Why Learn {category.name}?
                    </h2>
                    <p className="text-lg text-gray-700 font-medium leading-relaxed mb-8">
                      {category.longDescription}
                    </p>

                    {features && features.length > 0 && (
                      <div className="grid md:grid-cols-3 gap-6">
                        {features.map((feature, index) => (
                          <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="backdrop-blur-sm bg-white border border-gray-300/30 rounded-xl p-6 text-center"
                          >
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">
                              {feature.title}
                            </h3>
                            <p className="text-gray-700 font-medium text-sm">
                              {feature.description}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>

              {/* Complexity Comparison */}
              {complexityData && complexityData.length > 0 && (
                <div id="complexity" className="scroll-mt-24">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="mb-16"
                  >
                    <div className="backdrop-blur-md bg-white/10 border border-white/60 rounded-3xl px-8 py-12 shadow-xl">
                      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                        Complexity Comparison
                      </h2>

                      <div className="overflow-x-auto">
                        <table className="w-full text-left">
                          <thead>
                            <tr className="border-b border-white/20">
                              <th className="pb-4 text-gray-900 font-semibold">
                                Algorithm
                              </th>
                              <th className="pb-4 text-gray-900 font-semibold text-center">
                                Best Case
                              </th>
                              <th className="pb-4 text-gray-900 font-semibold text-center">
                                Average Case
                              </th>
                              <th className="pb-4 text-gray-900 font-semibold text-center">
                                Worst Case
                              </th>
                              <th className="pb-4 text-gray-900 font-semibold text-center">
                                Space
                              </th>
                            </tr>
                          </thead>
                          <tbody className="text-gray-700">
                            {complexityData.map((row, index) => (
                              <tr
                                key={row.name}
                                className="border-b border-white/10"
                              >
                                <td className="py-3 font-medium">{row.name}</td>
                                <td className="py-3 text-center font-mono">
                                  {row.best}
                                </td>
                                <td className="py-3 text-center font-mono">
                                  {row.average}
                                </td>
                                <td className="py-3 text-center font-mono">
                                  {row.worst}
                                </td>
                                <td className="py-3 text-center font-mono">
                                  {row.space}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Algorithm Full-Screen Modal */}
      <FullScreenModal
        isOpen={isModalOpen}
        onClose={closeModal}
        algorithm={selectedAlgorithm?.algorithm}
        topic={selectedAlgorithm?.topic}
      />
    </div>
  );
};

export default CategoryLayout;