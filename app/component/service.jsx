import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { ariseenquiry } from "../customhook/enquiry";

const ServiceCard = ({ service }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState("");
  const [isCooldown, setIsCooldown] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  const cooldownTime = 60;
  const [formData, setFormData] = useState({
    service_id: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    const lastSubmit = localStorage.getItem("lastEnquiryTime");
    if (lastSubmit) {
      const elapsed = Math.floor((Date.now() - parseInt(lastSubmit)) / 1000);
      if (elapsed < cooldownTime) {
        setIsCooldown(true);
        setTimeLeft(cooldownTime - elapsed);
      }
    }
  }, []);

  useEffect(() => {
    if (!isCooldown) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsCooldown(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isCooldown]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitEnquiry = async (e) => {
    e.preventDefault();
    if (!formData.phone || !formData.message || !formData.service_id) {
      toast.error("Please enter all required information!");
      return;
    }

    // console.log(formData);
    try {
      const response = await ariseenquiry(formData);
      if (response.success) {
        toast.success(response.message);
        setIsModalOpen(false);
        setFormData({ phone: "", message: "" });
        // Start cooldown and save time
        const now = Date.now();
        localStorage.setItem("lastEnquiryTime", now.toString());
        setIsCooldown(true);
        setTimeLeft(cooldownTime);
      }
    } catch (error) {
      toast.error(error.error);
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
      <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-3 sm:p-4 flex flex-col justify-between min-h-[250px] transition-transform transform hover:-translate-y-1 hover:shadow-lg">
        {/* Image */}
        <div className="w-full h-32 sm:h-40 md:h-44 mb-3 overflow-hidden rounded-lg">
          <img
            src={service.imageurl || "/image.png"}
            alt={service.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-1 truncate">
            {service.title}
          </h2>

          <p className="text-gray-700 dark:text-gray-300 mb-2 text-xs sm:text-sm line-clamp-2">
            {service.description}
          </p>

          <p className="text-sky-600 dark:text-sky-400 font-medium text-sm sm:text-base">
            ${service.price.toFixed(2)}
          </p>
        </div>

        {/* Footer */}
        <div className="mt-3 flex flex-col gap-1">
          <p className="text-gray-500 dark:text-gray-400 text-xs">
            User ID: {service.userId}
          </p>
          <p className="text-gray-400 dark:text-gray-500 text-[10px]">
            Created: {new Date(service.createdat).toLocaleDateString()}
          </p>

          <button
            onClick={() => {
              setSelectedServiceId(service.id);
              setFormData((prev) => ({ ...prev, service_id: service.id }));
              setIsModalOpen(true);
            }}
            disabled={isCooldown}
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-3 py-1 rounded-md text-sm transition-colors ${
              isCooldown ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isCooldown ? `Wait ${timeLeft}s` : "Enquiry"}
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-11/12 max-w-md">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Enquiry Form {selectedServiceId}
            </h3>

            <form className="flex flex-col gap-4" onSubmit={submitEnquiry}>
              {/* Service ID */}
              <div className="flex flex-col">
                <label
                  htmlFor="service-id"
                  className="mb-1 text-gray-700 dark:text-gray-300 font-semibold"
                >
                  Service ID
                </label>
                <input
                  id="service-id"
                  disabled
                  type="text"
                  value={formData.service_id} // use formData here
                  className="p-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              {/* Phone Number */}
              <div className="flex flex-col">
                <label
                  htmlFor="phone"
                  className="mb-1 text-gray-700 dark:text-gray-300 font-semibold"
                >
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter your phone number"
                  className="p-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              {/* Message */}
              <div className="flex flex-col">
                <label
                  htmlFor="message"
                  className="mb-1 text-gray-700 dark:text-gray-300 font-semibold"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Enter your message"
                  className="p-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                  rows={4}
                ></textarea>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white transition-colors"
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
