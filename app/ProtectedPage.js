'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ProtectedPage({ children }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      alert('Protect page trigger !!!!');
      router.replace('/login'); // redirect if no token
    }
  }, [router]);

  // Optionally, show loading or null while checking token
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (!token) return null; // or a spinner
  }

  return <>{children}</>; // render protected content
}
