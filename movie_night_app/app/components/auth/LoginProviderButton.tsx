import { login } from "@/lib/auth/auth";

type Props = {
  provider: string;
  icon: React.ReactNode;
};

export default function LoginProviderButton({ provider, icon }: Props) {
  return (
    <form
      action={async (formData: FormData) => {
        "use server";
        const provider = formData.get("provider") as string;
        await login(provider);
      }}
    >
      <div className="  ">
        <button
          className="btn  bg-base-content hover:bg-neutral h-10 w-60"
          type="submit"
          value={provider}
          name="provider"
        >
          {icon}
        </button>
      </div>
    </form>
  );
}
