"use client";

import { useState, useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

// API Calls
import {
  getUserProfile,
  getservicecurrentuser,
  deleteservice,
} from "../../customhook/user";

import { uploadprofileimage, deleteprofileimage } from "../../customhook/auth";

import { MdPermDeviceInformation, MdOutlineAddBusiness } from "react-icons/md";

import Swal from "sweetalert2";
import Link from "next/link";
import { toast } from "react-toastify";

import ProfileCard from "../../component/ProfileCard";
import ServiceCard from "../../component/ServiceCard";

export default function ProfilePage() {
  const queryClient = useQueryClient();

  // Local UI State
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");
  const [showService, setShowService] = useState(false);

  // Fetch User Profile
  const {
    data: user,
    isLoading: loadingUser,
    error: userError,
  } = useQuery({
    queryKey: ["userProfile"],
    queryFn: getUserProfile,
    select: (res) => res, // return original response
  });

  // Fetch Services
  const {
    data: userservice = [],
    isLoading: loadingServices,
    error: serviceError,
  } = useQuery({
    queryKey: ["userServices"],
    queryFn: getservicecurrentuser,
    select: (res) => res?.data || [],
    enabled: !!user, // runs after user loads
  });

  const loading = loadingUser || loadingServices;
  const error = userError || serviceError;

  const canAddService = useMemo(() => user?.totalservice < 2, [user]);

  // Delete Service
  const handleDeleteService = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
    });

    if (!result.isConfirmed) return;

    try {
      const response = await deleteservice(id);
      toast.success(response.message);

      // Refresh service list
      queryClient.invalidateQueries(["userServices"]);
    } catch (err) {
      toast.error("Failed to delete service");
    }
  };

  // File preview
  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  // Upload Profile Image
  const handleUpload = async () => {
    if (!file) return setMessage("Please select an image first");

    setMessage("Uploading...");

    try {
      const data = await uploadprofileimage(file);

      if (data?.imageUrl) {
        setMessage("Profile image updated!");

        // Refresh user
        queryClient.invalidateQueries(["userProfile"]);

        setPreview(null);
        setFile(null);
      } else {
        setMessage("Upload failed");
      }
    } catch (err) {
      setMessage("Something went wrong");
    }
  };

  // Delete Profile Image
  const handleDeleteProfileImage = async () => {
    const result = await Swal.fire({
      title: "Remove image?",
      icon: "warning",
      showCancelButton: true,
    });

    if (!result.isConfirmed) return;

    try {
      const res = await deleteprofileimage();
      toast.success(res?.message || "Deleted");

      // Refresh user
      queryClient.invalidateQueries(["userProfile"]);
    } catch (err) {
      toast.error("Error deleting image");
    }
  };

  if (loading)
    return <p className="text-center mt-20 text-gray-500">Loading...</p>;

  if (error)
    return (
      <p className="text-center mt-20 text-red-500">Failed to load profile</p>
    );

  const userInfo = [
    { label: "Name", value: `${user?.first_name} ${user?.last_name}` },
    { label: "Username", value: user?.username },
    { label: "Email", value: user?.email },
    { label: "Age", value: user?.age },
  ];

  return (
    <main className="min-h-screen p-6 w-full flex flex-col items-center bg-sky-50 dark:bg-gray-950 duration-300">
      {/* Profile Card */}
      <ProfileCard
        user={user}
        userInfo={userInfo}
        preview={preview}
        file={file}
        loading={loading}
        message={message}
        showService={showService}
        canAddService={canAddService}
        handleFileChange={handleFileChange}
        handleUpload={handleUpload}
        handleDeleteProfileImage={handleDeleteProfileImage}
        setShowService={setShowService}
      />

      {/* Services */}
      {showService && (
        <div className="mt-8 w-full">
          <h2 className="text-xl text-center font-bold mb-4 text-sky-700">
            My Services
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {userservice.length === 0 ? (
              <p className="text-center text-gray-500 col-span-full">
                No services found
              </p>
            ) : (
              userservice.map((s) => (
                <ServiceCard
                  key={s.id}
                  service={s}
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
