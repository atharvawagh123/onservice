"use client";

import { getenquiry } from "../../customhook/enquiry";
import { useMemo, useEffect, useState } from "react";
import EnquiryCard from "../../component/EnquiryCard";
import { deletedEnquiry } from "../../customhook/enquiry";
import { toast } from "react-toastify";
import Link from "next/link";
import { IoArrowBackOutline } from "react-icons/io5";

const enquiry = () => {
  const [enquiries, setenquiries] = useState([]);

  useEffect(() => {
    fetchenquiry();
  }, []);
  const fetchenquiry = async () => {
    const response = await getenquiry();
    //   console.log(response);
    if (response.success) {
      // console.log("enquiry : ", response.data);
      setenquiries(response.data);
    }
  };

  const removeenquiry = async (id) => {
    try {
      const response = await deletedEnquiry(id);
      if (response.success) {
        toast.success(response.message);
        fetchenquiry();
      }
    } catch (error) {
      toast.error(error.error);
    }
  };
  const pendingenquiry = useMemo(() => {
    return enquiries.filter((item) => item.status === "pending");
  }, [enquiries]);

  if (enquiries.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-[60vh] px-4 sm:px-6 lg:px-8 
      text-center"
      >
        {/* Icon */}
        <div className="bg-rose-100 dark:bg-gray-800 p-6 rounded-full mb-6 shadow-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-20 w-20 text-rose-500 dark:text-rose-300"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m0 3.75h.007v.008H12V16.5zm0-12a9 9 0 110 18 9 9 0 010-18z"
            />
          </svg>
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-200 mb-3">
          No Enquiry Found
        </h2>

        {/* Subtitle */}
        <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base max-w-md mb-6">
          There are currently no enquiries available. Please check again later
          or refresh the page.
        </p>

        <div className="flex gap-5 ">
          <Link
            href="/profile"
            className="flex items-center gap-2 text-sky-600 dark:text-sky-400 
  hover:text-sky-700 dark:hover:text-sky-300 transition font-medium 
  text-sm sm:text-base"
          >
            <IoArrowBackOutline className="text-lg sm:text-xl" />
            Back to profile page
          </Link>

          {/* Refresh Button */}
          {/* <button
            onClick={() => window.location.reload()}
            className="px-5 py-2 bg-rose-500 hover:bg-rose-600 dark:bg-rose-600 
        dark:hover:bg-rose-700 text-white rounded-md transition shadow-sm"
          >
            Refresh
          </button> */}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 bg-gray-100 dark:bg-gray-900 transition-colors">
      <h1 className="text-center text-3xl font-serif italic p-5 text-gray-900 dark:text-gray-100">
        All Busniess Enquiry
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {enquiries.map((item, index) => (
          <EnquiryCard key={index} enquiry={item} onDelete={removeenquiry} />
        ))}
      </div>
    </div>
  );
};

export default enquiry;
