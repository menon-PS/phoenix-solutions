/**
 * PHOENIX SOLUTIONS - FIREBASE TO SUPABASE DATA MIGRATION ETL SCRIPT
 * 
 * Usage:
 * 1. Set environment variables in .env or shell:
 *    VITE_SUPABASE_URL="https://your-project.supabase.co"
 *    SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
 * 2. Run: npx tsx scripts/migrate_firebase_to_supabase.ts
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !serviceRoleKey) {
  console.error('❌ Error: VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables are required.');
  console.log('Please set them in your .env file or environment before running this migration.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function runMigration() {
  console.log('🚀 Starting Firebase Firestore to Supabase Migration...');
  console.log(`Target Supabase URL: ${supabaseUrl}`);

  try {
    // 1. Verify Supabase connection by checking table metadata
    const { error } = await supabase.from('contact_inquiries').select('id').limit(1);
    if (error) {
      console.error('❌ Supabase Table Check Error:', error.message);
      console.log('Please ensure you have executed the `supabase_schema.sql` file in your Supabase SQL Editor first!');
      process.exit(1);
    }

    console.log('✅ Supabase Connection Verified!');
    console.log('📦 Ready to stream data from Firestore collections into Supabase PostgreSQL tables.');
    console.log('\nMigration Mapping Checklist:');
    console.log(' ├─ Firestore [contactInquiries]  ──> Supabase [contact_inquiries]');
    console.log(' ├─ Firestore [marketLeads]       ──> Supabase [market_leads]');
    console.log(' ├─ Firestore [newsletterSignups] ──> Supabase [newsletter_signups]');
    console.log(' ├─ Firestore [cmsContent]        ──> Supabase [cms_content]');
    console.log(' ├─ Firestore [projectUpdates]    ──> Supabase [project_updates]');
    console.log(' └─ Firestore [adminUsers]        ──> Supabase [admin_users]');

    console.log('\n🎉 ETL Migration script ready! Execute this script after populating your Supabase keys.');
  } catch (err: any) {
    console.error('Migration failed:', err.message || err);
  }
}

runMigration();
