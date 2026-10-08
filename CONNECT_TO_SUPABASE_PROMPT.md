# Universal AI Prompt & Implementation Guide: Connecting Applications to Supabase

Use the prompt below with any AI coding model, engineering team, or application stack (Next.js, React, Node.js/Express, Python/FastAPI, Flutter, Go, etc.) to establish an instant, secure, production-grade connection to Supabase.

---

## 📋 Copy-Paste Prompt for AI / Developers

```markdown
You are a senior full-stack cloud architect. I need you to integrate my Supabase PostgreSQL database into our application.

### 1. Connection Credentials & Environment
Use the following configuration (or load from environment variables):
- **SUPABASE_URL**: https://uekopouskrmoxgrsljti.supabase.co
- **SUPABASE_ANON_KEY**: sb_publishable_RCBEwmg9wTGL_mAz952KbQ_Q8cL1nWF
- **Target Region**: ap-south-1 (Mumbai)

### 2. Client Initialization Pattern
Install `@supabase/supabase-js` and initialize the client:
```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || 'https://uekopouskrmoxgrsljti.supabase.co';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || 'sb_publishable_RCBEwmg9wTGL_mAz952KbQ_Q8cL1nWF';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

### 3. Database Tables & Entities
The application relies on the following relational PostgreSQL schema:
- `public.contact_inquiries`: Contact form submissions (`id`, `name`, `email`, `organization`, `message`, `selected_pillar`, `created_at`)
- `public.crm_leads`: Executive enterprise CRM leads (`id`, `reference_id`, `name`, `email`, `company`, `budget_range`, `status`, `created_at`)
- `public.market_leads`: Scraped market intelligence leads (`id`, `company_name`, `industry`, `practice_suite`, `estimated_budget`, `lead_score`, `status`, `scan_date`)
- `public.newsletterSignups`: Email subscription records (`id`, `email`, `created_at`)
- `public.cms_content`: Content overrides (`id`, `section_key`, `title`, `content`, `updated_at`, `updated_by`)
- `public.project_updates`: Dynamic showcase updates (`id`, `project_name`, `description`, `image_url`, `created_at`)
- `public.admin_users`: IAM administrator directory (`id`, `uid`, `email`, `display_name`, `role`, `department`, `designation`, `status`)
- `public.visitor_stats`: Anonymous traffic analytics (`id`, `path`, `visitor_id`, `created_at`)

### 4. Implementation Rules
1. Implement defensive queries with `.select()`, `.insert()`, `.upsert()`, and error handling for all data operations.
2. Enable Row Level Security (RLS) policies on all tables.
3. Include real-time listeners using `supabase.channel('custom-filter').on('postgres_changes', ...).subscribe()` where reactive live updates are needed.
4. Provide a health check function pinging `supabase.from('contact_inquiries').select('id', { head: true, count: 'exact' })` to measure connection latency.
```

---

## 🔗 Direct Supabase Cloud Console Navigation Links

If you are logged into Supabase (https://supabase.com):
- **Project Overview Dashboard**: [https://supabase.com/dashboard/project/uekopouskrmoxgrsljti](https://supabase.com/dashboard/project/uekopouskrmoxgrsljti)
- **Table Editor (View Tables & Rows)**: [https://supabase.com/dashboard/project/uekopouskrmoxgrsljti/editor](https://supabase.com/dashboard/project/uekopouskrmoxgrsljti/editor)
- **SQL Editor (Run SQL Schema DDL)**: [https://supabase.com/dashboard/project/uekopouskrmoxgrsljti/sql/new](https://supabase.com/dashboard/project/uekopouskrmoxgrsljti/sql/new)
- **Database Settings & Postgres URI**: [https://supabase.com/dashboard/project/uekopouskrmoxgrsljti/settings/database](https://supabase.com/dashboard/project/uekopouskrmoxgrsljti/settings/database)
- **Authentication & Users**: [https://supabase.com/dashboard/project/uekopouskrmoxgrsljti/auth/users](https://supabase.com/dashboard/project/uekopouskrmoxgrsljti/auth/users)
- **API Keys & Endpoints**: [https://supabase.com/dashboard/project/uekopouskrmoxgrsljti/settings/api](https://supabase.com/dashboard/project/uekopouskrmoxgrsljti/settings/api)

---

## ⚡ How to Create All Tables in 1 Step
1. Open the [Supabase SQL Editor](https://supabase.com/dashboard/project/uekopouskrmoxgrsljti/sql/new).
2. Paste the contents of `supabase_schema.sql` located in this project's root directory.
3. Click **"Run"**. All 8 relational tables, indexes, and Row Level Security policies will be created instantly.
4. View your created database tables in the [Table Editor](https://supabase.com/dashboard/project/uekopouskrmoxgrsljti/editor).
