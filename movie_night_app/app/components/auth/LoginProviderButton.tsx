"use client";
import { signIn } from "next-auth/react";

type Props = {
  provider: string;
  icon: React.ReactNode;
};

export default function LoginProviderButton({ provider, icon }: Props) {
  const handleClick = () => signIn(provider, { callbackUrl: "/movies" });

  return (
    <button
      className="btn bg-base-content hover:bg-neutral h-10 w-60"
      onClick={handleClick}
    >
      {icon}
    </button>
  );
}
