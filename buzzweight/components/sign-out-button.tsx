"use client";

export default function SignOutButton() {
  const handleSignOut = async () => {
    if (!window.confirm("Are you sure you want to sign out?")) return;
    await fetch("/api/auth/sign-out", { method: "POST" });
    window.location.assign("/sign-in");
  };

  return <button onClick={handleSignOut}>Sign Out</button>;
}
