"use client";

import Image from "next/image";
import { useRef } from "react";
import { m, useReducedMotion, useScroll, useTransform } from "motion/react";
import heroImage from "@/assets/images/hero-razor-shave.jpg";

export function HeroMedia() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const reduceMotion = useReducedMotion();

  return (
    <div ref={ref} aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
      <m.div className="absolute inset-0" style={reduceMotion ? undefined : { y }}>
        <div className="anim-zoom absolute inset-0">
          <Image
            src={heroImage}
            alt=""
            fill
            preload
            placeholder="blur"
            sizes="100vw"
            className="object-cover object-[44%_22%] brightness-[0.82] contrast-[1.06] saturate-[0.78] md:object-[50%_30%]"
          />
        </div>
      </m.div>
      <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/55 to-ink/10" />
      <div className="absolute inset-0 bg-linear-to-r from-ink/70 via-transparent to-transparent" />
      <div className="grain absolute inset-0 opacity-[0.18]" />
    </div>
  );
}
