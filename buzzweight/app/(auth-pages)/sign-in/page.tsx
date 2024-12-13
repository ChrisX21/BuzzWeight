import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  return (
    <div className="flex flex-col items-center justify-center gap-2 p-10 mb-10">
      <h1 className="text-2xl font-medium text-center text-foreground mb-4">
        Welcome back!
      </h1>
      <div className="border rounded-lg border-grey w-full h-full flex justify-center items-center shadow-lg shadow-grey">
        <div className="flex flex-col items-center justify-center gap-2 p-10">
          <h1 className="text-2xl font-medium text-center">Sign in</h1>
          <div className="w-full p-[1px] min-w-52 bg-gradient-to-r from-transparent via-foreground/10 to-transparent " />

        </div>
        <form className="flex-1 flex flex-col min-w-64 p-10">
          <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
            <Label htmlFor="email">Email</Label>
            <Input name="email" placeholder="you@example.com" required />
            <div className="flex justify-between items-center">
              <Label htmlFor="password">Password</Label>
              <Link
                className="text-xs text-foreground underline"
                href="/forgot-password"
              >
                Forgot Password?
              </Link>
            </div>
            <Input
              type="password"
              name="password"
              placeholder="Your password"
              required
            />
            <SubmitButton
              className="hover:bg-[#e9ab17]"
              pendingText="Signing In..."
              formAction={signInAction}
            >
              Sign in
            </SubmitButton>
            <FormMessage message={searchParams} />
          </div>
        </form>
      </div>
    </div>
  );
}
