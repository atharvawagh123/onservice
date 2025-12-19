import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
      <h1 className="mb-6 text-9xl font-extrabold text-gray-200">404</h1>

      <h2 className="mb-4 text-3xl font-bold text-gray-800">Page Not Found</h2>

      <p className="mb-8 max-w-md text-center text-gray-500">
        Oops! The page you are looking for does not exist or has been moved.
      </p>

      <Link
        href="/"
        className="rounded-md bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700"
      >
        Go Back Home
      </Link>
    </div>
  );
}
