import { FaLock, FaUnlock } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import Swal from 'sweetalert2';
import { setchangeactivity } from '../store/allUserslice';
import { useDispatch } from 'react-redux';

const UserTableCell = ({ user, index, changeactivity }) => {
  const dispatch = useDispatch();
  // Confirm and toggle user activity
  const makechange = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `You are about to ${
        user.is_active ? 'block' : 'unblock'
      } this user (${user.first_name || 'No Name'})!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, update it!',
      cancelButtonText: 'Cancel',
    });

    if (result.isConfirmed) {
      await changeactivity(user.id);
    }
  };

  // Confirm and delete user
  const deleteuser = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `You are about to delete this user (${
        user.first_name || 'No Name'
      }) permanently!`,
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    });

    if (result.isConfirmed) {
      Swal.fire({
        icon: 'success',
        title: 'Deleted!',
        text: `User has been deleted successfully.`,
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };
  return (
    <tr className="border-b transition hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800">
      {/* Index */}
      <td className="px-4 py-3 text-sm text-black dark:text-white">
        {index + 1}
      </td>

      {/* Image */}
      <td className="px-4 py-3">
        <img
          src={user.imageurl || '/image.png'}
          alt="no image"
          className="h-12 w-12 rounded-full border object-cover dark:border-gray-600"
        />
      </td>

      {/* Name */}
      <td className="px-4 py-3 text-sm text-black dark:text-gray-200">
        {user.first_name || 'No Name'}
      </td>

      {/* Email */}
      <td className="px-4 py-3 text-sm text-blue-600 dark:text-blue-400">
        {user.email}
      </td>

      {/* ID */}
      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
        {user.id}
      </td>

      {/* Buttons */}
      <td className="px-4 py-3">
        <div className="flex flex-col gap-3 sm:flex-row">
          {/* Delete Button */}
          <button
            onClick={deleteuser}
            className="rounded-lg bg-red-500 px-4 py-2 text-sm text-white shadow transition hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
          >
            <MdDelete className="text-xl" />
          </button>

          {/* Status Toggle Button */}
          <button
            onClick={makechange}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm shadow transition ${
              user.is_active
                ? 'bg-green-500 text-black hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700'
                : 'bg-red-500 text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700'
            } `}
          >
            {user.is_active ? (
              <FaUnlock className="text-xl" />
            ) : (
              <FaLock className="text-xl" />
            )}
          </button>
        </div>
      </td>
    </tr>
  );
};

export default UserTableCell;
