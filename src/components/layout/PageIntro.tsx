import type { ReactNode } from "react";

/** Ciemny nagłówek podstron — tło pod przezroczystą nawigacją. */
export function PageIntro({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <div className="bg-ink text-bone">
      <div className="mx-auto max-w-[120rem] px-5 pt-[calc(var(--header-h)+4rem)] pb-14 md:px-10 md:pb-20 xl:px-14">
        <p className="eyebrow text-stone">{eyebrow}</p>
        <h1 className="font-condensed mt-6 text-[clamp(3rem,8vw,8rem)] leading-[0.86]">
          {title}
          <span className="text-rust">.</span>
        </h1>
        {children}
      </div>
    </div>
  );
}
