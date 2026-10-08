import heroBannerUrl from '../assets/images/banner_3d_white_bg_1790834551552.jpg';
import logoEmblemUrl from '../assets/images/logo_3d_enhanced_1790775798215.jpg';

export interface NavLinkItem {
  label: string;
  path: '/' | '/about' | '/services' | '/updates' | '/contact';
  pageTitle: string;
}

export interface AshFragment {
  id: string;
  text: string;
  /** Desktop positioning (percentage) */
  top: string;
  left?: string;
  right?: string;
  /** Initial subtle rotation in degrees */
  rotate: number;
  /** Maps to one of the 3 Service Groups */
  resolvedByGroupId: 'it-solutions' | 'business-strategies' | 'content-solutions';
  resolutionLabel: string;
}

export interface ServiceTeaserItem {
  id: 'it-solutions' | 'business-strategies' | 'content-solutions';
  index: string;
  title: string;
  codename: string;
  chevronColor: string;
  summary: string;
  highlights: string[];
}

export interface ServiceGroup {
  id: 'it-solutions' | 'business-strategies' | 'content-solutions';
  index: string;
  title: string;
  codename: string;
  pillarName: string;
  chevronColor: string;
  tagline: string;
  description: string;
  ashOrigin: string;
  capabilities: string[];
  deliverables: string[];
  workflowProgression: {
    label: string;
    steps: string[];
  };
  outcomeMetric: {
    value: string;
    label: string;
    timeframe: string;
  };
  caseProof: {
    clientProfile: string;
    beforeState: string;
    afterOutcome: string;
  };
}

export interface LifecycleStage {
  id: 'ignite' | 'forge' | 'soar';
  stepNumber: string;
  name: string;
  tagline: string;
  description: string;
  duration: string;
  chevronColor: string;
  keyOutputs: string[];
  executiveQuestion: string;
}

export interface WhatIDoPillar {
  id: string;
  index: string;
  title: string;
  accentColor: string;
  items: string[];
}

export interface SelectedExperienceItem {
  id: string;
  index: string;
  category: 'technology' | 'strategy' | 'people' | 'growth';
  title: string;
  description: string;
  highlightedTerms: string[];
  flowLabel?: string;
  flowSteps?: string[];
  formats?: string[];
}

export interface ApproachStep {
  step: string;
  title: string;
  description: string;
  color: string;
}

export interface ValueDimension {
  index: string;
  title: string;
  description: string;
}

export const ASSETS = {
  heroBanner: heroBannerUrl,
  logoEmblem: logoEmblemUrl,
  heroBannerFallback: './rootfiles/Banner_Blue.png',
  logoEmblemFallback: './rootfiles/Logo_Aqua.png',
  founderPortrait: '',
  cofounderPortrait: '',
} as const;

export const SITE_CONTENT = {
  brand: {
    wordmark: 'Phoenix',
    subWordmark: 'Solutions',
    fullName: 'Phoenix Solutions',
    monogram: 'PS',
    tagline: 'Enterprise IT Strategy, Modular SaaS ERP Architecture, and B2B Content Marketing Systems in India.',
    pillars: [
      { name: 'Enterprise IT Strategy & Modular Systems', color: '#034078' },
      { name: 'Business Development & GTM Alliances', color: '#0077b6' },
      { name: 'High-Authority B2B Content Marketing', color: '#00b4d8' },
    ],
  },

  /**
   * Shared navigation array used by both Header and Footer.
   * Exactly five links: Home, About Us, Services, Updates & Gallery, Contact.
   */
  navigation: [
    {
      label: 'Home',
      path: '/',
      pageTitle: 'Enterprise IT Strategy & B2B Content Marketing Firm India | Phoenix Solutions',
    },
    {
      label: 'About Us',
      path: '/about',
      pageTitle: 'Executive Leadership & Consulting Methodology | Phoenix Solutions',
    },
    {
      label: 'Services',
      path: '/services',
      pageTitle: 'IT Strategy, Custom SaaS Architecture & GTM Suites | Phoenix Solutions',
    },
    {
      label: 'Updates & Gallery',
      path: '/updates',
      pageTitle: 'IT Knowledge Base, Case Studies & Insights | Phoenix Solutions',
    },
    {
      label: 'Contact',
      path: '/contact',
      pageTitle: 'Book Enterprise IT Strategy Discovery Consultation | Phoenix Solutions',
    },
  ] satisfies NavLinkItem[],

  hero: {
    eyebrow: 'Phoenix Solutions',
    headlinePrefix: 'INTEGRATING IT STRATEGY &',
    headlineGradient: 'CONTENT MARKETING OUTCOMES.',
    subHeadline:
      'We architect the seamless convergence of enterprise IT strategies, B2B business development frameworks, and high-authority content marketing to translate complex operational concepts into structured, measurable commercial outcomes.',
    primaryCta: 'Our Services',
    secondaryCta: 'Get in Touch',
    ashFragments: [
      {
        id: 'ash-1',
        text: 'Legacy Spreadsheet Inefficiencies',
        top: '16%',
        left: '4%',
        rotate: -4,
        resolvedByGroupId: 'it-solutions',
        resolutionLabel: 'Aligned via Enterprise IT Strategy',
      },
      {
        id: 'ash-2',
        text: 'Misaligned Cross-Functional Teams',
        top: '20%',
        right: '5%',
        rotate: 3,
        resolvedByGroupId: 'business-strategies',
        resolutionLabel: 'Synthesized via Business Development Systems',
      },
      {
        id: 'ash-3',
        text: 'Unclear Operational Priorities',
        top: '54%',
        left: '4%',
        rotate: 2,
        resolvedByGroupId: 'business-strategies',
        resolutionLabel: 'Structured via Concept Creation Matrices',
      },
      {
        id: 'ash-4',
        text: 'Stalled Sales Funnel Pipeline',
        top: '58%',
        right: '4%',
        rotate: -3,
        resolvedByGroupId: 'content-solutions',
        resolutionLabel: 'Accelerated via Content Marketing Systems',
      },
      {
        id: 'ash-5',
        text: 'Critical Strategic Execution Gaps',
        top: '76%',
        left: '10%',
        rotate: -2,
        resolvedByGroupId: 'business-strategies',
        resolutionLabel: 'Resolved via Commercial Growth Modeling',
      },
      {
        id: 'ash-6',
        text: 'Fragmented ERP & Systems Data',
        top: '78%',
        right: '10%',
        rotate: 4,
        resolvedByGroupId: 'it-solutions',
        resolutionLabel: 'Unified via Scalable IT Architectures',
      },
    ] satisfies AshFragment[],
  },

  homeTeaser: {
    eyebrow: 'High-Authority Capabilities Preview',
    headline: 'Unified Systems for Market Rebirth',
    subHeadline:
      'Explore how we integrate robust IT strategy, high-converting content marketing ecosystems, concept creation methodologies, and business development plans into a singular operational engine.',
    primaryCta: 'Our Services',
    secondaryCta: 'Get in Touch',
    items: [
      {
        id: 'it-solutions',
        index: '01',
        title: 'IT Strategy & Solutions',
        codename: 'THE DIGITAL ARCHITECTURE FORGE',
        chevronColor: '#034078',
        summary:
          'Designing enterprise-grade IT strategy, custom SaaS systems, modular ERP platforms, and secure API architectures to eliminate structural operational bottlenecks.',
        highlights: [
          'IT Strategy & Enterprise Architecture Compliance',
          'ERP & SaaS Solutions Workflow Mapping',
          'AI-Enabled Automation & Cloud Deployments',
        ],
      },
      {
        id: 'business-strategies',
        index: '02',
        title: 'Business Development & Consulting',
        codename: 'THE GROWTH & ALLIANCE ENGINE',
        chevronColor: '#0077b6',
        summary:
          'Engineering modern business development frameworks, strategic alliance networks, and concept creation modeling to bridge the execution gap and accelerate market capture.',
        highlights: [
          'High-Velocity Business Development Strategies',
          'Concept Creation & Commercial Feasibility Testing',
          'Cross-Ecosystem Alliances & Joint GTM Programs',
        ],
      },
      {
        id: 'content-solutions',
        index: '03',
        title: 'Content Marketing & Brand Authority',
        codename: 'THOUGHT LEADERSHIP & POSITIONING',
        chevronColor: '#00b4d8',
        summary:
          'Crafting authority-based content marketing structures, executive LinkedIn publishing networks, and conversion copy to educate buyers and drive pipeline velocity.',
        highlights: [
          'Brand Positioning & Authority Information Architecture',
          'Content Marketing Clusters & LinkedIn Funnels',
          'High-Impact Pitch Decks, Carousels & Video Assets',
        ],
      },
    ] satisfies ServiceTeaserItem[],
  },

  aboutSection: {
    eyebrow: 'About Phoenix Solutions · Structured Corporate Biography',
    companyOverview: {
      sectionIndex: 'SECTION 01',
      eyebrow: '01 · Corporate Identity & Core Thesis',
      title: 'About Phoenix Solutions',
      subtitle: 'IT Strategy • Business Development • Content Marketing • Concept Creation',
      headline: 'Integrating Structural Technology with High-Authority GTM Communication',
      leadParagraph:
        'Phoenix Solutions (Phoenix Strategic Evolution) operates as an elite, multidisciplinary consulting and advisory firm. We design and coordinate robust IT strategy frameworks, high-converting content marketing ecosystems, systematic concept creation workflows, and enterprise business development engines.',
      secondaryParagraph:
        'We bridge the legacy implementation gap by collaborating with fast-growing enterprises, institutional networks, and advisory partners to deploy custom ERP and SaaS systems, structure GTM alliances, optimize team behavioral and emotional maturity, and craft high-authority market narratives.',
      corePillars: [
        {
          index: '01',
          title: 'IT Strategy & Solutions',
          subtitle: 'Enterprise Technology Architecture',
          accentColor: '#034078',
          summary:
            'Translating complex cross-departmental operations into scalable IT strategy, modular ERP workflows, and secure digital product deployments in compliance with modern cloud standards.',
        },
        {
          index: '02',
          title: 'Business Development',
          subtitle: 'Strategic Alliances & Joint GTM Programs',
          accentColor: '#0077b6',
          summary:
            'Structuring robust commercial pipelines, structuring corporate alliances, and developing leadership capability matrices utilizing Emotional Intelligence and experiential frameworks.',
        },
        {
          index: '03',
          title: 'Content Marketing & Brand Authority',
          subtitle: 'Thought Leadership Ecosystems',
          accentColor: '#00b4d8',
          summary:
            'Architecting topic-authority content marketing networks, B2B messaging maps, executive LinkedIn positioning, and high-impact educational campaigns.',
        },
      ],
    },
    teamOverview: {
      sectionIndex: 'SECTION 02',
      eyebrow: '02 · Corporate Leadership Profile',
      title: 'Our Executive Leadership',
      subtitle:
        'Led by veteran practitioners who combine multi-industry IT strategy consulting, commercial business development expertise, and advanced strategic content marketing execution.',
    },
    coFounderProfile: {
      name: 'VISHNUDAS MENON',
      role: 'Co-Founder',
      organization: 'Phoenix Solutions',
      domains: [
        'Business Consulting',
        'Customer Experience',
        'Client Engagement',
        'Business Operations',
        'Professional Communication',
      ],
      headline: 'Aligning Technology Infrastructures with Corporate Business Development Objectives',
      leadParagraph:
        'Meet Our Co-Founder: Vishnudas Menon, Hails with an experience in business consulting, customer experience, client engagement, business operations, and professional communication across fields of customer and client Support and co-ordination.',
      statusNote:
        'Vishnudas leads client engagement and business operations at Phoenix Solutions, ensuring that every strategic alliance and corporate delivery meets our rigorous operational standards.',
      focusPillars: [
        {
          index: '01',
          title: 'Business Development & Alignment',
          description:
            'Designing scalable B2B outbound frameworks and deal metrics that directly link technology solutions with corporate pipeline expansion.',
        },
        {
          index: '02',
          title: 'Enterprise Architecture Consulting',
          description:
            'Guiding client enterprises through multi-departmental workflow auditing to ensure alignment with cloud standards and API best practices.',
        },
        {
          index: '03',
          title: 'Strategic Alliance Management',
          description:
            'Developing co-selling architectures, service-level agreements, and commercial alliances across corporate and technology providers.',
        },
      ],
      experienceSummary:
        'Extensive professional background spanning enterprise business consulting, customer experience (CX) architecture, key account client engagement, business operations, and multi-tier coordination across complex corporate environments.',
      experienceHighlights: [
        {
          title: 'Business Consulting & Operational Diagnostics',
          description:
            'Auditing organizational operations, resolving structural bottlenecks, and deploying resilient business processes that heighten execution speed and client satisfaction.',
        },
        {
          title: 'Customer Experience (CX) Architecture',
          description:
            'Designing customer-centric service journeys, transparent support touchpoints, and multi-channel escalation frameworks that maximize client retention.',
        },
        {
          title: 'Enterprise Client Engagement',
          description:
            'Nurturing high-value executive partnerships, managing client communications, and driving contract execution with institutional clarity.',
        },
        {
          title: 'Business Operations & SLA Governance',
          description:
            'Overseeing day-to-day corporate operations, ensuring service level agreements (SLAs) are rigorously met, and coordinating resources for cross-functional initiatives.',
        },
      ],
      contributionsToOrg: [
        {
          index: '01',
          title: 'Operational Governance & Delivery Rigor',
          description:
            'Institutes Phoenix Solutions’ delivery frameworks, ensuring operational precision, deadline adherence, and high-standard project governance across all consulting mandates.',
        },
        {
          index: '02',
          title: 'Executive Client Engagement & Account Retention',
          description:
            'Directs relationship management and client support operations, translating corporate expectations into reliable, long-term consulting partnerships.',
        },
        {
          index: '03',
          title: 'Customer Experience & Coordination Systems',
          description:
            'Spearheads customer journey optimization, transparent progress reporting, and cross-departmental coordination between clients and technical teams.',
        },
        {
          index: '04',
          title: 'Strategic Alliance & Vendor Ecosystems',
          description:
            'Expands and manages Phoenix Solutions’ network of technology partners, commercial collaborators, and operational service providers.',
        },
      ],
    },
    name: 'PRAVEEN G. MENON',
    role: 'Founder',
    domains: [
      'IT Strategy Advisory',
      'Business Development Planning',
      'High-Authority Concept Creation',
      'Content Marketing Architecture',
    ],
    headline: 'Bridging the Execution Gap via Highly Contextual Strategic Coordination',
    leadParagraph:
      'I serve at the convergence of IT strategy, business development, emotional intelligence, and high-authority content marketing. My foundational philosophy is that the tougher you are, the more you can do—where challenges are not roadblocks, but strategic opportunities to innovate and scale. I enable complex organizations to translate operational adversity and ambitious concepts into high-converting, resilient market share.',
    experienceSummary:
      'My professional advisory background spans IT strategy consulting, ERP and SaaS solution design, strategic brand positioning, corporate business development outreach, behavioral training, and impactful educational campaigns.',
    experienceTags: [
      'IT Strategy Consulting',
      'Business Development',
      'ERP & SaaS Architecture',
      'Concept Creation',
      'Content Marketing Systems',
      'Strategic Partnerships',
      'Leadership & EI Capability',
      'AI-Enabled Automation',
      'Brand Positioning',
      'Social Impact Programs',
    ],
    whatIDo: [
      {
        id: 'consulting-strategy',
        index: '01',
        title: 'Business Development & Strategy',
        accentColor: '#034078',
        items: [
          'Enterprise business development and outbound pipeline acceleration',
          'Commercial proposal engineering and value-proposition modeling',
          'Cross-industry strategic partnership and co-selling development',
          'Go-to-market (GTM) strategy mapping and opportunity auditing',
          'Business model innovation and feasibility analysis',
        ],
      },
      {
        id: 'tech-digital',
        index: '02',
        title: 'IT Strategy & Digital Solutions',
        accentColor: '#0077b6',
        items: [
          'IT strategy consulting and software-application topology planning',
          'Custom ERP and SaaS commercial workflow architecture',
          'AI-assisted development, workflow automation, and cloud deployments',
          'Digital provenance, NFC tracking, and brand protection technology',
          'Cross-platform API integration and legacy data modernization',
        ],
      },
      {
        id: 'growth-marketing',
        index: '03',
        title: 'Content Marketing & Positioning',
        accentColor: '#0096c7',
        items: [
          'Authority-based B2B content marketing strategy mapping',
          'High-converting brand positioning and messaging architecture',
          'Executive LinkedIn strategy and thought-leadership consulting',
          'Educational acquisition campaigns and editorial newsletter design',
          'High-impact corporate proposals, pitch decks, and stakeholder assets',
        ],
      },
      {
        id: 'people-capability',
        index: '04',
        title: 'People & Capability Maturation',
        accentColor: '#00b4d8',
        items: [
          'Experiential leadership training and behavioral maturation plans',
          'Emotional Intelligence (EI) & communication consulting',
          'High-performance operating systems and alignment workshops',
          'Employability development and professional achievement models',
          'Social impact program design and stakeholder governance',
        ],
      },
    ] satisfies WhatIDoPillar[],

    contributionsToOrg: [
      {
        index: '01',
        title: 'Enterprise IT Strategy & Architectural Topology',
        description:
          'Formulates high-availability cloud frameworks, ERP/SaaS modular blueprints, and AI-assisted automation systems that serve as the core tech consulting offering of Phoenix Solutions.',
      },
      {
        index: '02',
        title: 'Commercial GTM & Outbound Pipeline Engine',
        description:
          'Engineers outbound acquisition models, commercial proposal structures, and cross-industry co-selling alliances that accelerate client revenue pipelines.',
      },
      {
        index: '03',
        title: 'High-Authority Content Marketing Ecosystem',
        description:
          'Architects thought-leadership positioning, B2B content mapping, and strategic messaging that establishes Phoenix Solutions as a high-authority advisory firm.',
      },
      {
        index: '04',
        title: 'Foundational Vision & Capability Maturation',
        description:
          'Instills our foundational philosophy (“The tougher you are, the more you can do”) across client engagements, leadership coaching, and organizational transformation.',
      },
    ],

    selectedExperience: [
      {
        id: 'erp-saas',
        index: '01',
        category: 'technology',
        title: 'ERP & SaaS Solution Design',
        description:
          'Designed modular commercial database structures for enterprise SaaS platforms, translating business requirements into automated workflows covering buyers, vendors, products, RFQs, invoices, and executive reporting.',
        highlightedTerms: [
          'buyers',
          'vendors',
          'products',
          'RFQs',
          'quotations',
          'offers',
          'invoicing',
          'revenue',
          'dashboards',
          'reporting',
        ],
        flowLabel: 'Methodology',
        flowSteps: [
          'Workflow Auditing',
          'Database Design',
          'API Schema Mapping',
          'Deployment & Go-Live',
        ],
      },
      {
        id: 'digital-transformation',
        index: '02',
        category: 'technology',
        title: 'IT Strategy & Transformation',
        description:
          'Consulted on enterprise IT strategy and cloud deployments, bridging business requirements and software implementation via automated API setups and high-availability architecture.',
        highlightedTerms: [
          'IT strategy',
          'cloud deployments',
          'business requirements',
          'software implementation',
          'API setups',
          'high-availability architecture',
        ],
      },
      {
        id: 'human-capability',
        index: '03',
        category: 'people',
        title: 'Leadership & Behavioral Training',
        description:
          'Designed capability training programs based on emotional intelligence, professional maturity, and communication metrics, driving measured behavioral improvement in complex corporate structures.',
        highlightedTerms: [
          'emotional intelligence',
          'professional maturity',
          'communication metrics',
          'behavioral improvement',
          'corporate structures',
        ],
        flowLabel: 'Methodology',
        flowSteps: [
          'Diagnostic Audit',
          'Experiential Exercises',
          'Structured Reflection',
          'Maturation Tracking',
        ],
      },
      {
        id: 'strategic-partnerships',
        index: '04',
        category: 'strategy',
        title: 'Business Development Alliances',
        description:
          'Engineered strategic commercial alliances across corporate, technology, academic, and social impact networks, scaling outbound lead metrics and partnership outreach programs.',
        highlightedTerms: [
          'commercial alliances',
          'strategic partnerships',
          'outbound lead metrics',
          'partnership outreach',
        ],
      },
      {
        id: 'digital-products',
        index: '05',
        category: 'technology',
        title: 'High-Authority Content Systems',
        description:
          'Structured informational architectures and conversion-focused copywriting for B2B websites, increasing search-engine positioning and organic qualified lead captures.',
        highlightedTerms: [
          'informational architectures',
          'conversion-focused copywriting',
          'search-engine positioning',
          'lead captures',
        ],
      },
      {
        id: 'ai-emerging-tech',
        index: '06',
        category: 'technology',
        title: 'AI & Automated Workflows',
        description:
          'Deployed practical AI integrations, workflow automation sequences, and cloud utilities to reduce administrative overhead and accelerate operational velocity.',
        highlightedTerms: [
          'AI integrations',
          'workflow automation',
          'operational velocity',
        ],
      },
      {
        id: 'digital-authentication',
        index: '07',
        category: 'technology',
        title: 'Product Authentication & NFC',
        description:
          'Consulted on product authentication systems utilizing NFC, ledger-based traceability, and provenance tracking to protect luxury and high-value brands.',
        highlightedTerms: [
          'product authentication',
          'NFC',
          'traceability',
          'provenance',
          'brand protection',
        ],
      },
      {
        id: 'marketing-thought-leadership',
        index: '08',
        category: 'growth',
        title: 'B2B Content Marketing & Positioning',
        description:
          'Architected comprehensive thought-leadership content mapping and executive marketing campaigns across business development, IT strategy, and professional success fields.',
        highlightedTerms: [
          'content mapping',
          'marketing campaigns',
          'business development',
          'IT strategy',
        ],
        formats: [
          'LinkedIn Strategy',
          'Interactive Carousels',
          'Technical Infographics',
          'Editorial Newsletters',
          'Educational Videos',
          'Campaign Ecosystems',
        ],
      },
    ] satisfies SelectedExperienceItem[],

    myApproach: [
      {
        step: '01',
        title: 'DISCOVER',
        description: 'Audit legacy technology systems, commercial gaps, and market opportunities.',
        color: '#034078',
      },
      {
        step: '02',
        title: 'DEFINE',
        description: 'Translate ambiguous institutional friction into a clear commercial roadmap.',
        color: '#02569b',
      },
      {
        step: '03',
        title: 'DESIGN',
        description: 'Design the IT strategy blueprint, GTM models, and content systems.',
        color: '#0077b6',
      },
      {
        step: '04',
        title: 'CONNECT',
        description: 'Link strategic partners, digital solutions, and high-performance teams.',
        color: '#0096c7',
      },
      {
        step: '05',
        title: 'EXECUTE',
        description: 'Deploy custom SaaS/ERP modules and go-to-market outbound campaigns.',
        color: '#00b4d8',
      },
      {
        step: '06',
        title: 'SCALE',
        description: 'Implement systemized operational structures for compounding growth.',
        color: '#38bdf8',
      },
    ] satisfies ApproachStep[],

    valueBrought: [
      {
        index: '01',
        title: 'IT Strategy Consulting',
        description: 'Aligning business requirements with robust cloud software and API architectures.',
      },
      {
        index: '02',
        title: 'Business Development Strategy',
        description: 'Engineering high-converting outbound pipelines and structured joint alliances.',
      },
      {
        index: '03',
        title: 'High-Authority Content Marketing',
        description: 'Structuring topic-authority maps and LinkedIn thought leadership to educate buyers.',
      },
      {
        index: '04',
        title: 'Concept Creation Expertise',
        description: 'Turning abstract commercial concepts into structured, functional digital solutions.',
      },
      {
        index: '05',
        title: 'Alliance & Partner Network',
        description: 'Linking stakeholders across technology providers, corporate ecosystems, and institutions.',
      },
      {
        index: '06',
        title: 'Strategic Storytelling',
        description: 'Simplifying complex IT strategy and business metrics into conversion-oriented messages.',
      },
    ] satisfies ValueDimension[],

    intersectionManifesto: {
      dimensions: ['IT STRATEGY', 'BUSINESS DEVELOPMENT', 'CONTENT MARKETING', 'CONCEPT CREATION'],
      lead: 'We coordinate initiatives at the structural intersection of these four practices.',
      body: 'Whether your enterprise requires a custom cloud database, high-velocity outbound business development outreach, high-authority content marketing clusters, strategic partnership charters, or complex product concept creation—we bring rigorous structure, align the variables, and execute.',
      crescendo: [
        'Turning Ideas Into Opportunities.',
        'Turning Opportunities Into Solutions.',
        'Turning Solutions Into Outcomes.',
      ],
    },
  },

  servicesSection: {
    eyebrow: 'Practice Areas · Enterprise Consultation Suites',
    headline: 'Integrating Technology Infrastructure, Business Alliances, and Market Authority',
    subHeadline:
      'Most corporate failures stem from disconnects between IT systems, business development outreach, and market messaging. Our three integrated practices coordinate these elements in lockstep.',
    groups: [
      {
        id: 'it-solutions',
        index: '01',
        title: 'IT Strategy & Solutions',
        codename: 'THE DIGITAL ARCHITECTURE FORGE',
        pillarName: 'Enterprise IT Strategy & SaaS Solutions',
        chevronColor: '#034078',
        tagline: 'ERP Architectures, SaaS Solution Design & cloud API Integration',
        description:
          'Modernizing operational systems into custom, modular SaaS platforms and ERP architectures. We align legacy corporate workflows with modern API schemas and high-availability cloud hosting.',
        ashOrigin: 'Replaces unstructured legacy sheets & disconnected databases',
        capabilities: [
          'IT strategy auditing and database schema alignment (buyers, vendors, RFQs, invoices & dashboards)',
          'Modular SaaS product design and workflow digitisation consulting',
          'AI-assisted workflow automation, cloud infrastructure design & container deployments',
          'NFC product validation, ledger-based traceability, and brand provenance systems',
          'Cross-platform API integration and legacy enterprise database migrations',
        ],
        deliverables: [
          'Enterprise IT strategy blueprint and secure API data topologies',
          'Automated commercial databases with automated reporting sequences',
          'Scalable, cloud-native application setups with HTTPS security and automated scaling',
        ],
        workflowProgression: {
          label: 'Deployment Phase',
          steps: [
            'System Diagnostic',
            'SaaS/Database Design',
            'API Integration',
            'Production Go-Live',
          ],
        },
        outcomeMetric: {
          value: 'OPTIMIZED',
          label: 'Manual Database Reconciliation & Data Duplicate Elimination',
          timeframe: 'Core Architecture Target',
        },
        caseProof: {
          clientProfile: 'Enterprise Procurement & ERP Database Transformation',
          beforeState:
            'Unstructured email-based vendor quotations, manual RFQs, and duplicate invoicing records.',
          afterOutcome:
            'Unified cloud ERP and custom database integrating RFQs, quotations, invoicing, and live financial dashboards.',
        },
      },
      {
        id: 'business-strategies',
        index: '02',
        title: 'Business Development & Strategies',
        codename: 'THE GROWTH & ALLIANCE ENGINE',
        pillarName: 'Business Development, Strategic Alliances & Corporate Training',
        chevronColor: '#0077b6',
        tagline: 'Outbound Pipeline Engineering, Concept Creation & Joint GTM Alliances',
        description:
          'Structuring modern business development outreach sequences, joint go-to-market alliances, commercial concept creation, and leadership capability matrices to bridge the strategic implementation gap.',
        ashOrigin: 'Solves siloed business units, inactive outreach & stalled partnerships',
        capabilities: [
          'Business development planning, lead scoring, and outbound campaign tracking',
          'Strategic partnership outreach across technology, corporate, and education providers',
          'Commercial concept creation, feasibility testing, and business-model innovation',
          'Experiential leadership development, communication, and emotional maturity coaching',
          'Behavioral maturation workshops and team alignment diagnostics',
        ],
        deliverables: [
          'Corporate joint venture charters, outreach blueprints, and GTM proposal packages',
          'Cross-functional operating cadences and executive decision-rights structures',
          'Experiential capability programs with mapped behavioral and emotional intelligence metrics',
        ],
        workflowProgression: {
          label: 'Alliances Workflow',
          steps: [
            'Stakeholder Audit',
            'Co-Selling Design',
            'Partnership Charter',
            'Joint Outreach',
          ],
        },
        outcomeMetric: {
          value: 'ACCELERATED',
          label: 'Strategic Alliance Milestone Completion & Pipeline Velocity',
          timeframe: 'Core Program Objective',
        },
        caseProof: {
          clientProfile: 'Cross-Industry Technology & Corporate Partner Integration',
          beforeState:
            'Siloed sales departments and reactive, unstandardized partner outreach stalling expansion.',
          afterOutcome:
            'Structured co-selling outbound framework and leadership operational cadence delivering consistent alliance milestones.',
        },
      },
      {
        id: 'content-solutions',
        index: '03',
        title: 'Content Marketing & Brand Authority',
        codename: 'BRAND POSITIONING & INTENT STORYTELLING',
        pillarName: 'High-Authority B2B Content Marketing & Positioning',
        chevronColor: '#00b4d8',
        tagline: 'Brand Messaging, LinkedIn Systems & B2B Content Marketing Networks',
        description:
          'Designing high-authority B2B content marketing ecosystems, digital brand positioning maps, and targeted campaign copy to simplify complex IT strategy topics into high-converting sales pipelines.',
        ashOrigin: 'Converts fragmented market positioning into compounding authority',
        capabilities: [
          'Topic-authority content marketing structures and enterprise brand messaging maps',
          'SEO and GEO (Generative Engine Optimization) content architectures, UX design & conversion copy',
          'Executive LinkedIn personal branding, publishing schedules & thought-leadership development',
          'High-impact corporate proposals, investor pitch decks, and commercial storytelling formats',
          'Multi-format asset deployment: Interactive carousels, technical infographics, newsletters, and educational series',
        ],
        deliverables: [
          'Full-funnel B2B brand positioning blueprint and site information architectures',
          'Executive thought-leadership LinkedIn publishing engine and scheduling calendar',
          'High-converting proposal copy, investor-ready pitch materials, and editorial campaigns',
        ],
        workflowProgression: {
          label: 'Asset Formats',
          steps: [
            'LinkedIn Strategy',
            'Frosted Carousels',
            'Technical Infographics',
            'Editorial Newsletters',
            'Educational Video',
            'Integrated Campaigns',
          ],
        },
        outcomeMetric: {
          value: 'EXPANDED',
          label: 'Inbound Executive Engagement & Qualified Corporate Pipelines',
          timeframe: 'Core Growth Target',
        },
        caseProof: {
          clientProfile: 'B2B Advisory & SaaS Thought Leadership positioning',
          beforeState:
            'Highly complex technological capabilities poorly understood by enterprise procurement buyers.',
          afterOutcome:
            'Simplified B2B brand positioning, structured GTM proposal storytelling, and high-authority LinkedIn campaigns.',
        },
      },
    ] satisfies ServiceGroup[],
  },

  methodSection: {
    eyebrow: 'The Phoenix Lifecycle',
    headline: 'Authoritative Frameworks and Disciplined Execution',
    subHeadline:
      'Our three-stage strategic macro lifecycle—guided by six core execution disciplines—systematically translates corporate complexity into compounding market share.',
    stages: [
      {
        id: 'ignite',
        stepNumber: '01',
        name: 'IGNITE',
        tagline: 'Audit, Discover & Define',
        description:
          'Auditing institutional complexities, mapping technology requirements, and identifying high-value commercial gaps.',
        duration: 'Stage I · Discovery & Goal Definition',
        chevronColor: '#034078',
        keyOutputs: [
          'Deep forensic system auditing, stakeholder reviews, and market gap mapping',
          'Translating operational ambiguity into clear, mathematically structured GTM goals',
          'Prioritized value-creation roadmap with defined commercial entry and exit gates',
        ],
        executiveQuestion:
          'Where is technological or operational complexity silently leaking corporate value?',
      },
      {
        id: 'forge',
        stepNumber: '02',
        name: 'FORGE',
        tagline: 'Design, Connect & Position',
        description:
          'Designing the integrated IT strategy blueprints, business development alliances, and high-authority content marketing structures.',
        duration: 'Stage II · Architecture & Stakeholder Connection',
        chevronColor: '#0077b6',
        keyOutputs: [
          'IT strategy layouts, SaaS relational database schemas, and commercial workflow specifications',
          'Structuring outbound outreach systems, partner networks, and joint GTM alliances',
          'B2B thought-leadership blueprints and topic-authority content marketing plans',
        ],
        executiveQuestion:
          'How must software, behavioral maturity, and strategic partnerships connect to execute?',
      },
      {
        id: 'soar',
        stepNumber: '03',
        name: 'SOAR',
        tagline: 'Deploy, Execute & Scale',
        description:
          'Deploying custom digital solutions, executing go-to-market campaigns, and systemizing operations for compound scale.',
        duration: 'Stage III · Production Execution & Automated Scale',
        chevronColor: '#00b4d8',
        keyOutputs: [
          'Deploying production-ready SaaS/ERP databases and measuring GTM campaign metrics',
          'Live operational dashboards integrating quotations, invoicing, and customer engagement analytics',
          'Systems integration models engineered for perfect transfer to a PostgreSQL-backed Supabase instance',
        ],
        executiveQuestion:
          'How do we lock in compounding outcomes that adapt dynamically to generative search engines?',
      },
    ] satisfies LifecycleStage[],
  },

  riseContactSection: {
    eyebrow: 'The Evolution · Coordinate With Phoenix Solutions',
    headline: 'Ready to Rise with Authority?',
    subHeadline:
      'Whether your corporate roadmap requires custom IT strategy and ERP architecture, outbound business development campaigns, strategic content marketing ecosystems, or structured product concept creation—we execute.',
    directContact: {
      principal: 'Praveen G. Menon (Founder) & Vishnudas Menon (Co-Founder)',
      email: 'pgmenon@live.com',
      focusAreas: 'IT Strategy • Business Development • Content Marketing • Concept Creation',
      responseSla: 'Direct executive review and response within 1 business day',
    },
    formLabels: {
      name: 'Full Name',
      namePlaceholder: 'Elena Vance',
      email: 'Work Email',
      emailPlaceholder: 'elena.vance@enterprise.com',
      organization: 'Organization',
      organizationPlaceholder: 'Vance Global Holdings',
      message: 'Brief Initiative / Opportunity Description',
      messagePlaceholder:
        'Please describe your target IT strategy needs, business development opportunities, content marketing objectives, or core concept creation goals...',
      submitButton: 'Initiate Consultation Sequence',
      submittingButton: 'Transmitting Strategic Brief...',
    },
  },

  footer: {
    copyright: `© ${new Date().getFullYear()} Phoenix Strategic Evolution · Phoenix Solutions. All rights reserved.`,
    statement:
      'IT Strategy • Business Development • Content Marketing • Concept Creation — Transforming Complexity into Market Authority.',
  },
} as const;
