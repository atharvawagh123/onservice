import { MdDeleteForever, MdEdit } from "react-icons/md";
import { MdOutlineMarkEmailRead } from "react-icons/md";

import Link from "next/link";

export default function ServiceCard({ service, onDelete }) {
  return (
    <div className="flex flex-col h-full p-4 bg-white dark:bg-gray-900 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
      {/* Image */}
      <div className="w-full h-48 sm:h-56 md:h-64 lg:h-72 overflow-hidden rounded-lg mb-4">
        <img
          src={service.imageurl || "/image.png"}
          alt={service.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-lg sm:text-xl mb-2 truncate">
          {service.title}
        </h3>

        <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base mb-2 line-clamp-3">
          {service.description}
        </p>

        <p className="font-medium text-sky-600 dark:text-sky-400 mt-auto">
          ${service.price.toFixed(2)}
        </p>

        <p className="font-medium text-gray-500 dark:text-gray-400 mt-1 text-xs sm:text-sm">
          Service ID: {service.id}
        </p>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row sm:justify-between gap-2 mt-4">
        <button
          onClick={() => onDelete(service.id)}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors duration-200 text-sm sm:text-base"
        >
          <MdDeleteForever size={20} /> Delete
        </button>

        <Link
          href={`/service/update-service/${service.id}`}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black rounded-md transition-colors duration-200 text-sm sm:text-base"
        >
          <MdEdit size={20} /> Edit
        </Link>

        <Link
          href={`/enquiry/${service.id}`}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-400 hover:bg-green-500 text-black rounded-md transition-colors duration-200 text-sm sm:text-base"
        >
          <MdOutlineMarkEmailRead size={20} /> All Enquiry
        </Link>
      </div>
    </div>
  );
}
