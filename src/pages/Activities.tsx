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
          ← {tr.legal.backToHome}
        </Link>
        <Reveal>
          <h1 className="heading-display mb-8 text-center">{tr.activities.title}</h1>
        </Reveal>
        <Reveal delayMs={80}>
          <p className="font-body text-base md:text-lg text-foreground leading-relaxed max-w-2xl mx-auto text-center">
            {tr.activities.pageIntro}
          </p>
        </Reveal>
      </section>

      {/* Activity blocks: 3 columns on one line (image, title, line, segments label, segment, content) */}
      <section className="container-site pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {activityKeys.map((key, index) => (
            <Reveal key={key} delayMs={index * 80} className="flex flex-col">
              <div
                className={`flex flex-col border-border transition-transform duration-200 ease-out hover:-translate-y-1.5 ${index > 0 ? 'border-t md:border-t-0 md:border-l md:pl-8' : ''} ${index < 2 ? 'md:pr-8' : ''} py-8 md:py-10`}
              >
                {/* Image: fixed height so all three columns have identical dimensions; object-cover crops sides to fill */}
                <div className="w-full h-[200px] sm:h-[240px] md:h-[220px] lg:h-[260px] overflow-hidden mb-6 bg-muted">
                  <img
                    src={activityImages[key]}
                    alt={tr.activities[key].title}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                {/* Title */}
                <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground tracking-wide mb-3">
                  {tr.activities[key].title}
                </h2>
                {/* Thin horizontal line */}
                <div className="w-12 h-px bg-border mb-4" aria-hidden />
                {/* Segment name */}
                <p className="font-body text-base font-semibold uppercase tracking-wide text-foreground mb-4">
                  {tr.activities[key].segment}
                </p>
                {/* Description */}
                <p className="font-body text-base md:text-lg text-foreground leading-relaxed">
                  {tr.activities[key].content}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
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
