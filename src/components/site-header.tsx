"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const destinations = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  return <header className="site-header route-header">
    <Link href="/" className="wordmark" aria-label="Noel Biju, home"><span className="brand-dot" aria-hidden="true" />Noel Biju</Link>
    <nav aria-label="Main navigation">{destinations.map(item => {
      const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
      return <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined}>{item.label}</Link>;
    })}</nav>
  </header>;
}
