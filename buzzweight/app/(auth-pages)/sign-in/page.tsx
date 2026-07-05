"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GiTreeBeehive } from "react-icons/gi";
import Link from "next/link";
import { useState } from "react";

type FormErrors = { email: string; password: string; general: string };
const empty: FormErrors = { email: "", password: "", general: "" };

export default function Login() {
  const [errors, setErrors] = useState<FormErrors>(empty);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors(empty);

    const formData = new FormData(event.currentTarget);
    const email = (formData.get("email") as string)?.trim();
    const password = formData.get("password") as string;

    if (!email) return setErrors((p) => ({ ...p, email: "Email is required" }));
    if (!/\S+@\S+\.\S+/.test(email)) return setErrors((p) => ({ ...p, email: "Please enter a valid email" }));
    if (!password) return setErrors((p) => ({ ...p, password: "Password is required" }));
    if (password.length < 6) return setErrors((p) => ({ ...p, password: "Password must be at least 6 characters" }));

    setSubmitting(true);
    try {
      const res = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setErrors((p) => ({ ...p, general: data.error || "Sign in failed. Please try again." }));
        setSubmitting(false);
        return;
      }

      // Full navigation so the freshly-set session cookies are sent and the
      // protected pages render server-side with the new session.
      window.location.assign("/protected");
    } catch {
      setErrors((p) => ({ ...p, general: "Could not reach the server. Please try again." }));
      setSubmitting(false);
    }
  };

  return (
    <div className="surface-card p-8">
      <div className="mb-6 flex flex-col items-center text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-sm">
          <GiTreeBeehive className="h-6 w-6" />
        </span>
        <h1 className="mt-4 text-2xl font-bold">Welcome back</h1>
        <p className="mt-1 text-sm text-muted-foreground">Sign in to your BuzzWeight dashboard</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" placeholder="you@example.com" required />
          {errors.email && <p className="text-sm text-destructive" aria-live="polite">{errors.email}</p>}
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link href="/forgot-password" className="text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground">
              Forgot password?
            </Link>
          </div>
          <Input id="password" name="password" type="password" placeholder="Your password" required />
          {errors.password && <p className="text-sm text-destructive" aria-live="polite">{errors.password}</p>}
        </div>

        {errors.general && <p className="text-center text-sm text-destructive" aria-live="polite">{errors.general}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-primary py-2.5 font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
        >
          {submitting ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
