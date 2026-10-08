import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://uekopouskrmoxgrsljti.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVla29wb3Vza3Jtb3hncnNsanRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEzNzkxNTUsImV4cCI6MjEwNjk1NTE1NX0.d4qdOpgaLwHmY1jDafPpdpFWBFPmE5JRRnNYchGHpHk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
