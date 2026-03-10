import { useState } from 'react';
import type { Lang } from '@/lib/i18n';
import LausNavbar from '@/components/LausNavbar';
import HeroSlider from '@/components/HeroSlider';
import AboutSection from '@/components/AboutSection';
import ActivitiesSection from '@/components/ActivitiesSection';
import PortfolioSection from '@/components/PortfolioSection';
import NewsSlider from '@/components/NewsSlider';
import LausFooter from '@/components/LausFooter';

const Index = () => {
  const [lang, setLang] = useState<Lang>('fr');

  return (
    <div className="min-h-screen bg-background">
      <LausNavbar lang={lang} onLangChange={setLang} />
      <HeroSlider lang={lang} />
      <AboutSection lang={lang} />
      <ActivitiesSection lang={lang} />
      <PortfolioSection lang={lang} />
      <NewsSlider lang={lang} />
      <LausFooter lang={lang} />
    </div>
  );
};

export default Index;
