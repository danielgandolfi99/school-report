'use client';

import { useEffect } from 'react';

// next
import { useRouter } from 'next/navigation';

// project-import
import Loader from 'components/Loader';

// types
import { GuardProps } from 'types/auth';

// ==============================|| AUTH GUARD ||============================== //

const AuthGuard = ({ children }: GuardProps) => {
  const router = useRouter();

  useEffect(() => {
    const session = localStorage.getItem('session');

    if (!session) {
      router.push('/login');
      return;
    }

    const parsedSession = JSON.parse(session);

    if (!parsedSession?.token) {
      router.push('/login');
    }
  }, [router]);

  return <>{!localStorage.getItem('session') ? <Loader /> : children}</>;
};

export default AuthGuard;
