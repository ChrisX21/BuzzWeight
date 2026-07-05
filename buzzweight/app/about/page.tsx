import Link from "next/link";
import { Cpu, LineChart, Target, Sparkles } from "lucide-react";

export const metadata = {
  title: "About — BuzzWeight",
  description:
    "BuzzWeight builds precision monitoring hardware and software for mobile bee-hive apiaries.",
};

export default function AboutPage() {
  return (
    <div className="container-page max-w-4xl py-16">
      <span className="eyebrow">About us</span>
      <h1 className="mt-5 text-4xl font-extrabold tracking-tight">
        Data-driven beekeeping, from hive to dashboard
      </h1>
      <p className="mt-5 text-lg text-muted-foreground">
        <strong className="text-foreground">BuzzWeight</strong> helps beekeepers
        monitor weight, pollen yield, temperature and humidity across their
        bee-hive trailers. We design the sensor hardware and build the software
        that turns its readings into real-time, actionable insight.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <div className="surface-card p-6">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300">
            <Cpu className="h-5 w-5" />
          </span>
          <h2 className="mt-4 text-lg font-semibold">The hardware</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Custom-manufactured, solar-powered weighing scales and weather
            stations, calibrated and built to survive the field.
          </p>
        </div>
        <div className="surface-card p-6">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300">
            <LineChart className="h-5 w-5" />
          </span>
          <h2 className="mt-4 text-lg font-semibold">The software</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            A responsive dashboard that aggregates up to 5 trailers — each with 4
            production scales, a hive scale and a weather station.
          </p>
        </div>
      </div>

      <div className="mt-12 space-y-8">
        <section>
          <h2 className="flex items-center gap-2 text-xl font-bold">
            <Target className="h-5 w-5 text-amber-600" /> Our mission
          </h2>
          <p className="mt-3 text-muted-foreground">
            We empower beekeepers with accurate, reliable sensor data. Our goal
            is to simplify complex data management so you can make informed
            decisions that improve colony health and operational efficiency.
          </p>
        </section>

        <section>
          <h2 className="flex items-center gap-2 text-xl font-bold">
            <Sparkles className="h-5 w-5 text-amber-600" /> Why BuzzWeight
          </h2>
          <p className="mt-3 text-muted-foreground">
            Simplicity, precision and scalability. Whether you manage a single
            trailer or a fleet, BuzzWeight handles your data effortlessly — and
            because hardware and software are offered separately, you only pay
            for what you need.
          </p>
        </section>
      </div>

      <div className="surface-card mt-12 flex flex-col items-start gap-4 p-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold">Get in touch</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Questions, suggestions or feedback? We’d love to hear from you.
          </p>
        </div>
        <Link
          href="/contact"
          className="inline-flex shrink-0 items-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Contact us
        </Link>
      </div>
    </div>
  );
}
