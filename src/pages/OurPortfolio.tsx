import { useSearchParams, Link } from 'react-router-dom';
import type { Lang } from '@/lib/i18n';
import { t } from '@/lib/i18n';
import LausNavbar from '@/components/LausNavbar';
import LausFooter from '@/components/LausFooter';
import PageEnter from '@/components/PageEnter';
import CountUpStat from '@/components/CountUpStat';
import Reveal from '@/components/Reveal';
import { useState } from 'react';
import parisPortfolio from '@/assets/paris-portfolio.png';

const OurPortfolio = () => {
  const [searchParams] = useSearchParams();
  const langParam = searchParams.get('lang');
  const [lang, setLang] = useState<Lang>(langParam === 'en' ? 'en' : 'fr');
  const tr = t(lang);

  const stats = [
    { value: tr.portfolio.stat1, label: tr.portfolio.stat1Label },
    { value: tr.portfolio.stat2, label: tr.portfolio.stat2Label },
    { value: tr.portfolio.stat3, label: tr.portfolio.stat3Label },
  ];

  return (
    <div className="min-h-screen bg-background">
      <LausNavbar lang={lang} onLangChange={setLang} variant="light" />
      <div className="container-site" style={{ paddingTop: 'calc(var(--section-spacing) + 80px)', paddingBottom: 'var(--section-spacing)' }}>
        <PageEnter>
          <Link to="/" className="font-body text-sm text-muted-foreground hover:text-foreground mb-8 inline-block">
            ← {lang === 'fr' ? "Retour à l'accueil" : 'Back to home'}
          </Link>
          <Reveal>
            <h1 className="heading-display mb-8">{tr.portfolio.title}</h1>
          </Reveal>
          <Reveal delayMs={80}>
            <p className="font-body text-base text-foreground leading-relaxed max-w-2xl mb-16">
              {tr.portfolio.pageIntro}
            </p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div className="aspect-[4/5] md:aspect-[4/3] overflow-hidden">
              <img
                src={parisPortfolio}
                alt={tr.portfolio.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-10">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-heading text-4xl font-semibold text-foreground">
                    <CountUpStat value={stat.value} />
                  </p>
                  <p className="font-body text-sm text-muted-foreground mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </PageEnter>
      </div>
      <LausFooter lang={lang} />
    </div>
  );
};

export default OurPortfolio;
