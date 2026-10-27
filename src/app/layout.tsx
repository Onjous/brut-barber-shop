import type { Metadata, Viewport } from "next";
import { Archivo, JetBrains_Mono, Manrope } from "next/font/google";
import { Providers } from "@/components/providers/Providers";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { site } from "@/content/site";
import { siteUrl } from "@/lib/site-url";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  variable: "--font-manrope",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
  preload: false,
});

const title = "BRUT — Barber Studio Kraków | Strzyżenie męskie i broda";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | BRUT — Barber Studio",
  },
  description: site.description,
  applicationName: site.fullName,
  keywords: ["barber Kraków", "barbershop Kraków", "strzyżenie męskie", "modelowanie brody", "fade"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: "/",
    siteName: site.fullName,
    title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#191919",
  colorScheme: "light",
};

// Tylko fakty, które są prawdziwe: nazwa i adres witryny. Bez fikcyjnych
// danych firmy, adresu czy ocen (LocalBusiness dodać po wdrożeniu u klienta).
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.fullName,
  url: siteUrl,
  inLanguage: "pl-PL",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pl"
      className={`${archivo.variable} ${manrope.variable} ${jetbrains.variable}`}
    >
      <body className="min-h-full overflow-x-clip">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Providers>
          <SiteHeader />
          {children}
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}
