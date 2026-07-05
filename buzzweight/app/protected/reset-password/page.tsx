import { resetPasswordAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default async function ResetPassword(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  return (
    <div className="mx-auto max-w-md">
      <div className="surface-card p-8">
        <h1 className="text-2xl font-bold">Reset password</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Please enter your new password below.
        </p>

        <form className="mt-6 flex flex-col gap-4" action={resetPasswordAction}>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="password">New password</Label>
            <Input id="password" type="password" name="password" placeholder="New password" required />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="confirmPassword">Confirm password</Label>
            <Input id="confirmPassword" type="password" name="confirmPassword" placeholder="Confirm password" required />
          </div>
          <SubmitButton
            type="submit"
            className="w-full rounded-full bg-primary font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Reset password
          </SubmitButton>
          <FormMessage message={searchParams} />
        </form>
      </div>
    </div>
  );
}
