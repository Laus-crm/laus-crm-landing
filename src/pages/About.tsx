import { useSearchParams, Link } from 'react-router-dom';
import type { Lang } from '@/lib/i18n';
import { t } from '@/lib/i18n';
import LausNavbar from '@/components/LausNavbar';
import LausFooter from '@/components/LausFooter';
import PageEnter from '@/components/PageEnter';
import Reveal from '@/components/Reveal';
import CountUpWhenVisible from '@/components/CountUpWhenVisible';
import { useState } from 'react';
import ghislainPhoto from '@/assets/ghislain-bussiere.png';
import { ArrowLeftRight, Building2, BarChart3 } from 'lucide-react';

const About = () => {
  const [searchParams] = useSearchParams();
  const langParam = searchParams.get('lang');
  const [lang, setLang] = useState<Lang>(langParam === 'en' ? 'en' : 'fr');
  const tr = t(lang);

  const overviewItems = [
    {
      icon: ArrowLeftRight,
      value: tr.about.overview1Value,
      label: tr.about.overview1Label,
      sub: tr.about.overview1Sub,
    },
    {
      icon: Building2,
      value: tr.about.overview2Value,
      label: tr.about.overview2Label,
      sub: tr.about.overview2Sub,
    },
    {
      icon: BarChart3,
      value: tr.about.overview3Value,
      label: tr.about.overview3Label,
      sub: tr.about.overview3Sub,
    },
  ];

  return (
    <div className="bg-background">
      <LausNavbar lang={lang} onLangChange={setLang} variant="light" />

      <PageEnter>
      {/* Section 1: Intro - full page, centered */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16">
        <Link to="/" className="font-body text-sm text-muted-foreground hover:text-foreground mb-8">
          ← {lang === 'fr' ? "Retour à l'accueil" : 'Back to home'}
        </Link>
        <Reveal>
          <h1 className="heading-display mb-10 text-center">{tr.about.title}</h1>
        </Reveal>
        <div className="max-w-2xl mx-auto space-y-6 text-center">
          <Reveal delayMs={80}>
            <p className="font-body text-base text-foreground leading-relaxed">
              {tr.about.intro1}
            </p>
          </Reveal>
          <Reveal delayMs={120}>
            <p className="font-body text-base text-foreground leading-relaxed">
              {tr.about.intro2}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Section 2: Overview - full page, centered */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 py-16">
        <Reveal>
          <h2 className="font-heading text-2xl font-semibold text-foreground mb-12 tracking-wide text-center">
            {tr.about.overviewTitle}
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 max-w-4xl mx-auto w-full">
          {overviewItems.map((item, index) => (
            <Reveal key={item.label} delayMs={80 + index * 60}>
              <div className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center w-12 h-12 rounded border border-border text-muted-foreground mb-4">
                  <item.icon className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <p className="font-heading text-3xl font-semibold text-foreground">
                  <CountUpWhenVisible value={item.value} />
                </p>
                <p className="font-body text-sm text-muted-foreground mt-1">
                  {item.label}
                </p>
                <p className="font-body text-xs text-muted-foreground mt-2">
                  {item.sub}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Section 3: The Team - full page, centered */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 py-16">
        <Reveal>
          <h2 className="font-heading text-2xl font-semibold text-foreground mb-12 tracking-wide text-center">
            {tr.about.teamTitle}
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 max-w-4xl w-full items-center">
          <Reveal delayMs={80} className="md:col-span-4 flex flex-col items-center md:items-end text-center md:text-right">
            <div className="aspect-[3/4] w-full max-w-xs overflow-hidden">
              <img
                src={ghislainPhoto}
                alt="Ghislain Bussière"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-label mt-4 mb-2">Ghislain Bussière</p>
            <p className="font-body text-sm text-muted-foreground">{tr.about.role}</p>
          </Reveal>
          <div className="md:col-span-8 space-y-6 text-center md:text-left">
            <Reveal delayMs={120}>
              <p className="font-body text-base text-foreground leading-relaxed">{tr.about.bio}</p>
            </Reveal>
            <Reveal delayMs={160}>
              <p className="font-body text-sm text-muted-foreground">{tr.about.experience}</p>
            </Reveal>
            <Reveal delayMs={200}>
              <p className="font-body text-sm text-muted-foreground">{tr.about.education}</p>
            </Reveal>
          </div>
        </div>
      </section>
      </PageEnter>

      <LausFooter lang={lang} />
    </div>
  );
};

export default About;
