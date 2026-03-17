import API from "../../../../services/api/axiosInstance";
export const getStats = async () => {
  const [folders, notes, links] = await Promise.all([
    API.get("/folder/all"),
    API.get("/note/all",{ skipInterceptor: true }),
    API.get("/link/all",{ skipInterceptor: true }),
  ]);
  // return [folders.data.data.length,notes.data.data.length,notes.data.data.length]
  return [
  { title: "Total Folders", value: folders.data.data.length, change: "+12%", color: "cyan" },
  { title: "Total Notes", value: notes.data.data.length, change: "+8%", color: "cyan" },
  { title: "Saved Links", value: links.data.data.length, change: "+4%", color: "cyan" },
]
};
