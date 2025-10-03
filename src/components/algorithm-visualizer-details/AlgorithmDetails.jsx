import React, { useState } from "react";
import { motion } from "framer-motion";
import { Clock, BarChart3, Code, Play, BookOpen } from "lucide-react";

// Dynamic code loaders (lazy import to keep bundle small)
const codeLoaders = {
  "Bubble Sort": () => import("../../algorithms/sorting/Details/bubbleSortCodes"),
  "Selection Sort": () => import("../../algorithms/sorting/Details/selectionSortCodes"),
  "Insertion Sort": () => import("../../algorithms/sorting/Details/insertionSortCodes"),
  "Merge Sort": () => import("../../algorithms/sorting/Details/mergeSortCodes"),
  "Quick Sort": () => import("../../algorithms/sorting/Details/quickSortCodes"),
  "Shell Sort": () => import("../../algorithms/sorting/Details/shellSortCodes"),
  "Bucket Sort": () => import("../../algorithms/sorting/Details/bucketSortCodes"),
  "Radix Sort": () => import("../../algorithms/sorting/Details/radixSortCodes"),
  "Counting Sort": () => import("../../algorithms/sorting/Details/countingSortCodes"),
  "Heap Sort": () => import("../../algorithms/sorting/Details/heapSortCodes"),
};

const AlgorithmDetails = ({ algorithm, topic }) => {
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



  const [implLang, setImplLang] = useState("javascript");
  const [copied, setCopied] = useState(false);
  const [loadedCodes, setLoadedCodes] = useState({});
  const [loadingCode, setLoadingCode] = useState(false);
  const [algoMeta, setAlgoMeta] = useState({ description: "", howItWorks: [], timeComplexity: {}, spaceComplexity: "" });

  const copyCode = async (code) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      console.error("Copy failed", e);
    }
  };

  // Load code module for the current algorithm on demand
  React.useEffect(() => {
    let mounted = true;
    const loader = codeLoaders[algorithm.name];
    if (!loader) return;
    setLoadingCode(true);
    loader()
      .then((mod) => {
        if (!mounted) return;
        const codes = mod && (mod.default || mod);
        setLoadedCodes((s) => ({ ...s, [algorithm.name]: codes }));
        // ensure implLang is valid for the newly loaded codes
        if (codes && !codes[implLang]) setImplLang(Object.keys(codes)[0] || "javascript");
        // Set meta fields from named exports if present
        setAlgoMeta({
          description: mod.description || "",
          howItWorks: mod.howItWorks || [],
          timeComplexity: mod.timeComplexity || {},
          spaceComplexity: mod.spaceComplexity || "",
        });
      })
      .catch((err) => console.error("Failed to load code module", err))
      .finally(() => {
        if (mounted) setLoadingCode(false);
      });
    return () => {
      mounted = false;
    };
  }, [algorithm.name]);

  return (
    <div className="mx-auto w-[95vw]">
      <div className="grid md:grid-cols-5 gap-6">
        {/* Left: Overview + How it works (span 2) */}
        <div className="md:col-span-3 space-y-6 ">
          {/* Algorithm Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="backdrop-blur-sm bg-white/90 border border-white/30 rounded-2xl p-6 shadow-xl"
          >
            <div className="flex items-start justify-between mb-4 ">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {algorithm.name}
                </h3>
                <p className="text-gray-700 font-medium">{topic.title}</p>
              </div>
              <div className="flex items-center gap-3 ">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(
                    algorithm.difficulty
                  )}`}
                >
                  {algorithm.difficulty}
                </span>
                <div className="flex items-center text-gray-600 bg-white/30 px-3 py-1 rounded-full">
                  <Clock className="h-4 w-4 mr-1" />
                  <span className="font-mono text-sm">{algorithm.complexity}</span>
                </div>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed font-medium">{algoMeta.description}</p>
          </motion.div>

          {/* How It Works */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="backdrop-blur-sm bg-white/90 border border-white/30 rounded-2xl p-6 shadow-xl"
          >
            <div className="flex items-center mb-4">
              <BookOpen className="h-5 w-5 text-gray-900 mr-2" />
              <h4 className="text-xl font-semibold text-gray-900">How It Works</h4>
            </div>
            <ol className="space-y-3">
              {algoMeta.howItWorks.map((step, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                  className="flex items-start"
                >
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-white/30 text-gray-900 rounded-full text-sm font-bold mr-3 mt-0.5 flex-shrink-0">
                    {index + 1}
                  </span>
                  <span className="text-gray-700 font-medium">{step}</span>
                </motion.li>
              ))}
            </ol>
          </motion.div>
        </div>


        {/* Right: Code (top) and Complexity (below) */}
        <div className="md:col-span-2 space-y-4">
          {codeLoaders[algorithm.name] && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="backdrop-blur-sm bg-white border border-white/30 rounded-2xl p-4 shadow-xl"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Code className="h-5 w-5 text-gray-900 mr-2" />
                  <h4 className="text-lg font-semibold text-gray-900">Implementation</h4>
                </div>
                <div className="flex items-center gap-2">
                  {Object.keys(loadedCodes[algorithm.name] || {}).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setImplLang(lang)}
                      className={`px-2 py-1 rounded-md text-xs font-medium ${
                        implLang === lang ? "bg-gray-900 text-white" : "bg-white/30 text-gray-900"
                      }`}
                    >
                      {lang.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              <div className="relative">
                <pre className="whitespace-pre-wrap bg-gray-900 text-gray-100 p-3 rounded-lg overflow-auto text-[0.9rem] font-mono max-h-60">
                  <code>
                    {loadingCode && !loadedCodes[algorithm.name]
                      ? "Loading implementation..."
                      : (loadedCodes[algorithm.name] || {})[implLang] || algoMeta.pseudoCode || "No implementation available."}
                  </code>
                </pre>
                <div className="absolute top-3 right-3 flex items-center gap-2">
                  <button
                    onClick={() => copyCode((loadedCodes[algorithm.name] || {})[implLang])}
                    className="px-3 py-1 bg-white/30 text-gray-100 rounded-md text-sm font-medium hover:bg-white/50"
                  >
                    Copy
                  </button>
                  {copied && <span className="text-sm text-green-600">Copied!</span>}
                </div>
              </div>
            </motion.div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="backdrop-blur-sm bg-white/90 border border-white/30 rounded-2xl p-4 shadow-xl">
              <div className="flex items-center mb-2">
                <BarChart3 className="h-5 w-5 text-gray-900 mr-2" />
                <h5 className="text-sm font-semibold text-gray-900">Time Complexity</h5>
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-700">Best:</span>
                  <code className="bg-white/30 px-2 py-0.5 rounded text-gray-900 font-mono">{algoMeta.timeComplexity.best}</code>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Average:</span>
                  <code className="bg-white/30 px-2 py-0.5 rounded text-gray-900 font-mono">{algoMeta.timeComplexity.average}</code>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Worst:</span>
                  <code className="bg-white/30 px-2 py-0.5 rounded text-gray-900 font-mono">{algoMeta.timeComplexity.worst}</code>
                </div>
              </div>
            </div>

            <div className="backdrop-blur-sm bg-white/90 border border-white/30 rounded-2xl p-4 shadow-xl">
              <div className="flex items-center mb-2">
                <BarChart3 className="h-5 w-5 text-gray-900 mr-2" />
                <h5 className="text-sm font-semibold text-gray-900">Space Complexity</h5>
              </div>
              <code className="bg-white/30 px-3 py-1 rounded text-gray-900 font-mono text-sm">{algoMeta.spaceComplexity}</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmDetails;
