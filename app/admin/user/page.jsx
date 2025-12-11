"use client";

import { useEffect, useState } from "react";
import { getuser, updateactivity } from "../../customhook/user";
import UserTableCell from "../../component/usertablecell";
import { toast } from "react-toastify";

const UserPage = () => {
  const [allUser, setAllUser] = useState([]);

  // Move function before useEffect
  const getAllUser = async () => {
    try {
      const response = await getuser();
      setAllUser(response || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllUser();
  }, []);

  const changeActivity = async (id) => {
    if (!id) {
      toast.error("ID not found");
      return;
    }

    const response = await updateactivity(id);

    if (response.success) {
      toast.success(`${response.id} ${response.message}`);
      getAllUser();
      return response;
    }
  };

  return (
    <>
      <div className="mb-6">
        <h1 className="font-serif italic text-5xl">All Users in OnService</h1>
      </div>

      <div className="overflow-x-auto mb-10">
        <table className="min-w-full bg-white rounded-xl shadow-md border">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-6 py-3">#</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">User ID</th>
              <th className="px-6 py-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {allUser.length > 0 ? (
              allUser.map((user, index) => (
                <UserTableCell
                  key={user._id}
                  user={user}
                  index={index}
                  changeactivity={changeActivity}
                />
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UserPage;
