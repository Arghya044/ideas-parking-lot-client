'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChange } from '@/lib/auth';

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Subscribe to auth state changes
    const unsubscribe = onAuthStateChange((user) => {
      if (user) {
        setAuthenticated(true);
        setLoading(false);
      } else {
        setAuthenticated(false);
        setLoading(false);
        router.push('/login');
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!authenticated) {
    return null;
  }

  return <>{children}</>;
}

