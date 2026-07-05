"use client";

import { useState } from "react";
import { Cpu, LineChart, MessageSquare, Send, CheckCircle2 } from "lucide-react";

type Status = "idle" | "sending" | "sent" | "error";

const fieldClass =
  "mt-1.5 block w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm shadow-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(json.message || "Something went wrong");
      }
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <div className="container-page grid gap-12 py-16 lg:grid-cols-[0.9fr_1.1fr]">
      {/* Intro */}
      <div>
        <span className="eyebrow">Contact</span>
        <h1 className="mt-5 text-4xl font-extrabold tracking-tight">
          Let’s talk about your apiary
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Whether you need the hardware, the software, or a full end-to-end
          system, send us a message and we’ll get back to you.
        </p>

        <ul className="mt-8 space-y-4">
          <li className="flex gap-3">
            <Cpu className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
            <span className="text-sm text-muted-foreground">
              <span className="block font-semibold text-foreground">Hardware enquiries</span>
              Custom scales &amp; weather stations for your trailers.
            </span>
          </li>
          <li className="flex gap-3">
            <LineChart className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
            <span className="text-sm text-muted-foreground">
              <span className="block font-semibold text-foreground">Software enquiries</span>
              Access to the dashboard for your existing devices.
            </span>
          </li>
          <li className="flex gap-3">
            <MessageSquare className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
            <span className="text-sm text-muted-foreground">
              <span className="block font-semibold text-foreground">Everything else</span>
              Questions, feedback and partnership ideas welcome.
            </span>
          </li>
        </ul>
      </div>

      {/* Form */}
      <div className="surface-card p-8">
        {status === "sent" ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <CheckCircle2 className="h-12 w-12 text-emerald-500" />
            <h2 className="mt-4 text-xl font-bold">Message sent</h2>
            <p className="mt-2 text-muted-foreground">
              Thanks for reaching out — we’ll be in touch soon.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="mt-6 rounded-full border border-border px-5 py-2 text-sm font-semibold transition-colors hover:bg-secondary"
            >
              Send another
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="text-sm font-medium">Name</label>
                <input id="name" name="name" required placeholder="Your full name" className={fieldClass} />
              </div>
              <div>
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <input id="email" name="email" type="email" required placeholder="you@example.com" className={fieldClass} />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="text-sm font-medium">Subject</label>
              <input id="subject" name="subject" required placeholder="What’s this about?" className={fieldClass} />
            </div>

            <div>
              <label htmlFor="message" className="text-sm font-medium">Message</label>
              <textarea id="message" name="message" rows={5} required placeholder="Tell us about your setup…" className={`${fieldClass} min-h-32 resize-y`} />
            </div>

            {status === "error" && (
              <p className="text-sm text-destructive" aria-live="polite">{error}</p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 disabled:opacity-60"
            >
              {status === "sending" ? "Sending…" : (<>Send message <Send className="h-4 w-4" /></>)}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
