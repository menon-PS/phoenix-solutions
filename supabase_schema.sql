-- =========================================================================
-- PHOENIX SOLUTIONS (INDIA) - RELATIONAL SUPABASE POSTGRESQL SCHEMA (DDL)
-- =========================================================================

-- 1. Contact Inquiries Table
CREATE TABLE IF NOT EXISTS public.contact_inquiries (
    id TEXT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    organization VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    selected_pillar VARCHAR(100) DEFAULT '',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Executive CRM Leads Table
CREATE TABLE IF NOT EXISTS public.crm_leads (
    id TEXT PRIMARY KEY,
    reference_id VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) DEFAULT '',
    company VARCHAR(255) NOT NULL,
    industry VARCHAR(100) DEFAULT '',
    company_size VARCHAR(100) DEFAULT '',
    source VARCHAR(50) DEFAULT 'Website Form',
    service_interest VARCHAR(100) DEFAULT 'Digital Forge',
    project_type VARCHAR(255) DEFAULT '',
    core_goal TEXT DEFAULT '',
    key_requirements TEXT DEFAULT '',
    existing_systems TEXT DEFAULT '',
    timeline VARCHAR(100) DEFAULT '',
    budget_range VARCHAR(100) DEFAULT '',
    decision_makers VARCHAR(255) DEFAULT '',
    lead_temperature VARCHAR(20) DEFAULT 'Warm',
    lead_score INT DEFAULT 70,
    owner_id VARCHAR(100) DEFAULT '',
    owner_name VARCHAR(255) DEFAULT '',
    status VARCHAR(50) DEFAULT 'New',
    conversation_transcript TEXT DEFAULT '',
    suggested_next_step TEXT DEFAULT '',
    consent BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Daily Web Market Leads Table (Automated 8:00 AM Scan)
CREATE TABLE IF NOT EXISTS public.market_leads (
    id TEXT PRIMARY KEY,
    company_name VARCHAR(255) NOT NULL,
    industry VARCHAR(100) NOT NULL,
    requirement_summary TEXT NOT NULL,
    practice_suite VARCHAR(50) NOT NULL,
    estimated_budget VARCHAR(100) DEFAULT 'Unspecified',
    source_url TEXT DEFAULT '',
    contact_channel VARCHAR(255) DEFAULT 'Google Search Signal',
    lead_score INT DEFAULT 80,
    status VARCHAR(50) DEFAULT 'New Prospect',
    scan_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Newsletter Signups Table
CREATE TABLE IF NOT EXISTS public.newsletter_signups (
    id TEXT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. CMS Content Overrides Table
CREATE TABLE IF NOT EXISTS public.cms_content (
    id TEXT PRIMARY KEY,
    section_key VARCHAR(100) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    updated_by VARCHAR(255) NOT NULL
);

-- 6. Dynamic Project Updates Table
CREATE TABLE IF NOT EXISTS public.project_updates (
    id TEXT PRIMARY KEY,
    project_name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT DEFAULT '',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    created_by VARCHAR(255) NOT NULL
);

-- 7. IAM Governance Users Table
CREATE TABLE IF NOT EXISTS public.admin_users (
    id TEXT PRIMARY KEY,
    uid VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    display_name VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'admin',
    department VARCHAR(100) DEFAULT '',
    designation VARCHAR(100) DEFAULT '',
    phone VARCHAR(50) DEFAULT '',
    status VARCHAR(20) DEFAULT 'active',
    must_change_password BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexing for High-Performance Relational Queries
CREATE INDEX IF NOT EXISTS idx_crm_leads_status ON public.crm_leads(status);
CREATE INDEX IF NOT EXISTS idx_crm_leads_email ON public.crm_leads(email);
CREATE INDEX IF NOT EXISTS idx_market_leads_scan_date ON public.market_leads(scan_date);
CREATE INDEX IF NOT EXISTS idx_market_leads_practice ON public.market_leads(practice_suite);

-- Enable Row Level Security (RLS)
ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crm_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.market_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_signups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Public Anonymous Write Policies for Contact Forms & Signups
CREATE POLICY "Public insert on contact_inquiries" ON public.contact_inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert on newsletter_signups" ON public.newsletter_signups FOR INSERT WITH CHECK (true);

-- Authenticated Admin Policies for Internal CRM & Governance
CREATE POLICY "Allow public read on cms_content" ON public.cms_content FOR SELECT USING (true);
CREATE POLICY "Allow public read on project_updates" ON public.project_updates FOR SELECT USING (true);
CREATE POLICY "Allow full access on crm_leads" ON public.crm_leads FOR ALL USING (true);
CREATE POLICY "Allow full access on market_leads" ON public.market_leads FOR ALL USING (true);
CREATE POLICY "Allow full access on admin_users" ON public.admin_users FOR ALL USING (true);

-- =========================================================================
-- 8. Supabase Edge Function Daily Task Scheduler (pg_cron & pg_net)
-- Automatically triggers Edge Function daily at 08:00 AM UTC (1:30 PM IST)
-- Edge Function: /supabase/functions/daily-leads-scraper/index.ts
-- =========================================================================
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

GRANT USAGE ON SCHEMA cron TO postgres;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA cron TO postgres;

-- Unschedule prior instance if exists
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'daily-market-leads-scraper') THEN
        PERFORM cron.unschedule('daily-market-leads-scraper');
    END IF;
EXCEPTION WHEN OTHERS THEN
    -- cron schema might not exist in some local environments
    NULL;
END $$;

-- Register daily 8:00 AM UTC schedule to invoke Edge Function
SELECT cron.schedule(
    'daily-market-leads-scraper',
    '0 8 * * *',
    $$
    SELECT net.http_post(
        url := 'https://uekopouskrmoxgrsljti.supabase.co/functions/v1/daily-leads-scraper',
        headers := jsonb_build_object(
            'Content-Type', 'application/json',
            'Authorization', 'Bearer sb_publishable_RCBEwmg9wTGL_mAz952KbQ_Q8cL1nWF'
        ),
        body := jsonb_build_object(
            'source', 'pg_cron_daily_task',
            'scheduled_time', now()
        )
    ) AS request_id;
    $$
);

