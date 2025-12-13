"use client";

import { useEffect } from "react";
import { fetchusers, updateactivity } from "../../customhook/user";
import UserTableCell from "../../component/usertablecell";
import { toast } from "react-toastify";
import {
  setUsers,
  setchangeactivity,
  // setUserLimit,
  setpage,
  // setloading,
} from "../../store/allUserslice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useQuery, useMutation } from "@tanstack/react-query";
const UserPage = () => {
  const dispatch = useDispatch();
  const allusers = useSelector((state) => state.allUser.users || []);
  const page = useSelector((state) => state.allUser.page);
  const totalPages = useSelector((state) => state.allUser.totalPages);
  const totalUsers = useSelector((state) => state.allUser.totalUsers);
  const limit = useSelector((state) => state.allUser.limit);
  const loading = useSelector((state) => state.allUser.loading);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["users", page, limit],
    queryFn: () => fetchusers(page, limit),
    staleTime: 5 * 60 * 1000, // 5 minutes: data stays fresh for 5 min
    cacheTime: 30 * 60 * 1000, // 30 minutes: unused data stays in cache before garbage collection
    keepPreviousData: true, // keeps previous page data while fetching next page
  });

  console.log("user admin page ", data);
  useEffect(() => {
    if (data) {
      dispatch(setUsers(data));
    }
  }, [page, data, limit]);

  // const changeActivity = async (id) => {
  //   if (!id) {
  //     toast.error("ID not found");
  //     return;
  //   }
  //   const response = await updateactivity(id);
  //   if (response.success) {
  //     toast.success(`${response.id} ${response.message}`);
  //     return response;
  //   }
  // };

  const changeactivitymutation = useMutation({
    mutationFn: async (id) => {
      const response = await updateactivity(id);
      console.log("chnage in mutaion", response);
      return response;
    },
    onSuccess: (response) => {
      console.log("chnage in onsuccess", response);
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
      <div
        className="mb-10 flex flex-col md:flex-row items-start md:items-center justify-between 
                  bg-white dark:bg-gray-900 p-6 rounded-xl shadow gap-5"
      >
        {/* Title */}
        <div>
          <h1 className="font-serif italic text-3xl md:text-4xl text-gray-900 dark:text-white">
            All Users in OnService
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Manage and monitor all registered users
          </p>
        </div>

        {/* Total Users Box */}
        <div className="bg-gray-100 dark:bg-gray-800 px-6 py-4 rounded-xl shadow-inner">
          <p className="text-gray-700 dark:text-gray-300 font-medium text-lg">
            Total Users
          </p>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {totalUsers}
          </h2>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto mb-10 border dark:border-gray-700 rounded-xl shadow">
        <table className="min-w-full bg-white dark:bg-gray-900 rounded-xl">
          <thead className="bg-gray-100 dark:bg-gray-800 border-b dark:border-gray-700">
            <tr>
              <th className="px-6 py-3 text-black dark:text-white text-left">
                #
              </th>
              <th className="px-6 py-3 text-black dark:text-white text-left">
                Profile
              </th>
              <th className="px-6 py-3 text-black dark:text-white text-left">
                Name
              </th>
              <th className="px-6 py-3 text-black dark:text-white text-left">
                Email
              </th>
              <th className="px-6 py-3 text-black dark:text-white text-left">
                User ID
              </th>
              <th className="px-6 py-3 text-black dark:text-white text-center">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {isLoading && !data ? (
              <tr>
                <td colSpan="6">
                  <div className="w-full flex justify-center p-10">
                    <div
                      className="animate-spin inline-block size-6 border-4 border-current border-t-transparent 
                             text-sky-600 rounded-full"
                    ></div>
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
                  className="text-center py-4 text-gray-500 dark:text-gray-300"
                >
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="w-full flex justify-center gap-6 py-5">
        <button
          type="button"
          disabled={page === 1}
          onClick={moveprevious}
          className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-black 
                dark:text-white disabled:opacity-50 hover:bg-gray-300 dark:hover:bg-gray-700 
                transition"
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
          className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-black 
                dark:text-white disabled:opacity-50 hover:bg-gray-300 dark:hover:bg-gray-700 
                transition"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default UserPage;
