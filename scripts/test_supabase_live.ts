import { createClient } from '@supabase/supabase-js';

const url = 'https://uekopouskrmoxgrsljti.supabase.co';
const anonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVla29wb3Vza3Jtb3hncnNsanRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEzNzkxNTUsImV4cCI6MjEwNjk1NTE1NX0.d4qdOpgaLwHmY1jDafPpdpFWBFPmE5JRRnNYchGHpHk';

const supabase = createClient(url, anonKey);

async function checkTables() {
  console.log('Testing live Supabase connection to project uekopouskrmoxgrsljti...');
  
  const tables = [
    'contact_inquiries',
    'crm_leads',
    'market_leads',
    'newsletter_signups',
    'cms_content',
    'project_updates',
    'admin_users',
    'visitor_stats'
  ];

  for (const table of tables) {
    const { data, error, count } = await supabase.from(table).select('*', { count: 'exact', head: true });
    if (error) {
      console.log(`❌ Table [${table}]: ${error.message}`);
    } else {
      console.log(`✅ Table [${table}]: Online (${count ?? 0} rows)`);
    }
  }
}

checkTables();
