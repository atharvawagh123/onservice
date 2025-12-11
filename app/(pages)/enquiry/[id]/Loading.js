const Loading = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="w-full p-4 sm:p-6 bg-white dark:bg-gray-800 shadow-md rounded-xl border border-gray-200 dark:border-gray-700 animate-pulse space-y-3"
        >
          {/* Title */}
          <div className="h-6 sm:h-7 bg-gray-200 dark:bg-gray-700 rounded w-2/5 mb-2"></div>

          {/* Name */}
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/5"></div>

          {/* Email */}
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5"></div>

          {/* Phone */}
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>

          {/* Message */}
          <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>

          {/* Service ID */}
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>

          {/* Status */}
          <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>

          {/* Created At */}
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/5"></div>

          {/* Updated At */}
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/5"></div>

          {/* User ID */}
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
        </div>
      ))}
    </div>
  );
};

export default Loading;
