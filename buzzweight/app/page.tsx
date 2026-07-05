import Link from "next/link";
import Hero from "@/components/hero";
import {
  ArrowRight,
  Cpu,
  LineChart,
  Radio,
  Scale,
  Thermometer,
  Sun,
  Bell,
  Download,
  CheckCircle2,
} from "lucide-react";

const flow = [
  {
    icon: Scale,
    title: "1. Measure",
    text: "Load-cell scales and climate sensors on each trailer capture hive weight, pollen yield, temperature and humidity.",
  },
  {
    icon: Radio,
    title: "2. Transmit",
    text: "An on-site edge unit collects readings over MQTT, aggregates them, and securely forwards them to the cloud.",
  },
  {
    icon: LineChart,
    title: "3. Monitor",
    text: "Your dashboard turns the raw stream into live charts, history and exports — from any device, anywhere.",
  },
];

const softwareFeatures = [
  { icon: LineChart, title: "Live dashboards", text: "Real-time weight, pollen, temperature & humidity charts per trailer." },
  { icon: Bell, title: "Threshold alerts", text: "Get notified when a metric crosses a critical limit." },
  { icon: Download, title: "CSV export", text: "Export any date range for record-keeping and analysis." },
  { icon: Scale, title: "Multi-trailer", text: "Aggregate up to 5 trailers, each with 4 production scales, a hive scale and a weather station." },
];

const hardwareFeatures = [
  { icon: Scale, title: "Precision weighing", text: "Calibrated HX711 load-cell scales for accurate, drift-corrected weight." },
  { icon: Thermometer, title: "Climate station", text: "Multi-point temperature & humidity sensing across the trailer." },
  { icon: Sun, title: "Solar powered", text: "Solar with battery backup for continuous, low-footprint operation." },
  { icon: Radio, title: "Wireless mesh", text: "Nodes publish over MQTT to a rugged on-site gateway — no wiring runs." },
];

export default function Index() {
  return (
    <>
      <Hero />

      {/* Project explanation / how it works */}
      <section className="container-page py-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">How it works</span>
          <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
            One system, from the hive to your screen
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            BuzzWeight is an end-to-end monitoring platform for mobile,
            eco-friendly apiaries. Sensors on the trailer do the measuring; our
            software does the thinking.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {flow.map((s) => (
            <div key={s.title} className="surface-card p-7">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300">
                <s.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Two products */}
      <section id="products" className="border-y border-border bg-muted/40 py-20 scroll-mt-20">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Two products, sold separately</span>
            <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
              Buy the hardware, the software, or both
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Already have sensors? Use our dashboard on its own. Prefer to run
              your own software? Take just the hardware. Together they’re a
              complete, plug-and-play apiary monitoring system.
            </p>
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-2">
            {/* Hardware */}
            <div id="hardware" className="surface-card flex flex-col p-8 scroll-mt-24">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white">
                  <Cpu className="h-6 w-6" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                    Product 01 — Hardware
                  </p>
                  <h3 className="text-2xl font-bold">Sensor &amp; Scale Kit</h3>
                </div>
              </div>
              <p className="mt-5 text-muted-foreground">
                Custom-manufactured weighing scales and a weather station,
                purpose-built for bee-hive trailers. Rugged, calibrated, and
                solar-powered — ships ready to deploy in the field.
              </p>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {hardwareFeatures.map((f) => (
                  <li key={f.title} className="flex gap-3">
                    <f.icon className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
                    <span>
                      <span className="block text-sm font-semibold">{f.title}</span>
                      <span className="block text-sm text-muted-foreground">{f.text}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex-1" />
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Enquire about hardware <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Software */}
            <div id="software" className="surface-card flex flex-col p-8 scroll-mt-24">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 text-white dark:from-slate-500 dark:to-slate-700">
                  <LineChart className="h-6 w-6" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                    Product 02 — Software
                  </p>
                  <h3 className="text-2xl font-bold">Monitoring Dashboard</h3>
                </div>
              </div>
              <p className="mt-5 text-muted-foreground">
                A fast, responsive web application that ingests sensor data and
                turns it into live insight. Works with our hardware out of the
                box, or with any device that can POST readings to our API.
              </p>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {softwareFeatures.map((f) => (
                  <li key={f.title} className="flex gap-3">
                    <f.icon className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
                    <span>
                      <span className="block text-sm font-semibold">{f.title}</span>
                      <span className="block text-sm text-muted-foreground">{f.text}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex-1" />
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-secondary"
              >
                Enquire about software <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile eco-friendly apiaries */}
      <section className="container-page py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="surface-card overflow-hidden p-2">
            <img
              src="/images/pollen_scale.png"
              alt="Pollen collection scale on a bee-hive trailer"
              className="w-full rounded-xl"
            />
          </div>
          <div>
            <span className="eyebrow">Built for the field</span>
            <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
              Mobile, eco-friendly apiaries
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Our custom trailers let you relocate colonies to follow blooming
              patterns — maximising pollination and honey production while
              keeping the environmental footprint low.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Solar power with battery backup for 24/7 operation",
                "Intelligent climate control in any environment",
                "Lightweight, durable build for quick relocation",
                "Early detection of colony health issues",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
                  <span className="text-muted-foreground">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-page pb-24">
        <div className="bg-honey-glow surface-card overflow-hidden px-8 py-14 text-center">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
            Start monitoring your apiary today
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            Tell us about your setup and we’ll help you choose the right mix of
            hardware and software.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-sm transition-transform hover:scale-[1.02] hover:bg-primary/90"
            >
              Request a demo <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center rounded-full border border-border px-6 py-3 font-semibold transition-colors hover:bg-secondary"
            >
              Learn more
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
