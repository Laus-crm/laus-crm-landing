import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { newsItems } from '@/data/news';
import { type Lang, t } from '@/lib/i18n';
import Reveal from '@/components/Reveal';

interface NewsSliderProps {
  lang: Lang;
}

export default function NewsSlider({ lang }: NewsSliderProps) {
  const tr = t(lang);
  const [offset, setOffset] = useState(0);
  const visibleCount = 3;
  const maxOffset = Math.max(0, newsItems.length - visibleCount);

  const prev = () => setOffset((o) => Math.max(0, o - 1));
  const next = () => setOffset((o) => Math.min(maxOffset, o + 1));

  return (
    <section id="news" className="container-site" style={{ paddingTop: 'var(--section-spacing)', paddingBottom: 'var(--section-spacing)' }}>
      <div className="section-divider mb-16" />

      <Reveal className="flex items-center justify-between mb-12">
        <h2 className="heading-display">{tr.news.title}</h2>
        {newsItems.length > 0 && (
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
        )}
      </Reveal>

      {newsItems.length === 0 ? (
        <Reveal>
          <p className="font-body text-base text-muted-foreground">{tr.news.emptyMessage}</p>
        </Reveal>
      ) : (
        <div className="overflow-hidden">
          <div
            className="flex gap-6 transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${offset * (100 / visibleCount)}%)` }}
          >
            {newsItems.map((item) => (
              <Link
                key={item.id}
                to={`/news/${item.slug}?lang=${lang}`}
                className="flex-shrink-0 w-full md:w-[calc(33.333%-16px)] block group"
              >
                <article>
                  <div className="aspect-[4/3] overflow-hidden mb-4">
                    <img
                      src={item.image.startsWith('http') ? item.image : `${import.meta.env.BASE_URL.replace(/\/$/, '')}${item.image}`}
                      alt={lang === 'fr' ? item.titleFr : item.titleEn}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <p className="text-label mb-2">{item.date}</p>
                  <Reveal delayMs={60}>
                    <h3 className="font-heading text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                      {lang === 'fr' ? item.titleFr : item.titleEn}
                    </h3>
                  </Reveal>
                </article>
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
