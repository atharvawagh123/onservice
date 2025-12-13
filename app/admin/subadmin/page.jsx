import Link from "next/link";
import { IoAddCircleSharp } from "react-icons/io5";

const SubAdminpage = () => {
  return (
    <>
      <div className="mb-10 flex flex-col md:flex-row items-start md:items-center justify-between bg-white dark:bg-gray-900 p-6 rounded-xl shadow gap-4">
        <div>
          <h1 className="font-serif italic text-4xl text-gray-900 dark:text-gray-100">
            All Sub-Admin in OnService
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Manage and monitor all registered Sub-Admin
          </p>
        </div>

        <div className="bg-gray-100 dark:bg-gray-800 px-5 py-3 rounded-xl shadow-inner">
          <p className="text-gray-700 dark:text-gray-200 font-medium text-lg">
            Total Sub-Admin
          </p>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            0
          </h2>
        </div>
      </div>

      <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <h1 className="text-3xl font-serif italic text-black dark:text-gray-200">
          Add Subadmin
        </h1>
        <Link
          href="./subadmin/addsubadmin"
          className="flex items-center justify-center gap-2 px-4 py-2 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-600"
        >
          <IoAddCircleSharp size={24} />
          Add subadmin
        </Link>
      </div>
    </>
  );
};

export default SubAdminpage;
