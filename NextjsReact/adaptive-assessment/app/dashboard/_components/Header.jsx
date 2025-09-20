"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

function Header() {
  const pathname = usePathname();
  const { user } = useUser();

  if (pathname.includes("/assessment")) return null;

  const role = user?.publicMetadata?.role;

  const navLinks = role === "teacher"
    ? [
        { href: "/dashboard/teacher", label: "Dashboard" },
        { href: "/modules/teacher", label: "Manage Modules" },
        { href: "/maintest/teacher", label: "Assessment Reports" },
      ]
    : [
        { href: "/dashboard/student", label: "Dashboard" },
        { href: "/modules/student", label: "Modules" },
        { href: "/maintest/student", label: "Assessments" },
      ];

  return (
    <div className="relative flex items-center justify-between px-8 py-4 shadow-md text-white"
      style={{
      background: "linear-gradient(to bottom, #a6c1ee 0%, #c1f0f6 100%)",
    }}
    >
      {/* Logo + Title */}
      <div className="relative z-10 flex items-center gap-3">
        <Image src="/logo.png" alt="Ability Nest Logo" width={50} height={50} />
        <h1 className="text-2xl font-bold tracking-wide text-white">Ability Nest</h1>
      </div>

      {/* Navigation Links */}
      <ul className="relative z-10 flex gap-8 text-lg">
        {navLinks.map((link) => (
          <li key={link.href} className="relative group">
            <Link
              href={link.href}
              className={`transition-colors duration-300 ${
              pathname === link.href
                ? "text-purple-700 font-semibold" // highlighted page
                : "text-gray-900 hover:text-purple-600" // normal page
              }`}
            >
              {link.label}
            </Link>
            <div
              className={`absolute left-0 w-full h-1 bg-white/70 transition-transform duration-300 ${
                pathname === link.href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
              }`}
            ></div>
          </li>
        ))}
      </ul>

      {/* User Profile & Logout */}
      <div className="relative z-10">
        <UserButton afterSignOutUrl="/dashboard" />
      </div>
    </div>
  );
}

export default Header;

