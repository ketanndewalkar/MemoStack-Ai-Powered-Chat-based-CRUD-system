import React from "react";
import { Menu, ChevronDown, User } from "lucide-react";
import { useAuthStore } from "../../../stores/AuthStore";

const DashNavbar = ({ setOpen }) => {
  const { user } = useAuthStore();
  const userName = user?.name || "Guest";
  const userInitials = userName.substring(0, 2).toUpperCase();

  return (
    <header className="h-16 bg-white/80 backdrop-blur-md border-b border-gray-200 flex items-center justify-between px-4 sm:px-8 z-20 sticky top-0 transition-all shadow-sm">
      {/* Left side */}
      <div className="flex items-center gap-4">
        {/* Hamburger */}
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="md:hidden p-2 -ml-2 text-gray-500 hover:bg-gray-100 hover:text-gray-800 rounded-lg transition-colors"
          aria-label="Toggle Navigation"
        >
          <Menu size={22} strokeWidth={2.5} />
        </button>

        <h1 className="font-bold text-gray-800 text-lg tracking-tight hidden sm:block">
          Dashboard Overview
        </h1>
      </div>

      {/* Right side: Profile Section */}
      <div className="flex items-center gap-4 ml-auto">
        {/* Profile Dropdown/Info */}
        <div className="flex items-center gap-3 pl-4 border-l border-gray-200 cursor-pointer group">
          {/* User Details */}
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-sm font-semibold text-gray-800">
              {userName}
            </span>
            <span className="text-xs font-medium text-cyan-600 bg-cyan-50 px-2 py-0.5 rounded-full mt-0.5">
              Standard User
            </span>
          </div>

          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-md ring-2 ring-white group-hover:ring-cyan-100 transition-all">
            {user ? userInitials : <User size={18} />}
          </div>

          
        </div>
      </div>
    </header>
  );
};

export default DashNavbar;