import React from "react";
import { Folder, FileText } from "lucide-react";

const StatsSkeleton = () => (
  <>
    {[1, 2].map((i) => (
      <div
        key={i}
        className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 animate-pulse"
      >
        <div className="flex items-center justify-between">
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="w-10 h-10 bg-gray-100 rounded-lg"></div>
        </div>
        <div className="h-8 bg-gray-200 rounded w-1/3 mt-4"></div>
      </div>
    ))}
  </>
);

const getCardIcon = (title = "") => {
  const lower = title.toLowerCase();
  if (lower.includes("folder")) return <Folder className="w-5 h-5 text-cyan-600" />;
  if (lower.includes("note")) return <FileText className="w-5 h-5 text-cyan-600" />;
  return <Folder className="w-5 h-5 text-cyan-600" />;
};

const StatsCards = ({ data, isPending }) => {
  const statsList = (
    Array.isArray(data)
      ? data.filter((item) => !item.title.toLowerCase().includes("link"))
      : [
          { title: "Total Folders", value: 0 },
          { title: "Total Notes", value: 0 },
        ]
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {isPending ? (
        <StatsSkeleton />
      ) : (
        statsList.map((item, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">{item.title}</p>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center border bg-cyan-50 border-cyan-100 text-cyan-600">
                {getCardIcon(item.title)}
              </div>
            </div>

            <div className="mt-3">
              <h2 className="text-2xl font-bold text-gray-800">
                {item.value ?? 0}
              </h2>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default StatsCards;
