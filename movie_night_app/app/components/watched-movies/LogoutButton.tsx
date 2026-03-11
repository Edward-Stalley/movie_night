"use client";

import { logout } from "@/lib/api/logout";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    // call a server API route to logout instead of importing server code
    await logout;
    router.push("/login");
  };

  return <button className="btn btn-outline btn-secondary" onClick={handleLogout}>Logout</button>;
}
