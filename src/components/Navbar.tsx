"use client";

import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-[clamp(1.5rem,5vw,5rem)] py-[clamp(1.25rem,2vw,2rem)]">
        <Link href="#home" className="flex flex-col items-center leading-none min-h-[44px] min-w-[44px] justify-center">
          <Image
            src="/Advaitam-Logo.png"
            alt="Advaitam Logo"
            width={160}
            height={48}
            className="h-6 w-auto object-contain sm:h-7 lg:h-8"
            priority
            fetchPriority="high"
          />
          <span className="mt-1 hidden text-[7px] tracking-[0.35em] text-[#E0E0E0] sm:block">
            - BUILDING DESTINATIONS -
          </span>
        </Link>

        <div className="hidden items-center gap-5 lg:flex">
          <Link
            href="#contact"
            className="flex items-center justify-center min-h-[44px] px-6 border border-white/50 text-[11px] font-medium tracking-[0.12em] text-white hover:border-white hover:bg-white/10 transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] transform-gpu will-change-transform"
          >
            BOOK A SITE VISIT
          </Link>
          <Link
            href="#partner"
            className="flex items-center justify-center min-h-[44px] px-6 border border-white/50 text-[11px] font-medium tracking-[0.12em] text-white hover:border-white hover:bg-white/10 transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] transform-gpu will-change-transform"
          >
            BECOME OUR PARTNER
          </Link>
        </div>

      </nav>
    </header>
  );
}
