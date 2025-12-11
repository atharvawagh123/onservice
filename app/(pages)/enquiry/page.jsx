"use client";

import { getenquiry, deletedEnquiry } from "../../customhook/enquiry";
import { useMemo, useEffect, useState } from "react";
import EnquiryCard from "../../component/EnquiryCard";
import { toast } from "react-toastify";
import Link from "next/link";
import { IoArrowBackOutline } from "react-icons/io5";

const Enquiry = () => {
  const [enquiries, setEnquiries] = useState([]);

  // ✅ Move function above useEffect to avoid ESLint error
  const fetchEnquiry = async () => {
    try {
      const response = await getenquiry();
      if (response.success) {
        setEnquiries(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEnquiry();
  }, []);

  const removeEnquiry = async (id) => {
    try {
      const response = await deletedEnquiry(id);
      if (response.success) {
        toast.success(response.message);
        fetchEnquiry();
      }
    } catch (error) {
      toast.error(error?.error || "Something went wrong");
    }
  };

  const pendingEnquiry = useMemo(() => {
    return enquiries.filter((item) => item.status === "pending");
  }, [enquiries]);

  if (enquiries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
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

        <h2 className="text-2xl sm:text-3xl font-bold mb-3">
          No Enquiry Found
        </h2>

        <p className="text-gray-600 dark:text-gray-400 max-w-md mb-6">
          There are currently no enquiries available. Please check again later.
        </p>

        <div className="flex gap-5">
          <Link
            href="/profile"
            className="flex items-center gap-2 text-sky-600"
          >
            <IoArrowBackOutline className="text-lg" />
            Back to profile page
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-6">
      <h1 className="text-center text-3xl font-serif italic p-5">
        All Business Enquiry
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {enquiries.map((item) => (
          <EnquiryCard key={item._id} enquiry={item} onDelete={removeEnquiry} />
        ))}
      </div>
    </div>
  );
};

export default Enquiry;
