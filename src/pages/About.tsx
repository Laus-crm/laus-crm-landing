import { useSearchParams, Link } from 'react-router-dom';
import type { Lang } from '@/lib/i18n';
import { t } from '@/lib/i18n';
import LausNavbar from '@/components/LausNavbar';
import LausFooter from '@/components/LausFooter';
import PageEnter from '@/components/PageEnter';
import Reveal from '@/components/Reveal';
import CountUpWhenVisible from '@/components/CountUpWhenVisible';
import { useState, useEffect } from 'react';
import ghislainPhoto from '@/assets/ghislain-bussiere.png';
import { IconHandsCircle, IconDiamond, IconHouse } from '@/components/icons/AboutValuesIcons';

const About = () => {
  const [searchParams] = useSearchParams();
  const langParam = searchParams.get('lang');
  const [lang, setLang] = useState<Lang>(langParam === 'en' ? 'en' : 'fr');
  const [teamBioOpen, setTeamBioOpen] = useState(false);
  const tr = t(lang);

  useEffect(() => {
    if (teamBioOpen) {
      window.scrollTo(0, 0);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [teamBioOpen]);

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
      <section className="container-site pt-32 pb-20 md:pt-40 md:pb-28">
        <Link to="/" className="font-body text-sm text-muted-foreground hover:text-foreground mb-10 inline-block">
          ← {tr.legal.backToHome}
        </Link>
        <div className="flex flex-col items-center justify-center max-w-2xl mx-auto">
        <Reveal>
          <h1 className="heading-display mb-10 text-center">{tr.about.title}</h1>
        </Reveal>
        <div className="space-y-6 text-center w-full">
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

      {/* Full-screen bio panel: covers entire viewport (above navbar/footer), slides in from the right */}
      <div
        className={`fixed inset-0 z-[100] flex transition-transform duration-300 ease-out ${teamBioOpen ? '' : 'pointer-events-none'}`}
        style={{ transform: teamBioOpen ? 'translateX(0)' : 'translateX(100%)' }}
        aria-hidden={!teamBioOpen}
      >
        <div className="w-full h-full min-h-screen grid grid-cols-1 md:grid-cols-2 bg-neutral-900 relative">
          {/* Close: top right of entire panel */}
          <button
            type="button"
            onClick={() => setTeamBioOpen(false)}
            className="absolute top-6 right-6 md:top-8 md:right-8 z-10 flex items-center gap-2 py-2 px-3 rounded-md text-neutral-300 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label={tr.about.close}
          >
            <span className="font-body text-sm">{tr.about.close}</span>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Left: photo rapetissée avec bordures couleur background */}
          <div className="flex items-center justify-center p-8 md:p-12">
            <div className="w-full max-w-sm aspect-[3/4] overflow-hidden border-[10px] border-neutral-900 bg-neutral-900 shadow-xl">
              <img
                src={ghislainPhoto}
                alt="Ghislain Bussière"
                className="w-full h-full object-cover object-center"
              />
            </div>
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
          </div>
        </div>
      </div>
      </PageEnter>

      <LausFooter lang={lang} />
    </div>
  );
};

export default About;
