"use client";

import { useEffect, useState } from "react";
import { getuser, updateactivity } from "../../customhook/user";
import UserTableCell from "../../component/usertablecell";
import { toast } from "react-toastify";

const UserPage = () => {
  const [alluser, setalluser] = useState([]);

  useEffect(() => {
    getAllUser();
  }, []);

  const getAllUser = async () => {
    const response = await getuser();
    setalluser(response || []);
  };

  const changeactivity = async (id) => {
    if (!id) {
      toast.error("id is not coming from component");
      return
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
        <h1 className="font-serif italic text-5xl text-black">
          All Users in OnService
        </h1>
      </div>

      <div className="overflow-x-auto mb-10">
        <table className="min-w-full bg-white rounded-xl shadow-md border border-gray-200">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-6 py-3  text-black">#</th>
              <th className="px-6 py-3 text-black">Name</th>
              <th className="px-6 py-3 text-black">Email</th>
              <th className="px-6 py-3 text-black">User ID</th>
              <th className="px-6 py-3 text-black text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {alluser.length > 0 ? (
              alluser.map((user, index) => (
                <UserTableCell
                  key={index}
                  user={user}
                  index={index}
                  changeactivity={changeactivity}
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
