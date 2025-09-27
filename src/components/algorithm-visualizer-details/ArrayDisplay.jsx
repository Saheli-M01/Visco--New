import React from "react";

const ArrayDisplay = ({ currentArray = [], comparingIndices = [], sortingSteps = [], currentStepIndex = 0, currentCodeLine = -1, selectedLanguage = 'javascript' || 'c', tempLineIndex = -1, languageHasTemp = false }) => {
  const currentStep = sortingSteps[currentStepIndex] || {};
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

  // Only show temp UI when the language actually uses a temp variable (C/Java)
  // and a temp object exists (either on this step or persisted from prior steps).
  const languageUsesTemp = selectedLanguage === 'c' || selectedLanguage === 'java';
  const showTempUI = languageUsesTemp && !!tempObj;
  const tempValue = showTempUI ? tempObj.value : null;
  const tempIndex = showTempUI ? tempObj.index : -1;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">Array Visualization</h3>
        <div className="text-sm text-gray-600">Step {currentStepIndex + 1} of {sortingSteps.length}</div>
      </div>

      <div className="bg-gray-900 rounded-lg p-8 min-h-[250px] flex items-center justify-center">
        <div className="flex flex-col items-center w-full">
          {/* Temp slot - only rendered for languages that use a temp (C/Java) and when appropriate */}
          {showTempUI && (
            <div className="mb-4 flex items-center justify-center w-full">
              <div className={`h-12 w-28 rounded-lg flex items-center justify-center font-medium bg-yellow-300 text-gray-900 shadow-md`}>
                <div className="text-center">
                  <div className="text-xs text-gray-700">Temp</div>
                  <div className="text-lg font-bold">{tempValue != null ? tempValue : '-'}</div>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-center gap-4 flex-wrap">
            {currentArray.map((value, index) => {
              const isComparing = comparingIndices.includes(index);
              const isSwapped = sortingSteps[currentStepIndex]?.swapped?.includes(index);
              // highlight if this index matches the temp index and the temp UI is being shown
              const highlightForTemp = showTempUI && index === tempIndex;

              const baseClass = isComparing
                ? 'bg-blue-500 text-white border-blue-400 scale-110 animate-pulse'
                : isSwapped
                ? 'bg-green-500 text-white border-green-400 scale-105'
                : 'bg-gray-700 text-white border-gray-600';

              const tempHighlightClass = highlightForTemp ? 'ring-4 ring-yellow-300' : '';

              return (
                <div key={`${index}-${value}`} className="flex flex-col items-center">
                  {isComparing && (
                    <div className="mb-2"><div className="bg-blue-400 text-white text-xs px-3 py-1 rounded-full font-semibold">Comparing</div></div>
                  )}

                  <div className={`flex items-center justify-center h-16 px-4 rounded-lg font-bold text-lg transition-all duration-500 ease-in-out transform shadow-lg border-2 min-w-[60px] ${baseClass} ${tempHighlightClass}`}>
                    <span className="drop-shadow-lg">{value}</span>
                  </div>

                  <div className="mt-2"><span className="text-gray-400 text-sm font-mono">{index}</span></div>
                </div>
              );
            })}
          </div>

          {sortingSteps[currentStepIndex]?.swapped?.length > 0 && (
            <div className="mt-6"><div className="bg-green-500 text-white text-sm px-4 py-2 rounded-full font-semibold">Elements Swapped!</div></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArrayDisplay;
