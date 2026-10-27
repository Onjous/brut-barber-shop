import Image from "next/image";
import { Clock3 } from "lucide-react";
import serviceImage from "@/assets/images/service-fade.jpg";
import { services } from "@/content/services";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal, RevealHeading } from "@/components/ui/Reveal";
import { formatDuration, formatPrice, pad } from "@/lib/utils";
import { BookServiceLink } from "./BookServiceLink";

export function Services() {
  return (
    <section
      id="uslugi"
      aria-labelledby="uslugi-heading"
      className="bg-ink py-24 text-bone md:py-36"
    >
      <div className="mx-auto grid max-w-[120rem] grid-cols-1 gap-x-10 gap-y-14 px-5 md:px-10 lg:grid-cols-12 xl:px-14">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionLabel index="02" className="text-stone">
              Usługi
            </SectionLabel>
            <RevealHeading
              id="uslugi-heading"
              lines={["Konkretne", "usługi.", "Uczciwe ceny."]}
              className="font-condensed mt-8 text-[clamp(3.2rem,5.6vw,6.25rem)] leading-[0.86]"
            />
            <Reveal className="mt-8 max-w-md">
              <p className="leading-relaxed text-stone">
                Bez ukrytych dopłat i bez wciskania kosmetyków. Każda wizyta zaczyna się od
                krótkiej konsultacji, a kończy stylizacją i radą, jak utrzymać fryzurę w domu.
              </p>
            </Reveal>
            <Reveal delay={0.1} className="relative mt-12 hidden aspect-[16/10] overflow-hidden lg:block">
              <Image
                src={serviceImage}
                alt="Barber wycieniowuje maszynką boki fryzury klienta z brodą"
                fill
                placeholder="blur"
                sizes="38vw"
                className="object-cover object-[60%_40%] saturate-[0.75]"
              />
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-7">
          <ol className="border-b border-bone/15">
            {services.map((service, i) => (
              <li key={service.slug} className="group relative border-t border-bone/15">
                <span
                  aria-hidden
                  className="absolute -top-px left-0 h-px w-full origin-left scale-x-0 bg-rust transition-transform duration-700 ease-out-expo group-hover:scale-x-100 group-focus-within:scale-x-100"
                />
                <Reveal y={20} className="grid grid-cols-[1.75rem_1fr_auto] gap-x-3 py-7 md:grid-cols-[3rem_1fr_auto] md:gap-x-6 md:py-9">
                  <span className="pt-2 font-mono text-xs text-stone">{pad(i + 1)}</span>

                  <div className="min-w-0">
                    <h3 className="font-condensed text-[clamp(1.85rem,3.4vw,3.1rem)] leading-[0.95] transition-transform duration-500 ease-out-expo group-hover:translate-x-1.5">
                      {service.name}
                    </h3>
                    {service.featured && (
                      <p className="eyebrow mt-3 text-[0.625rem] text-rust-soft">
                        Najczęściej wybierane
                      </p>
                    )}
                    <p className="mt-3 max-w-md text-[0.95rem] leading-relaxed text-stone">
                      {service.description}
                    </p>
                  </div>

                  <p className="font-condensed text-right text-[clamp(1.85rem,3.4vw,3.1rem)] leading-[0.95] whitespace-nowrap">
                    {formatPrice(service.price)}
                  </p>

                  <div className="col-start-2 col-end-4 mt-5 flex items-center justify-between gap-4">
                    <p className="flex items-center gap-2 font-mono text-xs tracking-wider text-stone uppercase">
                      <Clock3 aria-hidden className="size-3.5" />
                      <span className="sr-only">Czas trwania:</span>
                      {formatDuration(service.duration)}
                    </p>
                    <BookServiceLink slug={service.slug} name={service.name} />
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-xs leading-relaxed text-stone">
            Ceny i czasy trwania są przykładowe — projekt demonstracyjny, nie oferta handlowa.
          </p>
        </div>
      </div>
    </section>
  );
}
