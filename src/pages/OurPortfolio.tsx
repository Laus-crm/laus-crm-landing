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

      {/* Lien retour : même structure que About/Activities/Contact pour alignement identique */}
      <section className="container-site pt-32 pb-20 md:pt-40 md:pb-28">
        <Link to="/" className="font-body text-sm text-muted-foreground hover:text-foreground mb-10 inline-block">
          ← {tr.legal.backToHome}
        </Link>
      </section>

      <PageEnter>
        {/* Hero : image + titre + stats */}
        <section className="relative flex flex-col overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center grayscale brightness-95"
            style={{
              backgroundImage: `url(${parisPortfolio})`,
            }}
            aria-hidden
          />
          <div className="absolute inset-0 bg-white/70" aria-hidden />
          <div className="absolute inset-0 bg-background/30" aria-hidden />
          <div className="relative z-10 container-site pt-6 pb-12 md:pb-16">
            <Reveal>
              <h1 className="heading-display text-foreground mb-6 md:mb-8 text-center">
                {tr.portfolio.title}
              </h1>
            </Reveal>
            <Reveal delayMs={80}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 max-w-4xl mx-auto">
                {stats.map((stat, i) => (
                  <div
                    key={stat.label}
                    className={`flex flex-col items-center sm:items-center text-center px-6 py-4 ${i > 0 ? 'sm:border-l border-border' : ''}`}
                  >
                    <p className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground tabular-nums">
                      <CountUpStat value={stat.value} />
                    </p>
                    <p className="font-body text-sm text-foreground/80 mt-2">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Intro texte sous le hero (pageIntro) */}
        <section className="container-site py-16 md:py-20">
          <div className="max-w-3xl mx-auto">
            <Reveal>
              <p className="font-body text-lg text-foreground leading-relaxed">
                {tr.portfolio.pageIntro}
              </p>
            </Reveal>
          </div>
        </section>
      </PageEnter>

      <LausFooter lang={lang} />
    </div>
  );
};

export default OurPortfolio;
