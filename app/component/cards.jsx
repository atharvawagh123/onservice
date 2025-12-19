'use client';
import Image from 'next/image';

export default function Card({ user }) {
  return (
    <div className="flex transform cursor-pointer flex-col space-y-3 rounded-xl bg-white p-6 text-gray-800 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl dark:bg-gray-900 dark:text-gray-100">
      <h2 className="text-xl font-semibold text-gray-800 transition-colors duration-300 hover:text-blue-600 dark:text-gray-100 dark:hover:text-blue-400">
        {user.name || `${user.first_name} ${user.last_name}`}
      </h2>

      <p className="text-gray-600 transition-colors duration-200 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100">
        <strong className="text-gray-800 dark:text-gray-200">Email:</strong>{' '}
        {user.email}
      </p>

      <p className="text-gray-600 transition-colors duration-200 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100">
        <strong className="text-gray-800 dark:text-gray-200">Username:</strong>{' '}
        {user.username}
      </p>

      <p className="text-gray-600 transition-colors duration-200 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100">
        <strong className="text-gray-800 dark:text-gray-200">Age:</strong>{' '}
        {user.age}
      </p>

      <p className="text-gray-600 transition-colors duration-200 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100">
        <strong className="text-gray-800 dark:text-gray-200">Status:</strong>{' '}
        {user.is_active ? 'Active' : 'Inactive'}
      </p>

      <p className="text-sm text-gray-500 dark:text-gray-400">
        <strong className="text-gray-700 dark:text-gray-300">Joined:</strong>{' '}
        {user.date_joined}
      </p>
    </div>
  );
}
