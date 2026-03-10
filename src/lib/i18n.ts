export type Lang = 'fr' | 'en';

const translations = {
  fr: {
    nav: {
      about: 'Qui sommes-nous',
      activities: 'Nos activités',
      portfolio: 'Portefeuille',
      news: 'Actualités',
      contact: 'Contact',
    },
    hero: {
      tagline: '10 ans d\'expertise au service de la création de valeur dans l\'hôtellerie et l\'immobilier commercial en France et en Europe',
      cta: 'En savoir plus',
    },
    about: {
      title: 'Qui sommes-nous',
      bio: 'Ghislain Bussière est le fondateur et directeur de LAUS Asset Management. Fort d\'une expérience de plus de 15 ans dans l\'immobilier et l\'hôtellerie, il a développé une expertise reconnue en asset management, transactions et conseil stratégique.',
      experience: 'Parcours professionnel : BNP Paribas Real Estate Investment Management, Cushman & Wakefield, Feuring Hotel Consulting.',
      education: 'Formation : Glion Institute of Higher Education & Université Paris 1 Panthéon-Sorbonne.',
      role: 'Fondateur & Directeur',
    },
    activities: {
      title: 'Nos Activités',
      advise: {
        title: 'ADVISE',
        content: 'Conseil stratégique en rénovation hôtelière, études de faisabilité, et négociation de contrats de gestion (HMA), franchises et baux commerciaux. Nous accompagnons nos clients dans chaque étape de la valorisation de leurs actifs.',
      },
      manage: {
        title: 'MANAGE',
        content: 'Asset management opérationnel pour extraire le plein potentiel de chaque actif. Suivi de la performance, optimisation des revenus, contrôle des coûts et reporting détaillé pour maximiser la création de valeur.',
      },
      transact: {
        title: 'TRANSACT',
        content: 'Services sur mesure d\'acquisition et de cession d\'actifs hôteliers et immobiliers commerciaux. Identification d\'opportunités, due diligence, structuration et exécution de transactions.',
      },
    },
    portfolio: {
      title: 'Portefeuille',
      stat1: '€300M',
      stat1Label: 'Actifs acquis/cédés',
      stat2: '+€250M',
      stat2Label: 'AUM (Actifs sous gestion)',
      stat3: '+€1.0Md',
      stat3Label: 'Actifs valorisés',
      cta: 'En savoir plus',
    },
    news: {
      title: 'Actualités',
    },
    footer: {
      address: 'Adresse',
      addressLine: '128 rue La Boétie, 75008 Paris',
      contactLabel: 'Contact',
    },
  },
  en: {
    nav: {
      about: 'About Us',
      activities: 'Our Activities',
      portfolio: 'Portfolio',
      news: 'News',
      contact: 'Contact',
    },
    hero: {
      tagline: '10 years of expertise creating value in hospitality and commercial real estate across France and Europe',
      cta: 'Learn more',
    },
    about: {
      title: 'About Us',
      bio: 'Ghislain Bussière is the founder and director of LAUS Asset Management. With over 15 years of experience in real estate and hospitality, he has developed recognized expertise in asset management, transactions, and strategic advisory.',
      experience: 'Professional background: BNP Paribas Real Estate Investment Management, Cushman & Wakefield, Feuring Hotel Consulting.',
      education: 'Education: Glion Institute of Higher Education & Université Paris 1 Panthéon-Sorbonne.',
      role: 'Founder & Director',
    },
    activities: {
      title: 'Our Activities',
      advise: {
        title: 'ADVISE',
        content: 'Strategic advisory in hotel renovation, feasibility studies, and negotiation of management contracts (HMA), franchises, and commercial leases. We support our clients at every stage of asset value creation.',
      },
      manage: {
        title: 'MANAGE',
        content: 'Operational asset management to extract the full potential of each asset. Performance monitoring, revenue optimization, cost control, and detailed reporting to maximize value creation.',
      },
      transact: {
        title: 'TRANSACT',
        content: 'Tailored acquisition and disposal services for hospitality and commercial real estate assets. Opportunity identification, due diligence, structuring, and transaction execution.',
      },
    },
    portfolio: {
      title: 'Portfolio',
      stat1: '€300M',
      stat1Label: 'Assets Acquired/Sold',
      stat2: '+€250M',
      stat2Label: 'Assets Under Management',
      stat3: '+€1.0Bn',
      stat3Label: 'Assets Valued',
      cta: 'Find out more',
    },
    news: {
      title: 'News',
    },
    footer: {
      address: 'Address',
      addressLine: '128 rue La Boétie, 75008 Paris',
      contactLabel: 'Contact',
    },
  },
} as const;

export function t(lang: Lang) {
  return translations[lang];
}
