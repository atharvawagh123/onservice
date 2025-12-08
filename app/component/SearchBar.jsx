"use client";

import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";

export default function SearchBar({
  value,
  onChange,
  onSearch,
  debounceTime = 1000,
  fetchservice,
}) {
  const [timer, setTimer] = useState(null);

  const handleChange = (e) => {
    const inputValue = e.target.value;

    onChange(inputValue); // lift value to parent

    // Clear old debounce timer
    if (timer) clearTimeout(timer);

    // Debounce handling
    const newTimer = setTimeout(() => {
      if (inputValue.trim().length === 0) {
        fetchservice();
      }
      if (inputValue.trim().length >= 1) {
        onSearch(inputValue.trim());
      }
    }, debounceTime);

    setTimer(newTimer);
  };

  return (
    <div className="max-w-xl mx-auto">
      <div className="relative flex items-center rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 transition-all duration-200 hover:shadow-md focus-within:ring-2 focus-within:ring-sky-500 focus-within:border-sky-500">
        {/* Search Icon */}
        <span className="pl-4 text-gray-500 dark:text-gray-400 cursor-pointer">
          <FaSearch className="text-2xl" onClick={() => onSearch(value)} />
        </span>

        {/* Input Field */}
        <input
          type="text"
          value={value}
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSearch(value);
            }
          }}
          placeholder="Search services..."
          className="w-full bg-transparent focus:outline-none px-3 py-3 text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 rounded-full"
        />

        {/* Clear Button */}
        {value.length > 0 && (
          <span className="pr-4 text-gray-500 dark:text-gray-400 cursor-pointer">
            <MdOutlineCancel
              className="text-2xl"
              onClick={() => {
                onChange("");
                fetchservice();
              }}
            />
          </span>
        )}
      </div>
    </div>
  );
}
