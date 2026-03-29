export interface Project {
  id: string;
  title: string;
  domain: string;
  role: string;
  outcome: string;
  year: string;
  image: string;
  context: string;
  responsibility: string;
  category: string;
  tags: string[];
}

export interface CaseStudy {
  id: string;
  projectName: string;
  productType: string;
  role: string;
  timeline: string;
  heroImage: string;
  productImages: Array<{
    url: string;
    caption: string;
  }>;
  businessProblem: string;
  userProblem: string;
  context: {
    teamSize: string;
    techLimitations: string[];
    businessGoals: string[];
  };
  ownership: {
    whatIDid: string[];
    whatIDidNot: string[];
  };
  research: {
    keyFindings: string[];
    painPoints: string[];
  };
  designDecisions: Array<{
    problem: string;
    optionChosen: string;
    whyOthersRejected: string;
  }>;
  impact: {
    metrics: string[];
    outcomes: string[];
    learnings: string[];
  };
  reflection: {
    improvements: string[];
    learnings: string[];
  };
}

export const projects: Project[] = [
  {
    id: 'saas-analytics-platform',
    title: 'SaaS Analytics Platform',
    domain: 'B2B SaaS',
    role: 'Lead Product Designer',
    outcome: '35% increase in user engagement, 28% reduction in churn',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1732203971761-e9d4a6f5e93f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBTYWFTJTIwZGFzaGJvYXJkJTIwaW50ZXJmYWNlfGVufDF8fHx8MTc2Njg2MTE3N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    context: 'Enterprise analytics platform serving 500+ companies across finance and retail sectors',
    responsibility: 'End-to-end design ownership: discovery, design system, user flows, and delivery',
    category: 'B2B SaaS',
    tags: ['Dashboard', 'Analytics', 'B2B']
  },
  {
    id: 'mobile-banking-redesign',
    title: 'Mobile Banking Redesign',
    domain: 'FinTech',
    role: 'Senior UX Designer',
    outcome: 'NPS increased from 42 to 68, app store rating from 3.2 to 4.6',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1726137065519-c9a1b9eca951?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW50ZWNoJTIwYmFua2luZyUyMGFwcHxlbnwxfHx8fDE3NjY4NjExNzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    context: 'Complete redesign of mobile banking app used by 2M+ customers',
    responsibility: 'Led UX strategy, conducted user research, designed key flows, collaborated with 3 iOS/Android teams',
    category: 'Mobile App',
    tags: ['FinTech', 'Mobile', 'iOS/Android']
  },
  {
    id: 'ecommerce-checkout-optimization',
    title: 'E-commerce Checkout Optimization',
    domain: 'B2C Retail',
    role: 'Product Designer',
    outcome: '22% increase in conversion rate, $4.2M additional revenue',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1763872011479-aa293bf083a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlLWNvbW1lcmNlJTIwc2hvcHBpbmclMjBleHBlcmllbmNlfGVufDF8fHx8MTc2Njg2MTE3OHww&ixlib=rb-4.1.0&q=80&w=1080',
    context: 'Streamlined checkout experience for mid-market e-commerce platform processing 50K daily transactions',
    responsibility: 'UX audit, A/B testing strategy, iterative design, stakeholder alignment across product, eng, and business',
    category: 'Marketplace',
    tags: ['E-commerce', 'Conversion', 'B2C']
  },
  {
    id: 'design-system-enterprise',
    title: 'Enterprise Design System',
    domain: 'Design Operations',
    role: 'Design System Lead',
    outcome: 'Reduced design-to-dev handoff time by 60%, improved consistency across 12 products',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1698440050363-1697e5f0277c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ24lMjBzeXN0ZW0lMjBjb21wb25lbnRzfGVufDF8fHx8MTc2Njg0MTE4M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    context: 'Built scalable design system for enterprise product suite with 50+ designers and 200+ engineers',
    responsibility: 'Component library architecture, documentation, adoption strategy, team training',
    category: 'Web App',
    tags: ['Component Library', 'Documentation', 'Scalability']
  },
  {
    id: 'healthcare-patient-portal',
    title: 'Healthcare Patient Portal',
    domain: 'HealthTech',
    role: 'Lead UX Designer',
    outcome: 'Patient satisfaction increased by 45%, reduced support calls by 38%',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1747224317356-6dd1a4a078fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwdGVjaG5vbG9neSUyMGludGVyZmFjZXxlbnwxfHx8fDE3NjY4NjExNzh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    context: 'Patient portal redesign for hospital network serving 100K+ patients annually',
    responsibility: 'Accessibility compliance (WCAG 2.1 AA), user research with diverse patient demographics, workflow optimization',
    category: 'HealthTech / Healthcare',
    tags: ['Healthcare', 'Accessibility', 'Patient Experience']
  },
  {
    id: 'ai-productivity-tool',
    title: 'AI Productivity Assistant',
    domain: 'SaaS / AI',
    role: 'Senior Product Designer',
    outcome: 'Achieved 10K users in first month, 4.8 Product Hunt rating',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1707836916010-3c4ad261936c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXNpZ24lMjBtb2NrdXB8ZW58MXx8fHwxNzY2ODE3MDI3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    context: 'AI-powered productivity tool helping teams automate repetitive tasks and workflows',
    responsibility: 'AI interaction patterns, onboarding flow, prompt design, user testing for AI transparency',
    category: 'B2C SaaS',
    tags: ['AI/ML', 'Productivity', 'Automation']
  },
  {
    id: 'hr-recruitment-platform',
    title: 'HR Recruitment Platform',
    domain: 'HRTech',
    role: 'Product Designer',
    outcome: '40% faster candidate screening, 55% improvement in hiring quality',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1573496130407-57329f01f769?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxIUiUyMHJlY3J1aXRtZW50JTIwc29mdHdhcmV8ZW58MXx8fHwxNzY3NTEyNTIwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    context: 'End-to-end recruitment platform for mid-sized companies managing 500+ candidates monthly',
    responsibility: 'User research with HR teams, candidate journey mapping, ATS integration design, interview scheduling workflows',
    category: 'HRTech',
    tags: ['Recruiting', 'ATS', 'Workflow']
  },
  {
    id: 'real-estate-marketplace',
    title: 'Real Estate Marketplace',
    domain: 'PropTech',
    role: 'Lead Designer',
    outcome: '65% increase in property listings, 32% boost in user inquiries',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1761166518430-18fa61b973e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwcHJvcGVydHklMjBwbGF0Zm9ybXxlbnwxfHx8fDE3Njc0MjQ3ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    context: 'Property search and listing platform connecting buyers, sellers, and agents across 50+ cities',
    responsibility: 'Search and filter optimization, virtual tour integration, agent dashboard design, mobile-first responsive design',
    category: 'Real Estate',
    tags: ['Marketplace', 'PropTech', 'Search']
  },
  {
    id: 'online-learning-platform',
    title: 'Online Learning Platform',
    domain: 'EdTech',
    role: 'Senior Product Designer',
    outcome: '78% course completion rate, 4.7/5 student satisfaction score',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1762330915716-69ffffeeee95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZHVjYXRpb25hbCUyMGxlYXJuaW5nJTIwYXBwfGVufDF8fHx8MTc2NzUxMjUyMHww&ixlib=rb-4.1.0&q=80&w=1080',
    context: 'Interactive learning platform for professional skill development with 200+ courses and 50K+ students',
    responsibility: 'Learning experience design, progress tracking systems, gamification strategy, instructor tools, accessibility standards',
    category: 'EdTech',
    tags: ['Education', 'Learning', 'Engagement']
  }
];

export const caseStudy: CaseStudy = {
  id: 'saas-analytics-platform',
  projectName: 'SaaS Analytics Platform Redesign',
  productType: 'B2B Enterprise SaaS',
  role: 'Lead Product Designer',
  timeline: 'Sep 2023 - Mar 2024 (6 months)',
  heroImage: 'https://images.unsplash.com/photo-1732203971761-e9d4a6f5e93f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBTYWFTJTIwZGFzaGJvYXJkJTIwaW50ZXJmYWNlfGVufDF8fHx8MTc2Njg2MTE3N3ww&ixlib=rb-4.1.0&q=80&w=1080',
  productImages: [
    {
      url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWFzJTIwZGFzaGJvYXJkJTIwYW5hbHl0aWNzfGVufDF8fHx8MTc2Njg4ODYyN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      caption: 'Dashboard Overview - Main analytics interface with customizable widgets and real-time data visualization'
    },
    {
      url: 'https://images.unsplash.com/photo-1759661966728-4a02e3c6ed91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwdmlzdWFsaXphdGlvbiUyMGRhc2hib2FyZHxlbnwxfHx8fDE3NjY4Njg2NjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      caption: 'Data Visualization - Interactive charts and graphs for deep-dive analysis'
    },
    {
      url: 'https://images.unsplash.com/photo-1741721816798-2ab57b7a3a90?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBhcHBsaWNhdGlvbiUyMGludGVyZmFjZXxlbnwxfHx8fDE3NjY4MzE2MDV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      caption: 'User Management - Team collaboration and permission settings interface'
    },
    {
      url: 'https://images.unsplash.com/photo-1591381287254-b3349c60bf9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWFzJTIwcHJvZHVjdCUyMGludGVyZmFjZXxlbnwxfHx8fDE3NjY4ODg2Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      caption: 'Settings & Configuration - Simplified settings panel with intelligent defaults'
    },
    {
      url: 'https://images.unsplash.com/photo-1742094561255-18506fba7a48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZG1pbiUyMHBhbmVsJTIwZGVzaWdufGVufDF8fHx8MTc2Njg4ODYyOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      caption: 'Admin Panel - Comprehensive admin controls with role-based access management'
    },
    {
      url: 'https://images.unsplash.com/photo-1669023414162-5bb06bbff0ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmFseXRpY3MlMjBwbGF0Zm9ybSUyMHVpfGVufDF8fHx8MTc2Njg4ODYyOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      caption: 'Reports & Analytics - Advanced reporting tools with export and scheduling features'
    }
  ],
  businessProblem: 'Declining user engagement (18% month-over-month) and increasing churn (31% annually) due to complex workflows and steep learning curve.',
  userProblem: 'Users struggled to find insights quickly, often abandoning the platform after 2-3 sessions. Task completion time averaged 12 minutes for basic queries.',
  context: {
    teamSize: '1 Lead Designer (me), 1 Junior Designer, 2 PMs, 6 Engineers',
    techLimitations: ['Legacy React codebase required incremental migration', 'Real-time data processing constraints affected interaction patterns'],
    businessGoals: ['Reduce churn by 20%', 'Increase daily active users by 30%', 'Position for Series B funding']
  },
  ownership: {
    whatIDid: [
      'Led all UX research: 24 user interviews, 3 usability testing rounds, competitive analysis',
      'Defined information architecture and core user flows',
      'Designed complete UI system with 40+ components',
      'Facilitated design critiques and stakeholder workshops',
      'Collaborated with engineering on implementation feasibility'
    ],
    whatIDidNot: [
      'Did not write production code (reviewed implementations)',
      'Did not manage project timeline (PM responsibility)',
      'Junior designer handled visual polish and micro-interactions'
    ]
  },
  research: {
    keyFindings: [
      '73% of users only used 2 of 8 main features',
      'Navigation depth averaged 4-5 clicks for common tasks',
      'Users created workarounds using external tools (Excel, Notion)',
      'Power users wanted keyboard shortcuts and bulk actions'
    ],
    painPoints: [
      'Unclear navigation hierarchy',
      'Information overload on dashboard',
      'Slow data loading perceived as broken',
      'Inconsistent interaction patterns'
    ]
  },
  designDecisions: [
    {
      problem: 'Dashboard showed all 8 modules by default, overwhelming new users',
      optionChosen: 'Customizable dashboard with intelligent defaults based on user role',
      whyOthersRejected: 'Rejected: blank slate (too intimidating), wizard-based setup (added friction), showing top 3 modules (too limiting for power users)'
    },
    {
      problem: 'Navigation mixed product features with account settings, causing confusion',
      optionChosen: 'Two-tier navigation: persistent sidebar for features, top bar for account/settings',
      whyOthersRejected: 'Rejected: mega menu (not keyboard-friendly), hamburger menu (hides important actions), tabs (not scalable)'
    },
    {
      problem: 'Data queries took 3-8 seconds with no feedback, users thought it was broken',
      optionChosen: 'Skeleton screens + progress indicator + estimated time + partial results',
      whyOthersRejected: 'Rejected: spinner only (no context), blocking modal (prevents multitasking), fake instant results (violated trust)'
    }
  ],
  impact: {
    metrics: [
      '35% increase in DAU within 3 months of launch',
      '28% reduction in churn (from 31% to 22% annually)',
      'Task completion time reduced from 12min to 4min (67% improvement)',
      'Support tickets related to navigation decreased by 58%'
    ],
    outcomes: [
      'Platform became core selling point in Series B pitch',
      'Customer satisfaction score increased from 6.2 to 8.1 (0-10 scale)',
      'Design system adopted across 3 other company products'
    ],
    learnings: [
      'Early engineering collaboration prevented 3 major redesigns',
      'Incremental rollout (beta group → 25% → 100%) caught critical issues',
      'Quantitative data validated but qualitative research revealed "why"'
    ]
  },
  reflection: {
    improvements: [
      'Would have conducted more stakeholder interviews upfront to align expectations',
      'Should have documented design system guidelines earlier',
      'Could have pushed for more aggressive performance optimization'
    ],
    learnings: [
      'Learned to balance business constraints with user needs through structured trade-off discussions',
      'Improved ability to present design rationale using data + user stories',
      'Gained experience facilitating alignment across 15+ stakeholders'
    ]
  }
};