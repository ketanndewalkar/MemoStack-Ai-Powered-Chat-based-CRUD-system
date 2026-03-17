import axios from "axios";
import API from "../../../../services/api/axiosInstance";
export const fetchNotes = async (folderId) => {
  if (!folderId) return [];

  try {
    const response = await API.get(`/note/folder/${folderId}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching notes:", error);
    throw error;
  }
};

export const createNote = async (folderId, name) => {
  const response = await API.post(`/note/${folderId}/new`, { name });
  console.log(response);
  return response;
};

export const updateNoteAPI = async (noteId, name) => {
  const response = await API.patch(`/note/${noteId}`, { name: name });
  console.log(response);
  return response;
};

export const deleteNoteAPI = async (noteId) => {
  const response = await API.delete(`/note/${noteId}`);
  console.log(response);
  return response;
};
