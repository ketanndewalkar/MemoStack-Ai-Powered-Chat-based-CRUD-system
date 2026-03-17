import API from "../../../services/api/axiosInstance"

export const fetchContent = async (noteId) =>{
    const res = await API.get(`/note/${noteId}`)
    console.log(res)
    return res.data.data.content
    
}

export const updateNote = async (content,noteId) =>{
    const res = await API.patch(`/note/${noteId}`,{content})
    console.log(res)
    return res
}