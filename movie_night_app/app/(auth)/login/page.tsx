import { signIn } from "@/app/auth";
import GithubIcon from "@/app/components/icons/github";
import GoogleIcon from "@/app/components/icons/google";
import { login } from "@/lib/actions/auth";
import { auth } from "@/app/auth";

export default async function Login() {
  const session = await auth();
  console.log("session", session);
  return (
    <div className=" flex justify-center items-center min-h-screen ">
      <div className="flex flex-col  bg-accent-content justify-center items-center p-10 rounded-2xl">
        <div className="text-content text font-extrabold p-2 mb-2">
          Sign In With:
        </div>
        <div className="flex flex-col gap-2">
          <div className="">
            <form
              action={async () => {
                "use server";
                await login("github");
              }}
            >
              <div className="  ">
                <button
                  className="btn  bg-base-content hover:bg-neutral h-10 w-60"
                  type="submit"
                >
                  <GithubIcon />
                </button>
              </div>
            </form>
          </div>
          <div>
            <form
              action={async () => {
                "use server";
                await signIn("google");
              }}
            >
              <div className="">
                <button
                  className="btn btn-soft btn-primary h-10 w-60"
                  type="submit"
                >
                  <GoogleIcon />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
