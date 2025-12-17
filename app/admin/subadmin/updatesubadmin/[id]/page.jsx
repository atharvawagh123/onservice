"use client";
import { useQuery, useMutation } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { updatesubadminbyadmin } from "../../../../customhook/subadmin";
import { getuserbyid } from "../../../../customhook/user";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { FaUser, FaEnvelope, FaBirthdayCake, FaUpload } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

const UpdateSubadminPage = () => {
  const pathname = usePathname();
  const part = pathname.split("/");
  const id = part[part.length - 1];
  const router = useRouter();
  const queryClient = useQueryClient();

  const [userdetail, setuserdetail] = useState({
    email: "",
    age: "",
    first_name: "",
    last_name: "",
    username: "",
  });
  const [file, setfile] = useState(null);

  const onfilechnage = (e) => {
    const selectedfile = e.target.files[0];
    setfile(selectedfile);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setuserdetail((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { data, isLoading } = useQuery({
    queryKey: ["subadmin", id],
    queryFn: async () => {
      const response = await getuserbyid(id);
      return response;
    },
    enabled: !!id,
  });

  useEffect(() => {
    if (!data?.user) return;

    const setdata = () => {
      setuserdetail((prev) => ({
        ...prev,
        email: data.user.email ?? "",
        age: data.user.age ?? "",
        first_name: data.user.first_name ?? "",
        last_name: data.user.last_name ?? "",
        username: data.user.username ?? "",
      }));
    };
    setdata();
  }, [data]);
  const updatesubadminmutation = useMutation({
    mutationFn: ({ formData, id }) => updatesubadminbyadmin(formData, id),

    onSuccess: (response) => {
      toast.success(response.message || "Updated successfully");
      queryClient.invalidateQueries(["subadmins"]);
      if (response.success) {
        router.back();
      }
    },

    onError: (error) => {
      toast.error(error.message || "Update failed");
    },
  });

  console.log("updatesubadminmutation :", updatesubadminmutation);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !userdetail.email ||
      !userdetail.age ||
      !userdetail.first_name ||
      !userdetail.last_name ||
      !userdetail.username
    ) {
      toast.warning("fill the form and then click on submit button !!!");
      return;
    }

    const formdata = new FormData();
    formdata.append("email", userdetail.email);
    formdata.append("age", Number(userdetail.age));
    formdata.append("first_name", userdetail.first_name);
    formdata.append("last_name", userdetail.last_name);
    formdata.append("username", userdetail.username);

    if (file) {
      formdata.append("file", file);
    }

    updatesubadminmutation.mutate({ formData: formdata, id });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-black p-6 animate-pulse">
        {/* Header Skeleton */}
        <div className="mb-10 flex flex-col md:flex-row items-start md:items-center justify-between bg-white dark:bg-gray-900 p-6 rounded-xl shadow gap-4">
          <div className="space-y-3">
            <div className="h-10 w-80 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-4 w-64 bg-gray-200 dark:bg-gray-700 rounded" />
          </div>

          <div className="h-14 w-40 bg-gray-200 dark:bg-gray-700 rounded-xl" />
        </div>

        {/* Form Skeleton */}
        <div className="w-full max-w-4xl bg-green-50 dark:bg-gray-900 rounded-xl shadow-lg p-8 space-y-6 mx-auto">
          {/* Title */}
          <div className="h-8 w-56 bg-gray-200 dark:bg-gray-700 rounded mx-auto" />

          {/* Row 1 */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 h-12 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="flex-1 h-12 bg-gray-200 dark:bg-gray-700 rounded" />
          </div>

          {/* Row 2 */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 h-12 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="flex-1 h-12 bg-gray-200 dark:bg-gray-700 rounded" />
          </div>

          {/* File Upload */}
          <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded" />

          {/* Button */}
          <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded" />
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="min-h-screen bg-white dark:bg-black p-6 font-sans">
        {/* Header Section */}
        <div className="mb-10 flex flex-col md:flex-row items-start md:items-center justify-between bg-white dark:bg-gray-900 p-6 rounded-xl shadow gap-4">
          <div>
            <h1 className="font-serif italic text-4xl text-gray-900 dark:text-gray-100">
              All Sub-Admin in OnService
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              Manage and monitor all registered Sub-Admins
            </p>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 px-5 py-3 rounded-xl shadow-inner">
            <p className="text-gray-700 dark:text-gray-200 font-medium text-lg">
              Total Sub-Admin
            </p>
          </div>
        </div>

        {/* Form Section */}
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-4xl bg-green-50 dark:bg-gray-900 rounded-xl shadow-lg p-8 space-y-6 mx-auto"
        >
          <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 text-center font-serif italic">
            Update Subadmin
          </h2>

          {/* Row 1: First Name & Last Name */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 flex items-center space-x-2">
              <FaUser className="text-green-600 dark:text-green-400" />
              <input
                type="text"
                name="first_name"
                value={userdetail.first_name}
                onChange={onChange}
                placeholder="First Name"
                className="flex-1 p-3 border border-green-300 dark:border-green-700 rounded focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-black dark:text-white font-serif italic"
              />
            </div>

            <div className="flex-1 flex items-center space-x-2">
              <FaUser className="text-green-600 dark:text-green-400" />
              <input
                type="text"
                name="last_name"
                value={userdetail.last_name}
                onChange={onChange}
                placeholder="Last Name"
                className="flex-1 p-3 border border-green-300 dark:border-green-700 rounded focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-black dark:text-white font-serif italic"
              />
            </div>
          </div>

          {/* Row 2: Email & Age */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 flex items-center space-x-2">
              <FaEnvelope className="text-green-600 dark:text-green-400" />
              <input
                type="email"
                name="email"
                value={userdetail.email}
                onChange={onChange}
                placeholder="Email"
                className="flex-1 p-3 border border-green-300 dark:border-green-700 rounded focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-black dark:text-white font-serif"
              />
            </div>

            <div className="flex-1 flex items-center space-x-2">
              <FaBirthdayCake className="text-green-600 dark:text-green-400" />
              <input
                type="number"
                name="age"
                value={userdetail.age}
                onChange={onChange}
                placeholder="Age"
                className="flex-1 p-3 border border-green-300 dark:border-green-700 rounded focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-black dark:text-white font-serif italic"
              />
            </div>
          </div>

          {/* Row 3: File Upload */}
          <div className="flex items-center space-x-2">
            <FaUpload className="text-green-600 dark:text-green-400" />
            <input
              type="file"
              onChange={onfilechnage}
              className="flex-1 p-3 border border-green-300 dark:border-green-700 rounded focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-black dark:text-white font-serif italic"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={updatesubadminmutation.isPending}
            className="w-full bg-green-700 hover:bg-green-800 disabled:opacity-50 text-white dark:text-black font-bold py-3 px-4 rounded transition-colors duration-200 font-serif"
          >
            {updatesubadminmutation.isPending
              ? "Updating..."
              : "Update Subadmin"}
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateSubadminPage;
