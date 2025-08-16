"use client";

import { useState } from "react";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon,
} from "@heroicons/react/20/solid";

export default function NavLayout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col shadow-lg">
      {/* Added shadow-md to header */}
      <header className="bg-gray-1 shadow-md">
        {/* Removed shadow-md from the nav element */}
        <nav
          aria-label="Global"
          className="mx-auto flex max-w-7xl items-center justify-abetween px-4 py-6 sm:px-6 lg:px-8"
        >
          <div className="flex lg:flex-1">
            
              <img
                alt="ClaiMe logo"
                src="/hand.png"
                className="h-8 w-auto max-w-[120px]"
              />
              <a href="#" className="text-sm font-semibold text-black mt-2">
              ClaiMe
            </a>
            
          </div>
    
          <PopoverGroup className="hidden lg:flex lg:gap-x-12">
            <a href="#" className="text-sm font-semibold text-black">
              Home
            </a>
            <a href="#" className="text-sm font-semibold text-black">
              Contact
            </a>
            <a href="#" className="text-sm font-semibold text-black">
              About
            </a>
          </PopoverGroup>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a href="#" className="text-sm font-semibold text-black">
              Log in <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </nav>
      </header>

      <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 bg-[#D6D3D1] overflow-auto min-h-[calc(100vh-64px)]">
        {children}
      </main>
    </div>
  );
}
