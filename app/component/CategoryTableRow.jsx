import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { removeCategory } from ".././store/Categoryslice";
import Swal from "sweetalert2";
const CategoryTableRow = ({ category, index, deletecat }) => {
  const dispatch = useDispatch();

  const remove = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This category will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      const response = await deletecat(category.id);
      console.log("cat component", response);
      if (response.success) {
        toast.success(response.message);
        dispatch(removeCategory(category.id));
      }

      if (response.error) {
        toast.error(response.error);
      }
    }
  };
  return (
    <tr className="hover:bg-gray-50 transition" key={category.id}>
      <td className="px-6 py-3 font-serif italic text-black">{index + 1}</td>

      <td className="px-6 py-3 font-serif italic text-black capitalize">
        {category.name}
      </td>

      <td className="px-6 py-3 flex gap-4">
        <button className="text-blue-600 hover:text-blue-800 transition">
          <FaEdit size={18} />
        </button>

        <button
          onClick={remove}
          className="text-red-600 hover:text-red-800 transition"
        >
          <FaTrash size={18} />
        </button>
      </td>
    </tr>
  );
};

export default CategoryTableRow;
