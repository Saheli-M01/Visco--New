import React, { useState, useEffect } from "react";

const ArrayInputCard = ({ handleGo }) => {
  const [arrayInput, setArrayInput] = useState("");
  const [showValidationPopup, setShowValidationPopup] = useState(false);
  const [validationError, setValidationError] = useState("");

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
    <div className="backdrop-blur-md bg-white/20 border border-white/30 rounded-xl p-4 shadow-lg">
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
        <button onClick={onGo} className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-all shadow-md text-sm font-medium border border-gray-600">Go</button>
      </div>
    </div>
  );
};

export default ArrayInputCard;
