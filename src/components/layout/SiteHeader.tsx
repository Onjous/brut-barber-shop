"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import {
  AnimatePresence,
  m,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { bookingHref, navigation, site } from "@/content/site";
import { ButtonArrow, buttonClasses } from "@/components/ui/Button";
import { cn, pad } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;
const INERT_TARGETS = ["main", "site-footer"];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 48);
    setHidden(y > 640 && y > prev + 4);
    if (y < prev - 4) setHidden(false);
  });

  // Podświetlenie aktywnej sekcji w nawigacji
  useEffect(() => {
    const sections = navigation
      .map((item) => document.getElementById(item.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Menu mobilne: blokada przewijania, inert dla reszty strony, Escape
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    INERT_TARGETS.forEach((id) => document.getElementById(id)?.setAttribute("inert", ""));

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onResize = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      root.style.overflow = "";
      INERT_TARGETS.forEach((id) => document.getElementById(id)?.removeAttribute("inert"));
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const navigateFromMenu = (e: MouseEvent<HTMLAnchorElement>) => {
    const hash = new URL(e.currentTarget.href).hash;
    const target = hash ? document.getElementById(hash.slice(1)) : null;
    setOpen(false);
    // Poza stroną główną zostawiamy zwykłą nawigację do /#sekcja
    if (!target) return;
    e.preventDefault();
    requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
      history.pushState(null, "", hash);
    });
  };

  const light = !scrolled || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[transform,background-color,color,border-color] duration-500 ease-out-expo",
        // Bez klasy translate w stanie spoczynku: każda wartość `translate`
        // tworzy containing block i rozjechałaby fixed overlay menu.
        hidden && !open && "-translate-y-full",
        light ? "text-bone" : "text-ink",
        scrolled && !open
          ? "border-b border-ink/10 bg-bone"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <a
        href="#main"
        className="eyebrow sr-only z-10 bg-bone px-4 py-3 text-ink focus:not-sr-only focus:absolute focus:top-2 focus:left-2"
      >
        Przejdź do treści
      </a>

      <div className="mx-auto flex h-(--header-h) max-w-[120rem] items-center gap-4 px-5 sm:gap-6 md:px-10 xl:px-14">
        <Link
          href="/#top"
          className="flex items-baseline gap-3"
          aria-label={`${site.fullName} — początek strony`}
        >
          <span className="font-condensed text-[2rem] leading-none tracking-tight">
            Brut<span className="text-rust">.</span>
          </span>
          <span className="eyebrow hidden opacity-70 sm:inline">Barber Studio</span>
        </Link>

        <nav aria-label="Główna" className="ml-auto hidden lg:block">
          <ul className="flex items-center gap-8">
            {navigation.map((item, i) => (
              <li key={item.href}>
                <Link
                  href={`/${item.href}`}
                  aria-current={active === item.href ? "true" : undefined}
                  className="group relative flex items-start gap-1.5 py-2 text-[0.95rem] font-medium"
                >
                  <span className="font-mono text-[0.625rem] opacity-50">{pad(i + 1)}</span>
                  <span className="relative">
                    {item.label}
                    <span
                      aria-hidden
                      className={cn(
                        "absolute -bottom-1 left-0 h-px w-full origin-left bg-current transition-transform duration-500 ease-out-expo",
                        active === item.href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                      )}
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link
          href={`/${bookingHref}`}
          className={buttonClasses(
            light ? "light" : "dark",
            "ml-auto min-h-10 gap-3 px-4 py-2 text-sm whitespace-nowrap lg:ml-2",
          )}
        >
          <span>Umów wizytę</span>
          <span className="hidden sm:inline-flex">
            <ButtonArrow />
          </span>
        </Link>

        <button
          ref={toggleRef}
          type="button"
          className="-mr-2 flex min-h-11 items-center gap-2.5 px-2 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="eyebrow">{open ? "Zamknij" : "Menu"}</span>
          <span aria-hidden className="relative block h-3 w-6">
            <span
              className={cn(
                "absolute left-0 h-[1.5px] w-full bg-current transition-transform duration-500 ease-out-expo",
                open ? "top-1/2 rotate-45" : "top-0",
              )}
            />
            <span
              className={cn(
                "absolute left-0 h-[1.5px] w-full bg-current transition-transform duration-500 ease-out-expo",
                open ? "top-1/2 -rotate-45" : "top-full",
              )}
            />
          </span>
          <span className="sr-only">nawigacji</span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-menu"
            className="fixed inset-0 -z-10 flex flex-col bg-ink text-bone lg:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <nav
              aria-label="Menu mobilne"
              className="flex flex-1 flex-col justify-center overflow-y-auto px-5 pt-(--header-h) md:px-10"
            >
              <ul className="space-y-1">
                {navigation.map((item, i) => (
                  <li key={item.href} className="overflow-hidden">
                    <m.div
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.8, ease: EASE, delay: 0.15 + i * 0.06 }}
                    >
                      <Link
                        href={`/${item.href}`}
                        onClick={navigateFromMenu}
                        className="flex items-start gap-4 py-1.5"
                      >
                        <span className="mt-2 font-mono text-xs text-stone">{pad(i + 1)}</span>
                        <span className="font-condensed text-[clamp(3rem,15vw,5.5rem)] leading-[0.95]">
                          {item.label}
                        </span>
                      </Link>
                    </m.div>
                  </li>
                ))}
              </ul>
            </nav>

            <m.div
              className="grid gap-6 border-t border-bone/15 px-5 py-6 md:px-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <Link
                href={`/${bookingHref}`}
                onClick={navigateFromMenu}
                className={buttonClasses("light", "w-full")}
              >
                <span>Zarezerwuj termin</span>
                <ButtonArrow />
              </Link>
              <div className="flex flex-wrap justify-between gap-x-6 gap-y-2 text-sm text-stone">
                <span>
                  {site.hours[0].short} {site.hours[0].open}–{site.hours[0].close}
                </span>
                <span>{site.address.city} · adres demonstracyjny</span>
              </div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
