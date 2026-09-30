import React from "react";
import useNoteElement from "./useNoteElement";
import {
  FileText,
  Trash2,
  Edit3,
  ExternalLink,
  Clock,
  Check,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const extractSnippet = (content) => {
  if (!content) return "No preview text available";
  if (typeof content === "string") return content.slice(0, 120);

  try {
    const extractText = (node) => {
      if (!node) return "";
      if (node.text) return node.text;
      if (Array.isArray(node.content)) {
        return node.content.map(extractText).join(" ");
      }
      return "";
    };
    const text = extractText(content).trim();
    return text ? text.slice(0, 140) : "No preview text available";
  } catch {
    return "No preview text available";
  }
};

const formatDate = (dateString) => {
  if (!dateString) return "Recently";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "Recently";
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year:
      date.getFullYear() !== new Date().getFullYear() ? "numeric" : undefined,
  });
};

const NoteElement = ({ note, onRename, onDelete, viewMode = "grid" }) => {
  const navigate = useNavigate();
  const {
    isEditing,
    setIsEditing,
    name,
    handleChange,
    handleKeyDown,
    saveRename,
    inputRef,
  } = useNoteElement({
    note,
    onRename,
    onDelete,
  });

  const previewSnippet = extractSnippet(note?.content);
  const formattedDate = formatDate(note?.updatedAt || note?.createdAt);

  if (viewMode === "list") {
    return (
      <div
        onClick={() => navigate(`/dashboard/note/${note._id}/edit`)}
        className="group flex items-center justify-between p-4 bg-white border border-gray-200/80 hover:border-cyan-400 hover:shadow-md rounded-xl transition-all duration-200 cursor-pointer"
      >
        <div className="flex items-center gap-4 min-w-0 flex-1">
          <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-100/70 flex items-center justify-center text-cyan-600 shrink-0 group-hover:scale-105 transition-transform">
            <FileText size={20} strokeWidth={2} />
          </div>

          <div className="min-w-0 flex-1 pr-4">
            {isEditing ? (
              <div
                className="flex items-center gap-2"
                onClick={(e) => e.stopPropagation()}
              >
                <input
                  ref={inputRef}
                  value={name}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  autoFocus
                  className="text-sm font-semibold text-gray-900 bg-white border border-cyan-400 rounded-md px-2.5 py-1 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 w-full max-w-sm"
                />
                <button
                  onClick={saveRename}
                  className="p-1 text-emerald-600 hover:bg-emerald-50 rounded"
                >
                  <Check size={16} />
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="p-1 text-gray-400 hover:bg-gray-100 rounded"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div className="flex items-baseline gap-3">
                <h4 className="text-sm font-semibold text-gray-900 truncate group-hover:text-cyan-700 transition-colors">
                  {note?.name}
                </h4>
                <span className="text-xs text-gray-400 truncate hidden sm:inline">
                  — {previewSnippet}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-gray-400">
            <Clock size={13} />
            <span>{formattedDate}</span>
          </div>

          <div
            className="flex items-center gap-1 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsEditing(true)}
              className="p-1.5 text-gray-400 hover:text-cyan-600 hover:bg-cyan-50 rounded-lg transition-colors"
              title="Rename"
            >
              <Edit3 size={15} />
            </button>
            <button
              onClick={() => navigate(`/dashboard/note/${note._id}/edit`)}
              className="p-1.5 text-gray-400 hover:text-cyan-600 hover:bg-cyan-50 rounded-lg transition-colors"
              title="Open Editor"
            >
              <ExternalLink size={15} />
            </button>
            <button
              onClick={() => onDelete({ noteId: note._id })}
              className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Delete Note"
            >
              <Trash2 size={15} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Grid View
  return (
    <div
      onClick={() => navigate(`/dashboard/note/${note._id}/edit`)}
      className="group relative flex flex-col justify-between h-[210px] bg-white border border-gray-200/80 rounded-2xl p-5 hover:border-cyan-400 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
    >
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-100/70 flex items-center justify-center text-cyan-600 group-hover:scale-105 transition-transform shadow-2xs">
            <FileText size={20} strokeWidth={2} />
          </div>

          {/* Action Toolbar */}
          <div
            className="flex items-center gap-0.5 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 backdrop-blur-xs rounded-lg p-0.5 border border-gray-100"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsEditing(true)}
              className="p-1.5 text-gray-400 hover:text-cyan-600 hover:bg-cyan-50 rounded-md transition-colors"
              title="Rename Note"
            >
              <Edit3 size={14} />
            </button>
            <button
              onClick={() => onDelete({ noteId: note._id })}
              className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
              title="Delete Note"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>

        {/* Note Title */}
        {isEditing ? (
          <div
            className="flex items-center gap-1 mt-1 mb-2"
            onClick={(e) => e.stopPropagation()}
          >
            <input
              ref={inputRef}
              value={name}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              autoFocus
              className="text-sm font-semibold text-gray-900 bg-white border border-cyan-400 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 w-full"
            />
            <button
              onClick={saveRename}
              className="p-1 text-emerald-600 hover:bg-emerald-50 rounded"
            >
              <Check size={14} />
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="p-1 text-gray-400 hover:bg-gray-100 rounded"
            >
              <X size={14} />
            </button>
          </div>
        ) : (
          <h4 className="font-semibold text-gray-800 text-[15px] truncate w-full group-hover:text-cyan-700 transition-colors">
            {note?.name}
          </h4>
        )}

        {/* Content Snippet */}
        <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed mt-2 select-none">
          {previewSnippet}
        </p>
      </div>

      {/* Footer Info */}
      <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400 mt-2">
        <span className="flex items-center gap-1">
          <Clock size={12} />
          {formattedDate}
        </span>
        <span className="text-cyan-600 font-medium group-hover:underline flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
          Open note
          <ExternalLink size={10} />
        </span>
      </div>
    </div>
  );
};

export default NoteElement;
