"use client";

import { useState } from "react";
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

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const state = useSelector((state) => state.Admin);

  const pathname = usePathname(); // ⭐ detect active route

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
      {/* Mobile Toggle */}
      <button className="md:hidden p-3 z-50" onClick={() => setOpen(!open)}>
        {open ? <FaTimes size={28} /> : <FaBars size={28} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 
        bg-[#F8FAFC] text-black p-5 shadow-xl
        transition-transform duration-300 z-40
        ${open ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex items-center space-x-3 mb-10">
          <div className="bg-black text-white w-10 h-10 flex items-center justify-center rounded-lg text-xl font-bold">
            {state.username || "np"}
          </div>
          <h1 className="text-2xl font-bold text-black">{state.email}</h1>
        </div>

        {/* Menu */}
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.link;

            return (
              <Link
                key={item.name}
                href={item.link}
                onClick={() => setOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg relative
                  
                  ${
                    isActive
                      ? "bg-white text-sky-600 font-semibold border-r-4 border-sky-500 shadow-sm"
                      : "hover:bg-gray-200 hover:text-sky-600"
                  }
                `}
              >
                <span className={`${isActive ? "text-sky-600" : "text-black"}`}>
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
