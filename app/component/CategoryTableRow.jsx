import { FaEdit, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { removeCategory } from '.././store/Categoryslice';
import Swal from 'sweetalert2';
const CategoryTableRow = ({ category, index, deletecat }) => {
  const dispatch = useDispatch();

  const remove = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This category will be permanently deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    });

    if (result.isConfirmed) {
      await deletecat(category.id);
    }
  };

  return (
    <tr
      className="transition hover:bg-gray-50 dark:hover:bg-gray-700"
      key={category?.id}
    >
      <td className="px-6 py-3 font-serif text-black italic dark:text-gray-200">
        {index + 1}
      </td>

      <td className="px-6 py-3 font-serif text-black capitalize italic dark:text-gray-200">
        {category?.name}
      </td>

      <td className="flex gap-4 px-6 py-3">
        <button className="text-blue-600 transition hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
          <FaEdit size={18} />
        </button>

        <button
          onClick={remove}
          className="text-red-600 transition hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
        >
          <FaTrash size={18} />
        </button>
      </td>
    </tr>
  );
};

export default CategoryTableRow;
