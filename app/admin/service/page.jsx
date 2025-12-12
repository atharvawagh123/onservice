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
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
const Service = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { services, total, page, limit, totalPages } = useSelector(
    (state) => state.services,
  );

  const { data, isLoading } = useQuery({
    queryKey: ["services", page],
    queryFn: () => getallservice(page, limit),
    staleTime: 5 * 60 * 1000, // 5 minutes: data stays fresh for 5 min
    cacheTime: 30 * 60 * 1000, // 30 minutes: unused data stays in cache before garbage collection
    keepPreviousData: true, // keeps previous page data while fetching next page
  });
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
      console.log("on mutation", response);
      if (!response.success) throw new Error(response.message);
      return response.updateservice;
    },
    onSuccess: (updatedService) => {
      dispatch(updateservice(updatedService));
    },
  });
  return (
    <>
      {/* Header Section */}
      <div className="mb-10 flex flex-col md:flex-row items-start md:items-center justify-between bg-white p-6 rounded-xl shadow gap-4">
        <div>
          <h1 className="font-serif italic text-4xl text-gray-900">
            All Services in OnService
          </h1>
          <p className="text-gray-600 mt-1">
            Manage and monitor all registered Services
          </p>
        </div>
        <p className="text-3xl text-black">{totalPages}</p>
        <div className="bg-gray-100 px-5 py-3 rounded-xl shadow-inner">
          <p className="text-gray-700 font-medium text-lg">Total Services</p>
          <h2 className="text-xl font-bold text-gray-900">{total}</h2>
        </div>
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow p-4 font-sans">
        <table className="min-w-full text-left text-black">
          <thead className="bg-gray-100 text-black">
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

          <tbody className="text-black">
            {isLoading && !data ? (
              <tr>
                <td colSpan="3">
                  <div className="flex justify-center p-10">
                    <div className="animate-spin size-6 border-3 border-current border-t-transparent text-red-600 rounded-full" />
                  </div>
                </td>
              </tr>
            ) : services.length > 0 ? (
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
                  colSpan="6"
                  className="text-center py-5 text-gray-500 font-medium"
                >
                  No services found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="w-full bg-amber-300 p-4 md:p-5 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 my-5 rounded-lg">
        {/* Previous Button */}
        <button
          disabled={page === 1}
          onClick={movepre}
          className="flex items-center gap-2 px-4 py-2 bg-white text-black font-medium rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          <FcPrevious size={16} />
          Previous
        </button>

        {/* Current Page */}
        <p className="text-lg font-semibold">{page}</p>

        {/* Next Button */}
        <button
          disabled={page === totalPages}
          onClick={movenext}
          className="flex items-center gap-2 px-4 py-2 bg-white text-black font-medium rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Next
          <FcNext size={16} />
        </button>
      </div>
    </>
  );
};

export default Service;
