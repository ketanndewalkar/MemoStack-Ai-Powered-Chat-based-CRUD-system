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

export const fetchFolderDetails = async (folderId) => {
  if (!folderId) return null;
  try {
    const response = await API.get(`/folder/${folderId}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching folder details:", error);
    return null;
  }
};

export const createNote = async (folderId, name) => {
  const response = await API.post(`/note/${folderId}/new`, { name });
  return response;
};

export const updateNoteAPI = async (noteId, name) => {
  const response = await API.patch(`/note/${noteId}`, { name });
  return response;
};

export const deleteNoteAPI = async (noteId) => {
  const response = await API.delete(`/note/${noteId}`);
  return response;
};
