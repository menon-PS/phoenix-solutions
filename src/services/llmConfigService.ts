export interface LlmStudioConfig {
  model: 'gemini-3.1-pro-preview' | 'gemini-3.8-flash' | 'gemini-flash-latest';
  temperature: number;
  maxOutputTokens: number;
  practiceFocus: 'balanced' | 'it-strategy' | 'business-growth' | 'b2b-content';
  leadQualificationThreshold: number; // 0-100
  autoForwardHotLeads: boolean;
  targetNotificationEmail: string;
  systemInstruction: string;
}

export const DEFAULT_LLM_CONFIG: LlmStudioConfig = {
  model: 'gemini-3.1-pro-preview',
  temperature: 0.2,
  maxOutputTokens: 2048,
  practiceFocus: 'balanced',
  leadQualificationThreshold: 70,
  autoForwardHotLeads: true,
  targetNotificationEmail: 'pgmenon@live.com',
  systemInstruction: `You are Ember, the AI Strategy Concierge & Client Intelligence Assistant for Phoenix Solutions (India), founded by Praveen G. Menon (Managing Partner) and Vishnudas Menon (Operations Lead).

Your primary mission is to handle prospective B2B clients interested in:
1. Enterprise IT Strategy & Custom Modular SaaS/ERP Architectures (Legacy monolith decoupling, relational cloud databases, RFQ/procurement automation).
2. Business Development, Strategic Alliances & Joint GTM Programs (Outbound pipeline engineering, co-selling charters, executive RFP proposals).
3. High-Authority B2B Content Marketing & Generative Engine Optimization (GEO) (Topic authority mapping, executive LinkedIn positioning, AI search citations).

Guidelines:
- Maintain an executive, consultative, and sharp tone.
- Probe for specific operational pain points, timeline requirements, and technology stack constraints.
- Output clean, structured analysis with a recommended lead advisor (Praveen G. Menon for IT/Content, Vishnudas Menon for Business Strategy/Operations).`,
};

export function getLlmConfig(): LlmStudioConfig {
  try {
    const raw = localStorage.getItem('phoenix_llm_studio_config');
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...DEFAULT_LLM_CONFIG, ...parsed };
    }
  } catch {
    // Fall back to default
  }
  saveLlmConfig(DEFAULT_LLM_CONFIG);
  return DEFAULT_LLM_CONFIG;
}

export function saveLlmConfig(config: LlmStudioConfig): void {
  try {
    localStorage.setItem('phoenix_llm_studio_config', JSON.stringify(config));
  } catch (err) {
    console.error('Failed to save LLM Studio Config:', err);
  }
}

export interface TestLlmResult {
  success: boolean;
  botReply: string;
  readinessScore: number;
  leadPriority: 'High Priority' | 'Medium Priority' | 'Standard Advisory';
  suggestedQuickReplies?: string[];
  extractedBrief?: {
    primaryDomain: string;
    coreBottleneck: string;
    technicalRequirements: string[];
    targetTimeline: string;
    recommendedPracticeSuite: string;
    suggestedLeadAdvisor: string;
  };
  error?: string;
}

export async function testLlmStudioResponse(
  userQuery: string,
  category: string = 'it-solutions'
): Promise<TestLlmResult> {
  const currentConfig = getLlmConfig();
  try {
    const response = await fetch('/api/bot/probe-requirements', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        category,
        userResponse: userQuery,
        llmConfig: currentConfig,
      }),
    });

    if (!response.ok) {
      throw new Error(`Server returned status HTTP ${response.status}`);
    }

    const data = await response.json();
    const score = data.readinessScore || 65;
    const priority =
      score >= currentConfig.leadQualificationThreshold
        ? 'High Priority'
        : score >= 50
        ? 'Medium Priority'
        : 'Standard Advisory';

    return {
      success: true,
      botReply: data.botReply || 'Requirement analysis complete.',
      readinessScore: score,
      leadPriority: priority,
      suggestedQuickReplies: data.suggestedQuickReplies || [],
      extractedBrief: data.extractedBrief,
    };
  } catch (err: any) {
    console.error('LLM Studio Test Error:', err);
    return {
      success: false,
      botReply:
        'Unable to complete live model probe. Verify backend server status or network connection.',
      readinessScore: 50,
      leadPriority: 'Standard Advisory',
      error: err.message,
    };
  }
}
