import React from "react";

const page = () => {
  return (
    <div>
      <div className="p-10 bg-white dark:bg-gray-800 rounded-xl shadow-xl text-center w-80 transition duration-300">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
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
