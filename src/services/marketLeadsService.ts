import {
  fetchMarketLeadsSupabase,
  saveMarketLeadSupabase,
  updateMarketLeadStatusSupabase,
  MarketLeadRecordSupabase,
  getStoredIamToken,
} from './supabaseService';
import { crmStore } from './crmStore';

export type MarketLeadRecord = MarketLeadRecordSupabase;

export async function getDailyMarketLeads(): Promise<MarketLeadRecord[]> {
  try {
    const leads = await fetchMarketLeadsSupabase();
    if (Array.isArray(leads) && leads.length > 0) {
      return leads;
    }
  } catch (err) {
    console.warn('Failed to fetch market leads from Supabase:', err);
  }

  // Curated initial leads fallback if database is bootstrapping
  const initialLeads: MarketLeadRecord[] = [
    {
      id: 'mlead_01_apex',
      company_name: 'Apex Precision Logistics',
      industry: 'Supply Chain & Manufacturing',
      requirement_summary: 'Decoupling 25 scattered Excel sheets to a custom cloud PostgreSQL database with automated RFQ workflows.',
      practice_suite: 'it-solutions',
      estimated_budget: '₹18,000,000 - ₹35,000,000',
      source_url: 'https://phoenixsolutions.co/updates',
      contact_channel: 'Enterprise RFQ Notice · Bengaluru Hub',
      lead_score: 92,
      status: 'New Prospect',
      scan_date: new Date().toISOString().split('T')[0],
      created_at: new Date().toISOString(),
    },
    {
      id: 'mlead_02_vanguard',
      company_name: 'Vanguard Enterprise SaaS',
      industry: 'B2B Software Platforms',
      requirement_summary: 'Seeking outbound co-selling alliance partner in South East Asia and India to engineer multi-tier enterprise sales pipeline.',
      practice_suite: 'business-strategies',
      estimated_budget: '$25,000 - $60,000',
      source_url: 'https://phoenixsolutions.co/updates',
      contact_channel: 'Partner GTM Portal · Singapore/India',
      lead_score: 88,
      status: 'New Prospect',
      scan_date: new Date().toISOString().split('T')[0],
      created_at: new Date().toISOString(),
    },
    {
      id: 'mlead_03_omnihealth',
      company_name: 'OmniHealth Diagnostics',
      industry: 'Healthcare & Biotech',
      requirement_summary: 'Structuring Generative Engine Optimization (GEO) to capture Perplexity and Gemini AI search citations for core diagnostic software.',
      practice_suite: 'content-solutions',
      estimated_budget: '$15,000 - $30,000',
      source_url: 'https://phoenixsolutions.co/updates',
      contact_channel: 'Executive LinkedIn Marketing RFP',
      lead_score: 85,
      status: 'New Prospect',
      scan_date: new Date().toISOString().split('T')[0],
      created_at: new Date().toISOString(),
    },
    {
      id: 'mlead_04_kaveri',
      company_name: 'Kaveri Heavy Engineering',
      industry: 'Industrial Components & Export',
      requirement_summary: 'Custom modular inventory ERP with NFC provenance tracking and multi-currency billing integration.',
      practice_suite: 'it-solutions',
      estimated_budget: '₹22,000,000 - ₹45,000,000',
      source_url: 'https://phoenixsolutions.co/updates',
      contact_channel: 'Industrial ERP Modernization RFP',
      lead_score: 90,
      status: 'New Prospect',
      scan_date: new Date().toISOString().split('T')[0],
      created_at: new Date().toISOString(),
    },
  ];

  for (const lead of initialLeads) {
    await saveMarketLeadSupabase(lead).catch(() => {});
  }

  return initialLeads;
}

export async function runInstantWebLeadScan(): Promise<{
  success: boolean;
  count: number;
  leads: MarketLeadRecord[];
}> {
  try {
    const token = getStoredIamToken();
    const res = await fetch('/api/admin/leads/scan', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      },
    });
    if (!res.ok) throw new Error('Web lead scan failed');
    const data = await res.json();
    if (Array.isArray(data.leads)) {
      for (const lead of data.leads) {
        await saveMarketLeadSupabase(lead).catch(() => {});
      }
    }
    return {
      success: true,
      count: data.count || data.leads?.length || 0,
      leads: data.leads || [],
    };
  } catch (err: any) {
    console.error('Instant web lead scan error:', err);
    return {
      success: false,
      count: 0,
      leads: [],
    };
  }
}

export async function importMarketLeadToCrm(lead: MarketLeadRecord): Promise<void> {
  // Add to CRM leads store
  crmStore.createLead({
    name: `Exec Contact (${lead.company_name})`,
    company: lead.company_name,
    email: `procurement@${lead.company_name.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`,
    phone: '+91 80 4000 8800',
    industry: lead.industry,
    budgetRange: lead.estimated_budget,
    serviceInterest:
      lead.practice_suite === 'it-solutions'
        ? 'Digital Forge'
        : lead.practice_suite === 'business-strategies'
        ? 'Growth Architecture'
        : 'The Ascent',
    source: 'LinkedIn',
    keyRequirements: lead.requirement_summary,
    leadTemperature: lead.lead_score >= 85 ? 'Hot' : 'Warm',
  });

  // Mark status in Supabase as Imported
  await updateMarketLeadStatusSupabase(lead.id, 'Imported to CRM').catch(() => {});
}
