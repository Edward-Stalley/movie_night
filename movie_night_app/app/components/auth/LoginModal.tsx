"use client";

import { useRouter } from "next/navigation";
import LoginCard from "./LoginCard";

export default function LoginModal() {
  const router = useRouter();

  return (
    <div
      onClick={() => router.back()}
      className="fixed inset-0 flex items-center justify-center bg-base-200/50 backdrop-blur-sm z-20"
    >
      <div onClick={(e) => e.stopPropagation()}>
        <LoginCard />
      </div>
    </div>
  );
}
