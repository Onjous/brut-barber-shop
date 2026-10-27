"use client";

import { m } from "motion/react";
import type { ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

/** Delikatne pojawienie się elementu po wjechaniu w viewport. */
export function Reveal({ children, className, delay = 0, y = 28 }: RevealProps) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </m.div>
  );
}

type HeadingProps = {
  lines: string[];
  id?: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
  lineClassName?: string;
  delay?: number;
};

/** Kropka na końcu linii w kolorze akcentu — sygnatura typograficzna marki. */
function Accented({ text }: { text: string }) {
  if (!text.endsWith(".")) return text;
  return (
    <>
      {text.slice(0, -1)}
      <span className="text-rust">.</span>
    </>
  );
}

/** Nagłówek odsłaniany linia po linii spod maski. */
export function RevealHeading({
  lines,
  id,
  as = "h2",
  className,
  lineClassName,
  delay = 0,
}: HeadingProps) {
  const Tag = as;

  return (
    <Tag id={id} className={className}>
      <m.span
        className="block"
        initial="hidden"
        whileInView="shown"
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ staggerChildren: 0.09, delayChildren: delay }}
      >
        {lines.map((line) => (
          <span
            key={line}
            className={`-my-[0.14em] block overflow-hidden py-[0.14em] ${lineClassName ?? ""}`}
          >
            <m.span
              className="block will-change-transform"
              variants={{
                hidden: { y: "110%" },
                shown: { y: "0%", transition: { duration: 1.05, ease: EASE } },
              }}
            >
              <Accented text={line} />
            </m.span>
          </span>
        ))}
      </m.span>
    </Tag>
  );
}
