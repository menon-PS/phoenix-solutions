import { createClient } from '@supabase/supabase-js';

const url = 'https://uekopouskrmoxgrsljti.supabase.co';
const anonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVla29wb3Vza3Jtb3hncnNsanRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEzNzkxNTUsImV4cCI6MjEwNjk1NTE1NX0.d4qdOpgaLwHmY1jDafPpdpFWBFPmE5JRRnNYchGHpHk';

const supabase = createClient(url, anonKey);

async function seedData() {
  console.log('🌱 Seeding initial core data into Supabase PostgreSQL tables...');

  const now = new Date().toISOString();

  // 1. Admin Governance Users
  const adminUsers = [
    {
      id: 'usr_rootuser_01',
      uid: 'usr_rootuser_01',
      email: 'rootuser@phoenixsolutions.co',
      display_name: 'Root System Administrator',
      role: 'superadmin',
      department: 'Executive Governance',
      designation: 'Chief Security Officer',
      status: 'active',
      must_change_password: false,
      created_at: now,
      updated_at: now,
    },
    {
      id: 'usr_pmenon_02',
      uid: 'usr_pmenon_02',
      email: 'pmenon@phoenixsolutions.co',
      display_name: 'Praveen G. Menon',
      role: 'admin',
      department: 'Executive Leadership',
      designation: 'Founder & Managing Partner',
      status: 'active',
      must_change_password: false,
      created_at: now,
      updated_at: now,
    },
    {
      id: 'usr_vmenon_03',
      uid: 'usr_vmenon_03',
      email: 'vmenon@phoenixsolutions.co',
      display_name: 'Vishnudas Menon',
      role: 'admin',
      department: 'Operations',
      designation: 'Co-Founder & Director',
      status: 'active',
      must_change_password: false,
      created_at: now,
      updated_at: now,
    },
    {
      id: 'usr_pmenon_gmail',
      uid: 'usr_pmenon_gmail',
      email: 'pmenonhtc@gmail.com',
      display_name: 'Praveen Menon (Root)',
      role: 'superadmin',
      department: 'Executive Board',
      designation: 'Managing Partner',
      status: 'active',
      must_change_password: false,
      created_at: now,
      updated_at: now,
    }
  ];
  await supabase.from('admin_users').upsert(adminUsers);
  console.log('✓ Seeded admin_users table');

  // 2. CMS Content Records
  const cmsRecords = [
    {
      id: 'cms_home_hero_headline_prefix',
      section_key: 'home_hero_headline_prefix',
      title: 'Home Page: Hero Headline Prefix',
      content: 'INTEGRATING IT STRATEGY &',
      updated_at: now,
      updated_by: 'pmenon@phoenixsolutions.co'
    },
    {
      id: 'cms_home_hero_headline_gradient',
      section_key: 'home_hero_headline_gradient',
      title: 'Home Page: Hero Headline Gradient',
      content: 'CONTENT MARKETING OUTCOMES.',
      updated_at: now,
      updated_by: 'pmenon@phoenixsolutions.co'
    },
    {
      id: 'cms_home_hero_subheadline',
      section_key: 'home_hero_subheadline',
      title: 'Home Page: Hero Sub-Headline Narrative',
      content: 'We architect the seamless convergence of enterprise IT strategies, B2B business development frameworks, and high-authority content marketing to translate complex operational concepts into structured, measurable commercial outcomes.',
      updated_at: now,
      updated_by: 'pmenon@phoenixsolutions.co'
    },
    {
      id: 'cms_about_mission_title',
      section_key: 'about_mission_title',
      title: 'About Page: Mission/Vision Title',
      content: 'Integrating Structural Technology with High-Authority GTM Communication',
      updated_at: now,
      updated_by: 'pmenon@phoenixsolutions.co'
    }
  ];
  await supabase.from('cms_content').upsert(cmsRecords);
  console.log('✓ Seeded cms_content table');

  // 3. Market Leads Records
  const marketLeads = [
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
      scan_date: now.split('T')[0],
      created_at: now,
      updated_at: now
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
      scan_date: now.split('T')[0],
      created_at: now,
      updated_at: now
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
      scan_date: now.split('T')[0],
      created_at: now,
      updated_at: now
    }
  ];
  await supabase.from('market_leads').upsert(marketLeads);
  console.log('✓ Seeded market_leads table');

  // 4. Project Updates
  const projectUpdates = [
    {
      id: 'upd_01_erp',
      project_name: 'Enterprise Cloud ERP & PostgreSQL Migration',
      description: 'Successfully migrated procurement workflows to dedicated PostgreSQL cloud infrastructure, eliminating manual vendor quotation spreadsheets and unifying live dashboard reporting.',
      image_url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
      created_at: now,
      created_by: 'pmenon@phoenixsolutions.co'
    },
    {
      id: 'upd_02_gtm',
      project_name: 'B2B Brand Positioning & Generative Engine Optimization',
      description: 'Engineered topic-authority semantic clustering and executive LinkedIn thought leadership architectures, resulting in verified AI search grounding across Gemini and Perplexity.',
      image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      created_at: now,
      created_by: 'pmenon@phoenixsolutions.co'
    }
  ];
  await supabase.from('project_updates').upsert(projectUpdates);
  console.log('✓ Seeded project_updates table');

  // 5. CRM Leads
  const crmLeads = [
    {
      id: 'ld_seed_01',
      reference_id: 'LEAD-2026-901',
      name: 'Dr. Vikram Malhotra',
      email: 'vikram.m@zenithdiagnostics.com',
      phone: '+91 98200 44211',
      company: 'Zenith Health Diagnostics',
      industry: 'Healthcare & Biotech',
      company_size: '50-200 employees',
      source: 'Executive Search Signal',
      service_interest: 'Digital Forge',
      project_type: 'Relational Database Migration & Custom ERP',
      core_goal: 'Decouple 15 scattered laboratory Excel files into cloud PostgreSQL',
      key_requirements: 'Automated RFQ intake, multi-lab sync, role-based access control',
      timeline: '1-2 months',
      budget_range: '₹25,00,000+',
      lead_temperature: 'Hot',
      lead_score: 95,
      owner_name: 'Praveen G. Menon',
      status: 'Qualified',
      created_at: now,
      updated_at: now
    }
  ];
  await supabase.from('crm_leads').upsert(crmLeads);
  console.log('✓ Seeded crm_leads table');

  console.log('🎉 Seeding successfully completed! Supabase is fully populated.');
}

seedData();
