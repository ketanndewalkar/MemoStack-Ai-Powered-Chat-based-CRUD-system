import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "./AuthHandler";
import {useMutation} from "@tanstack/react-query"
import { Toaster } from "../../utils/Toaster";
import { useAuthStore } from "../../stores/AuthStore";
import Loader from "react-js-loader";
import { errorHandler } from "../../utils/errorHandler";
export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const navigate = useNavigate();
  const {setAuth} = useAuthStore();
  const {mutate,isPending} = useMutation({
    mutationFn :(formData)=>loginUser(formData,setAuth,navigate),
    onSuccess : (res)=>{Toaster({title:res.data.message,status:"success"})},
    onError:(err)=>errorHandler(err)

  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };


  

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-6xl rounded-xl flex flex-col overflow-hidden">
        {/* LEFT SIDE ILLUSTRATION */}

        <div className="hidden md:flex items-center justify-center p-10">
          <h1 className="font-extrabold font-serif text-cyan-400 text-2xl">
            MemoStack
          </h1>
        </div>

        {/* RIGHT SIDE LOGIN FORM */}

        <div className="w-full flex flex-col justify-center items-center">

          <h2 className="text-3xl font-bold text-gray-800 mb-8 w-full text-center">
            Welcome Back
          </h2>

          <form className="space-y-6 w-[50%]">
            {/* EMAIL */}

            <div>
              <input
                type="text"
                name="email"
                placeholder="Username or Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border-b border-gray-300 py-2 outline-none focus:border-blue-500"
              />

              {/* {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )} */}
            </div>

            {/* PASSWORD */}

            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border-b border-gray-300 py-2 outline-none focus:border-blue-500"
              />

              {/* {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )} */}
            </div>

            {/* REMEMBER + FORGOT */}

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-600">
                <input
                  type="checkbox"
                  name="remember"
                  checked={formData.remember}
                  onChange={handleChange}
                />
                Remember Me
              </label>

              <a
                href="/forgot-password"
                className="text-blue-500 hover:underline"
              >
                Forgot Password?
              </a>
            </div>

            {/* LOGIN BUTTON */}

            <button
            type="button"
              onClick={()=>mutate(formData)}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-md transition"
            >
              {isPending?<Loader type="bubble-top" color="#ffffff" size={20} />:
              "Login"}
            </button>
          </form>

          {/* SIGNUP */}

          <p className="text-sm text-gray-600 mt-6 text-center">
            Don't Have An Account?
            <Link to="/signup" className="text-blue-500 ml-1 hover:underline">
              Click Here
            </Link>
          </p>

          {/* APP BUTTONS */}
        </div>
      </div>
    </div>
  );
}
