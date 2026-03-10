import { type Lang, t } from '@/lib/i18n';

interface AboutSectionProps {
  lang: Lang;
}

export default function AboutSection({ lang }: AboutSectionProps) {
  const tr = t(lang);

  return (
    <section id="about" className="container-site" style={{ paddingTop: 'var(--section-spacing)', paddingBottom: 'var(--section-spacing)' }}>
      <h2 className="heading-display mb-16">{tr.about.title}</h2>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-4">
          <p className="text-label mb-2">Ghislain Bussière</p>
          <p className="font-body text-sm text-muted-foreground">{tr.about.role}</p>
        </div>
        <div className="md:col-span-8 space-y-6">
          <p className="font-body text-base text-foreground leading-relaxed">{tr.about.bio}</p>
          <p className="font-body text-sm text-muted-foreground">{tr.about.experience}</p>
          <p className="font-body text-sm text-muted-foreground">{tr.about.education}</p>
        </div>
      </div>
    </section>
  );
}
