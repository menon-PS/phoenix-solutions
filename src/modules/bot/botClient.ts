import { ServiceCategory, ChatMessage, RequirementBrief } from './types';

export interface ProbeRequirementsResponse {
  success: boolean;
  botReply: string;
  suggestedQuickReplies?: string[];
  readinessScore?: number;
  extractedBrief?: Partial<RequirementBrief>;
  error?: string;
}

export async function probeServiceRequirements(
  category: ServiceCategory,
  userResponse: string,
  history: ChatMessage[]
): Promise<ProbeRequirementsResponse> {
  try {
    const res = await fetch('/api/bot/probe-requirements', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        category,
        userResponse,
        conversationHistory: history.map((m) => ({
          sender: m.sender,
          text: m.text,
        })),
      }),
    });

    if (!res.ok) {
      throw new Error(`Server returned HTTP ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (err: any) {
    console.error('Error probing service requirements via LLM client:', err);
    return {
      success: false,
      botReply: `Thank you for providing those details. Our robust AI model encountered a temporary connection glitch. To ensure Praveen G. Menon and Vishnudas Menon review your initiative, what is your ideal target launch timeframe?`,
      suggestedQuickReplies: [
        'Launch within 30 days',
        'Stage 1 Discovery Audit focus',
        'Custom modular ERP architecture',
      ],
      readinessScore: 50,
      extractedBrief: {
        primaryDomain: category,
        coreBottleneck: userResponse,
        recommendedPracticeSuite: 'Phoenix Integrated Practice Suite',
      },
      error: err.message,
    };
  }
}
