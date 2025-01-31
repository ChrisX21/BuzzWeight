"use client";

import React from "react";
import { Button } from "./ui/button";

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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(
          message || "An error occurred while sending the invite."
        );
      }

      setSuccessMessage("Invite sent!");
    } catch (err: any) {
      setError(err.message || "An error occurred while sending the invite.");
    } finally {
      setIsLoading(false);
      setEmail("");
    }
  };

  return (
    <div className="shadow-lg rounded-lg p-8 bg-white max-w-md mx-auto">
      <h1 className="text-center mb-4 text-2xl font-semibold text-gray-800">
        Invite Users
      </h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          className="flex-grow border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#e9ab17] transition duration-200 ease-in-out"
          type="email"
          placeholder="email@email.com"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {successMessage && (
          <p className="text-green-500 text-sm">{successMessage}</p>
        )}
        <Button
          className="bg-gray-800 hover:bg-[#e9ab17] transition delay-3 p-3 text-white rounded-lg shadow-md hover:shadow-lg"
          disabled={isLoading}
          type="submit"
        >
          {isLoading ? "Sending..." : "Send Invite"}
        </Button>
      </form>
    </div>
  );
}
