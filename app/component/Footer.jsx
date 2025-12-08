"use client";

import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { useAuthContext } from "../context/ContextProvider";

const Footer = () => {
  const { theme } = useAuthContext(); // use theme from context if needed

  return (
    <footer className="  dark:bg-gray-900 text-gray-800 dark:text-gray-200 py-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between gap-8">

        {/* Logo / Brand */}
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">MyBrand</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} MyBrand. All rights reserved.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-gray-900 dark:text-white">Quick Links</h3>
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
            Home
          </Link>
          <Link href="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
            About
          </Link>
          <Link href="/services" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
            Services
          </Link>
          <Link href="/contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
            Contact
          </Link>
        </div>

        {/* Social Icons */}
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-gray-900 dark:text-white">Follow Us</h3>
          <div className="flex gap-3 text-gray-600 dark:text-gray-400">
            <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
              <FaFacebookF size={18} />
            </a>
            <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
              <FaTwitter size={18} />
            </a>
            <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
              <FaInstagram size={18} />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
