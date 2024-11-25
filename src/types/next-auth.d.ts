// eslint-disable-next-line
import NextAuth from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    id: any;
    expires: number;
    token: any;
    provider: any;
    user: {
      user_id: number;
      name: string;
      email: string;
      role: string;
    };
  }
}
