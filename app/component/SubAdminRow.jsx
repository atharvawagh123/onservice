import { FiEdit, FiTrash2, FiLock, FiUnlock } from "react-icons/fi";

const SubAdminRow = ({ admin, changeActivity }) => {
  const isActive = admin?.is_active;

  const changeactive = () => {
    changeActivity(admin.id);
  };

  return (
    <tr className="hover:bg-gray-100 dark:hover:bg-gray-800">
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
        {admin?.id}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
        {admin?.first_name} {admin?.last_name}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
        {admin?.username}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
        {admin?.email}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`px-2 py-1 text-xs font-semibold rounded ${
            isActive
              ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
              : "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
          }`}
        >
          {isActive ? "Yes" : "No"}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
        {new Date(admin?.date_joined).toLocaleDateString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap flex gap-2">
        <button className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-500">
          <FiEdit size={16} />
          Edit
        </button>
        <button className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-500">
          <FiTrash2 size={16} />
          Delete
        </button>
        <button
          onClick={changeactive}
          className={`flex items-center gap-1 px-3 py-1 rounded text-white ${
            isActive
              ? "bg-yellow-600 hover:bg-yellow-500"
              : "bg-green-600 hover:bg-green-500"
          }`}
        >
          {isActive ? <FiLock size={16} /> : <FiUnlock size={16} />}
          {isActive ? "Block" : "Unblock"}
        </button>
      </td>
    </tr>
  );
};

export default SubAdminRow;
