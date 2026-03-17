import React, { useEffect, useRef, useState } from "react";

const useNoteElement = ({ note,onRename }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(note.name || "");
  const inputRef = useRef(null);
  useEffect(()=>{
    const timer = setTimeout(()=>{
      handleRename(note._id,name)
    },1000)
    return ()=>clearTimeout(timer);
  },[name])

    useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleRename = (id,finalName) =>{
    if(name=="" || name === note.name){
      return;
    }
    onRename({noteId:id,name:finalName});
  }
  const handleChange = (e) => {
    setName(e.target.value);
  }

  return { isEditing, setIsEditing, name, setName ,handleChange,inputRef};
};

export default useNoteElement;
