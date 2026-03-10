import { useSearchParams, Link } from 'react-router-dom';
import { useState } from 'react';
import type { Lang } from '@/lib/i18n';
import { t } from '@/lib/i18n';
import LausNavbar from '@/components/LausNavbar';
import LausFooter from '@/components/LausFooter';
import PageEnter from '@/components/PageEnter';
import Reveal from '@/components/Reveal';
import { newsItems } from '@/data/news';

const News = () => {
  const [searchParams] = useSearchParams();
  const langParam = searchParams.get('lang');
  const [lang, setLang] = useState<Lang>(langParam === 'en' ? 'en' : 'fr');
  const tr = t(lang);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <LausNavbar lang={lang} onLangChange={setLang} variant="light" />

      <main className="flex-1 container-site" style={{ paddingTop: 'calc(80px + var(--section-spacing-tight))', paddingBottom: 'var(--section-spacing)' }}>
        <PageEnter>
          <Link to="/" className="font-body text-sm text-muted-foreground hover:text-foreground mb-8 inline-block">
            ← {tr.legal.backToHome}
          </Link>

          <Reveal>
            <h1 className="heading-display mb-12">{tr.news.title}</h1>
          </Reveal>

          {newsItems.length === 0 ? (
            <Reveal>
              <p className="font-body text-base text-muted-foreground">{tr.news.emptyMessage}</p>
            </Reveal>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {newsItems.map((item, index) => (
                <Reveal key={item.id} delayMs={index * 60}>
                  <Link
                    to={`/news/${item.slug}?lang=${lang}`}
                    className="block group"
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
                      <p className="text-label mb-2 pl-3">{item.date}</p>
                      <h2 className="font-heading text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                        {lang === 'fr' ? item.titleFr : item.titleEn}
                      </h2>
                    </article>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </PageEnter>
      </main>

      <LausFooter lang={lang} />
    </div>
  );
};

export default News;
