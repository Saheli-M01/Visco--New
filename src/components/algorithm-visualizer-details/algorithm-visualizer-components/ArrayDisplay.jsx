import React from "react";

const ArrayDisplay = ({
  currentArray = [],
  comparingIndices = [],
  sortingSteps = [],
  currentStepIndex = 0,
  currentCodeLine = -1,
  selectedLanguage = "javascript" || "c",
  tempLineIndex = -1,
  languageHasTemp = false,
}) => {
  const currentStep = sortingSteps[currentStepIndex] || {};
  const currentMergeRange = currentStep.mergeRange || null;
  const currentLeftRange = currentStep.leftRange || null;
  const currentRightRange = currentStep.rightRange || null;

  // Quick Sort specific ranges and pivot
  const currentPartitionRange = currentStep.partitionRange || null;
  const currentPivotIndex =
    currentStep.pivotIndex !== undefined ? currentStep.pivotIndex : null;
  const currentPivotStrategy = currentStep.pivotStrategy || null;

  // Use structured temp field when available (preferred)
  let tempObj = currentStep && currentStep.temp ? currentStep.temp : null; // { value, index }

  // If the current step lacks a temp, try to find the most recent temp from
  // earlier steps so the UI persists the temp once it's created (defensive).
  if (!tempObj && sortingSteps && sortingSteps.length > 0) {
    for (let s = currentStepIndex - 1; s >= 0; s--) {
      if (sortingSteps[s] && sortingSteps[s].temp) {
        tempObj = sortingSteps[s].temp;
        break;
      }
    }
  }

  // Get mid variable information
  let midObj = currentStep && currentStep.mid ? currentStep.mid : null; // { value, leftIndex, rightIndex }

  // If the current step lacks a mid, try to find the most recent mid from
  // earlier steps so the UI persists the mid once it's calculated.
  if (!midObj && sortingSteps && sortingSteps.length > 0) {
    for (let s = currentStepIndex - 1; s >= 0; s--) {
      if (sortingSteps[s] && sortingSteps[s].mid) {
        midObj = sortingSteps[s].mid;
        break;
      }
    }
  }

  // Only show temp UI when the language actually uses a temp variable (C/Java)
  // and a temp object exists (either on this step or persisted from prior steps).
  const languageUsesTemp =
    selectedLanguage === "c" || selectedLanguage === "java";
  const showTempUI = languageUsesTemp && !!tempObj;
  const tempValue = showTempUI ? tempObj.value : null;
  const tempIndex = showTempUI ? tempObj.index : -1;

  // Show mid UI when mid calculation is relevant (merge sort algorithm)
  const showMidUI = !!midObj;
  const midValue = showMidUI ? midObj.value : null;
  const midLeftIndex = showMidUI ? midObj.leftIndex : -1;
  const midRightIndex = showMidUI ? midObj.rightIndex : -1;

  return (
    <div className="space-y-4 bg-gray-900 rounded-lg">
      <div className="bg-code-bg rounded-lg p-8 min-h-[290px] flex items-center justify-center">
        <div className="flex flex-col items-center w-full">
          {/* Variables section - show temp and mid when appropriate */}
          {(showTempUI || showMidUI) && (
            <div className="mb-4 flex items-center justify-center w-full gap-4">
              {/* Temp slot - only rendered for languages that use a temp (C/Java) and when appropriate */}
              {showTempUI && (
                <div
                  className={`h-12 w-28 rounded-lg flex items-center justify-center font-medium bg-yellow-300 text-gray-900 shadow-md`}
                >
                  <div className="text-center">
                    <div className="text-xs text-gray-700">Temp</div>
                    <div className="text-lg font-bold">
                      {tempValue != null ? tempValue : "-"}
                    </div>
                  </div>
                </div>
              )}

              {/* Mid slot - shown during merge sort operations */}
              {showMidUI && (
                <div
                  className={`h-12 w-32 rounded-lg flex items-center justify-center font-medium bg-purple-300 text-gray-900 shadow-md`}
                >
                  <div className="text-center">
                    <div className="text-xs text-gray-700">
                      Mid = ({midLeftIndex} + {midRightIndex}) / 2
                    </div>
                    <div className="text-lg font-bold">
                      {midValue != null ? midValue : "-"}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="flex justify-center gap-4 flex-wrap">
            {currentArray.map((value, index) => {
              const isComparing = comparingIndices.includes(index);
              const isSwapped =
                sortingSteps[currentStepIndex]?.swapped?.includes(index);
              const inMergeRange =
                currentMergeRange &&
                index >= currentMergeRange[0] &&
                index <= currentMergeRange[1];
              const inLeftRange =
                currentLeftRange &&
                index >= currentLeftRange[0] &&
                index <= currentLeftRange[1];
              const inRightRange =
                currentRightRange &&
                index >= currentRightRange[0] &&
                index <= currentRightRange[1];

              // Quick Sort specific highlighting
              const inPartitionRange =
                currentPartitionRange &&
                index >= currentPartitionRange[0] &&
                index <= currentPartitionRange[1];
              const isPivot =
                currentPivotIndex !== null && index === currentPivotIndex;

              // highlight if this index matches the temp index and the temp UI is being shown
              const highlightForTemp = showTempUI && index === tempIndex;
              // highlight if this index matches the mid position
              const highlightForMid = showMidUI && index === midValue;

              const baseClass = isComparing
                ? "bg-blue-500 text-white border-blue-400 scale-110 animate-pulse"
                : isSwapped
                ? "bg-green-500 text-white border-green-400 scale-105"
                : isPivot
                ? "bg-red-500 text-white border-red-400 scale-110 animate-bounce"
                : highlightForMid
                ? "bg-purple-500 text-white border-purple-400 scale-105"
                : inLeftRange
                ? "bg-indigo-600 text-white border-indigo-400"
                : inRightRange
                ? "bg-pink-600 text-white border-pink-400"
                : inMergeRange
                ? "bg-gray-600 text-white border-gray-400"
                : inPartitionRange
                ? "bg-orange-500 text-white border-orange-400"
                : "bg-gray-700 text-white border-gray-600";

              const tempHighlightClass = highlightForTemp
                ? "ring-4 ring-yellow-300"
                : "";
              const midHighlightClass = highlightForMid
                ? "ring-4 ring-purple-300"
                : "";

              return (
                <div
                  key={`${index}-${value}`}
                  className="flex flex-col items-center"
                >
                  {isComparing && (
                    <div className="mb-2">
                      <div className="bg-blue-400 text-white text-xs px-3 py-1 rounded-full font-semibold">
                        Comparing
                      </div>
                    </div>
                  )}
                  {isPivot && (
                    <div className="mb-2">
                      <div className="bg-red-400 text-white text-xs px-3 py-1 rounded-full font-semibold">
                        Pivot
                      </div>
                    </div>
                  )}
                  {highlightForMid && (
                    <div className="mb-2">
                      <div className="bg-purple-400 text-white text-xs px-3 py-1 rounded-full font-semibold">
                        Mid
                      </div>
                    </div>
                  )}

                  <div
                    className={`flex items-center justify-center h-16 px-4 rounded-lg font-bold text-lg transition-all duration-500 ease-in-out transform shadow-lg border-2 min-w-[60px] ${baseClass} ${tempHighlightClass} ${midHighlightClass}`}
                  >
                    <span className="drop-shadow-lg">{value}</span>
                  </div>

                  <div className="mt-2">
                    <span className="text-gray-400 text-sm font-mono">
                      {index}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {sortingSteps[currentStepIndex]?.swapped?.length > 0 && (
            <div className="mt-6">
              <div className="bg-green-500 text-white text-sm px-4 py-2 rounded-full font-semibold">
                Elements Swapped!
              </div>
            </div>
          )}
          {/* Legend for ranges, mid, and pivot */}
          {(currentMergeRange ||
            currentLeftRange ||
            currentRightRange ||
            currentPartitionRange ||
            currentPivotIndex !== null ||
            showMidUI) && (
            <div className="mt-6 flex gap-2 items-center flex-wrap justify-center">
              {currentLeftRange && (
                <div className="text-xs px-2 py-1 rounded-full bg-indigo-100 text-indigo-800">
                  Left: {currentLeftRange[0]}-{currentLeftRange[1]}
                </div>
              )}
              {currentRightRange && (
                <div className="text-xs px-2 py-1 rounded-full bg-pink-100 text-pink-800">
                  Right: {currentRightRange[0]}-{currentRightRange[1]}
                </div>
              )}
              {currentPartitionRange && (
                <div className="text-xs px-2 py-1 rounded-full bg-orange-100 text-orange-800">
                  Partition: {currentPartitionRange[0]}-
                  {currentPartitionRange[1]}
                </div>
              )}
              {currentPivotIndex !== null && (
                <div className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-800">
                  Pivot: {currentPivotIndex}{" "}
                  {currentPivotStrategy &&
                    `(${
                      typeof currentPivotStrategy === "number"
                        ? `index ${currentPivotStrategy}`
                        : currentPivotStrategy
                    })`}
                </div>
              )}
              {showMidUI && (
                <div className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-800">
                  Mid: {midValue}
                </div>
              )}
              {currentMergeRange && (
                <div className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800">
                  Merging: {currentMergeRange[0]}-{currentMergeRange[1]}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArrayDisplay;
