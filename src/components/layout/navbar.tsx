"use client";

import { AnimatePresence, motion } from "motion/react";
import { ChevronRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Logo } from "@/components/brand/logo";
import { isActivePath, primaryNav } from "@/config/navigation";
import { cn } from "@/lib/utils";

const menuIndex = ["01", "02", "03", "04", "05"];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Track scroll for the elevated header treatment.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the overlay menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled && !menuOpen
          ? "border-b border-white/10 bg-background/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <nav
        aria-label="Primary"
        className="container-page flex h-18 items-center justify-between py-3"
      >
        <Link
          href="/"
          className="transition-opacity hover:opacity-80"
          aria-label="AstrixTech — Home"
        >
          <Logo />
        </Link>

        {/* Desktop links — stark uppercase stack-row */}
        <ul className="hidden items-center gap-7 md:flex">
          {primaryNav.map((link) => {
            const active = isActivePath(pathname, link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative flex flex-col items-center gap-0.5 py-1 text-xs font-semibold tracking-[0.18em] uppercase transition-colors",
                    active
                      ? "text-foreground"
                      : "text-muted hover:text-foreground"
                  )}
                >
                  {link.title}
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute -bottom-0.5 inset-x-0 h-px bg-highlight"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Menu toggle — full-screen overlay on every breakpoint */}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="overlay-nav"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="inline-flex size-10 items-center justify-center border border-transparent text-foreground transition-colors hover:border-white/20 hover:bg-white/[0.04] md:hidden"
        >
          {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {/* Full-screen numbered overlay menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="overlay-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 top-0 z-50 flex flex-col bg-abyss/98 backdrop-blur-md"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-[-260px] left-1/2 size-[560px] -translate-x-1/2 rounded-full bg-primary/12 blur-[140px]"
            />

            {/* Overlay header mirrors the bar so the toggle stays in place */}
            <div className="container-page relative flex h-18 items-center justify-between py-3">
              <Logo />
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-expanded="true"
                aria-label="Close menu"
                className="inline-flex size-10 items-center justify-center border border-transparent text-foreground transition-colors hover:border-white/20 hover:bg-white/[0.04]"
              >
                <X className="size-5" />
              </button>
            </div>

            <ul className="container-page relative mt-6 flex flex-1 flex-col pb-16 sm:mt-10">
              {primaryNav.map((link, index) => {
                const active = isActivePath(pathname, link.href);
                return (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.45,
                      delay: 0.08 + index * 0.055,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      onClick={() => setMenuOpen(false)}
                      className="group flex items-baseline justify-between border-b border-white/8 py-5 sm:py-7"
                    >
                      <span className="flex items-baseline gap-5">
                        <span
                          aria-hidden="true"
                          className={cn(
                            "font-mono text-xs tracking-widest",
                            active
                              ? "text-highlight"
                              : "text-muted/60 group-hover:text-highlight"
                          )}
                        >
                          {menuIndex[index]}
                        </span>
                        <span
                          className={cn(
                            "font-display text-3xl font-medium tracking-tight uppercase transition-colors sm:text-5xl",
                            active
                              ? "text-foreground"
                              : "text-muted group-hover:text-foreground"
                          )}
                        >
                          {link.title}
                        </span>
                      </span>
                      <ChevronRight
                        aria-hidden="true"
                        className="size-5 self-center text-muted/50 transition-all group-hover:translate-x-1 group-hover:text-highlight"
                      />
                    </Link>
                  </motion.li>
                );
              })}
            </ul>

            <div className="container-page relative pb-10">
              <p className="font-mono text-[11px] tracking-[0.25em] text-muted/60 uppercase">
                Software Development &amp; Technology Solutions
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
