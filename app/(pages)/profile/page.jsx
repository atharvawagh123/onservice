"use client";

import { useEffect, useState, useMemo } from "react";
import {
  getUserProfile,
  getservicecurrentuser,
  deleteservice,
} from "../../customhook/user";
import {
  MdVisibility,
  MdOutlineVisibilityOff,
  MdPermDeviceInformation,
  MdOutlineAddBusiness,
  MdDeleteForever,
} from "react-icons/md";
import { FaFileUpload } from "react-icons/fa";
import { toast } from "react-toastify";
import ServiceCard from "../../component/ServiceCard";
import Swal from "sweetalert2";
import Link from "next/link";
import { uploadprofileimage, deleteprofileimage } from "../../customhook/auth";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [userservice, setUserservice] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [file, setFile] = useState(null);
  const [showService, setShowService] = useState(false);
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState(null);

  // Fetch user profile and services
  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileRes = await getUserProfile();
        if (profileRes.success) setUser(profileRes);

        const serviceRes = await getservicecurrentuser();
        if (serviceRes?.data) setUserservice(serviceRes.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load profile or services");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const canAddService = useMemo(() => user?.totalservice < 2, [user]);

  // Service delete handler
  const handleDeleteService = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });
    if (!result.isConfirmed) return;

    try {
      const response = await deleteservice(id);
      if (response) {
        toast.success(response.message);
        const serviceRes = await getservicecurrentuser();
        if (serviceRes?.data) setUserservice(serviceRes.data);
      }
    } catch (err) {
      toast.error(err);
    }
  };
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile)); // Only preview!
  };

  // Upload profile image
  const handleUpload = async () => {
    if (!file) return setMessage("Please select an image first");

    setLoading(true);
    setMessage("");

    try {
      const data = await uploadprofileimage(file);
      if (data?.imageUrl) {
        setUser((prev) => ({ ...prev, imageUrl: data.imageUrl })); // Real URL
        setMessage("Profile image updated successfully!");
        setPreview(null); // Remove preview after real upload
        setFile(null);
      } else {
        setMessage(data.error || "Upload failed");
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  // Delete profile image
  const handleDeleteProfileImage = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });
    if (!result.isConfirmed) return;
    try {
      const response = await deleteprofileimage();
      if (response?.message) {
        toast.success(response.message);
        setUser((prev) => ({ ...prev, imageUrl: null }));
      } else {
        toast.error(response?.error || "Failed to delete image");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  if (loading)
    return (
      <p className="text-center mt-20 text-gray-500 dark:text-gray-400">
        Loading...
      </p>
    );
  if (error)
    return (
      <p className="text-center mt-20 text-red-500 dark:text-red-400">
        {error}
      </p>
    );

  const userInfo = [
    { label: "Name", value: `${user?.first_name} ${user?.last_name}` },
    { label: "Username", value: user?.username },
    { label: "Email", value: user?.email },
    { label: "Age", value: user?.age },
  ];

  return (
    <main className="min-h-screen p-6 w-full flex flex-col items-center bg-sky-50 dark:bg-gray-950 transition-colors duration-300">
      {/* Profile Card */}
      <div className="bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-xl shadow-lg max-w-md w-full mx-auto transition-colors duration-300">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-sky-700 dark:text-sky-400 text-center sm:text-left">
          My Profile
        </h1>

        {/* Profile Image */}
        <div className="flex flex-col items-center mb-4">
          {/* Profile Image */}
          <div className="w-32 h-32 mb-3 rounded-full overflow-hidden border-2 border-sky-400 dark:border-sky-600 relative shadow-md">
            <img
              src={preview || user?.imageurl || "/image.png"}
              alt="Profile"
              className="w-full h-full object-cover"
            />

            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                <div className="text-white text-sm animate-pulse">
                  Uploading...
                </div>
              </div>
            )}
          </div>

          {/* File Input */}
          <div className="flex flex-col items-center">
            <input
              type="file"
              id="file-upload"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              disabled={loading}
            />

            <label
              htmlFor="file-upload"
              className="
        cursor-pointer 
        bg-sky-500 hover:bg-sky-600 
        text-white font-semibold 
        py-2 px-5 rounded-md 
        flex items-center gap-2 
        transition-all 
        shadow-sm hover:shadow-md
      "
            >
              <FaFileUpload className="text-xl" />
              <span>Select File</span>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 mt-3 w-full">
            {/* Upload Button */}
            <button
              onClick={handleUpload}
              disabled={!file || loading}
              className="
        flex items-center justify-center gap-2 flex-1
        bg-sky-500 hover:bg-sky-600 
        text-white font-semibold 
        py-2 px-4 rounded-md 
        transition-all disabled:opacity-50 
        shadow-sm hover:shadow-md
      "
            >
              <FaFileUpload className="text-xl" />
              <span>{loading ? "Uploading..." : "Upload"}</span>
            </button>

            {/* Delete Button */}
            {user?.imageUrl && (
              <button
                onClick={handleDeleteProfileImage}
                className="
          flex items-center justify-center gap-2 
          bg-black hover:bg-gray-800 
          text-white font-semibold 
          py-2 px-4 rounded-md 
          transition-all shadow-sm hover:shadow-md
        "
              >
                <MdDeleteForever className="text-2xl" />
                <span>Delete</span>
              </button>
            )}
          </div>

          {/* Message */}
          {message && (
            <p className="text-center text-sky-600 dark:text-sky-400 mt-3 font-medium">
              {message}
            </p>
          )}
        </div>

        {/* User Info */}
        <div className="space-y-4">
          {userInfo.map((item) => (
            <p
              key={item.label}
              className="flex flex-col sm:flex-row sm:items-center"
            >
              <strong className="text-gray-800 dark:text-gray-100 w-24">
                {item.label}:
              </strong>
              <span className="text-gray-900 dark:text-gray-200">
                {item.value}
              </span>
            </p>
          ))}
        </div>

        {/* Toggle Services */}
        <button
          className="mt-6 w-full py-2 bg-sky-500 hover:bg-sky-600 dark:bg-sky-600 dark:hover:bg-sky-700 text-white rounded font-medium transition-colors duration-200 active:scale-95 flex items-center justify-center gap-2"
          onClick={() => setShowService(!showService)}
        >
          {showService ? (
            <>
              <MdOutlineVisibilityOff size={20} /> Hide Services
            </>
          ) : (
            <>
              <MdVisibility size={20} /> Show Services
            </>
          )}
        </button>

        {/* Add Service */}
        {canAddService && (
          <Link
            href="/service/add-service"
            className="mt-4 w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            <MdOutlineAddBusiness className="text-lg sm:text-xl" />
            <span className="font-medium">Add Service</span>
          </Link>
        )}

        {/* Add Enquiry */}
        <Link
          href="/enquiry"
          className="mt-4 w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-200"
        >
          <MdPermDeviceInformation className="text-lg sm:text-xl" />
          <span className="font-medium">Add Enquiry</span>
        </Link>
      </div>

      {/* Services Section */}
      {showService && (
        <div className="mt-8 w-full max-w-full p-5">
          <h2 className="text-xl text-center font-bold mb-4 text-sky-700 dark:text-sky-400">
            My Services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 w-full">
            {userservice.length === 0 ? (
              <p className="text-gray-500 text-center dark:text-gray-400 col-span-full">
                No services found
              </p>
            ) : (
              userservice.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  onDelete={handleDeleteService}
                />
              ))
            )}
          </div>
        </div>
      )}
    </main>
  );
}
