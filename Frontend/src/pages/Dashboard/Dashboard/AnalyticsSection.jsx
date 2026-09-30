import React, { useState } from "react";
import { BarChart3, Activity } from "lucide-react";

const AnalyticsSkeleton = () => (
  <div className="animate-pulse space-y-4">
    <div className="flex justify-between items-center">
      <div className="h-5 bg-gray-200 rounded w-1/3"></div>
      <div className="h-8 bg-gray-200 rounded w-28"></div>
    </div>
    <div className="h-44 bg-gray-100 rounded-lg flex items-end justify-between p-4 gap-2">
      {[40, 70, 30, 85, 60, 45, 90].map((h, idx) => (
        <div
          key={idx}
          className="bg-gray-200 rounded-t w-full"
          style={{ height: `${h}%` }}
        ></div>
      ))}
    </div>
  </div>
);

const AnalyticsSection = ({ data, isPending }) => {
  const [timeframe, setTimeframe] = useState("day"); // 'day' | 'week' | 'month'

  const currentDataset = data?.[timeframe] || [];

  // Find max value to normalize bar heights
  const maxTotal = Math.max(
    ...currentDataset.map((d) => d.total || 0),
    5 // minimum baseline
  );

  const totalActions = currentDataset.reduce(
    (acc, curr) => acc + (curr.total || 0),
    0
  );

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col justify-between">
      {isPending ? (
        <AnalyticsSkeleton />
      ) : (
        <>
          {/* Header & Controls */}
          <div>
            <div className="flex flex-wrap justify-between items-center gap-2 mb-4">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-cyan-600" />
                <h3 className="font-semibold text-gray-800">
                  Activity Analytics
                </h3>
              </div>

              {/* Timeframe Selector */}
              <div className="flex items-center bg-gray-100 p-0.5 rounded-lg text-xs font-medium">
                <button
                  type="button"
                  onClick={() => setTimeframe("day")}
                  className={`px-3 py-1 rounded-md transition-all ${
                    timeframe === "day"
                      ? "bg-white text-cyan-700 shadow-xs font-semibold"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  Day
                </button>
                <button
                  type="button"
                  onClick={() => setTimeframe("week")}
                  className={`px-3 py-1 rounded-md transition-all ${
                    timeframe === "week"
                      ? "bg-white text-cyan-700 shadow-xs font-semibold"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  Week
                </button>
                <button
                  type="button"
                  onClick={() => setTimeframe("month")}
                  className={`px-3 py-1 rounded-md transition-all ${
                    timeframe === "month"
                      ? "bg-white text-cyan-700 shadow-xs font-semibold"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  Month
                </button>
              </div>
            </div>

            {/* Total count badge */}
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-2xl font-bold text-gray-800">
                {totalActions}
              </span>
              <span className="text-xs text-gray-500">
                total activities in selected {timeframe}
              </span>
            </div>

            {/* Bar Chart Visualization */}
            <div className="h-44 flex items-end justify-between gap-2 pt-6 pb-2 px-1 border-b border-gray-100">
              {currentDataset.map((item, index) => {
                const heightPercent = Math.max(
                  Math.round(((item.total || 0) / maxTotal) * 100),
                  8
                );
                return (
                  <div
                    key={index}
                    className="flex-1 flex flex-col items-center h-full justify-end group relative"
                  >
                    {/* Tooltip */}
                    <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-[11px] rounded py-1 px-2 pointer-events-none whitespace-nowrap z-10 shadow-lg">
                      <div className="font-semibold">{item.label}</div>
                      <div>
                        {item.notes || 0} notes, {item.folders || 0} folders
                      </div>
                    </div>

                    {/* Bar container */}
                    <div className="w-full max-w-[36px] bg-gray-100 hover:bg-cyan-100 rounded-t-md relative flex flex-col justify-end overflow-hidden transition-all duration-300 h-full">
                      <div
                        style={{ height: `${heightPercent}%` }}
                        className="w-full bg-gradient-to-t from-cyan-600 to-cyan-400 rounded-t-md transition-all duration-500 flex flex-col justify-end"
                      >
                        {item.total > 0 && (
                          <div className="text-[10px] font-bold text-white text-center pb-0.5">
                            {item.total}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Label below bar */}
                    <span className="text-[11px] text-gray-500 font-medium mt-2 truncate w-full text-center">
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-between text-xs text-gray-500 pt-3">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-500"></span>
                Notes & Updates
              </span>
            </div>
            <span className="text-[11px] text-gray-400">
              Updated automatically
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default AnalyticsSection;