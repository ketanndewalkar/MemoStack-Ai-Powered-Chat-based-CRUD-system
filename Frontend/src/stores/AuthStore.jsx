import { create } from "zustand";
import { persist } from "zustand/middleware";
import API from "../services/api/axiosInstance";
import { Toaster } from "../utils/Toaster";
export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,

      setAuth: (data) => {
        set({
          user: data.data,
        });
      },
      logOut: async (navigate) => {
        try {
          const res = await API.get("/auth/logout", { skipInterceptor: true });
          Toaster({ title: res.data.message, status: "success" });
          set({ user: null });
          navigate("/");
        } catch (error) {
          navigate("/");
          set({ user: null });
          Toaster({ title: "Not able to Logout!!", status: "error" });
        }
      },
    }),
    {
      name: "auth-storage", // localStorage key
    },
  ),
);
