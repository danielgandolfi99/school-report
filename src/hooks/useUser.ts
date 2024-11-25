import { useEffect, useState } from 'react';

interface UserProps {
  user_id: number;
  name: string;
  email: string;
  role: string;
  access_token: string;
  avatar?: string;
}

interface SessionProps {
  expires: number;
  token: string;
  provider: string;
  user: UserProps;
}

const useUser = () => {
  const [session, setSession] = useState<SessionProps | null>(null);

  useEffect(() => {
    const storedSession = localStorage.getItem('session');
    if (storedSession) {
      const parsedSession: SessionProps = JSON.parse(storedSession);
      setSession(parsedSession);
    } else {
      console.error('Sessão não encontrada no localStorage');
    }
  }, []);

  return session;
};

export default useUser;
