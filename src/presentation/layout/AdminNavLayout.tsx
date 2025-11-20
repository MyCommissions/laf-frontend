"use client";

import { useState } from "react";
import { useLogout } from "../../domain/hooks/useLogout";

const navLinks = [
  { name: "Records", href: "/admin/home" },
  { name: "Claimed", href: "/admin/claimed" },
  { name: "Account", href: "/admin/account" },
];

export default function AdminNavLayout({ children }: { children: React.ReactNode }) {
  const logout = useLogout();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <nav
          aria-label="Global"
          className="mx-auto flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8 max-w-[1400px]"
        >
          {/* Logo (NOT CLICKABLE) */}
          <div className="flex items-center gap-2 select-none">
            <div className="flex items-center gap-2 pointer-events-none">
              <img
                alt="ClaiMe logo"
                src="/hand.png"
                className="h-8 w-auto max-w-[120px]"
              />
              <span className="text-base font-bold text-gray-900">ClaiMe</span>
            </div>
          </div>

          {/* Always-visible Navigation (for tablet + desktop) */}
          <div className="flex gap-x-6 md:gap-x-10 text-sm font-medium">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-800 hover:text-gray-600 transition"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Logout button */}
          <div className="flex justify-end">
            <button
              onClick={logout}
              className="w-24 bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
            >
              Log out
            </button>
          </div>
        </nav>
      </header>

      {/* Page Content */}
      <main className="flex-1 w-full overflow-auto bg-gray-50">{children}</main>
    </div>
  );
}
