import { useSearchParams, Link } from 'react-router-dom';
import type { Lang } from '@/lib/i18n';
import { t } from '@/lib/i18n';
import LausNavbar from '@/components/LausNavbar';
import LausFooter from '@/components/LausFooter';
import PageEnter from '@/components/PageEnter';
import Reveal from '@/components/Reveal';
import { useState } from 'react';
import parisPortfolio from '@/assets/paris-portfolio.png';

const Contact = () => {
  const [searchParams] = useSearchParams();
  const langParam = searchParams.get('lang');
  const [lang, setLang] = useState<Lang>(langParam === 'en' ? 'en' : 'fr');
  const tr = t(lang);

  return (
    <div className="min-h-screen bg-background">
      <LausNavbar lang={lang} onLangChange={setLang} variant="light" />

      {/* Full-height block: Paris image as background, contact info on the left */}
      <section className="relative min-h-[calc(100vh-80px)] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${parisPortfolio})` }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-background/75 backdrop-blur-[2px]" aria-hidden />
        <div className="relative z-10 container-site pt-32 pb-16">
          <PageEnter>
          <Link
            to="/"
            className="font-body text-sm text-muted-foreground hover:text-foreground mb-10 inline-block"
          >
            ← {tr.legal.backToHome}
          </Link>
          <div className="max-w-md">
            <h1 className="font-heading text-4xl md:text-5xl font-semibold tracking-wide text-foreground mb-2">
              {tr.contact.city}
            </h1>
            <p className="font-body text-sm text-muted-foreground mb-8">
              ({tr.contact.headquarter})
            </p>
            <div className="font-body text-base text-foreground leading-relaxed whitespace-pre-line">
              {tr.contact.addressLine}
            </div>
            <Reveal delayMs={160}>
              <p className="font-body text-base text-foreground mt-6">
                <a href={`tel:${tr.contact.phone.replace(/\s/g, '').replace('(0)', '')}`} className="hover:text-primary transition-colors">
                  {tr.contact.phone}
                </a>
              </p>
            </Reveal>
            <Reveal delayMs={200}>
              <p className="font-body text-base text-foreground mt-2">
                <a href={`mailto:${tr.contact.email}`} className="text-foreground hover:underline">
                  {tr.contact.email}
                </a>
              </p>
            </Reveal>
          </div>
          </PageEnter>
        </div>
      </section>

      <LausFooter lang={lang} />
    </div>
  );
};

export default Contact;
