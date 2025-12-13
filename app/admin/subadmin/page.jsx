"use client";
import Link from "next/link";
import { IoAddCircleSharp } from "react-icons/io5";
import { fetchsubadmin } from "../../customhook/subadmin";
import { useQuery, useMutation } from "@tanstack/react-query";
import { setSubAdmins } from "../../store/subAdminSlice";
import { useEffect, useState } from "react";
import SubAdminRow from "../../component/SubAdminRow";
import { useDispatch, useSelector } from "react-redux";
import { updateactivity } from "../../customhook/user";
import { toggleSubAdminStatus, setpage } from "../../store/subAdminSlice";
// import { QueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import UniversalSearchBar from "../../component/UniversalSearchBar";
import { FcPrevious } from "react-icons/fc";
import { FcNext } from "react-icons/fc";

const SubAdminpage = () => {
  const dispatch = useDispatch();
  const subadminstate = useSelector((state) => state.subadmin);
  // console.log("subadmin from  state", subadminstate);
  const [searchValue, setSearchValue] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["subadmins", searchValue, subadminstate.page],
    queryFn: async () => {
      const res = await fetchsubadmin(
        searchValue,
        subadminstate.page,
        subadminstate.limit,
      );
      console.log("search subadmin", res);
      return res;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes: data stays fresh for 5 min
    cacheTime: 30 * 60 * 1000, // 30 minutes: unused data stays in cache before garbage collection
    keepPreviousData: true,
  });

  useEffect(() => {
    if (data) {
      dispatch(setSubAdmins(data));
    }
  }, [data, subadminstate.page, dispatch]);
  const changeactivitymutation = useMutation({
    mutationFn: async (id) => {
      const response = await updateactivity(id);
      console.log("chnage in mutaion", response);
      return response;
    },
    onSuccess: (response) => {
      console.log("chnage in onsuccess", response);

      dispatch(toggleSubAdminStatus(response.id));

      toast.success(response.message);
    },
  });

  const moveprevious = () => {
    toast.info("Loading previous page...");
    dispatch(setpage(subadminstate.page - 1));
  };

  const movenext = () => {
    toast.info("Loading next page...");
    dispatch(setpage(subadminstate.page + 1));
  };

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
            {subadminstate.total}
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
      <div className="mb-6">
        <UniversalSearchBar
          value={searchValue}
          onSearch={(query) => {
            dispatch(setpage(1)); // 🔥 reset page
            setSearchValue(query);
          }}
          fetchDefault={() => {
            dispatch(setpage(1));
            setSearchValue("");
          }}
          debounceTime={200}
          placeholder="Search subadmins..."
        />
      </div>
      <div className="overflow-x-auto bg-white dark:bg-gray-900 rounded-xl shadow font-sans">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Username
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Active
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Joined
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {isLoading && !data ? (
              <tr>
                <td colSpan="7">
                  <div className="flex justify-center p-10">
                    <div className="animate-spin w-6 h-6 border-3 border-current border-t-transparent text-red-600 rounded-full" />
                  </div>
                </td>
              </tr>
            ) : Array.isArray(subadminstate.subadmins) &&
              subadminstate.subadmins.length > 0 ? (
              subadminstate.subadmins.map((admin, index) => (
                <SubAdminRow
                  key={index}
                  admin={admin}
                  changeActivity={changeactivitymutation.mutate}
                />
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-4 text-gray-500 dark:text-gray-400"
                >
                  No sub-admin found
                </td>
              </tr>
            )}
          </tbody>
          {/* <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="7">Loading...</td>
              </tr>
            ) : data?.subadmins.length > 0 ? (
              data.subadmins.map((admin) => (
                <SubAdminRow
                  key={admin.id}
                  admin={admin}
                  changeActivity={changeactivitymutation.mutate}
                />
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-4 text-gray-500 dark:text-gray-400"
                >
                  No sub-admin found
                </td>
              </tr>
            )}
          </tbody> */}
        </table>
        <div className="w-full p-4 md:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 my-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <button
            disabled={subadminstate.page === 1}
            onClick={moveprevious}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition
                          bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed
                          dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          >
            <FcPrevious size={16} />
            Previous
          </button>

          <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Page {subadminstate.page} / {subadminstate.totalPages}
          </p>

          <button
            disabled={subadminstate.page === subadminstate.totalPages}
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

export default SubAdminpage;
