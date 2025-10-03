import React, { useEffect } from "react";

const StepHistory = ({ stepHistory, currentStepIndex, isVisualizationActive, sortingSteps, setCurrentStepIndex, setCurrentStep, setCurrentArray, setComparingIndices, setCurrentCodeLine, currentStepRef, stepHistoryRef }) => {
  
  // Auto-scroll to current step when currentStepIndex changes
  useEffect(() => {
    if (currentStepRef.current) {
      currentStepRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    }
  }, [currentStepIndex]);
  return (
    <div className="backdrop-blur-md bg-card/20 border border-border/30 rounded-xl py-2 px-4 shadow-lg">
      <h3 className="text-lg font-semibold text-foreground mb-1">Step History</h3>
      <div ref={stepHistoryRef} className="space-y-2 h-48 overflow-y-auto custom-scrollbar">
        {stepHistory.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-foreground/70 text-sm text-center">
              No steps yet.<br />Enter array elements to start.
            </p>
          </div>
        ) : (
          stepHistory.map((step, index) => (
            <div
              key={index}
              ref={currentStepIndex === step.step ? currentStepRef : null}
              className={`p-3 rounded-lg transition-all cursor-pointer shadow-md border ${
                currentStepIndex === step.step
                  ? "bg-foreground/90 text-foreground-inverse border-border/60 shadow-lg ring-2 ring-primary/50"
                  : "bg-card/30 border-border/40 hover:bg-card/40 text-foreground hover:shadow-lg"
              }`}
              onClick={() => {
                if (isVisualizationActive && sortingSteps[step.step]) {
                  setCurrentStepIndex(step.step);
                  setCurrentStep(step.step);
                  const targetStep = sortingSteps[step.step];
                  setCurrentArray([...targetStep.array]);
                  setComparingIndices(targetStep.comparing || []);
                  setCurrentCodeLine(targetStep.codeLine !== undefined ? targetStep.codeLine : -1);
                }
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold">Step {step.step + 1}</span>
                  {step.leftRange && (
                    <span className="text-xs px-2 py-1 rounded-full bg-indigo-100 text-indigo-800">L:{step.leftRange[0]}-{step.leftRange[1]}</span>
                  )}
                  {step.rightRange && (
                    <span className="text-xs px-2 py-1 rounded-full bg-pink-100 text-pink-800">R:{step.rightRange[0]}-{step.rightRange[1]}</span>
                  )}
                  {step.mergeRange && (
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800">Range:{step.mergeRange[0]}-{step.mergeRange[1]}</span>
                  )}
                </div>
                {step.phase && (
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      step.phase === "comparison"
                        ? "bg-blue-100 text-blue-800"
                        : step.phase === "write"
                        ? "bg-yellow-100 text-yellow-800"
                        : step.phase === "merge-complete"
                        ? "bg-green-100 text-green-800"
                        : step.phase === "divide"
                        ? "bg-indigo-100 text-indigo-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {step.phase}
                  </span>
                )}
                {/* Show small Temp badge if any temp exists up to this step */}
                {(() => {
                  const hasTempUpToStep = sortingSteps.slice(0, step.step + 1).some(s => s && s.temp);
                  return hasTempUpToStep ? (
                    <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 ml-2">Temp</span>
                  ) : null;
                })()}
                {/* Show small Mid badge if mid calculation exists in this step */}
                {(() => {
                  const hasMidInStep = sortingSteps[step.step] && sortingSteps[step.step].mid;
                  return hasMidInStep ? (
                    <span className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-800 ml-2">Mid</span>
                  ) : null;
                })()}
              </div>
              <div className="flex gap-1 flex-wrap mb-2">
                {step.array.map((num, i) => (
                  <span
                    key={i}
                    className={`px-2 py-1 rounded text-xs font-medium shadow-sm ${
                      currentStepIndex === step.step
                        ? "bg-foreground/70 text-foreground-inverse"
                        : "bg-card/50 text-foreground border border-border/30"
                    }`}
                  >
                    {num}
                  </span>
                ))}
              </div>
              <p className={`text-xs ${currentStepIndex === step.step ? "text-foreground/80" : "text-foreground/90"}`}>{step.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default StepHistory;
