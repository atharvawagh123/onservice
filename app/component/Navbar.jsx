"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useAuthContext } from "../context/ContextProvider";
import { FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi";
import { IoLogOut } from "react-icons/io5";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const Navbar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme, isLogin, logout } = useAuthContext();
  const name = useSelector((state) => state.user.name);

  const linkClass = (path) =>
    pathname.startsWith(path)
      ? "text-blue-600 dark:text-blue-400 font-semibold border-b-2 border-blue-600 dark:border-blue-400 pb-1"
      : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition";

  const handleLogout = () => {
    const response = logout();
    if (response.success) toast.success(response.message);
    else toast.error("Error in logout!");
  };

  return (
    <nav className="w-full bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image src="/favicon.ico" width={35} height={35} alt="logo" />
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
            ON SERIVCE
          </h2>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-gray-800 dark:text-gray-200"
        >
          {open ? <FiX size={26} /> : <FiMenu size={26} />}
        </button>

        {/* Menu */}
        <div
          className={`${
            open ? "flex" : "hidden"
          } flex-col md:flex md:flex-row items-center gap-6 absolute md:static top-full right-0
          bg-white dark:bg-gray-900 w-full md:w-auto p-4 md:p-0 shadow-md md:shadow-none 
          transition-all duration-300`}
        >
          {/* Links */}
          <ul className="flex flex-col md:flex-row gap-4 md:gap-8">
            <li>
              <Link href="/home" className={linkClass("/home")}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className={linkClass("/about")}>
                About
              </Link>
            </li>
            <li>
              <Link href="/service" className={linkClass("/service")}>
                Services
              </Link>
            </li>
            <li>
              <Link href="/profile" className={linkClass("/profile")}>
                Profile
              </Link>
            </li>
          </ul>

          {/* Theme Toggle Icon */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:scale-110 transition"
          >
            {theme === "light" ? <FiMoon size={22} /> : <FiSun size={22} />}
          </button>

          {/* {name && (
            <span className="text-gray-800 dark:text-gray-200 font-medium">
              {name}
            </span>
          )} */}

          {/* Auth Buttons */}
          <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
            {isLogin ? (
              <button
                onClick={handleLogout}
                className="px-5 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition flex items-center gap-2"
              >
                <IoLogOut size={20} /> Logout
              </button>
            ) : (
              <div className="flex flex-col md:flex-row gap-3">
                <Link
                  href="/login"
                  className="px-5 py-2 border border-blue-600 dark:border-blue-400 
                  text-blue-600 dark:text-blue-400 rounded-md hover:bg-blue-50 dark:hover:bg-gray-800 transition"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="px-5 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-md hover:bg-blue-700 transition"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
