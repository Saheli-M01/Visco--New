import React from "react";
import { FormControl, Select, MenuItem, Tabs, Tab } from "@mui/material";
import { X, RefreshCw, Eye, Info } from "lucide-react";

const VisualizerHeader = ({
  sortingAlgorithms,
  selectedAlgorithm,
  handleAlgorithmChange,
  activeTab,
  handleTabChange,
  handleRefresh,
  onClose,
}) => {
  return (
    <div className="flex items-center justify-between px-6 py-3 border-b border-white/20 backdrop-blur-md bg-white shadow-lg">
      <div className="flex items-center gap-6">
        <FormControl variant="outlined" size="small" sx={{ minWidth: 200 }}>
          <Select
            value={selectedAlgorithm?.name || ""}
            onChange={handleAlgorithmChange}
            displayEmpty
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
              border: "1px solid rgba(0, 0, 0, 0.2)",
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              "& .MuiSelect-select": {
                padding: "10px 16px",
                fontSize: "0.875em",
                fontWeight: "600",
                color: "#1f2937",
              },
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.4)",
                boxShadow: "0 6px 16px rgba(0, 0, 0, 0.2)",
              },
            }}
          >
            {sortingAlgorithms.map((algo) => (
              <MenuItem key={algo.name} value={algo.name}>
                {algo.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {/* Tabs of Visualization and Details */}
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          sx={{
            minHeight: "48px",
            "& .MuiTabs-flexContainer": { gap: "8px" },
            "& .MuiTab-root": {
              minHeight: "auto",
              padding: "10px 20px",
              fontSize: "0.875em",
              fontWeight: "600",
              color: "#6b7280",
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              border: "1px solid rgba(0, 0, 0, 0.2)",
              borderRadius: "10px",

              textTransform: "none",
              transition: "all 0.3s ease",
              "&.Mui-selected": {
                color: "#ffffff",
                backgroundColor: "#374151",
                border: "1px solid #4b5563",
              },
              "&:hover": {
                color: "#ffffff",
                backgroundColor: "#222933ff",
              },
            },
            "& .MuiTabs-indicator": { display: "none" },
          }}
        >
          <Tab
            icon={<Eye className="h-4 w-4" />}
            label="Visualization"
            iconPosition="start"
            sx={{ gap: 1 }}
          />
          <Tab
            icon={<Info className="h-4 w-4" />}
            label="Details"
            iconPosition="start"
            sx={{ gap: 1 }}
          />
        </Tabs>

        <button
          onClick={handleRefresh}
          className="p-2 rounded-md bg-red-400/20 backdrop-blur-sm bg-white/20 border border-white/30 transition-all text-red-500 hover:text-red-600"
          title="Refresh and Reset"
        >
          <RefreshCw className="h-4 w-4" />
        </button>
      </div>

      <button
        onClick={onClose}
        className="flex items-center justify-center rounded-full backdrop-blur-sm bg-red-400/20 border border-white/30  transition-all text-red-500 hover:text-red-600 h-7 w-7 "
        aria-label="Close modal"
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  );
};

export default VisualizerHeader;
