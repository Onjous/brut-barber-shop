import { PageIntro } from "@/components/layout/PageIntro";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <PageIntro eyebrow="Błąd 404" title="Tu nic nie ma">
        <p className="mt-8 max-w-md leading-relaxed text-stone">
          Ta strona nie istnieje albo została przeniesiona. Wracaj do fotela.
        </p>
        <ButtonLink href="/" variant="light" className="mt-10 sm:min-w-60">
          Strona główna
        </ButtonLink>
      </PageIntro>
    </main>
  );
}
