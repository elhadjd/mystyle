"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { brand, navLinks } from "@/lib/data";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isHome = pathname === "/";
  const lightNav = isHome && !scrolled && !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open || !isHome
          ? "bg-[rgba(247,239,232,0.92)] backdrop-blur-md border-b border-[var(--line)]"
          : "bg-transparent"
      }`}
    >
      <div className="container-page flex h-[4.5rem] items-center justify-between gap-4">
        <Link
          href="/"
          onClick={closeMenu}
          className="relative z-10 flex items-center gap-2.5"
          aria-label="MyStyle home"
        >
          <Image
            src="/logo/mystyle.svg"
            alt="MyStyle"
            width={150}
            height={40}
            className={`h-9 w-auto transition ${lightNav ? "brightness-0 invert" : ""}`}
            priority
          />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium tracking-wide transition-colors ${
                  lightNav
                    ? active
                      ? "text-copper-soft"
                      : "text-cream/85 hover:text-cream"
                    : active
                      ? "text-copper"
                      : "text-espresso/80 hover:text-espresso"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={`tel:${brand.phoneTel}`}
            className={`text-sm ${lightNav ? "text-cream/75" : "text-muted"}`}
          >
            {brand.phone}
          </a>
          <Link href="/book" className={lightNav ? "btn btn-copper" : "btn btn-primary"}>
            Book
          </Link>
        </div>

        <button
          type="button"
          className="relative z-10 flex h-11 w-11 flex-col items-center justify-center gap-1.5 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`block h-0.5 w-6 transition ${
              lightNav ? "bg-cream" : "bg-espresso"
            } ${open ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`block h-0.5 w-6 transition ${
              lightNav ? "bg-cream" : "bg-espresso"
            } ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-0.5 w-6 transition ${
              lightNav ? "bg-cream" : "bg-espresso"
            } ${open ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </div>

      <div
        id="mobile-menu"
        className={`border-t border-[var(--line)] bg-[rgba(247,239,232,0.98)] lg:hidden ${
          open ? "block" : "hidden"
        }`}
      >
        <nav className="container-page flex flex-col gap-1 py-4" aria-label="Mobile">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className="py-3 text-base font-medium text-espresso"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/book" onClick={closeMenu} className="btn btn-primary mt-2 w-full">
            Book an appointment
          </Link>
        </nav>
      </div>
    </header>
  );
}
