import React, { useState } from "react";
import {
  Plus,
  Search,
  LayoutGrid,
  List,
  ArrowLeft,
  FileText,
  FolderOpen,
  ArrowUpDown,
  X,
  Sparkles,
} from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchNotes,
  createNote,
  updateNoteAPI,
  deleteNoteAPI,
  fetchFolderDetails,
} from "./NoteHandler";
import { useNavigate, useParams, Link } from "react-router-dom";
import NoteElement from "../../../../components/ui/NoteElement/NoteElement";
import { Toaster } from "../../../../utils/Toaster";
import { errorHandler } from "../../../../utils/errorHandler";

const NotesSkeleton = ({ viewMode }) => (
  <div
    className={
      viewMode === "grid"
        ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
        : "space-y-3"
    }
  >
    {[1, 2, 3, 4, 5, 6].map((i) =>
      viewMode === "grid" ? (
        <div
          key={i}
          className="h-[210px] bg-gray-50 border border-gray-100 rounded-2xl p-5 animate-pulse flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 bg-gray-200 rounded-xl mb-3"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-full mb-1"></div>
            <div className="h-3 bg-gray-200 rounded w-2/3"></div>
          </div>
          <div className="h-3 bg-gray-200 rounded w-1/3 pt-3"></div>
        </div>
      ) : (
        <div
          key={i}
          className="h-16 bg-gray-50 border border-gray-100 rounded-xl p-4 animate-pulse flex items-center justify-between"
        >
          <div className="flex items-center gap-3 w-1/2">
            <div className="w-9 h-9 bg-gray-200 rounded-lg"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
          <div className="h-4 bg-gray-200 rounded w-20"></div>
        </div>
      )
    )}
  </div>
);

const NotePage = () => {
  const navigate = useNavigate();
  const { folderId } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest"); // 'newest' | 'oldest' | 'alpha-asc' | 'alpha-desc'
  const [viewMode, setViewMode] = useState("grid"); // 'grid' | 'list'
  const [isNewNoteModalOpen, setIsNewNoteModalOpen] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState("");

  const queryClient = useQueryClient();

  // Fetch folder info
  const { data: folderInfo } = useQuery({
    queryKey: ["folder-details", folderId],
    queryFn: () => fetchFolderDetails(folderId),
    enabled: !!folderId,
  });

  // Fetch notes in folder
  const { data: notes, isPending } = useQuery({
    queryKey: ["notes", folderId],
    queryFn: () => fetchNotes(folderId),
  });

  // Filter and sort notes
  const processedNotes = React.useMemo(() => {
    if (!notes) return [];
    let list = notes.filter((n) =>
      n.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    switch (sortBy) {
      case "newest":
        list.sort(
          (a, b) =>
            new Date(b.updatedAt || b.createdAt || 0) -
            new Date(a.updatedAt || a.createdAt || 0)
        );
        break;
      case "oldest":
        list.sort(
          (a, b) =>
            new Date(a.updatedAt || a.createdAt || 0) -
            new Date(b.updatedAt || b.createdAt || 0)
        );
        break;
      case "alpha-asc":
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "alpha-desc":
        list.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }
    return list;
  }, [notes, searchQuery, sortBy]);

  // Create Note Mutation
  const { mutate: makeNote, isPending: isCreating } = useMutation({
    mutationFn: ({ name }) => createNote(folderId, name),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["notes", folderId] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      const createdNote = res.data?.data;
      Toaster({
        title: res.data?.message || "Note created successfully",
        status: "success",
      });
      setIsNewNoteModalOpen(false);
      setNewNoteTitle("");
      if (createdNote?._id) {
        navigate(`/dashboard/note/${createdNote._id}/edit`);
      }
    },
    onError: (err) => {
      errorHandler(err);
    },
  });

  // Update Note Mutation
  const { mutate: updateNote } = useMutation({
    mutationFn: ({ noteId, name }) => updateNoteAPI(noteId, name),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["notes", folderId] });
      Toaster({
        title: res.data?.message || "Note updated",
        status: "success",
      });
    },
    onError: (err) => {
      errorHandler(err);
    },
  });

  // Delete Note Mutation
  const { mutate: deleteNote } = useMutation({
    mutationFn: ({ noteId }) => deleteNoteAPI(noteId),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["notes", folderId] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      Toaster({
        title: res.data?.message || "Note deleted successfully",
        status: "success",
      });
    },
    onError: (err) => {
      errorHandler(err);
    },
  });

  const handleCreateNoteSubmit = (e) => {
    e.preventDefault();
    const title = newNoteTitle.trim() || "Untitled Note";
    makeNote({ name: title });
  };

  return (
    <div className="min-h-screen pb-12">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Breadcrumb / Back Link */}
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Link
            to="/dashboard/folders"
            className="flex items-center gap-1.5 hover:text-cyan-600 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>Folders</span>
          </Link>
          <span>/</span>
          <span className="font-medium text-gray-900 truncate">
            {folderInfo?.name || "Folder Notes"}
          </span>
        </div>

        {/* Header & Controls Section */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-500 to-cyan-600 text-white flex items-center justify-center shadow-md shadow-cyan-500/20 shrink-0">
              <FolderOpen className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                  {folderInfo?.name || "Notes"}
                </h1>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-cyan-50 text-cyan-700 border border-cyan-100">
                  {notes?.length || 0} {notes?.length === 1 ? "Note" : "Notes"}
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-0.5">
                Organize thoughts, code snippets, and research in this collection
              </p>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={() => setIsNewNoteModalOpen(true)}
            className="group flex items-center justify-center gap-2 px-4 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded-xl shadow-sm hover:shadow-md transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 shrink-0"
          >
            <Plus
              size={18}
              strokeWidth={2.5}
              className="group-hover:rotate-90 transition-transform duration-300"
            />
            <span>Create Note</span>
          </button>
        </div>

        {/* Filter, Search & View Controls Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search notes in this folder..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-9 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={15} />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2.5">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-medium text-gray-700 shadow-2xs">
              <ArrowUpDown size={14} className="text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent focus:outline-none cursor-pointer text-gray-700"
              >
                <option value="newest">Recently Updated</option>
                <option value="oldest">Oldest First</option>
                <option value="alpha-asc">Name (A-Z)</option>
                <option value="alpha-desc">Name (Z-A)</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-gray-100 p-1 rounded-xl border border-gray-200">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-lg transition-all ${
                  viewMode === "grid"
                    ? "bg-white text-cyan-600 shadow-xs"
                    : "text-gray-500 hover:text-gray-900"
                }`}
                title="Grid view"
              >
                <LayoutGrid size={17} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded-lg transition-all ${
                  viewMode === "list"
                    ? "bg-white text-cyan-600 shadow-xs"
                    : "text-gray-500 hover:text-gray-900"
                }`}
                title="List view"
              >
                <List size={17} />
              </button>
            </div>
          </div>
        </div>

        {/* Notes Grid / List Content */}
        <div className="bg-transparent">
          {isPending ? (
            <NotesSkeleton viewMode={viewMode} />
          ) : processedNotes.length > 0 ? (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
                  : "space-y-3"
              }
            >
              {processedNotes.map((note) => (
                <NoteElement
                  key={note._id}
                  note={note}
                  viewMode={viewMode}
                  onRename={updateNote}
                  onDelete={deleteNote}
                />
              ))}
            </div>
          ) : searchQuery ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-gray-200/80 shadow-xs">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mx-auto mb-3">
                <Search size={22} />
              </div>
              <h3 className="text-base font-semibold text-gray-900">
                No matching notes found
              </h3>
              <p className="text-sm text-gray-500 mt-1 max-w-sm mx-auto">
                No notes match your search "{searchQuery}". Try different keywords
                or clear the search filter.
              </p>
              <button
                onClick={() => setSearchQuery("")}
                className="mt-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium rounded-lg transition-colors"
              >
                Clear Search
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-gray-300 shadow-xs">
              <div className="w-14 h-14 bg-cyan-50 rounded-2xl flex items-center justify-center text-cyan-600 mx-auto mb-4">
                <FileText size={28} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                No notes in this folder yet
              </h3>
              <p className="text-sm text-gray-500 mt-1 max-w-sm mx-auto">
                Create your first rich-text note to capture your thoughts, ideas,
                and research.
              </p>
              <button
                onClick={() => setIsNewNoteModalOpen(true)}
                className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-medium rounded-xl shadow-sm transition-all"
              >
                <Plus size={18} />
                Create Note Now
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Create Note Modal */}
      {isNewNoteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-500" />
                <h4 className="font-semibold text-gray-900 text-base">
                  Create New Note
                </h4>
              </div>
              <button
                onClick={() => setIsNewNoteModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateNoteSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Note Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Project Architecture Plan"
                  value={newNoteTitle}
                  onChange={(e) => setNewNoteTitle(e.target.value)}
                  autoFocus
                  className="w-full text-sm px-3.5 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsNewNoteModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreating}
                  className="flex items-center gap-1.5 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 disabled:opacity-60 text-white text-xs font-medium rounded-lg transition-colors shadow-xs"
                >
                  {isCreating ? "Creating..." : "Create & Edit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotePage;
