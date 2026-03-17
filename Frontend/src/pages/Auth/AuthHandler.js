import axios from "axios"

import API from "../../services/api/axiosInstance"
export const loginUser = async (formData,setAuth,navigate) => {
    const res = await API.post("/auth/login",formData);
    setAuth(res.data);
    navigate("/");
    return res;
}

export const signUpUser = async (formData,navigate) =>{
    const res = await API.post("/auth/signup",formData);
    navigate("/login");
    return res;
}