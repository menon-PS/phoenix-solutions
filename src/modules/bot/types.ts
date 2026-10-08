export type ServiceCategory =
  | 'it-solutions'
  | 'business-strategies'
  | 'content-solutions'
  | 'custom-combination';

export type ProbingStage =
  | 'category_selection'
  | 'technical_depth'
  | 'business_goals'
  | 'timeline_budget'
  | 'summary_generation';

export interface QuickReply {
  label: string;
  value: string;
  categoryHint?: ServiceCategory;
}

export interface ChatMessage {
  id: string;
  sender: 'bot' | 'user' | 'system';
  text: string;
  timestamp: string;
  quickReplies?: QuickReply[];
  stage?: ProbingStage;
  structuredBrief?: RequirementBrief;
}

export interface RequirementBrief {
  clientOrganization?: string;
  contactEmail?: string;
  primaryDomain: string;
  secondaryDomains: string[];
  coreBottleneck: string;
  technicalRequirements: string[];
  targetTimeline: string;
  budgetExpectation: string;
  readinessScore: number; // 0 to 100
  priorityLevel: 'High Priority' | 'Medium Priority' | 'Standard Advisory';
  recommendedPracticeSuite: string;
  suggestedLeadAdvisor: string;
  actionableNextSteps: string[];
}

export interface BotAnalyticsSession {
  sessionId: string;
  startedAt: string;
  updatedAt: string;
  messagesCount: number;
  selectedCategory?: ServiceCategory;
  probingStage: ProbingStage;
  isCompleted: boolean;
  userEngagementScore: number;
  extractedRequirements?: RequirementBrief;
}
