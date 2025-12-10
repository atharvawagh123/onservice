"use client";
import { useSelector } from "react-redux";
import CategoryTableRow from "../../component/CategoryTableRow";
import { deletecategory } from "../../customhook/category";
import { toast } from "react-toastify";
import { IoAddCircleSharp } from "react-icons/io5";
import Link from "next/link";
const category = () => {
  const categories = useSelector((state) => state.Categories.categories);

  const deletecat = async (id) => {
    if (!id) {
      toast.error("category id is not available");
      return;
    }
    const response = await deletecategory(id);
    if (response) {
      return response;
    }
  };

  return (
    <>
      <div className="mb-6">
        <h1 className="font-serif italic text-5xl text-black">All category</h1>
      </div>
      <div className="w-full flex items-center justify-between mb-6">
        <h1 className="text-3xl font-serif italic text-black">Add Category</h1>
        <Link
          href="./category/addcategory"
          className="flex items-center justify-center gap-2 px-4 py-2 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-600 transition"
        >
          <IoAddCircleSharp size={24} />
          Add category
        </Link>
      </div>
      <div className="overflow-x-auto mb-10">
        <table className="min-w-full bg-white rounded-xl shadow-md border border-gray-200">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-6 py-3 text-black">#</th>
              <th className="px-6 py-3 text-black">Name</th>
              <th className="px-6 py-3 text-black">Action</th>
            </tr>
          </thead>

          <tbody>
            {categories?.length > 0 ? (
              categories.map((category, index) => (
                <CategoryTableRow
                  key={index}
                  category={category}
                  index={index}
                  deletecat={deletecat}
                />
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-4 text-gray-500">
                  No category found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default category;
