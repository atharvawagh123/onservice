"use client";

import { getenquiry, deletedEnquiry } from "../../customhook/enquiry";
import { useEffect, useState, useCallback } from "react";
import EnquiryCard from "../../component/EnquiryCard";
import { toast } from "react-toastify";
// import Link from "next/link";
// import { IoArrowBackOutline } from "react-icons/io5";

const Enquiry = () => {
  const [enquiries, setEnquiries] = useState([]);

  const fetchEnquiry = useCallback(async () => {
    try {
      const response = await getenquiry();
      if (response.success) {
        setEnquiries(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    const loadData = async () => {
      await fetchEnquiry();
    };
    loadData();
  }, [fetchEnquiry]);

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

  if (enquiries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        {/* empty state UI */}
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-6">
      <h1 className="text-center text-3xl font-serif italic p-5">
        All Business Enquiry
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {enquiries.map((item, index) => (
          <EnquiryCard key={index} enquiry={item} onDelete={removeEnquiry} />
        ))}
      </div>
    </div>
  );
};

export default Enquiry;
