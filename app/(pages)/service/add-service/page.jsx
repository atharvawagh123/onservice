'use client';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { createservice } from '../../../customhook/service';

const Page = () => {
  const [formdata, setFormdata] = useState({
    title: '',
    description: '',
    price: '',
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const onchange = e => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handlecreateservice = async e => {
    e.preventDefault();

    if (!formdata.title || !formdata.description || !formdata.price) {
      toast.error('Please fill all fields!');
      return;
    }

    setLoading(true);
    try {
      const response = await createservice(formdata, file);

      console.log('response create :-', response);
      if (response.success) {
        toast.success(response.message);
        setFormdata({ title: '', description: '', price: '' });
      } else {
        toast.error(response.message);
        setFormdata({ title: '', description: '', price: '' });
      }
    } catch (e) {
      console.log(e);
      toast.error('Failed to create service');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6 dark:bg-gray-900">
      <form
        onSubmit={handlecreateservice}
        className="flex w-full max-w-md flex-col gap-4 rounded-lg bg-white p-6 shadow-md dark:bg-gray-800"
      >
        <h1 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-200">
          Create Service
        </h1>

        <div>
          <label className="mb-1 block text-gray-700 dark:text-gray-200">
            Service Title
          </label>
          <input
            type="text"
            name="title"
            value={formdata.title}
            onChange={onchange}
            className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
          />
        </div>

        <div>
          <label className="mb-1 block text-gray-700 dark:text-gray-200">
            Service Description
          </label>
          <textarea
            name="description"
            value={formdata.description}
            onChange={onchange}
            rows={4}
            className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
          />
        </div>

        <div>
          <label className="mb-1 block text-gray-700 dark:text-gray-200">
            Service Price
          </label>
          <input
            type="number"
            name="price"
            value={formdata.price}
            onChange={onchange}
            step="0.01"
            min="0"
            className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
          />
        </div>

        <div>
          <label className="mb-1 block text-gray-700 dark:text-gray-200">
            Service image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={e => setFile(e.target.files[0])}
            className="w-full rounded-md border bg-white p-2 dark:bg-gray-700"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-blue-600 py-2 text-white transition hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Creating...' : 'Create Service'}
        </button>
      </form>
    </div>
  );
};

export default Page;
