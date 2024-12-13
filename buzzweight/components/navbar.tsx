import React from "react";
import Link from "next/link";
import SideMenu from "@/components/side-menu";
import { GiTreeBeehive } from "react-icons/gi";
import { createClient } from "@/utils/supabase/server";

export default async function Navbar() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? (
    <SideMenu />
  ) : (
    <>
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
            <Link
              href={"/sign-in"}
              className="hover:text-white transition transition-duration: 10ms "
            >
              Sign In
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
