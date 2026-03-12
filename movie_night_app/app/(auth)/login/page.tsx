import { Github, Google } from "@/app/components/icons/";
import { auth } from "@/app/auth";
import LoginProviderButton from "@/app/components/auth/LoginProviderButton";

export default async function Login() {
  const session = await auth();
  return (
    <div className=" flex justify-center items-center min-h-screen ">
      <div className="flex flex-col  bg-accent-content justify-center items-center p-10 rounded-2xl">
        <div className="text-content text font-extrabold p-2 mb-2">
          Sign In With:
        </div>
        <div className="flex flex-col gap-2">
          <LoginProviderButton provider="github" icon={<Github />} />
          <LoginProviderButton provider="google" icon={<Google />} />
        </div>
      </div>
    </div>
  );
}
