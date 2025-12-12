"use client";

export default function ErrorPage({ error, reset }) {
  return (
    <div className="p-10 text-center">
      <h1 className="text-3xl font-bold text-red-600">Something went wrong</h1>
      <p className="text-gray-600 mt-3">{error.message}</p>

      <button
        onClick={() => reset()}
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg"
      >
        Try Again
      </button>
    </div>
  );
}
