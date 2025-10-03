import React, { useState, useEffect } from "react";

const ArrayInputCard = ({ handleGo, selectedAlgorithm, pivotStrategy, setPivotStrategy }) => {
  const [arrayInput, setArrayInput] = useState("");
  const [showValidationPopup, setShowValidationPopup] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [currentArrayLength, setCurrentArrayLength] = useState(0);

  // Keep the validation popup visible until the user edits the input

  const validateAndParse = (input) => {
    if (!input || input.trim() === "") return { error: "Array cannot be empty" };
    const parts = input.split(",").map((s) => s.trim()).filter(Boolean);
    if (parts.length === 0) return { error: "Array cannot be empty" };
    if (parts.length > 10) return { error: "Maximum 10 numbers allowed" };
    const nums = [];
    for (let p of parts) {
      const n = Number(p);
      if (Number.isNaN(n)) return { error: `Invalid number: ${p}` };
      nums.push(n);
    }
    return { value: nums };
  };

  // Parse array in real-time to update pivot range
  const parseArrayForLength = (input) => {
    if (!input || input.trim() === "") return 0;
    const parts = input.split(",").map((s) => s.trim()).filter(Boolean);
    let validCount = 0;
    for (let p of parts) {
      const n = Number(p);
      if (!Number.isNaN(n)) validCount++;
    }
    return validCount;
  };

  // Update array length and adjust pivot strategy when input changes
  useEffect(() => {
    const length = parseArrayForLength(arrayInput);
    setCurrentArrayLength(length);
    
    // If using index-based pivot and current index is out of bounds, adjust it
    if (typeof pivotStrategy === 'number' && pivotStrategy >= length && length > 0) {
      setPivotStrategy(length - 1);
    }
  }, [arrayInput, pivotStrategy, setPivotStrategy]);

  const onGo = () => {
    const res = validateAndParse(arrayInput);
    if (res.error) {
      setValidationError(res.error);
      setShowValidationPopup(true);
      return;
    }
    // call parent with parsed array
    handleGo(res.value);
  };

  return (
    <div className="bg-white border border-gray-300 rounded-xl p-4">
      <h3 className="text-md font-semibold text-gray-900 mb-3">Array Input</h3>
      <div className="space-y-3">
        <div className="relative">
          <textarea
            value={arrayInput}
            onChange={(e) => {
              setArrayInput(e.target.value);
              // hide popup as soon as user modifies the input
              if (showValidationPopup) setShowValidationPopup(false);
            }}
            placeholder="Enter comma-separated numbers, e.g. 5, 3, 8"
            className="w-full h-20 p-3 rounded-lg backdrop-blur-sm bg-white/30 border-2 border-gray-500/50 text-gray-900 placeholder-gray-600 resize-none focus:outline-none focus:ring-2 focus:ring-gray-500/50 focus:border-gray-500/50 shadow-inner text-sm hover:border-white/60 transition-all duration-200"
          />
          <div className="mt-2 text-xs text-red-400">Maximum 10 numbers (comma-separated)</div>
          {showValidationPopup && (
            <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg shadow-lg z-50">
              <div className="flex items-start gap-2"><div className="text-red-700 text-sm">{validationError}</div></div>
            </div>
          )}
        </div>
        
        {/* Quick Sort Pivot Selection */}
        {selectedAlgorithm?.name === "Quick Sort" && (
          <div className="p-3 bg-white/10 rounded-lg border border-white/20">
            <label className="block text-xs font-medium text-gray-700 mb-2">
              Pivot Selection Strategy
            </label>
            <div className="space-y-2">
              <select
                value={typeof pivotStrategy === 'number' ? 'index' : pivotStrategy}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === 'index') {
                    setPivotStrategy(0);
                  } else {
                    setPivotStrategy(value);
                  }
                }}
                className="w-full p-2 text-xs rounded-lg bg-white/30 border border-white/40 text-gray-900 focus:ring-2 focus:ring-blue-300 focus:border-blue-400"
              >
                <option value="last">Last Element</option>
                <option value="first">First Element</option>
                <option value="middle">Middle Element</option>
                <option value="index">Choose by Index</option>
              </select>
              
              {typeof pivotStrategy === 'number' && (
                <div>
                  <input
                    type="number"
                    min="0"
                    max={Math.max(0, currentArrayLength - 1)}
                    value={pivotStrategy}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      const maxIndex = Math.max(0, currentArrayLength - 1);
                      if (!isNaN(value) && value >= 0 && value <= maxIndex) {
                        setPivotStrategy(value);
                      }
                    }}
                    disabled={currentArrayLength === 0}
                    className="w-full p-2 text-xs rounded-lg bg-white/30 border border-white/40 text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 focus:ring-blue-300 focus:border-blue-400"
                    placeholder={currentArrayLength > 0 ? `Enter pivot index (0-${currentArrayLength - 1})` : "Enter array values first"}
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    {currentArrayLength > 0 
                      ? `Valid range: 0 to ${currentArrayLength - 1} (array length: ${currentArrayLength})`
                      : "Enter array values to set pivot range"
                    }
                  </div>
                </div>
              )}
            </div>
            
            <p className="text-xs text-gray-600 mt-1">
              {pivotStrategy === 'last' && 'Uses rightmost element as pivot'}
              {pivotStrategy === 'first' && 'Uses leftmost element as pivot'}
              {pivotStrategy === 'middle' && 'Uses middle element as pivot'}
              {typeof pivotStrategy === 'number' && (
                currentArrayLength > 0 
                  ? `Uses element at index ${pivotStrategy} as pivot ${pivotStrategy >= currentArrayLength ? '(index out of bounds!)' : ''}` 
                  : 'Enter array values first to set pivot index'
              )}
            </p>
          </div>
        )}
        
        <button onClick={onGo} className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-all shadow-md text-sm font-medium border border-gray-600">Go</button>
      </div>
    </div>
  );
};

export default ArrayInputCard;
