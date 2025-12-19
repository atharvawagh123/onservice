'use client';

import Link from 'next/link';
import { IoArrowBack } from 'react-icons/io5';
import { FiUser, FiMail, FiLock, FiUserCheck } from 'react-icons/fi';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addsubadmin } from '../../../customhook/subadmin';
import { toast } from 'react-toastify';
import { addSubAdmin } from '../../../store/subAdminSlice';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { FaPlus, FaSpinner } from 'react-icons/fa';

const Addsubadmin = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const router = useRouter();
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    password: '',
    age: '',
    role: 'SUBADMIN',
  });

  const handleChange = e => {
    const { name, value } = e.target;

    setForm(prev => ({
      ...prev,
      [name]: name === 'age' ? (value === '' ? '' : Number(value)) : value,
    }));
  };

  const onsubmitmutation = useMutation({
    mutationFn: async form => {
      const response = await addsubadmin(form);
      console.log('subadmin mutation');
      return response;
    },
    onSuccess: response => {
      console.log('onsuccess on  subadmin', { response });
      dispatch(addSubAdmin(response.subadmin));
      queryClient.invalidateQueries({
        queryKey: ['subadmins'],
      });
      toast.success(response.message);
      router.back();
    },
    onError: e => {
      console.log('Error on mutation', e);
      toast.error('Error form system review code !!');
      router.back();
    },
  });

  const onsubmit = e => {
    e.preventDefault();

    if (
      !form.first_name ||
      !form.last_name ||
      !form.email ||
      !form.username ||
      !form.password ||
      !form.role
    ) {
      toast.warning('fill the from first then submit');
      return;
    }
    onsubmitmutation.mutate(form);
  };

  return (
    <>
      <h1 className="mb-6 font-serif text-4xl font-bold italic">
        Add SubAdmin
      </h1>

      <div className="mb-6 flex items-center justify-between font-serif italic">
        <h2 className="text-2xl">Back to Subadmin</h2>
        <Link
          href="/admin/subadmin"
          className="flex items-center gap-2 rounded-lg bg-green-700 px-4 py-2 text-white"
        >
          <IoArrowBack />
          Back
        </Link>
      </div>

      <form
        onSubmit={onsubmit}
        className="max-w-3xl space-y-6 font-serif italic"
      >
        {/* First & Last Name */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="relative">
            <FiUser className="absolute top-1/2 left-3 -translate-y-1/2 text-green-600" />
            <input
              name="first_name"
              placeholder="First Name"
              value={form.first_name}
              onChange={handleChange}
              className="w-full rounded-lg border p-3 pl-10 font-serif italic"
            />
          </div>

          <div className="relative">
            <FiUser className="absolute top-1/2 left-3 -translate-y-1/2 text-green-600" />
            <input
              name="last_name"
              placeholder="Last Name"
              value={form.last_name}
              onChange={handleChange}
              className="w-full rounded-lg border p-3 pl-10 font-serif italic"
            />
          </div>
        </div>

        {/* Email & Username */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="relative">
            <FiMail className="absolute top-1/2 left-3 -translate-y-1/2 text-green-600" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-lg border p-3 pl-10 font-serif italic"
            />
          </div>

          <div className="relative">
            <FiUserCheck className="absolute top-1/2 left-3 -translate-y-1/2 text-green-600" />
            <input
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              className="w-full rounded-lg border p-3 pl-10 font-serif italic"
            />
          </div>
        </div>

        {/* Password & Age */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="relative">
            <FiLock className="absolute top-1/2 left-3 -translate-y-1/2 text-green-600" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full rounded-lg border p-3 pl-10 font-serif italic"
            />
          </div>

          <input
            type="number"
            name="age"
            placeholder="Age"
            value={form.age}
            onChange={handleChange}
            className="w-full rounded-lg border p-3 font-serif italic"
          />
        </div>

        {/* Role */}
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 bg-white p-3 font-serif text-gray-900 italic transition focus:ring-2 focus:ring-green-500 focus:outline-none md:w-1/2 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:focus:ring-green-400"
        >
          <option value="SUBADMIN">Sub Admin</option>
          <option value="ADMIN">Admin</option>
          <option value="CLIENT">Client</option>
        </select>

        {/* Submit */}
        <button
          type="submit"
          disabled={
            !form.first_name ||
            !form.last_name ||
            !form.email ||
            !form.username ||
            !form.password ||
            !form.role
          }
          className={`flex items-center justify-center gap-2 rounded-lg px-8 py-3 font-serif italic transition-all duration-300 ${
            !form.first_name ||
            !form.last_name ||
            !form.email ||
            !form.username ||
            !form.password ||
            !form.role
              ? 'cursor-not-allowed bg-gray-400'
              : 'bg-green-600 text-white'
          }`}
        >
          {onsubmitmutation.isPending ? (
            <>
              <FaSpinner className="animate-spin" />
              Creating...
            </>
          ) : (
            <>
              <FaPlus />
              Create
            </>
          )}
        </button>
      </form>
    </>
  );
};

export default Addsubadmin;
