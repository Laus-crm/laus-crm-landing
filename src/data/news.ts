import news1 from '@/assets/news-1.jpg';
import news2 from '@/assets/news-2.jpg';
import news3 from '@/assets/news-3.jpg';
import news4 from '@/assets/news-4.jpg';

const LOREM_FR =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

const LOREM_EN =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.';

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

export const newsItems: NewsItem[] = [
  {
    id: '1',
    slug: 'ouverture-complexe-hotelier-paris',
    image: news1,
    titleFr: 'Ouverture du nouveau complexe hôtelier à Paris',
    titleEn: 'Opening of new hotel complex in Paris',
    date: '15 Janvier 2025',
    contentFr: LOREM_FR,
    contentEn: LOREM_EN,
  },
  {
    id: '2',
    slug: 'acquisition-strategique-londres',
    image: news2,
    titleFr: 'Acquisition stratégique dans le centre de Londres',
    titleEn: 'Strategic acquisition in central London',
    date: '3 Décembre 2024',
    contentFr: LOREM_FR,
    contentEn: LOREM_EN,
  },
  {
    id: '3',
    slug: 'renovation-hotel-historique-lyon',
    image: news3,
    titleFr: "Rénovation majeure d'un hôtel historique à Lyon",
    titleEn: 'Major renovation of a historic hotel in Lyon',
    date: '18 Octobre 2024',
    contentFr: LOREM_FR,
    contentEn: LOREM_EN,
  },
  {
    id: '4',
    slug: 'laus-mipim-2024-cannes',
    image: news4,
    titleFr: 'LAUS présent au MIPIM 2024 à Cannes',
    titleEn: 'LAUS at MIPIM 2024 in Cannes',
    date: '12 Mars 2024',
    contentFr: LOREM_FR,
    contentEn: LOREM_EN,
  },
];

export function getNewsBySlug(slug: string): NewsItem | undefined {
  return newsItems.find((n) => n.slug === slug);
}
