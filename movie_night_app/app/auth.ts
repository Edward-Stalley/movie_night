import { getUserByProviderAccountId, upsertUser } from '@/lib/queries/users';
import { DBUserInsert } from '@/lib/types/db';
import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    GitHub,
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (!account) {
        return false;
      }

      const dbUser: DBUserInsert = {
        name: user.name ?? 'Unkwown User',
        image: user.image ?? '',
        provider: account.provider,
        providerAccountId: account.providerAccountId,
      };

      await upsertUser(dbUser);
      return true;
    },

    async jwt({ token, user, account }) {
      // On first sign in, user and account are available
      if (account && user) {
        const dbUser = await getUserByProviderAccountId(account.providerAccountId);
        if (dbUser) {
          token.userId = dbUser.id; // attach numeric DB ID to token
        }
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        // Attach "users.id" from the database to the session.
        session.user.id = token.userId as string;
      }
      return session;
    },
  },
});
