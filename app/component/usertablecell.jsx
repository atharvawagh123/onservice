import React from "react";
import { FaLock, FaUnlock } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";

const UserTableCell = ({ user, index, changeactivity }) => {
  // Confirm and toggle user activity
  const makechange = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `You are about to ${
        user.is_active ? "block" : "unblock"
      } this user (${user.first_name || "No Name"})!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, update it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      const res = await changeactivity(user.id);
      console.log(res);
      if (res.success) {
        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: `${res.user.name}User activity has been changed successfully.`,
          timer: 1500,
          showConfirmButton: false,
        });
      }
    }
  };

  // Confirm and delete user
  const deleteuser = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete this user (${
        user.first_name || "No Name"
      }) permanently!`,
      icon: "error",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: `User has been deleted successfully.`,
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };
  return (
    <tr className="border-b hover:bg-gray-50 transition">
      <td className="px-6 py-3 text-black">{index + 1}</td>
      <td className="px-6 py-3 text-black">{user.first_name || "No Name"}</td>
      <td className="px-6 py-3 text-blue-600">{user.email}</td>
      <td className="px-6 py-3 text-gray-700">{user.id}</td>

      <td className="px-6 py-4">
        <div className="flex gap-3">
          <button
            onClick={deleteuser}
            className="bg-red-500 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-red-600 transition shadow"
          >
            <MdDelete className="text-1xl" />
          </button>

          <button
            className={`px-4 py-1.5 rounded-lg text-sm transition shadow flex items-center gap-2
              ${
                user.is_active
                  ? "bg-green-500 hover:bg-green-600 text-black"
                  : "bg-red-500 hover:bg-red-600 text-white"
              }
            `}
            onClick={makechange}
          >
            {user.is_active ? (
              <>
                <FaUnlock className="text-1xl" />
              </>
            ) : (
              <>
                <FaLock className="text-1xl" />
              </>
            )}
          </button>
        </div>
      </td>
    </tr>
  );
};

export default UserTableCell;
