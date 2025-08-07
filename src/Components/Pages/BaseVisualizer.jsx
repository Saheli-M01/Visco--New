import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import "../../Styles/PageStyle/_baseVisualizerStyle.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faBackwardFast,
  faBackwardStep,
  faPlay,
  faPause,
  faForwardStep,
  faForwardFast,
  faFileCode,
} from "@fortawesome/free-solid-svg-icons";

// Custom Dropdown Component
const CustomDropdown = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="selector" ref={dropdownRef}>
      <div className="custom-select">
        <button
          className={`select-button ${isOpen ? "open" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
          type="button"
        >
          <span>{value}</span>
          <FontAwesomeIcon icon={faChevronDown} className="arrow-icon" />
        </button>
        {isOpen && (
          <div className="select-dropdown">
            {options.map((option) => (
              <div
                key={option.name}
                className={`select-option ${
                  option.name === value ? "selected" : ""
                }`}
                onClick={() => {
                  onChange(option.name);
                  setIsOpen(false);
                }}
              >
                {option.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Controls Component
const Controls = ({
  speed,
  isPlaying,
  onSpeedChange,
  onControlClick,
  currentStep = 0,
  totalSteps = 0,
}) => (
  <div className="controls">
    <div className="control-sections">
      <div className="auto-controls text-center">
        <div className="section-header">
          <h5>Automatic</h5>
        </div>
        <div className="auto-control-speed">
          <div className="speed-control">
            <span>Speed: {speed}x</span>
            <input
              type="range"
              min="1"
              max="5"
              value={speed}
              onChange={(e) => onSpeedChange(Number(e.target.value))}
              className="speed-slider"
              aria-label="Adjust visualization speed"
            />
          </div>
          <div content={isPlaying ? "Pause (Space)" : "Play (Space)"}>
            <button
              className="play-button"
              onClick={() => onControlClick("playPause")}
              aria-label={isPlaying ? "Pause" : "Play"}
              disabled={totalSteps === 0}
            >
              <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
            </button>
          </div>
        </div>
      </div>

      <div className="manual-controls text-center">
        <div className="section-header">
          <h5>Manual</h5>
        </div>
        <div className="control-buttons">
          <div content="First Step (Home)">
            <button
              className="control-button"
              onClick={() => onControlClick("first")}
              disabled={currentStep === 0 || totalSteps === 0}
              aria-label="Go to first step"
            >
              <FontAwesomeIcon icon={faBackwardFast} />
              <span>First</span>
            </button>
          </div>
          <div content="Previous Step (←)">
            <button
              className="control-button"
              onClick={() => onControlClick("prev")}
              disabled={currentStep === 0 || totalSteps === 0}
              aria-label="Go to previous step"
            >
              <FontAwesomeIcon icon={faBackwardStep} />
              <span>Prev</span>
            </button>
          </div>

          <div content="Next Step (→)">
            <button
              className="control-button"
              onClick={() => onControlClick("next")}
              disabled={currentStep >= totalSteps - 1 || totalSteps === 0}
              aria-label="Go to next step"
            >
              <FontAwesomeIcon icon={faForwardStep} />
              <span>Next</span>
            </button>
          </div>
          <div content="Last Step (End)">
            <button
              className="control-button"
              onClick={() => onControlClick("last")}
              disabled={currentStep >= totalSteps - 1 || totalSteps === 0}
              aria-label="Go to last step"
            >
              <FontAwesomeIcon icon={faForwardFast} />
              <span>Last</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Main BaseVisualizer Component
const BaseVisualizer = ({
  title,
  onClose,
  renderVisualization,
  renderCode,
  renderStepHistory,
  algorithms = [],
  selectedAlgorithm,
  onAlgorithmChange,
  languages = ["Python", "C++", "Java", "JavaScript", "C"],
  onArraySubmit,
  onProgressChange,
  totalSteps = 0,
  currentStep = 0,
}) => {
  // State management
  const [selectedLanguage, setSelectedLanguage] = useState("Python");
  const [speed, setSpeed] = useState(1);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Refs
  const codeDisplayRef = useRef(null);
  const stepHistoryRef = useRef(null);
  const visualizationSectionRef = useRef(null);
  const codeSectionRef = useRef(null);
  const overlayRef = useRef(null);
  const contentRef = useRef(null);

  // Update progress based on current step from parent
  useEffect(() => {
    if (totalSteps > 0) {
      const newProgress = (currentStep / (totalSteps - 1)) * 100;
      setProgress(isNaN(newProgress) ? 0 : newProgress);
    }
  }, [currentStep, totalSteps]);

  // Control handlers
  const handleControlClick = (action) => {
    if (totalSteps === 0) return; // No steps available
    
    switch (action) {
      case "first": {
        if (onProgressChange) onProgressChange(0);
        setIsPlaying(false);
        break;
      }
      case "prev": {
        const prevProgress = Math.max(0, (currentStep - 1) / (totalSteps - 1) * 100);
        if (onProgressChange) onProgressChange(prevProgress);
        break;
      }
      case "start": {
        if (onProgressChange) onProgressChange(0);
        setIsPlaying(true);
        break;
      }
      case "next": {
        const nextProgress = Math.min(100, (currentStep + 1) / (totalSteps - 1) * 100);
        if (onProgressChange) onProgressChange(nextProgress);
        break;
      }
      case "last": {
        if (onProgressChange) onProgressChange(100);
        setIsPlaying(false);
        break;
      }
      case "playPause": {
        setIsPlaying(!isPlaying);
        break;
      }
    }
  };

  // Auto-play functionality
  useEffect(() => {
    let interval;
    if (isPlaying && totalSteps > 0 && currentStep < totalSteps - 1) {
      interval = setInterval(() => {
        const nextProgress = Math.min(100, (currentStep + 1) / (totalSteps - 1) * 100);
        if (onProgressChange) {
          onProgressChange(nextProgress);
        }
        if (currentStep >= totalSteps - 1) {
          setIsPlaying(false);
        }
      }, 1000 / speed);
    } else if (currentStep >= totalSteps - 1) {
      setIsPlaying(false);
    }
    
    return () => clearInterval(interval);
  }, [isPlaying, currentStep, totalSteps, speed, onProgressChange]);

  // Keyboard shortcuts handler
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.target.tagName === "INPUT") return; // Don't trigger shortcuts when typing

      switch (e.key) {
        case " ":
          e.preventDefault();
          setIsPlaying(!isPlaying);
          break;
        case "ArrowLeft":
          e.preventDefault();
          if (totalSteps > 0 && currentStep > 0) {
            const prevProgress = Math.max(0, (currentStep - 1) / (totalSteps - 1) * 100);
            if (onProgressChange) onProgressChange(prevProgress);
          }
          break;
        case "ArrowRight":
          e.preventDefault();
          if (totalSteps > 0 && currentStep < totalSteps - 1) {
            const nextProgress = Math.min(100, (currentStep + 1) / (totalSteps - 1) * 100);
            if (onProgressChange) onProgressChange(nextProgress);
          }
          break;
        case "Home":
          e.preventDefault();
          if (onProgressChange) onProgressChange(0);
          setIsPlaying(false);
          break;
        case "End":
          e.preventDefault();
          if (onProgressChange) onProgressChange(100);
          setIsPlaying(false);
          break;
        case "r":
        case "R":
          e.preventDefault();
          if (onProgressChange) onProgressChange(0);
          setIsPlaying(true);
          break;
        case "Escape":
          e.preventDefault();
          if (onClose) {
            onClose();
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isPlaying, currentStep, totalSteps, onClose, onProgressChange]);

  // Render the visualizer content using Portal
  return ReactDOM.createPortal(
    <div ref={overlayRef} className="visualizer-overlay">
      <div className="visualizer-container">
        <div className="header">
          <div content="Reset Visualization (R)">
            <button
              className="refresh-button"
              onClick={() => {
                setProgress(0);
                setIsPlaying(false);
              }}
              aria-label="Reset visualization"
            >
              <i className="fa-solid fa-rotate-right" />
            </button>
          </div>
          <div className="title-section">
            <h3>{title}</h3>
            <CustomDropdown
              options={algorithms.map((algo) => ({ name: algo.name }))}
              value={selectedAlgorithm}
              onChange={onAlgorithmChange}
            />
          </div>
          <div content="Close (Esc)">
            <button
              className="close-button"
              onClick={onClose}
              aria-label="Close visualizer"
            >
              <i className="fa-solid fa-xmark" />
            </button>
          </div>
        </div>

        <div className="content" ref={contentRef}>
          {/* Left Section - Visualization */}
          <div
            className="visualization-section left-section"
            ref={visualizationSectionRef}
            style={{ width: "40%" }}
          >
            <div className="upper-left">
              <div className="enter-array">
                <ArrayInput onSubmit={onArraySubmit} />
              </div>
              <div className="controllers">
                <Controls
                  speed={speed}
                  isPlaying={isPlaying}
                  onSpeedChange={setSpeed}
                  onControlClick={handleControlClick}
                  currentStep={currentStep}
                  totalSteps={totalSteps}
                />
              </div>
              <div className="progress-container">
                <div
                  className="progress-bar"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            <div className="lower-left display"> {renderVisualization?.()}</div>
          </div>

          {/* Right Section - Code Display */}
          <div
            className="code-section right-section"
            ref={codeSectionRef}
            style={{ width: "60%" }}
          >
            <div className="upper-right">
              <div className="code-display" ref={codeDisplayRef}>
                <div className="code-header">
                  <h5>Select language</h5>
                  <CustomDropdown
                    options={languages.map((lang) => ({ name: lang }))}
                    value={selectedLanguage}
                    onChange={setSelectedLanguage}
                    label="Select Language"
                  />
                </div>
                <div className="code-content">
                  <div className="code-container-header">
                    <div className="window-controls">
                      <div className="control-dot close" />
                      <div className="control-dot minimize" />
                      <div className="control-dot maximize" />
                    </div>
                    <div className="file-info">
                      <span className="file-icon">
                        <FontAwesomeIcon icon={faFileCode} />
                      </span>
                      <span className="file-name">{selectedAlgorithm}</span>
                      <span className="file-path">
                        .{selectedLanguage.toLowerCase()}
                      </span>
                    </div>
                  </div>
                  {renderCode?.(selectedLanguage)}
                </div>
              </div>
            </div>

            <div className="lower-right">
              <div className="step-history" ref={stepHistoryRef}>
                <div className="section-header">
                  <h5>Step History</h5>
                </div>
                <div className="history-content">{renderStepHistory?.()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body // Render to body
  );
};

export default BaseVisualizer;

// ArrayInput Component
const ArrayInput = ({ onSubmit }) => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState(true);

  const validateInput = (value) => {
    // Clear previous error
    setError("");
    setIsValid(true);

    if (!value.trim()) {
      setError("Please enter numbers");
      setIsValid(false);
      return false;
    }

    const numbers = value.split(",").map((num) => num.trim());

    // Check array length
    if (numbers.length > 15) {
      setError("Maximum 15 items allowed");
      setIsValid(false);
      return false;
    }

    // Validate each number
    const isValidArray = numbers.every((num) => {
      const parsed = parseInt(num.trim(), 10);
      return !isNaN(parsed) && isFinite(parsed) && parsed >= 0 && parsed <= 1000;
    });

    if (!isValidArray) {
      setError("Please enter valid integers between 0 and 1000");
      setIsValid(false);
      return false;
    }

    return true;
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
    validateInput(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit clicked"); // Debug log

    if (validateInput(input)) {
      const array = input.split(",").map((num) => parseInt(num.trim(), 10));
      console.log("Submitting array:", array); // Debug log
      onSubmit(array);
      setInput("");
      setError("");
      setIsValid(true);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="array-input">
      <div className="input-group">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Enter numbers (0-1000) separated by commas"
          className={`array-input-field ${!isValid ? "error" : ""}`}
        />
        <button
          type="submit"
          className="array-submit-btn"
          disabled={!isValid || !input.trim()}
        >
          Generate
        </button>
      </div>
      {error && (
        <div className={`error-message ${error ? "show" : ""}`}>{error}</div>
      )}
    </form>
  );
};
