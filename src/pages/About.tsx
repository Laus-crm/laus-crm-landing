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

const DRAWER_TRANSITION_MS = 300;

/** Side Panel (drawer) : 90% mobile / 40% desktop, slide depuis la droite, backdrop au clic ferme. */
const LINKEDIN_URL = 'https://www.linkedin.com/in/ghislain-bussiere/';

function GhislainBioDrawer({
  open,
  onClose,
  photo,
  name,
  role,
  bioFull,
  closeLabel,
  linkedinLabel,
}: {
  open: boolean;
  onClose: () => void;
  photo: string;
  name: string;
  role: string;
  bioFull: string;
  closeLabel: string;
  linkedinLabel: string;
}) {
  const [slidIn, setSlidIn] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (!open) {
      setSlidIn(false);
      setIsClosing(false);
      document.body.style.overflow = '';
      return;
    }
    document.body.style.overflow = 'hidden';
    const t = setTimeout(() => setSlidIn(true), 20);
    return () => clearTimeout(t);
  }, [open]);

  const handleClose = () => {
    if (!open) return;
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, DRAWER_TRANSITION_MS);
  };

  useEffect(() => {
    const onEscape = (e: KeyboardEvent) => e.key === 'Escape' && handleClose();
    if (open) window.addEventListener('keydown', onEscape);
    return () => window.removeEventListener('keydown', onEscape);
  }, [open]);

  if (!open) return null;

  const panelTransform = isClosing ? 'translateX(100%)' : slidIn ? 'translateX(0)' : 'translateX(100%)';
  const backdropOpacity = isClosing ? 0 : 1;

  return (
    <>
      <div
        className="fixed inset-0 z-[90] bg-black/50 transition-opacity duration-300 ease-out"
        style={{ opacity: backdropOpacity }}
        onClick={handleClose}
        onKeyDown={(e) => e.key === 'Enter' && handleClose()}
        role="button"
        tabIndex={0}
        aria-label={closeLabel}
      />
      <aside
        className="fixed top-0 right-0 z-[100] h-full w-[90%] md:w-[40%] max-w-lg bg-background shadow-xl flex flex-col transition-transform duration-300 ease-out"
        style={{ transform: panelTransform }}
        role="dialog"
        aria-modal="true"
        aria-label={name}
      >
        <div className="flex-1 overflow-y-auto">
          <div className="flex justify-end p-4">
            <button
              type="button"
              onClick={handleClose}
              className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label={closeLabel}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex justify-center px-6 pb-4">
            <div className="w-full max-w-[240px] aspect-[3/4] overflow-hidden">
              <img src={photo} alt={name} className="w-full h-full object-cover object-top" />
            </div>
          </div>
          <div className="text-center px-6 pb-4">
            <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground">{name}</h2>
            <p className="font-body text-sm font-medium uppercase tracking-wider text-muted-foreground mt-1">{role}</p>
          </div>
          <div className="px-6 pb-10">
            <p className="font-body text-base text-foreground leading-relaxed whitespace-pre-line">
              {bioFull}
            </p>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 font-body text-sm font-medium text-black hover:underline underline-offset-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              {linkedinLabel}
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}

const About = () => {
  const [searchParams] = useSearchParams();
  const langParam = searchParams.get('lang');
  const [lang, setLang] = useState<Lang>(langParam === 'en' ? 'en' : 'fr');
  const [bioDrawerOpen, setBioDrawerOpen] = useState(false);
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
                <p className="font-body text-lg text-foreground leading-relaxed">
                  {tr.about.intro1}
                </p>
              </Reveal>
              <Reveal delayMs={120}>
                <p className="font-body text-lg text-foreground leading-relaxed">
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

        {/* Section 3: The Team — clic sur photo ou texte ouvre le drawer (bio complète) */}
        <section
          className="container-site"
          style={{ paddingTop: 'var(--section-spacing-tight)', paddingBottom: 'var(--section-spacing)' }}
        >
          <Reveal>
            <h2 className="heading-display mb-10 text-center">
              {tr.about.teamTitle}
            </h2>
          </Reveal>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
              <Reveal delayMs={80} className="flex justify-center md:justify-end">
                <button
                  type="button"
                  onClick={() => setBioDrawerOpen(true)}
                  className="w-full max-w-xs aspect-[3/4] overflow-hidden rounded-sm border-0 bg-transparent p-0 cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  aria-label={tr.about.findOutMore}
                >
                  <img
                    src={ghislainPhoto}
                    alt="Ghislain Bussière"
                    className="w-full h-full object-cover object-top"
                  />
                </button>
              </Reveal>
              <div className="text-center md:text-left">
                <Reveal delayMs={120}>
                  <h3 className="font-heading text-2xl md:text-3xl font-semibold tracking-wide text-foreground mb-2">
                    Ghislain Bussière
                  </h3>
                  <p className="font-body text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground mb-4">
                    {tr.about.role}
                  </p>
                  <button
                    type="button"
                    onClick={() => setBioDrawerOpen(true)}
                    className="text-left w-full group"
                  >
                    <p className="font-body text-base text-foreground leading-relaxed group-hover:text-primary transition-colors">
                      {tr.about.bio}
                    </p>
                    <span className="inline-block mt-3 font-body text-sm font-medium text-black underline underline-offset-2">
                      {tr.about.findOutMore}
                    </span>
                  </button>
                  <a
                    href={LINKEDIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-4 font-body text-sm font-medium text-black hover:underline underline-offset-2"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    {tr.about.linkedin}
                  </a>
                </Reveal>
              </div>
            </div>
          </div>
        </section>
      </PageEnter>

      <GhislainBioDrawer
        open={bioDrawerOpen}
        onClose={() => setBioDrawerOpen(false)}
        photo={ghislainPhoto}
        name="Ghislain Bussière"
        role={tr.about.role}
        bioFull={tr.about.bioFull}
        closeLabel={tr.about.close}
        linkedinLabel={tr.about.linkedin}
      />

      <LausFooter lang={lang} />
    </div>
  );
};

export default About;
