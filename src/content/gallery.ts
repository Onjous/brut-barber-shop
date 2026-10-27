import type { GalleryItem } from "./types";
import skinFade from "@/assets/images/gallery-skin-fade.jpg";
import cutting from "@/assets/images/gallery-cutting.jpg";
import beardTrim from "@/assets/images/gallery-beard-trim.jpg";
import chair from "@/assets/images/gallery-chair.jpg";
import clipperDetail from "@/assets/images/gallery-clipper-detail.jpg";
import beardLine from "@/assets/images/gallery-beard-line.jpg";
import beardBrush from "@/assets/images/gallery-beard-brush.jpg";
import textureCut from "@/assets/images/gallery-texture-cut.jpg";

/** Kolejność elementów ma znaczenie — odpowiada układowi siatki w galerii. */
export const gallery: GalleryItem[] = [
  {
    id: "skin-fade",
    category: "Skin fade",
    caption: "Przejście od zera, wykończone brzytwą",
    image: {
      src: skinFade,
      alt: "Barber wykańcza skin fade na karku klienta, ujęcie od tyłu",
      focus: "55% 40%",
    },
  },
  {
    id: "beard-line",
    category: "Broda",
    caption: "Kontur brody i baków",
    image: {
      src: beardLine,
      alt: "Barber z wytatuowanymi dłońmi wyrównuje kontur brody i baków klienta",
      focus: "50% 35%",
    },
  },
  {
    id: "chair",
    category: "Studio",
    caption: "Fotel, w którym nie chce się wstawać",
    image: {
      src: chair,
      alt: "Skórzany, pikowany fotel barberski w ciepłym świetle studia",
      focus: "50% 45%",
    },
  },
  {
    id: "clipper-detail",
    category: "Detal",
    caption: "Linia karku, poprawiana do skutku",
    image: {
      src: clipperDetail,
      alt: "Wytatuowane dłonie barbera wyrównują maszynką linię włosów na karku klienta",
      focus: "55% 40%",
    },
  },
  {
    id: "cutting",
    category: "Fade",
    caption: "Mid fade i naturalny skręt na górze",
    image: {
      src: cutting,
      alt: "Barber w rękawiczkach strzyże maszynką klienta z kręconymi, rozjaśnionymi na końcach włosami",
      focus: "50% 40%",
    },
  },
  {
    id: "beard-trim",
    category: "Golenie",
    caption: "Gorąca piana przed konturem brzytwą",
    image: {
      src: beardTrim,
      alt: "Czarno-białe ujęcie: barber nakłada pędzlem pianę na szyję klienta z gęstą brodą",
      focus: "60% 40%",
    },
  },
  {
    id: "texture-cut",
    category: "Nowoczesne cięcie",
    caption: "Tekstura na górze, krótko po bokach",
    image: {
      src: textureCut,
      alt: "Strzyżenie nożyczkami teksturowanej góry fryzury z krótko ściętymi bokami",
      focus: "45% 45%",
    },
  },
  {
    id: "beard-brush",
    category: "Broda",
    caption: "Trymowanie i stylizacja brody",
    image: {
      src: beardBrush,
      alt: "Klient odchylony w fotelu podczas trymowania brody, barber trzyma trymer i pędzel",
      focus: "50% 40%",
    },
  },
];
