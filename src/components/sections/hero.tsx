"use client";

import type { ComponentType } from "react";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * Full-bleed diagonal panel hero — inspired by cinematic studio sites
 * where the entire viewport is a composition of skewed art columns.
 * Instead of game key art, each column carries an abstract engineering
 * motif rendered with grids, wireframes, rings and node graphs.
 */

const SKEW = 12; // vw, horizontal offset between a panel's top and bottom edge
const BOUNDS = [-20, 0, 20, 40, 60, 80, 100];

const SIDE_PANELS = [
  { href: "/about", tag: "Who We Are", index: "00" },
  { href: "/services#web-development", tag: "Web", index: "01" },
  { href: "/services#mobile-app-development", tag: "Mobile", index: "02" },
  { href: "/services#cloud-infrastructure", tag: "Cloud & Infra", index: "03" },
  { href: "/services#ui-ux-design", tag: "UI/UX", index: "04" },
];

const clipFor = (b0: number, b1: number) =>
  `polygon(${b0 + SKEW}% 0%, ${b1 + SKEW}% 0%, ${b1}% 100%, ${b0}% 100%)`;

/* ---------------------------------- art ---------------------------------- */
/* Every art component is sized against a panel-scoped canvas (a strip about
   (panel width + SKEW)vw wide and the hero's full height), NOT the viewport. */

function ColumnArt() {
  return (
    <>
      <div
        aria-hidden="true"
        className="absolute inset-0 [background-image:repeating-linear-gradient(90deg,rgba(148,163,184,0.12)_0px,rgba(148,163,184,0.12)_1px,transparent_1px,transparent_44px)]"
      />
      <svg
        aria-hidden="true"
        viewBox="0 0 340 900"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 size-full"
      >
        <rect x="144" y="330" width="52" height="220" fill="none" stroke="#54B7FF" strokeOpacity="0.28" />
        <rect x="128" y="296" width="84" height="14" fill="none" stroke="#54B7FF" strokeOpacity="0.2" />
        <line x1="170" y1="310" x2="170" y2="330" stroke="#54B7FF" strokeOpacity="0.3" />
        <line x1="170" y1="550" x2="170" y2="584" stroke="#54B7FF" strokeOpacity="0.2" />
        <line x1="70" y1="330" x2="270" y2="330" stroke="#94A3B8" strokeOpacity="0.13" />
        <line x1="70" y1="550" x2="270" y2="550" stroke="#94A3B8" strokeOpacity="0.13" />
      </svg>
    </>
  );
}

function GridArt() {
  return (
    <>
      <div className="hero-grid absolute inset-0 opacity-70" />
      <div
        aria-hidden="true"
        className="absolute top-[66%] inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
      />
    </>
  );
}

function PhoneArt() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 200 400"
      preserveAspectRatio="xMidYMid meet"
      className="absolute inset-0 size-full"
    >
      <rect x="66" y="34" width="68" height="332" rx="12" fill="none" stroke="#94A3B8" strokeOpacity="0.3" />
      <rect x="78" y="70" width="44" height="260" fill="none" stroke="#54B7FF" strokeOpacity="0.3" />
      <path d="M100 70 V330" stroke="#146BFF" strokeOpacity="0.22" />
      <path d="M78 200 H122" stroke="#146BFF" strokeOpacity="0.22" />
      <circle cx="100" cy="52" r="3" fill="#54B7FF" fillOpacity="0.5" />
      <line x1="30" y1="66" x2="66" y2="66" stroke="#94A3B8" strokeOpacity="0.15" />
      <line x1="134" y1="334" x2="170" y2="334" stroke="#94A3B8" strokeOpacity="0.15" />
    </svg>
  );
}

function CoreArt() {
  return (
    <>
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 size-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-[120px] animate-glow-drift"
      />
      <svg
        aria-hidden="true"
        viewBox="0 0 340 900"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 size-full"
      >
        <g transform="translate(170 430)">
          <circle r="24" fill="none" stroke="#146BFF" strokeOpacity="0.5" />
          <circle r="58" fill="none" stroke="#146BFF" strokeOpacity="0.35" />
          <circle r="92" fill="none" stroke="#54B7FF" strokeOpacity="0.16" strokeDasharray="3 10" />
          <circle r="130" fill="none" stroke="#54B7FF" strokeOpacity="0.22" strokeDasharray="56 360" />
          <ellipse rx="120" ry="34" fill="none" stroke="#54B7FF" strokeOpacity="0.38" transform="rotate(-18)" />
          <path
            d="M0 -52 C3 -20 15 -6 46 0 C15 6 3 20 0 52 C-3 20 -15 6 -46 0 C-15 -6 -3 -20 0 -52 Z"
            fill="#54B7FF"
            fillOpacity="0.75"
          />
          <path
            d="M96 74 C98 86 103 91 115 93 C103 95 98 100 96 112 C94 100 89 95 77 93 C89 91 94 86 96 74 Z"
            fill="#F8FAFC"
            fillOpacity="0.55"
          />
        </g>
      </svg>
    </>
  );
}

function NodeArt() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 340 900"
      preserveAspectRatio="xMidYMid meet"
      className="absolute inset-0 size-full"
    >
      <g stroke="#94A3B8" strokeOpacity="0.16">
        <line x1="86" y1="320" x2="170" y2="230" />
        <line x1="170" y1="230" x2="256" y2="290" />
        <line x1="86" y1="320" x2="112" y2="520" />
        <line x1="112" y1="520" x2="232" y2="560" />
        <line x1="232" y1="560" x2="256" y2="290" />
        <line x1="170" y1="230" x2="112" y2="520" />
      </g>
      {[
        [86, 320],
        [170, 230],
        [256, 290],
        [112, 520],
        [232, 560],
      ].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="5" fill="#146BFF" fillOpacity="0.5" />
      ))}
    </svg>
  );
}

function DotArt() {
  return (
    <>
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-60 [background-image:radial-gradient(circle,rgba(148,163,184,0.2)_1px,transparent_1px)] [background-size:20px_20px]"
      />
      <svg
        aria-hidden="true"
        viewBox="0 0 340 900"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 size-full"
      >
        <path d="M70 560 A170 170 0 0 1 196 372" fill="none" stroke="#54B7FF" strokeOpacity="0.3" />
        <path d="M120 560 A120 120 0 0 1 196 446" fill="none" stroke="#54B7FF" strokeOpacity="0.2" />
        <rect x="196" y="372" width="66" height="66" fill="none" stroke="#146BFF" strokeOpacity="0.35" />
        <line x1="70" y1="560" x2="262" y2="560" stroke="#94A3B8" strokeOpacity="0.18" />
      </svg>
    </>
  );
}

const ARTS = [ColumnArt, GridArt, PhoneArt, CoreArt, NodeArt, DotArt];

/* --------------------------------- hero ---------------------------------- */

const headlineWords = ["Building", "the", "Future", "Through", "Technology."];

export function Hero() {
  const reducedMotion = useReducedMotion();
  const [p0, p1, p2, p3, p4, p5, p6] = BOUNDS;

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative min-h-[100svh] overflow-hidden bg-abyss"
    >
      {/* Low ambient light behind everything */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [background:radial-gradient(120%_80%_at_50%_110%,rgba(20,107,255,0.10),transparent_55%)]"
      />

      {/* Diagonal art columns */}
      {SIDE_PANELS.slice(0, 3).map((panel, i) => (
        <PanelColumn
          key={panel.href}
          href={panel.href}
          tag={`${panel.index} — ${panel.tag}`}
          b0={[p0, p1, p2][i]}
          b1={[p1, p2, p3][i]}
          Art={ARTS[i]}
          reducedMotion={reducedMotion}
          entranceIndex={i}
          side
        />
      ))}

      <PanelColumn
        href="/services"
        b0={p3}
        b1={p4}
        Art={ARTS[3]}
        reducedMotion={reducedMotion}
        entranceIndex={3}
        active
      />

      {SIDE_PANELS.slice(3).map((panel, i) => (
        <PanelColumn
          key={panel.href}
          href={panel.href}
          tag={`${panel.index} — ${panel.tag}`}
          b0={[p4, p5][i]}
          b1={[p5, p6][i]}
          Art={ARTS[i + 4]}
          reducedMotion={reducedMotion}
          entranceIndex={i + 4}
          side
        />
      ))}

      {/* Content above the panels */}
      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center">
        <h1
          id="hero-heading"
          className="max-w-3xl font-display text-4xl leading-[1.04] font-semibold uppercase text-balance sm:text-6xl lg:text-7xl xl:text-8xl"
        >
          {reducedMotion ? (
            <span className="text-gradient">{headlineWords.join(" ")}</span>
          ) : (
            headlineWords.map((word, index) => (
              <motion.span
                key={word}
                className="text-gradient inline-block"
                initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.7,
                  delay: 0.25 + index * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {word}
                {index < headlineWords.length - 1 ? "\u00A0" : ""}
              </motion.span>
            ))
          )}
        </h1>

        <motion.p
          className="mt-7 max-w-xl text-sm leading-relaxed text-muted sm:text-base"
          initial={reducedMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          AstrixTech delivers innovative software solutions, modern digital
          experiences, and scalable technology designed for tomorrow.
        </motion.p>

        <motion.div
          className="pointer-events-auto mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          initial={reducedMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link href="/services" className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto")}>
            Explore Our Services
          </Link>
          <Link
            href="/contact"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full sm:w-auto")}
          >
            Contact Us
          </Link>
        </motion.div>
      </div>

      {/* Bottom utility strip */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex items-end justify-between gap-6 p-5 sm:p-8"
        initial={reducedMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.3 }}
      >
        {/* Press-release-style corner block */}
        <div className="flex max-w-[70vw] flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
          <time
            dateTime="2026-10-18"
            className="w-fit border border-white/15 bg-abyss/80 px-2 py-1 font-mono text-[10px] tracking-[0.2em] text-highlight"
          >
            2026.10.18
          </time>
          <p className="font-mono text-[10px] tracking-[0.25em] text-muted uppercase sm:text-[11px]">
            Engineering Tomorrow&apos;s Digital Experiences.
          </p>
        </div>

        {/* Site + linked destinations */}
        <nav
          aria-label="Utility"
          className="pointer-events-auto hidden items-center divide-x divide-white/15 font-mono text-[10px] tracking-[0.2em] text-muted/80 uppercase md:flex"
        >
          <Link href="/privacy" className="px-3 transition-colors hover:text-highlight">
            Privacy Policy
          </Link>
          <Link href="/terms" className="px-3 transition-colors hover:text-highlight">
            Terms
          </Link>
          {site.links.github && (
            <a
              href={site.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 transition-colors hover:text-highlight"
            >
              GitHub
            </a>
          )}
          {site.links.linkedin && (
            <a
              href={site.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="pl-3 transition-colors hover:text-highlight"
            >
              LinkedIn
            </a>
          )}
        </nav>
      </motion.div>

      {/* Bottom fade into the page */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-abyss to-transparent"
      />
    </section>
  );
}

/* ------------------------------ panel column ------------------------------ */

type PanelColumnProps = {
  href: string;
  b0: number;
  b1: number;
  Art: ComponentType;
  tag?: string;
  active?: boolean;
  side?: boolean;
  reducedMotion: boolean | null;
  entranceIndex: number;
};

function PanelColumn({
  href,
  b0,
  b1,
  Art,
  tag,
  active,
  side,
  reducedMotion,
  entranceIndex,
}: PanelColumnProps) {
  const centerX = (b0 + b1) / 2;
  const clickable = Boolean(tag); // side panels are navigable; the active one sits behind content

  const scene = (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 transition-[opacity,filter] duration-500",
        side && "opacity-50 grayscale-[0.6] group-hover:opacity-90 group-hover:grayscale-0",
      )}
    >
      <div
        className={cn(
          "absolute inset-0 bg-abyss/60",
          side && "transition-colors duration-500 group-hover:bg-abyss/30",
        )}
      />
      {/* Panel-scoped art canvas — spans exactly this column's skewed footprint,
          so artwork scales with the panel instead of the viewport. */}
      <div
        className="absolute top-0 bottom-0 max-w-none"
        style={{
          left: `${centerX + SKEW / 2}%`,
          width: `${b1 - b0 + SKEW}vw`,
          transform: "translateX(-50%)",
        }}
      >
        <Art />
      </div>
      {active && (
        <div className="absolute inset-0 bg-gradient-to-t from-abyss/85 via-transparent to-abyss/40" />
      )}
    </div>
  );

  const label = tag && (
    <span
      aria-hidden="true"
      className="absolute bottom-[92px] hidden -translate-x-1/2 font-mono text-[10px] tracking-[0.3em] whitespace-nowrap text-white/45 uppercase transition-colors group-hover:text-highlight md:block"
      style={{ left: `${centerX}%` }}
    >
      {tag}
    </span>
  );

  return (
    <motion.div
      className="absolute inset-0"
      style={{ clipPath: clipFor(b0, b1) }}
      initial={reducedMotion ? false : { opacity: 0, x: -48 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9, delay: entranceIndex * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      {clickable ? (
        <Link
          href={href}
          aria-label={tag}
          className="group absolute inset-0 focus-visible:outline-2 focus-visible:outline-highlight"
        >
          {scene}
          {label}
        </Link>
      ) : (
        scene
      )}
    </motion.div>
  );
}
