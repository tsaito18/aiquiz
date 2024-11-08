import 'server-only';

import { cache } from 'react';
import { db } from '@/database';
import { auth } from '@/auth';
import { User } from '@/interfaces/database';

export const getUser = cache(async (): Promise<User | null> => {
  const session = await auth();
  if (!session) return null;

  try {
    const userData = await db
      .selectFrom('users')
      .selectAll()
      .where('google_id', '=', session.user.googleId)
      .executeTakeFirst();
    console.log(userData);

    if (userData) {
      return userData;
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

      return newUser!;
    }
  } catch (error) {
    console.log('Failed to fetch user');
    return null;
  }
});
