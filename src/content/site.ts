import type { NavItem, SiteConfig } from "./types";

export const site: SiteConfig = {
  name: "BRUT",
  fullName: "BRUT — Barber Studio",
  description:
    "BRUT — Barber Studio w Krakowie. Precyzyjne strzyżenie męskie, modelowanie brody i autentyczna atmosfera. Projekt demonstracyjny fikcyjnej marki.",
  demoNote:
    "Projekt demonstracyjny — fikcyjna marka stworzona na potrzeby portfolio.",
  address: {
    street: "ul. Przykładowa 12",
    postalCode: "30-000",
    city: "Kraków",
    isDemo: true,
  },
  phone: { display: "+48 000 000 000", isDemo: true },
  email: { display: "kontakt@brut.example", isDemo: true },
  hours: [
    { label: "Poniedziałek – piątek", short: "Pn–Pt", days: [1, 2, 3, 4, 5], open: "10:00", close: "20:00" },
    { label: "Sobota", short: "Sob", days: [6], open: "09:00", close: "16:00" },
    { label: "Niedziela", short: "Nd", days: [0] },
  ],
  socials: [
    { label: "Instagram", handle: "@brut.barber", href: null },
    { label: "TikTok", handle: "@brut.barber", href: null },
    { label: "Facebook", handle: "BRUT Barber Studio", href: null },
  ],
  directionsUrl: null,
  bookingUrl: null,
};

export const navigation: NavItem[] = [
  { label: "O nas", href: "#o-nas" },
  { label: "Usługi", href: "#uslugi" },
  { label: "Galeria", href: "#galeria" },
  { label: "Opinie", href: "#opinie" },
  { label: "Kontakt", href: "#kontakt" },
];

export const bookingHref = "#rezerwacja" as const;
