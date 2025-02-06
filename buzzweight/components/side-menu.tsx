"use client";

import { signOutAction } from "@/app/actions";
import Link from "next/link";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { GiTreeBeehive } from "react-icons/gi";
import { AiOutlineHome } from "react-icons/ai";
import { MdHive } from "react-icons/md";
import { FiSettings, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { PiSignOut } from "react-icons/pi";

export default function SideMenu() {
  const [isOpen, setIsOpen] = useState(true);

  const handleSignOut = async () => {
    if (window.confirm("Are you sure you want to sign out?")) {
      await signOutAction();
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 h-full text-gray-800 shadow-lg transition-all duration-300 ease-in-out z-40
      ${isOpen ? "w-64 bg-white" : "w-16 bg-transparent shadow-none"}`}
    >
      <div className="flex flex-col p-5">
        <div className="flex justify-between items-center mb-8">
          {isOpen && (
            <div className="flex items-center gap-2 text-xl font-semibold text-[#e9ab17]">
              BuzzWeight <GiTreeBeehive className="text-2xl" />
            </div>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`h-10 w-10 hover:bg-[#e9ab17] hover:text-white rounded-lg transition-colors flex items-center justify-center
              ${!isOpen ? "w-full" : ""}`}
          >
            {isOpen ? <FiChevronLeft /> : <FiChevronRight />}
          </button>
        </div>

        <div className="flex flex-col gap-2">
          {isOpen
            ? [
                {
                  href: "/",
                  icon: <AiOutlineHome className="text-xl" />,
                  label: "Home",
                },
                {
                  href: "/protected/settings",
                  icon: <FiSettings className="text-xl" />,
                  label: "Settings",
                },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 p-2 hover:bg-[#e9ab17] hover:text-white rounded-lg transition-colors`}
                >
                  <div className="min-w-[24px] flex justify-center">
                    {item.icon}
                  </div>
                  <span>{item.label}</span>
                </Link>
              ))
            : null}

          {isOpen && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className={`flex items-center gap-3 p-2 hover:bg-[#e9ab17] hover:text-white rounded-lg transition-colors
                    ${!isOpen ? "justify-center" : ""}`}
                >
                  <div className="min-w-[24px] flex justify-center">
                    <MdHive className="text-xl" />
                  </div>
                  <span>Trailers</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side={isOpen ? "bottom" : "right"}
                className={`mt-2 ${
                  !isOpen ? "ml-2" : ""
                } bg-white shadow-lg rounded-lg overflow-hidden`}
              >
                {Array.from({ length: 5 }, (_, index) => (
                  <Link
                    key={index + 1}
                    href={`/protected/dashboard/${index + 1}`}
                    className="flex rounded-lg items-center gap-3 p-2 hover:bg-[#e9ab17] hover:text-white transition-colors"
                  >
                    <span>Trailer {index + 1}</span>
                  </Link>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
        {isOpen && (
          <div className="mt-10">
            <button
              onClick={handleSignOut}
              className={`w-full p-2 hover:bg-[#e9ab17] hover:text-white rounded-lg transition-colors flex items-center gap-3
              ${!isOpen ? "justify-center" : ""}`}
            >
              <div className="min-w-[24px] flex justify-center">
                <PiSignOut className="text-xl" />
              </div>
              {isOpen && <span>Sign Out</span>}
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
