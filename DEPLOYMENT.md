# Phoenix Solutions — Step-by-Step Deployment Guide

This document details how to build, deploy, and connect your modern React TypeScript Vite SPA with its Firebase/Supabase-ready backend to a **GoDaddy custom domain name**.

---

## Table of Contents
1. [Phase 1: Compiling the Build Assets](#phase-1-compiling-the-build-assets)
2. [Phase 2: Deploying Your Static Assets](#phase-2-deploying-your-static-assets)
    * [Option A: Modern Cloud Hosting (Vercel / Netlify - Recommended)](#option-a-modern-cloud-hosting-vercel--netlify---recommended)
    * [Option B: GoDaddy Shared Web Hosting (cPanel)](#option-b-godaddy-shared-web-hosting-cpanel)
3. [Phase 3: Pointing Your GoDaddy Domain Name (DNS Setup)](#phase-3-pointing-your-godaddy-domain-name-dns-setup)
4. [Phase 4: Firebase Console Domain Allowlisting (Crucial for Google Sign-In)](#phase-4-firebase-console-domain-allowlisting-crucial-for-google-sign-in)
5. [Phase 5: Deploying Firestore Security Rules](#phase-5-deploying-firestore-security-rules)

---

## Phase 1: Compiling the Build Assets

Vite React SPAs are composed of modular components which must be compiled, optimized, and minified into basic, hyper-fast static assets (`HTML`, `JS`, `CSS`, and images).

1. Open your terminal in the root directory of your project.
2. Run the production compiler script:
   ```bash
   npm run build
   ```
3. Once completed, a new folder named **`dist/`** will be generated in your project root.
   * **Note**: Only the files *inside* this `dist/` folder are deployed to your web server. You do not upload the `node_modules/`, `src/`, or configuration files to hosting.

---

## Phase 2: Deploying Your Static Assets

Choose **one** of the two following hosting methods. Option A is highly recommended for performance, speed, and automated security.

### Option A: Modern Cloud Hosting (Vercel / Netlify - Recommended)
Modern hosting platforms are 100% free, provide high-speed Global CDNs, and provision free SSL (HTTPS) certificates automatically.

#### Using Netlify Drop (No Terminal Required)
1. Go to [Netlify Drop](https://app.netlify.com/drop).
2. Drag your compiled **`dist/`** folder and drop it into the upload box on the webpage.
3. Your website will be live in under 5 seconds with a temporary subdomain (e.g. `phoenix-solutions.netlify.app`).

#### Using Vercel CLI or Dashboard
1. Go to [Vercel](https://vercel.com) and create a free account.
2. Link your GitHub account and import your repository, OR drag and drop the `dist/` folder into the Vercel project creation screen.
3. Vercel automatically detects Vite configurations and launches your site instantly.

---

### Option B: GoDaddy Shared Web Hosting (cPanel)
If you have an active paid Shared Web Hosting account directly with GoDaddy, use these cPanel upload instructions:

1. Open the **`dist/`** folder on your machine.
2. Select all items *inside* `dist/` and compress them into a single **`.zip`** archive (e.g., `archive.zip`).
3. Log in to your **GoDaddy Dashboard**, find your Web Hosting plan, and click **cPanel Admin**.
4. Open the **File Manager** and enter the **`public_html`** folder (this is the public directory of your server).
5. Click **Upload** in the cPanel navigation bar, select your `.zip` archive, and upload it.
6. Once uploaded, right-click the `.zip` file inside File Manager and choose **Extract**.
   * *Critical Verification*: Ensure your `index.html` sits directly inside `public_html` (i.e. `public_html/index.html`), and **not** nested inside an extra folder.
7. **Configure React Router Redirects**: To prevent `404 Not Found` errors when refreshing secondary pages on shared cPanel servers, create a file named **`.htaccess`** inside `public_html` and paste the following redirect configuration:
   ```apache
   RewriteEngine On
   RewriteBase /
   RewriteRule ^index\.html$ - [L]
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteCond %{REQUEST_FILENAME} !-d
   RewriteRule . /index.html [L]
   ```

---

## Phase 3: Pointing Your GoDaddy Domain Name (DNS Setup)

DNS (Domain Name System) settings tell GoDaddy where to route visitors when they enter your domain name in their browsers.

1. Log in to your [GoDaddy Domain Portfolio](https://dcc.godaddy.com/).
2. Find your custom domain name, click the **three dots** (Options), and select **Manage DNS**.
3. You must configure two primary records to connect your domain to your hosting platform (examples below are for Vercel; check your cloud provider's console for their exact IP/subdomain addresses):

| Type | Name | Value | TTL | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **A** | `@` | `76.76.21.21` *(Vercel IP)* | 1 Hour / Default | Connects your root domain (`yourdomain.com`) |
| **CNAME** | `www` | `your-site.vercel.app` *(Your App URL)* | 1 Hour / Default | Connects your www subdomain (`www.yourdomain.com`) |

*   *Note*: Ensure that there are no duplicate `A` records for name `@` pointing to other servers, as they will conflict. Delete any legacy `A` records pointing to default GoDaddy placeholders.

---

## Phase 4: Supabase Production Schema & Connection Setup

Since your application backend, CRM, and analytics are connected to **Supabase PostgreSQL**:

1. Open your [Supabase SQL Editor](https://supabase.com/dashboard/project/uekopouskrmoxgrsljti/sql/new).
2. Execute the database definitions in `supabase_schema.sql` to instantiate the 8 tables, indexes, and Row Level Security policies.
3. In [Supabase Auth Settings](https://supabase.com/dashboard/project/uekopouskrmoxgrsljti/auth/url-configuration), add your custom domain to **Site URL** and **Redirect URLs** (e.g., `https://yourdomain.com`).

---

## Phase 5: Deploying Supabase Edge Function & Daily Task Scheduler

To run the automated web lead scraper and business requirement discovery daily:

1. Deploy the Edge Function using the Supabase CLI:
   ```bash
   npx supabase functions deploy daily-leads-scraper --project-ref uekopouskrmoxgrsljti
   ```
2. Schedule the daily task at 8:00 AM UTC (1:30 PM IST) via pg_cron:
   - Run the script in `supabase/functions/daily-leads-scraper/schedule.sql` in your Supabase SQL Editor.
3. Verify the scheduled task in the cron registry or test via the admin console.

---

### Propagation Notice
DNS record changes are distributed globally through root servers. This process typically takes **5 minutes to 2 hours** to fully propagate. Once complete, your site will be fully operational with a secure SSL (HTTPS) connection!
