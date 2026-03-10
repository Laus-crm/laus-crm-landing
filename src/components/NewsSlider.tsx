import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import news1 from '@/assets/news-1.jpg';
import news2 from '@/assets/news-2.jpg';
import news3 from '@/assets/news-3.jpg';
import news4 from '@/assets/news-4.jpg';
import { type Lang, t } from '@/lib/i18n';

const newsItems = [
  { image: news1, titleFr: 'Ouverture du nouveau complexe hôtelier à Paris', titleEn: 'Opening of new hotel complex in Paris', date: '15 Janvier 2025' },
  { image: news2, titleFr: 'Acquisition stratégique dans le centre de Londres', titleEn: 'Strategic acquisition in central London', date: '3 Décembre 2024' },
  { image: news3, titleFr: 'Rénovation majeure d\'un hôtel historique à Lyon', titleEn: 'Major renovation of a historic hotel in Lyon', date: '18 Octobre 2024' },
  { image: news4, titleFr: 'LAUS présent au MIPIM 2024 à Cannes', titleEn: 'LAUS at MIPIM 2024 in Cannes', date: '12 Mars 2024' },
];

interface NewsSliderProps {
  lang: Lang;
}

export default function NewsSlider({ lang }: NewsSliderProps) {
  const tr = t(lang);
  const [offset, setOffset] = useState(0);
  const visibleCount = 3;
  const maxOffset = newsItems.length - visibleCount;

  const prev = () => setOffset((o) => Math.max(0, o - 1));
  const next = () => setOffset((o) => Math.min(maxOffset, o + 1));

  return (
    <section id="news" className="container-site" style={{ paddingTop: 'var(--section-spacing)', paddingBottom: 'var(--section-spacing)' }}>
      <div className="section-divider mb-16" />

      <div className="flex items-center justify-between mb-12">
        <h2 className="heading-display">{tr.news.title}</h2>
        <div className="flex gap-2">
          <button
            onClick={prev}
            disabled={offset === 0}
            className="p-2 text-foreground/50 hover:text-foreground disabled:opacity-30 transition-colors"
            aria-label="Previous news"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={next}
            disabled={offset >= maxOffset}
            className="p-2 text-foreground/50 hover:text-foreground disabled:opacity-30 transition-colors"
            aria-label="Next news"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      <div className="overflow-hidden">
        <div
          className="flex gap-6 transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${offset * (100 / visibleCount)}%)` }}
        >
          {newsItems.map((item, i) => (
            <article
              key={i}
              className="flex-shrink-0 w-full md:w-[calc(33.333%-16px)]"
            >
              <div className="aspect-[4/3] overflow-hidden mb-4">
                <img
                  src={item.image}
                  alt={lang === 'fr' ? item.titleFr : item.titleEn}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <p className="text-label mb-2">{item.date}</p>
              <h3 className="font-heading text-xl font-semibold text-foreground">
                {lang === 'fr' ? item.titleFr : item.titleEn}
              </h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
