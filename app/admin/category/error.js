'use client';

export default function ErrorPage({ error, reset }) {
  return (
    <div className="p-10 text-center">
      <h1 className="text-3xl font-bold text-red-600">Something went wrong</h1>
      <p className="mt-3 text-gray-600">{error.message}</p>

      <button
        onClick={() => reset()}
        className="mt-6 rounded-lg bg-blue-600 px-6 py-2 text-white"
      >
        Try Again
      </button>
    </div>
  );
}
