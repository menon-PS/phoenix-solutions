import {
  ServiceCategory,
  ProbingStage,
  ChatMessage,
  RequirementBrief,
  BotAnalyticsSession,
  QuickReply,
} from './types';

export const INITIAL_PROBING_QUESTIONS: Record<ServiceCategory, string[]> = {
  'it-solutions': [
    'What legacy systems or spreadsheet operations are currently causing operational bottlenecks?',
    'What key features (e.g., procurement RFQs, vendor quotations, inventory, NFC provenance tracking) do you require in your custom SaaS or ERP architecture?',
    'What is your target database migration timeline and cloud deployment preference?',
  ],
  'business-strategies': [
    'What commercial sales or strategic alliance gaps are currently stalling pipeline expansion?',
    'Are you looking for outbound B2B pipeline engineering, joint venture co-selling charters, or leadership capability training?',
    'What is your expected timeline for initiating outbound partner campaigns or executive RFP proposals?',
  ],
  'content-solutions': [
    'What are your primary brand positioning goals (e.g., C-suite LinkedIn authority, Generative AI overview citations)?',
    'What content formats do you prefer (e.g., LinkedIn carousels, technical infographics, editorial newsletters, video series)?',
    'How frequently do you intend to publish authoritative thought leadership content?',
  ],
  'custom-combination': [
    'Describe how your technology systems, business development outreach, and market positioning currently intersect.',
    'Which practice area requires immediate priority (IT Infrastructure, Alliances, or Brand Content)?',
    'What executive outcomes would define a successful engagement with Phoenix Solutions?',
  ],
};

export function createInitialSession(): BotAnalyticsSession {
  const now = new Date().toISOString();
  return {
    sessionId: `bot_sess_${Math.random().toString(36).substring(2, 9)}_${Date.now()}`,
    startedAt: now,
    updatedAt: now,
    messagesCount: 1,
    probingStage: 'category_selection',
    isCompleted: false,
    userEngagementScore: 10,
  };
}

export function getInitialBotMessage(): ChatMessage {
  return {
    id: 'msg_welcome',
    sender: 'bot',
    text: 'Welcome to Phoenix Solutions Executive Advisory. I am your Service Requirement Intelligence Assistant. I will help probe and analyze your operational requirements to construct a structured consulting brief for Praveen G. Menon and Vishnudas Menon.\n\nTo begin, which strategic practice area aligns with your initiative?',
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    stage: 'category_selection',
    quickReplies: [
      {
        label: '💻 IT Strategy & Custom ERP',
        value: 'it-solutions',
        categoryHint: 'it-solutions',
      },
      {
        label: '🤝 Business Dev & Alliances',
        value: 'business-strategies',
        categoryHint: 'business-strategies',
      },
      {
        label: '✍️ B2B Content & GEO Systems',
        value: 'content-solutions',
        categoryHint: 'content-solutions',
      },
      {
        label: '🔥 Comprehensive Multi-Pillar Suite',
        value: 'custom-combination',
        categoryHint: 'custom-combination',
      },
    ],
  };
}

export function calculateReadinessScore(brief: Partial<RequirementBrief>): number {
  let score = 20; // Base score
  if (brief.primaryDomain) score += 15;
  if (brief.coreBottleneck && brief.coreBottleneck.length > 20) score += 20;
  if (brief.technicalRequirements && brief.technicalRequirements.length > 0) score += 15;
  if (brief.targetTimeline) score += 15;
  if (brief.budgetExpectation) score += 15;
  return Math.min(score, 100);
}

export function generateStructuredBriefFromHistory(
  session: BotAnalyticsSession,
  messages: ChatMessage[]
): RequirementBrief {
  const userMessages = messages.filter((m) => m.sender === 'user');
  const fullUserText = userMessages.map((m) => m.text).join(' ');

  const primaryDomain =
    session.selectedCategory === 'it-solutions'
      ? 'Enterprise IT Strategy & Custom SaaS/ERP'
      : session.selectedCategory === 'business-strategies'
      ? 'Business Development & Strategic GTM Alliances'
      : session.selectedCategory === 'content-solutions'
      ? 'High-Authority B2B Content Marketing & GEO'
      : 'Comprehensive Multi-Pillar Advisory';

  const secondaryDomains: string[] = [];
  if (fullUserText.toLowerCase().includes('erp') || fullUserText.toLowerCase().includes('cloud')) {
    secondaryDomains.push('Cloud Architecture');
  }
  if (fullUserText.toLowerCase().includes('partner') || fullUserText.toLowerCase().includes('sales')) {
    secondaryDomains.push('Strategic Co-Selling Alliances');
  }
  if (fullUserText.toLowerCase().includes('content') || fullUserText.toLowerCase().includes('linkedin')) {
    secondaryDomains.push('Generative Engine Optimization');
  }

  const coreBottleneck =
    userMessages.length > 1
      ? userMessages[1].text
      : 'Operational fragmentation and legacy workflow inefficiencies.';

  const readinessScore = calculateReadinessScore({
    primaryDomain,
    coreBottleneck,
    technicalRequirements: secondaryDomains,
    targetTimeline: '1 to 3 Months',
    budgetExpectation: 'Enterprise Consultation Suite',
  });

  const priorityLevel: 'High Priority' | 'Medium Priority' | 'Standard Advisory' =
    readinessScore >= 80 ? 'High Priority' : readinessScore >= 50 ? 'Medium Priority' : 'Standard Advisory';

  const suggestedAdvisor =
    session.selectedCategory === 'business-strategies'
      ? 'Vishnudas Menon (Co-Founder & Operations Lead)'
      : 'Praveen G. Menon (Founder & IT Strategy Lead)';

  return {
    primaryDomain,
    secondaryDomains,
    coreBottleneck,
    technicalRequirements: [
      'Modular database schema mapping',
      'API integration specification',
      'Outbound pipeline alignment',
    ],
    targetTimeline: 'Stage 1 Discovery Audit within 14 Days',
    budgetExpectation: 'Stage-Gated Value Advisory Model',
    readinessScore,
    priorityLevel,
    recommendedPracticeSuite: primaryDomain,
    suggestedLeadAdvisor: suggestedAdvisor,
    actionableNextSteps: [
      'Schedule 30-minute executive discovery consultation',
      'Review technical schema and workflow bottleneck documentation',
      'Receive tailored Stage 1 Discovery Audit proposal',
    ],
  };
}
