"use client";

import React from "react";

export default function InviteUsers() {
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const response = await fetch("/api/admin/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const { message } = await response.json().catch(() => ({}));
        throw new Error(message || "An error occurred while sending the invite.");
      }

      setSuccessMessage("Invite sent!");
      setEmail("");
    } catch (err: any) {
      setError(err.message || "An error occurred while sending the invite.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="flex flex-col gap-3 sm:flex-row sm:items-start" onSubmit={handleSubmit}>
      <div className="flex-1">
        <input
          className="block w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm shadow-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30"
          type="email"
          placeholder="name@example.com"
          id="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
        {successMessage && <p className="mt-2 text-sm text-emerald-600">{successMessage}</p>}
      </div>
      <button
        disabled={isLoading}
        type="submit"
        className="inline-flex shrink-0 items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
      >
        {isLoading ? "Sending…" : "Send invite"}
      </button>
    </form>
  );
}
