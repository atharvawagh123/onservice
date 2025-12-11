"use client";

import { useEffect } from "react";
import Sidebar from "../component/Sidebar";
import { getUserProfile } from "../customhook/user";
import { getcategory } from "../customhook/category";
import { setinfo } from "../store/Adminslice";
import { setcategory } from "../store/Categoryslice";
import { useDispatch } from "react-redux";

export default function Adminlayout({ children }) {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const [profile, category] = await Promise.all([
          getUserProfile(),
          getcategory(),
        ]);
        console.log("from layout", category);
        if (profile) dispatch(setinfo(profile));
        if (category) dispatch(setcategory(category));
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
