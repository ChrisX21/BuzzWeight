"use client";

import Link from "next/link";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import ThemeToggle from "@/components/theme-toggle";
import { GiTreeBeehive } from "react-icons/gi";
import { AiOutlineHome } from "react-icons/ai";
import { MdHive } from "react-icons/md";
import { FiSettings, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { PiSignOut } from "react-icons/pi";

const itemClass =
  "flex items-center gap-3 rounded-lg p-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-amber-500/10 hover:text-amber-700 dark:hover:text-amber-300";

export default function SideMenu() {
  const [isOpen, setIsOpen] = useState(true);

  const handleSignOut = async () => {
    if (!window.confirm("Are you sure you want to sign out?")) return;
    await fetch("/api/auth/sign-out", { method: "POST" });
    // Full navigation so the cleared cookies take effect on the server render.
    window.location.assign("/sign-in");
  };

  return (
    <nav
      className={`fixed left-0 top-0 z-40 h-full transition-all duration-300 ease-in-out
      ${isOpen ? "w-64 border-r border-border bg-card shadow-lg" : "w-16 bg-transparent"}`}
    >
      <div className="flex h-full flex-col p-4">
        <div className="mb-6 flex items-center justify-between">
          {isOpen && (
            <Link href="/" className="flex items-center gap-2 font-extrabold tracking-tight">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 text-white">
                <GiTreeBeehive className="h-4 w-4" />
              </span>
              Buzz<span className="-ml-2 text-amber-600 dark:text-amber-400">Weight</span>
            </Link>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Collapse menu" : "Expand menu"}
            className={`flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background text-foreground/70 transition-colors hover:bg-secondary ${!isOpen ? "w-full" : ""}`}
          >
            {isOpen ? <FiChevronLeft /> : <FiChevronRight />}
          </button>
        </div>

        {isOpen && (
          <>
            <div className="flex flex-col gap-1">
              <Link href="/" className={itemClass}>
                <AiOutlineHome className="text-lg" /> Home
              </Link>
              <Link href="/protected/settings" className={itemClass}>
                <FiSettings className="text-lg" /> Settings
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className={itemClass}>
                    <MdHive className="text-lg" /> Trailers
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="bottom" className="w-48">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Link
                      key={i + 1}
                      href={`/protected/dashboard/${i + 1}`}
                      className="flex items-center gap-3 rounded-md p-2 text-sm transition-colors hover:bg-amber-500/10 hover:text-amber-700 dark:hover:text-amber-300"
                    >
                      Trailer {i + 1}
                    </Link>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="mt-auto flex flex-col gap-3">
              <div className="flex items-center justify-between rounded-lg border border-border p-2">
                <span className="text-xs text-muted-foreground">Theme</span>
                <ThemeToggle />
              </div>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-3 rounded-lg p-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-destructive/10 hover:text-destructive"
              >
                <PiSignOut className="text-lg" /> Sign out
              </button>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}
