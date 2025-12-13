"use client";

import { useState } from "react";
import Link from "next/link";
import { signup } from "@/app/customhook/auth";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import {
  AiOutlineUser,
  AiOutlineMail,
  AiOutlineLock,
  AiOutlineCalendar,
} from "react-icons/ai";

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    age: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const data = await signup({
        ...formData,
        age: Number(formData.age),
      });

      if (data.error) {
        setError(data.error);
      } else {
        setSuccess("User created successfully!");
        setFormData({
          first_name: "",
          last_name: "",
          username: "",
          email: "",
          password: "",
          age: "",
        });
        toast.success("Signup successful! You can now log in.");
        router.push("/login");
      }
    } catch (err) {
      console.log(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8 animate-fade-in">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2 text-center">
          Sign Up
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">
          Fill in the form to create an account.
        </p>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        {success && (
          <p className="text-green-500 mb-4 text-center">{success}</p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          {/* First & Last Name in one row */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <AiOutlineUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300" />
              <input
                type="text"
                name="first_name"
                placeholder="First Name"
                value={formData.first_name}
                onChange={handleChange}
                required
                className="pl-10 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 w-full transition bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
              />
            </div>
            <div className="flex-1 relative">
              <AiOutlineUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300" />
              <input
                type="text"
                name="last_name"
                placeholder="Last Name"
                value={formData.last_name}
                onChange={handleChange}
                required
                className="pl-10 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 w-full transition bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
              />
            </div>
          </div>

          {/* Username */}
          <div className="relative">
            <AiOutlineUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300" />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
              className="pl-10 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 w-full transition bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <AiOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="pl-10 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 w-full transition bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <AiOutlineLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="pl-10 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 w-full transition bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
            />
          </div>

          {/* Age */}
          <div className="relative">
            <AiOutlineCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300" />
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
              required
              className="pl-10 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 w-full transition bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600 active:scale-95 transition-transform disabled:opacity-50 disabled:cursor-not-allowed w-full mt-2"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600 dark:text-gray-300 text-sm sm:text-base">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </main>
  );
}
