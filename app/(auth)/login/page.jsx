"use client"; // required for client-side interactivity

import { useState } from "react";
import { login } from "../../customhook/auth"; // your login function
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setname } from "@/app/store/usersclice";

export default function LoginPage() {
  const router = useRouter();
  // const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await login(email, password);

      if (res.error) {
        toast.error(res.error);
      } else {
        if (!res.is_active) {
          alert("you are inactive now a days ");
        }
        if (res.success) {
          localStorage.setItem("token", res.token);
          dispatch(setname(res.name));

          localStorage.setItem("isLogin", true);
          // Show success toast
          toast.success("Login successful!");

          router.push("/home");
        }
      }
    } catch (err) {
      console.error(err);
      toast.error("Login failed. Please try again.");
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-md mx-auto mt-16 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2 text-gray-800">Login</h1>
      <p className="text-gray-600 mb-6">Enter your credentials to log in.</p>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600 active:scale-95 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <div className="mt-4 text-center">
        <Link href="/signup" className="text-blue-500 hover:underline">
          Go to Sign Up
        </Link>
      </div>
    </main>
  );
}
