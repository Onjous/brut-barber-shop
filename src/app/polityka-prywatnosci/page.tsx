import type { Metadata } from "next";
import { PageIntro } from "@/components/layout/PageIntro";
import { ButtonLink } from "@/components/ui/Button";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Polityka prywatności",
  description: "Informacje o przetwarzaniu danych na stronie demonstracyjnej BRUT — Barber Studio.",
  alternates: { canonical: "/polityka-prywatnosci" },
};

const sections = [
  {
    title: "Czym jest ta strona",
    body: [
      `${site.demoNote} BRUT nie prowadzi działalności, a wszystkie dane kontaktowe, ceny i opinie na stronie są przykładowe.`,
    ],
  },
  {
    title: "Formularz rezerwacji",
    body: [
      "Formularz rezerwacji działa wyłącznie w Twojej przeglądarce. Wpisane imię, numer telefonu i uwagi nie są nigdzie wysyłane ani zapisywane — znikają po odświeżeniu strony.",
    ],
  },
  {
    title: "Pliki cookies i analityka",
    body: [
      "Strona nie używa plików cookies, narzędzi analitycznych ani pikseli reklamowych. Czcionki i zdjęcia są serwowane z tej samej domeny, bez odwołań do zewnętrznych serwisów.",
    ],
  },
  {
    title: "Hosting",
    body: [
      "Dostawca hostingu może przetwarzać podstawowe dane techniczne (np. adres IP i typ przeglądarki) w logach serwera, w celu zapewnienia bezpieczeństwa i działania usługi.",
    ],
  },
  {
    title: "Wdrożenie dla prawdziwego salonu",
    body: [
      "Przed publikacją strony prawdziwej firmy tę treść należy zastąpić polityką prywatności przygotowaną dla konkretnego administratora danych — z jego danymi, podstawami prawnymi przetwarzania (RODO) i informacjami o systemie rezerwacji.",
    ],
  },
];

export default function PrivacyPolicy() {
  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <PageIntro eyebrow="Informacje prawne" title="Polityka prywatności" />
      <div className="mx-auto max-w-[120rem] px-5 py-20 md:px-10 md:py-28 xl:px-14">
        <div className="max-w-2xl space-y-12">
          {sections.map((section, i) => (
            <section key={section.title} aria-labelledby={`pp-${i}`}>
              <h2 id={`pp-${i}`} className="font-condensed text-3xl leading-none md:text-4xl">
                {section.title}
              </h2>
              {section.body.map((p) => (
                <p key={p.slice(0, 20)} className="mt-4 leading-relaxed text-stone-deep">
                  {p}
                </p>
              ))}
            </section>
          ))}
          <ButtonLink href="/" variant="dark">
            Wróć na stronę główną
          </ButtonLink>
        </div>
      </div>
    </main>
  );
}
