"use client";

import { useState } from "react";
import Link from "next/link";
import { signup } from "@/app/customhook/auth";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
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
          name: "",
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
      console.log("error from signup page : ", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex justify-center items-center min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-6 sm:p-8 animate-fade-in">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2 text-center">
          Sign Up
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          Fill in the form to create an account.
        </p>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        {success && (
          <p className="text-green-500 mb-4 text-center">{success}</p>
        )}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 items-center justify-center w-full"
        >
          {/* Full Name */}
          <div className="w-full">
            <label
              htmlFor="name"
              className="block text-gray-700 font-medium mb-1"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition w-full"
            />
          </div>

          {/* First & Last Name */}
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <div className="flex-1">
              <label
                htmlFor="first_name"
                className="block text-gray-700 font-medium mb-1"
              >
                First Name
              </label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                placeholder="First Name"
                value={formData.first_name}
                onChange={handleChange}
                required
                className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition w-full"
              />
            </div>
            <div className="flex-1">
              <label
                htmlFor="last_name"
                className="block text-gray-700 font-medium mb-1"
              >
                Last Name
              </label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                placeholder="Last Name"
                value={formData.last_name}
                onChange={handleChange}
                required
                className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition w-full"
              />
            </div>
          </div>

          {/* Username */}
          <div className="w-full">
            <label
              htmlFor="username"
              className="block text-gray-700 font-medium mb-1"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
              className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition w-full"
            />
          </div>

          {/* Email */}
          <div className="w-full">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition w-full"
            />
          </div>

          {/* Password */}
          <div className="w-full">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition w-full"
            />
          </div>

          {/* Age */}
          <div className="w-full">
            <label
              htmlFor="age"
              className="block text-gray-700 font-medium mb-1"
            >
              Age
            </label>
            <input
              type="number"
              id="age"
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
              required
              className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition w-full"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600 active:scale-95 transition-transform disabled:opacity-50 disabled:cursor-not-allowed w-full mt-2"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600 text-sm sm:text-base">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </main>
  );
}
