import type { Testimonial } from "./types";

/**
 * Opinie demonstracyjne — napisane na potrzeby prezentacji projektu.
 * Nie są to recenzje prawdziwych klientów i nie należy ich publikować
 * jako danych strukturalnych (schema.org Review).
 */
export const testimonials: Testimonial[] = [
  {
    id: "r1",
    quote:
      "Świetna atmosfera, dokładne cięcie i pełen profesjonalizm. W końcu znalazłem swojego barbera.",
    author: "Tomasz K.",
    service: "Strzyżenie + broda",
  },
  {
    id: "r2",
    quote:
      "Przyszedłem z bardzo ogólnym pomysłem, wyszedłem z fryzurą, którą układam w dwie minuty. Dokładnie o to chodziło.",
    author: "Paweł S.",
    service: "Strzyżenie męskie",
  },
  {
    id: "r3",
    quote:
      "Michał uratował moją brodę po pół roku domowych eksperymentów. Bez oceniania, za to z konkretnymi radami na co dzień.",
    author: "Marcin W.",
    service: "Modelowanie brody",
  },
  {
    id: "r4",
    quote:
      "Punktualnie, spokojnie i bez zbędnego gadania. Kawa też niczego sobie.",
    author: "Bartek R.",
    service: "Strzyżenie maszynką",
  },
];
