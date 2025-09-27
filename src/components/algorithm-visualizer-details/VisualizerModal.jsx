import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AlgorithmDetails from "./AlgorithmDetails";
import { categories } from "../../data/categories";
import { getAlgorithm, parseArray } from "../../algorithms/algorithmFactory";
import VisualizerHeader from "./VisualizerHeader";
import CodePreview from "./CodePreview";
import StepHistory from "./StepHistory";
import ArrayDisplay from "./ArrayDisplay";
import ControlsPanel from "./ControlsPanel";
import ArrayInputCard from "./ArrayInputCard";

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
          fontSize: "1.125em",
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
          fontSize: "0.875em",
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
  const [showLanguageChangeConfirm, setShowLanguageChangeConfirm] =
    useState(false);
  const [pendingLanguage, setPendingLanguage] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1.0); // Speed multiplier: 0.5x to 2x
  const [currentStep, setCurrentStep] = useState(0);
  const [totalSteps, setTotalSteps] = useState(0); // total steps (0 when no steps)
  const [arrayInput, setArrayInput] = useState("");
  const [isAutomatic, setIsAutomatic] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [showValidationPopup, setShowValidationPopup] = useState(false);
  const [stepHistory, setStepHistory] = useState([]);

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

  // Pause execution while confirm modal is shown
  useEffect(() => {
    if (showLanguageChangeConfirm) {
      // Pause everything
      handlePause();
    }
  }, [showLanguageChangeConfirm]);

  // Get all sorting algorithms from categories
  const sortingAlgorithms = categories.sorting?.algorithms || [];

 



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
    setTotalSteps(0);
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

    // Maximum allowed numbers check
    if (values.length > 10) {
      return "Please enter no more than 10 numbers. The visualizer supports up to 10 elements.";
    }

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

    // Live limit: prevent more than 10 numbers being entered
    const potentialValues = value.split(",").map((v) => v.trim()).filter((v) => v !== "");
    if (potentialValues.length > 10) {
      setValidationError(
        "Maximum 10 numbers allowed. The visualizer supports up to 10 elements."
      );
      setShowValidationPopup(true);
      setTimeout(() => {
        setShowValidationPopup(false);
      }, 3000);
      return; // Don't update the input - block the 11th entry
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
            setCurrentCodeLine(
              step.codeLine !== undefined ? step.codeLine : -1
            );
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
    // Pass the currently selected language so step generation matches displayed code
    const steps = algorithm.generateSteps(parsedArray, selectedLanguage);

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

  // Called by CodePreview when user attempts to change language while a visualization exists
  const requestLanguageChange = (newLang) => {
    // Only prompt when a visualization is active AND we've progressed beyond the first step
    if (
      !isVisualizationActive ||
      sortingSteps.length === 0 ||
      currentStepIndex <= 0
    ) {
      setSelectedLanguage(newLang);
      return;
    }

    // Otherwise prompt for confirmation and pause
    setPendingLanguage(newLang);
    setShowLanguageChangeConfirm(true);
  };

  const confirmLanguageChange = () => {
    if (pendingLanguage) {
      // regenerate steps for the pending language using the original array
      setSelectedLanguage(pendingLanguage);
      // If we have originalArray, regenerate steps automatically
      if (originalArray && originalArray.length > 0) {
        const algorithm = getAlgorithm(selectedAlgorithm?.name);
        const steps = algorithm.generateSteps(
          [...originalArray],
          pendingLanguage
        );
        setSortingSteps(steps);
        setTotalSteps(steps.length);
        setStepHistory(
          steps.map((step, index) => ({
            step: index,
            description: step.description,
            array: step.array,
            phase: step.phase,
          }))
        );
        setCurrentStepIndex(0);
        setCurrentStep(0);
        if (steps.length > 0) {
          const firstStep = steps[0];
          setCurrentArray([...firstStep.array]);
          setComparingIndices(firstStep.comparing || []);
          setCurrentCodeLine(
            firstStep.codeLine !== undefined ? firstStep.codeLine : -1
          );
        }
      }
    }
    setPendingLanguage(null);
    setShowLanguageChangeConfirm(false);
  };

  const cancelLanguageChange = () => {
    setPendingLanguage(null);
    setShowLanguageChangeConfirm(false);
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
            <VisualizerHeader
              sortingAlgorithms={sortingAlgorithms}
              selectedAlgorithm={selectedAlgorithm}
              handleAlgorithmChange={handleAlgorithmChange}
              activeTab={activeTab}
              handleTabChange={handleTabChange}
              handleRefresh={handleRefresh}
              onClose={onClose}
            />

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
                          <CodePreview
                            selectedLanguage={selectedLanguage}
                            requestLanguageChange={requestLanguageChange}
                            getCodeLines={getCodeLines}
                            selectedAlgorithm={selectedAlgorithm}
                            currentCodeLine={currentCodeLine}
                          />

                          <StepHistory
                            stepHistory={stepHistory}
                            currentStepIndex={currentStepIndex}
                            isVisualizationActive={isVisualizationActive}
                            sortingSteps={sortingSteps}
                            setCurrentStepIndex={setCurrentStepIndex}
                            setCurrentStep={setCurrentStep}
                            setCurrentArray={setCurrentArray}
                            setComparingIndices={setComparingIndices}
                            setCurrentCodeLine={setCurrentCodeLine}
                            currentStepRef={currentStepRef}
                            stepHistoryRef={stepHistoryRef}
                          />
                        </div>

                        {/* Second Row - Output (Full Width) */}
                        <div className="backdrop-blur-md bg-white/20 border border-white/30 rounded-xl p-4 shadow-lg">
                          {!isVisualizationActive ? (
                            <div className="bg-gray-900 text-white p-4 rounded-lg text-sm font-mono min-h-[200px] overflow-y-auto custom-scrollbar shadow-inner border border-gray-700">
                              <div className="text-green-400">
                                Ready to run {selectedAlgorithm?.name}...
                              </div>
                              <div className="text-gray-300 mt-2">
                                Enter array values and click{" "}
                                <span className="text-blue-400">Go</span> to
                                begin the visualization.
                              </div>
                              <div className="text-blue-400 mt-1">
                                Use the Manual or Automatic controls to manage
                                the process.
                              </div>
                              <div className="text-gray-300 mt-2">
                                Review each step in the step history panel.
                              </div>
                              <div className="text-blue-400 mt-2">
                                Follow the progress bar to track sorting
                                progress.
                              </div>
                            </div>
                          ) : (
                            <ArrayDisplay
                              currentArray={currentArray}
                              comparingIndices={comparingIndices}
                              sortingSteps={sortingSteps}
                              currentStepIndex={currentStepIndex}
                              currentCodeLine={currentCodeLine}
                              selectedLanguage={selectedLanguage}
                              tempLineIndex={getCodeLines(
                                selectedLanguage,
                                selectedAlgorithm?.name
                              ).findIndex((line) => /temp/.test(line))}
                              languageHasTemp={getCodeLines(
                                selectedLanguage,
                                selectedAlgorithm?.name
                              ).some((line) => /temp/.test(line))}
                            />
                          )}
                        </div>
                      </div>

                      {/* Right Column - 1/5 width */}
                      <div className="lg:col-span-1 space-y-3">
                        <ArrayInputCard
                          arrayInput={arrayInput}
                          handleArrayInputChange={handleArrayInputChange}
                          showValidationPopup={showValidationPopup}
                          validationError={validationError}
                          handleGo={handleGo}
                        />

                        <ControlsPanel
                          isAutomatic={isAutomatic}
                          setIsAutomatic={setIsAutomatic}
                          isPlaying={isPlaying}
                          handlePlay={handlePlay}
                          handlePause={handlePause}
                          handleReset={handleReset}
                          speed={speed}
                          setSpeed={setSpeed}
                          isVisualizationActive={isVisualizationActive}
                          currentStepIndex={currentStepIndex}
                          sortingSteps={sortingSteps}
                          handleFirstStep={handleFirstStep}
                          handleLastStep={handleLastStep}
                          handleStepBackward={handleStepBackward}
                          handleStepForward={handleStepForward}
                          isExecuting={isExecuting}
                        />

                        {/* Progress Bar - 3rd Row */}
                        <div className="backdrop-blur-md bg-white/20 border border-white/30 rounded-xl p-4 shadow-lg">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-medium text-gray-700">
                              Progress
                            </span>
                            <span className="text-sm font-medium text-gray-700">
                              {sortingSteps.length > 0
                                ? `${currentStepIndex + 1} / ${sortingSteps.length}`
                                : `0 / 0`}
                            </span>
                          </div>
                          <div className="w-full bg-gray-300 rounded-full h-2 shadow-inner mb-2">
                            <div
                              className="bg-gradient-to-r from-gray-600 to-gray-800 h-2 rounded-full transition-all duration-300 shadow-sm"
                              style={{ width: `${progress}%` }}
                            />
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
      {/* Language change confirmation modal */}
      {showLanguageChangeConfirm && (
        <div
          className="fixed inset-0 flex items-center justify-center"
          style={{ zIndex: 9999 }}
        >
          <div className="absolute inset-0 bg-black/70" />
          <div
            className="relative bg-white rounded-lg p-6 shadow-lg w-96"
            style={{ zIndex: 10000 }}
          >
            <h3 className="text-lg font-semibold mb-2">
              Change language and regenerate?
            </h3>
            <p className="text-sm text-gray-700 mb-4">
              Changing the language now will regenerate the visualization steps
              and reset progress. Do you want to continue?
            </p>
            <div className="flex justify-end gap-2">
              <button
                className="px-3 py-1 rounded bg-gray-200"
                onClick={cancelLanguageChange}
              >
                Cancel
              </button>
              <button
                className="px-3 py-1 rounded bg-red-500 text-white"
                onClick={confirmLanguageChange}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </ThemeProvider>
  );
};

export default FullScreenModal;
