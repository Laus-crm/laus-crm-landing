import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { newsItems } from '@/data/news';
import { type Lang, t } from '@/lib/i18n';
import { assetUrl } from '@/lib/baseUrl';
import Reveal from '@/components/Reveal';

interface NewsSliderProps {
  lang: Lang;
}

const VISIBLE_COUNT = 3;

export default function NewsSlider({ lang }: NewsSliderProps) {
  const tr = t(lang);
  const [offset, setOffset] = useState(0);
  const maxOffset = Math.max(0, newsItems.length - VISIBLE_COUNT);

  // Resynchroniser offset si le nombre d'items diminue (évite affichage vide)
  useEffect(() => {
    setOffset((o) => Math.min(o, maxOffset));
  }, [maxOffset]);

  const prev = () => setOffset((o) => Math.max(0, o - 1));
  const next = () => setOffset((o) => Math.min(maxOffset, o + 1));

  return (
    <section id="news" className="container-site" style={{ paddingTop: 'var(--section-spacing-tight)', paddingBottom: 'var(--section-spacing-tight)' }}>
      <div className="section-divider mb-16" />

      <Reveal className="flex flex-wrap items-center justify-between gap-4 mb-12">
        <h2 className="heading-display">{tr.news.title}</h2>
        <div className="flex items-center gap-4">
          {newsItems.length > 0 && (
            <>
              <div className="flex gap-2">
                <button
                  onClick={prev}
                  disabled={offset === 0}
                  className="p-2 text-foreground/50 hover:text-foreground disabled:opacity-30 transition-colors"
                  aria-label={tr.news.prevButton}
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={next}
                  disabled={offset >= maxOffset}
                  className="p-2 text-foreground/50 hover:text-foreground disabled:opacity-30 transition-colors"
                  aria-label={tr.news.nextButton}
                >
                  <ChevronRight size={24} />
                </button>
              </div>
              <Link
                to={`/news?lang=${lang}`}
                className="font-body text-sm font-medium text-foreground hover:text-primary transition-colors whitespace-nowrap"
              >
                {tr.news.viewAll} →
              </Link>
            </>
          )}
        </div>
      </Reveal>

      {newsItems.length === 0 ? (
        <Reveal>
          <p className="font-body text-base text-muted-foreground">{tr.news.emptyMessage}</p>
        </Reveal>
      ) : (
        <div className="overflow-hidden">
          <div
            className="flex gap-6 transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${offset * (100 / VISIBLE_COUNT)}%)` }}
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
                      src={assetUrl(item.image)}
                      alt={lang === 'fr' ? item.titleFr : item.titleEn}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <p className="text-label mb-2 pl-3">{item.date}</p>
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
