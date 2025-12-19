'use client';

import { getenquiry, deletedEnquiry } from '../../customhook/enquiry';
import { useEffect, useState, useCallback } from 'react';
import EnquiryCard from '../../component/EnquiryCard';
import { toast } from 'react-toastify';
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

  const removeEnquiry = async id => {
    try {
      const response = await deletedEnquiry(id);
      if (response.success) {
        toast.success(response.message);
        fetchEnquiry();
      }
    } catch (error) {
      toast.error(error?.error || 'Something went wrong');
    }
  };

  if (enquiries.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        {/* empty state UI */}
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-6">
      <h1 className="p-5 text-center font-serif text-3xl italic">
        All Business Enquiry
      </h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {enquiries.map((item, index) => (
          <EnquiryCard key={index} enquiry={item} onDelete={removeEnquiry} />
        ))}
      </div>
    </div>
  );
};

export default Enquiry;
