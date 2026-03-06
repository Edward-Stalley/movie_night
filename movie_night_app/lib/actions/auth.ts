import { signIn, signOut } from "@/app/auth";

export const login = async (signInSite: string) => {
  await signIn(signInSite, { redirectTo: "/movies" });
};

export const logout = async () => {
  await signOut({ redirectTo: "/" });
};
