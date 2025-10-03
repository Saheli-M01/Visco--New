import React, { useEffect, useRef } from "react";
import { FormControl, Select, MenuItem } from "@mui/material";

const CodePreview = ({
  selectedLanguage,
  requestLanguageChange,
  getCodeLines,
  selectedAlgorithm,
  currentCodeLine,
}) => {
  const highlightedLineRef = useRef(null);
  const codeContainerRef = useRef(null);

  // Auto-scroll to highlighted line when currentCodeLine changes
  useEffect(() => {
    if (
      highlightedLineRef.current &&
      codeContainerRef.current &&
      currentCodeLine !== -1
    ) {
      const container = codeContainerRef.current;
      const highlighted = highlightedLineRef.current;

      // Calculate the position to scroll to (center the highlighted line)
      const containerHeight = container.clientHeight;
      const highlightedTop = highlighted.offsetTop;
      const highlightedHeight = highlighted.clientHeight;

      const scrollTop =
        highlightedTop - containerHeight / 2 + highlightedHeight / 2;

      container.scrollTo({
        top: Math.max(0, scrollTop),
        behavior: "smooth",
      });
    }
  }, [currentCodeLine]);

  const languages = [
    { value: "c", label: "C" },
    { value: "cpp", label: "C++" },
    { value: "java", label: "Java" },
    { value: "javascript", label: "JavaScript" },
    { value: "python", label: "Python" },
  ];

  return (
    <div className="border border-gray-300 bg-white  rounded-xl py-2 px-4 shadow-lg">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-lg font-semibold text-gray-900">Code Preview</h3>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <Select
            value={selectedLanguage}
            onChange={(e) => requestLanguageChange(e.target.value)}
            sx={{
              height: "30px",
              backgroundColor: "rgba(255, 255, 255, 0.4)",
              borderRadius: "8px",
              border: "1px solid rgba(56, 56, 56, 0.4)",
              "& .MuiOutlinedInput-notchedOutline": { border: "none" },
              "& .MuiSelect-select": {
                padding: "6px 12px",
                fontSize: "0.75em",
                fontWeight: "500",
              },
            }}
          >
            {languages.map((lang) => (
              <MenuItem key={lang.value} value={lang.value}>
                {lang.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <pre
        ref={codeContainerRef}
        className="bg-gray-900 text-green-400 p-3 rounded-lg text-[0.9rem] overflow-x-auto custom-scrollbar h-48 shadow-inner border border-gray-700"
      >
        <code>
          {getCodeLines(selectedLanguage, selectedAlgorithm?.name).map(
            (line, index) => (
              <div
                key={index}
                ref={currentCodeLine === index ? highlightedLineRef : null}
                className={`${
                  currentCodeLine === index
                    ? "bg-indigo-300/70 text-yellow-100 border-l-4 border-indigo-600 pl-2"
                    : ""
                } ${
                  currentCodeLine !== -1 && currentCodeLine !== index
                    ? "text-gray-500"
                    : "text-gray-100"
                }`}
              >
                {line}
              </div>
            )
          )}
        </code>
      </pre>
    </div>
  );
};

export default CodePreview;
