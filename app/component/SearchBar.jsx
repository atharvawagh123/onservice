'use client';

import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { MdOutlineCancel } from 'react-icons/md';

export default function SearchBar({
  value,
  onChange,
  onSearch,
  debounceTime = 1000,
  fetchservice,
}) {
  const [timer, setTimer] = useState(null);

  const handleChange = e => {
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
    <div className="mx-auto max-w-xl">
      <div className="relative flex items-center rounded-full border border-gray-300 bg-white transition-all duration-200 focus-within:border-sky-500 focus-within:ring-2 focus-within:ring-sky-500 hover:shadow-md dark:border-gray-600 dark:bg-gray-800">
        {/* Search Icon */}
        <span className="cursor-pointer pl-4 text-gray-500 dark:text-gray-400">
          <FaSearch className="text-2xl" onClick={() => onSearch(value)} />
        </span>

        {/* Input Field */}
        <input
          type="text"
          value={value}
          onChange={handleChange}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              onSearch(value);
            }
          }}
          placeholder="Search services..."
          className="w-full rounded-full bg-transparent px-3 py-3 text-gray-700 placeholder-gray-400 focus:outline-none dark:text-gray-200 dark:placeholder-gray-500"
        />

        {/* Clear Button */}
        {value.length > 0 && (
          <span className="cursor-pointer pr-4 text-gray-500 dark:text-gray-400">
            <MdOutlineCancel
              className="text-2xl"
              onClick={() => {
                onChange('');
                fetchservice();
              }}
            />
          </span>
        )}
      </div>
    </div>
  );
}
