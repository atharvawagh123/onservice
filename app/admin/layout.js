'use client';

import { useEffect } from 'react';
import Sidebar from '../component/Sidebar';
import { getUserProfile } from '../customhook/user';
import { setinfo } from '../store/Adminslice';
import { useDispatch } from 'react-redux';

export default function Adminlayout({ children }) {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const [profile] = await Promise.all([getUserProfile()]);
        if (profile) dispatch(setinfo(profile));
      } catch (error) {
        console.error('Admin Layout load error:', error);
      }
    };

    fetchdata();
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white">
      <Sidebar />

      <main className="flex-1 p-5 md:ml-64">{children}</main>
    </div>
  );
}
