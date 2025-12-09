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
import ProfileCard from "../../component/ProfileCard";

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
      <ProfileCard
        user={user}
        preview={preview}
        loading={loading}
        file={file}
        handleUpload={handleUpload}
        handleDeleteProfileImage={handleDeleteProfileImage}
        handleFileChange={handleFileChange}
        message={message}
        canAddService={canAddService}
        showService={showService}
        setShowService={setShowService}
        userInfo={userInfo}
      />

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
