import type { Service } from "./types";

/** Ceny i czasy są przykładowe — nie pochodzą z żadnego istniejącego salonu. */
export const services: Service[] = [
  {
    slug: "strzyzenie-meskie",
    name: "Strzyżenie męskie",
    description:
      "Konsultacja, mycie, strzyżenie nożyczkami i maszynką, stylizacja. Nasz punkt wyjścia.",
    price: 90,
    duration: 45,
    featured: true,
  },
  {
    slug: "strzyzenie-i-broda",
    name: "Strzyżenie + broda",
    description:
      "Fryzura i broda dopasowane do siebie. Kontur brzytwą, gorący ręcznik i spójny efekt.",
    price: 130,
    duration: 60,
  },
  {
    slug: "modelowanie-brody",
    name: "Modelowanie brody",
    description:
      "Przycięcie, wyrównanie linii, kontur brzytwą i olejek na koniec. Broda zadbana, nie tylko krótsza.",
    price: 60,
    duration: 30,
  },
  {
    slug: "strzyzenie-maszynka",
    name: "Strzyżenie maszynką",
    description:
      "Jedna lub kilka długości, równo i bez kombinowania. Dla tych, którzy lubią prosto.",
    price: 65,
    duration: 30,
  },
  {
    slug: "strzyzenie-premium",
    name: "Strzyżenie premium",
    description:
      "Dłuższa konsultacja, mycie z masażem głowy, precyzyjne cięcie i stylizacja z instrukcją do domu.",
    price: 150,
    duration: 75,
  },
];
