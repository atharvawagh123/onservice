"use client";

import { useEffect } from "react";
import { fetchusers, updateactivity } from "../../customhook/user";
import UserTableCell from "../../component/usertablecell";
import { toast } from "react-toastify";
import {
  setUsers,
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
  useEffect(() => {
    const timer = setTimeout(() => {
      const loaduser = async () => {
        const response = await fetchusers(page, limit);
        if (response.success) {
          dispatch(setUsers(response));
        }
      };
      loaduser();
    }, 300);
    return () => clearTimeout(timer);
  }, [page, dispatch, limit]);

  const changeActivity = async (id) => {
    if (!id) {
      toast.error("ID not found");
      return;
    }
    const response = await updateactivity(id);
    if (response.success) {
      toast.success(`${response.id} ${response.message}`);
      return response;
    }
  };

  const moveprevious = () => {
    dispatch(setpage(page - 1));
  };

  const movenext = () => {
    dispatch(setpage(page + 1));
  };

  return (
    <>
      <div className="mb-10 flex items-center justify-between bg-white p-6 rounded-xl shadow">
        <div>
          <h1 className="font-serif italic text-4xl text-gray-900">
            All Users in OnService
          </h1>
          <p className="text-gray-600 mt-1">
            Manage and monitor all registered users
          </p>
        </div>

        <div className="bg-gray-100 px-5 py-3 rounded-xl shadow-inner">
          <p className="text-gray-700 font-medium text-lg">Total Users</p>
          <h2 className="text-1xl font-bold text-gray-900">
            {/* {loading ? <>Loading....</> : totalUsers} */}
            {totalUsers}
          </h2>
        </div>
      </div>

      <div className="overflow-x-auto mb-10">
        <table className="min-w-full bg-white rounded-xl shadow-md border">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-6 py-3 text-black">#</th>
              <th className="px-6 py-3 text-black">Name</th>
              <th className="px-6 py-3 text-black">Email</th>
              <th className="px-6 py-3 text-black">User ID</th>
              <th className="px-6 py-3 text-black text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {isLoading && !data ? (
              <tr>
                <td colSpan="5">
                  <div className="w-full flex justify-center p-10">
                    <div
                      className="animate-spin inline-block size-6 border-3 border-current border-t-transparent text-red-600 rounded-full"
                      role="status"
                      aria-label="loading"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                </td>
              </tr>
            ) : data.length > 0 ? (
              data.map((user, index) => (
                <UserTableCell
                  key={index}
                  user={user}
                  index={index}
                  changeactivity={changeActivity}
                />
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="w-full flex bg-amber-200 p-5 my-3 justify-center gap-5">
          <button
            type="button"
            disabled={page === 1}
            onClick={moveprevious}
            className="text-black disabled:text-gray-400"
          >
            previous
          </button>
          <button
            type="button"
            disabled={page === totalPages}
            onClick={movenext}
            className="text-black disabled:text-gray-400"
          >
            next
          </button>
        </div>
      </div>
    </>
  );
};

export default UserPage;
