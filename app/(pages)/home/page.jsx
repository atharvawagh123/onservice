'use client';
import Link from 'next/link';

export default function HomePage() {
  if (typeof localStorage !== 'undefined') {
    console.log(localStorage);
  }
  console.log('Home Page Rendered');

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-6 py-12 text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      {/* Welcome Heading */}
      <h1 className="mb-6 transform text-5xl font-extrabold text-gray-800 transition-transform duration-500 hover:scale-105 md:text-6xl dark:text-gray-100">
        Welcome to Our App
      </h1>

      {/* Subtitle */}
      <p className="mb-10 max-w-xl text-center text-lg text-gray-600 opacity-80 transition-opacity duration-500 hover:opacity-100 md:text-xl dark:text-gray-300">
        Explore the features, learn more about our services, and enjoy a smooth
        interactive experience.
      </p>

      {/* Call-to-Action Buttons */}
      <div className="flex flex-col gap-6 sm:flex-row">
        <Link
          href="/signup"
          className="transform rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white shadow-md transition-all duration-300 hover:scale-105 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
        >
          Get Started
        </Link>

        <Link
          href="/about"
          className="transform rounded-lg border border-blue-600 px-8 py-3 font-semibold text-blue-600 transition-all duration-300 hover:scale-105 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-gray-800"
        >
          Learn More
        </Link>
      </div>

      {/* Feature Cards */}
      <div className="mt-16 grid w-full max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
        {['Fast', 'Secure', 'Reliable'].map((feature, idx) => (
          <div
            key={idx}
            className="transform rounded-xl bg-white p-6 text-center text-gray-800 shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl dark:bg-gray-900 dark:text-gray-100"
          >
            <h3 className="mb-2 text-2xl font-bold">{feature}</h3>

            <p className="text-gray-500 dark:text-gray-400">
              {feature} experience you can trust with all your applications and
              data.
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
