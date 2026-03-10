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
import { IconHandsCircle, IconDiamond, IconHouse } from '@/components/icons/AboutValuesIcons';

const About = () => {
  const [searchParams] = useSearchParams();
  const langParam = searchParams.get('lang');
  const [lang, setLang] = useState<Lang>(langParam === 'en' ? 'en' : 'fr');
  const [teamBioOpen, setTeamBioOpen] = useState(false);
  const tr = t(lang);

  const overviewItems = [
    {
      icon: IconHandsCircle,
      value: tr.about.overview1Value,
      label: tr.about.overview1Label,
      sub: tr.about.overview1Sub,
    },
    {
      icon: IconDiamond,
      value: tr.about.overview2Value,
      label: tr.about.overview2Label,
      sub: tr.about.overview2Sub,
    },
    {
      icon: IconHouse,
      value: tr.about.overview3Value,
      label: tr.about.overview3Label,
      sub: tr.about.overview3Sub,
    },
  ];

  return (
    <div className="bg-background">
      <LausNavbar lang={lang} onLangChange={setLang} variant="light" />

      <PageEnter>
      {/* Section 1: Intro */}
      <section className="flex flex-col items-center justify-center px-6 pt-24 pb-12" style={{ paddingTop: 'calc(80px + var(--section-spacing-tight))', paddingBottom: 'var(--section-spacing-tight)' }}>
        <Link to="/" className="font-body text-sm text-muted-foreground hover:text-foreground mb-8">
          ← {tr.legal.backToHome}
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

      {/* Section 2: Overview (3 valeurs) */}
      <section className="flex flex-col items-center justify-center px-6 py-12" style={{ paddingTop: 'var(--section-spacing-tight)', paddingBottom: 'var(--section-spacing-tight)' }}>
        <Reveal>
          <h2 className="heading-display mb-10 text-center">
            {tr.about.overviewTitle}
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 max-w-4xl mx-auto w-full">
          {overviewItems.map((item, index) => (
            <Reveal key={item.label} delayMs={80 + index * 60}>
              <div className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center w-14 h-14 rounded border border-border text-foreground mb-5">
                  <item.icon className="w-8 h-8" />
                </div>
                <p className="font-heading text-4xl font-semibold text-foreground">
                  <CountUpWhenVisible value={item.value} />
                </p>
                <p className="font-body text-base text-muted-foreground mt-2">
                  {item.label}
                </p>
                <p className="font-body text-sm text-muted-foreground mt-1">
                  {item.sub}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Section 3: The Team */}
      <section className="flex flex-col items-center justify-center px-6 py-12" style={{ paddingTop: 'var(--section-spacing-tight)', paddingBottom: 'var(--section-spacing)' }}>
        <Reveal>
          <h2 className="heading-display mb-10 text-center">
            {tr.about.teamTitle}
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 max-w-4xl w-full items-center">
          <Reveal delayMs={80} className="md:col-span-4 flex flex-col items-center md:items-end text-center md:text-right">
            <button
              type="button"
              onClick={() => setTeamBioOpen(true)}
              className="aspect-[3/4] w-full max-w-xs overflow-hidden rounded-none border-0 bg-transparent p-0 cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label={tr.about.findOutMore}
            >
              <img
                src={ghislainPhoto}
                alt="Ghislain Bussière"
                className="w-full h-full object-cover"
              />
            </button>
            <p className="text-label mt-4 mb-2">Ghislain Bussière</p>
            <p className="font-body text-sm text-muted-foreground">{tr.about.role}</p>
          </Reveal>
          <div className="md:col-span-8 text-center md:text-left">
            <Reveal delayMs={120}>
              <button
                type="button"
                onClick={() => setTeamBioOpen(true)}
                className="text-left w-full group"
              >
                <p className="font-body text-base text-foreground leading-relaxed group-hover:text-primary transition-colors">{tr.about.bio}</p>
                <span className="inline-block mt-3 font-body text-sm font-medium text-black underline underline-offset-2">
                  {tr.about.findOutMore}
                </span>
              </button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Full-screen bio panel: slides in from the right */}
      <div
        className={`fixed inset-0 z-[60] flex transition-transform duration-300 ease-out ${teamBioOpen ? '' : 'pointer-events-none'}`}
        style={{ transform: teamBioOpen ? 'translateX(0)' : 'translateX(100%)' }}
        aria-hidden={!teamBioOpen}
      >
        <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 bg-neutral-900">
          {/* Left: full-height photo */}
          <div className="relative h-[40vh] md:h-full w-full overflow-hidden">
            <img
              src={ghislainPhoto}
              alt="Ghislain Bussière"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
          </div>
          {/* Right: dark background + large text */}
          <div className="relative flex flex-col md:overflow-y-auto">
            <div className="flex-1 flex flex-col justify-center px-8 py-12 md:px-14 md:py-16 lg:px-20">
              <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-semibold text-white mb-2">
                Ghislain Bussière
              </h2>
              <p className="font-body text-lg text-neutral-300 mb-8">{tr.about.role}</p>
              <div className="font-body text-lg md:text-xl lg:text-2xl text-neutral-200 leading-relaxed whitespace-pre-line">
                {tr.about.bioFull}
              </div>
            </div>
            <button
              type="button"
              onClick={() => setTeamBioOpen(false)}
              className="absolute top-6 right-6 md:top-8 md:right-8 p-2 text-neutral-400 hover:text-white transition-colors rounded-md focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label={tr.about.close}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      </PageEnter>

      <LausFooter lang={lang} />
    </div>
  );
};

export default About;
