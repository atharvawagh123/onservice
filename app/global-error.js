"use client";

export default function GlobalError({ error, reset }) {
  console.error(error); // Optional: logs the error

  return (
    <html>
      <body className="min-h-screen w-full flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-6">
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8 max-w-md text-center animate-fadeIn">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Something went wrong
          </h2>

          <p className="text-gray-600 dark:text-gray-300 mb-6">
            An unexpected error occurred. You can try again.
          </p>

          <button
            onClick={() => reset()}
            className="
              px-6 py-2 rounded-md bg-blue-600 text-white font-medium
              hover:bg-blue-700 transition 
              dark:bg-blue-500 dark:hover:bg-blue-600
            "
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
