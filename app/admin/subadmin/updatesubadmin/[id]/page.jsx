'use client';
import { useQuery, useMutation } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import { updatesubadminbyadmin } from '../../../../customhook/subadmin';
import { getuserbyid } from '../../../../customhook/user';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import {
  FaUser,
  FaEnvelope,
  FaBirthdayCake,
  FaUpload,
  FaCloudUploadAlt,
} from 'react-icons/fa';
import { ImSpinner2 } from 'react-icons/im';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { useAuthContext } from '../../../../context/ContextProvider';

const UpdateSubadminPage = () => {
  const pathname = usePathname();
  const { MAX_SIZE } = useAuthContext();
  const part = pathname.split('/');
  const id = part[part.length - 1];
  const router = useRouter();
  const queryClient = useQueryClient();

  const [userdetail, setuserdetail] = useState({
    email: '',
    age: '',
    first_name: '',
    last_name: '',
    username: '',
    imageurl: '',
  });
  const [file, setfile] = useState(null);

  const onfilechnage = e => {
    const selectedfile = e.target.files[0];
    if (selectedfile.size > MAX_SIZE) {
      alert('Image must be less than 300KB');
      return;
    }
    console.log(selectedfile);

    setfile(selectedfile);
  };

  const onChange = e => {
    const { name, value } = e.target;
    setuserdetail(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const { data, isLoading } = useQuery({
    queryKey: ['subadmin', id],
    queryFn: async () => {
      const response = await getuserbyid(id);
      // console.log("data comming from usequery", response);
      return response;
    },
    enabled: !!id,
  });
  // console.log("data coming from updatesubadmin", data);

  useEffect(() => {
    if (!data?.user) return;
    const setdata = () => {
      setuserdetail(prev => ({
        ...prev,
        email: data.user.email ?? '',
        age: data.user.age ?? '',
        first_name: data.user.first_name ?? '',
        last_name: data.user.last_name ?? '',
        username: data.user.username ?? '',
        imageurl: data.user.imageurl ?? '',
      }));
    };
    setdata();
  }, [data]);

  // console.log("information state:-", userdetail);

  const updatesubadminmutation = useMutation({
    mutationFn: ({ formData, id }) => updatesubadminbyadmin(formData, id),
    onSuccess: response => {
      // console.log("updatemutation response", response);
      toast.success(response.message || 'Updated successfully');
      queryClient.invalidateQueries(['subadmins']);
      queryClient.invalidateQueries(['subadmins', id]);
      if (response.success) {
        router.back();
      }
    },
    onError: error => {
      toast.error(error.message || 'Update failed');
    },
  });

  const handleSubmit = e => {
    e.preventDefault();
    if (
      !userdetail.email ||
      !userdetail.age ||
      !userdetail.first_name ||
      !userdetail.last_name ||
      !userdetail.username
    ) {
      toast.warning('fill the form and then click on submit button !!!');
      return;
    }

    const formdata = new FormData();
    formdata.append('email', userdetail.email);
    formdata.append('age', Number(userdetail.age));
    formdata.append('first_name', userdetail.first_name);
    formdata.append('last_name', userdetail.last_name);
    formdata.append('username', userdetail.username);

    if (file) {
      formdata.append('file', file);
    }

    updatesubadminmutation.mutate({ formData: formdata, id });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen animate-pulse bg-white p-6 dark:bg-black">
        {/* Header Skeleton */}
        <div className="mb-10 flex flex-col items-start justify-between gap-4 rounded-xl bg-white p-6 shadow md:flex-row md:items-center dark:bg-gray-900">
          <div className="space-y-3">
            <div className="animate-pulse-slow h-10 w-80 rounded bg-gray-200 dark:bg-gray-700" />
            <div className="animate-pulse-slow h-4 w-64 rounded bg-gray-200 dark:bg-gray-700" />
          </div>

          <div className="animate-pulse-slow h-14 w-40 rounded-xl bg-gray-200 dark:bg-gray-700" />
        </div>

        {/* Form Skeleton */}
        <div className="animate-shiver mx-auto w-full max-w-4xl space-y-6 rounded-xl bg-green-50 p-8 shadow-lg dark:bg-gray-900">
          {/* Title */}
          <div className="mx-auto h-8 w-56 rounded bg-gray-200 dark:bg-gray-700" />

          {/* Row 1 */}
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="h-12 flex-1 rounded bg-gray-200 dark:bg-gray-700" />
            <div className="h-12 flex-1 rounded bg-gray-200 dark:bg-gray-700" />
          </div>

          {/* Row 2 */}
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="h-12 flex-1 rounded bg-gray-200 dark:bg-gray-700" />
            <div className="h-12 flex-1 rounded bg-gray-200 dark:bg-gray-700" />
          </div>

          {/* File Upload */}
          <div className="h-12 rounded bg-gray-200 dark:bg-gray-700" />

          {/* Button */}
          <div className="h-12 rounded bg-gray-300 dark:bg-gray-700" />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-white p-6 font-sans dark:bg-black">
        {/* Header Section */}
        <div className="mb-10 flex flex-col items-start justify-between gap-4 rounded-xl bg-white p-6 shadow md:flex-row md:items-center dark:bg-gray-900">
          <div>
            <h1 className="font-serif text-4xl text-gray-900 italic dark:text-gray-100">
              All Sub-Admin in OnService
            </h1>
            <p className="mt-1 text-gray-600 dark:text-gray-300">
              Manage and monitor all registered Sub-Admins
            </p>
          </div>

          <div className="rounded-xl bg-gray-100 px-5 py-3 shadow-inner dark:bg-gray-800">
            <p className="text-lg font-medium text-gray-700 dark:text-gray-200">
              Total Sub-Admin
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 p-4 sm:p-5 md:grid-cols-3 md:gap-8 lg:p-8">
          {/* LEFT: Image Section */}
          <div className="flex flex-col items-center gap-3 sm:gap-4 md:col-span-1">
            <div className="relative flex h-32 w-32 items-center justify-center overflow-hidden rounded-lg border-2 border-dashed bg-gray-100 sm:h-40 sm:w-40 md:h-48 md:w-48 dark:border-gray-600 dark:bg-gray-900">
              {file ? (
                <img
                  src={URL.createObjectURL(file)}
                  alt="preview"
                  className="h-full w-full rounded-lg object-cover"
                />
              ) : data?.user?.imageurl ? (
                <img
                  src={data.user.imageurl}
                  alt="preview"
                  className="h-full w-full rounded-lg object-cover"
                />
              ) : (
                <span className="text-xs text-gray-400 sm:text-sm">
                  Profile Image
                </span>
              )}

              {updatesubadminmutation.isPending && (
                <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/40">
                  <ImSpinner2 className="animate-spin text-xl text-white sm:text-2xl" />
                </div>
              )}
            </div>

            <label className="flex cursor-pointer items-center gap-2 rounded-lg bg-blue-100 px-3 py-2 text-xs font-medium text-blue-800 transition hover:bg-blue-200 sm:px-4 sm:text-sm">
              {updatesubadminmutation.isPending ? (
                <>
                  <ImSpinner2 className="animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <FaCloudUploadAlt className="text-sm sm:text-base" />
                  Upload Image
                </>
              )}
              <input
                type="file"
                className="hidden"
                onChange={onfilechnage}
                disabled={updatesubadminmutation.isPending}
              />
            </label>
          </div>

          {/* RIGHT: Form Section */}
          <form
            onSubmit={handleSubmit}
            className={`space-y-4 rounded-xl bg-green-50 p-4 shadow-lg transition-all duration-300 sm:space-y-5 sm:p-5 md:col-span-2 md:space-y-6 md:p-6 dark:bg-gray-800 ${updatesubadminmutation.isPending ? 'pointer-events-none opacity-60 blur-sm' : ''} `}
          >
            <h2 className="mb-3 text-center font-serif text-lg font-bold text-green-700 italic sm:mb-4 sm:text-xl md:text-2xl dark:text-green-400">
              Update Subadmin
            </h2>

            {/* First + Last Name */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <FaUser className="text-base text-green-600 sm:text-lg" />
                <input
                  type="text"
                  name="first_name"
                  value={userdetail.first_name}
                  onChange={onChange}
                  placeholder="First Name"
                  disabled={updatesubadminmutation.isPending}
                  className="w-full rounded border p-2.5 text-sm focus:ring-2 focus:ring-green-400 sm:p-3 sm:text-base dark:bg-gray-900 dark:text-white"
                />
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <FaUser className="text-base text-green-600 sm:text-lg" />
                <input
                  type="text"
                  name="last_name"
                  value={userdetail.last_name}
                  onChange={onChange}
                  placeholder="Last Name"
                  disabled={updatesubadminmutation.isPending}
                  className="w-full rounded border p-2.5 text-sm focus:ring-2 focus:ring-green-400 sm:p-3 sm:text-base dark:bg-gray-900 dark:text-white"
                />
              </div>
            </div>

            {/* Email + Age */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <FaEnvelope className="text-base text-green-600 sm:text-lg" />
                <input
                  type="email"
                  name="email"
                  value={userdetail.email}
                  onChange={onChange}
                  placeholder="Email"
                  disabled={updatesubadminmutation.isPending}
                  className="w-full rounded border p-2.5 text-sm focus:ring-2 focus:ring-green-400 sm:p-3 sm:text-base dark:bg-gray-900 dark:text-white"
                />
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <FaBirthdayCake className="text-base text-green-600 sm:text-lg" />
                <input
                  type="number"
                  name="age"
                  value={userdetail.age}
                  onChange={onChange}
                  placeholder="Age"
                  disabled={updatesubadminmutation.isPending}
                  className="w-full rounded border p-2.5 text-sm focus:ring-2 focus:ring-green-400 sm:p-3 sm:text-base dark:bg-gray-900 dark:text-white"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={updatesubadminmutation.isPending}
              className="flex w-full items-center justify-center gap-2 rounded bg-green-700 py-2.5 text-sm font-bold text-white transition hover:bg-green-800 disabled:opacity-50 sm:py-3 sm:text-base"
            >
              {updatesubadminmutation.isPending ? (
                <>
                  <ImSpinner2 className="animate-spin text-base sm:text-lg" />
                  Updating...
                </>
              ) : (
                'Update Subadmin'
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateSubadminPage;
