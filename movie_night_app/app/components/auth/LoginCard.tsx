
import { Github, Google } from "@/app/components/icons/";
import LoginProviderButton from "@/app/components/auth/LoginProviderButton";

export default  function Login() {
  return (
    <div className="flex flex-col bg-base-100 justify-center items-center p-10 rounded-2xl ">
      <div className="text-content text font-extrabold p-2 mb-2">
        Sign In With:
      </div>
      <div className="flex flex-col gap-2 ">
        <LoginProviderButton provider="github" icon={<Github />} />
        <LoginProviderButton provider="google" icon={<Google />} />
      </div>
    </div>
  );
}
