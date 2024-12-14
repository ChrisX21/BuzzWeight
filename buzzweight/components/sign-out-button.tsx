"use client";

import { signOutAction } from "@/app/actions";

export default function SignOutButton() {
  const handleSignOut = async () => {
    if (window.confirm("Are you sure you want to sign out?")) {
      await signOutAction();
    }
  };

  return <button onClick={handleSignOut}>Sign Out</button>;
}
