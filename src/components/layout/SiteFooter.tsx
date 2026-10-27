import Link from "next/link";
import { bookingHref, navigation, site } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";

async function CopyrightYear() {
  "use cache";
  return new Date().getFullYear();
}

export function SiteFooter() {
  return (
    <footer id="site-footer" className="overflow-hidden bg-ink text-bone">
      <div className="mx-auto max-w-[120rem] px-5 pt-20 md:px-10 md:pt-28 xl:px-14">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="font-condensed text-[clamp(2.4rem,4.4vw,4.25rem)] leading-[0.9]">
              Gotowy na zmianę<span className="text-rust">?</span>
            </p>
            <ButtonLink href={`/${bookingHref}`} variant="light" className="mt-8 sm:min-w-60">
              Umów wizytę
            </ButtonLink>
          </div>

          <nav aria-label="Stopka" className="lg:col-span-2 lg:col-start-6">
            <p className="eyebrow text-stone">Nawigacja</p>
            <ul className="mt-5 space-y-2">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link href={`/${item.href}`} className="inline-block py-0.5 transition-colors hover:text-rust">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <p className="eyebrow text-stone">Kontakt (demo)</p>
            <address className="mt-5 space-y-2 not-italic">
              <p>
                {site.address.street}, {site.address.postalCode} {site.address.city}
              </p>
              <p>{site.phone.display}</p>
              <p>{site.email.display}</p>
            </address>
          </div>

          <div className="lg:col-span-2">
            <p className="eyebrow text-stone">Social</p>
            <ul className="mt-5 space-y-2">
              {site.socials.map((s) => (
                <li key={s.label}>
                  {s.href ? (
                    <a href={s.href} className="transition-colors hover:text-rust">
                      {s.label}
                    </a>
                  ) : (
                    <span>
                      {s.label} <span className="text-sm text-stone">— wkrótce</span>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-bone/15 py-6 text-sm text-stone md:flex-row md:items-center md:justify-between">
          <p>
            © <CopyrightYear /> {site.fullName}. Fikcyjna marka.
          </p>
          <p className="md:text-center">{site.demoNote}</p>
          <div className="flex gap-6">
            <Link href="/polityka-prywatnosci" className="underline-offset-4 hover:text-bone hover:underline">
              Polityka prywatności
            </Link>
            <span>Zdjęcia: Unsplash</span>
          </div>
        </div>
      </div>

      <p
        aria-hidden
        className="font-condensed -mb-[0.2em] text-center text-[43vw] leading-[0.8] text-bone/[0.06] select-none"
      >
        Brut.
      </p>
    </footer>
  );
}
