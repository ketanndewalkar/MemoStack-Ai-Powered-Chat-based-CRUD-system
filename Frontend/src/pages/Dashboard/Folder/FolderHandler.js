import API from "../../../services/api/axiosInstance";

export const fetchFolders = async () => {
  const res = await API.get("/folder/all");
  return res.data.data;
};

export const updateFolderName = async (id,name) => {
  console.log(id,name)
  const res = await API.patch(`/folder/${id}`,{name})
  console.log(res)
  return res
}

export const deleteFolder = async (id) => {
  const res = await API.delete(`/folder/${id}`)
  return res
}

export const createFolder = async (name) =>{
  const res = await API.post("/folder/",{name});
  console.log(res);
  return res
}