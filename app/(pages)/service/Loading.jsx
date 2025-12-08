"use client";

export default function Loading({ count = 6 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-white shadow-md rounded-lg p-6 animate-pulse flex flex-col"
        >
          <div className="h-6 bg-gray-300 rounded w-3/4 mb-3"></div>
          <div className="h-4 bg-gray-300 rounded mb-2"></div>
          <div className="h-4 bg-gray-300 rounded mb-2"></div>
          <div className="h-5 bg-gray-300 rounded w-1/2 mt-auto"></div>
        </div>
      ))}
    </>
  );
}
