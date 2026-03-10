import { useState } from 'react';
import { type Lang, t } from '@/lib/i18n';
import adviseImg from '@/assets/advise.png';
import manageImg from '@/assets/manage.png';
import transactImg from '@/assets/transact.png';
import Reveal from '@/components/Reveal';

const activityImages = {
  advise: adviseImg,
  manage: manageImg,
  transact: transactImg,
} as const;

interface ActivitiesSectionProps {
  lang: Lang;
}

export default function ActivitiesSection({ lang }: ActivitiesSectionProps) {
  const tr = t(lang);
  const tabs = [
    { key: 'advise' as const, label: tr.activities.advise.title },
    { key: 'manage' as const, label: tr.activities.manage.title },
    { key: 'transact' as const, label: tr.activities.transact.title },
  ];
  const [active, setActive] = useState<'advise' | 'manage' | 'transact'>('advise');

  return (
    <section id="activities" className="container-site" style={{ paddingTop: 'var(--section-spacing)', paddingBottom: 'var(--section-spacing)' }}>
      <div className="section-divider mb-16" />
      <Reveal>
        <h2 className="heading-display mb-16">{tr.activities.title}</h2>
      </Reveal>

      <Reveal delayMs={60} className="flex gap-12 mb-12 border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActive(tab.key)}
            className={`font-body text-sm font-medium tracking-[0.15em] pb-4 transition-colors duration-200 relative ${
              active === tab.key ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab.label}
            <span
              className={`absolute bottom-0 left-0 right-0 h-[2px] bg-primary transition-opacity duration-200 ${
                active === tab.key ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </button>
        ))}
      </Reveal>

      <div key={active} className="animate-fade-in grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
        <Reveal className="md:col-span-5 aspect-[4/3] overflow-hidden">
          <img
            src={activityImages[active]}
            alt={tr.activities[active].title}
            className="w-full h-full object-cover"
          />
        </Reveal>
        <Reveal delayMs={120} className="md:col-span-7">
          <p className="font-body text-base text-foreground leading-relaxed">
            {tr.activities[active].content}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
