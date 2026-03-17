import React from "react";
import { recentFolders } from "../../../utils/constants";

const RecentFoldersSkeleton = () => (
  <div className="space-y-3">
    {[1, 2, 3].map((i) => (
      <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg animate-pulse">
        <div className="space-y-2 w-1/2">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
        <div className="h-6 bg-gray-200 rounded w-16"></div>
      </div>
    ))}
  </div>
);

const RecentFolders = ({ data,isPending }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">

      <h3 className="font-semibold text-gray-700 mb-4">
        Recently Created Folders
      </h3>

      {isPending ? (
        <RecentFoldersSkeleton />
      ) : (
        <div className="space-y-3">
          {recentFolders.map((folder, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
            >
              <div>
                <p className="text-sm font-medium">{folder.name}</p>
                <p className="text-xs text-gray-500">{folder.date}</p>
              </div>

              <span className="text-xs bg-cyan-100 text-cyan-600 px-2 py-1 rounded">
                {folder.notes} Notes
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentFolders;