import React, { useState, useRef, useEffect, useCallback } from "react";
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
  faInfoCircle,
  faKeyboard,
  faFileCode,
} from "@fortawesome/free-solid-svg-icons";



// Custom Dropdown Component
const CustomDropdown = ({ options, value, onChange, label }) => {
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
      <h5>{label}</h5>
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
  progress,
  speed,
  isPlaying,
  onSpeedChange,
  onControlClick,
}) => (
  <div className="controls">
    <div className="control-sections">
      <div className="auto-controls text-center">
        <div className="section-header">
          <h5>Automatic</h5>
          <div content="Control the visualization speed and playback">
            <FontAwesomeIcon icon={faInfoCircle} className="info-icon" />
          </div>
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
            >
              <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
            </button>
          </div>
        </div>
      </div>

      <div className="manual-controls text-center">
        <div className="section-header">
          <h5>Manual</h5>
          <div content="Step through the visualization manually">
            <FontAwesomeIcon icon={faInfoCircle} className="info-icon" />
          </div>
        </div>
        <div className="control-buttons">
          <div content="First Step (Home)">
            <button
              className="control-button"
              onClick={() => onControlClick("first")}
              disabled={progress === 0}
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
              disabled={progress === 0}
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
              disabled={progress === 100}
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
              disabled={progress === 100}
              aria-label="Go to last step"
            >
              <FontAwesomeIcon icon={faForwardFast} />
              <span>Last</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div className="progress-container">
      <div className="progress-bar" style={{ width: `${progress}%` }} />
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
  onArraySubmit
}) => {
  // State management
  const [selectedLanguage, setSelectedLanguage] = useState("Python");
  const [speed, setSpeed] = useState(1);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Resize state
  const [isDragging, setIsDragging] = useState(false);
  const [isDraggingHorizontal, setIsDraggingHorizontal] = useState(false);
  const [startY, setStartY] = useState(0);
  const [startX, setStartX] = useState(0);
  const [startHeightCode, setStartHeightCode] = useState(0);
  const [startHeightHistory, setStartHeightHistory] = useState(0);
  const [startWidthLeft, setStartWidthLeft] = useState(0);
  const [startWidthRight, setStartWidthRight] = useState(0);

  // Refs
  const codeDisplayRef = useRef(null);
  const stepHistoryRef = useRef(null);
  const visualizationSectionRef = useRef(null);
  const codeSectionRef = useRef(null);
  const overlayRef = useRef(null);
  const verticalResizeHandleRef = useRef(null);
  const contentRef = useRef(null);
  const horizontalResizeHandleRef = useRef(null);

  // Window resize handler
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Control handlers
  const handleControlClick = (action) => {
    switch (action) {
      case "first":
        setProgress(0);
        setIsPlaying(false);
        break;
      case "prev":
        setProgress((prev) => Math.max(0, prev - 10));
        break;
      case "start":
        setProgress(0);
        setIsPlaying(true);
        break;
      case "next":
        setProgress((prev) => Math.min(100, prev + 10));
        break;
      case "last":
        setProgress(100);
        setIsPlaying(false);
        break;
      case "playPause":
        setIsPlaying(!isPlaying);
        break;
    }
  };

  // Resize handlers
  const handleVerticalMouseDown = useCallback((e) => {
    e.preventDefault();
    if (codeDisplayRef.current && stepHistoryRef.current) {
      setStartY(e.clientY);
      setStartHeightCode(codeDisplayRef.current.offsetHeight);
      setStartHeightHistory(stepHistoryRef.current.offsetHeight);
      setIsDragging(true);
    }
  }, []);

  const handleHorizontalMouseDown = useCallback((e) => {
    e.preventDefault();
    if (visualizationSectionRef.current && codeSectionRef.current) {
      setStartX(e.clientX);
      setStartWidthLeft(visualizationSectionRef.current.offsetWidth);
      setStartWidthRight(codeSectionRef.current.offsetWidth);
      setIsDraggingHorizontal(true);
    }
  }, []);

  const handleMouseMove = useCallback(
    (e) => {
      if (isDragging && codeDisplayRef.current && stepHistoryRef.current) {
        const diff = e.clientY - startY;
        const newHeightCode = Math.max(100, startHeightCode + diff);
        const newHeightHistory = Math.max(100, startHeightHistory - diff);
        codeDisplayRef.current.style.height = `${newHeightCode}px`;
        stepHistoryRef.current.style.height = `${newHeightHistory}px`;
      }

      if (
        isDraggingHorizontal &&
        visualizationSectionRef.current &&
        codeSectionRef.current &&
        !isMobile
      ) {
        const diff = e.clientX - startX;
        const newWidthLeft = Math.max(300, startWidthLeft + diff);
        const newWidthRight = Math.max(300, startWidthRight - diff);
        visualizationSectionRef.current.style.width = `${newWidthLeft}px`;
        codeSectionRef.current.style.width = `${newWidthRight}px`;
      }
    },
    [
      isDragging,
      isDraggingHorizontal,
      startY,
      startX,
      startHeightCode,
      startHeightHistory,
      startWidthLeft,
      startWidthRight,
      isMobile,
    ]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setIsDraggingHorizontal(false);
  }, []);

  // Mouse move and up event listeners
  useEffect(() => {
    if (isDragging || isDraggingHorizontal) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, isDraggingHorizontal, handleMouseMove, handleMouseUp]);

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
          if (progress > 0) {
            setProgress((prev) => Math.max(0, prev - 10));
          }
          break;
        case "ArrowRight":
          e.preventDefault();
          if (progress < 100) {
            setProgress((prev) => Math.min(100, prev + 10));
          }
          break;
        case "Home":
          e.preventDefault();
          setProgress(0);
          setIsPlaying(false);
          break;
        case "End":
          e.preventDefault();
          setProgress(100);
          setIsPlaying(false);
          break;
        case "r":
        case "R":
          e.preventDefault();
          setProgress(0);
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
  }, [isPlaying, progress, onClose]);

  // Render the visualizer content using Portal
  return ReactDOM.createPortal(
    <div
      ref={overlayRef}
      className={`visualizer-overlay ${
        isDragging || isDraggingHorizontal ? "dragging" : ""
      }`}
    >
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
            <button className="close-button" onClick={onClose} aria-label="Close visualizer">
              <i className="fa-solid fa-xmark" />
            </button>
          </div>
        </div>

        <div className="content" ref={contentRef}>
          {/* Left Section - Visualization */}
          <div
            className="visualization-section left-section"
            ref={visualizationSectionRef}
          >
            <div className="upper-left">
              <div className="enter-array">
                <ArrayInput onSubmit={onArraySubmit} />
              </div>
              <div className="handels-upper">
                <Controls
                  progress={progress}
                  speed={speed}
                  isPlaying={isPlaying}
                  onSpeedChange={setSpeed}
                  onControlClick={handleControlClick}
                />
              </div>
            </div>

            <div className="visualization-area">{renderVisualization?.()}</div>
          </div>

          {/* Horizontal Resize Handle */}
          <div
            className="horizontal-resize-handle"
            ref={horizontalResizeHandleRef}
            onMouseDown={handleHorizontalMouseDown}
          >
            <div className="handle-bar" />
          </div>

          {/* Right Section - Code Display */}
          <div className="code-section right-section" ref={codeSectionRef}>
            <div className="code-display" ref={codeDisplayRef}>
              <div className="code-header">
                <CustomDropdown
                  options={languages.map((lang) => ({ name: lang }))}
                  value={selectedLanguage}
                  onChange={setSelectedLanguage}
                  label="Select Language"
                />
                <div content="Keyboard Shortcuts">
                  <button className="keyboard-shortcuts-btn" aria-label="View keyboard shortcuts">
                    <FontAwesomeIcon icon={faKeyboard} />
                  </button>
                </div>
              </div>
              <div className="code-content">
                <div className="code-container-header">
                  <div className="window-controls">
                    <div className="control-dot close" />
                    <div className="control-dot minimize" />
                    <div className="control-dot maximize" />
                  </div>
                  <div className="file-info">
                    <span className="file-icon"><FontAwesomeIcon icon={faFileCode} /></span>
                    <span className="file-name">{selectedAlgorithm}</span>
                    <span className="file-path">.{selectedLanguage.toLowerCase()}</span>
                  </div>
                </div>
                {renderCode?.(selectedLanguage)}
              </div>
            </div>

            <div
              className="resize-handle"
              ref={verticalResizeHandleRef}
              onMouseDown={handleVerticalMouseDown}
            >
              <div className="handle-bar" />
            </div>

            <div className="step-history" ref={stepHistoryRef}>
              <div className="section-header">
                <h5>Step History</h5>
                <div content="View the sequence of steps in the algorithm">
                  <FontAwesomeIcon icon={faInfoCircle} className="info-icon" />
                </div>
              </div>
              <div className="history-content">{renderStepHistory?.()}</div>
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
    if (numbers.length > 10) {
      setError("Maximum 10 items allowed");
      setIsValid(false);
      return false;
    }

    // Validate each number
    const isValidArray = numbers.every((num) => {
      const parsed = parseFloat(num);
      return !isNaN(parsed) && isFinite(parsed) && parsed > 0 && parsed <= 100;
    });

    if (!isValidArray) {
      setError("Please enter valid numbers between 1 and 100");
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
      const array = input.split(",").map((num) => parseFloat(num.trim()));
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
          placeholder="Enter numbers (1-100) separated by commas"
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
