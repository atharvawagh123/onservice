'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useAuthContext } from '../context/ContextProvider';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';
import { IoLogOut } from 'react-icons/io5';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
// import { useSelector } from "react-redux";

const Navbar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme, isLogin, logout } = useAuthContext();
  // const name = useSelector((state) => state.user.name);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const load = async () => {
      setMounted(true); // Runs only on client
    };
    load();
  }, []);

  const linkClass = path =>
    pathname.startsWith(path)
      ? 'text-blue-600 dark:text-blue-400 font-semibold border-b-2 border-blue-600 dark:border-blue-400 pb-1'
      : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition';

  const handleLogout = () => {
    const response = logout();
    if (response.success) toast.success(response.message);
    else toast.error('Error in logout!');
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white shadow-md transition-colors duration-300 dark:bg-gray-900">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
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
          className="p-2 text-gray-800 md:hidden dark:text-gray-200"
        >
          {open ? <FiX size={26} /> : <FiMenu size={26} />}
        </button>

        {/* Menu */}
        <div
          className={`${
            open ? 'flex' : 'hidden'
          } absolute top-full right-0 w-full flex-col items-center gap-6 bg-white p-4 shadow-md transition-all duration-300 md:static md:flex md:w-auto md:flex-row md:p-0 md:shadow-none dark:bg-gray-900`}
        >
          {/* Links */}
          <ul className="flex flex-col gap-4 md:flex-row md:gap-8">
            <li>
              <Link href="/home" className={linkClass('/home')}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className={linkClass('/about')}>
                About
              </Link>
            </li>
            <li>
              <Link href="/service" className={linkClass('/service')}>
                Services
              </Link>
            </li>
            <li>
              <Link href="/profile" className={linkClass('/profile')}>
                Profile
              </Link>
            </li>
          </ul>

          {/* Theme Toggle Icon */}
          {mounted && (
            <button
              onClick={toggleTheme}
              className="rounded-full bg-gray-200 p-2 text-gray-800 transition hover:scale-110 dark:bg-gray-800 dark:text-gray-200"
            >
              {theme === 'light' ? <FiMoon size={22} /> : <FiSun size={22} />}
            </button>
          )}

          {/* {name && (
            <span className="text-gray-800 dark:text-gray-200 font-medium">
              {name}
            </span>
          )} */}

          {/* Auth Buttons */}
          <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row">
            {mounted &&
              (isLogin ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 rounded-md bg-yellow-600 px-5 py-2 text-white transition hover:bg-red-700"
                >
                  <IoLogOut size={20} /> Logout
                </button>
              ) : (
                <div className="flex flex-col gap-3 md:flex-row">
                  <Link
                    href="/login"
                    className="rounded-md border border-blue-600 px-5 py-2 text-blue-600 transition hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-gray-800"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="rounded-md bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700 dark:bg-blue-700"
                  >
                    Sign Up
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
