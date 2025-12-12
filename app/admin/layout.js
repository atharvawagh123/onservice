"use client";

import { useEffect } from "react";
import Sidebar from "../component/Sidebar";
import { getUserProfile } from "../customhook/user";
// import { getcategory } from "../customhook/category";
import { setinfo } from "../store/Adminslice";
// import { setCategories } from "../store/Categoryslice";
import { setUsers } from "../store/allUserslice";
import { useDispatch } from "react-redux";
import { fetchusers } from "../customhook/user";
import { getallservice } from "../customhook/service";
import { setServices } from "../store/servicesSlice";

export default function Adminlayout({ children }) {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const [profile, users, services] = await Promise.all([
          getUserProfile(),
          // getcategory(),
          fetchusers(),
          getallservice(),
        ]);

        console.log("from layout", services);
        if (profile) dispatch(setinfo(profile));
        // if (category) dispatch(setCategories(category));
        if (users) dispatch(setUsers(users));
        if (services) dispatch(setServices(services));
      } catch (error) {
        console.error("Admin Layout load error:", error);
      }
    };

    fetchdata();
  }, [dispatch]);

  return (
    <div className="bg-white">
      <Sidebar />
      <main className="flex-1 p-5 md:ml-64">{children}</main>
    </div>
  );
}
