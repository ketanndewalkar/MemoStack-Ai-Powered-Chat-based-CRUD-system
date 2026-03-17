import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/AuthStore";

const HomeHero = () => {
  const user = useAuthStore((state)=>state.user)
  const navigate = useNavigate();
  return (
    <section className="md:pt-[100px] pt-[150px] md:h-[calc(100vh-100px)] px-6 lg:px-[7rem] flex items-center justify-center bg-[#eef2f3] ">
      <div className="text-center w-full">

        <h1 className="font-extrabold text-[#111827] leading-tight
        text-[32px] sm:text-[40px] md:text-[48px]">

          Your Personal{" "}
          <span className="text-[#22a6b3]">Knowledge</span>
          <br />
          <span className="text-[#22a6b3]">Vault</span>

        </h1>

        <p className="text-[#6b7280] mt-6
        text-[14px] sm:text-[15px] md:text-[16px]">

          Save notes, links, and documents in organized folders. Search, edit,
          and access your knowledge anytime, from anywhere.

        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">

          <button onClick={()=>user?navigate("/dashboard"):navigate("/login")} className="bg-[#22a6b3] text-white px-6 py-3 rounded-md text-[14px] font-semibold">
            Start Saving Knowledge
          </button>

          <button className="border border-gray-300 px-6 py-3 rounded-md text-[14px] text-gray-700">
            View Demo
          </button>

        </div>

      </div>
    </section>
  );
};

export default HomeHero;