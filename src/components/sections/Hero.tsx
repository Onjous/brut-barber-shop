import { HeroMedia } from "./HeroMedia";
import { ButtonLink } from "@/components/ui/Button";
import { bookingHref, site } from "@/content/site";

export function Hero() {
  const [weekdays, saturday] = site.hours;

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-[max(100svh,40rem)] flex-col overflow-hidden bg-ink text-bone"
    >
      <HeroMedia />

      <div className="mx-auto flex w-full max-w-[120rem] flex-1 flex-col px-5 pt-[calc(var(--header-h)+1.5rem)] pb-6 md:px-10 md:pb-10 xl:px-14">
        <div className="anim-fade flex items-start justify-between gap-6 [animation-delay:300ms]">
          <p className="eyebrow text-bone/80">
            Barber Studio <span className="text-rust">/</span> {site.address.city}
          </p>
          <p className="eyebrow hidden text-right text-bone/70 md:block">
            {weekdays.short} {weekdays.open}–{weekdays.close}
            <br />
            {saturday.short} {saturday.open}–{saturday.close}
          </p>
        </div>

        <div className="mt-auto grid gap-y-8 pt-16 lg:grid-cols-12">
          <p className="anim-fade order-2 max-w-md text-lg leading-relaxed text-bone/85 [animation-delay:250ms] md:text-xl lg:order-1 lg:col-span-4 lg:col-start-9 lg:self-end lg:pb-3">
            Precyzyjne cięcia, autentyczna atmosfera i styl, który zostaje z&nbsp;Tobą na
            dłużej.
          </p>

          <h1
            id="hero-heading"
            className="font-condensed order-1 text-[14.2vw] leading-[0.84] md:text-[clamp(3.4rem,11.6vw,13.5rem)] lg:order-2 lg:col-span-12"
          >
            {["Dobry styl", "Bez kompromisów"].map((line, i) => (
              <span key={line} className="-my-[0.14em] block overflow-hidden py-[0.14em]">
                <span
                  className="anim-rise block"
                  style={{ animationDelay: `${150 + i * 90}ms` }}
                >
                  {line}
                  <span className="text-rust">.</span>
                </span>
              </span>
            ))}
          </h1>
        </div>

        <div className="anim-fade mt-8 flex flex-col gap-6 border-t border-bone/20 pt-6 [animation-delay:650ms] md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={bookingHref} variant="light" className="sm:min-w-60">
              Zarezerwuj termin
            </ButtonLink>
            <ButtonLink href="#uslugi" variant="outline-light" className="sm:min-w-60">
              Poznaj nasze usługi
            </ButtonLink>
          </div>
          <p className="text-xs leading-relaxed text-bone/60 md:max-w-xs md:text-right">
            {site.demoNote}
          </p>
        </div>
      </div>
    </section>
  );
}
