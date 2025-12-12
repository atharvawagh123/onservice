"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  FaBars,
  FaTimes,
  FaUser,
  FaServicestack,
  FaList,
  FaCalculator,
  FaQuestionCircle,
} from "react-icons/fa";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useAuthContext } from "../context/ContextProvider";
import { FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useAuthContext();
  const [mounted, setMounted] = useState(false);
  const state = useSelector((state) => state.Admin);

  const pathname = usePathname(); // ⭐ detect active route

  useEffect(() => {
    const load = async () => {
      setMounted(true); // Runs only on client
    };
    load();
  }, []);

  const menuItems = [
    { name: "User", icon: <FaUser />, link: "/admin/user" },
    { name: "Service", icon: <FaServicestack />, link: "/admin/service" },
    { name: "Category", icon: <FaList />, link: "/admin/category" },
    { name: "Counter", icon: <FaCalculator />, link: "/admin/counter" },
    { name: "Enquiry", icon: <FaQuestionCircle />, link: "/admin/enquiry" },
  ];
  // console.log("sidebar state",state);
  return (
    <>
      {/* Mobile Header (Toggle + Theme Button) */}
      <div className="flex items-center justify-between md:hidden p-3 z-50">
        <button
          className="text-gray-800 dark:text-gray-200"
          onClick={() => setOpen(true)}
        >
          <FaBars size={28} />
        </button>

        {mounted && (
          <button
            onClick={toggleTheme}
            className="hidden md:flex p-2 rounded-full bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-yellow-300 hover:scale-110 transition"
          >
            {theme === "light" ? <FiMoon size={22} /> : <FiSun size={22} />}
          </button>
        )}
      </div>

      {/* -----------  OVERLAY (Mobile Only) ----------- */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm md:hidden z-30"
          onClick={() => setOpen(false)}
        />
      )}
      {/* --------------------------------------------- */}

      {/* Sidebar */}
      <aside
        className={`
      fixed top-0 left-0 h-full w-64 
      bg-[#F8FAFC] dark:bg-gray-900
      text-black dark:text-white 
      p-5 shadow-xl 
      transition-transform duration-300 z-40
      ${open ? "translate-x-0" : "-translate-x-full"} 
      md:translate-x-0
    `}
      >
        {/* Profile + Theme Toggle */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center space-x-3">
            <div className="bg-black dark:bg-gray-700 text-white w-12 h-12 flex items-center justify-center rounded-lg text-xl font-bold">
              {state.username || "np"}
            </div>
            <h1 className="text-lg md:text-xl font-bold text-black dark:text-white break-all">
              {state.email}
            </h1>
          </div>

          {/* Desktop Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="hidden md:flex p-2 rounded-full bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-yellow-300 hover:scale-110 transition"
          >
            {theme === "light" ? <FiMoon size={22} /> : <FiSun size={22} />}
          </button>
        </div>

        {/* Menu */}
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.link;

            return (
              <Link
                key={item.name}
                href={item.link}
                onClick={() => setOpen(false)} // closes sidebar after navigation
                className={`
              flex items-center space-x-3 
              px-4 py-3 rounded-lg 
              text-base md:text-lg
              transition
              ${
                isActive
                  ? "bg-white dark:bg-gray-800 text-sky-600 font-semibold border-r-4 border-sky-500 shadow"
                  : "hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-sky-500"
              }
            `}
              >
                <span
                  className={`${
                    isActive ? "text-sky-600" : "text-black dark:text-gray-300"
                  }`}
                >
                  {item.icon}
                </span>
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
