'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { fecthservice, updateservice } from '../../../../customhook/service';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
export default function UpdateServicePage() {
  const params = useParams();
  const id = params.id;

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
  });
  const [file, setfile] = useState(null);
  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await fecthservice(id);
        setFormData({
          title: response.title || '',
          description: response.description || '',
          price: response.price || '',
        });
      } catch (err) {
        console.error(err);
      }
    };

    if (id) fetchService();
  }, [id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.price) {
      toast.error('Please fill in all required fields!');
      return;
    }

    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you  want to update this service ??????',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, update it!',
      cancelButtonText: 'Cancel',
    });

    if (!result.isConfirmed) return;
    try {
      const response = await updateservice(id, formData);
      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message || 'Failed to update service');
      }
    } catch (error) {
      toast.error(error.message || 'Something went wrong');
    }
  };

  return (
    <div className="mx-auto my-5 mt-10 max-w-md rounded-lg bg-white p-5 shadow dark:bg-gray-900">
      <h2 className="mb-5 text-center text-2xl font-bold text-sky-700 dark:text-sky-400">
        Update Service
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="rounded-md border border-gray-300 bg-white p-2 text-gray-900 transition focus:ring-2 focus:ring-sky-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:focus:ring-sky-400"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          rows={4}
          className="rounded-md border border-gray-300 bg-white p-2 text-gray-900 transition focus:ring-2 focus:ring-sky-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:focus:ring-sky-400"
        />
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          className="rounded-md border border-gray-300 bg-white p-2 text-gray-900 transition focus:ring-2 focus:ring-sky-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:focus:ring-sky-400"
          required
        />
        <button
          type="submit"
          className="rounded-md bg-sky-600 px-4 py-2 text-white transition-colors duration-200 hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600"
        >
          Update
        </button>
      </form>
    </div>
  );
}
