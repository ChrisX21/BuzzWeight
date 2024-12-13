import { signOutAction } from "@/app/actions";
import Link from "next/link";
import React from "react";
import { GiTreeBeehive } from "react-icons/gi";

export default function SideMenu() {
  return (
    <nav className="w-full flex justify-center h-16 bg-[#e9ab17]">
      <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
        <div className="flex gap-5 items-center">
          <Link href={"/"}>
            <div className="text-2xl flex align-middle font-bold hover:text-white transition transition-duration: 10ms">
              BuzzWeight <GiTreeBeehive />
            </div>
          </Link>
        </div>
        <div className="flex items-center gap-4 text-base">
          <Link
            href={"/contact"}
            className="hover:text-white transition transition-duration: 10ms"
          >
            Contact
          </Link>
          <form action={signOutAction}>
            <button
              type="submit"
              className="bg-transparent text-base hover:text-white transition transition-duration: 10ms border-none cursor-pointer"
            >
              Sign Out
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}
