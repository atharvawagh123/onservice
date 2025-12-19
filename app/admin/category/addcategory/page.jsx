'use client';
import { useState } from 'react';
import { addcategory, getcategory } from '../../../customhook/category';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { addCategory } from '../../../store/Categoryslice';
import Link from 'next/link';
import { IoArrowBack } from 'react-icons/io5';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { ImSpinner2 } from 'react-icons/im';

const AddCategory = () => {
  const dispatch = useDispatch();
  const [category, setCategory] = useState('');
  const router = useRouter();
  const queryClient = useQueryClient();

  const submitmutation = useMutation({
    mutationFn: async newCategory => {
      console.log('add category page mutation on mutation', newCategory);
      const response = await addcategory(newCategory);
      console.log('add category page mutation on response:', response);
      return response;
    },
    onSuccess: response => {
      toast.success('Category added successfully!');
      console.log('add category page mutation on success', response.category);
      queryClient.invalidateQueries({
        queryKey: ['categories'],
      });
      dispatch(addCategory(response.category));
      setCategory('');
      router.back();
    },
    onError: error => {
      console.log('mutaion error ', error?.message);
      toast.error(error?.message || 'Something went wrong');
      router.back();
    },
  });

  const onsubmit = e => {
    e.preventDefault();
    if (!category.trim()) {
      toast.error('Enter category name!');
      return;
    }
    submitmutation.mutate({ name: category.trim() });
  };

  return (
    <div className="">
      <h1 className="mb-6 font-serif text-5xl text-black italic dark:text-gray-200">
        Add Category
      </h1>

      <div className="mb-6 flex w-full flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <h1 className="font-serif text-3xl text-black italic dark:text-gray-200">
          Back to category
        </h1>
        <Link
          href="/admin/category"
          className="flex items-center justify-center gap-2 rounded-lg bg-green-700 px-4 py-2 font-semibold text-white transition hover:bg-green-600"
        >
          <IoArrowBack size={24} />
          Back
        </Link>
      </div>

      <form
        onSubmit={onsubmit}
        className="mx-auto flex w-full max-w-md flex-col gap-4 p-5"
      >
        <label
          htmlFor="name"
          className="font-serif text-black italic dark:text-gray-200"
        >
          Category Name
        </label>
        <input
          id="name"
          type="text"
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-black transition focus:ring-2 focus:ring-green-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:focus:ring-green-400"
          disabled={submitmutation.isPending}
        />
        <button
          type="submit"
          disabled={submitmutation.isPending}
          className="flex items-center justify-center gap-2 rounded-md bg-green-500 px-4 py-2 text-white transition hover:bg-green-600 disabled:opacity-50 dark:hover:bg-green-700"
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
