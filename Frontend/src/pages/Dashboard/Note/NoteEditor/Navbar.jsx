import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Cloud, MoreHorizontal, Share, ChevronLeft, Loader } from "lucide-react";

const Navbar = ({ updatePending }) => {
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 h-14 bg-white/80 backdrop-blur-md border-b border-gray-200 px-6 sm:px-12 flex items-center justify-between transition-all">
      {/* Left side: Logo & Title */}
      <div className="flex items-center gap-4 justify-between ">
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(-1)}
            className="p-1.5 mr-1 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
            title="Go back"
          >
            <ChevronLeft size={20} strokeWidth={2.5} />
          </button>

          <Link
            to="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <img
              src="/logo.png"
              className="h-8 w-8 object-contain"
              alt="logo"
            />
            <h1 className="font-bold font-sans text-gray-800 text-lg tracking-tight">
              MemoStack
            </h1>
          </Link>
        </div>
        <div className="h-4 w-px bg-gray-300 hidden sm:block"></div>
        <div className={`flex items-center gap-1.5 text-xs text-gray-600 font-medium ${updatePending?"bg-gray-50":"bg-green-200"}  px-2 py-1 rounded-md`}>
          {!updatePending ? (
            <>
              <Cloud size={14} className="text-gray-400" />
              Saved to cloud
            </>
          ) : (
            <>
              <Loader size={14} className="text-gray-400 " />
              Saving to cloud
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
