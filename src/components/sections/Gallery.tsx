import { gallery } from "@/content/gallery";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal, RevealHeading } from "@/components/ui/Reveal";
import { GalleryGrid } from "./GalleryGrid";

export function Gallery() {
  return (
    <section
      id="galeria"
      aria-labelledby="galeria-heading"
      className="bg-bone-2 py-24 md:py-36"
    >
      <div className="mx-auto max-w-[120rem] px-5 md:px-10 xl:px-14">
        <SectionLabel index="04" className="text-olive-deep">
          Galeria
        </SectionLabel>
        <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <RevealHeading
            id="galeria-heading"
            lines={["Efekty mówią", "same za siebie."]}
            className="font-condensed text-[clamp(2.9rem,7.4vw,8rem)] leading-[0.86]"
            lineClassName="[&:last-child]:lg:pl-[1.2em]"
          />
          <Reveal className="max-w-xs lg:pb-3">
            <p className="leading-relaxed text-stone-deep">
              Fade&apos;y, klasyka, brody i codzienność studia. Kliknij zdjęcie, żeby je
              powiększyć.
            </p>
          </Reveal>
        </div>

        <Reveal className="mt-12 md:mt-16" y={40}>
          <GalleryGrid items={gallery} />
        </Reveal>
      </div>
    </section>
  );
}
