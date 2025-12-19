'use client';

import CategoryTableRow from '../../component/CategoryTableRow';
import { deletecategory, fetchcategory } from '../../customhook/category';
import { toast } from 'react-toastify';
import { IoAddCircleSharp } from 'react-icons/io5';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCategories,
  setlimitcategory,
  setpage,
  removeCategory,
} from '../../store/Categoryslice';
import { useQuery, useMutation } from '@tanstack/react-query';
import { FcPrevious } from 'react-icons/fc';
import { FcNext } from 'react-icons/fc';
import UniversalSearchBar from '../../component/UniversalSearchBar';

const Category = () => {
  const dispatch = useDispatch();
  const categories = useSelector(state => state.Categories.categories);
  const limitrange = useSelector(state => state.Categories.limit);
  const totalPages = useSelector(state => state.Categories.totalPages);
  const page = useSelector(state => state.Categories.page);
  const [searchValue, setSearchValue] = useState('');
  const totalCategories = useSelector(
    state => state.Categories.totalCategories
  );
  const { data, isLoading, isError } = useQuery({
    queryKey: ['categories', searchValue, page, limitrange],
    queryFn: () => fetchcategory(page, limitrange, searchValue),
    staleTime: 5 * 60 * 1000, // 5 minutes: data stays fresh for 5 min
    cacheTime: 30 * 60 * 1000, // 30 minutes: unused data stays in cache before garbage collection
    keepPreviousData: true,
  });

  useEffect(() => {
    if (data) {
      dispatch(setCategories(data));
    }
  }, [dispatch, data]);

  const deletecatmutation = useMutation({
    mutationFn: async id => {
      const response = await deletecategory(id);
      // console.log(response);
      return response;
    },
    onSuccess: response => {
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
      <div className="mb-10 flex flex-col items-start justify-between gap-4 rounded-xl bg-white p-6 shadow md:flex-row md:items-center dark:bg-gray-900">
        <div>
          <h1 className="font-serif text-4xl text-gray-900 italic dark:text-gray-200">
            All Categories in OnService
          </h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            Manage all categories
          </p>
        </div>

        <div className="rounded-xl bg-gray-100 px-5 py-3 shadow-inner dark:bg-gray-800">
          <p className="text-lg font-medium text-gray-700 dark:text-gray-200">
            Total Categories
          </p>
          <h2 className="text-1xl font-bold text-gray-900 dark:text-gray-100">
            {totalCategories}
          </h2>
        </div>
      </div>
      <div className="mb-6">
        <UniversalSearchBar
          value={searchValue}
          onSearch={query => {
            dispatch(setpage(1));
            setSearchValue(query);
          }}
          fetchDefault={() => {
            dispatch(setpage(1));
            setSearchValue('');
          }}
          debounceTime={200}
          placeholder="Search category..."
        />
      </div>
      {/* Add Category Button */}
      <div className="mb-6 flex w-full flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="font-serif text-3xl text-black italic dark:text-gray-200">
          Add Category
        </h1>
        <Link
          href="./category/addcategory"
          className="flex items-center justify-center gap-2 rounded-lg bg-green-700 px-4 py-2 font-semibold text-white hover:bg-green-600"
        >
          <IoAddCircleSharp size={24} />
          Add category
        </Link>
      </div>

      {/* Range Selector */}
      <div className="mb-6 flex flex-col items-center gap-2">
        <input
          type="range"
          min={5}
          max={20}
          value={limitrange}
          onChange={e => dispatch(setlimitcategory(parseInt(e.target.value)))}
          className="w-64"
        />
        <span className="font-semibold text-black dark:text-gray-200">
          Selected Value: {limitrange}
        </span>
      </div>

      {/* Categories Table */}
      <div className="mb-10 overflow-x-auto">
        <table className="min-w-full rounded-xl border bg-white shadow-md dark:bg-gray-900">
          <thead className="border-b bg-gray-100 dark:bg-gray-800">
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
                    <div className="h-6 w-6 animate-spin rounded-full border-3 border-current border-t-transparent text-red-600" />
                  </div>
                </td>
              </tr>
            ) : Array.isArray(categories) && categories?.length > 0 ? (
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
                  className="py-4 text-center text-gray-500 dark:text-gray-400"
                >
                  No category found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="my-6 flex w-full flex-col items-center justify-between gap-4 rounded-lg bg-gray-100 p-4 sm:flex-row md:p-5 dark:bg-gray-800">
          {/* Previous Button */}
          <button
            disabled={page === 1}
            onClick={moveprevious}
            className="flex items-center gap-2 rounded-lg bg-gray-200 px-4 py-2 font-medium text-gray-700 transition hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
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
            className="flex items-center gap-2 rounded-lg bg-gray-200 px-4 py-2 font-medium text-gray-700 transition hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
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
