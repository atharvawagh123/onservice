'use client';

import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="py-8 text-gray-800 transition-colors duration-300 dark:bg-gray-900 dark:text-gray-200">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 px-4 md:flex-row">
        {/* Logo / Brand */}
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            MyBrand
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} MyBrand. All rights reserved.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-gray-900 dark:text-white">
            Quick Links
          </h3>
          <Link
            href="/"
            className="transition hover:text-blue-600 dark:hover:text-blue-400"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="transition hover:text-blue-600 dark:hover:text-blue-400"
          >
            About
          </Link>
          <Link
            href="/services"
            className="transition hover:text-blue-600 dark:hover:text-blue-400"
          >
            Services
          </Link>
          <Link
            href="/contact"
            className="transition hover:text-blue-600 dark:hover:text-blue-400"
          >
            Contact
          </Link>
        </div>

        {/* Social Icons */}
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-gray-900 dark:text-white">
            Follow Us
          </h3>
          <div className="flex gap-3 text-gray-600 dark:text-gray-400">
            <a
              href="#"
              className="transition hover:text-blue-600 dark:hover:text-blue-400"
            >
              <FaFacebookF size={18} />
            </a>
            <a
              href="#"
              className="transition hover:text-blue-600 dark:hover:text-blue-400"
            >
              <FaTwitter size={18} />
            </a>
            <a
              href="#"
              className="transition hover:text-blue-600 dark:hover:text-blue-400"
            >
              <FaInstagram size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
