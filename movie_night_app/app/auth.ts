import { upsertUser } from "@/lib/queries";
import { DBUser } from "@/lib/types/db";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

console.log("AUTH FILE LOADED");

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

      const dbUser: DBUser = {
        name: user.name ?? "Unkwown User",
        image: user.image ?? "",
        provider: account.provider,
        providerAccountId: account.providerAccountId,
      };

      const exists = await upsertUser(dbUser);

      console.log(
        "user logged in",
        user,
        account?.provider,
        account?.providerAccountId,
        typeof account?.provider,
        typeof account?.providerAccountId,
      );

      return true;
    },
  },
});
