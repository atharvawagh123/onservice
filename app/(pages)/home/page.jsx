"use client";
import Link from "next/link";

export default function HomePage() {
  if (typeof localStorage !== "undefined") {
    console.log(localStorage);
  }
  console.log("Home Page Rendered");

  return (
    <main
      className="flex flex-col items-center justify-center min-h-screen 
                 bg-gray-50 dark:bg-gray-950 
                 px-6 py-12 text-gray-900 dark:text-gray-100"
    >
      {/* Welcome Heading */}
      <h1
        className="text-5xl md:text-6xl font-extrabold 
               text-gray-800 dark:text-gray-100 
               mb-6 transform transition-transform duration-500 hover:scale-105"
      >
        Welcome to Our App
      </h1>

      {/* Subtitle */}
      <p
        className="text-lg md:text-xl 
               text-gray-600 dark:text-gray-300 
               mb-10 opacity-80 transition-opacity duration-500 
               hover:opacity-100 text-center max-w-xl"
      >
        Explore the features, learn more about our services, and enjoy a smooth
        interactive experience.
      </p>

      {/* Call-to-Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-6">
        <Link
          href="/signup"
          className="px-8 py-3 
                 bg-blue-600 dark:bg-blue-700 
                 text-white font-semibold rounded-lg 
                 shadow-md hover:bg-blue-700 dark:hover:bg-blue-800 
                 transform hover:scale-105 transition-all duration-300"
        >
          Get Started
        </Link>

        <Link
          href="/about"
          className="px-8 py-3 border 
                 border-blue-600 dark:border-blue-400 
                 text-blue-600 dark:text-blue-400 
                 font-semibold rounded-lg 
                 hover:bg-blue-50 dark:hover:bg-gray-800 
                 transform hover:scale-105 transition-all duration-300"
        >
          Learn More
        </Link>
      </div>

      {/* Feature Cards */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {["Fast", "Secure", "Reliable"].map((feature, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-gray-900 
                   p-6 rounded-xl shadow-lg text-center 
                   text-gray-800 dark:text-gray-100
                   transform transition-transform duration-300 
                   hover:-translate-y-2 hover:shadow-2xl"
          >
            <h3 className="text-2xl font-bold mb-2">{feature}</h3>

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
