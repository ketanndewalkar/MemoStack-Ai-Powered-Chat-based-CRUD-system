
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { LayoutDashboard, FolderOpen, StickyNote, Link as LinkIcon } from "lucide-react";
import logo from "../../../../public/logo.png"
const Sidebar = ({ open, setOpen }) => {
  const navItems = [
    { title: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
    { title: "Folders", to: "/dashboard/folders", icon: FolderOpen },
    { title: "Notes", to: "/dashboard/notes", icon: StickyNote },
    { title: "Links", to: "/dashboard/links", icon: LinkIcon },
  ];

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden backdrop-blur-sm transition-all"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`
        fixed md:static z-40
        w-64 h-full bg-white shadow-[4px_0_24px_rgba(0,0,0,0.02)] border-r border-gray-100
        transform transition-transform duration-300 ease-in-out flex flex-col
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
      `}
      >
        {/* Brand section */}
        <Link
          to="/"
          className="h-16 flex items-center justify-start px-6 gap-3 border-b border-gray-100 hover:bg-gray-50 transition-colors"
        >
          <img src={logo} alt="Logo" className="w-8 h-8 object-contain drop-shadow-sm" />
          <h1 className="font-bold text-gray-900 text-xl tracking-tight">
            Memo<span className="text-cyan-500">Stack</span>
          </h1>
        </Link>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden py-6 px-4">
          <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
            Menu
          </p>
          <nav className="flex flex-col gap-1.5">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={index}
                  to={item.to}
                  end={item.to === "/dashboard"}
                  onClick={() => {
                    if (window.innerWidth < 768) setOpen(false);
                  }}
                  className={({ isActive }) => `
                    flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group
                    ${isActive
                      ? "bg-cyan-50 text-cyan-600 shadow-sm"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }
                  `}
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        className={`w-5 h-5 transition-colors ${isActive ? "text-cyan-500" : "text-gray-400 group-hover:text-gray-600"
                          }`}
                        strokeWidth={isActive ? 2.5 : 2}
                      />
                      {item.title}
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Optional Footer Profile/Settings area can go here */}
      </aside>
    </>
  );
};

export default Sidebar;

