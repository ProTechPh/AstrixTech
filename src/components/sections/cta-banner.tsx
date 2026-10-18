"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { motion, useReducedMotion } from "motion/react";

const words = [
  { text: "Have an Idea?", accent: false },
  { text: "Let's Build Something Exceptional.", accent: true },
];

export function CtaBanner() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      className="relative flex min-h-[70vh] items-center overflow-hidden py-28 sm:py-36"
      aria-labelledby="cta-heading"
    >
      {/* Ambient glow */}
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute bottom-[-240px] left-1/2 size-[680px] -translate-x-1/2 rounded-full bg-primary/14 blur-[140px] animate-glow-drift" />
        <div className="hero-grid absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_50%_45%_at_50%_50%,black_20%,transparent_70%)]" />
      </div>

      <div className="container-page relative text-center">
        <p
          id="cta-heading"
          className="sr-only"
        >
          Have an idea? Let&apos;s build something exceptional.
        </p>

        <div aria-hidden={undefined}>
          {words.map((line, lineIndex) => (
            <p
              key={line.text}
              className={lineIndex === 1 ? "mt-2 block sm:mt-3" : "block"}
            >
              {reducedMotion ? (
                <span
                  className={`font-display text-4xl leading-[1.05] font-semibold tracking-tight uppercase sm:text-6xl lg:text-7xl ${
                    line.accent ? "text-gradient-blue" : "text-gradient"
                  }`}
                >
                  {line.text}
                </span>
              ) : (
                line.text.split(" ").map((word, index) => (
                  <motion.span
                    key={word}
                    className={`inline-block font-display text-4xl leading-[1.05] font-semibold tracking-tight uppercase sm:text-6xl lg:text-7xl ${
                      line.accent ? "text-gradient-blue" : "text-gradient"
                    }`}
                    initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true, margin: "-80px 0px" }}
                    transition={{
                      duration: 0.65,
                      delay: index * 0.05 + lineIndex * 0.3,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {word}
                    {"\u00A0"}
                  </motion.span>
                ))
              )}
            </p>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px 0px" }}
          transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="mx-auto mt-7 max-w-lg text-base leading-relaxed text-muted">
            Tell us where you want to go — we&apos;ll help you determine the
            engineering path to get there.
          </p>
          <div className="mt-10">
            <Link
              href="/contact"
              className="group inline-flex h-12 items-center gap-2 border border-highlight/50 bg-primary px-8 text-xs font-semibold tracking-[0.14em] text-white uppercase shadow-[0_0_0_1px_rgba(255,255,255,0.08)_inset] transition-all duration-200 hover:bg-highlight hover:shadow-[0_0_0_1px_rgba(255,255,255,0.12)_inset] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-highlight"
            >
              Start a Conversation
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
