import React from "react";
import { Plus, Search, Filter, Image as ImageIcon, Trash } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchNotes, createNote, updateNoteAPI, deleteNoteAPI } from "./NoteHandler";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import NoteElement from "../../../../components/ui/NoteElement/NoteElement";
import { Toaster } from "../../../../utils/Toaster";
import { errorHandler } from "../../../../utils/errorHandler";

const NotePage = () => {
  const navigate = useNavigate();
  const [searchQuery, setsearchQuery] = useState("")
  const { folderId } = useParams();
  const handleChange = (e) =>setsearchQuery(e.target.value);
  
  const queryClient = useQueryClient();
  const { data: notes, isPending } = useQuery({
    queryKey: ["notes", folderId],
    queryFn: () => fetchNotes(folderId),
  });

  const filteredData = notes?notes.filter((note)=>note.name.toLowerCase().includes(searchQuery.toLowerCase())):[]

  const { mutate: makeNote } = useMutation({
    mutationFn: ({ name }) => createNote(folderId, name),
    onMutate: async ({ name }) => {
      await queryClient.cancelQueries({ queryKey: ["notes", folderId] });
      const temp_id = Date.now();
      const newNote = { _id: temp_id, name };
      const previousData = queryClient.getQueryData(["notes", folderId]);
      queryClient.setQueryData({ queryKey: ["notes", folderId] }, (oldData) => [
        ...(oldData || []),
        newNote,
      ]);
      return { temp_id, previousData };
    },
    onSuccess: (res, context) => {
      const serverNote = res.data?.data;
      queryClient.setQueryData({ queryKey: ["notes", folderId] }, (oldData) =>
        (oldData || []).map((ele) => {
          return ele._id === context.temp_id && serverNote ? serverNote : ele;
        }),
      );
      Toaster({
        title: res.data?.message || "Note created",
        status: "success",
      });
    },
    onError: (err, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(
          { queryKey: ["notes", folderId] },
          context.previousData,
        );
      }
      errorHandler(err);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["notes", folderId] });
    },
  });

  const { mutate: updateNote } = useMutation({
    mutationFn: ({ noteId, name }) => updateNoteAPI(noteId, name),

    onMutate: async ({ noteId, name }) => {
      await queryClient.cancelQueries({ queryKey: ["notes", folderId] });

      const previousData = queryClient.getQueryData(["notes", folderId]);

      queryClient.setQueryData(["notes", folderId], (oldData) =>
        (oldData || []).map((note) =>
          note._id === noteId
            ? { ...note, name } // optimistic update
            : note,
        ),
      );

      return { previousData };
    },

    onSuccess: (res) => {
      const serverNote = res.data?.data;

      queryClient.setQueryData(["notes", folderId], (oldData) =>
        (oldData || []).map((note) =>
          note._id === serverNote?._id ? serverNote : note,
        ),
      );

      Toaster({
        title: res.data?.message || "Note updated",
        status: "success",
      });
    },

    onError: (err, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(["notes", folderId], context.previousData);
      }

      errorHandler(err);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["notes", folderId] });
    },
  });

  const { mutate: deleteNote } = useMutation({
  mutationFn: ({ noteId }) => deleteNoteAPI(noteId),

  onMutate: async ({ noteId }) => {
    await queryClient.cancelQueries({ queryKey: ["notes", folderId] });

    const previousData = queryClient.getQueryData(["notes", folderId]);

    // Fixed parameter to be an array directly:
    queryClient.setQueryData(["notes", folderId], (oldData) =>
      (oldData || []).filter((ele) => ele._id !== noteId)
    );

    return { noteId, previousData };
  },

  onSuccess: (res) => {
    Toaster({
      title: res.data?.message || "Note deleted",
      status: "success",
    });
  },

  onError: (err, context) => {
    if (context?.previousData) {
      // Fixed parameter to be an array directly:
      queryClient.setQueryData(
        ["notes", folderId],
        context.previousData
      );
    }

    errorHandler(err);
  },

  onSettled: () => {
    queryClient.invalidateQueries({ queryKey: ["notes", folderId] });
  },
});
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              Notes
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              View and manage items in this folder
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* Search Bar */}
            <div className="relative w-full sm:w-64">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search Notes..."
                value={searchQuery}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all"
              />
            </div>


            {/* Create Button */}
            <button
              onClick={() => makeNote({ name: "New Note" })}
              className="group w-full sm:w-auto flex justify-center items-center gap-2 px-4 py-2.5 bg-cyan-600 text-white font-medium rounded-xl shadow-sm hover:bg-cyan-700 hover:shadow-md transform hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-200"
            >
              <Plus
                size={18}
                strokeWidth={2.5}
                className="transition-transform duration-300 group-hover:rotate-90"
              />
              <span>New Note</span>
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 min-h-[60vh] p-6">
          {isPending ? (
            <div className="flex items-center justify-center h-full min-h-[40vh]">
              <div className="w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : notes?.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 items-stretch">
              {filteredData?.map((note) => (
                <NoteElement key={note._id} note={note} onRename={updateNote} onDelete={deleteNote}/>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full min-h-[40vh] text-center">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <Search className="text-gray-400" size={24} />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                No notes yet
              </h3>
              <p className="text-gray-500 max-w-sm">
                Get started by creating your first note in this folder.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotePage;
