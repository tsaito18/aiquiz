/* eslint-disable no-unused-vars */

import { JWT } from 'next-auth/jwt';

declare module 'next-auth/jwt' {
  interface JWT {
    googleId: string;
  }
}
