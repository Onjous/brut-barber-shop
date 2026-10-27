"use client";

import { useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { testimonials } from "@/content/reviews";
import { SectionLabel, DemoTag } from "@/components/ui/SectionLabel";
import { RevealHeading } from "@/components/ui/Reveal";
import { cn, pad } from "@/lib/utils";

export function Reviews() {
  const [index, setIndex] = useState(0);
  const current = testimonials[index];
  const go = (delta: number) =>
    setIndex((i) => (i + delta + testimonials.length) % testimonials.length);

  return (
    <section
      id="opinie"
      aria-labelledby="opinie-heading"
      className="bg-olive-deep py-24 text-bone [--focus:var(--color-bone)] md:py-36"
    >
      <div className="mx-auto grid max-w-[120rem] grid-cols-1 gap-x-10 gap-y-14 px-5 md:px-10 lg:grid-cols-12 xl:px-14">
        <div className="lg:col-span-5">
          <SectionLabel index="05" className="text-bone/90">
            Opinie
          </SectionLabel>
          <RevealHeading
            id="opinie-heading"
            lines={["Dobre cięcie.", "Dobre słowo."]}
            className="font-condensed mt-8 text-[clamp(3rem,6.4vw,7rem)] leading-[0.86]"
          />
          <p className="mt-8 flex max-w-sm items-start gap-3 text-sm leading-relaxed text-bone/90">
            <DemoTag className="mt-0.5 shrink-0" />
            Opinie przykładowe — fikcyjne treści przygotowane na potrzeby prezentacji projektu.
          </p>
        </div>

        <div className="flex flex-col lg:col-span-6 lg:col-start-7">
          <svg aria-hidden viewBox="0 0 48 40" className="mb-8 h-10 w-12 text-bone/30 md:h-14 md:w-16">
            <path fill="currentColor" d="M8 0h14l-8 40H0zM34 0h14l-8 40H26z" />
          </svg>
          <div className="grid" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <m.figure
                key={current.id}
                className="[grid-area:1/1]"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <blockquote className="text-[clamp(1.5rem,2.6vw,2.4rem)] leading-[1.25] font-medium tracking-tight text-balance">
                  {current.quote}
                </blockquote>
                <figcaption className="mt-8 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span className="font-semibold">{current.author}</span>
                  <span className="eyebrow text-bone/90">{current.service}</span>
                </figcaption>
              </m.figure>
            </AnimatePresence>
          </div>

          <div className="mt-12 flex items-center justify-between gap-6 border-t border-bone/25 pt-6">
            <div className="flex gap-2" role="group" aria-label="Wybierz opinię">
              {testimonials.map((t, i) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Opinia ${i + 1} z ${testimonials.length}`}
                  aria-pressed={i === index}
                  className="group flex h-11 items-center"
                >
                  <span
                    className={cn(
                      "block h-0.5 transition-all duration-500 ease-out-expo",
                      i === index ? "w-10 bg-bone" : "w-5 bg-bone/35 group-hover:bg-bone/70",
                    )}
                  />
                </button>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <span className="eyebrow text-bone/90">
                {pad(index + 1)} / {pad(testimonials.length)}
              </span>
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Poprzednia opinia"
                className="flex size-12 items-center justify-center border border-bone/35 transition-colors hover:bg-bone hover:text-olive-deep"
              >
                <ArrowLeft aria-hidden className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Następna opinia"
                className="flex size-12 items-center justify-center border border-bone/35 transition-colors hover:bg-bone hover:text-olive-deep"
              >
                <ArrowRight aria-hidden className="size-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
