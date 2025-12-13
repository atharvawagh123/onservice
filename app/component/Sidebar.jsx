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
import { FiLogOut } from "react-icons/fi";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useAuthContext } from "../context/ContextProvider";
import { FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi";
import { GrUserAdmin } from "react-icons/gr";

export default function Sidebar() {
  const { logout } = useAuthContext();
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
  const handleLogout = () => {
    logout();
  };

  const menuItems = [
    { name: "User", icon: <FaUser />, link: "/admin/user" },
    { name: "Service", icon: <FaServicestack />, link: "/admin/service" },
    { name: "Category", icon: <FaList />, link: "/admin/category" },
    { name: "SubAdmin", icon: <GrUserAdmin />, link: "/admin/subadmin" },
    { name: "Counter", icon: <FaCalculator />, link: "/admin/counter" },
    { name: "Enquiry", icon: <FaQuestionCircle />, link: "/admin/enquiry" },
  ];

  return (
    <>
      {/* ---------- Mobile Header ---------- */}
      <div className="flex items-center justify-between md:hidden p-3 z-50">
        <button
          className="text-gray-800 dark:text-gray-200"
          onClick={() => setOpen(true)}
        >
          <FaBars size={28} />
        </button>

        {/* ✅ MOBILE THEME TOGGLE (VISIBLE NOW) */}
        {mounted && (
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-yellow-300 hover:scale-110 transition"
          >
            {theme === "light" ? <FiMoon size={22} /> : <FiSun size={22} />}
          </button>
        )}
      </div>

      {/* ---------- Overlay ---------- */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm md:hidden z-30"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ---------- Sidebar ---------- */}
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
        {/* ---------- Profile + Desktop Theme ---------- */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center space-x-3">
            {/* ✅ FIXED IMAGE */}
            <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
              {state?.imageurl ? (
                <img
                  src={state.imageurl}
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-lg font-bold text-white">
                  {state?.email?.[0]?.toUpperCase() || "U"}
                </span>
              )}
            </div>

            <h1 className="text-sm md:text-base font-bold break-all">
              {state?.email || "User"}
            </h1>
          </div>

          {/* Desktop Theme Toggle */}
          {mounted && (
            <button
              onClick={toggleTheme}
              className="hidden md:flex p-2 rounded-full bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-yellow-300 hover:scale-110 transition"
            >
              {theme === "light" ? <FiMoon size={22} /> : <FiSun size={22} />}
            </button>
          )}
        </div>

        {/* ---------- Menu ---------- */}
        <nav className="space-y-2 flex-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.link;

            return (
              <Link
                key={item.name}
                href={item.link}
                onClick={() => setOpen(false)}
                className={`
              flex items-center space-x-3
              px-4 py-3 rounded-lg
              transition
              ${
                isActive
                  ? "bg-white dark:bg-gray-800 text-sky-600 font-semibold border-r-4 border-sky-500 shadow"
                  : "hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-sky-500"
              }
            `}
              >
                <span
                  className={
                    isActive ? "text-sky-600" : "text-black dark:text-gray-300"
                  }
                >
                  {item.icon}
                </span>
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* ---------- Logout ---------- */}
        <button
          onClick={handleLogout}
          className="
        mt-10 w-full flex items-center gap-3
        px-4 py-3 rounded-lg
        text-red-600 dark:text-red-400
        hover:bg-red-100 dark:hover:bg-red-900/30
        transition
      "
        >
          <FiLogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </aside>
    </>
  );
}
