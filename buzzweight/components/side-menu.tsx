"use client";

import { signOutAction } from "@/app/actions";
import Link from "next/link";
import React, { useState } from "react";
import { GiTreeBeehive } from "react-icons/gi";
import { AiOutlineHome } from "react-icons/ai";
import { BiCalendar } from "react-icons/bi";
import {
  FiSettings,
  FiSearch,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { PiSignOut } from "react-icons/pi";
import { MdOutlineInbox } from "react-icons/md";

export default function SideMenu() {
  const [isOpen, setIsOpen] = useState(true);

  const handleSignOut = async () => {
    if (window.confirm("Are you sure you want to sign out?")) {
      await signOutAction();
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 h-full bg-white text-gray-800 shadow-lg transition-all duration-300 ease-in-out
          ${isOpen ? "w-64" : "w-16"}`}
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
            {[
              {
                href: "/",
                icon: <AiOutlineHome className="text-xl" />,
                label: "Home",
              },
              {
                href: "/inbox",
                icon: <MdOutlineInbox className="text-xl" />,
                label: "Inbox",
              },
              {
                href: "/calendar",
                icon: <BiCalendar className="text-xl" />,
                label: "Calendar",
              },
              {
                href: "/search",
                icon: <FiSearch className="text-xl" />,
                label: "Search",
              },
              {
                href: "/settings",
                icon: <FiSettings className="text-xl" />,
                label: "Settings",
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 p-2 hover:bg-[#e9ab17] hover:text-white rounded-lg transition-colors
                  ${!isOpen ? "justify-center" : ""}`}
              >
                <div className="min-w-[24px] flex justify-center">
                  {item.icon}
                </div>
                {isOpen && <span>{item.label}</span>}
              </Link>
            ))}
          </div>

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
        </div>
      </nav>
    </>
  );
}
