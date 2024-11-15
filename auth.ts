import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    jwt({ token, account }) {
      if (account?.providerAccountId) {
        token.googleId = account.providerAccountId as string;
      }

      return token;
    },
    session({ session, token }) {
      if (token?.googleId) {
        session.user.googleId = token.googleId;
      }

      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
});
