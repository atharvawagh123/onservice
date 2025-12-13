"use client";

import { useState } from "react";
import { login } from "../../customhook/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setname } from "@/app/store/usersclice";
import { FiEye, FiEyeOff, FiMail, FiLock } from "react-icons/fi";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await login(email, password);

      if (res?.error) {
        toast.error(res.error);
        return;
      }

      if (!res?.is_active) {
        toast.warning("Your account is currently inactive");
        // return;
      }

      localStorage.setItem("token", res.token);
      localStorage.setItem("isLogin", "true");
      dispatch(setname(res.name));

      toast.success("Login successful!");

      res.role === "ADMIN" ? router.push("/admin/user") : router.push("/home");
    } catch (err) {
      console.error(err);
      toast.error("Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-sky-50 dark:bg-black font-sans px-4">
      <div className="w-full max-w-md bg-white dark:bg-neutral-900 rounded-2xl shadow-lg p-6 border border-sky-100 dark:border-neutral-800">
        {/* Heading */}
        <h1 className="text-2xl font-semibold text-black dark:text-white">
          Welcome Back 👋
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 mb-6">
          Login to continue
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="relative">
            <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-sky-400" />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="
                w-full pl-10 pr-4 py-2.5 rounded-lg
                bg-white dark:bg-neutral-800
                text-black dark:text-white
                border border-gray-300 dark:border-neutral-700
                placeholder-gray-500 dark:placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-sky-400
                transition
              "
            />
          </div>

          {/* Password */}
          <div className="relative">
            <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-sky-400" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="
                w-full pl-10 pr-12 py-2.5 rounded-lg
                bg-white dark:bg-neutral-800
                text-black dark:text-white
                border border-gray-300 dark:border-neutral-700
                placeholder-gray-500 dark:placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-sky-400
                transition
              "
            />

            {/* Show / Hide */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-sky-400 transition"
            >
              {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </button>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full py-2.5 rounded-lg font-medium
              bg-sky-400 text-black
              hover:bg-sky-500
              active:scale-95
              transition-all
              disabled:opacity-60 disabled:cursor-not-allowed
            "
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-5 text-center">
          <Link href="/signup" className="text-sm text-sky-500 hover:underline">
            Don’t have an account? Sign Up
          </Link>
        </div>
      </div>
    </main>
  );
}
