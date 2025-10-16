"use client";

import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const navLinks = [
  { name: "Records", href: "/admin/home" },
  // { name: "Lost", href: "/lost" },
  // { name: "Found", href: "/found" },
  { name: "Claimed", href: "/claimed" },
  { name: "Account", href: "/account" },
];

export default function AdminNavLayout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <nav
          aria-label="Global"
          className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8"
        >
          {/* Logo */}
          <div className="flex lg:flex-1 items-center gap-2">
            <a href="/home" className="flex items-center gap-2">
              <img
                alt="ClaiMe logo"
                src="/hand.png"
                className="h-8 w-auto max-w-[120px]"
              />
              <span className="text-base font-bold text-gray-900">ClaiMe</span>
            </a>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex lg:gap-x-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-gray-800 hover:text-gray-600 transition"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Right Side (Desktop) log out button */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <button className="w-24 bg-black text-white py-2 rounded-md hover:bg-gray-800 transition">
              Log out
            </button>
          </div>

          {/* Mobile Menu Button */}
          {/* <div className="flex lg:hidden">
            <button
              type="button"
              className="p-2 text-gray-700 hover:text-gray-900"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div> */}
        </nav>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white px-4 py-3">
            <div className="space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="/signin"
                className="block rounded-md px-3 py-2 text-base font-semibold text-indigo-600 hover:bg-indigo-50"
              >
                Log out
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Page Content */}
      <main className="flex-1 w-full overflow-auto bg-gray-50">{children}</main>
    </div>
  );
}
