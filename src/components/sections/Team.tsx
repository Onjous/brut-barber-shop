import Image from "next/image";
import { team } from "@/content/team";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal, RevealHeading } from "@/components/ui/Reveal";
import { cn, pad } from "@/lib/utils";

const OFFSETS = ["", "md:mt-28", "md:mt-14"];

export function Team() {
  return (
    <section
      id="zespol"
      aria-labelledby="zespol-heading"
      className="overflow-hidden bg-bone py-24 md:py-36"
    >
      <div className="mx-auto max-w-[120rem] px-5 md:px-10 xl:px-14">
        <div className="grid gap-x-10 gap-y-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <SectionLabel index="03" className="text-olive-deep">
              Zespół
            </SectionLabel>
            <RevealHeading
              id="zespol-heading"
              lines={["Ludzie, którzy", "znają się", "na swoim fachu."]}
              className="font-condensed mt-8 text-[clamp(2.9rem,6.4vw,7rem)] leading-[0.86]"
            />
          </div>
          <Reveal className="lg:col-span-4 lg:pb-3">
            <p className="max-w-sm leading-relaxed text-stone-deep">
              Trzech barberów, trzy różne charaktery i jedna zasada: robimy to porządnie albo
              wcale. Wybierz konkretną osobę przy rezerwacji albo zdaj się na pierwszy wolny
              fotel.
            </p>
          </Reveal>
        </div>

        <div
          role="region"
          aria-label="Zespół BRUT — przewijana lista"
          tabIndex={0}
          className="no-scrollbar -mx-5 mt-14 snap-x snap-mandatory overflow-x-auto scroll-px-5 px-5 md:mx-0 md:mt-20 md:overflow-visible md:px-0"
        >
          <ul className="flex gap-4 md:grid md:grid-cols-3 md:gap-6 lg:gap-10">
            {team.map((barber, i) => (
              <li
                key={barber.slug}
                className={cn("w-[78%] shrink-0 snap-start sm:w-[46%] md:w-auto", OFFSETS[i])}
              >
                <Reveal delay={i * 0.08}>
                  <article className="group">
                    <div className="relative aspect-[4/5] overflow-hidden bg-ink">
                      <Image
                        src={barber.portrait.src}
                        alt={barber.portrait.alt}
                        fill
                        placeholder="blur"
                        sizes="(min-width: 768px) 30vw, 78vw"
                        className="object-cover grayscale-[0.92] sepia-[0.12] contrast-[1.05] transition-[transform,filter] duration-[1.2s] ease-out-expo group-hover:scale-[1.04] group-hover:grayscale-[0.6]"
                        style={{ objectPosition: barber.portrait.focus }}
                      />
                      <span className="eyebrow absolute top-0 left-0 bg-ink px-2.5 py-1.5 text-[0.625rem] text-bone">
                        {pad(i + 1)} / {pad(team.length)}
                      </span>
                    </div>
                    <h3 className="font-condensed mt-6 text-[clamp(3rem,5vw,5.25rem)] leading-[0.85]">
                      {barber.name}
                    </h3>
                    <p className="eyebrow mt-3 text-olive-deep">{barber.role}</p>
                    <p className="mt-5 max-w-sm leading-relaxed text-stone-deep">{barber.bio}</p>
                    <ul className="mt-5 flex flex-wrap gap-2" aria-label="Specjalizacje">
                      {barber.specialties.map((s) => (
                        <li
                          key={s}
                          className="border border-ink/20 px-2.5 py-1 text-xs font-medium"
                        >
                          {s}
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
        <p className="eyebrow mt-6 text-stone-deep md:hidden" aria-hidden>
          Przesuń, aby zobaczyć cały zespół →
        </p>
      </div>
    </section>
  );
}
