import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { menuItems } from "../../utils/constants";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/AuthStore";
import { GiCharacter, GiExitDoor } from "react-icons/gi";
import gsap from "gsap";
const Navbar = () => {
  const user = useAuthStore((state) => state.user);
  const [open, setOpen] = useState(false);
  const navbar = useRef(null);
  const [currentScroll, setcurrentScroll] = useState(0);
  const [previousScroll, setpreviousScroll] = useState(0);
  const logOut = useAuthStore((state) => state.logOut);
  const navigate = useNavigate();

  // Animation Logic
  useEffect(() => {
    const handle = () => {
      setcurrentScroll(window.scrollY);
    };
    window.addEventListener("scroll", handle);
    return () => window.removeEventListener("scroll", handle);
  });
  useEffect(() => {
    if (!navbar.current) return;
    if (currentScroll > previousScroll) {
      setpreviousScroll(currentScroll);
      gsap.to(navbar.current, {
        y: "-100%",
        duration: 0.2,
        ease:"none",
        opacity: 0,
      });
    } else if (currentScroll < previousScroll) {
      setpreviousScroll(currentScroll);
      gsap.to(navbar.current, {
        y: "0",
        duration: 0.2,
        ease: "none",
        opacity: 1,
      });
    }
  }, [currentScroll]);

  return (
    <nav
      ref={navbar}
      className="fixed top-0 w-full h-[100px] px-6 lg:px-[7rem] py-[1rem] z-50"
    >
      <div className="size-full border-2 shadow-2xl rounded-lg border-neutral-500 flex items-center px-[1rem] justify-between bg-white">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <img src="/logo.png" className="h-8 w-8 object-contain" alt="logo" />
          <h1 className="font-bold font-sans text-gray-800 text-lg tracking-tight">
            MemoStack
          </h1>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-10">
          {menuItems.map(({ name, path }, id) => (
            <Link key={id} to={path} className="text-[0.9rem] font-semibold">
              {name}
            </Link>
          ))}
        </ul>

        {/* Desktop Login */}
        {user ? (
          <div className="flex items-center gap-2">
            <p className="items-center gap-2 border px-2 rounded-full border-gray-400 hidden md:flex">
              <GiCharacter className="" /> {user.name}
            </p>
            <p
              onClick={() => logOut(navigate)}
              className="items-center gap-2 border px-2 rounded-full border-gray-200 hidden md:flex bg-red-200"
            >
              <GiExitDoor className="" /> Log Out
            </p>
          </div>
        ) : (
          <Link
            to="/login"
            className="hidden md:block text-[0.9rem] border px-[0.7rem] py-[0.4rem] rounded-lg border-neutral-400 text-gray-100 bg-black"
          >
            Login / SignUp
          </Link>
        )}

        {/* Hamburger Button */}
        <button
          className="md:hidden flex flex-col gap-1"
          onClick={() => setOpen(!open)}
        >
          <span className="w-6 h-[2px] bg-black"></span>
          <span className="w-6 h-[2px] bg-black"></span>
          <span className="w-6 h-[2px] bg-black"></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden mt-2 border rounded-lg shadow-lg bg-white p-4">
          <ul className="flex flex-col gap-4">
            {menuItems.map(({ name, path }, id) => (
              <Link
                key={id}
                to={path}
                className="text-sm font-semibold"
                onClick={() => setOpen(false)}
              >
                {name}
              </Link>
            ))}
          </ul>

          {user ? (
            <div className="flex gap-2 mt-5">
              <p className="flex items-center gap-2 border px-2 rounded-full border-gray-400 w-fit">
                <GiCharacter className="text-black" /> {user?.name}
              </p>
              <p className="flex items-center gap-2 border px-2 rounded-full border-gray-200 bg-red-400 w-fit">
                Log Out
              </p>
            </div>
          ) : (
            <Link
              className="mt-4 inline-block text-sm border px-[0.7rem] py-[0.4rem] rounded-lg border-neutral-400 text-gray-100 bg-black"
              onClick={() => setOpen(false)}
            >
              Login / SignUp
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
