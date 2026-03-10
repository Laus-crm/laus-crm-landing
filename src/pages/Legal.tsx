import { useSearchParams, Link } from 'react-router-dom';
import type { Lang } from '@/lib/i18n';
import { t } from '@/lib/i18n';
import LausNavbar from '@/components/LausNavbar';
import LausFooter from '@/components/LausFooter';
import PageEnter from '@/components/PageEnter';
import Reveal from '@/components/Reveal';
import { useState } from 'react';

const Legal = () => {
  const [searchParams] = useSearchParams();
  const langParam = searchParams.get('lang');
  const [lang, setLang] = useState<Lang>(langParam === 'en' ? 'en' : 'fr');
  const tr = t(lang);

  return (
    <div className="min-h-screen bg-background">
      <LausNavbar lang={lang} onLangChange={setLang} variant="light" />
      <div className="container-site max-w-3xl" style={{ paddingTop: 'calc(var(--section-spacing) + 80px)', paddingBottom: 'var(--section-spacing)' }}>
        <PageEnter>
        <Link to="/" className="font-body text-sm text-muted-foreground hover:text-foreground mb-8 inline-block">
          ← {tr.legal.backToHome}
        </Link>
        <Reveal>
          <h1 className="heading-display mb-12">{tr.legal.title}</h1>
        </Reveal>

        <Reveal>
          <section className="mb-12">
            <h2 className="heading-section text-foreground mb-4">{tr.legal.mentionsTitle}</h2>
            <p className="font-body text-sm text-foreground leading-relaxed whitespace-pre-line">
              {tr.legal.mentionsContent}
            </p>
          </section>
        </Reveal>

        <Reveal>
          <section id="regulatory" className="mb-12">
            <h2 className="heading-section text-foreground mb-4">{tr.legal.regulatoryTitle}</h2>
            <p className="font-body text-sm text-foreground leading-relaxed whitespace-pre-line">
              {tr.legal.regulatoryContent}
            </p>
          </section>
        </Reveal>

        <Reveal>
          <section id="data-protection">
            <h2 className="heading-section text-foreground mb-4">{tr.legal.dataProtectionTitle}</h2>
            <p className="font-body text-sm text-foreground leading-relaxed whitespace-pre-line">
              {tr.legal.dataProtectionContent}
            </p>
          </section>
        </Reveal>
        </PageEnter>
      </div>
      <LausFooter lang={lang} />
    </div>
  );
};

export default Legal;
