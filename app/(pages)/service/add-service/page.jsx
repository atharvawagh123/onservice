"use client";
import React, { useState } from "react";
import { useAuthContext } from "../../../context/ContextProvider";
import { toast } from "react-toastify";
import { createservice } from "../../../customhook/service";

const Page = () => {
  const [formdata, setFormdata] = useState({
    title: "",
    description: "",
    price: "",
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const onchange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handlecreateservice = async (e) => {
    e.preventDefault();

    if (!formdata.title || !formdata.description || !formdata.price) {
      toast.error("Please fill all fields!");
      return;
    }

    setLoading(true);
    try {
      const response = await createservice(formdata, file);

      console.log("response create :-", response);
      if (response.success) {
        toast.success(response.message);
        setFormdata({ title: "", description: "", price: "" });
      } else {
        toast.error(response.message);
        setFormdata({ title: "", description: "", price: "" });
      }
    } catch (e) {
      console.log(e);
      toast.error("Failed to create service");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 dark:bg-gray-900 p-6">
      <form
        onSubmit={handlecreateservice}
        className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col gap-4"
      >
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-200 mb-4">
          Create Service
        </h1>

        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-200">
            Service Title
          </label>
          <input
            type="text"
            name="title"
            value={formdata.title}
            onChange={onchange}
            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-200">
            Service Description
          </label>
          <textarea
            name="description"
            value={formdata.description}
            onChange={onchange}
            rows={4}
            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-200">
            Service Price
          </label>
          <input
            type="number"
            name="price"
            value={formdata.price}
            onChange={onchange}
            step="0.01"
            min="0"
            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-200">
            Service image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full border rounded-md p-2 bg-white dark:bg-gray-700"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Service"}
        </button>
      </form>
    </div>
  );
};

export default Page;
