import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../../pages/Dashboard/Note/NoteEditor/Navbar"
import NoteEditor from "../../../pages/Dashboard/Note/NoteEditor/NoteEditor"
import { useMutation, useMutationState, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchContent, updateNote } from "./NoteEditorHandler";
import useNoteEditor from "./useNoteEditor";
import {Toaster} from "../../../utils/Toaster"
import { errorHandler } from "../../../utils/errorHandler";
const NoteEditorLayout = () => {
  const {noteId} = useParams();
  const queryClient = useQueryClient();
  const {data:queryData,isPending:dataIsPending} = useQuery({
    queryKey:["content",noteId],
    queryFn:()=>fetchContent(noteId),
  })
  const {mutate,isPending:updateIsPending} = useMutation({
    mutationFn:({content,noteId})=>updateNote(content,noteId),
    onMutate:async ({content,noteId})=>{
      await queryClient.cancelQueries({queryKey:["content",noteId]})
      const previousData = queryClient.getQueryData(["content",noteId])

      queryClient.setQueryData(['content',noteId],content)

      return {previousData}
    },
    onSuccess:(res)=>{
      queryClient.setQueryData(["content",noteId],res.data.data.content)
    },
    onError:(err,{content,noteId},context)=>{
      queryClient.setQueryData(["content",noteId],context.previousData)
      errorHandler(err)
    },onSettled:()=>{
      queryClient.invalidateQueries({queryKey:["content",noteId]})
    }
  })
  const {data,setData} = useNoteEditor({queryData,noteId,mutate});
  return (
    <div className="w-full h-screen bg-[#fafafa] flex flex-col font-sans text-gray-800 selection:bg-cyan-100 overflow-hidden">
      <Navbar updatePending={updateIsPending}/>
      <main className="flex-1 w-full max-w-[1200px] mx-auto flex flex-col bg-white sm:my-6 sm:rounded-2xl sm:shadow-sm sm:border sm:border-gray-200 overflow-hidden relative">
        {!dataIsPending?<NoteEditor content={data} onChange={setData} updatePending={updateIsPending}/>:"Loading"}
      </main>
    </div>
  );
};

export default NoteEditorLayout;