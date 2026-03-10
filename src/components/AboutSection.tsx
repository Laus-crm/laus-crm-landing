import { type Lang, t } from '@/lib/i18n';
import ghislainPhoto from '@/assets/ghislain-bussiere.png';
import Reveal from '@/components/Reveal';

interface AboutSectionProps {
  lang: Lang;
}

export default function AboutSection({ lang }: AboutSectionProps) {
  const tr = t(lang);

  return (
    <section id="about" className="container-site" style={{ paddingTop: 'var(--section-spacing)', paddingBottom: 'var(--section-spacing)' }}>
      <Reveal>
        <h2 className="heading-display mb-16">{tr.about.title}</h2>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-4 space-y-4">
          <Reveal>
            <div className="aspect-[3/4] max-w-xs overflow-hidden">
              <img
                src={ghislainPhoto}
                alt="Ghislain Bussière"
                className="w-full h-full object-cover"
              />
            </div>
          </Reveal>
          <Reveal delayMs={80}>
            <p className="text-label mb-2">Ghislain Bussière</p>
            <p className="font-body text-sm text-muted-foreground">{tr.about.role}</p>
          </Reveal>
        </div>
        <div className="md:col-span-8 space-y-6">
          <Reveal delayMs={120}>
            <p className="font-body text-base text-foreground leading-relaxed">{tr.about.bio}</p>
          </Reveal>
          <Reveal delayMs={180}>
            <p className="font-body text-sm text-muted-foreground">{tr.about.experience}</p>
          </Reveal>
          <Reveal delayMs={240}>
            <p className="font-body text-sm text-muted-foreground">{tr.about.education}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
