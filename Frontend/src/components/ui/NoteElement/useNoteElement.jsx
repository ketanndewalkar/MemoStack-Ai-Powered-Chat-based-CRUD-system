import React, { useEffect, useRef, useState } from "react";

const useNoteElement = ({ note, onRename }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(note?.name || "");
  const inputRef = useRef(null);

  useEffect(() => {
    setName(note?.name || "");
  }, [note?.name]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const saveRename = () => {
    const trimmed = name.trim();
    if (trimmed && trimmed !== note.name) {
      onRename({ noteId: note._id, name: trimmed });
    } else {
      setName(note.name || "");
    }
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      saveRename();
    } else if (e.key === "Escape") {
      setName(note.name || "");
      setIsEditing(false);
    }
  };

  return {
    isEditing,
    setIsEditing,
    name,
    setName,
    handleChange,
    handleKeyDown,
    saveRename,
    inputRef,
  };
};

export default useNoteElement;
