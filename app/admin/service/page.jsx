"use client";

import { useSelector } from "react-redux";

const Service = () => {
  const { services, total } = useSelector((state) => state.services);

  console.log("from service page : ", services);

  return (
    <>
      <div className="mb-10 flex items-center justify-between bg-white p-6 rounded-xl shadow">
        <div>
          <h1 className="font-serif italic text-4xl text-gray-900">
            All Services in OnService
          </h1>
          <p className="text-gray-600 mt-1">
            Manage and monitor all registered Services
          </p>
        </div>

        <div className="bg-gray-100 px-5 py-3 rounded-xl shadow-inner">
          <p className="text-gray-700 font-medium text-lg">Total Services</p>
          <h2 className="text-1xl font-bold text-gray-900">{total}</h2>
        </div>
      </div>

      <div>
        {services.map((service, index) => (
          <h1 key={index}>{service.title}</h1>
        ))}
      </div>
    </>
  );
};

export default Service;
