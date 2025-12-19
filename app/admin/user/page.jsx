'use client';

import { useEffect } from 'react';
import { fetchusers, updateactivity } from '../../customhook/user';
import UserTableCell from '../../component/usertablecell';
import { toast } from 'react-toastify';
import {
  setUsers,
  setchangeactivity,
  // setUserLimit,
  setpage,
  // setloading,
} from '../../store/allUserslice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useQuery, useMutation } from '@tanstack/react-query';
const UserPage = () => {
  const dispatch = useDispatch();
  const allusers = useSelector(state => state.allUser.users || []);
  const page = useSelector(state => state.allUser.page);
  const totalPages = useSelector(state => state.allUser.totalPages);
  const totalUsers = useSelector(state => state.allUser.totalUsers);
  const limit = useSelector(state => state.allUser.limit);
  const loading = useSelector(state => state.allUser.loading);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['users', page, limit],
    queryFn: () => fetchusers(page, limit),
    staleTime: 5 * 60 * 1000, // 5 minutes: data stays fresh for 5 min
    cacheTime: 30 * 60 * 1000, // 30 minutes: unused data stays in cache before garbage collection
    keepPreviousData: true, // keeps previous page data while fetching next page
  });

  console.log('user admin page ', data);
  useEffect(() => {
    if (data) {
      dispatch(setUsers(data));
    }
  }, [page, data, limit]);

  const changeactivitymutation = useMutation({
    mutationFn: async id => {
      const response = await updateactivity(id);
      console.log('chnage in mutaion', response);
      return response;
    },
    onSuccess: response => {
      console.log('chnage in onsuccess', response);
      dispatch(setchangeactivity(response.id));
      toast.success(response.message);
    },
  });

  const moveprevious = () => {
    dispatch(setpage(page - 1));
  };

  const movenext = () => {
    dispatch(setpage(page + 1));
  };

  return (
    <>
      {/* Header Section */}
      <div className="mb-10 flex flex-col items-start justify-between gap-5 rounded-xl bg-white p-6 shadow md:flex-row md:items-center dark:bg-gray-900">
        {/* Title */}
        <div>
          <h1 className="font-serif text-3xl text-gray-900 italic md:text-4xl dark:text-white">
            All Users in OnService
          </h1>
          <p className="mt-1 text-gray-600 dark:text-gray-300">
            Manage and monitor all registered users
          </p>
        </div>

        {/* Total Users Box */}
        <div className="rounded-xl bg-gray-100 px-6 py-4 shadow-inner dark:bg-gray-800">
          <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
            Total Users
          </p>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {totalUsers}
          </h2>
        </div>
      </div>

      {/* Table Section */}
      <div className="mb-10 overflow-x-auto rounded-xl border shadow dark:border-gray-700">
        <table className="min-w-full rounded-xl bg-white dark:bg-gray-900">
          <thead className="border-b bg-gray-100 dark:border-gray-700 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-black dark:text-white">
                #
              </th>
              <th className="px-6 py-3 text-left text-black dark:text-white">
                Profile
              </th>
              <th className="px-6 py-3 text-left text-black dark:text-white">
                Name
              </th>
              <th className="px-6 py-3 text-left text-black dark:text-white">
                Email
              </th>
              <th className="px-6 py-3 text-left text-black dark:text-white">
                User ID
              </th>
              <th className="px-6 py-3 text-center text-black dark:text-white">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {isLoading && !data ? (
              <tr>
                <td colSpan="6">
                  <div className="flex w-full justify-center p-10">
                    <div className="inline-block size-6 animate-spin rounded-full border-4 border-current border-t-transparent text-sky-600"></div>
                  </div>
                </td>
              </tr>
            ) : Array.isArray(allusers) && allusers.length > 0 ? (
              allusers.map((user, index) => (
                <UserTableCell
                  key={index}
                  user={user}
                  index={index}
                  changeactivity={changeactivitymutation.mutate}
                />
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="py-4 text-center text-gray-500 dark:text-gray-300"
                >
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex w-full justify-center gap-6 py-5">
        <button
          type="button"
          disabled={page === 1}
          onClick={moveprevious}
          className="rounded-lg bg-gray-200 px-4 py-2 text-black transition hover:bg-gray-300 disabled:opacity-50 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
        >
          Previous
        </button>

        <span className="text-lg font-semibold text-gray-900 dark:text-white">
          {page} / {totalPages}
        </span>

        <button
          type="button"
          disabled={page === totalPages}
          onClick={movenext}
          className="rounded-lg bg-gray-200 px-4 py-2 text-black transition hover:bg-gray-300 disabled:opacity-50 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default UserPage;
