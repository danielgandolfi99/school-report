'use client';

import { useEffect } from 'react';

// next
import { useRouter } from 'next/navigation';

// project-import
import Loader from 'components/Loader';

// types
import { GuardProps } from 'types/auth';
import useUser from 'hooks/useUser';

// ==============================|| AUTH GUARD ||============================== //

const AuthGuard = ({ children }: GuardProps) => {
  const router = useRouter();
  const user = useUser();
  const token = user?.token;

  useEffect(() => {

    if (!token) {
      router.push('/login');
      return;
    }

    if (!token) {
      router.push('/login');
    }
  }, [router]);

  return <>{!token ? <Loader /> : children}</>;
};

export default AuthGuard;
