/**
 * Publiczny adres strony. Ustaw NEXT_PUBLIC_SITE_URL po podpięciu domeny;
 * na Vercelu automatycznie używany jest adres produkcyjny projektu.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");
