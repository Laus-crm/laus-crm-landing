/// <reference types="vite/client" />

declare module 'virtual:news-items' {
  export const newsItems: Array<{
    id: string;
    slug: string;
    image: string;
    titleFr: string;
    titleEn: string;
    date: string;
    contentFr: string;
    contentEn: string;
  }>;
  export function getNewsBySlug(slug: string): (typeof newsItems)[number] | undefined;
}
