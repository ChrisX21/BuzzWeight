import Link from "next/link";
import { ArrowRight, Cpu, LineChart } from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-honey-glow relative overflow-hidden border-b border-border/60">
      <div className="container-page grid items-center gap-12 py-20 lg:grid-cols-2 lg:py-28">
        <div>
          <span className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            Hardware + Software for smart apiaries
          </span>

          <h1 className="mt-6 text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            Weigh every hive.{" "}
            <span className="text-gradient-honey">Watch every trailer.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            BuzzWeight pairs rugged, solar-powered weighing &amp; climate sensors
            with a live web dashboard — so you can track pollen yield, colony
            weight, temperature and humidity across your mobile apiaries in real
            time.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-sm transition-transform hover:scale-[1.02] hover:bg-primary/90"
            >
              Request a demo <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/#products"
              className="inline-flex items-center justify-center rounded-full border border-border px-6 py-3 font-semibold transition-colors hover:bg-secondary"
            >
              Explore products
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-6 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <Cpu className="h-4 w-4 text-amber-600" /> Precision sensor hardware
            </span>
            <span className="inline-flex items-center gap-2">
              <LineChart className="h-4 w-4 text-amber-600" /> Real-time dashboard
            </span>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-tr from-amber-200/40 to-orange-200/30 blur-2xl dark:from-amber-500/10 dark:to-orange-500/10" />
          <div className="surface-card overflow-hidden p-2">
            <img
              src="/images/dashboard.png"
              alt="BuzzWeight monitoring dashboard"
              className="w-full rounded-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
