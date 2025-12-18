"use client";
import { useState } from "react";
import { addcategory, getcategory } from "../../../customhook/category";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addCategory } from "../../../store/Categoryslice";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ImSpinner2 } from "react-icons/im";

const AddCategory = () => {
  const dispatch = useDispatch();
  const [category, setCategory] = useState("");
  const router = useRouter();
  const queryClient = useQueryClient();

  const submitmutation = useMutation({
    mutationFn: async (newCategory) => {
      console.log("add category page mutation on mutation", newCategory);
      const response = await addcategory(newCategory);
      console.log("add category page mutation on response:", response);
      return response;
    },
    onSuccess: (response) => {
      toast.success("Category added successfully!");
      console.log("add category page mutation on success", response.category);
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
      dispatch(addCategory(response.category));
      setCategory("");
      router.back();
    },
    onError: (error) => {
      console.log("mutaion error ", error?.message);
      toast.error(error?.message || "Something went wrong");
      router.back();
    },
  });

  const onsubmit = (e) => {
    e.preventDefault();
    if (!category.trim()) {
      toast.error("Enter category name!");
      return;
    }
    submitmutation.mutate({ name: category.trim() });
  };

  return (
    <div className="">
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

      <form
        onSubmit={onsubmit}
        className="flex flex-col  p-5 gap-4 w-full max-w-md mx-auto"
      >
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
          className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-gray-200 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 transition"
          disabled={submitmutation.isPending}
        />
        <button
          type="submit"
          disabled={submitmutation.isPending}
          className="flex items-center gap-2 justify-center bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 dark:hover:bg-green-700 transition disabled:opacity-50"
        >
          {submitmutation.isPending ? (
            <>
              <ImSpinner2 className="animate-spin" />
              Adding...
            </>
          ) : (
            <span>Submit</span>
          )}
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
