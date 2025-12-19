import { FaTrash } from 'react-icons/fa';

export default function EnquiryCard({ enquiry, onDelete }) {
  return (
    <div className="relative w-full rounded-xl border border-gray-200 bg-white p-4 shadow-md transition-colors sm:p-6 dark:border-gray-700 dark:bg-gray-800">
      {/* Delete Button */}
      <button
        onClick={() => onDelete(enquiry.id)}
        className="absolute top-3 right-3 rounded-full bg-red-500 p-2 text-white shadow-md transition hover:bg-red-600"
      >
        <FaTrash size={16} />
      </button>

      <h2 className="mb-3 text-lg font-semibold text-gray-900 sm:mb-4 sm:text-xl dark:text-white">
        Enquiry Details
      </h2>

      <div className="space-y-1.5 text-sm text-gray-700 sm:space-y-2 sm:text-base dark:text-gray-300">
        {/* Name */}
        <p>
          <span className="font-sans font-semibold">Name:</span>{' '}
          <span className="font-serif">{enquiry.name}</span>
        </p>

        {/* Email */}
        <p>
          <span className="font-sans font-semibold">Email:</span>{' '}
          <span className="font-serif">{enquiry.email}</span>
        </p>

        {/* Phone */}
        <p>
          <span className="font-sans font-semibold">Phone:</span>{' '}
          <span className="font-serif">{enquiry.phone}</span>
        </p>

        {/* Message */}
        <p className="leading-relaxed">
          <span className="font-sans font-semibold">Message:</span>{' '}
          <span className="font-serif">{enquiry.message}</span>
        </p>

        {/* Service ID */}
        <p>
          <span className="font-sans font-semibold">Service ID:</span>{' '}
          <span className="font-serif">{enquiry.service_id}</span>
        </p>

        {/* Status */}
        <p className="flex items-center gap-2">
          <span className="font-sans font-semibold">Status:</span>

          <span
            className={`rounded-full px-2 py-1 font-sans text-xs sm:px-3 sm:text-sm ${
              enquiry.status === 'pending'
                ? 'bg-yellow-200 text-yellow-800 dark:bg-yellow-700 dark:text-white'
                : 'bg-green-200 text-green-800 dark:bg-green-700 dark:text-white'
            }`}
          >
            {enquiry.status}
          </span>
        </p>

        {/* Created At */}
        <p>
          <span className="font-sans font-semibold">Created At:</span>{' '}
          <span className="font-serif">
            {new Date(enquiry.created_at).toLocaleString()}
          </span>
        </p>

        {/* Updated At */}
        <p>
          <span className="font-sans font-semibold">Updated At:</span>{' '}
          <span className="font-serif">
            {new Date(enquiry.updated_at).toLocaleString()}
          </span>
        </p>

        {/* User ID */}
        <p>
          <span className="font-sans font-semibold">User ID:</span>{' '}
          <span className="font-serif">{enquiry.user_id}</span>
        </p>
      </div>
    </div>
  );
}
