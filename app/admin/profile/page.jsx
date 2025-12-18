"use client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  MdOutlineDriveFileRenameOutline,
  MdEmail,
  MdPerson,
  MdCake,
  MdImage,
} from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { MdClose } from "react-icons/md";
import { updateprofile } from "../../customhook/auth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { setinfo } from "../../store/Adminslice";
import { FaCloudUploadAlt } from "react-icons/fa"; // upload icon
import { ImSpinner2 } from "react-icons/im"; // spinner icon

const Adminprofile = () => {
  const admin = useSelector((state) => state.Admin);
  const dispatch = useDispatch();
  const [editmode, seteditmode] = useState(false);
  const [file, setfile] = useState(null);
  const [userDetail, setuserDetail] = useState({
    id: "",
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    age: "",
  });

  useEffect(() => {
    const setdata = () => {
      setuserDetail({
        id: admin.id,
        first_name: admin.first_name,
        last_name: admin.last_name,
        username: admin.username,
        email: admin.email,
        age: admin.age,
      });
    };
    setdata();
  }, [admin]);

  const onChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setuserDetail((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onfileChange = (e) => {
    setfile(e.target.files[0]);
  };

  const submituseMutation = useMutation({
    mutationFn: async (formdata) => {
      const response = await updateprofile(formdata);
      console.log("update mutation admin profile", response);
      return response;
    },
    onSuccess: (response) => {
      dispatch(setinfo(response.user));
      toast.success(response.message || "update sucessfully");
      seteditmode((prev) => !prev);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Profile update failed");
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    seteditmode((prev) => !prev);
    console.log("Form Data:", userDetail);
    console.log("Image File:", file);
    const formdata = new FormData();
    formdata.append("first_name", userDetail.first_name);
    formdata.append("last_name", userDetail.last_name);
    formdata.append("username", userDetail.username);
    formdata.append("email", userDetail.email);
    formdata.append("age", userDetail.age);

    if (file) {
      formdata.append("file", file);
    }
    submituseMutation.mutate(formdata);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white">
      {/* Header */}
      <div className="border rounded-lg p-5 mb-6 bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <h1 className="text-3xl font-serif italic">Admin Profile</h1>
        <p className="text-gray-500 dark:text-gray-400">Admin of OnService</p>
      </div>

      {/* Main Card */}
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="border rounded-lg p-6 bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT: Image Section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-48 h-48 rounded-lg border-2 border-dashed flex items-center justify-center bg-gray-100 dark:bg-gray-900 dark:border-gray-600 overflow-hidden">
              {/* Image or placeholder */}
              {file ? (
                <img
                  src={URL.createObjectURL(file)}
                  alt="preview"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : admin?.imageurl ? (
                <img
                  src={admin.imageurl}
                  alt="preview"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <span className="text-gray-400 text-sm">Profile Image</span>
              )}

              {/* Loading overlay */}
              {submituseMutation.isPending && (
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-lg">
                  <ImSpinner2 className="animate-spin text-white text-2xl" />
                </div>
              )}
            </div>

            <label
              className={`cursor-pointer px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2
    ${editmode ? "bg-blue-100 text-blue-800" : "bg-gray-300 text-gray-600 cursor-not-allowed"}`}
            >
              {submituseMutation.isPending ? (
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
                disabled={!editmode || submituseMutation.isPending} // disable while uploading
                onChange={onfileChange}
              />
            </label>
          </div>

          {/* RIGHT: User Detail Section */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Username */}
              <div
                className={`flex items-center gap-3 p-3 rounded-lg bg-gray-100 dark:bg-gray-900 ${!editmode && "opacity-70"}`}
              >
                <MdOutlineDriveFileRenameOutline />
                <input
                  type="text"
                  name="username"
                  value={userDetail.username ?? ""}
                  onChange={onChange}
                  disabled={!editmode}
                  placeholder="Username"
                  className="bg-transparent outline-none w-full"
                />
              </div>

              {/* Email */}
              <div
                className={`flex items-center gap-3 p-3 rounded-lg bg-gray-100 dark:bg-gray-900 ${!editmode && "opacity-70"}`}
              >
                <MdEmail />
                <input
                  type="email"
                  name="email"
                  value={userDetail.email ?? ""}
                  onChange={onChange}
                  disabled={!editmode}
                  placeholder="Email"
                  className="bg-transparent outline-none w-full"
                />
              </div>

              {/* First Name */}
              <div
                className={`flex items-center gap-3 p-3 rounded-lg bg-gray-100 dark:bg-gray-900 ${!editmode && "opacity-70"}`}
              >
                <MdPerson />
                <input
                  type="text"
                  name="first_name"
                  value={userDetail.first_name ?? ""}
                  onChange={onChange}
                  disabled={!editmode}
                  placeholder="First Name"
                  className="bg-transparent outline-none w-full"
                />
              </div>

              {/* Last Name */}
              <div
                className={`flex items-center gap-3 p-3 rounded-lg bg-gray-100 dark:bg-gray-900 ${!editmode && "opacity-70"}`}
              >
                <MdPerson />
                <input
                  type="text"
                  name="last_name"
                  value={userDetail.last_name ?? ""}
                  onChange={onChange}
                  disabled={!editmode}
                  placeholder="Last Name"
                  className="bg-transparent outline-none w-full"
                />
              </div>

              {/* Age */}
              <div
                className={`flex items-center gap-3 p-3 rounded-lg bg-gray-100 dark:bg-gray-900 ${!editmode && "opacity-70"}`}
              >
                <MdCake />
                <input
                  type="number"
                  name="age"
                  value={userDetail.age ?? ""}
                  onChange={onChange}
                  disabled={!editmode}
                  placeholder="Age"
                  className="bg-transparent outline-none w-full"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 mt-6">
              <button
                type="button"
                onClick={() => seteditmode((prev) => !prev)}
                disabled={submituseMutation.isPending} // disable during upload
                className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition
    ${
      editmode
        ? "bg-red-500 text-white hover:bg-red-400"
        : "bg-yellow-500 text-black hover:bg-yellow-400"
    } 
    ${submituseMutation.isPending ? "opacity-50 cursor-not-allowed" : ""}`} // visual feedback
              >
                {editmode ? <MdClose /> : <CiEdit />}
                {editmode ? "Cancel Edit" : "Enable Update"}
              </button>

              <button
                type="submit"
                disabled={!editmode}
                className="flex items-center gap-2 px-6 py-2 rounded-lg bg-green-600 text-white hover:bg-green-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {submituseMutation.isPending ? (
                  <>
                    <ImSpinner2 className="animate-spin" />
                    uploading.....
                  </>
                ) : (
                  <>
                    <FaCloudUploadAlt />
                    upload
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Adminprofile;
