import React from 'react';

const page = () => {
  return (
    <div>
      <div className="w-80 rounded-xl bg-white p-10 text-center shadow-xl transition duration-300 dark:bg-gray-800">
        <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
          Welcome Back! 👋
        </h1>

        <p className="text-gray-600 dark:text-gray-300">
          You are successfully logged in.
        </p>
      </div>
    </div>
  );
};

export default page;
