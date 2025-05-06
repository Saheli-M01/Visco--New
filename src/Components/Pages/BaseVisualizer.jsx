import React, { useState, useRef, useEffect, useCallback } from "react";
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
        <h5>Automatic</h5>
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
            />
          </div>
          <button
            className="play-button"
            onClick={() => onControlClick("playPause")}
          >
            <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
            <span>{isPlaying ? "" : ""}</span>
          </button>
        </div>
      </div>

      <div className="manual-controls text-center">
        <h5>Manual</h5>
        <div className="control-buttons">
          <button
            className="control-button"
            onClick={() => onControlClick("first")}
            disabled={progress === 0}
          >
            <FontAwesomeIcon icon={faBackwardFast} />
            <span>First</span>
          </button>
          <button
            className="control-button"
            onClick={() => onControlClick("prev")}
            disabled={progress === 0}
          >
            <FontAwesomeIcon icon={faBackwardStep} />
            <span>Prev</span>
          </button>
          <button
            className="control-button"
            onClick={() => onControlClick("start")}
          >
            <span>Start</span>
          </button>
          <button
            className="control-button"
            onClick={() => onControlClick("next")}
            disabled={progress === 100}
          >
            <FontAwesomeIcon icon={faForwardStep} />
            <span>Next</span>
          </button>
          <button
            className="control-button"
            onClick={() => onControlClick("last")}
            disabled={progress === 100}
          >
            <FontAwesomeIcon icon={faForwardFast} />
            <span>Last</span>
          </button>
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

  return (
    <div
      ref={overlayRef}
      className={`visualizer-overlay ${
        isDragging || isDraggingHorizontal ? "dragging" : ""
      }`}
    >
      <div className="visualizer-container">
        <div className="header">
          <button
            className="refresh-button"
            onClick={() => {
              setProgress(0);
              setIsPlaying(false);
            }}
          >
            <i className="fa-solid fa-rotate-right" />
          </button>
          <div className="title-section">
            <h3>{title}-</h3>{" "}
            <CustomDropdown
              options={algorithms.map((algo) => ({ name: algo.name }))}
              value={selectedAlgorithm}
              onChange={onAlgorithmChange}
            />
          </div>

          <button className="close-button" onClick={onClose}>
            <i className="fa-solid fa-xmark" />
          </button>
        </div>

        <div className="content" ref={contentRef}>
          {/* Left Section - Visualization */}
          <div
            className="visualization-section left-section"
            ref={visualizationSectionRef}
          >
            <div className="enter-array"><ArrayInput
                onSubmit={(array) => {
                  console.log("New array:", array);
                }}
              /></div>
            <div className="handels-upper">
              
              <Controls
                progress={progress}
                speed={speed}
                isPlaying={isPlaying}
                onSpeedChange={setSpeed}
                onControlClick={handleControlClick}
              />
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
            <CustomDropdown
              options={languages.map((lang) => ({ name: lang }))}
              value={selectedLanguage}
              onChange={setSelectedLanguage}
              label="Select Language"
            />

            <div className="code-display" ref={codeDisplayRef}>
              <div className="code-content">
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
              <h5>Step History:</h5>
              <div className="history-content">{renderStepHistory?.()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BaseVisualizer;

// ArrayInput Component
const ArrayInput = ({ onSubmit }) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(true);

  const validateInput = (value) => {
    // Clear previous error
    setError('');
    setIsValid(true);

    if (!value.trim()) {
      return false;
    }

    const numbers = value.split(',').map(num => num.trim());

    // Check array length
    if (numbers.length > 10) {
      setError('Maximum 10 items allowed');
      setIsValid(false);
      return false;
    }

    // Validate each number
    const isValidArray = numbers.every(num => {
      const parsed = parseFloat(num);
      return !isNaN(parsed) && isFinite(parsed);
    });

    if (!isValidArray) {
      setError('Only numbers (integers or decimals) are allowed');
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
    
    if (validateInput(input)) {
      const array = input.split(',').map(num => parseFloat(num.trim()));
      onSubmit(array);
      setInput('');
      setError('');
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
          placeholder="Enter numbers separated by commas"
          className={`array-input-field ${!isValid ? 'error' : ''}`}
        />
        <button 
          type="submit" 
          className="array-submit-btn"
          disabled={!isValid || !input.trim()}
        >
          Generate
        </button>
      </div>
      {error && <div className={`error-message ${error ? 'show' : ''}`}>{error}</div>}
    </form>
  );
};
