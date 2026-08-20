"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

const LINKS = [
  { label: "HOME", href: "#home" },
  { label: "ABOUT US", href: "#about" },
  { label: "PROJECTS", href: "#projects" },
  { label: "WHY ADVAITAM", href: "#why" },
  { label: "DESTINATION", href: "#destination" },
  { label: "CONTACT", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 sm:px-10">
        <a href="#home" className="flex flex-col leading-none">
          <span className="font-display text-2xl tracking-[0.18em] text-ivory">
            ADVAITAM
          </span>
          <span className="mt-1 hidden text-[8px] tracking-[0.32em] text-ivory/60 sm:block">
            BUILDING DESTINATIONS
          </span>
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`text-[12px] font-medium tracking-[0.08em] hover:text-brass-soft relative ${
                  link.label === "HOME"
                    ? "text-ivory after:absolute after:-bottom-1 after:left-0 after:h-[1px] after:w-full after:bg-ivory"
                    : "text-ivory/90"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href="#contact"
            className="border border-ivory/40 px-5 py-2.5 text-[11px] font-semibold tracking-[0.1em] text-ivory hover:border-brass hover:bg-brass hover:text-ink transition-colors"
          >
            BOOK A SITE VISIT
          </a>
          <button
            type="button"
            aria-label="Menu"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-ivory/40 text-ivory hover:border-brass hover:text-brass"
          >
            <Menu size={16} />
          </button>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center rounded-full text-ivory lg:hidden"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {open && (
        <div className="fixed inset-0 top-0 z-40 flex flex-col bg-ink px-8 pt-28 lg:hidden">
          <ul className="flex flex-col gap-6">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="font-display text-3xl italic text-ivory"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-10 w-fit border border-brass px-6 py-3 text-[12px] font-semibold tracking-[0.1em] text-ivory transition-colors"
          >
            BOOK A SITE VISIT
          </a>
        </div>
      )}
    </header>
  );
}
