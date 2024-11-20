'use client';

import { useSession, signOut } from 'next-auth/react';
import { useEffect } from 'react';

const SessionCheck = () => {
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      const { expires } = session;

      if (new Date(expires) < new Date()) {
        signOut({ callbackUrl: '/login' });
      }
    }
  }, [session]);

  return null;
};

export default SessionCheck;
