/* eslint-disable no-unused-vars */

import type { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      googleId: string;
    } & DefaultSession['user'];
    account: {
      userId: string;
      name: string;
      description: string;
      avatar: string;
    };
  }
}

import type { JWT } from 'next-auth/jwt';

declare module 'next-auth/jwt' {
  interface JWT {
    googleId: string;
  }
}
