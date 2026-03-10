import { useSearchParams, Link } from 'react-router-dom';
import type { Lang } from '@/lib/i18n';
import { t } from '@/lib/i18n';
import LausNavbar from '@/components/LausNavbar';
import LausFooter from '@/components/LausFooter';
import PageEnter from '@/components/PageEnter';
import Reveal from '@/components/Reveal';
import { useState } from 'react';
import adviseImg from '@/assets/advise.png';
import manageImg from '@/assets/manage.png';
import transactImg from '@/assets/transact.png';

const activityKeys = ['advise', 'manage', 'transact'] as const;
const activityImages = {
  advise: adviseImg,
  manage: manageImg,
  transact: transactImg,
};

const Activities = () => {
  const [searchParams] = useSearchParams();
  const langParam = searchParams.get('lang');
  const [lang, setLang] = useState<Lang>(langParam === 'en' ? 'en' : 'fr');
  const tr = t(lang);

  return (
    <div className="bg-background">
      <LausNavbar lang={lang} onLangChange={setLang} variant="light" />

      <PageEnter>
      {/* Hero: title + intro (SFO "What We Do" style) */}
      <section className="container-site pt-32 pb-20 md:pt-40 md:pb-28">
        <Link
          to="/"
          className="font-body text-sm text-muted-foreground hover:text-foreground mb-10 inline-block"
        >
          ← {lang === 'fr' ? "Retour à l'accueil" : 'Back to home'}
        </Link>
        <Reveal>
          <h1 className="heading-display mb-8">{tr.activities.title}</h1>
        </Reveal>
        <Reveal delayMs={80}>
          <p className="font-body text-base md:text-lg text-foreground leading-relaxed max-w-2xl">
            {tr.activities.pageIntro}
          </p>
        </Reveal>
      </section>

      {/* Activity blocks: image + title + content (SFO strategy blocks style) */}
      <section className="container-site pb-24">
        {activityKeys.map((key, index) => {
          const imageFirst = index % 2 === 0;
          return (
            <div key={key} className="border-t border-border first:border-t-0">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 py-16 md:py-24 items-start">
                <div className={imageFirst ? 'md:col-span-5' : 'order-2 md:order-none md:col-span-5 md:col-start-8'}>
                  <Reveal>
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={activityImages[key]}
                        alt={tr.activities[key].title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </Reveal>
                </div>
                <div className={imageFirst ? 'md:col-span-7 md:col-start-6' : 'order-1 md:order-none md:col-span-7'}>
                  <Reveal>
                    <h2 className="font-heading text-2xl font-semibold tracking-wide text-foreground mb-6">
                      {tr.activities[key].title}
                    </h2>
                  </Reveal>
                  <Reveal delayMs={80}>
                    <p className="font-body text-base text-foreground leading-relaxed">
                      {tr.activities[key].content}
                    </p>
                  </Reveal>
                </div>
              </div>
            </div>
          );
        })}
      </section>
      </PageEnter>

      {/* CTA to portfolio */}
      <section className="container-site pb-24 text-center">
        <Link
          to={`/our-portfolio?lang=${lang}`}
          className="font-body text-sm font-medium tracking-[0.15em] text-foreground hover:text-muted-foreground transition-colors"
        >
          {tr.portfolio.cta} →
        </Link>
      </section>

      <LausFooter lang={lang} />
    </div>
  );
};

export default Activities;
