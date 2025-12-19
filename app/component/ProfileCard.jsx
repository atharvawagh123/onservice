'use client';

import { FaFileUpload } from 'react-icons/fa';
import {
  MdDeleteForever,
  MdVisibility,
  MdOutlineVisibilityOff,
  MdOutlineAddBusiness,
  MdPermDeviceInformation,
} from 'react-icons/md';
import Link from 'next/link';

export default function ProfileCard({
  user,
  userInfo = [],
  preview,
  file,
  loading,
  message,
  showService,
  canAddService,
  handleFileChange,
  handleUpload,
  handleDeleteProfileImage,
  setShowService,
}) {
  return (
    <div className="mx-auto w-full max-w-md rounded-xl bg-white p-6 shadow-lg transition-colors duration-300 sm:p-8 dark:bg-gray-900">
      <h1 className="mb-6 text-center text-2xl font-bold text-sky-700 sm:text-left sm:text-3xl dark:text-sky-400">
        My Profile
      </h1>

      {/* =============== PROFILE IMAGE SECTION =============== */}
      <div className="mb-4 flex flex-col items-center">
        {/* Image Wrapper */}
        <div className="relative mb-3 h-32 w-32 overflow-hidden rounded-full border-2 border-sky-400 shadow-md dark:border-sky-600">
          <img
            src={preview || user?.imageurl || '/image.png'}
            alt="Profile"
            className="h-full w-full object-cover"
          />

          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
              <div className="animate-pulse text-sm text-white">
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
            className="flex cursor-pointer items-center gap-2 rounded-md bg-sky-500 px-5 py-2 font-semibold text-white shadow-sm transition-all hover:bg-sky-600 hover:shadow-md"
          >
            <FaFileUpload className="text-xl" />
            <span>Select File</span>
          </label>
        </div>

        {/* Upload / Delete */}
        <div className="mt-3 flex w-full gap-2">
          {/* Upload */}
          <button
            onClick={handleUpload}
            disabled={!file || loading}
            className="flex flex-1 items-center justify-center gap-2 rounded-md bg-sky-500 px-4 py-2 font-semibold text-white shadow-sm transition-all hover:bg-sky-600 hover:shadow-md disabled:opacity-50"
          >
            <FaFileUpload className="text-xl" />
            <span>{loading ? 'Uploading...' : 'Upload'}</span>
          </button>

          {/* Delete */}
          {user?.imageurl && (
            <button
              onClick={handleDeleteProfileImage}
              className="flex items-center justify-center gap-2 rounded-md bg-black px-4 py-2 font-semibold text-white shadow-sm transition-all hover:bg-gray-800 hover:shadow-md"
            >
              <MdDeleteForever className="text-2xl" />
              <span>Delete</span>
            </button>
          )}
        </div>

        {/* Message */}
        {message && (
          <p className="mt-3 text-center font-medium text-sky-600 dark:text-sky-400">
            {message}
          </p>
        )}
      </div>

      {/* =============== USER INFO SECTION =============== */}
      <div className="space-y-4">
        {userInfo.map(item => (
          <p
            key={item.label}
            className="flex flex-col sm:flex-row sm:items-center"
          >
            <strong className="w-24 text-gray-800 dark:text-gray-100">
              {item.label}:
            </strong>
            <span className="text-gray-900 dark:text-gray-200">
              {item.value}
            </span>
          </p>
        ))}
      </div>

      {/* =============== SHOW / HIDE SERVICES BUTTON =============== */}
      <button
        className="mt-6 flex w-full items-center justify-center gap-2 rounded bg-sky-500 py-2 font-medium text-white transition-colors duration-200 hover:bg-sky-600 active:scale-95 dark:bg-sky-600 dark:hover:bg-sky-700"
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

      {/* =============== ADD SERVICE BUTTON =============== */}
      {canAddService && (
        <Link
          href="/service/add-service"
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gray-200 px-4 py-2 text-gray-800 transition-colors duration-200 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
        >
          <MdOutlineAddBusiness className="text-lg sm:text-xl" />
          <span className="font-medium">Add Service</span>
        </Link>
      )}

      {/* =============== ADD ENQUIRY BUTTON =============== */}
      <Link
        href="/enquiry"
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gray-200 px-4 py-2 text-gray-800 transition-colors duration-200 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
      >
        <MdPermDeviceInformation className="text-lg sm:text-xl" />
        <span className="font-medium">Add Enquiry</span>
      </Link>
    </div>
  );
}
