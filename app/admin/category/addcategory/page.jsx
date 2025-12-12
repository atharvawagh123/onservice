"use client";
import { useState } from "react";
import { addcategory, getcategory } from "../../../customhook/category";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addCategory } from "../../../store/Categoryslice";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";

const AddCategory = () => {
  const dispatch = useDispatch();
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!category.trim()) {
      toast.error("Enter category name!!");
      return;
    }

    try {
      setLoading(true);
      const response = await addcategory({ name: category.trim() });
      if (response.error) {
        toast.error(response.error);
      } else {
        toast.success("Category added successfully!");
        dispatch(addCategory(response.category));
        setCategory("");
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="font-serif italic text-5xl text-black dark:text-gray-200 mb-6">
        Add Category
      </h1>

      <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <h1 className="text-3xl font-serif italic text-black dark:text-gray-200">
          Back to category
        </h1>
        <Link
          href="/admin/category"
          className="flex items-center justify-center gap-2 px-4 py-2 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-600 transition"
        >
          <IoArrowBack size={24} />
          Back
        </Link>
      </div>

      <form onSubmit={submit} className="flex flex-col gap-4">
        <label
          htmlFor="name"
          className="font-serif italic text-black dark:text-gray-200"
        >
          Category Name
        </label>
        <input
          id="name"
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-gray-200 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 transition"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 dark:hover:bg-green-700 transition disabled:opacity-50"
        >
          {loading ? "Adding..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
