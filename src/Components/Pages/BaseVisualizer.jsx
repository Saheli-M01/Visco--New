import React, { useState, useRef, useEffect, useCallback } from 'react';
import "../../Styles/PageStyle/_baseVisualizerStyle.scss";

const BaseVisualizer = ({ 
    title,
    onClose,
    renderControls,
    renderVisualization,
    renderCode,
    renderStepHistory,
    algorithms = [],
    selectedAlgorithm,
    onAlgorithmChange,
    languages = ['Python', 'C++', 'Java', 'JavaScript', 'C']
  }) => {
    const [selectedLanguage, setSelectedLanguage] = useState('Python');
    const [speed, setSpeed] = useState(1);
    const [progress, setProgress] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [isDraggingHorizontal, setIsDraggingHorizontal] = useState(false);
    const [startY, setStartY] = useState(0);
    const [startX, setStartX] = useState(0);
    const [startHeightCode, setStartHeightCode] = useState(0);
    const [startHeightHistory, setStartHeightHistory] = useState(0);
    const [startWidthLeft, setStartWidthLeft] = useState(0);
    const [startWidthRight, setStartWidthRight] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const codeDisplayRef = useRef(null);
    const stepHistoryRef = useRef(null);
    const visualizationSectionRef = useRef(null);
    const codeSectionRef = useRef(null);
    const overlayRef = useRef(null);
    const verticalResizeHandleRef = useRef(null);
    const contentRef = useRef(null);
    const horizontalResizeHandleRef = useRef(null);
  
    // Handle window resize
    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
      };
  
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
    const handleRefresh = () => {
      setProgress(0);
      setIsPlaying(false);
      // Additional refresh logic can be passed through props if needed
    };
  
    const togglePlayPause = () => {
      setIsPlaying(!isPlaying);
    };
  
    const handleFirst = () => {
      setProgress(0);
      setIsPlaying(false);
    };
  
    const handlePrev = () => {
      setProgress(prev => Math.max(0, prev - 10));
    };
  
    const handleStart = () => {
      setProgress(0);
      setIsPlaying(true);
    };
  
    const handleNext = () => {
      setProgress(prev => Math.min(100, prev + 10));
    };
  
    const handleLast = () => {
      setProgress(100);
      setIsPlaying(false);
    };
  
    const handleVerticalMouseDown = (e) => {
      e.preventDefault();
      if (codeDisplayRef.current && stepHistoryRef.current) {
        setStartY(e.clientY);
        setStartHeightCode(codeDisplayRef.current.offsetHeight);
        setStartHeightHistory(stepHistoryRef.current.offsetHeight);
        setIsDragging(true);
      }
    };
  
    const handleHorizontalMouseDown = (e) => {
      e.preventDefault();
      if (visualizationSectionRef.current && codeSectionRef.current) {
        setStartX(e.clientX);
        setStartWidthLeft(visualizationSectionRef.current.offsetWidth);
        setStartWidthRight(codeSectionRef.current.offsetWidth);
        setIsDraggingHorizontal(true);
      }
    };
  
    const handleMouseMove = useCallback((e) => {
      if (isDragging && codeDisplayRef.current && stepHistoryRef.current) {
        const diff = e.clientY - startY;
        const newHeightCode = Math.max(100, startHeightCode + diff);
        const newHeightHistory = Math.max(100, startHeightHistory - diff);
        codeDisplayRef.current.style.height = `${newHeightCode}px`;
        stepHistoryRef.current.style.height = `${newHeightHistory}px`;
      }
  
      if (isDraggingHorizontal && visualizationSectionRef.current && codeSectionRef.current && !isMobile) {
        const diff = e.clientX - startX;
        const newWidthLeft = Math.max(300, startWidthLeft + diff);
        const newWidthRight = Math.max(300, startWidthRight - diff);
        visualizationSectionRef.current.style.width = `${newWidthLeft}px`;
        codeSectionRef.current.style.width = `${newWidthRight}px`;
      }
    }, [isDragging, isDraggingHorizontal, startY, startX, startHeightCode, startHeightHistory, startWidthLeft, startWidthRight, isMobile]);
  
    const handleMouseUp = () => {
      setIsDragging(false);
      setIsDraggingHorizontal(false);
    };
  
    // Add global event listeners for mouse move and mouse up
    useEffect(() => {
      const handleGlobalMouseMove = (e) => {
        if (isDragging || isDraggingHorizontal) {
          handleMouseMove(e);
        }
      };
  
      const handleGlobalMouseUp = () => {
        handleMouseUp();
      };
  
      // Add event listeners to document
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
  
      // Cleanup
      return () => {
        document.removeEventListener('mousemove', handleGlobalMouseMove);
        document.removeEventListener('mouseup', handleGlobalMouseUp);
      };
    }, [isDragging, isDraggingHorizontal, handleMouseMove]);
  
    return (
      <div 
        ref={overlayRef}
        className={`visualizer-overlay ${isDragging || isDraggingHorizontal ? 'dragging' : ''}`}
      >
        <div className="visualizer-container">
          <div className="header">
            <button className="refresh-button" onClick={handleRefresh}>
              <i className="fa-solid fa-rotate-right"></i>
            </button>
            <div className="title-section">
              <h3>{title}</h3>
              
            </div>
            <button className="close-button" onClick={onClose}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
  
          <div className="content" ref={contentRef}>
            {/* Left Section - Visualization */}
            <div className="visualization-section left-section" ref={visualizationSectionRef}>
            <h5 className="select-algorithm">Select Algorithm</h5>
            <select
                value={selectedAlgorithm}
                onChange={(e) => onAlgorithmChange(e.target.value)}
                className="algorithm-select"
              >
                {algorithms.map((algo) => (
                  <option key={algo.name} value={algo.name}>
                    {algo.name}
                  </option>
                ))}
              </select>
              <div className="controls">
                {renderControls?.({
                  speed,
                  setSpeed,
                  progress,
                  isPlaying,
                  handleFirst,
                  handlePrev,
                  handleStart,
                  handleNext,
                  handleLast,
                  togglePlayPause
                })}
              </div>
  
              <div className="visualization-area">
                {renderVisualization?.()}
              </div>
            </div>
  
            {/* Horizontal Resize Handle */}
            <div 
              className="horizontal-resize-handle"
              ref={horizontalResizeHandleRef}
              onMouseDown={handleHorizontalMouseDown}
            >
              <div className="handle-bar"></div>
            </div>
  
            {/* Right Section - Code Display */}
            <div className="code-section right-section" ref={codeSectionRef}>
              <h5>Code Display</h5>
              <div className="language-selector">
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="select-dropdown"
                >
                  {languages.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
  
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
                <div className="handle-bar"></div>
              </div>
  
              <div className="step-history" ref={stepHistoryRef}>
                <h5>Step History:</h5>
                <div className="history-content">
                  {renderStepHistory?.()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default BaseVisualizer;