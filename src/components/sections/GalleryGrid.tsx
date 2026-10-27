"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type KeyboardEvent, type TouchEvent } from "react";
import { AnimatePresence, m } from "motion/react";
import { ArrowLeft, ArrowRight, Plus, X } from "lucide-react";
import type { GalleryItem } from "@/content/types";
import { cn, pad } from "@/lib/utils";

/**
 * Układ siatki: mobile = 2 kolumny, od md = 12 kolumn × 6 rzędów.
 * Indeksy odpowiadają kolejności w `content/gallery.ts`.
 */
const LAYOUT = [
  "col-span-2 md:col-start-1 md:col-end-8 md:row-start-1 md:row-end-3",
  "row-span-2 md:col-start-8 md:col-end-13 md:row-start-1 md:row-end-4",
  "md:col-start-1 md:col-end-5 md:row-start-3 md:row-end-5",
  "md:col-start-5 md:col-end-8 md:row-start-3 md:row-end-4",
  "row-span-2 md:col-start-8 md:col-end-13 md:row-start-4 md:row-end-7",
  "md:col-start-5 md:col-end-8 md:row-start-4 md:row-end-5",
  "md:col-start-1 md:col-end-5 md:row-start-5 md:row-end-7",
  "col-span-2 md:col-start-5 md:col-end-8 md:row-start-5 md:row-end-7",
];

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const touchX = useRef<number | null>(null);
  const [index, setIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    if (index === null) return;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [index]);

  const open = (i: number) => {
    setIndex(i);
    dialogRef.current?.showModal();
  };

  const step = (delta: number) => {
    setDirection(delta);
    setIndex((i) => (i === null ? i : (i + delta + items.length) % items.length));
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDialogElement>) => {
    if (e.key === "ArrowRight") step(1);
    if (e.key === "ArrowLeft") step(-1);
  };

  const onTouchStart = (e: TouchEvent) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
    touchX.current = null;
  };

  const current = index === null ? null : items[index];

  return (
    <>
      <ul className="grid auto-rows-[46vw] grid-cols-2 gap-2 md:auto-rows-[clamp(7rem,12.5vw,15rem)] md:grid-cols-12 md:gap-3 lg:gap-4">
        {items.map((item, i) => (
          <li key={item.id} className={cn("relative", LAYOUT[i])}>
            <button
              type="button"
              onClick={() => open(i)}
              className="group absolute inset-0 overflow-hidden bg-ink text-left text-bone"
              aria-label={`Powiększ zdjęcie: ${item.caption}`}
            >
              <Image
                src={item.image.src}
                alt={item.image.alt}
                fill
                placeholder="blur"
                sizes="(min-width: 768px) 45vw, 50vw"
                className="object-cover saturate-[0.85] transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.05] group-focus-visible:scale-[1.05]"
                style={{ objectPosition: item.image.focus }}
              />
              <span className="absolute inset-0 bg-linear-to-t from-ink/85 via-ink/0 via-45% to-ink/0 opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
              <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-3 md:p-5">
                <span className="min-w-0">
                  <span className="eyebrow block text-[0.625rem] md:text-xs">{item.category}</span>
                  <span className="mt-1 hidden translate-y-2 text-sm font-medium opacity-0 transition-all duration-500 ease-out-expo group-hover:translate-y-0 group-hover:opacity-100 md:block">
                    {item.caption}
                  </span>
                </span>
                <span className="flex size-8 shrink-0 items-center justify-center border border-bone/40 transition-colors duration-300 group-hover:border-bone group-hover:bg-bone group-hover:text-ink md:size-10">
                  <Plus aria-hidden className="size-4" />
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-label="Podgląd zdjęcia z galerii"
        onClose={() => setIndex(null)}
        onKeyDown={onKeyDown}
        onClick={(e) => e.target === e.currentTarget && dialogRef.current?.close()}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-ink/[0.97] p-0 text-bone open:flex open:flex-col"
      >
        <div className="flex items-center justify-between px-5 py-4 md:px-10">
          <p className="eyebrow text-stone" aria-live="polite">
            {index !== null && `${pad(index + 1)} / ${pad(items.length)}`}
          </p>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            className="flex min-h-11 items-center gap-2 px-2 eyebrow hover:text-rust"
          >
            Zamknij <X aria-hidden className="size-5" />
          </button>
        </div>

        <div className="relative flex-1">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            {current && (
              <m.figure
                key={current.id}
                custom={direction}
                className="absolute inset-0 flex flex-col px-5 md:px-24"
                initial={{ opacity: 0, x: direction * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -40 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => e.target === e.currentTarget && dialogRef.current?.close()}
              >
                <div className="relative flex-1">
                  <Image
                    src={current.image.src}
                    alt={current.image.alt}
                    fill
                    sizes="100vw"
                    className="object-contain"
                  />
                </div>
                <figcaption className="mx-auto py-4 text-center">
                  <span className="eyebrow block text-stone">{current.category}</span>
                  <span className="mt-1 block font-medium">{current.caption}</span>
                </figcaption>
              </m.figure>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center gap-3 pb-6 md:pb-8">
          <button
            type="button"
            onClick={() => step(-1)}
            className="flex size-12 items-center justify-center border border-bone/30 transition-colors hover:bg-bone hover:text-ink"
            aria-label="Poprzednie zdjęcie"
          >
            <ArrowLeft aria-hidden className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            className="flex size-12 items-center justify-center border border-bone/30 transition-colors hover:bg-bone hover:text-ink"
            aria-label="Następne zdjęcie"
          >
            <ArrowRight aria-hidden className="size-5" />
          </button>
        </div>
      </dialog>
    </>
  );
}
