import { signIn, signOut } from "@/app/auth";
import { redirect } from "next/dist/server/api-utils";

export const login = async (signInSite: string) => {
  await signIn(signInSite, { redirectTo: "/movies" });
};

export const logout = async () => {
  await signOut({ redirectTo: "/" });
};
