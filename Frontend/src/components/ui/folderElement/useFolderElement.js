import { useQueryClient } from "@tanstack/react-query";
import { useState, useRef, useEffect } from "react";

const useFolderElement = ({ initialName, onRename,_id }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(initialName || "New Folder");
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);
  const queryClient = useQueryClient();
  const updateLoadingState = (id, isLoading) => {
    queryClient.setQueryData(["folders"], (oldData) => {
      if (!oldData) return oldData;

      return oldData.map((item) => {
        if (item._id === id) {
          return {
            ...item,
            isLoading: isLoading,
          };
        }
        return item;
      });
    });
  };
  // Focus and select the text when entering edit mode
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  // Update internal name state if initialName prop changes from outside
  useEffect(() => {
    setName(initialName || "New Folder");
  }, [initialName]);

  // Execute rename with loading state
  const executeRename = async (finalName) => {
    updateLoadingState(_id,true)
    try {
      await onRename({_id,finalName})
    } catch (err) {
      console.error(err);
      setName(initialName || "New Folder"); // Revert on failure
    } finally {
      updateLoadingState(_id,false)
    }
  };

  // Debounced auto-save while typing
  useEffect(() => {
    if (!isEditing) return;

    const timer = setTimeout(() => {
      const finalName = name.trim();
      if (finalName !== initialName && finalName !== "") {
        executeRename(finalName);
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [name, isEditing, initialName]);

  const handleSaveName = () => {
    setIsEditing(false);
    const finalName = name.trim();

    if (finalName !== initialName && finalName !== "") {
      executeRename(finalName);
      setName(finalName);
    } else if (finalName === "") {
      setName(initialName || "New Folder");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSaveName();
    }
    if (e.key === "Escape") {
      setName(initialName || "New Folder");
      setIsEditing(false);
    }
  };

  const startEditing = (e) => {
    e.stopPropagation();
    setIsEditing(true);
  };
  return {
    name,
    setName,
    isEditing,
    isLoading,
    inputRef,
    handleSaveName,
    handleKeyDown,
    startEditing,
  };
};

export default useFolderElement;
