"use client";

import { useSelector } from "react-redux";
import ServiceTableRow from "../../component/ServiceTableRow";
import { changeserviceactivestate } from "../../customhook/service";
import {
  updateservice,
  setServices,
  nextServicePage,
  prevServicePage,
} from "../../store/servicesSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getallservice } from ".././../customhook/service";
import { FcPrevious } from "react-icons/fc";
import { FcNext } from "react-icons/fc";
import { useQuery, useMutation } from "@tanstack/react-query";
const Service = () => {
  const dispatch = useDispatch();
  // const queryClient = useQueryClient();
  const { services, total, page, limit, totalPages } = useSelector(
    (state) => state.services,
  );

  console.log("all service from state", services);
  const { data, isLoading } = useQuery({
    queryKey: ["services", page],
    queryFn: () => getallservice(page, limit),
    staleTime: 5 * 60 * 1000, // 5 minutes: data stays fresh for 5 min
    cacheTime: 30 * 60 * 1000, // 30 minutes: unused data stays in cache before garbage collection
    keepPreviousData: true, // keeps previous page data while fetching next page
  });
  console.log("all service from api", data);
  useEffect(() => {
    if (data) {
      dispatch(setServices(data));
    }
  }, [page, limit, data]);

  const movepre = () => {
    dispatch(prevServicePage(page - 1));
  };

  const movenext = () => {
    dispatch(nextServicePage(page + 1));
  };

  const changestatemutation = useMutation({
    mutationFn: async (id) => {
      const response = await changeserviceactivestate(id);
      if (!response.success) throw new Error(response.message);
      toast.success(response.message);
      return response.updateservice;
    },
    onSuccess: (updatedService) => {
      dispatch(updateservice(updatedService));
    },
  });
  return (
    <>
      {/* Header Section */}
      <div className="mb-10 flex flex-col md:flex-row items-start md:items-center justify-between bg-white dark:bg-gray-900 p-6 rounded-xl shadow gap-4">
        <div>
          <h1 className="font-serif italic text-4xl text-gray-900 dark:text-gray-100">
            All Services in OnService
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Manage and monitor all registered Services
          </p>
        </div>

        <div className="bg-gray-100 dark:bg-gray-800 px-5 py-3 rounded-xl shadow-inner">
          <p className="text-gray-700 dark:text-gray-200 font-medium text-lg">
            Total Services
          </p>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            {total}
          </h2>
        </div>
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-xl shadow p-4 font-sans">
        <table className="min-w-full text-left text-black dark:text-gray-100">
          <thead className="bg-gray-100 dark:bg-gray-700 text-black dark:text-gray-100 ">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">Service Image</th>
              <th className="p-3">Service ID</th>
              <th className="p-3">User ID</th>
              <th className="p-3">Title</th>
              <th className="p-3">Active</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody className="text-black dark:text-gray-100">
            {isLoading && !data ? (
              <tr>
                <td colSpan="7">
                  <div className="flex justify-center p-10">
                    <div
                      className="animate-spin inline-block w-6 h-6 border-3 border-current border-t-transparent text-red-600 dark:text-yellow-300 rounded-full"
                      role="status"
                      aria-label="loading"
                    />
                  </div>
                </td>
              </tr>
            ) : Array.isArray(services) && services?.length > 0 ? (
              services.map((service, index) => (
                <ServiceTableRow
                  key={index}
                  service={service}
                  index={index}
                  changeservicestate={changestatemutation.mutate}
                />
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-5 text-gray-500 dark:text-gray-300 font-medium"
                >
                  No services found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="w-full bg-gray-100 dark:bg-gray-900 p-4 md:p-5 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 my-5 rounded-lg shadow">
        {/* Previous Button */}
        <button
          disabled={page === 1}
          onClick={movepre}
          className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          <FcPrevious size={18} />
          Previous
        </button>

        {/* Current Page */}
        <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Page {page} / {totalPages}
        </p>

        {/* Next Button */}
        <button
          disabled={page === totalPages}
          onClick={movenext}
          className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Next
          <FcNext size={18} />
        </button>
      </div>
    </>
  );
};

export default Service;
