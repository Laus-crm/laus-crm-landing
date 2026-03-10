/**
 * Actualités : chargées depuis les .md de src/content/news/ au build par le plugin Vite.
 * Fichiers exclus : example.md, README.md.
 */
import { newsItems as _items, getNewsBySlug as _getBySlug } from 'virtual:news-items';

export interface NewsItem {
  id: string;
  slug: string;
  image: string;
  titleFr: string;
  titleEn: string;
  date: string;
  contentFr: string;
  contentEn: string;
}

export const newsItems: NewsItem[] = _items as NewsItem[];

export function getNewsBySlug(slug: string): NewsItem | undefined {
  return _getBySlug(slug) as NewsItem | undefined;
}
