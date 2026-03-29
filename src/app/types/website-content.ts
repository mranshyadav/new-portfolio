// Website Content Types
export interface HeroSection {
  badge: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
  primaryCTA: {
    text: string;
    link: string;
  };
  secondaryCTA: {
    text: string;
    link: string;
  };
  stats: {
    projects: string;
    clients: string;
    experience: string;
  };
  images: {
    heroBackground?: string;
    profileImage?: string;
    decorativeImage?: string;
  };
}

export interface AboutContent {
  heroTitle: string;
  heroSubtitle: string;
  mainImage: string;
  heroBackgroundImage?: string;
  introduction: {
    title: string;
    description: string[];
  };
  philosophy: {
    title: string;
    description: string;
    principles: {
      title: string;
      description: string;
    }[];
  };
  journey: {
    title: string;
    milestones: {
      year: string;
      title: string;
      description: string;
      company?: string;
    }[];
  };
  stats: {
    experience: string;
    projects: string;
    clients: string;
    awards: string;
  };
  skills: {
    category: string;
    items: string[];
  }[];
  tools: {
    category: string;
    items: string[];
  }[];
}

export interface ProcessStep {
  id: string;
  number: string;
  title: string;
  description: string;
  activities: string[];
  deliverables: string[];
  icon?: string;
}

export interface ProcessContent {
  heroTitle: string;
  heroSubtitle: string;
  introduction: string;
  steps: ProcessStep[];
  principles: {
    title: string;
    description: string;
  }[];
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon?: string;
  pricing?: {
    starting: string;
    note?: string;
  };
}

export interface ServicesContent {
  heroTitle: string;
  heroSubtitle: string;
  introduction: string;
  services: ServiceItem[];
  cta: {
    title: string;
    description: string;
    buttonText: string;
  };
}

export interface ContactContent {
  heroTitle: string;
  heroSubtitle: string;
  email: string;
  phone?: string;
  location?: string;
  socialLinks: {
    platform: string;
    url: string;
    icon?: string;
  }[];
  availability: {
    status: string;
    description: string;
  };
  images: {
    heroBackground?: string;
    decorativeImage?: string;
    contactImage?: string;
  };
}

export interface WorkContent {
  heroTitle: string;
  heroSubtitle: string;
  featuredText: string;
  images: {
    heroBackground?: string;
    decorativeImage?: string;
  };
}

export interface FooterContent {
  tagline: string;
  email: string;
  phone?: string;
  socialLinks: {
    platform: string;
    url: string;
  }[];
  copyright: string;
}

export interface WebsiteContent {
  home: {
    hero: HeroSection;
  };
  about: AboutContent;
  process: ProcessContent;
  services: ServicesContent;
  contact: ContactContent;
  work: WorkContent;
  footer: FooterContent;
  siteSettings: {
    siteName: string;
    siteTagline: string;
    logo?: string;
    favicon?: string;
    ogImage?: string;
    images: {
      lightLogo?: string;
      darkLogo?: string;
      mobileLogo?: string;
    };
  };
}