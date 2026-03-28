import React from "react";
import useNoteElement from "./useNoteElement";
import { Trash, FileText, MoreVertical, Edit2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NoteElement = ({ note, onRename, onDelete }) => {
  const navigate = useNavigate();
  const { isEditing, setIsEditing, name, setName, handleChange, inputRef } =
    useNoteElement({
      note,
      onRename,
      onDelete,
    });
  return (
    <div
      onClick={() => navigate(`/dashboard/note/${note._id}/edit`)}
      className="group relative flex flex-col h-fit justify-between w-full bg-white border border-gray-200/75 rounded-xl p-5 hover:border-cyan-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
    >
      <div className="flex items-start justify-between">
        <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:bg-cyan-50 group-hover:border-cyan-100 transition-colors duration-300 text-slate-400 group-hover:text-cyan-600">
          <FileText
            strokeWidth={1.5}
            size={22}
            className="group-hover:scale-110 transition-transform duration-300"
          />
        </div>

        {/* Action Menu area - visible on hover */}
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 translate-x-2 group-hover:translate-x-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(true);
            }}
            className="p-1.5 text-slate-400 hover:text-cyan-600 hover:bg-cyan-50 rounded-md transition-colors"
            title="Rename Note"
          >
            <Edit2 size={14} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete({ noteId: note._id });
            }}
            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
            title="Delete Note"
          >
            <Trash size={14} />
          </button>
        </div>
      </div>

      <div className="mt-4 pt-4">
        {!isEditing ? (
          <h3 className="font-medium text-slate-700 text-[15px] truncate w-full group-hover:text-cyan-700 transition-colors">
            {note?.name}
          </h3>
        ) : (
          <input
            onClick={(e) => {
              e.stopPropagation();
            }}
            ref={inputRef}
            onBlur={() => setIsEditing(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter") setIsEditing(false);
            }}
            autoFocus
            className="font-medium text-slate-800 text-[15px] w-full bg-white border border-cyan-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 shadow-sm"
            onChange={handleChange}
            value={name}
          />
        )}
      </div>
    </div>
  );
};

export default NoteElement;
