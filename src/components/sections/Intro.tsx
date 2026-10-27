import Image from "next/image";
import { about } from "@/content/about";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal, RevealHeading } from "@/components/ui/Reveal";
import { Parallax } from "@/components/ui/Parallax";

export function Intro() {
  const { main, detail } = about.images;

  return (
    <section
      id="o-nas"
      aria-labelledby="o-nas-heading"
      className="relative overflow-hidden bg-bone py-24 md:py-36"
    >
      <p
        aria-hidden
        className="eyebrow absolute top-36 left-4 hidden rotate-180 text-stone [writing-mode:vertical-rl] xl:block"
      >
        BRUT — Barber Studio — Kraków
      </p>

      <div className="mx-auto grid max-w-[120rem] grid-cols-1 gap-x-10 gap-y-20 px-5 md:px-10 lg:grid-cols-12 xl:px-14">
        <div className="lg:col-span-7 xl:col-span-6 xl:col-start-2">
          <SectionLabel index="01" className="text-olive-deep">
            O nas
          </SectionLabel>
          <RevealHeading
            id="o-nas-heading"
            lines={["Więcej", "niż fryzjer."]}
            className="font-condensed mt-8 text-[clamp(3.4rem,9vw,9rem)] leading-[0.86]"
          />

          <Reveal className="mt-10 md:mt-14">
            <p className="max-w-2xl text-2xl leading-snug font-medium tracking-tight md:text-[1.75rem]">
              {about.lead}
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mt-8 grid gap-6 text-stone-deep sm:grid-cols-2 md:mt-10">
            {about.body.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </Reveal>

          <Reveal delay={0.15}>
            <dl className="mt-14 grid grid-cols-3 border-t border-ink/15 md:mt-20">
              {about.facts.map((fact) => (
                <div
                  key={fact.label}
                  className="flex flex-col-reverse justify-end gap-2 border-r border-ink/15 pt-5 pr-3 last:border-r-0 md:pr-6 [&:not(:first-child)]:pl-3 md:[&:not(:first-child)]:pl-6"
                >
                  <dt className="text-xs leading-snug text-stone-deep md:text-sm">{fact.label}</dt>
                  <dd className="font-condensed text-[clamp(2.5rem,6vw,4.5rem)] leading-none">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <div className="relative lg:col-span-5 lg:col-start-8 lg:pt-28">
          <div className="relative ml-[12%] lg:ml-0">
            <Reveal className="relative aspect-[4/5] overflow-hidden bg-ink">
              <Parallax distance={30} className="absolute -inset-y-10 inset-x-0">
                <Image
                  src={main.src}
                  alt={main.alt}
                  fill
                  placeholder="blur"
                  sizes="(min-width: 1024px) 40vw, 88vw"
                  className="object-cover saturate-[0.8]"
                  style={{ objectPosition: main.focus }}
                />
              </Parallax>
            </Reveal>

            <Parallax
              distance={36}
              className="absolute -bottom-12 -left-[14%] w-[58%] border-[6px] border-bone md:border-[10px] lg:-bottom-16 lg:-left-[16%] lg:w-[52%]"
            >
              <Reveal delay={0.2} className="relative aspect-[4/3] overflow-hidden bg-ink">
                <Image
                  src={detail.src}
                  alt={detail.alt}
                  fill
                  placeholder="blur"
                  sizes="(min-width: 1024px) 22vw, 52vw"
                  className="object-cover saturate-[0.8]"
                  style={{ objectPosition: detail.focus }}
                />
              </Reveal>
            </Parallax>
          </div>

          <p className="eyebrow mt-24 text-right text-stone-deep md:mt-28">
            Zdjęcia poglądowe — Unsplash
          </p>
        </div>
      </div>
    </section>
  );
}
