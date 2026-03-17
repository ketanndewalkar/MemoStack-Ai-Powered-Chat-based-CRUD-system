import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Toaster } from "../../utils/Toaster";
import { signUpUser } from "./AuthHandler";
import Loader from "react-js-loader";
import { useMutation } from "@tanstack/react-query";
import { errorHandler } from "../../utils/errorHandler";
export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: (formData) => signUpUser(formData, navigate),
    onSuccess: (res) => {
      Toaster({ title: res.data.message, status: "success" });
    },
    onError: (err) => errorHandler(err),
  });

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
        {/* HEADER / BRAND */}

        <div className="hidden md:flex items-center justify-center p-10">
          <h1 className="font-extrabold font-serif text-cyan-400 text-2xl">
            MemoStack
          </h1>
        </div>

        {/* SIGNUP FORM */}

        <div className="w-full flex flex-col justify-center items-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 w-full text-center">
            Create Account
          </h2>

          <form className="space-y-6 w-full md:w-[50%]">
            {/* NAME */}

            <div>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border-b border-gray-300 py-2 outline-none focus:border-blue-500"
              />

              {/* {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )} */}
            </div>

            {/* EMAIL */}

            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
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

            {/* CONFIRM PASSWORD */}

            <div>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full border-b border-gray-300 py-2 outline-none focus:border-blue-500"
              />

              {/* {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )} */}
            </div>

            {/* TERMS */}

            <div className="flex items-center text-sm gap-2">
              <input
                type="checkbox"
                name="terms"
                checked={formData.terms}
                onChange={handleChange}
              />

              <span className="text-gray-600">
                I agree to the
                <a href="/terms" className="text-blue-500 ml-1 hover:underline">
                  Terms & Conditions
                </a>
              </span>
            </div>

            {/* {errors.terms && (
              <p className="text-red-500 text-sm">{errors.terms}</p>
            )} */}

            {/* SIGNUP BUTTON */}

            <button
              onClick={() => mutate(formData)}
              type="button"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-md transition flex items-center justify-center"
            >
              {isPending ? (
                <Loader type="bubble-top" color="#ffffff" size={20} />
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          {/* LOGIN LINK */}

          <p className="text-sm text-gray-600 mt-6 text-center">
            Already have an account?
            <Link to="/login" className="text-blue-500 ml-1 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
