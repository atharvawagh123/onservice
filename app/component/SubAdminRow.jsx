import Link from 'next/link';
import { FiEdit, FiTrash2, FiLock, FiUnlock } from 'react-icons/fi';
import { ImSpinner2 } from 'react-icons/im';
import Swal from 'sweetalert2';
const SubAdminRow = ({
  admin,
  changeActivity,
  deleteSubAdmin,
  deleteisprending,
  changeactivityispending,
  usergoingtochange,
}) => {
  const isActive = admin?.is_active;

  const changeactive = () => {
    changeActivity(admin.id);
  };

  const removesubadmin = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This action remove subadmin confirm',
      icon: 'warning',
      showCancelButton: true,
    });

    if (!result.isConfirmed) return;
    const res = deleteSubAdmin(admin.id);
    console.log('from subadminrow', res);
  };

  return (
    <tr className="hover:bg-gray-100 dark:hover:bg-gray-800">
      <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900 dark:text-gray-100">
        {admin?.id}
      </td>

      {/* Profile Image */}
      <td className="px-6 py-4 whitespace-nowrap">
        {admin?.imageurl ? (
          <img
            src={admin.imageurl}
            alt={`${admin.first_name} ${admin.last_name}`}
            className="h-10 w-10 rounded-full object-cover"
          />
        ) : (
          <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700" />
        )}
      </td>

      <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900 dark:text-gray-100">
        {admin?.first_name} {admin?.last_name}
      </td>

      <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900 dark:text-gray-100">
        {admin?.username}
      </td>

      <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900 dark:text-gray-100">
        {admin?.email}
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`rounded px-2 py-1 text-xs font-semibold ${
            isActive
              ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
              : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
          }`}
        >
          {isActive ? 'Yes' : 'No'}
        </span>
      </td>

      <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900 dark:text-gray-100">
        {new Date(admin?.date_joined).toLocaleDateString()}
      </td>

      <td className="flex gap-2 px-6 py-4 whitespace-nowrap">
        <Link
          href={`./subadmin/updatesubadmin/${admin?.id}`}
          className="flex items-center gap-1 rounded bg-blue-600 px-3 py-1 text-white hover:bg-blue-500"
        >
          <FiEdit size={16} /> Edit
        </Link>

        <button
          onClick={removesubadmin}
          disabled={deleteisprending && usergoingtochange === admin?.id}
          className={`flex items-center gap-1 rounded px-3 py-1 text-white transition ${
            usergoingtochange === admin?.id
              ? 'cursor-not-allowed bg-red-400'
              : 'bg-red-600 hover:bg-red-500'
          } `}
        >
          {deleteisprending && usergoingtochange === admin?.id ? (
            <>
              <ImSpinner2 size={16} className="animate-spin" />
              deleting......
            </>
          ) : (
            <>
              <FiTrash2 size={16} /> Delete
            </>
          )}
        </button>

        <button
          onClick={changeactive}
          disabled={changeactivityispending && usergoingtochange === admin?.id}
          className={`flex items-center gap-1 rounded px-3 py-1 text-white transition ${
            usergoingtochange === admin?.id
              ? 'cursor-not-allowed bg-gray-400'
              : isActive
                ? 'bg-yellow-600 hover:bg-yellow-500'
                : 'bg-green-600 hover:bg-green-500'
          } `}
        >
          {changeactivityispending && usergoingtochange === admin.id ? (
            <>
              <ImSpinner2 size={16} className="animate-spin" />
              {isActive ? 'Blocking...' : 'Unblocking...'}
            </>
          ) : (
            <>
              {isActive ? <FiLock size={16} /> : <FiUnlock size={16} />}
              {isActive ? 'Block' : 'Unblock'}
            </>
          )}
        </button>
      </td>
    </tr>
  );
};

export default SubAdminRow;
