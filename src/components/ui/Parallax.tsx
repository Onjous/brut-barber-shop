"use client";

import { useRef, type ReactNode } from "react";
import { m, useReducedMotion, useScroll, useTransform } from "motion/react";

type Props = {
  children: ReactNode;
  className?: string;
  /** Maksymalne przesunięcie w pikselach w każdą stronę. */
  distance?: number;
};

/** Subtelna paralaksa przy przewijaniu (wyłączana przy prefers-reduced-motion). */
export function Parallax({ children, className, distance = 40 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  const reduceMotion = useReducedMotion();

  return (
    <m.div ref={ref} className={className} style={reduceMotion ? undefined : { y }}>
      {children}
    </m.div>
  );
}
