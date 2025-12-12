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
} from "../../store/Categoryslice";

const Category = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.Categories.categories);
  const limitrange = useSelector((state) => state.Categories.limit);
  const totalPages = useSelector((state) => state.Categories.totalPages);
  const page = useSelector((state) => state.Categories.page);
  const loading = useSelector((state) => state.Categories.loading);
  const totalCategories = useSelector(
    (state) => state.Categories.totalCategories,
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      const loadcategory = async () => {
        const res = await fetchcategory(page, limitrange);

        if (res.success) {
          dispatch(
            setCategories({
              categories: res.categories,
              page: res.page,
              limit: res.limit,
              totalCategories: res.totalCategories,
              totalPages: res.totalPages,
            }),
          );
        }
      };
      loadcategory();
    }, 300);

    return () => clearTimeout(timer);
  }, [page, limitrange, dispatch]); // <-- FIX: include dispatch

  const deletecat = async (id) => {
    if (!id) {
      toast.error("category id is not available");
      return;
    }
    return await deletecategory(id);
  };

  const moveprevious = () => dispatch(setpage(page - 1));
  const movenext = () => dispatch(setpage(page + 1));

  return (
    <>
      <div className="mb-10 flex items-center justify-between bg-white p-6 rounded-xl shadow">
        <div>
          <h1 className="font-serif italic text-4xl text-gray-900">
            All Categories in OnService
          </h1>
          <p className="text-gray-600 mt-1">Manage all categories</p>
        </div>

        <div className="bg-gray-100 px-5 py-3 rounded-xl shadow-inner">
          <p className="text-gray-700 font-medium text-lg">Total Categories</p>
          <h2 className="text-1xl font-bold text-gray-900">
            {totalCategories}
          </h2>
        </div>
      </div>

      <div className="w-full flex items-center justify-between mb-6">
        <h1 className="text-3xl font-serif italic text-black">Add Category</h1>
        <Link
          href="./category/addcategory"
          className="flex items-center justify-center gap-2 px-4 py-2 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-600"
        >
          <IoAddCircleSharp size={24} />
          Add category
        </Link>
      </div>

      <div className="flex flex-col items-center gap-2">
        <input
          type="range"
          min={5}
          max={20}
          value={limitrange}
          onChange={(e) => dispatch(setlimitcategory(parseInt(e.target.value)))}
          className="w-64"
        />
        <span className="text-black font-semibold">
          Selected Value: {limitrange}
        </span>
      </div>

      <div className="overflow-x-auto mb-10">
        <table className="min-w-full bg-white rounded-xl shadow-md border">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-6 py-3 text-black">#</th>
              <th className="px-6 py-3 text-black">Name</th>
              <th className="px-6 py-3 text-black">Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="3">
                  <div className="flex justify-center p-10">
                    <div className="animate-spin size-6 border-3 border-current border-t-transparent text-red-600 rounded-full" />
                  </div>
                </td>
              </tr>
            ) : categories?.length > 0 ? (
              categories.map((category, index) => (
                <CategoryTableRow
                  key={index}
                  category={category}
                  index={index}
                  deletecat={deletecat}
                />
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-4 text-gray-500">
                  No category found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="w-full flex justify-center gap-5 my-5">
          <button
            disabled={page === 1}
            className="text-black disabled:text-gray-400"
            onClick={moveprevious}
          >
            Previous
          </button>

          <button
            disabled={page === totalPages}
            className="text-black disabled:text-gray-400"
            onClick={movenext}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Category;
