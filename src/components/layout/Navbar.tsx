"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Beranda" },
  { href: "/katalog", label: "Katalog" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 glass border-b border-border">
      <nav className="container flex h-16 items-center justify-between">
        <Link href="/" className="text-xl font-extrabold text-primary">
          Valam
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  isActive(l.href) ? "text-primary" : "text-muted-foreground"
                )}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          className="md:hidden px-3 py-1.5 text-sm font-semibold text-primary"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Tutup" : "Menu"}
        </button>
      </nav>

      {open && (
        <ul className="md:hidden border-t border-border bg-white px-6 py-3 space-y-2">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className={cn("block py-2 text-sm font-medium", isActive(l.href) ? "text-primary" : "text-muted-foreground")}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
