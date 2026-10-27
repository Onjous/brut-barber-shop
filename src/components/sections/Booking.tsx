import { site } from "@/content/site";
import { SectionLabel, DemoTag } from "@/components/ui/SectionLabel";
import { Reveal, RevealHeading } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { BookingForm } from "./BookingForm";

export function Booking() {
  return (
    <section
      id="rezerwacja"
      aria-labelledby="rezerwacja-heading"
      className="bg-ink py-24 text-bone md:py-36"
    >
      <div className="mx-auto grid max-w-[120rem] grid-cols-1 gap-x-10 gap-y-14 px-5 md:px-10 lg:grid-cols-12 xl:px-14">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionLabel index="06" className="text-stone">
              Rezerwacja
            </SectionLabel>
            <RevealHeading
              id="rezerwacja-heading"
              lines={["Twój styl", "zaczyna się", "tutaj."]}
              className="font-condensed mt-8 text-[clamp(3.2rem,6.6vw,7.25rem)] leading-[0.86]"
            />
            <Reveal className="mt-8 max-w-md space-y-8">
              <p className="leading-relaxed text-stone">
                Wybierz usługę, barbera i termin. Całość zajmuje mniej niż minutę, a w razie
                zmiany planów wizytę przełożysz bez tłumaczenia się.
              </p>

              <div className="border-l-2 border-rust pl-5">
                <DemoTag className="text-rust-soft" label="Demo" />
                <p className="mt-3 text-sm leading-relaxed text-stone">
                  Formularz pokazuje przebieg rezerwacji, ale niczego nie zapisuje ani nie
                  wysyła. Po wdrożeniu łączy się z systemem rezerwacji salonu, np. Booksy.
                </p>
              </div>

              {site.bookingUrl && (
                <ButtonLink href={site.bookingUrl} target="_blank" rel="noopener" variant="light">
                  Rezerwuj przez system online
                </ButtonLink>
              )}

              <dl className="grid grid-cols-2 gap-6 border-t border-bone/15 pt-6 text-sm">
                <div>
                  <dt className="eyebrow text-stone">Wolisz zadzwonić?</dt>
                  <dd className="mt-2 font-semibold">{site.phone.display}</dd>
                  <dd className="text-xs text-stone">numer demonstracyjny</dd>
                </div>
                <div>
                  <dt className="eyebrow text-stone">Godziny</dt>
                  {site.hours.map((h) => (
                    <dd key={h.label} className="mt-1.5">
                      <span className="text-stone">{h.short}: </span>
                      <span className="font-semibold">
                        {h.open ? `${h.open}–${h.close}` : "nieczynne"}
                      </span>
                    </dd>
                  ))}
                </div>
              </dl>
            </Reveal>
          </div>
        </div>

        <Reveal className="lg:col-span-7" y={40}>
          <BookingForm />
        </Reveal>
      </div>
    </section>
  );
}
