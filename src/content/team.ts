import type { Barber } from "./types";
import kuba from "@/assets/images/team-kuba.jpg";
import michal from "@/assets/images/team-michal.jpg";
import adam from "@/assets/images/team-adam.jpg";

/** Fikcyjne postacie — zdjęcia pochodzą z Unsplash i nie przedstawiają prawdziwych pracowników. */
export const team: Barber[] = [
  {
    slug: "kuba",
    name: "Kuba",
    role: "Senior Barber",
    bio: "Najdłużej w zawodzie i najmniej mówi o sobie. Najpierw słucha, potem robi dokładnie to, o czym rozmawialiście — tylko trochę lepiej.",
    specialties: ["Nowoczesne cięcia", "Tekstura"],
    portrait: {
      src: kuba,
      alt: "Portret Kuby — mężczyzna z krótko przyciętymi, zaczesanymi do góry włosami",
      focus: "50% 30%",
    },
  },
  {
    slug: "michal",
    name: "Michał",
    role: "Barber / Beard Specialist",
    bio: "Broda to dla niego osobna dyscyplina. Gorący ręcznik, brzytwa i oko do symetrii, które czasem aż niepokoi. Zapuszczasz brodę? Zacznij od Michała.",
    specialties: ["Broda", "Golenie brzytwą"],
    portrait: {
      src: michal,
      alt: "Portret Michała — mężczyzna z ogoloną głową i długą, gęstą brodą",
      focus: "50% 25%",
    },
  },
  {
    slug: "adam",
    name: "Adam",
    role: "Barber / Classic Cuts",
    bio: "Przedziałek, pompadour, gładki fade. Lubi stare płyty, porządne pomady i fryzury, które dobrze wyglądają także w czwartym tygodniu.",
    specialties: ["Klasyka", "Fade"],
    portrait: {
      src: adam,
      alt: "Portret Adama — młody mężczyzna z klasyczną, gęstą fryzurą",
      focus: "50% 30%",
    },
  },
];
