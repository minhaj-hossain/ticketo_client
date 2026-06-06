"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FaTicketAlt,
  FaThLarge,
  FaBuilding,
  FaCalendarAlt,
  FaUsers,
  FaStar,
  FaSignOutAlt,
} from "react-icons/fa";
import { authClient } from "@/lib/auth-client";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  //   console.log(user?.role);

  // Static list of main sidebar links
  //   const menuItems = [
  //     { name: "Overview", href: "/dashboard/organizer", icon: <FaThLarge /> },
  //     {
  //       name: "Organization",
  //       href: "/dashboard/organizations",
  //       icon: <FaBuilding />,
  //     },
  //     { name: "My Events", href: "/dashboard/events", icon: <FaCalendarAlt /> },
  //     { name: "Bookings", href: "/dashboard/bookings", icon: <FaUsers /> },
  //     { name: "Go Premium", href: "/dashboard/premium", icon: <FaStar /> },
  //   ];
  const menuItemsByRole = {
    organizer: [
      { name: "Overview", href: "/dashboard/organizer", icon: <FaThLarge /> },
      {
        name: "Organization",
        href: "/dashboard/organizer/organization",
        icon: <FaBuilding />,
      },
      {
        name: "Create Events",
        href: "/dashboard/organizer/create-events",
        icon: <FaCalendarAlt />,
      },
      {
        name: "Bookings",
        href: "/dashboard/organizer/bookings",
        icon: <FaUsers />,
      },
      {
        name: "Go Premium",
        href: "/dashboard/organizer/premium",
        icon: <FaStar />,
      },
    ],
    attendee: [
      { name: "Overview", href: "/dashboard/attendee", icon: <FaThLarge /> },
      {
        name: "My Bookings",
        href: "/dashboard/attendee/bookings",
        icon: <FaTicketAlt />,
      },
      {
        name: "Payments",
        href: "/dashboard/attendee/payments",
        icon: <FaStar />,
      },
      {
        name: "Profile",
        href: "/dashboard/attendee/profile",
        icon: <FaUsers />,
      },
    ],
    admin: [
      { name: "Overview", href: "/dashboard/admin", icon: <FaThLarge /> },
      { name: "Users", href: "/dashboard/admin/users", icon: <FaUsers /> },
      {
        name: "Moderation",
        href: "/dashboard/admin/moderation",
        icon: <FaBuilding />,
      },
      {
        name: "Transactions",
        href: "/dashboard/admin/transactions",
        icon: <FaStar />,
      },
    ],
  };

  const menuItems = menuItemsByRole[user?.role] || [];

  return (
    <aside className="w-64 h-screen border border-white/5 bg-slate-900/40 backdrop-blur-xl shadow-2xl flex flex-col justify-between text-[#A3A2A0]">
      {/* TOP SECTION: BRAND LOGO & LINKS */}
      <div>
        {/* LOGO HEADER */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-white/5">
          <FaTicketAlt className="text-[#FACC15] text-xl" />
          <span className="text-white text-xl font-bold tracking-wide">
            Ticketo
          </span>
        </div>

        {/* NAVIGATION LINKS */}
        <nav className="p-4 space-y-1.5">
          {menuItems.map((item) => {
            // Check if current path matches item link to set active color scheme
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all group ${
                  isActive
                    ? "bg-[#25426B] text-[#71A1D9]"
                    : "hover:bg-white/5 hover:text-white"
                }`}
              >
                <span
                  className={`text-base ${isActive ? "text-[#71A1D9]" : "text-[#A3A2A0] group-hover:text-white"}`}
                >
                  {item.icon}
                </span>
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* BOTTOM SECTION: LOGOUT TRASH HOLDER */}
      <div className="p-4 border-t border-white/5">
        <button
          onClick={() => router.push("/")}
          className="w-full flex items-center gap-3.5 px-4 py-3 text-sm font-semibold text-[#E07171] hover:bg-red-500/5 rounded-xl transition-colors cursor-pointer group"
        >
          <FaSignOutAlt className="text-base text-[#E07171]" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
