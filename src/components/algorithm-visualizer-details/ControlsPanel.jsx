import React from "react";
import { Slider } from "@mui/material";
import {
  Play,
  Pause,
  RotateCcw,
  SkipBack,
  SkipForward,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const ControlsPanel = ({
  isAutomatic,
  setIsAutomatic,
  isPlaying,
  handlePlay,
  handlePause,
  handleReset,
  speed,
  setSpeed,
  isVisualizationActive,
  currentStepIndex,
  sortingSteps,
  handleFirstStep,
  handleLastStep,
  handleStepBackward,
  handleStepForward,
  isExecuting,
}) => {
  return (
    <div className="backdrop-blur-md bg-white/20 border border-white/30 rounded-xl p-4 shadow-lg">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-md font-semibold text-gray-900">Controls</h3>
      </div>

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

      {isAutomatic ? (
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

          <div className="space-y-2 px-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Speed</span>
              <span className="text-sm text-gray-600">{speed}x</span>
            </div>
            <Slider
              value={speed}
              onChange={(_, newValue) => setSpeed(newValue)}
              min={0.5}
              max={1.5}
              step={0.1}
              marks={[
                { value: 0.5, label: "0.5x" },
                { value: 1.0, label: "1x" },
                { value: 1.5, label: "1.5x" },
              ]}
              size="small"
              sx={{
                color: "#374151",
                "& .MuiSlider-thumb": {
                  backgroundColor: "#374151",
                  width: 16,
                  height: 16,
                  "&:hover": { boxShadow: "0 0 0 8px rgba(55, 65, 81, 0.16)" },
                },
                "& .MuiSlider-track": { backgroundColor: "#374151", height: 4 },
                "& .MuiSlider-rail": {
                  backgroundColor: "rgba(156, 163, 175, 0.5)",
                  height: 4,
                },
              }}
            />
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleFirstStep}
              disabled={!isVisualizationActive || currentStepIndex === 0}
              className="flex items-center justify-center gap-1 p-2 rounded-lg backdrop-blur-sm bg-white/30 border border-gray-600/40 hover:bg-white/40 transition-all text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed shadow-md text-xs font-medium"
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
              className="flex items-center justify-center gap-1 p-2 rounded-lg backdrop-blur-sm bg-white/30 border border-gray-600/40 hover:bg-white/40 transition-all text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed shadow-md text-xs font-medium"
            >
              <SkipForward className="h-3 w-3" />
              Last
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleStepBackward}
              disabled={!isVisualizationActive || currentStepIndex === 0}
              className="flex items-center justify-center gap-1 p-2 rounded-lg backdrop-blur-sm bg-white/30 border border-gray-600/40 hover:bg-white/40 transition-all text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed shadow-md text-xs font-medium"
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
              className="flex items-center justify-center gap-1 p-2 rounded-lg backdrop-blur-sm bg-white/30 border border-gray-600/40 hover:bg-white/40 transition-all text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed shadow-md text-xs font-medium"
            >
              <ChevronRight className="h-3 w-3" />
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ControlsPanel;
