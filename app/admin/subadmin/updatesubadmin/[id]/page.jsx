"use client";
import { useQuery, useMutation } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { updatesubadminbyadmin } from "../../../../customhook/subadmin";
import { getuserbyid } from "../../../../customhook/user";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaBirthdayCake,
  FaUpload,
  FaCloudUploadAlt,
} from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
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
    imageurl: "",
  });
  const [file, setfile] = useState(null);
  const [editmode, seteditmode] = useState(false);

  const onfilechnage = (e) => {
    const selectedfile = e.target.files[0];
    console.log(selectedfile);
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
      // console.log("data comming from usequery", response);
      return response;
    },
    enabled: !!id,
  });
  // console.log("data coming from updatesubadmin", data);

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
        imageurl: data.user.imageurl ?? "",
      }));
    };
    setdata();
  }, [data]);

  // console.log("information state:-", userdetail);

  const updatesubadminmutation = useMutation({
    mutationFn: ({ formData, id }) => updatesubadminbyadmin(formData, id),
    onSuccess: (response) => {
      // console.log("updatemutation response", response);
      toast.success(response.message || "Updated successfully");
      queryClient.invalidateQueries(["subadmins"]);
      queryClient.invalidateQueries(["subadmins", id]);
      if (response.success) {
        router.back();
      }
    },
    onError: (error) => {
      toast.error(error.message || "Update failed");
    },
  });

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6  p-5">
          {/* LEFT: Image Section */}
          <div className="flex flex-col items-center gap-4 md:col-span-1">
            <div className="relative w-48 h-48 rounded-lg border-2 border-dashed flex items-center justify-center bg-gray-100 dark:bg-gray-900 dark:border-gray-600 overflow-hidden">
              {file ? (
                <img
                  src={URL.createObjectURL(file)}
                  alt="preview"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : data.user.imageurl ? (
                <img
                  src={data?.user?.imageurl}
                  alt="preview"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <span className="text-gray-400 text-sm">Profile Image</span>
              )}

              {updatesubadminmutation.isPending && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <ImSpinner2 className="animate-spin text-white text-2xl" />
                </div>
              )}
            </div>

            <label className="cursor-pointer px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 bg-blue-100 text-blue-800">
              {updatesubadminmutation.isPending ? (
                <>
                  <ImSpinner2 className="animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <FaCloudUploadAlt />
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
            className={`
                         md:col-span-2 bg-green-50 dark:bg-gray-900 rounded-xl shadow-lg p-6 space-y-6
                         transition-all duration-300
                         ${
                           updatesubadminmutation.isPending
                             ? "opacity-60 pointer-events-none blur-[1px]"
                             : ""
                         }
                      `}
          >
            <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 text-center font-serif italic">
              Update Subadmin
            </h2>

            {/* First + Last Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <FaUser className="text-green-600" />
                <input
                  type="text"
                  name="first_name"
                  value={userdetail.first_name}
                  onChange={onChange}
                  placeholder="First Name"
                  disabled={updatesubadminmutation.isPending}
                  className="w-full p-3 border rounded focus:ring-2 focus:ring-green-400 dark:bg-black dark:text-white"
                />
              </div>

              <div className="flex items-center gap-2">
                <FaUser className="text-green-600" />
                <input
                  type="text"
                  name="last_name"
                  value={userdetail.last_name}
                  disabled={updatesubadminmutation.isPending}
                  onChange={onChange}
                  placeholder="Last Name"
                  className="w-full p-3 border rounded focus:ring-2 focus:ring-green-400 dark:bg-black dark:text-white"
                />
              </div>
            </div>

            {/* Email + Age */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <FaEnvelope className="text-green-600" />
                <input
                  type="email"
                  name="email"
                  value={userdetail.email}
                  disabled={updatesubadminmutation.isPending}
                  onChange={onChange}
                  placeholder="Email"
                  className="w-full p-3 border rounded focus:ring-2 focus:ring-green-400 dark:bg-black dark:text-white"
                />
              </div>

              <div className="flex items-center gap-2">
                <FaBirthdayCake className="text-green-600" />
                <input
                  type="number"
                  name="age"
                  value={userdetail.age}
                  disabled={updatesubadminmutation.isPending}
                  onChange={onChange}
                  placeholder="Age"
                  className="w-full p-3 border rounded focus:ring-2 focus:ring-green-400 dark:bg-black dark:text-white"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={updatesubadminmutation.isPending}
              className="w-full bg-green-700 hover:bg-green-800 disabled:opacity-50 text-white font-bold py-3 rounded flex items-center justify-center gap-2"
            >
              {updatesubadminmutation.isPending ? (
                <>
                  <ImSpinner2 className="animate-spin text-lg" />
                  Updating...
                </>
              ) : (
                "Update Subadmin"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateSubadminPage;
