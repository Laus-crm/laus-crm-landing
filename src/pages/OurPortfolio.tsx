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

      <PageEnter>
        <div className="container-site" style={{ paddingTop: 'calc(80px + var(--section-spacing-tight))', paddingBottom: 'var(--section-spacing)' }}>
          <Link to="/" className="font-body text-sm text-muted-foreground hover:text-foreground mb-8 inline-block">
            ← {lang === 'fr' ? "Retour à l'accueil" : 'Back to home'}
          </Link>

          <div className="max-w-3xl mb-16">
            <Reveal>
              <h1 className="heading-display mb-6">{tr.portfolio.title}</h1>
            </Reveal>
            <Reveal delayMs={80}>
              <p className="font-body text-lg text-foreground leading-relaxed">
                {tr.portfolio.pageIntro}
              </p>
            </Reveal>
          </div>

          {/* Stats: 3 colonnes, fond discret */}
          <Reveal delayMs={120}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-border rounded-lg overflow-hidden mb-16">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className="bg-muted/30 px-6 py-8 sm:py-10 text-center sm:text-left"
                >
                  <p className="font-heading text-3xl sm:text-4xl font-semibold text-foreground tabular-nums">
                    <CountUpStat value={stat.value} />
                  </p>
                  <p className="font-body text-sm text-muted-foreground mt-2 max-w-[200px] sm:max-w-none mx-auto sm:mx-0">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Image pleine largeur, cadre discret */}
          <Reveal delayMs={160}>
            <figure className="aspect-[16/10] sm:aspect-[21/9] overflow-hidden rounded-lg bg-muted">
              <img
                src={parisPortfolio}
                alt={tr.portfolio.title}
                className="w-full h-full object-cover"
              />
            </figure>
          </Reveal>
        </div>
      </PageEnter>

      <LausFooter lang={lang} />
    </div>
  );
};

export default OurPortfolio;
