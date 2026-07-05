import Link from "next/link";
import SideMenu from "@/components/side-menu";
import ThemeToggle from "@/components/theme-toggle";
import { GiTreeBeehive } from "react-icons/gi";
import { createClient } from "@/utils/supabase/server";

const navLinks = [
  { href: "/#products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default async function Navbar() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return <SideMenu />;
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/70 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-sm">
            <GiTreeBeehive className="h-5 w-5" />
          </span>
          <span className="text-lg font-extrabold tracking-tight">
            Buzz<span className="text-amber-600 dark:text-amber-400">Weight</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/sign-in"
            className="hidden rounded-full border border-border px-4 py-2 text-sm font-semibold transition-colors hover:bg-secondary sm:inline-flex"
          >
            Sign in
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition-transform hover:scale-[1.02] hover:bg-primary/90"
          >
            Get started
          </Link>
        </div>
      </div>
    </header>
  );
}
