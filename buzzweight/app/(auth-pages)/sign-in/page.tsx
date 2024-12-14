"use client";

import { signInAction } from "@/app/actions";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";

type FormErrors = {
  email: string;
  password: string;
  general: string;
};

export default function Login(props: { searchParams?: { error?: string } }) {
  const [errors, setErrors] = useState<FormErrors>({
    email: "",
    password: "",
    general: "",
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Reset errors
    setErrors({ email: "", password: "", general: "" });

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // Validate email
    if (!email) {
      setErrors((prev) => ({ ...prev, email: "Email is required" }));
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrors((prev) => ({ ...prev, email: "Please enter a valid email" }));
      return;
    }

    // Validate password
    if (!password) {
      setErrors((prev) => ({ ...prev, password: "Password is required" }));
      return;
    }
    if (password.length < 6) {
      setErrors((prev) => ({
        ...prev,
        password: "Password must be at least 6 characters",
      }));
      return;
    }

    try {
      const result = await signInAction(formData);
      const searchParams = new URLSearchParams(result?.toString() || "");
      if (searchParams.get("error")) {
        setErrors((prev) => ({
          ...prev,
          general: searchParams.get("error") || "Invalid email or password",
        }));
      }
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        general: "An error occurred during sign-in",
      }));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2 p-10 mb-10">
      <h1 className="text-2xl font-medium text-center text-foreground mb-4">
        Welcome back!
      </h1>
      <div className="border rounded-lg border-grey w-full max-w-md flex flex-col items-center shadow-lg p-10">
        <h2 className="text-xl font-medium text-center mb-4">Sign in</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <p
                id="email-error"
                className="text-red-500 text-sm mt-1"
                aria-live="polite"
              >
                {errors.email}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center">
              <Label htmlFor="password">Password</Label>
              <Link
                href="/forgot-password"
                className="text-xs text-foreground underline"
              >
                Forgot Password?
              </Link>
            </div>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Your password"
              required
              aria-describedby={errors.password ? "password-error" : undefined}
            />
            {errors.password && (
              <p
                id="password-error"
                className="text-red-500 text-sm mt-1"
                aria-live="polite"
              >
                {errors.password}
              </p>
            )}
          </div>

          {errors.general && (
            <p
              className="text-red-500 text-sm text-center mt-2"
              aria-live="polite"
            >
              {errors.general}
            </p>
          )}

          <SubmitButton
            className="hover:bg-[#e9ab17]"
            pendingText="Signing In..."
          >
            Sign in
          </SubmitButton>
        </form>
      </div>
    </div>
  );
}
