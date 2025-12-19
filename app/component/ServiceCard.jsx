import { MdDeleteForever, MdEdit } from 'react-icons/md';
import { MdOutlineMarkEmailRead } from 'react-icons/md';

import Link from 'next/link';

export default function ServiceCard({ service, onDelete }) {
  return (
    <div className="flex h-full flex-col rounded-xl bg-white p-4 shadow-md transition-shadow duration-300 hover:shadow-lg dark:bg-gray-900">
      {/* Image */}
      <div className="mb-4 h-48 w-full overflow-hidden rounded-lg sm:h-56 md:h-64 lg:h-72">
        <img
          src={service.imageurl || '/image.png'}
          alt={service.title}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col">
        <h3 className="mb-2 truncate text-lg font-semibold text-gray-900 sm:text-xl dark:text-gray-100">
          {service.title}
        </h3>

        <p className="mb-2 line-clamp-3 text-sm text-gray-700 sm:text-base dark:text-gray-300">
          {service.description}
        </p>

        <p className="mt-auto font-medium text-sky-600 dark:text-sky-400">
          ${service.price.toFixed(2)}
        </p>

        <p className="mt-1 text-xs font-medium text-gray-500 sm:text-sm dark:text-gray-400">
          Service ID: {service.id}
        </p>
      </div>

      {/* Buttons */}
      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-between">
        <button
          onClick={() => onDelete(service.id)}
          className="flex flex-1 items-center justify-center gap-2 rounded-md bg-red-600 px-4 py-2 text-sm text-white transition-colors duration-200 hover:bg-red-700 sm:text-base"
        >
          <MdDeleteForever size={20} /> Delete
        </button>

        <Link
          href={`/service/update-service/${service.id}`}
          className="flex flex-1 items-center justify-center gap-2 rounded-md bg-yellow-400 px-4 py-2 text-sm text-black transition-colors duration-200 hover:bg-yellow-500 sm:text-base"
        >
          <MdEdit size={20} /> Edit
        </Link>

        <Link
          href={`/enquiry/${service.id}`}
          className="flex flex-1 items-center justify-center gap-2 rounded-md bg-green-400 px-4 py-2 text-sm text-black transition-colors duration-200 hover:bg-green-500 sm:text-base"
        >
          <MdOutlineMarkEmailRead size={20} /> All Enquiry
        </Link>
      </div>
    </div>
  );
}
