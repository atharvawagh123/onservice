'use client';
import Link from 'next/link';
import { IoAddCircleSharp } from 'react-icons/io5';
import { fetchsubadmin } from '../../customhook/subadmin';
import { useQuery, useMutation } from '@tanstack/react-query';
import { setSubAdmins } from '../../store/subAdminSlice';
import { useEffect, useState } from 'react';
import SubAdminRow from '../../component/SubAdminRow';
import { useDispatch, useSelector } from 'react-redux';
import { updateactivity } from '../../customhook/user';
import {
  toggleSubAdminStatus,
  setpage,
  deleteSubAdmin,
} from '../../store/subAdminSlice';
// import { QueryClient } from "@tanstack/react-query";
import { toast } from 'react-toastify';
import UniversalSearchBar from '../../component/UniversalSearchBar';
import { FcPrevious } from 'react-icons/fc';
import { FcNext } from 'react-icons/fc';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { removesubadmin } from '../../customhook/subadmin';

const SubAdminpage = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const subadminstate = useSelector(state => state.subadmin);
  const router = useRouter();
  // console.log("subadmin from  state", subadminstate);
  const [searchValue, setSearchValue] = useState('');
  const [usergoingtochange, setusergoingtochange] = useState('');
  const [usergoingtoactivity, setusergoingtoactivity] = useState('');
  const { data, isLoading } = useQuery({
    queryKey: ['subadmins', searchValue, subadminstate.page],
    queryFn: async () => {
      const res = await fetchsubadmin(
        searchValue,
        subadminstate.page,
        subadminstate.limit
      );
      console.log('search subadmin', res);
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
    mutationFn: async id => {
      setusergoingtochange(id);
      const response = await updateactivity(id);
      console.log('chnage in mutaion', response);
      return response;
    },
    onSuccess: response => {
      setusergoingtochange('');
      dispatch(toggleSubAdminStatus(response.id));
      queryClient.invalidateQueries(['subadmin']);
      toast.success(response.message);
    },
  });

  const deletesubadminmutation = useMutation({
    mutationFn: async id => {
      setusergoingtochange(id);
      console.log('id for remove subadmin', id);
      const response = await removesubadmin(id);
      console.log('chnage in remove subadmin mutaion', response);
      return response;
    },
    onSuccess: response => {
      if (response.error) {
        setusergoingtochange('');
        toast.error(response.error || 'error in remove subadmin delete');
        return;
      }
      if (response.success) {
        setusergoingtochange('');
        toast.success(response.message || 'subadmin delete successfully ');
        dispatch(deleteSubAdmin(response.id));
        queryClient.invalidateQueries(['subadmin']);
      }
    },
    onError: error => {
      setusergoingtochange('');
      toast.error(error.error || 'error in delete subadmin');
    },
  });

  const moveprevious = () => {
    toast.info('Loading previous page...');
    dispatch(setpage(subadminstate.page - 1));
  };

  const movenext = () => {
    toast.info('Loading next page...');
    dispatch(setpage(subadminstate.page + 1));
  };

  return (
    <>
      <div className="mb-10 flex flex-col items-start justify-between gap-4 rounded-xl bg-white p-6 shadow md:flex-row md:items-center dark:bg-gray-900">
        <div>
          <h1 className="font-serif text-4xl text-gray-900 italic dark:text-gray-100">
            All Sub-Admin in OnService
          </h1>
          <p className="mt-1 text-gray-600 dark:text-gray-300">
            Manage and monitor all registered Sub-Admin
          </p>
        </div>

        <div className="rounded-xl bg-gray-100 px-5 py-3 shadow-inner dark:bg-gray-800">
          <p className="text-lg font-medium text-gray-700 dark:text-gray-200">
            Total Sub-Admin
          </p>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            {subadminstate.total}
          </h2>
        </div>
      </div>

      <div className="mb-6 flex w-full flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="font-serif text-3xl text-black italic dark:text-gray-200">
          Add Subadmin
        </h1>
        <Link
          href="./subadmin/addsubadmin"
          className="flex items-center justify-center gap-2 rounded-lg bg-green-700 px-4 py-2 font-semibold text-white hover:bg-green-600"
        >
          <IoAddCircleSharp size={24} />
          Add subadmin
        </Link>
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
          placeholder="Search subadmins..."
        />
      </div>
      <div className="overflow-x-auto rounded-xl bg-white font-sans shadow dark:bg-gray-900">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300">
                Profile
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300">
                Username
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300">
                Active
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300">
                Joined
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
            {isLoading && !data ? (
              <tr>
                <td colSpan="7">
                  <div className="flex justify-center p-10">
                    <div className="h-6 w-6 animate-spin rounded-full border-3 border-current border-t-transparent text-red-600" />
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
                  deleteSubAdmin={deletesubadminmutation.mutate}
                  deleteisprending={deletesubadminmutation.isPending}
                  changeactivityispending={changeactivitymutation.isPending}
                  usergoingtochange={usergoingtochange}
                />
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="py-4 text-center text-gray-500 dark:text-gray-400"
                >
                  No sub-admin found
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="my-6 flex w-full flex-col items-center justify-between gap-4 rounded-lg bg-gray-100 p-4 sm:flex-row md:p-5 dark:bg-gray-800">
          <button
            disabled={subadminstate.page === 1}
            onClick={moveprevious}
            className="flex items-center gap-2 rounded-lg bg-gray-200 px-4 py-2 font-medium text-gray-700 transition hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
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

export default SubAdminpage;
