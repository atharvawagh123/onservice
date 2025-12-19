import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { ariseenquiry } from '../customhook/enquiry';

const ServiceCard = ({ service }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState('');

  const [formData, setFormData] = useState({
    service_id: '',
    phone: '',
    message: '',
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitEnquiry = async e => {
    e.preventDefault();

    if (!formData.phone || !formData.message || !formData.service_id) {
      toast.error('Please enter all required information!');
      return;
    }

    try {
      const response = await ariseenquiry(formData);
      if (response.success) {
        toast.success(response.message);
        setIsModalOpen(false);
        setFormData({ service_id: '', phone: '', message: '' });
      }
    } catch (error) {
      toast.error(error?.error || 'Something went wrong');
    }
  };

  if (!service) {
    return (
      <p className="text-center text-gray-500 dark:text-gray-400">
        No service data provided.
      </p>
    );
  }

  return (
    <>
      {/* Card */}
      <div className="flex min-h-[250px] flex-col justify-between rounded-lg bg-white p-3 shadow-md transition-transform hover:-translate-y-1 hover:shadow-lg sm:p-4 dark:bg-gray-900">
        {/* Image */}
        <div className="mb-3 h-32 w-full overflow-hidden rounded-lg sm:h-40 md:h-44">
          <img
            src={service.imageurl || '/image.png'}
            alt={service.title}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col">
          <h2 className="mb-1 truncate text-lg font-semibold text-gray-900 sm:text-xl dark:text-white">
            {service.title}
          </h2>

          <p className="mb-2 line-clamp-2 text-xs text-gray-700 sm:text-sm dark:text-gray-300">
            {service.description}
          </p>

          <p className="text-sm font-medium text-sky-600 sm:text-base dark:text-sky-400">
            ${service.price.toFixed(2)}
          </p>
        </div>

        {/* Footer */}
        <div className="mt-3 flex flex-col gap-1">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            User ID: {service.userId}
          </p>
          <p className="text-[10px] text-gray-400 dark:text-gray-500">
            Created: {new Date(service.createdat).toLocaleDateString()}
          </p>

          <button
            onClick={() => {
              setSelectedServiceId(service.id);
              setFormData(prev => ({ ...prev, service_id: service.id }));
              setIsModalOpen(true);
            }}
            className="w-full rounded-md bg-blue-600 px-3 py-1 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Enquiry
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-11/12 max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
            <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
              Enquiry Form {selectedServiceId}
            </h3>

            <form className="flex flex-col gap-4" onSubmit={submitEnquiry}>
              {/* Service ID */}
              <div className="flex flex-col">
                <label className="mb-1 font-semibold text-gray-700 dark:text-gray-300">
                  Service ID
                </label>
                <input
                  disabled
                  type="text"
                  value={formData.service_id}
                  className="rounded border border-gray-300 bg-gray-100 p-2 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>

              {/* Phone */}
              <div className="flex flex-col">
                <label className="mb-1 font-semibold text-gray-700 dark:text-gray-300">
                  Phone Number
                </label>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter your phone number"
                  className="rounded border border-gray-300 bg-gray-100 p-2 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>

              {/* Message */}
              <div className="flex flex-col">
                <label className="mb-1 font-semibold text-gray-700 dark:text-gray-300">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Enter your message"
                  className="rounded border border-gray-300 bg-gray-100 p-2 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded bg-gray-300 px-4 py-2 text-gray-800 hover:bg-gray-400 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ServiceCard;
