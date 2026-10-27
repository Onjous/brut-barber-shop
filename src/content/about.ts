import interior from "@/assets/images/studio-interior.jpg";
import tools from "@/assets/images/detail-tools.jpg";
import type { ImageAsset } from "./types";

export const about = {
  lead: "BRUT to studio dla facetów, którzy wiedzą, czego chcą. I dla tych, którzy dopiero chcą się tego dowiedzieć.",
  body: [
    "Nie robimy cięć z katalogu. Zaczynamy od rozmowy: o Twoich włosach, o tym, ile czasu rano masz dla lustra, i o tym, jak chcesz wyglądać za trzy tygodnie, a nie tylko dziś po wyjściu.",
    "Potem bierzemy się do roboty — spokojnie i dokładnie. Dobra kawa, dobra muzyka i fotel, z którego nie chce się wstawać. Reszta to rzemiosło.",
  ],
  facts: [
    { value: "03", label: "barberów, każdy z własnym stylem" },
    { value: "45′", label: "na standardową wizytę — bez pośpiechu" },
    { value: "0", label: "cięć z katalogu" },
  ],
  images: {
    main: {
      src: interior,
      alt: "Wnętrze studia: trzy czarne fotele barberskie, ceglane ściany i ciepłe lampy nad lustrami",
      focus: "50% 60%",
    },
    detail: {
      src: tools,
      alt: "Narzędzia barbera na ciemnej macie: maszynki, nożyczki, grzebień i kosmetyki do stylizacji",
      focus: "50% 50%",
    },
  } satisfies Record<string, ImageAsset>,
};
