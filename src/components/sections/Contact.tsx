import { Navigation } from "lucide-react";
import { site } from "@/content/site";
import { SectionLabel, DemoTag } from "@/components/ui/SectionLabel";
import { Reveal, RevealHeading } from "@/components/ui/Reveal";
import { ButtonLink, buttonClasses } from "@/components/ui/Button";

function MapPlaceholder() {
  return (
    <svg
      viewBox="0 0 400 400"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 size-full"
      aria-hidden
    >
      <rect width="400" height="400" fill="#191919" />
      <path
        d="M-20 318 C 70 280 130 352 220 318 S 360 236 430 262"
        fill="none"
        stroke="#727765"
        strokeWidth="30"
        opacity="0.45"
      />
      <g stroke="#a7a49d" fill="none" opacity="0.22">
        <ellipse cx="196" cy="150" rx="104" ry="122" strokeWidth="7" />
        <path d="M0 64 L400 108 M0 196 L400 170 M-10 250 L410 236 M60 0 L92 400 M150 0 L170 290 M250 0 L238 300 M330 0 L352 400" strokeWidth="2.5" />
        <path d="M0 20 L400 40 M0 120 L400 136 M0 160 L400 150 M20 0 L40 400 M110 0 L126 400 M200 0 L204 290 M290 0 L298 300 M370 0 L390 400" strokeWidth="1" />
      </g>
      <rect x="168" y="118" width="58" height="58" fill="none" stroke="#a7a49d" strokeWidth="1" opacity="0.35" />
    </svg>
  );
}

export function Contact() {
  const { address, phone, email, hours, socials } = site;

  return (
    <section
      id="kontakt"
      aria-labelledby="kontakt-heading"
      className="bg-bone py-24 md:py-36"
    >
      <div className="mx-auto grid max-w-[120rem] grid-cols-1 gap-x-10 gap-y-16 px-5 md:px-10 lg:grid-cols-12 xl:px-14">
        <div className="lg:col-span-6">
          <SectionLabel index="07" className="text-olive-deep">
            Kontakt
          </SectionLabel>
          <RevealHeading
            id="kontakt-heading"
            lines={["Wpadnij", "do nas."]}
            className="font-condensed mt-8 text-[clamp(3.4rem,9vw,9rem)] leading-[0.86]"
          />
          <Reveal className="mt-8 max-w-md">
            <p className="leading-relaxed text-stone-deep">
              Zajrzyj na kawę albo od razu umów wizytę. Dane poniżej są demonstracyjne —
              marka BRUT jest fikcyjna i nie prowadzi działalności.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <dl className="mt-12 grid gap-x-10 border-t border-ink/15 sm:grid-cols-2">
              <div className="border-b border-ink/15 py-6">
                <dt className="eyebrow flex items-center gap-3 text-stone-deep">
                  Adres <DemoTag className="text-rust-deep" />
                </dt>
                <dd className="mt-3 text-lg leading-snug font-semibold">
                  {address.street}
                  <br />
                  {address.postalCode} {address.city}
                </dd>
                <dd className="mt-1 text-sm text-stone-deep">Adres demonstracyjny</dd>
              </div>

              <div className="border-b border-ink/15 py-6">
                <dt className="eyebrow text-stone-deep">Godziny otwarcia</dt>
                <dd className="mt-3">
                  <table className="w-full text-sm">
                    <tbody>
                      {hours.map((h) => (
                        <tr key={h.label}>
                          <th scope="row" className="py-0.5 pr-4 text-left font-normal text-stone-deep">
                            {h.label}
                          </th>
                          <td className="py-0.5 text-right font-semibold">
                            {h.open ? `${h.open} – ${h.close}` : "nieczynne"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </dd>
              </div>

              <div className="border-b border-ink/15 py-6">
                <dt className="eyebrow flex items-center gap-3 text-stone-deep">
                  Telefon <DemoTag className="text-rust-deep" />
                </dt>
                <dd className="mt-3 text-lg font-semibold">{phone.display}</dd>
                <dd className="mt-1 text-sm text-stone-deep">Numer nieaktywny</dd>
              </div>

              <div className="border-b border-ink/15 py-6">
                <dt className="eyebrow flex items-center gap-3 text-stone-deep">
                  E-mail <DemoTag className="text-rust-deep" />
                </dt>
                <dd className="mt-3 text-lg font-semibold break-all">{email.display}</dd>
                <dd className="mt-1 text-sm text-stone-deep">Domena przykładowa (.example)</dd>
              </div>

              <div className="py-6 sm:col-span-2">
                <dt className="eyebrow text-stone-deep">Social media</dt>
                <dd className="mt-3 flex flex-wrap gap-x-8 gap-y-2">
                  {socials.map((s) =>
                    s.href ? (
                      <a key={s.label} href={s.href} className="font-semibold underline-offset-4 hover:underline">
                        {s.label}
                      </a>
                    ) : (
                      <span key={s.label} className="font-semibold">
                        {s.label} <span className="text-sm font-normal text-stone-deep">— wkrótce</span>
                      </span>
                    ),
                  )}
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>

        <Reveal className="flex flex-col lg:col-span-6" delay={0.1} y={40}>
          <div className="relative aspect-[4/5] overflow-hidden bg-ink text-bone sm:aspect-[4/3] lg:aspect-auto lg:flex-1">
            <MapPlaceholder />
            <p className="eyebrow absolute top-5 left-5 text-stone">Mapa poglądowa</p>
            <div className="absolute top-[37%] left-[49%] -translate-x-1/2 -translate-y-1/2">
              <span className="absolute inset-0 animate-ping rounded-full bg-rust/60" />
              <span className="relative block size-4 rounded-full border-2 border-bone bg-rust" />
            </div>
            <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 bg-bone p-5 text-ink">
              <div>
                <p className="font-condensed text-2xl leading-none">
                  Brut<span className="text-rust">.</span>
                </p>
                <p className="mt-2 text-sm text-stone-deep">
                  {address.street}, {address.city} — adres demonstracyjny
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
            {site.directionsUrl ? (
              <ButtonLink href={site.directionsUrl} target="_blank" rel="noopener" variant="dark">
                Wyznacz trasę
              </ButtonLink>
            ) : (
              <>
                <button
                  type="button"
                  disabled
                  aria-describedby="directions-note"
                  className={buttonClasses("outline-dark", "cursor-not-allowed sm:min-w-56")}
                >
                  <span>Wyznacz trasę</span>
                  <Navigation aria-hidden className="size-4" />
                </button>
                <p id="directions-note" className="text-sm text-stone-deep">
                  Nawigacja będzie dostępna po podaniu prawdziwego adresu salonu.
                </p>
              </>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
