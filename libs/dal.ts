import 'server-only';

import { cache } from 'react';
import { db } from '@/database';
import { auth } from '@/auth';
import { Session } from '@/interfaces/session';

export const getSession = cache(async (): Promise<Session> => {
  const session = await auth();
  if (!session) {
    return { isLoggedIn: false, user: null };
  }

  try {
    const userData = await db
      .selectFrom('users')
      .selectAll()
      .where('google_id', '=', session.user.googleId)
      .executeTakeFirst();
    console.log(userData);

    if (userData) {
      return { isLoggedIn: true, user: userData };
    } else {
      const newUser = await db
        .insertInto('users')
        .values({
          user_id: crypto.randomUUID(),
          name: session.user.name || '名無しさん',
          avatar: session.user.image || '',
          google_id: session.user.googleId,
          email: session.user.email || '',
        })
        .returningAll()
        .executeTakeFirst();

      return { isLoggedIn: true, user: newUser! };
    }
  } catch (error) {
    console.log('Failed to fetch user');
    return { isLoggedIn: false, user: null };
  }
});
