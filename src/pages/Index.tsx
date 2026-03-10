import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Lang } from '@/lib/i18n';
import { t } from '@/lib/i18n';
import LausNavbar from '@/components/LausNavbar';
import HeroSlider from '@/components/HeroSlider';
import NewsSlider from '@/components/NewsSlider';
import LausFooter from '@/components/LausFooter';
import Reveal from '@/components/Reveal';

const Index = () => {
  const [lang, setLang] = useState<Lang>('fr');
  const tr = t(lang);

  return (
    <div className="min-h-screen bg-background">
      <LausNavbar lang={lang} onLangChange={setLang} />
      <HeroSlider lang={lang} />
      <section id="activities" className="container-site" style={{ paddingTop: 'var(--section-spacing)', paddingBottom: 'var(--section-spacing)' }}>
        <div className="section-divider mb-16" />
        <Reveal>
          <h2 className="heading-display mb-8">{tr.activities.title}</h2>
        </Reveal>
        <Reveal delayMs={80}>
          <p className="font-body text-base text-muted-foreground max-w-xl mb-10">{tr.activities.pageIntro}</p>
        </Reveal>
        <Reveal delayMs={120}>
          <Link to={`/activities?lang=${lang}`} className="font-body text-sm font-medium tracking-[0.15em] text-foreground hover:text-muted-foreground transition-colors">
            {tr.activities.cta} →
          </Link>
        </Reveal>
      </section>
      <section id="portfolio" className="container-site" style={{ paddingTop: 'var(--section-spacing)', paddingBottom: 'var(--section-spacing)' }}>
        <div className="section-divider mb-16" />
        <Reveal>
          <h2 className="heading-display mb-8">{tr.portfolio.title}</h2>
        </Reveal>
        <Reveal delayMs={80}>
          <p className="font-body text-base text-muted-foreground max-w-xl mb-10">{tr.portfolio.pageIntro}</p>
        </Reveal>
        <Reveal delayMs={120}>
          <Link to={`/our-portfolio?lang=${lang}`} className="font-body text-sm font-medium tracking-[0.15em] text-foreground hover:text-muted-foreground transition-colors">
            {tr.portfolio.cta} →
          </Link>
        </Reveal>
      </section>
      <NewsSlider lang={lang} />
      <LausFooter lang={lang} />
    </div>
  );
};

export default Index;
