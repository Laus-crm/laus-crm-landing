import type { Plugin } from 'vite';
import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';

const VIRTUAL_ID = 'virtual:news-items';
const RESOLVED_ID = '\0' + VIRTUAL_ID;

const EXCLUDED = new Set(['example.md', 'readme.md']);

function isExcluded(name: string): boolean {
  return EXCLUDED.has(name.toLowerCase());
}

export function newsPlugin(): Plugin {
  return {
    name: 'news-loader',
    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_ID;
      return null;
    },
    load(id) {
      if (id !== RESOLVED_ID) return null;

      const dir = path.resolve(process.cwd(), 'src/content/news');
      if (!fs.existsSync(dir)) {
        return `export const newsItems = []; export function getNewsBySlug(slug) { return undefined; }`;
      }

      const files = fs.readdirSync(dir, 'utf-8').filter((f) => f.endsWith('.md') && !isExcluded(f));
      const withSort: Array<Record<string, unknown> & { sortDate: string }> = [];

      for (const file of files) {
        try {
          const raw = fs.readFileSync(path.join(dir, file), 'utf-8');
          const { data } = matter(raw);
          const slug = String(data?.slug ?? '').trim();
          if (!slug) continue;
          const sortDate = String(data?.sortDate ?? data?.date ?? '').trim();
          withSort.push({
            id: slug,
            slug,
            image: String(data?.image ?? '').trim() || '/news/news-1.svg',
            titleFr: String(data?.titleFr ?? '').trim() || 'Sans titre',
            titleEn: String(data?.titleEn ?? '').trim() || 'Untitled',
            date: String(data?.date ?? '').trim() || '',
            contentFr: String(data?.contentFr ?? '').trim() || '',
            contentEn: String(data?.contentEn ?? '').trim() || '',
            sortDate,
          });
        } catch {
          // skip invalid files
        }
      }

      withSort.sort((a, b) => b.sortDate.localeCompare(a.sortDate));
      const items = withSort.map(({ sortDate: _, ...item }) => item);

      return `export const newsItems = ${JSON.stringify(items)};
export function getNewsBySlug(slug) {
  return newsItems.find(function(n) { return n.slug === slug; });
}`;
    },
  };
}
