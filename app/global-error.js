'use client';

export default function GlobalError({ error, reset }) {
  console.error(error); // Optional: logs the error

  return (
    <html>
      <body className="flex min-h-screen w-full items-center justify-center bg-gray-100 p-6 dark:bg-gray-900">
        <div className="animate-fadeIn max-w-md rounded-lg bg-white p-8 text-center shadow-xl dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
            Something went wrong
          </h2>

          <p className="mb-6 text-gray-600 dark:text-gray-300">
            An unexpected error occurred. You can try again.
          </p>

          <button
            onClick={() => reset()}
            className="rounded-md bg-blue-600 px-6 py-2 font-medium text-white transition hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
