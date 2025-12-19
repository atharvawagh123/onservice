'use client';

export default function Loading({ count = 6 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="flex animate-pulse flex-col rounded-lg bg-white p-6 shadow-md"
        >
          <div className="mb-3 h-6 w-3/4 rounded bg-gray-300"></div>
          <div className="mb-2 h-4 rounded bg-gray-300"></div>
          <div className="mb-2 h-4 rounded bg-gray-300"></div>
          <div className="mt-auto h-5 w-1/2 rounded bg-gray-300"></div>
        </div>
      ))}
    </>
  );
}
