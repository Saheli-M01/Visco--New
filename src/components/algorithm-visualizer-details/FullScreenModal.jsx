import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import {
  X,
  Eye,
  Info,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  RefreshCw,
} from "lucide-react";
import {
  FormControl,
  Select,
  MenuItem,
  Tabs,
  Tab,
  Slider,
  IconButton,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AlgorithmDetails from "./AlgorithmDetails";
import { categories } from "../../data/categories";
import { getAlgorithm, parseArray } from "../../algorithms/algorithmFactory";

// Custom MUI theme for glassmorphic design
const theme = createTheme({
  components: {
    MuiSelect: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          borderRadius: "12px",
          color: "#1f2937",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.3)",
          },
          "&.Mui-focused": {
            backgroundColor: "rgba(255, 255, 255, 0.3)",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
        },
        select: {
          padding: "12px 16px",
          fontSize: "1.125rem",
          fontWeight: 600,
        },
        icon: {
          color: "#1f2937",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(10px)",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.95)",
          },
          "&.Mui-selected": {
            backgroundColor: "rgba(59, 130, 246, 0.1)",
            "&:hover": {
              backgroundColor: "rgba(59, 130, 246, 0.2)",
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          borderRadius: "12px",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          borderRadius: "12px",
          minHeight: "48px",
          padding: "4px",
        },
        indicator: {
          display: "none",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
          borderRadius: "8px",
          color: "#6b7280",
          fontWeight: 500,
          fontSize: "0.875rem",
          textTransform: "none",
          minHeight: "40px",
          transition: "all 0.2s ease-in-out",
          "&.Mui-selected": {
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            backdropFilter: "blur(10px)",
            color: "#1f2937",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          },
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            color: "#1f2937",
          },
        },
      },
    },
  },
});

const FullScreenModal = ({ isOpen, onClose, algorithm, topic }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(algorithm);

  // Visualization state
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1.0); // Speed multiplier: 0.5x to 2x
  const [currentStep, setCurrentStep] = useState(0);
  const [totalSteps, setTotalSteps] = useState(10); // Example total steps
  const [arrayInput, setArrayInput] = useState("64, 34, 25, 12, 22, 11, 90");
  const [isAutomatic, setIsAutomatic] = useState(true);
  const [validationError, setValidationError] = useState("");
  const [showValidationPopup, setShowValidationPopup] = useState(false);
  const [stepHistory, setStepHistory] = useState([
    {
      step: 0,
      description: "",
      array: [64, 34, 25, 12, 22, 11, 90],
    },
  ]);

  // Array visualization state
  const [currentArray, setCurrentArray] = useState([]);
  const [originalArray, setOriginalArray] = useState([]);
  const [isVisualizationActive, setIsVisualizationActive] = useState(false);
  const [comparingIndices, setComparingIndices] = useState([]);
  const [sortingSteps, setSortingSteps] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [currentCodeLine, setCurrentCodeLine] = useState(-1);
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionInterval, setExecutionInterval] = useState(null);

  // Refs for auto-scrolling
  const stepHistoryRef = useRef(null);
  const currentStepRef = useRef(null);

  // Get all sorting algorithms from categories
  const sortingAlgorithms = categories.sorting?.algorithms || [];

  const languages = [
    { value: "c", label: "C" },
    { value: "cpp", label: "C++" },
    { value: "java", label: "Java" },
    { value: "javascript", label: "JavaScript" },
    { value: "python", label: "Python" },
  ];

  // Code will be loaded dynamically based on selected algorithm with line highlighting
  const getCodeForLanguage = (language, algorithmName) => {
    const algorithm = getAlgorithm(algorithmName);
    return algorithm.getCode(language);
  };

  // Get code lines for highlighting
  const getCodeLines = (language, algorithmName) => {
    const algorithm = getAlgorithm(algorithmName);
    if (algorithm.getCodeLines) {
      return algorithm.getCodeLines(language);
    }
    return algorithm.getCode(language).split("\n");
  };

  // Control functions
  const handlePlay = () => {
    if (!isVisualizationActive || sortingSteps.length === 0) return;
    
    setIsExecuting(true);
    setIsPlaying(true);
    // The useEffect will handle creating the interval with the correct speed
  };

  const handlePause = () => {
    setIsPlaying(false);
    setIsExecuting(false);
    if (executionInterval) {
      clearInterval(executionInterval);
      setExecutionInterval(null);
    }
  };

  const handleReset = () => {
    handlePause();
    setCurrentStepIndex(0);
    setCurrentStep(0);
    if (sortingSteps.length > 0) {
      const firstStep = sortingSteps[0];
      setCurrentArray([...firstStep.array]);
      setComparingIndices(firstStep.comparing || []);
      setCurrentCodeLine(
        firstStep.codeLine !== undefined ? firstStep.codeLine : -1
      );
    }
  };

  const handleStepForward = () => {
    if (!isVisualizationActive || currentStepIndex >= sortingSteps.length - 1)
      return;

    const nextIndex = currentStepIndex + 1;
    const step = sortingSteps[nextIndex];
    if (step) {
      setCurrentStepIndex(nextIndex);
      setCurrentStep(nextIndex);
      setCurrentArray([...step.array]);
      setComparingIndices(step.comparing || []);
      setCurrentCodeLine(step.codeLine !== undefined ? step.codeLine : -1);
    }
  };

  const handleStepBackward = () => {
    if (!isVisualizationActive || currentStepIndex <= 0) return;

    const prevIndex = currentStepIndex - 1;
    const step = sortingSteps[prevIndex];
    if (step) {
      setCurrentStepIndex(prevIndex);
      setCurrentStep(prevIndex);
      setCurrentArray([...step.array]);
      setComparingIndices(step.comparing || []);
      setCurrentCodeLine(step.codeLine !== undefined ? step.codeLine : -1);
    }
  };

  const handleLastStep = () => {
    if (!isVisualizationActive || sortingSteps.length === 0) return;

    const lastIndex = sortingSteps.length - 1;
    const step = sortingSteps[lastIndex];
    if (step) {
      setCurrentStepIndex(lastIndex);
      setCurrentStep(lastIndex);
      setCurrentArray([...step.array]);
      setComparingIndices(step.comparing || []);
      setCurrentCodeLine(step.codeLine !== undefined ? step.codeLine : -1);
    }
  };

  const handleFirstStep = () => {
    if (!isVisualizationActive || sortingSteps.length === 0) return;

    const firstStep = sortingSteps[0];
    setCurrentStepIndex(0);
    setCurrentStep(0);
    setCurrentArray([...firstStep.array]);
    setComparingIndices(firstStep.comparing || []);
    setCurrentCodeLine(
      firstStep.codeLine !== undefined ? firstStep.codeLine : -1
    );
  };

  const progress =
    sortingSteps.length > 0
      ? ((currentStepIndex + 1) / sortingSteps.length) * 100
      : 0;

  // Refresh function to reset everything
  const handleRefresh = () => {
    handlePause();
    setCurrentStep(0);
    setCurrentStepIndex(0);
    setIsPlaying(false);
    setArrayInput("64, 34, 25, 12, 22, 11, 90");
    setSpeed(1.0);
    setIsAutomatic(true);
    setValidationError("");
    setShowValidationPopup(false);
    setIsVisualizationActive(false);
    setCurrentArray([]);
    setOriginalArray([]);
    setComparingIndices([]);
    setSortingSteps([]);
    setCurrentCodeLine(-1);
    setIsExecuting(false);
    setStepHistory([]);
  };

  // Real-time input validation - only allow digits, commas, spaces, and decimal points
  const isValidCharacter = (char) => {
    return /^[0-9,.\s-]$/.test(char);
  };

  // Validation function for array input
  const validateArrayInput = (input) => {
    if (!input.trim()) {
      return "Please enter some numbers";
    }

    // Check if starts with comma
    if (input.trim().startsWith(",")) {
      return "Array cannot start with a comma. Please start with a number.";
    }

    // Check if ends with comma
    if (input.trim().endsWith(",")) {
      return "Array cannot end with a comma. Please end with a number.";
    }

    // Check for invalid characters
    const invalidChars = input
      .split("")
      .filter((char) => !isValidCharacter(char));
    if (invalidChars.length > 0) {
      const uniqueInvalidChars = [...new Set(invalidChars)];
      return `Invalid character(s): "${uniqueInvalidChars.join(
        '", "'
      )}" - Only numbers, commas, spaces, and decimal points are allowed.`;
    }

    // Check for consecutive commas
    if (input.includes(",,")) {
      return "Consecutive commas are not allowed. Please separate numbers with single commas.";
    }

    const values = input.split(",").map((val) => val.trim());

    // Check for empty values between commas
    for (let i = 0; i < values.length; i++) {
      if (values[i] === "") {
        return "Empty values are not allowed. Please use comma-separated numbers like: 1, 2, 3";
      }

      const num = parseFloat(values[i]);
      if (isNaN(num)) {
        return `"${values[i]}" is not a valid number. Please enter only integers or decimal numbers.`;
      }

      // Check decimal places (maximum 3 digits after decimal)
      if (values[i].includes(".")) {
        const decimalPart = values[i].split(".")[1];
        if (decimalPart && decimalPart.length > 3) {
          return `"${values[i]}" has too many decimal places. Maximum 3 digits after decimal point are allowed.`;
        }
      }
    }

    // Must have at least 2 numbers for meaningful algorithm execution
    if (values.length < 2) {
      return "Please enter at least 2 numbers for the algorithm to work properly.";
    }

    return null; // No errors
  };

  // Handle array input change with real-time validation
  const handleArrayInputChange = (e) => {
    const value = e.target.value;

    // Check if user is trying to start with comma
    if (value === "," || (value.length === 1 && value === ",")) {
      setValidationError(
        "Array cannot start with a comma. Please start with a number."
      );
      setShowValidationPopup(true);
      setTimeout(() => {
        setShowValidationPopup(false);
      }, 3000);
      return; // Don't update the input
    }

    // Real-time character validation
    const lastChar = value[value.length - 1];
    if (lastChar && !isValidCharacter(lastChar)) {
      // Show error immediately for invalid character
      setValidationError(
        `"${lastChar}" is not allowed. Only numbers, commas, spaces, and decimal points are allowed.`
      );
      setShowValidationPopup(true);
      // Auto-hide popup after 3 seconds
      setTimeout(() => {
        setShowValidationPopup(false);
      }, 3000);
      return; // Don't update the input
    }

    setArrayInput(value);

    // Real-time validation for current input
    const error = validateArrayInput(value);
    if (error && value.length > 0) {
      setValidationError(error);
      setShowValidationPopup(true);
    } else {
      setValidationError("");
      setShowValidationPopup(false);
    }
  };

  // Handle escape key and cleanup
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        handlePause();
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
      // Reset to visualization tab when modal opens
      setActiveTab(0);
      setSelectedAlgorithm(algorithm);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
      // Cleanup interval when component unmounts
      if (executionInterval) {
        clearInterval(executionInterval);
      }
    };
  }, [isOpen, onClose, algorithm, executionInterval]);

  // Auto-scroll to current step in step history
  useEffect(() => {
    if (
      currentStepRef.current &&
      stepHistoryRef.current &&
      isVisualizationActive
    ) {
      currentStepRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [currentStepIndex, isVisualizationActive]);

  // Handle speed changes during execution - restart interval with new speed
  useEffect(() => {
    if (isExecuting && isPlaying && sortingSteps.length > 0) {
      // Clear existing interval
      if (executionInterval) {
        clearInterval(executionInterval);
      }

      // Create new interval with updated speed
      const interval = setInterval(() => {
        setCurrentStepIndex((prevIndex) => {
          if (prevIndex >= sortingSteps.length - 1) {
            setIsPlaying(false);
            setIsExecuting(false);
            clearInterval(interval);
            return prevIndex;
          }

          const nextIndex = prevIndex + 1;
          const step = sortingSteps[nextIndex];
          if (step) {
            setCurrentArray([...step.array]);
            setComparingIndices(step.comparing || []);
            setCurrentCodeLine(step.codeLine !== undefined ? step.codeLine : -1);
            setCurrentStep(nextIndex);
          }
          return nextIndex;
        });
      }, 2000 / speed); // Use current speed

      setExecutionInterval(interval);

      // Cleanup function
      return () => {
        clearInterval(interval);
      };
    }
  }, [speed, isExecuting, isPlaying, sortingSteps.length]);

  const handleAlgorithmChange = (event) => {
    const algorithmName = event.target.value;
    const newAlgorithm = sortingAlgorithms.find(
      (algo) => algo.name === algorithmName
    );
    setSelectedAlgorithm(newAlgorithm);
  };

  // Handle Go button click
  const handleGo = () => {
    const validation = validateArrayInput(arrayInput);
    if (validation) {
      setValidationError(validation);
      setShowValidationPopup(true);
      return;
    }

    // Reset any running execution
    handlePause();

    const parsedArray = parseArray(arrayInput);
    setOriginalArray([...parsedArray]);

    // Get the appropriate algorithm implementation
    const algorithm = getAlgorithm(selectedAlgorithm?.name);
    const steps = algorithm.generateSteps(parsedArray);

    setSortingSteps(steps);
    setCurrentStepIndex(0);
    setCurrentStep(0);
    setTotalSteps(steps.length);
    setIsVisualizationActive(true);

    // Set initial state
    if (steps.length > 0) {
      const firstStep = steps[0];
      setCurrentArray([...firstStep.array]);
      setComparingIndices(firstStep.comparing || []);
      setCurrentCodeLine(
        firstStep.codeLine !== undefined ? firstStep.codeLine : -1
      );
    }

    // Update step history for the sidebar
    setStepHistory(
      steps.map((step, index) => ({
        step: index,
        description: step.description,
        array: step.array,
        phase: step.phase,
      }))
    );
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  if (!isOpen) return null;

  return (
    <ThemeProvider theme={theme}>
      <AnimatePresence>
        <div className="fixed inset-0 z-50">
          {/* Full-screen backdrop */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
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
          </div>

          {/* Full-screen modal content */}
          <div className="relative h-full w-full backdrop-blur-sm bg-white/20 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-3 border-b border-white/20 backdrop-blur-md bg-white/10 shadow-lg">
              <div className="flex items-center gap-6">
                {/* Algorithm Dropdown */}
                <FormControl
                  variant="outlined"
                  size="small"
                  sx={{ minWidth: 200 }}
                >
                  <Select
                    value={selectedAlgorithm?.name || ""}
                    onChange={handleAlgorithmChange}
                    displayEmpty
                    sx={{
                      backgroundColor: "rgba(255, 255, 255, 0.3)",
                      borderRadius: "12px",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                      border: "1px solid rgba(255, 255, 255, 0.4)",
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                      },
                      "& .MuiSelect-select": {
                        padding: "10px 16px",
                        fontSize: "0.875rem",
                        fontWeight: "600",
                        color: "#1f2937",
                      },
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.4)",
                        boxShadow: "0 6px 16px rgba(0, 0, 0, 0.2)",
                      },
                    }}
                  >
                    {sortingAlgorithms.map((algo) => (
                      <MenuItem key={algo.name} value={algo.name}>
                        {algo.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {/* Tabs */}
                <Tabs
                  value={activeTab}
                  onChange={handleTabChange}
                  sx={{
                    minHeight: "48px",
                    "& .MuiTabs-flexContainer": {
                      gap: "8px",
                    },
                    "& .MuiTab-root": {
                      minHeight: "auto",
                      padding: "10px 20px",
                      fontSize: "0.875rem",
                      fontWeight: "600",
                      color: "#6b7280",
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                      border: "1px solid rgba(85, 84, 84, 0.4)",
                      borderRadius: "10px",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                      textTransform: "none",
                      transition: "all 0.3s ease",
                      "&.Mui-selected": {
                        color: "#ffffff",
                        backgroundColor: "#374151",
                        border: "1px solid #4b5563",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                      },
                      "&:hover": {
                        color: "#ffffff",
                        backgroundColor: "#222933ff",
                        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
                      },
                    },
                    "& .MuiTabs-indicator": {
                      display: "none",
                    },
                  }}
                >
                  <Tab
                    icon={<Eye className="h-4 w-4" />}
                    label="Visualization"
                    iconPosition="start"
                    sx={{ gap: 1 }}
                  />
                  <Tab
                    icon={<Info className="h-4 w-4" />}
                    label="Details"
                    iconPosition="start"
                    sx={{ gap: 1 }}
                  />
                </Tabs>

                {/* Refresh Button */}
                <button
                  onClick={handleRefresh}
                  className="p-2 rounded-xl backdrop-blur-sm bg-white/20 border border-white/30 hover:bg-white/30 transition-all text-gray-900 hover:text-gray-700"
                  title="Refresh and Reset"
                >
                  <RefreshCw className="h-4 w-4" />
                </button>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-xl backdrop-blur-sm bg-white/20 border border-white/30 hover:bg-white/30 transition-all text-gray-900 hover:text-gray-700"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-hidden">
              {/* Visualization Tab */}
              {activeTab === 0 && (
                <div className="h-full bg-gradient-to-br from-white/20 to-white/40 backdrop-blur-sm custom-scrollbar overflow-y-auto">
                  <div className="p-4 space-y-3">
                    {/* New Layout - Main Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                      {/* Left Column - 4/5 width */}
                      <div className="lg:col-span-4 space-y-3">
                        {/* First Row - Code Preview and Step History */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                          {/* Code Preview - Left */}
                          <div className="backdrop-blur-md bg-white/20 border border-white/30 rounded-xl py-2 px-4 shadow-lg">
                            <div className="flex items-center justify-between mb-1">
                              <h3 className="text-lg font-semibold text-gray-900">
                                Code Preview
                              </h3>
                              <FormControl size="small" sx={{ minWidth: 120 }}>
                                <Select
                                  value={selectedLanguage}
                                  onChange={(e) =>
                                    setSelectedLanguage(e.target.value)
                                  }
                                  sx={{
                                    backgroundColor: "rgba(255, 255, 255, 0.4)",
                                    borderRadius: "8px",
                                    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
                                    border: "1px solid rgba(56, 56, 56, 0.4)",
                                    "& .MuiOutlinedInput-notchedOutline": {
                                      border: "none",
                                    },
                                    "& .MuiSelect-select": {
                                      padding: "6px 12px",
                                      fontSize: "0.75rem",
                                      fontWeight: "500",
                                    },
                                  }}
                                >
                                  {languages.map((lang) => (
                                    <MenuItem
                                      key={lang.value}
                                      value={lang.value}
                                    >
                                      {lang.label}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </div>
                            <pre className="bg-gray-900 text-green-400 p-3 rounded-lg text-sm overflow-x-auto custom-scrollbar h-48 shadow-inner border border-gray-700">
                              <code>
                                {getCodeLines(
                                  selectedLanguage,
                                  selectedAlgorithm?.name
                                ).map((line, index) => (
                                  <div
                                    key={index}
                                    className={`${
                                      currentCodeLine === index
                                        ? "bg-blue-300/70 text-yellow-100 border-l-4 border-blue-600 pl-2"
                                        : ""
                                    } ${
                                      currentCodeLine !== -1 &&
                                      currentCodeLine !== index
                                        ? "text-gray-500"
                                        : "text-green-400"
                                    }`}
                                  >
                                    {line}
                                  </div>
                                ))}
                              </code>
                            </pre>
                          </div>

                          {/* Step History - Right */}
                          <div className="backdrop-blur-md bg-white/20 border border-white/30 rounded-xl  py-2 px-4 shadow-lg">
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">
                              Step History
                            </h3>
                            <div
                              ref={stepHistoryRef}
                              className="space-y-2 h-48 overflow-y-auto custom-scrollbar"
                            >
                              {stepHistory.length === 0 ? (
                                <div className="flex items-center justify-center h-full">
                                  <p className="text-gray-500 text-sm text-center">
                                    No steps yet.<br />
                                    Click "Start Visualization" to begin.
                                  </p>
                                </div>
                              ) : (
                                stepHistory.map((step, index) => (
                                <div
                                  key={index}
                                  ref={
                                    currentStepIndex === step.step
                                      ? currentStepRef
                                      : null
                                  }
                                  className={`p-3 rounded-lg transition-all cursor-pointer shadow-md border ${
                                    currentStepIndex === step.step
                                      ? "bg-gray-800 text-white border-gray-600 shadow-lg ring-2 ring-blue-400/50"
                                      : "bg-white/30 border-white/40 hover:bg-white/40 text-gray-900 hover:shadow-lg"
                                  }`}
                                  onClick={() => {
                                    if (
                                      isVisualizationActive &&
                                      sortingSteps[step.step]
                                    ) {
                                      handlePause();
                                      setCurrentStepIndex(step.step);
                                      setCurrentStep(step.step);
                                      const targetStep =
                                        sortingSteps[step.step];
                                      setCurrentArray([...targetStep.array]);
                                      setComparingIndices(
                                        targetStep.comparing || []
                                      );
                                      setCurrentCodeLine(
                                        targetStep.codeLine !== undefined
                                          ? targetStep.codeLine
                                          : -1
                                      );
                                    }
                                  }}
                                >
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-semibold">
                                      Step {step.step + 1}
                                    </span>
                                    {step.phase && (
                                      <span
                                        className={`text-xs px-2 py-1 rounded-full ${
                                          step.phase === "comparison"
                                            ? "bg-blue-100 text-blue-800"
                                            : step.phase === "swap"
                                            ? "bg-red-100 text-red-800"
                                            : step.phase === "completed"
                                            ? "bg-green-100 text-green-800"
                                            : "bg-gray-100 text-gray-800"
                                        }`}
                                      >
                                        {step.phase}
                                      </span>
                                    )}
                                  </div>
                                  <div className="flex gap-1 flex-wrap mb-2">
                                    {step.array.map((num, i) => (
                                      <span
                                        key={i}
                                        className={`px-2 py-1 rounded text-xs font-medium shadow-sm ${
                                          currentStepIndex === step.step
                                            ? "bg-gray-600 text-white"
                                            : "bg-white/50 text-gray-800 border border-white/30"
                                        }`}
                                      >
                                        {num}
                                      </span>
                                    ))}
                                  </div>
                                  <p
                                    className={`text-xs ${
                                      currentStepIndex === step.step
                                        ? "text-gray-300"
                                        : "text-gray-700"
                                    }`}
                                  >
                                    {step.description}
                                  </p>
                                </div>
                                ))
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Second Row - Output (Full Width) */}
                        <div className="backdrop-blur-md bg-white/20 border border-white/30 rounded-xl p-4 shadow-lg">
                          {!isVisualizationActive ? (
                            // Initial state - show terminal style
                            <div className="bg-gray-900 text-white p-4 rounded-lg text-sm font-mono min-h-[200px] overflow-y-auto custom-scrollbar shadow-inner border border-gray-700">
                              <div className="text-green-400">
                                $ Ready to run {selectedAlgorithm?.name}...
                              </div>
                              <div className="text-gray-300 mt-2">
                                Enter array values and click "Go" to start
                                visualization
                              </div>
                              <div className="text-blue-400 mt-1">
                                Example: 64, 34, 25, 12, 22, 11, 90
                              </div>
                            </div>
                          ) : (
                            // Array visualization
                            <div className="space-y-4">
                              {/* Array Visualization Header */}
                              <div className="flex justify-between items-center">
                                <h3 className="text-lg font-semibold text-gray-800">
                                  Array Visualization
                                </h3>
                                <div className="text-sm text-gray-600">
                                  Step {currentStepIndex + 1} of{" "}
                                  {sortingSteps.length}
                                </div>
                              </div>

                              {/* Array Display */}
                              <div className="bg-gray-900 rounded-lg p-8 min-h-[250px] flex items-center justify-center">
                                <div className="flex flex-col items-center">
                                  {/* Array Elements */}
                                  <div className="flex justify-center gap-4 mb-4">
                                    {currentArray.map((value, index) => {
                                      const isComparing =
                                        comparingIndices.includes(index);
                                      const isSwapped =
                                        sortingSteps[
                                          currentStepIndex
                                        ]?.swapped?.includes(index);

                                      return (
                                        <div
                                          key={`${index}-${value}`}
                                          className="flex flex-col items-center"
                                        >
                                          {/* Status indicator */}
                                          {isComparing && (
                                            <div className="mb-2">
                                              <div className="bg-blue-400 text-white text-xs px-3 py-1 rounded-full font-semibold animate-pulse">
                                                Comparing
                                              </div>
                                            </div>
                                          )}

                                          {/* Array element box */}
                                          <div
                                            className={`
                                              flex items-center justify-center
                                              h-16 px-4 rounded-lg font-bold text-lg
                                              transition-all duration-500 ease-in-out
                                              transform shadow-lg border-2 min-w-[60px]
                                              ${
                                                isComparing
                                                  ? "bg-blue-500 text-white border-blue-400 scale-110 animate-pulse"
                                                  : isSwapped
                                                  ? "bg-green-500 text-white border-green-400 scale-105"
                                                  : "bg-gray-700 text-white border-gray-600"
                                              }
                                            `}
                                          >
                                            <span className="drop-shadow-lg">
                                              {value}
                                            </span>
                                          </div>

                                          {/* Array index */}
                                          <div className="mt-2">
                                            <span className="text-gray-400 text-sm font-mono">
                                              {index}
                                            </span>
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>

                                  {/* Swapped indicator */}
                                  {sortingSteps[currentStepIndex]?.swapped
                                    ?.length > 0 && (
                                    <div className="mt-4">
                                      <div className="bg-green-500 text-white text-sm px-4 py-2 rounded-full font-semibold">
                                        Elements Swapped!
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right Column - 1/5 width */}
                      <div className="lg:col-span-1 space-y-3">
                        {/* Array Input Card - 1st Row */}
                        <div className="backdrop-blur-md bg-white/20 border border-white/30 rounded-xl p-4 shadow-lg">
                          <h3 className="text-md font-semibold text-gray-900 mb-3">
                            Array Input
                          </h3>
                          <div className="space-y-3">
                            <div className="relative">
                              <textarea
                                value={arrayInput}
                                onChange={handleArrayInputChange}
                                placeholder="Enter comma-separated numbers: 64, 34, 25, 12, 22, 11, 90"
                                className="w-full h-20 p-3 rounded-lg backdrop-blur-sm bg-white/30 border-2 border-gray-500/50 text-gray-900 placeholder-gray-600 resize-none focus:outline-none focus:ring-2 focus:ring-gray-500/50 focus:border-gray-500/50 shadow-inner text-sm hover:border-white/60 transition-all duration-200"
                              />
                              {/* Validation Popup */}
                              {showValidationPopup && (
                                <div className="absolute top-full left-0 right-0 mt-2 p-3 bg-red-50 border border-red-200 rounded-lg shadow-lg z-50">
                                  <div className="flex items-start gap-2">
                                    <div className="text-red-700 text-sm">
                                      {validationError}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                            <button
                              onClick={handleGo}
                              className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-all shadow-md text-sm font-medium border border-gray-600"
                            >
                              Go
                            </button>
                          </div>
                        </div>

                        {/* Controls Card - 2nd Row */}
                        <div className="backdrop-blur-md bg-white/20 border border-white/30 rounded-xl p-4 shadow-lg">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="text-md font-semibold text-gray-900">
                              Controls
                            </h3>
                          </div>

                          {/* Compact Manual/Automatic Toggle Tabs */}
                          <div className="flex bg-white/20 rounded-lg p-1 mb-4 border border-white/30 shadow-inner w-full">
                            <button
                              onClick={() => setIsAutomatic(false)}
                              className={`flex-1 py-1 rounded-md text-sm font-medium transition-all ${
                                !isAutomatic
                                  ? "bg-gray-800 text-white shadow-md"
                                  : "text-gray-700 hover:bg-white/20"
                              }`}
                            >
                              Manual
                            </button>
                            <button
                              onClick={() => setIsAutomatic(true)}
                              className={`flex-1 py-1 rounded-md text-sm font-medium transition-all ${
                                isAutomatic
                                  ? "bg-gray-800 text-white shadow-md"
                                  : "text-gray-700 hover:bg-white/20"
                              }`}
                            >
                              Automatic
                            </button>
                          </div>

                          {/* Control Content */}
                          {isAutomatic ? (
                            /* Automatic Controls */
                            <div className="space-y-3">
                              <div className="flex items-center justify-center gap-2">
                                <button
                                  onClick={handleReset}
                                  className="p-2 rounded-lg backdrop-blur-sm bg-white/30 border border-white/40 hover:bg-white/40 transition-all text-gray-900 shadow-md"
                                >
                                  <RotateCcw className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={isPlaying ? handlePause : handlePlay}
                                  className="p-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-all shadow-lg border border-gray-600"
                                >
                                  {isPlaying ? (
                                    <Pause className="h-4 w-4" />
                                  ) : (
                                    <Play className="h-4 w-4" />
                                  )}
                                </button>
                              </div>

                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm font-medium text-gray-700">
                                    Speed
                                  </span>
                                  <span className="text-sm text-gray-600">
                                    {speed}x
                                  </span>
                                </div>
                                <Slider
                                  value={speed}
                                  onChange={(_, newValue) => setSpeed(newValue)}
                                  min={0.5}
                                  max={1.5}
                                  step={0.1}
                                  marks={[
                                    { value: 0.5, label: '0.5x' },
                                    { value: 1.0, label: '1x' },
                                    { value: 1.5, label: '1.5x' }
                                  ]}
                                  size="small"
                                  sx={{
                                    color: "#374151",
                                    "& .MuiSlider-thumb": {
                                      backgroundColor: "#374151",
                                      width: 16,
                                      height: 16,
                                      "&:hover": {
                                        boxShadow:
                                          "0 0 0 8px rgba(55, 65, 81, 0.16)",
                                      },
                                    },
                                    "& .MuiSlider-track": {
                                      backgroundColor: "#374151",
                                      height: 4,
                                    },
                                    "& .MuiSlider-rail": {
                                      backgroundColor:
                                        "rgba(156, 163, 175, 0.5)",
                                      height: 4,
                                    },
                                  }}
                                />
                              </div>
                            </div>
                          ) : (
                            /* Manual Controls */
                            <div className="space-y-2">
                              <div className="grid grid-cols-2 gap-2">
                                <button
                                  onClick={handleFirstStep}
                                  disabled={
                                    !isVisualizationActive ||
                                    currentStepIndex === 0
                                  }
                                  className="flex items-center justify-center gap-1 p-2 rounded-lg backdrop-blur-sm bg-white/30 border border-white/40 hover:bg-white/40 transition-all text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed shadow-md text-xs font-medium"
                                >
                                  <SkipBack className="h-3 w-3" />
                                  First
                                </button>
                                <button
                                  onClick={handleLastStep}
                                  disabled={
                                    !isVisualizationActive ||
                                    currentStepIndex >= sortingSteps.length - 1
                                  }
                                  className="flex items-center justify-center gap-1 p-2 rounded-lg backdrop-blur-sm bg-white/30 border border-white/40 hover:bg-white/40 transition-all text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed shadow-md text-xs font-medium"
                                >
                                  <SkipForward className="h-3 w-3" />
                                  Last
                                </button>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-2">
                                <button
                                  onClick={handleStepBackward}
                                  disabled={
                                    !isVisualizationActive ||
                                    currentStepIndex === 0
                                  }
                                  className="flex items-center justify-center gap-1 p-2 rounded-lg backdrop-blur-sm bg-white/30 border border-white/40 hover:bg-white/40 transition-all text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed shadow-md text-xs font-medium"
                                >
                                  <ChevronLeft className="h-3 w-3" />
                                  Prev
                                </button>
                               
                                <button
                                  onClick={handleStepForward}
                                  disabled={
                                    !isVisualizationActive ||
                                    currentStepIndex >= sortingSteps.length - 1
                                  }
                                  className="flex items-center justify-center gap-1 p-2 rounded-lg backdrop-blur-sm bg-white/30 border border-white/40 hover:bg-white/40 transition-all text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed shadow-md text-xs font-medium"
                                >
                                  <ChevronRight className="h-3 w-3" />
                                  Next
                                </button>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Progress Bar - 3rd Row */}
                        <div className="backdrop-blur-md bg-white/20 border border-white/30 rounded-xl p-4 shadow-lg">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-medium text-gray-700">
                              Progress
                            </span>
                            <span className="text-sm font-medium text-gray-700">
                              {currentStepIndex + 1} /{" "}
                              {sortingSteps.length || totalSteps}
                            </span>
                          </div>
                          <div className="w-full bg-gray-300 rounded-full h-2 shadow-inner mb-2">
                            <div
                              className="bg-gradient-to-r from-gray-600 to-gray-800 h-2 rounded-full transition-all duration-300 shadow-sm"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                          <div className="text-center text-xs text-gray-600 mt-2">
                            {sortingSteps.length > 0 &&
                            currentStepIndex === sortingSteps.length - 1
                              ? "Complete"
                              : isExecuting
                              ? "Executing..."
                              : "Ready"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Details Tab */}
              {activeTab === 1 && (
                <div className="h-full overflow-y-auto bg-gradient-to-br from-white/10 to-white/20 backdrop-blur-sm custom-scrollbar">
                  <div className="p-6 text-gray-900 max-w-6xl mx-auto">
                    <AlgorithmDetails
                      algorithm={selectedAlgorithm}
                      topic={topic}
                      hideVisualizationButton={true}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </AnimatePresence>
    </ThemeProvider>
  );
};

export default FullScreenModal;
