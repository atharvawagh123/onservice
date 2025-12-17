"use client";

import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";
import { FiUser, FiMail, FiLock, FiUserCheck } from "react-icons/fi";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addsubadmin } from "../../../customhook/subadmin";
import { toast } from "react-toastify";
import { addSubAdmin } from "../../../store/subAdminSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

const Addsubadmin = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const router = useRouter();
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
    age: "",
    role: "SUBADMIN",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === "age" ? (value === "" ? "" : Number(value)) : value,
    }));
  };

  const onsubmitmutation = useMutation({
    mutationFn: async (form) => {
      const response = await addsubadmin(form);
      console.log("subadmin mutation");
      return response;
    },
    onSuccess: (response) => {
      console.log("onsuccess on  subadmin", { response });
      dispatch(addSubAdmin(response.subadmin));
      queryClient.invalidateQueries({
        queryKey: ["subadmins"],
      });
      toast.success(response.message);
      router.back();
    },
    onError: (e) => {
      console.log("Error on mutation", e);
      toast.error("Error form system review code !!");
    },
  });

  const onsubmit = (e) => {
    e.preventDefault();

    if (
      !form.first_name ||
      !form.last_name ||
      !form.email ||
      !form.username ||
      !form.password ||
      !form.role
    ) {
      toast.warning("fill the from first then submit");
      return;
    }
    onsubmitmutation.mutate(form);
  };

  return (
    <>
      <h1 className="text-4xl font-bold mb-6 font-serif italic">
        Add SubAdmin
      </h1>

      <div className="flex justify-between items-center mb-6 font-serif italic">
        <h2 className="text-2xl">Back to Subadmin</h2>
        <Link
          href="/admin/subadmin"
          className="flex items-center gap-2 px-4 py-2 bg-green-700 text-white rounded-lg"
        >
          <IoArrowBack />
          Back
        </Link>
      </div>

      <form
        onSubmit={onsubmit}
        className="space-y-6 max-w-3xl font-serif italic"
      >
        {/* First & Last Name */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="relative">
            <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-green-600" />
            <input
              name="first_name"
              placeholder="First Name"
              value={form.first_name}
              onChange={handleChange}
              className="w-full p-3 pl-10 rounded-lg border font-serif italic"
            />
          </div>

          <div className="relative">
            <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-green-600" />
            <input
              name="last_name"
              placeholder="Last Name"
              value={form.last_name}
              onChange={handleChange}
              className="w-full p-3 pl-10 rounded-lg border font-serif italic"
            />
          </div>
        </div>

        {/* Email & Username */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="relative">
            <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-green-600" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 pl-10 rounded-lg border font-serif italic"
            />
          </div>

          <div className="relative">
            <FiUserCheck className="absolute left-3 top-1/2 -translate-y-1/2 text-green-600" />
            <input
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              className="w-full p-3 pl-10 rounded-lg border font-serif italic"
            />
          </div>
        </div>

        {/* Password & Age */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="relative">
            <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-green-600" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full p-3 pl-10 rounded-lg border font-serif italic"
            />
          </div>

          <input
            type="number"
            name="age"
            placeholder="Age"
            value={form.age}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border font-serif italic"
          />
        </div>

        {/* Role */}
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="
        w-full md:w-1/2
        p-3 rounded-lg
        bg-white dark:bg-gray-800
        border border-gray-300 dark:border-gray-700
        text-gray-900 dark:text-gray-100
        focus:outline-none
        focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400
        transition
        font-serif italic
      "
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
          className={`px-8 py-3 rounded-lg font-serif italic ${
            !form.first_name ||
            !form.last_name ||
            !form.email ||
            !form.username ||
            !form.password ||
            !form.role
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 text-white"
          }`}
        >
          Create
        </button>
      </form>
    </>
  );
};

export default Addsubadmin;
