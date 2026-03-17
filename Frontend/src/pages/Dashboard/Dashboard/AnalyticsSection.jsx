import React from "react";

const AnalyticsSection = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">

      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-700">
          Activity Analytics
        </h3>

        <select className="text-sm border rounded px-2 py-1">
          <option>Last 30 days</option>
        </select>
      </div>

      <div className="h-52 flex items-center justify-center text-gray-400">
        Chart Area
      </div>
    </div>
  );
};

export default AnalyticsSection;