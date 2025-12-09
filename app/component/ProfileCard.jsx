"use client";

import React from "react";
import { FaFileUpload } from "react-icons/fa";
import { MdDeleteForever, MdVisibility, MdOutlineVisibilityOff, MdOutlineAddBusiness, MdPermDeviceInformation } from "react-icons/md";
import Link from "next/link";

export default function ProfileCard({
  user,
  preview,
  loading,
  file,
  handleUpload,
  handleDeleteProfileImage,
  handleFileChange,
  message,
  canAddService,
  showService,
  setShowService,
  userInfo,
}) {
  return (
    <div className="bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-xl shadow-lg max-w-md w-full mx-auto transition-colors duration-300">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-sky-700 dark:text-sky-400 text-center sm:text-left">
        My Profile
      </h1>

      {/* Profile Image */}
      <div className="flex flex-col items-center mb-4">
        <div className="w-32 h-32 mb-3 rounded-full overflow-hidden border-2 border-sky-400 dark:border-sky-600 relative shadow-md">
          <img
            src={preview || user?.imageurl || "/image.png"}
            alt="Profile"
            className="w-full h-full object-cover"
          />

          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
              <div className="text-white text-sm animate-pulse">Uploading...</div>
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
            className="cursor-pointer bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2 px-5 rounded-md flex items-center gap-2 transition-all shadow-sm hover:shadow-md"
          >
            <FaFileUpload className="text-xl" />
            <span>Select File</span>
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-3 w-full">
          <button
            onClick={handleUpload}
            disabled={!file || loading}
            className="flex items-center justify-center gap-2 flex-1 bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2 px-4 rounded-md transition-all disabled:opacity-50 shadow-sm hover:shadow-md"
          >
            <FaFileUpload className="text-xl" />
            <span>{loading ? "Uploading..." : "Upload"}</span>
          </button>

          {user?.imageurl && (
            <button
              onClick={handleDeleteProfileImage}
              className="flex items-center justify-center gap-2 bg-black hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md transition-all shadow-sm hover:shadow-md"
            >
              <MdDeleteForever className="text-2xl" />
              <span>Delete</span>
            </button>
          )}
        </div>

        {message && (
          <p className="text-center text-sky-600 dark:text-sky-400 mt-3 font-medium">{message}</p>
        )}
      </div>

      {/* User Info */}
      <div className="space-y-4">
        {userInfo.map((item) => (
          <p key={item.label} className="flex flex-col sm:flex-row sm:items-center">
            <strong className="text-gray-800 dark:text-gray-100 w-24">{item.label}:</strong>
            <span className="text-gray-900 dark:text-gray-200">{item.value}</span>
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
  );
}
