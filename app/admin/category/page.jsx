"use client";

import CategoryTableRow from "../../component/CategoryTableRow";
import { deletecategory, fetchcategory } from "../../customhook/category";
import { toast } from "react-toastify";
import { IoAddCircleSharp } from "react-icons/io5";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCategories,
  setlimitcategory,
  setpage,
  removeCategory,
} from "../../store/Categoryslice";
import { useQuery, useMutation } from "@tanstack/react-query";
import { FcPrevious } from "react-icons/fc";
import { FcNext } from "react-icons/fc";

const Category = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.Categories.categories);
  const limitrange = useSelector((state) => state.Categories.limit);
  const totalPages = useSelector((state) => state.Categories.totalPages);
  const page = useSelector((state) => state.Categories.page);
  const totalCategories = useSelector(
    (state) => state.Categories.totalCategories,
  );
  const { data, isLoading, isError } = useQuery({
    queryKey: ["categories", page, limitrange],
    queryFn: () => fetchcategory(page, limitrange),
    staleTime: 5 * 60 * 1000, // 5 minutes: data stays fresh for 5 min
    cacheTime: 30 * 60 * 1000, // 30 minutes: unused data stays in cache before garbage collection
    keepPreviousData: true,
  });

  useEffect(() => {
    console.log("fetching cat for admin", data);
    if (data) {
      dispatch(setCategories(data));
    }
  }, [dispatch, data]);

  const deletecatmutation = useMutation({
    mutationFn: async (id) => {
      const response = await deletecategory(id);
      // console.log(response);
      return response;
    },
    onSuccess: (response) => {
      // console.log("onsuccess mutation", response);
      if (response.success) {
        toast.success(response.message);
        dispatch(removeCategory(response.category.id));
      }
    },
  });

  const moveprevious = () => dispatch(setpage(page - 1));
  const movenext = () => dispatch(setpage(page + 1));

  if (isError) {
    return <>Error</>;
  }

  return (
    <>
      {/* Header Section */}
      <div className="mb-10 flex flex-col md:flex-row items-start md:items-center justify-between bg-white dark:bg-gray-900 p-6 rounded-xl shadow gap-4">
        <div>
          <h1 className="font-serif italic text-4xl text-gray-900 dark:text-gray-200">
            All Categories in OnService
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage all categories
          </p>
        </div>

        <div className="bg-gray-100 dark:bg-gray-800 px-5 py-3 rounded-xl shadow-inner">
          <p className="text-gray-700 dark:text-gray-200 font-medium text-lg">
            Total Categories
          </p>
          <h2 className="text-1xl font-bold text-gray-900 dark:text-gray-100">
            {totalCategories}
          </h2>
        </div>
      </div>

      {/* Add Category Button */}
      <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <h1 className="text-3xl font-serif italic text-black dark:text-gray-200">
          Add Category
        </h1>
        <Link
          href="./category/addcategory"
          className="flex items-center justify-center gap-2 px-4 py-2 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-600"
        >
          <IoAddCircleSharp size={24} />
          Add category
        </Link>
      </div>

      {/* Range Selector */}
      <div className="flex flex-col items-center gap-2 mb-6">
        <input
          type="range"
          min={5}
          max={20}
          value={limitrange}
          onChange={(e) => dispatch(setlimitcategory(parseInt(e.target.value)))}
          className="w-64"
        />
        <span className="text-black dark:text-gray-200 font-semibold">
          Selected Value: {limitrange}
        </span>
      </div>

      {/* Categories Table */}
      <div className="overflow-x-auto mb-10">
        <table className="min-w-full bg-white dark:bg-gray-900 rounded-xl shadow-md border">
          <thead className="bg-gray-100 dark:bg-gray-800 border-b">
            <tr>
              <th className="px-6 py-3 text-black dark:text-gray-200">#</th>
              <th className="px-6 py-3 text-black dark:text-gray-200">Name</th>
              <th className="px-6 py-3 text-black dark:text-gray-200">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {isLoading && !data ? (
              <tr>
                <td colSpan="3">
                  <div className="flex justify-center p-10">
                    <div className="animate-spin w-6 h-6 border-3 border-current border-t-transparent text-red-600 rounded-full" />
                  </div>
                </td>
              </tr>
            ) : categories?.length > 0 ? (
              categories.map((category, index) => (
                <CategoryTableRow
                  key={index}
                  category={category}
                  index={index}
                  deletecat={deletecatmutation.mutate}
                  darkMode={true} // pass darkMode prop if needed in row component
                />
              ))
            ) : (
              <tr>
                <td
                  colSpan="3"
                  className="text-center py-4 text-gray-500 dark:text-gray-400"
                >
                  No category found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="w-full p-4 md:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 my-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
          {/* Previous Button */}
          <button
            disabled={page === 1}
            onClick={moveprevious}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition
                  bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed
                  dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          >
            <FcPrevious size={16} />
            Previous
          </button>

          {/* Page Counter */}
          <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Page {page} / {totalPages}
          </p>

          {/* Next Button */}
          <button
            disabled={page === totalPages}
            onClick={movenext}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition
                  bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed
                  dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          >
            Next
            <FcNext size={16} />
          </button>
        </div>
      </div>
    </>
  );
};

export default Category;
