'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import {
  FaBars,
  FaTimes,
  FaUser,
  FaServicestack,
  FaList,
  FaCalculator,
  FaQuestionCircle,
} from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { useAuthContext } from '../context/ContextProvider';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';
import { GrUserAdmin } from 'react-icons/gr';
import { CgProfile } from 'react-icons/cg';

export default function Sidebar() {
  const { logout } = useAuthContext();
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useAuthContext();
  const [mounted, setMounted] = useState(false);
  const state = useSelector(state => state.Admin);

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
    { name: 'User', icon: <FaUser />, link: '/admin/user' },
    { name: 'Service', icon: <FaServicestack />, link: '/admin/service' },
    { name: 'Category', icon: <FaList />, link: '/admin/category' },
    { name: 'SubAdmin', icon: <GrUserAdmin />, link: '/admin/subadmin' },
    { name: 'Counter', icon: <FaCalculator />, link: '/admin/counter' },
    { name: 'Enquiry', icon: <FaQuestionCircle />, link: '/admin/enquiry' },
    { name: 'Profile', icon: <CgProfile />, link: '/admin/profile' },
  ];

  return (
    <>
      {/* ---------- Mobile Header ---------- */}
      <div className="z-50 flex items-center justify-between p-3 md:hidden">
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
            className="rounded-full bg-gray-300 p-2 text-gray-900 transition hover:scale-110 dark:bg-gray-700 dark:text-yellow-300"
          >
            {theme === 'light' ? <FiMoon size={22} /> : <FiSun size={22} />}
          </button>
        )}
      </div>

      {/* ---------- Overlay ---------- */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ---------- Sidebar ---------- */}
      <aside
        className={`fixed top-0 left-0 z-40 h-full w-64 bg-[#F8FAFC] p-5 text-black shadow-xl transition-transform duration-300 dark:bg-gray-900 dark:text-white ${open ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        {/* ---------- Profile + Desktop Theme ---------- */}
        <div className="mb-10 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* ✅ FIXED IMAGE */}
            <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-lg bg-gray-300 dark:bg-gray-700">
              {state?.imageurl ? (
                <img
                  src={state.imageurl}
                  alt="profile"
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-lg font-bold text-white">
                  {state?.email?.[0]?.toUpperCase() || 'U'}
                </span>
              )}
            </div>

            <h1 className="text-sm font-bold break-all md:text-base">
              {state?.username || 'User'}
            </h1>
          </div>

          {/* Desktop Theme Toggle */}
          {mounted && (
            <button
              onClick={toggleTheme}
              className="hidden rounded-full bg-gray-300 p-2 text-gray-900 transition hover:scale-110 md:flex dark:bg-gray-700 dark:text-yellow-300"
            >
              {theme === 'light' ? <FiMoon size={22} /> : <FiSun size={22} />}
            </button>
          )}
        </div>

        {/* ---------- Menu ---------- */}
        <nav className="flex-1 space-y-2">
          {menuItems.map(item => {
            const isActive = pathname === item.link;

            return (
              <Link
                key={item.name}
                href={item.link}
                onClick={() => setOpen(false)}
                className={`flex items-center space-x-3 rounded-lg px-4 py-3 transition ${
                  isActive
                    ? 'border-r-4 border-sky-500 bg-white font-semibold text-sky-600 shadow dark:bg-gray-800'
                    : 'hover:bg-gray-200 hover:text-sky-500 dark:hover:bg-gray-700'
                } `}
              >
                <span
                  className={
                    isActive ? 'text-sky-600' : 'text-black dark:text-gray-300'
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
          className="mt-10 flex w-full items-center gap-3 rounded-lg px-4 py-3 text-red-600 transition hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900/30"
        >
          <FiLogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </aside>
    </>
  );
}
