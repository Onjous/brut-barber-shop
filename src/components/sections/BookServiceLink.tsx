"use client";

import { useBooking } from "@/components/providers/Providers";
import { ButtonArrow } from "@/components/ui/Button";
import { bookingHref } from "@/content/site";

export function BookServiceLink({ slug, name }: { slug: string; name: string }) {
  const { setServiceSlug } = useBooking();

  return (
    <a
      href={bookingHref}
      onClick={() => setServiceSlug(slug)}
      aria-label={`Zarezerwuj: ${name}`}
      className="group/btn inline-flex min-h-11 items-center gap-2.5 text-sm font-semibold text-bone transition-colors hover:text-rust"
    >
      Zarezerwuj
      <ButtonArrow />
    </a>
  );
}
