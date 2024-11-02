import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { db } from '@/database';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async session({ session, token }) {
      let userData = await db
        .selectFrom('users')
        .selectAll()
        .where('google_id', '=', token.sub!)
        .executeTakeFirst();

      if (!userData) {
        userData = await db
          .insertInto('users')
          .values({
            user_id: crypto.randomUUID(),
            name: token.name || '名無しさん',
            avatar: session.user.image || '',
            google_id: token.sub!,
            email: token.email || '',
          })
          .returningAll()
          .executeTakeFirst();
      }

      return {
        ...session,
        user: {
          ...session.user,
          googleId: token.sub,
        },
        account: {
          userId: userData?.user_id,
          name: userData?.name,
          description: userData?.description,
          avatar: userData?.avatar,
        },
      };
    },
  },
  session: {
    strategy: 'jwt',
  },
});
