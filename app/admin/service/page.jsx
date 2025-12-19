'use client';

import { useSelector } from 'react-redux';
import ServiceTableRow from '../../component/ServiceTableRow';
import { changeserviceactivestate } from '../../customhook/service';
import {
  updateservice,
  setServices,
  nextServicePage,
  prevServicePage,
} from '../../store/servicesSlice';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getallservice } from '.././../customhook/service';
import { FcPrevious } from 'react-icons/fc';
import { FcNext } from 'react-icons/fc';
import { useQuery, useMutation } from '@tanstack/react-query';
const Service = () => {
  const dispatch = useDispatch();
  // const queryClient = useQueryClient();
  const { services, total, page, limit, totalPages } = useSelector(
    state => state.services
  );

  console.log('all service from state', services);
  const { data, isLoading } = useQuery({
    queryKey: ['services', page],
    queryFn: () => getallservice(page, limit),
    staleTime: 5 * 60 * 1000, // 5 minutes: data stays fresh for 5 min
    cacheTime: 30 * 60 * 1000, // 30 minutes: unused data stays in cache before garbage collection
    keepPreviousData: true, // keeps previous page data while fetching next page
  });
  console.log('all service from api', data);
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
    mutationFn: async id => {
      const response = await changeserviceactivestate(id);
      if (!response.success) throw new Error(response.message);
      toast.success(response.message);
      return response.updateservice;
    },
    onSuccess: updatedService => {
      dispatch(updateservice(updatedService));
    },
  });
  return (
    <>
      {/* Header Section */}
      <div className="mb-10 flex flex-col items-start justify-between gap-4 rounded-xl bg-white p-6 shadow md:flex-row md:items-center dark:bg-gray-900">
        <div>
          <h1 className="font-serif text-4xl text-gray-900 italic dark:text-gray-100">
            All Services in OnService
          </h1>
          <p className="mt-1 text-gray-600 dark:text-gray-300">
            Manage and monitor all registered Services
          </p>
        </div>

        <div className="rounded-xl bg-gray-100 px-5 py-3 shadow-inner dark:bg-gray-800">
          <p className="text-lg font-medium text-gray-700 dark:text-gray-200">
            Total Services
          </p>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            {total}
          </h2>
        </div>
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto rounded-xl bg-white p-4 font-sans shadow dark:bg-gray-800">
        <table className="min-w-full text-left text-black dark:text-gray-100">
          <thead className="bg-gray-100 text-black dark:bg-gray-700 dark:text-gray-100">
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
                      className="inline-block h-6 w-6 animate-spin rounded-full border-3 border-current border-t-transparent text-red-600 dark:text-yellow-300"
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
                  className="py-5 text-center font-medium text-gray-500 dark:text-gray-300"
                >
                  No services found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="my-5 flex w-full flex-col items-center justify-between gap-4 rounded-lg bg-gray-100 p-4 shadow md:flex-row md:gap-0 md:p-5 dark:bg-gray-900">
        {/* Previous Button */}
        <button
          disabled={page === 1}
          onClick={movepre}
          className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 font-medium text-gray-900 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
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
          className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 font-medium text-gray-900 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
        >
          Next
          <FcNext size={18} />
        </button>
      </div>
    </>
  );
};

export default Service;
