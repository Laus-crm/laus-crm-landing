import { useParams, useSearchParams, Link } from 'react-router-dom';
import { getNewsBySlug } from '@/data/news';
import type { Lang } from '@/lib/i18n';
import LausNavbar from '@/components/LausNavbar';
import LausFooter from '@/components/LausFooter';
import { useState, useMemo } from 'react';

const NewsDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const langParam = searchParams.get('lang');
  const [lang, setLang] = useState<Lang>(langParam === 'en' ? 'en' : 'fr');

  const item = useMemo(() => (slug ? getNewsBySlug(slug) : undefined), [slug]);

  if (!item) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-6">
        <h1 className="font-heading text-2xl text-foreground">Actualité introuvable</h1>
        <Link to="/" className="text-primary underline hover:text-primary/90">Retour à l'accueil</Link>
      </div>
    );
  }

  const title = lang === 'fr' ? item.titleFr : item.titleEn;
  const content = lang === 'fr' ? item.contentFr : item.contentEn;

  return (
    <div className="min-h-screen bg-background">
      <LausNavbar lang={lang} onLangChange={setLang} variant="light" />
      <article className="container-site pt-32 pb-24" style={{ paddingTop: 'calc(var(--section-spacing) + 80px)', paddingBottom: 'var(--section-spacing)' }}>
        <Link to="/#news" className="font-body text-sm text-muted-foreground hover:text-foreground mb-8 inline-block">
          ← {lang === 'fr' ? 'Retour aux actualités' : 'Back to news'}
        </Link>
        <div className="max-w-3xl">
          <div className="aspect-[16/9] overflow-hidden mb-8">
            <img
              src={item.image}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-label text-muted-foreground mb-2">{item.date}</p>
          <h1 className="heading-display mb-8">{title}</h1>
          <div className="font-body text-base text-foreground leading-relaxed whitespace-pre-line">
            {content}
          </div>
        </div>
      </article>
      <LausFooter lang={lang} />
    </div>
  );
};

export default NewsDetail;
