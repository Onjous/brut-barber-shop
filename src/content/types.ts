import type { StaticImageData } from "next/image";

/**
 * Typy treści strony. Kształt danych odpowiada temu, czego oczekiwałby
 * headless CMS (Sanity, Payload itp.) — przy migracji wystarczy zamienić
 * źródło danych w plikach z katalogu `src/content`, a komponenty zostają bez zmian.
 */

export type ImageAsset = {
  src: StaticImageData;
  alt: string;
  /** Punkt ostrości przy kadrowaniu (wartość CSS object-position). */
  focus?: string;
};

export type NavItem = {
  label: string;
  href: `#${string}`;
};

export type OpeningHours = {
  label: string;
  /** Skrót do wąskich miejsc, np. "Pn–Pt". */
  short: string;
  /** Dni tygodnia wg Date#getDay(): 0 = niedziela … 6 = sobota. */
  days: number[];
  /** Format "HH:MM"; brak oznacza dzień zamknięty. */
  open?: string;
  close?: string;
};

export type SocialLink = {
  label: string;
  handle: string;
  /** Pusty, dopóki marka nie ma prawdziwego profilu. */
  href: string | null;
};

export type SiteConfig = {
  name: string;
  fullName: string;
  description: string;
  demoNote: string;
  address: {
    street: string;
    postalCode: string;
    city: string;
    isDemo: boolean;
  };
  phone: { display: string; isDemo: boolean };
  email: { display: string; isDemo: boolean };
  hours: OpeningHours[];
  socials: SocialLink[];
  /** Link do nawigacji (Google Maps itp.) — null, dopóki adres jest fikcyjny. */
  directionsUrl: string | null;
  /** Link do zewnętrznego systemu rezerwacji (np. Booksy) — null w wersji demo. */
  bookingUrl: string | null;
};

export type Service = {
  slug: string;
  name: string;
  description: string;
  /** Cena w złotych. */
  price: number;
  /** Czas trwania w minutach. */
  duration: number;
  featured?: boolean;
};

export type Barber = {
  slug: string;
  name: string;
  role: string;
  bio: string;
  specialties: string[];
  portrait: ImageAsset;
};

export type GalleryItem = {
  id: string;
  category: string;
  caption: string;
  image: ImageAsset;
};

export type Testimonial = {
  id: string;
  quote: string;
  author: string;
  service: string;
};
