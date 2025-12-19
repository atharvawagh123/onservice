'use client';

import { useState } from 'react';
import Link from 'next/link';
import { signup } from '@/app/customhook/auth';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import {
  AiOutlineUser,
  AiOutlineMail,
  AiOutlineLock,
  AiOutlineCalendar,
} from 'react-icons/ai';

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    age: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const data = await signup({
        ...formData,
        age: Number(formData.age),
      });

      if (data.error) {
        setError(data.error);
      } else {
        setSuccess('User created successfully!');
        setFormData({
          first_name: '',
          last_name: '',
          username: '',
          email: '',
          password: '',
          age: '',
        });
        toast.success('Signup successful! You can now log in.');
        router.push('/login');
      }
    } catch (err) {
      console.log(err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8 dark:bg-gray-900">
      <div className="animate-fade-in w-full max-w-lg rounded-xl bg-white p-6 shadow-lg sm:p-8 dark:bg-gray-800">
        <h1 className="mb-2 text-center text-2xl font-bold text-gray-800 sm:text-3xl dark:text-gray-100">
          Sign Up
        </h1>
        <p className="mb-6 text-center text-gray-600 dark:text-gray-300">
          Fill in the form to create an account.
        </p>

        {error && <p className="mb-4 text-center text-red-500">{error}</p>}
        {success && (
          <p className="mb-4 text-center text-green-500">{success}</p>
        )}

        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
          {/* First & Last Name in one row */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <AiOutlineUser className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 dark:text-gray-300" />
              <input
                type="text"
                name="first_name"
                placeholder="First Name"
                value={formData.first_name}
                onChange={handleChange}
                required
                className="w-full rounded border border-gray-300 bg-white px-4 py-2 pl-10 text-gray-800 transition focus:ring-2 focus:ring-blue-400 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:focus:ring-blue-500"
              />
            </div>
            <div className="relative flex-1">
              <AiOutlineUser className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 dark:text-gray-300" />
              <input
                type="text"
                name="last_name"
                placeholder="Last Name"
                value={formData.last_name}
                onChange={handleChange}
                required
                className="w-full rounded border border-gray-300 bg-white px-4 py-2 pl-10 text-gray-800 transition focus:ring-2 focus:ring-blue-400 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Username */}
          <div className="relative">
            <AiOutlineUser className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 dark:text-gray-300" />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full rounded border border-gray-300 bg-white px-4 py-2 pl-10 text-gray-800 transition focus:ring-2 focus:ring-blue-400 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <AiOutlineMail className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 dark:text-gray-300" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full rounded border border-gray-300 bg-white px-4 py-2 pl-10 text-gray-800 transition focus:ring-2 focus:ring-blue-400 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <AiOutlineLock className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 dark:text-gray-300" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full rounded border border-gray-300 bg-white px-4 py-2 pl-10 text-gray-800 transition focus:ring-2 focus:ring-blue-400 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:focus:ring-blue-500"
            />
          </div>

          {/* Age */}
          <div className="relative">
            <AiOutlineCalendar className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 dark:text-gray-300" />
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
              required
              className="w-full rounded border border-gray-300 bg-white px-4 py-2 pl-10 text-gray-800 transition focus:ring-2 focus:ring-blue-400 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:focus:ring-blue-500"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded bg-blue-500 px-4 py-2 font-medium text-white transition-transform hover:bg-blue-600 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600 sm:text-base dark:text-gray-300">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-500 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </main>
  );
}
