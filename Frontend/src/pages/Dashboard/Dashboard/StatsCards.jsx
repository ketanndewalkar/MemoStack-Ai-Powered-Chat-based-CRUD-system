import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getStats } from "./Handler/FetchDashboardHandler.jsx";

const StatsSkeleton = () => (
  <>
    {[1, 2, 3].map((i) => (
      <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
        <div className="h-8 bg-gray-200 rounded w-1/3 mt-3"></div>
      </div>
    ))}
  </>
);

const StatsCards = ({ data, isPending }) => {
  return (
    <div className="grid grid-cols-3 gap-6 max-md:grid-cols-1">
      {isPending ? (
        <StatsSkeleton />
      ) : (
        <>
          {data?.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
            >
              <p className="text-sm text-gray-500">{item.title}</p>

              <div className="flex items-center justify-between mt-3">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {item.value}
                </h2>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default StatsCards;
