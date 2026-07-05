import Link from "next/link";
import { GiTreeBeehive } from "react-icons/gi";

const columns = [
  {
    title: "Products",
    links: [
      { href: "/#hardware", label: "Sensor Hardware" },
      { href: "/#software", label: "Dashboard Software" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-muted/40">
      <div className="container-page py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-white">
                <GiTreeBeehive className="h-5 w-5" />
              </span>
              <span className="text-lg font-extrabold tracking-tight">
                Buzz<span className="text-amber-600 dark:text-amber-400">Weight</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Precision hardware and real-time software for monitoring mobile,
              eco-friendly bee-hive apiaries.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
                {col.title}
              </h3>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-center text-sm text-muted-foreground sm:flex-row sm:text-left">
          <p>© {new Date().getFullYear()} BuzzWeight. All rights reserved.</p>
          <p>
            Questions?{" "}
            <Link href="/contact" className="font-medium text-foreground hover:text-amber-600">
              Get in touch
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
