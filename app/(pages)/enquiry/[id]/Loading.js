const Loading = () => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="w-full animate-pulse space-y-3 rounded-xl border border-gray-200 bg-white p-4 shadow-md sm:p-6 dark:border-gray-700 dark:bg-gray-800"
        >
          {/* Title */}
          <div className="mb-2 h-6 w-2/5 rounded bg-gray-200 sm:h-7 dark:bg-gray-700"></div>

          {/* Name */}
          <div className="h-4 w-3/5 rounded bg-gray-200 dark:bg-gray-700"></div>

          {/* Email */}
          <div className="h-4 w-4/5 rounded bg-gray-200 dark:bg-gray-700"></div>

          {/* Phone */}
          <div className="h-4 w-1/2 rounded bg-gray-200 dark:bg-gray-700"></div>

          {/* Message */}
          <div className="h-12 w-full rounded bg-gray-200 dark:bg-gray-700"></div>

          {/* Service ID */}
          <div className="h-4 w-1/4 rounded bg-gray-200 dark:bg-gray-700"></div>

          {/* Status */}
          <div className="h-5 w-1/3 rounded bg-gray-200 dark:bg-gray-700"></div>

          {/* Created At */}
          <div className="h-4 w-2/5 rounded bg-gray-200 dark:bg-gray-700"></div>

          {/* Updated At */}
          <div className="h-4 w-2/5 rounded bg-gray-200 dark:bg-gray-700"></div>

          {/* User ID */}
          <div className="h-4 w-1/3 rounded bg-gray-200 dark:bg-gray-700"></div>
        </div>
      ))}
    </div>
  );
};

export default Loading;
