'use client';

import useUser from 'hooks/useUser';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const SessionCheck = () => {
  const router = useRouter();
  const user = useUser();
  const expires = user?.expires;

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (expires) {
        if (new Date(expires) < new Date()) {
          router.push('/login');
        }
      } else {
        router.push('/login');
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [expires, router]);

  return null;
};

export default SessionCheck;
