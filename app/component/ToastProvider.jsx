'use client'; // This directive marks the component as a Client Component

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';

const ToastProvider = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      pauseOnHover
      theme="light"
    />
  );
};

export default ToastProvider;
