-- =========================================================================
-- PHOENIX SOLUTIONS (INDIA) - SCHEDULE SUPABASE EDGE FUNCTION DAILY TASK
-- =========================================================================
-- This script schedules the `daily-leads-scraper` Edge Function to run automatically
-- every day at 08:00 AM UTC (1:30 PM IST) using PostgreSQL `pg_cron` and `pg_net`.
--
-- Instructions:
-- 1. Open your Supabase Dashboard: https://supabase.com/dashboard/project/uekopouskrmoxgrsljti/sql
-- 2. Paste and run this script in the SQL Editor.
-- =========================================================================

-- Step 1: Enable required extensions in Supabase
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Grant usage to postgres role
GRANT USAGE ON SCHEMA cron TO postgres;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA cron TO postgres;

-- Step 2: Remove existing job if present (to avoid duplicate schedules)
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'daily-market-leads-scraper') THEN
        PERFORM cron.unschedule('daily-market-leads-scraper');
    END IF;
END $$;

-- Step 3: Register scheduled cron job (Runs daily at 08:00 AM UTC / 1:30 PM IST)
-- Notice: Replace <YOUR_PROJECT_REF> and <SERVICE_ROLE_KEY_OR_ANON_KEY> with your project details
SELECT cron.schedule(
    'daily-market-leads-scraper',
    '0 8 * * *', -- At 08:00 AM every day
    $$
    SELECT net.http_post(
        url := 'https://uekopouskrmoxgrsljti.supabase.co/functions/v1/daily-leads-scraper',
        headers := jsonb_build_object(
            'Content-Type', 'application/json',
            'Authorization', 'Bearer sb_publishable_RCBEwmg9wTGL_mAz952KbQ_Q8cL1nWF'
        ),
        body := jsonb_build_object(
            'triggered_by', 'supabase_pg_cron',
            'schedule', 'daily_08_00_am',
            'timestamp', now()
        )
    ) AS request_id;
    $$
);

-- Step 4: Verify that the cron job was scheduled successfully
SELECT jobid, schedule, command, nodename, nodeport, database, username, active, jobname
FROM cron.job
WHERE jobname = 'daily-market-leads-scraper';
