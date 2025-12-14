"use client";

import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";

export default function UniversalSearchBar({
  value,
  onSearch,
  debounceTime = 200,
  fetchDefault, // function to fetch default data when input cleared
  placeholder = "Search..",
}) {
  const [timer, setTimer] = useState(null);

  const handleChange = (e) => {
    const inputValue = e.target.value;

    // Clear previous debounce
    if (timer) clearTimeout(timer);

    const newTimer = setTimeout(() => {
      if (inputValue.trim().length === 0) {
        fetchDefault && fetchDefault();
      } else {
        onSearch(inputValue.trim());
      }
    }, debounceTime);

    setTimer(newTimer);
  };

  // Optional: clear timer on unmount
  useEffect(() => {
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [timer]);

  return (
    <div className="max-w-xl mx-auto">
      <div
        className="flex items-center gap-3 px-5 py-3 rounded-full 
                  border border-gray-300 dark:border-gray-700
                  bg-white dark:bg-gray-900
                  focus-within:ring-1 focus-within:ring-gray-400
                  transition"
      >
        {/* Search Icon */}
        <FaSearch
          className="text-gray-500 dark:text-gray-400 cursor-pointer"
          onClick={() => onSearch(value)}
        />

        {/* Input */}
        <input
          type="text"
          value={value}
          onChange={handleChange}
          onKeyDown={(e) => e.key === "Enter" && onSearch(value)}
          placeholder={placeholder}
          className="w-full bg-transparent focus:outline-none
                 text-gray-900 dark:text-gray-100
                 placeholder-gray-400 dark:placeholder-gray-500
                 font-serif italic"
        />

        {/* Clear */}
        {value.length > 0 && (
          <MdOutlineCancel
            className="text-gray-400 dark:text-gray-500 cursor-pointer hover:text-gray-600"
            onClick={() => fetchDefault && fetchDefault()}
          />
        )}
      </div>
    </div>
  );
}
