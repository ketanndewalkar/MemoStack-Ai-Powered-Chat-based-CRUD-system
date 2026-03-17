import React from "react";
import { Folder, Trash2, Loader2 } from "lucide-react";
import useFolderElement from "./useFolderElement";
import { useNavigate } from "react-router-dom";

const FolderElement = ({
  initialName = "New Folder",
  onRename,
  onDelete,
  isLoading,
  _id,
}) => {
  const {
    name,
    setName,
    isEditing,
    inputRef,
    handleSaveName,
    handleKeyDown,
    startEditing, 
  } = useFolderElement({ initialName, onRename, onDelete ,_id });
  const navigate = useNavigate();
  return (
    <div onClick={()=>navigate(`/dashboard/folders/${_id}`)} className="h-fit group relative flex flex-col items-center justify-start p-3 w-32 rounded-xl hover:bg-gray-100/80 transition-all duration-200 cursor-pointer">
      {/* Delete Action (Top Right, reveals cleanly on hover of the folder container) */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete?.({_id});
        }}
        className="absolute top-1 right-1 p-1.5 bg-white text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full opacity-0 group-hover:opacity-100 shadow-sm border border-gray-100 transition-all duration-200 z-10"
        title="Delete item"
      >
        <Trash2 size={14} />
      </button>

      {/* Folder Image/Icon Area */}
      <div className="w-16 h-16 flex items-center justify-center mb-2 relative">
        <img
          src="/folder.png"
          alt={name}
          className="w-full h-full object-cover rounded-lg drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Name Display / Editable Input */}
      <div className="w-full px-1 flex flex-col items-center justify-center min-h-[32px]">
        {isEditing ? (
          <div className="relative w-full">
            {isLoading && (
              <Loader2
                size={12}
                className="absolute left-1 top-1/2 -translate-y-1/2 animate-spin text-blue-500"
              />
            )}
            <input
              ref={inputRef}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={handleSaveName}
              onKeyDown={handleKeyDown}
              className={`w-full text-center text-sm font-medium text-gray-800 bg-white border border-blue-400 rounded shadow-sm py-0.5 outline-none selection:bg-blue-200 transition-all ${isLoading ? "pl-5 pr-1" : "px-1"}`}
              onClick={(e) => e.stopPropagation()} // Prevent triggering parent clicks when typing
            />
          </div>
        ) : (
          <div
            className="max-w-full flex items-center justify-center gap-1.5 px-1.5 py-0.5 rounded border border-transparent hover:border-gray-200 hover:bg-white hover:shadow-sm transition-all"
            onClick={startEditing}
            title="Click to rename"
          >
            {isLoading && (
              <Loader2
                size={12}
                className="animate-spin text-blue-500 shrink-0"
              />
            )}
            <span className="text-sm font-medium text-gray-700 truncate select-none">
              {name}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default FolderElement;
