/**
 * Racine de l'app au runtime (pour assets / news images).
 * Même logique que le basename du router : sous-path GitHub Pages ou racine (domaine perso).
 */
export function getBaseUrl(): string {
  if (typeof window === "undefined") return "";
  return window.location.pathname.startsWith("/laus-crm-landing") ? "/laus-crm-landing" : "";
}

/** URL complète pour un asset (ex. image news). Gère base + path sans double slash. */
export function assetUrl(path: string): string {
  if (!path || path.startsWith("http://") || path.startsWith("https://")) return path;
  const base = getBaseUrl();
  const p = path.startsWith("/") ? path : `/${path}`;
  return base + p;
}
