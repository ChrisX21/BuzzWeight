import { forgotPasswordAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default async function ForgotPassword(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  return (
    <>
    <div className="border rounded-lg border-grey w-full h-full flex justify-center items-center shadow-lg shadow-grey">
      <div className="flex flex-col items-center justify-center gap-2 p-10">
      <h1 className="text-2xl font-medium text-center">Forgot your password?</h1>
      <p className="text-sm text-center text-foreground font-medium">Already have an account? <Link href="/sign-in" className="text-primary underline">Sign in</Link></p>
      </div>
      <form className="flex-1 flex flex-col w-full gap-2 text-foreground [&>input]:mb-6 min-w-64 min-h-60 mx-auto p-10">
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <Label htmlFor="email">Email</Label>
          <Input name="email" placeholder="you@example.com" required />
          <SubmitButton className="hover:bg-[#e9ab17]" formAction={forgotPasswordAction}>
            Reset Password
          </SubmitButton>
          <FormMessage message={searchParams} />
        </div>
      </form>
    </div>
    </>
  );
}
