import React from "react";
import { Folder, ArrowRight, Clock, FolderPlus } from "lucide-react";
import { Link } from "react-router-dom";

const RecentFoldersSkeleton = () => (
  <div className="space-y-3">
    {[1, 2, 3].map((i) => (
      <div
        key={i}
        className="flex justify-between items-center p-3.5 bg-gray-50 rounded-lg animate-pulse"
      >
        <div className="space-y-2 w-1/2">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
        <div className="h-6 bg-gray-200 rounded w-16"></div>
      </div>
    ))}
  </div>
);

const RecentFolders = ({ data, isPending }) => {
  const folders = Array.isArray(data) ? data : [];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Folder className="w-5 h-5 text-cyan-600" />
            <h3 className="font-semibold text-gray-800">
              Recently Updated Folders
            </h3>
          </div>
          <Link
            to="/dashboard/folders"
            className="text-xs font-medium text-cyan-600 hover:text-cyan-700 flex items-center gap-1 group"
          >
            View all
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {isPending ? (
          <RecentFoldersSkeleton />
        ) : folders.length === 0 ? (
          <div className="py-8 text-center flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-cyan-50 flex items-center justify-center text-cyan-500 mb-3">
              <FolderPlus className="w-6 h-6" />
            </div>
            <p className="text-sm font-medium text-gray-700">No folders yet</p>
            <p className="text-xs text-gray-400 mt-1 max-w-[220px]">
              Create your first folder to organize your notes and resources.
            </p>
            <Link
              to="/dashboard/folders"
              className="mt-4 text-xs bg-cyan-500 hover:bg-cyan-600 text-white font-medium px-3.5 py-1.5 rounded-lg transition-colors"
            >
              Create Folder
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {folders.slice(0, 5).map((folder, index) => (
              <Link
                key={folder._id || index}
                to={`/dashboard/folder/${folder._id}`}
                className="flex justify-between items-center p-3 bg-gray-50/80 hover:bg-cyan-50/50 rounded-lg border border-transparent hover:border-cyan-200 transition-all group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-md bg-white border border-gray-200 flex items-center justify-center text-cyan-600 shrink-0 group-hover:border-cyan-300">
                    <Folder className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <p className="text-sm font-medium text-gray-800 truncate group-hover:text-cyan-700">
                      {folder.name}
                    </p>
                    <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3" />
                      {folder.date ||
                        (folder.updatedAt
                          ? new Date(folder.updatedAt).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                              }
                            )
                          : "Recently")}
                    </p>
                  </div>
                </div>

                <span className="text-xs bg-cyan-100/70 text-cyan-700 font-medium px-2.5 py-1 rounded-full shrink-0">
                  {folder.notesCount ?? folder.notes ?? 0}{" "}
                  {(folder.notesCount ?? folder.notes ?? 0) === 1
                    ? "Note"
                    : "Notes"}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentFolders;