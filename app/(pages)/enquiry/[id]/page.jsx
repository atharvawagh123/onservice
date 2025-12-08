"use client";
import React, { useEffect, useState, use } from "react";
import { getserviceenquiry, deletedEnquiry } from "../../../customhook/enquiry";
import EnquiryCard from "../../../component/EnquiryCard";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import Link from "next/link";
import { Suspense } from "react";
import Loading from "./Loading";
import { toast } from "react-toastify";

const ServiceEnquiry = ({ params }) => {
  const unwrappedParams = use(params);
  const { id } = unwrappedParams;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchData();
  }, [id]);
  const fetchData = async () => {
    try {
      const result = await getserviceenquiry(id);
      // console.log(result.enquiries); // This is the array
      setData(result.enquiries); // Set the array only
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const removeenquiry = async (id) => {
    try {
      const response = await deletedEnquiry(id);
      if (response.success) {
        toast.success(response.message);
        fetchData();
      }
    } catch (error) {
      toast.error(error.error);
    }
  };
  if (data.length === 0) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-4 sm:px-6 lg:px-8 py-6 flex flex-col">
        {/* Header with Back Link */}
        <div className="flex items-center mb-10">
          <Link
            href="/profile"
            className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors text-3xl sm:text-4xl"
          >
            <IoArrowBackCircleSharp />
          </Link>
          <h1 className="flex-1 text-2xl sm:text-3xl md:text-4xl font-serif italic text-center">
            Service ID {id}
          </h1>
        </div>

        {/* No Service Card */}
        <div className="flex flex-col items-center justify-center flex-1 text-center px-4">
          {/* Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-24 w-24 sm:h-28 sm:w-28 text-gray-400 dark:text-gray-500 mb-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 17v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6m6 0v2m0-2h6m0 0v2m0-2V7a2 2 0 00-2-2h-1m-3 0h-1a2 2 0 00-2 2v10"
            />
          </svg>

          {/* Title */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-700 dark:text-gray-200 mb-3">
            No Enquiry Found
          </h2>

          {/* Subtitle */}
          <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base mb-6">
            It seems there are no enquiry available at the moment.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-4 sm:px-6 lg:px-8 py-6">
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center mb-6">
          <Link
            href="/profile"
            className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors text-3xl sm:text-4xl"
          >
            <IoArrowBackCircleSharp />
          </Link>
          <h1 className="flex-1 text-2xl sm:text-3xl md:text-4xl font-serif italic text-center">
            Service ID {id}
          </h1>
        </div>

        {data.length !== 0 && loading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((enquiry) => (
              <EnquiryCard
                key={enquiry.id}
                enquiry={enquiry}
                onDelete={removeenquiry}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceEnquiry;
