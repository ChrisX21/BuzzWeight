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
    <div className="surface-card p-8">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold">Forgot your password?</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Enter your email and we’ll send you a reset link.
        </p>
      </div>

      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" placeholder="you@example.com" required />
        </div>
        <SubmitButton
          className="w-full rounded-full bg-primary font-semibold text-primary-foreground hover:bg-primary/90"
          formAction={forgotPasswordAction}
        >
          Send reset link
        </SubmitButton>
        <FormMessage message={searchParams} />
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Remembered it?{" "}
        <Link href="/sign-in" className="font-medium text-amber-600 hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
