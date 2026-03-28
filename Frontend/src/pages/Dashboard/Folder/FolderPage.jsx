import React from "react";
import { NavLink } from "react-router-dom";
import {
  createFolder,
  deleteFolder,
  fetchFolders,
  updateFolderName,
} from "./FolderHandler";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import FolderElement from "../../../components/ui/folderElement/FolderElement";
import { Plus } from "lucide-react";
import { errorHandler } from "../../../utils/errorHandler";
import { Toaster } from "../../../utils/Toaster";
const Folderpage = () => {
  const queryClient = useQueryClient();

  const { data, isPending } = useQuery({
    queryKey: ["folder"],
    queryFn: fetchFolders,
    select: (data) => data.map((item) => ({ ...item, isLoading: item.isLoading || false })),
  });

  const { mutate: makeFolder } = useMutation({
    mutationFn: ({ name }) => createFolder(name),

    onMutate: async ({ name }) => {
      await queryClient.cancelQueries({ queryKey: ["folder"] });

      const previousData = queryClient.getQueryData(["folder"]);

      const tempId = Date.now();

      const newFolder = {
        _id: tempId,
        name,
      };

      queryClient.setQueryData(["folder"], (oldData = []) => [
        ...oldData,
        newFolder,
      ]);

      return { previousData, tempId };
    },

    onSuccess: (res, variables, context) => {
      const serverFolder = res.data.data;

      queryClient.setQueryData(["folder"], (oldData = []) =>
        oldData.map((folder) =>
          folder._id === context.tempId ? serverFolder : folder,
        ),
      );

      Toaster({
        title: res.data.message,
        status: "success",
      });
    },

    onError: (err, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(["folder"], context.previousData);
      }
      errorHandler(err);
    },

    onSettled: () => {
      queryClient.invalidateQueries(["folder"]);
    },
  });

  const { mutateAsync: updateFolderFn } = useMutation({
    mutationFn: ({ _id, finalName }) => updateFolderName(_id, finalName),
    onError: (err) => errorHandler(err),
  });

  const { mutate: deleteFolderFn } = useMutation({
    mutationFn: ({ _id }) => deleteFolder(_id),

    onMutate: async ({ _id }) => {
      await queryClient.cancelQueries({ queryKey: ["folder"] });
      const previousData = queryClient.getQueryData(["folder"]);

      if (previousData) {
        queryClient.setQueryData(["folder"], (oldData) =>
          oldData.filter((item) => item._id !== _id),
        );
      }

      return { previousData };
    },

    onSuccess: (res) => Toaster({ title: res.data.message, status: "success" }),

    onError: (err, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(["folder"], context.previousData);
      }
    },

    onSettled: () => queryClient.invalidateQueries({ queryKey: ["folder"] }),
  });

  return (
    <div className="min-h-screen">
      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Area placeholder */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              Folders
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage and organize your notes
            </p>
          </div>

          {/* Action buttons placeholder */}
          <div className="flex items-center gap-3">
            <button
              className="group flex items-center gap-2 px-4 py-2.5 bg-cyan-600 text-white font-medium rounded-xl shadow-sm hover:bg-cyan-700 hover:shadow-md transform hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-200"
              onClick={() => makeFolder({ name: "New Folder" })}
            >
              <Plus
                size={18}
                strokeWidth={2.5}
                className="transition-transform duration-300 group-hover:rotate-90"
              />
              <span>New Folder</span>
            </button>
          </div>
        </div>

        {/* Content Area placeholder */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 min-h-[60vh] p-6 flex gap-x-3 flex-wrap items-start">
          {isPending ? (
            <>
              <p>Loading</p>
            </>
          ) : (
            <>
              {data.map((ele) => (
                
                  <FolderElement
                  ele={ele}
                    key={ele._id}
                    _id={ele._id}
                    initialName={ele.name}
                    onDelete={deleteFolderFn}
                    onRename={updateFolderFn}
                    isLoading={ele.isLoading}
                  />
                
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Folderpage;
