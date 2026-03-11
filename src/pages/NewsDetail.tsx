import { useParams, useSearchParams, Link } from 'react-router-dom';
import { getNewsBySlug } from '@/data/news';
import type { Lang } from '@/lib/i18n';
import { t } from '@/lib/i18n';
import { assetUrl } from '@/lib/baseUrl';
import LausNavbar from '@/components/LausNavbar';
import LausFooter from '@/components/LausFooter';
import PageEnter from '@/components/PageEnter';
import Reveal from '@/components/Reveal';
import { useState, useMemo } from 'react';

const NewsDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const langParam = searchParams.get('lang');
  const [lang, setLang] = useState<Lang>(langParam === 'en' ? 'en' : 'fr');
  const tr = t(lang);

  const item = useMemo(() => (slug ? getNewsBySlug(slug) : undefined), [slug]);

  if (!item) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-6">
        <h1 className="heading-section text-foreground">{tr.news.notFound}</h1>
        <Link to="/" className="text-primary underline hover:text-primary/90">{tr.legal.backToHome}</Link>
      </div>
    );
  }

  const title = lang === 'fr' ? item.titleFr : item.titleEn;
  const content = lang === 'fr' ? item.contentFr : item.contentEn;

  return (
    <div className="min-h-screen bg-background">
      <LausNavbar lang={lang} onLangChange={setLang} variant="light" />
      <article className="container-site pt-32 pb-24" style={{ paddingTop: 'calc(var(--section-spacing) + 80px)', paddingBottom: 'var(--section-spacing)' }}>
        <PageEnter>
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <Link to={`/news?lang=${lang}`} className="font-body text-sm text-muted-foreground hover:text-foreground inline-block">
            ← {tr.news.backToNews}
          </Link>
          <Link to={`/news?lang=${lang}`} className="font-body text-sm font-medium text-foreground hover:underline inline-block">
            {tr.news.otherNews}
          </Link>
        </div>
        <div className="max-w-3xl">
          <div className="aspect-[16/9] overflow-hidden mb-8">
            <img
              src={assetUrl(item.image)}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
          <Reveal>
            <p className="text-label text-muted-foreground mb-2 pl-3">{item.date}</p>
          </Reveal>
          <Reveal delayMs={80}>
            <h1 className="heading-display mb-8">{title}</h1>
          </Reveal>
          <Reveal delayMs={120}>
            <div
              className="font-body text-base text-foreground leading-relaxed whitespace-pre-line [&_strong]:font-semibold [&_em]:italic [&_u]:underline"
              dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br />') }}
            />
          </Reveal>
        </div>
        </PageEnter>
      </article>
      <LausFooter lang={lang} />
    </div>
  );
};

export default NewsDetail;
