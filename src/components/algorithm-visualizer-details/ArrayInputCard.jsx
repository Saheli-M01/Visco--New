import React from "react";

const ArrayInputCard = ({ arrayInput, handleArrayInputChange, showValidationPopup, validationError, handleGo }) => {
  return (
    <div className="backdrop-blur-md bg-white/20 border border-white/30 rounded-xl p-4 shadow-lg">
      <h3 className="text-md font-semibold text-gray-900 mb-3">Array Input</h3>
      <div className="space-y-3">
        <div className="relative">
          <textarea
            value={arrayInput}
            onChange={handleArrayInputChange}
            placeholder="Enter comma-separated numbers, e.g. 5, 3, 8"
            className="w-full h-20 p-3 rounded-lg backdrop-blur-sm bg-white/30 border-2 border-gray-500/50 text-gray-900 placeholder-gray-600 resize-none focus:outline-none focus:ring-2 focus:ring-gray-500/50 focus:border-gray-500/50 shadow-inner text-sm hover:border-white/60 transition-all duration-200"
          />
          <div className="mt-2 text-xs text-gray-500">Maximum 10 numbers (comma-separated)</div>
          {showValidationPopup && (
            <div className="absolute top-full left-0 right-0 mt-2 p-3 bg-red-50 border border-red-200 rounded-lg shadow-lg z-50">
              <div className="flex items-start gap-2"><div className="text-red-700 text-sm">{validationError}</div></div>
            </div>
          )}
        </div>
        <button onClick={handleGo} className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-all shadow-md text-sm font-medium border border-gray-600">Go</button>
      </div>
    </div>
  );
};

export default ArrayInputCard;
