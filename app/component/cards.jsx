"use client";
import Image from "next/image";

export default function Card({ user }) {
  return (
    <div
      className="
    bg-white dark:bg-gray-900 
    shadow-lg rounded-xl p-6 
    flex flex-col space-y-3 
    transform transition-transform duration-300 
    hover:scale-105 hover:shadow-2xl cursor-pointer
    text-gray-800 dark:text-gray-100
  "
    >
      <h2
        className="
      text-xl font-semibold 
      text-gray-800 dark:text-gray-100 
      transition-colors duration-300 
      hover:text-blue-600 dark:hover:text-blue-400
    "
      >
        {user.name || `${user.first_name} ${user.last_name}`}
      </h2>

      <p className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors duration-200">
        <strong className="text-gray-800 dark:text-gray-200">Email:</strong>{" "}
        {user.email}
      </p>

      <p className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors duration-200">
        <strong className="text-gray-800 dark:text-gray-200">Username:</strong>{" "}
        {user.username}
      </p>

      <p className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors duration-200">
        <strong className="text-gray-800 dark:text-gray-200">Age:</strong>{" "}
        {user.age}
      </p>

      <p className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors duration-200">
        <strong className="text-gray-800 dark:text-gray-200">Status:</strong>{" "}
        {user.is_active ? "Active" : "Inactive"}
      </p>

      <p className="text-gray-500 dark:text-gray-400 text-sm">
        <strong className="text-gray-700 dark:text-gray-300">Joined:</strong>{" "}
        {user.date_joined}
      </p>
    </div>
  );
}
