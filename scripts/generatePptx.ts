import pptxgen from 'pptxgenjs';
import fs from 'fs';
import path from 'path';

async function buildPresentation() {
  const pptx = new pptxgen();
  const shapes = (pptx as any).shapes || (pptx as any).ShapeType;

  pptx.layout = 'LAYOUT_16x9';
  pptx.author = 'Phoenix Solutions';
  pptx.company = 'Phoenix Solutions Strategic Evolution';
  pptx.title = 'Phoenix Solutions — 30-60-90 Day Business Growth Plan';

  // Theme Colors
  const NAVY = '034078';
  const BLUE = '0077b6';
  const AQUA = '00b4d8';
  const CHARCOAL = '042440';
  const BG_LIGHT = 'f4f9fe';
  const WHITE = 'ffffff';
  const ACCENT_AMBER = 'ff7b00';
  const GRAY_TEXT = '4a6b8c';

  // Helper for Slide Backgrounds
  const setSlideBg = (slide: pptxgen.Slide, colorHex: string) => {
    slide.background = { color: colorHex };
  };

  // Helper for Header Bar
  const addHeader = (slide: pptxgen.Slide, category: string, title: string) => {
    slide.addText(category.toUpperCase(), {
      x: 0.6,
      y: 0.4,
      w: 12,
      h: 0.3,
      fontSize: 11,
      fontFace: 'Helvetica',
      bold: true,
      color: BLUE,
    });
    slide.addText(title, {
      x: 0.6,
      y: 0.7,
      w: 12,
      h: 0.6,
      fontSize: 22,
      fontFace: 'Georgia',
      bold: true,
      color: CHARCOAL,
    });
    // Accent line
    slide.addShape(shapes.LINE, {
      x: 0.6,
      y: 1.35,
      w: 12.13,
      h: 0,
      line: { color: BLUE, width: 1.5 },
    });
  };

  // Helper for Footer Bar
  const addFooter = (slide: pptxgen.Slide, currentSlide: number, totalSlides: number) => {
    slide.addText('Phoenix Solutions · Executive Execution Blueprint', {
      x: 0.6,
      y: 7.0,
      w: 8,
      h: 0.3,
      fontSize: 9,
      fontFace: 'Helvetica',
      color: GRAY_TEXT,
    });
    slide.addText(`${currentSlide} / ${totalSlides}`, {
      x: 11.5,
      y: 7.0,
      w: 1.2,
      h: 0.3,
      fontSize: 9,
      fontFace: 'Helvetica',
      align: 'right',
      color: GRAY_TEXT,
    });
  };

  // TOTAL SLIDES = 9
  const TOTAL_SLIDES = 9;

  // ==========================================
  // SLIDE 1: Title Slide (Dark Navy)
  // ==========================================
  {
    const slide = pptx.addSlide();
    setSlideBg(slide, CHARCOAL);

    // Decorative Accent Banner
    slide.addShape(shapes.RECTANGLE, {
      x: 0,
      y: 0,
      w: 0.4,
      h: 7.5,
      fill: { color: AQUA },
    });

    slide.addText('PHOENIX SOLUTIONS · EXECUTIVE STRATEGY', {
      x: 1.0,
      y: 1.8,
      w: 10.5,
      h: 0.4,
      fontSize: 12,
      fontFace: 'Helvetica',
      bold: true,
      color: AQUA,
      charSpacing: 2,
    });

    slide.addText('30 - 60 - 90 Day Business Growth Plan', {
      x: 1.0,
      y: 2.3,
      w: 11.0,
      h: 1.4,
      fontSize: 34,
      fontFace: 'Georgia',
      bold: true,
      color: WHITE,
    });

    slide.addText('Streamlined Phase-by-Phase Execution Blueprint for Market Expansion', {
      x: 1.0,
      y: 3.8,
      w: 10.5,
      h: 0.6,
      fontSize: 16,
      fontFace: 'Helvetica',
      color: 'd0e8f8',
    });

    // Leaders Card
    slide.addShape(shapes.ROUNDED_RECTANGLE, {
      x: 1.0,
      y: 4.8,
      w: 11.0,
      h: 1.8,
      fill: { color: NAVY },
      line: { color: BLUE, width: 1 },
      rectRadius: 0.1,
    });

    slide.addText('EXECUTIVE LEADERSHIP & RESPONSIBILITY SPLIT', {
      x: 1.3,
      y: 5.0,
      w: 10.4,
      h: 0.3,
      fontSize: 10,
      fontFace: 'Helvetica',
      bold: true,
      color: ACCENT_AMBER,
    });

    slide.addText('Praveen G. Menon — Founder & Managing Partner (IT Strategy, SaaS Architecture & B2B Content Systems)\nVishnudas Menon — Co-Founder & Director of Operations (Business Operations, Strategic Alliances & CX)', {
      x: 1.3,
      y: 5.4,
      w: 10.4,
      h: 1.0,
      fontSize: 12,
      fontFace: 'Helvetica',
      color: WHITE,
      lineSpacing: 20,
    });

    addFooter(slide, 1, TOTAL_SLIDES);
  }

  // ==========================================
  // SLIDE 2: Executive Overview (2 Phases / Month)
  // ==========================================
  {
    const slide = pptx.addSlide();
    setSlideBg(slide, WHITE);
    addHeader(slide, 'Executive Architecture', '6-Phase Execution Framework (2 Phases / Month)');

    const months = [
      {
        month: 'MONTH 1 (Days 1–30)',
        tag: 'FOUNDATION & LAUNCH',
        p1: 'Phase 1 (Days 1–15): Digital Asset & Target List Setup',
        p2: 'Phase 2 (Days 16–30): Warm Direct Outreach & First Content',
        color: NAVY,
      },
      {
        month: 'MONTH 2 (Days 31–60)',
        tag: 'PARTNERSHIPS & AUDITS',
        p1: 'Phase 3 (Days 31–45): Alliance Outreach & Weekly Publishing',
        p2: 'Phase 4 (Days 46–60): Discovery Calls & RFP Proposals',
        color: BLUE,
      },
      {
        month: 'MONTH 3 (Days 61–90)',
        tag: 'CONVERSION & RETAINERS',
        p1: 'Phase 5 (Days 61–75): Closing First Clients & Delivery',
        p2: 'Phase 6 (Days 76–90): Recurring Retainers & Testimonials',
        color: AQUA,
      },
    ];

    months.forEach((m, idx) => {
      const xPos = 0.6 + idx * 4.1;
      // Card Container
      slide.addShape(shapes.ROUNDED_RECTANGLE, {
        x: xPos,
        y: 1.6,
        w: 3.8,
        h: 5.0,
        fill: { color: BG_LIGHT },
        line: { color: m.color, width: 2 },
        rectRadius: 0.15,
      });

      // Header Box inside Card
      slide.addShape(shapes.ROUNDED_RECTANGLE, {
        x: xPos + 0.15,
        y: 1.8,
        w: 3.5,
        h: 0.9,
        fill: { color: m.color },
        rectRadius: 0.1,
      });

      slide.addText(m.month, {
        x: xPos + 0.2,
        y: 1.9,
        w: 3.4,
        h: 0.3,
        fontSize: 12,
        fontFace: 'Helvetica',
        bold: true,
        color: WHITE,
        align: 'center',
      });

      slide.addText(m.tag, {
        x: xPos + 0.2,
        y: 2.25,
        w: 3.4,
        h: 0.3,
        fontSize: 9,
        fontFace: 'Helvetica',
        color: 'e0f2fe',
        align: 'center',
      });

      // Content text
      slide.addText(`FIRST HALF OF MONTH:\n• ${m.p1}\n\nSECOND HALF OF MONTH:\n• ${m.p2}`, {
        x: xPos + 0.3,
        y: 2.9,
        w: 3.2,
        h: 3.5,
        fontSize: 11,
        fontFace: 'Helvetica',
        color: CHARCOAL,
        lineSpacing: 18,
      });
    });

    addFooter(slide, 2, TOTAL_SLIDES);
  }

  // ==========================================
  // SLIDE 3: Month 1 - Phase 1 (Days 1–15)
  // ==========================================
  {
    const slide = pptx.addSlide();
    setSlideBg(slide, WHITE);
    addHeader(slide, 'Month 1 · Days 1 to 15', 'Phase 1: Foundation & Digital Setup');

    // Left Column: Praveen
    slide.addShape(shapes.ROUNDED_RECTANGLE, {
      x: 0.6,
      y: 1.6,
      w: 5.9,
      h: 5.0,
      fill: { color: BG_LIGHT },
      line: { color: NAVY, width: 1.5 },
      rectRadius: 0.1,
    });

    slide.addText('PRAVEEN G. MENON — TECH & CONTENT', {
      x: 0.9,
      y: 1.9,
      w: 5.3,
      h: 0.4,
      fontSize: 12,
      fontFace: 'Helvetica',
      bold: true,
      color: NAVY,
    });

    const praveenItemsP1 = [
      '1. Digital Asset Audit: Verify live domain (phoenixsolutions.co), SSL security, contact form routing, and email endpoints (pgmenon@live.com).',
      '2. Core Service Collateral: Finalize executive 1-pager PDFs detailing the 3 practice suites (IT Strategy, Business Dev, B2B Content).',
      '3. LinkedIn Profile Alignment: Update headline and bio to reflect Founder & Managing Partner, Enterprise IT & Content Systems Advisory.',
    ];

    slide.addText(praveenItemsP1.join('\n\n'), {
      x: 0.9,
      y: 2.4,
      w: 5.3,
      h: 3.9,
      fontSize: 11,
      fontFace: 'Helvetica',
      color: CHARCOAL,
      lineSpacing: 18,
    });

    // Right Column: Vishnu
    slide.addShape(shapes.ROUNDED_RECTANGLE, {
      x: 6.8,
      y: 1.6,
      w: 5.9,
      h: 5.0,
      fill: { color: BG_LIGHT },
      line: { color: BLUE, width: 1.5 },
      rectRadius: 0.1,
    });

    slide.addText('VISHNUDAS MENON — OPERATIONS & CX', {
      x: 7.1,
      y: 1.9,
      w: 5.3,
      h: 0.4,
      fontSize: 12,
      fontFace: 'Helvetica',
      bold: true,
      color: BLUE,
    });

    const vishnuItemsP1 = [
      '1. Target Prospect Database: Compile a initial curated target list of 50 enterprise decision-makers (CTOs, Founders, Directors of BizDev).',
      '2. CRM Lead Tracking Setup: Configure internal lead pipeline to track inbound queries, discovery call schedules, and deal stages.',
      '3. LinkedIn Profile Alignment: Update headline and bio to reflect Co-Founder & Director of Operations, Client Engagement & BizDev.',
    ];

    slide.addText(vishnuItemsP1.join('\n\n'), {
      x: 7.1,
      y: 2.4,
      w: 5.3,
      h: 3.9,
      fontSize: 11,
      fontFace: 'Helvetica',
      color: CHARCOAL,
      lineSpacing: 18,
    });

    addFooter(slide, 3, TOTAL_SLIDES);
  }

  // ==========================================
  // SLIDE 4: Month 1 - Phase 2 (Days 16–30)
  // ==========================================
  {
    const slide = pptx.addSlide();
    setSlideBg(slide, WHITE);
    addHeader(slide, 'Month 1 · Days 16 to 30', 'Phase 2: Warm Direct Outreach & Initial Positioning');

    // Left Column: Praveen
    slide.addShape(shapes.ROUNDED_RECTANGLE, {
      x: 0.6,
      y: 1.6,
      w: 5.9,
      h: 5.0,
      fill: { color: BG_LIGHT },
      line: { color: NAVY, width: 1.5 },
      rectRadius: 0.1,
    });

    slide.addText('PRAVEEN G. MENON — TECH & CONTENT', {
      x: 0.9,
      y: 1.9,
      w: 5.3,
      h: 0.4,
      fontSize: 12,
      fontFace: 'Helvetica',
      bold: true,
      color: NAVY,
    });

    const praveenItemsP2 = [
      '1. First Thought Leadership Launch: Publish 2 high-impact technical articles/carousels on LinkedIn covering Modular Cloud ERP Schemas.',
      '2. Warm Network Introduction: Send direct personalized executive briefs to 20 warm senior tech contacts in Praveen’s network.',
      '3. Initial Discovery Calls: Conduct 20-minute technical discovery calls with incoming warm inquiries to identify system friction.',
    ];

    slide.addText(praveenItemsP2.join('\n\n'), {
      x: 0.9,
      y: 2.4,
      w: 5.3,
      h: 3.9,
      fontSize: 11,
      fontFace: 'Helvetica',
      color: CHARCOAL,
      lineSpacing: 18,
    });

    // Right Column: Vishnu
    slide.addShape(shapes.ROUNDED_RECTANGLE, {
      x: 6.8,
      y: 1.6,
      w: 5.9,
      h: 5.0,
      fill: { color: BG_LIGHT },
      line: { color: BLUE, width: 1.5 },
      rectRadius: 0.1,
    });

    slide.addText('VISHNUDAS MENON — OPERATIONS & CX', {
      x: 7.1,
      y: 1.9,
      w: 5.3,
      h: 0.4,
      fontSize: 12,
      fontFace: 'Helvetica',
      bold: true,
      color: BLUE,
    });

    const vishnuItemsP2 = [
      '1. Warm Outreach Campaign: Reach out directly to 25 warm business contacts in Vishnu’s network via phone/message to introduce Phoenix Solutions.',
      '2. 48-Hour Follow-Up Cadence: Execute structured follow-up calls with all Phase 1 prospects to lock in discovery calls.',
      '3. Discovery Call Scheduling: Manage pre-call discovery questionnaires and send executive calendar invites for booked sessions.',
    ];

    slide.addText(vishnuItemsP2.join('\n\n'), {
      x: 7.1,
      y: 2.4,
      w: 5.3,
      h: 3.9,
      fontSize: 11,
      fontFace: 'Helvetica',
      color: CHARCOAL,
      lineSpacing: 18,
    });

    addFooter(slide, 4, TOTAL_SLIDES);
  }

  // ==========================================
  // SLIDE 5: Month 2 - Phase 3 (Days 31–45)
  // ==========================================
  {
    const slide = pptx.addSlide();
    setSlideBg(slide, WHITE);
    addHeader(slide, 'Month 2 · Days 31 to 45', 'Phase 3: Partnership Engines & Weekly Publishing');

    // Left Column: Praveen
    slide.addShape(shapes.ROUNDED_RECTANGLE, {
      x: 0.6,
      y: 1.6,
      w: 5.9,
      h: 5.0,
      fill: { color: BG_LIGHT },
      line: { color: NAVY, width: 1.5 },
      rectRadius: 0.1,
    });

    slide.addText('PRAVEEN G. MENON — TECH & CONTENT', {
      x: 0.9,
      y: 1.9,
      w: 5.3,
      h: 0.4,
      fontSize: 12,
      fontFace: 'Helvetica',
      bold: true,
      color: NAVY,
    });

    const praveenItemsP3 = [
      '1. Weekly LinkedIn Cadence: Publish 1 technical breakdown per week covering AI Workflow Automation and Generative Engine Optimization (GEO).',
      '2. Diagnostic Audit Templates: Finalize standardized technical audit checklists for IT strategy and custom SaaS database reviews.',
      '3. Joint Proposal Frameworks: Draft flexible proposal templates for co-selling partners and strategic joint ventures.',
    ];

    slide.addText(praveenItemsP3.join('\n\n'), {
      x: 0.9,
      y: 2.4,
      w: 5.3,
      h: 3.9,
      fontSize: 11,
      fontFace: 'Helvetica',
      color: CHARCOAL,
      lineSpacing: 18,
    });

    // Right Column: Vishnu
    slide.addShape(shapes.ROUNDED_RECTANGLE, {
      x: 6.8,
      y: 1.6,
      w: 5.9,
      h: 5.0,
      fill: { color: BG_LIGHT },
      line: { color: BLUE, width: 1.5 },
      rectRadius: 0.1,
    });

    slide.addText('VISHNUDAS MENON — OPERATIONS & CX', {
      x: 7.1,
      y: 1.9,
      w: 5.3,
      h: 0.4,
      fontSize: 12,
      fontFace: 'Helvetica',
      bold: true,
      color: BLUE,
    });

    const vishnuItemsP3 = [
      '1. Alliance Partner Outreach: Initiate discussions with 15 non-competing technology providers and advisory firms for co-selling alliances.',
      '2. Target Account Outreach: Begin targeted professional outreach to 15 new cold accounts from the primary target list.',
      '3. SLA & Response Governance: Monitor lead response times, ensuring all incoming inquiries receive an executive response within 12 hours.',
    ];

    slide.addText(vishnuItemsP3.join('\n\n'), {
      x: 7.1,
      y: 2.4,
      w: 5.3,
      h: 3.9,
      fontSize: 11,
      fontFace: 'Helvetica',
      color: CHARCOAL,
      lineSpacing: 18,
    });

    addFooter(slide, 5, TOTAL_SLIDES);
  }

  // ==========================================
  // SLIDE 6: Month 2 - Phase 4 (Days 46–60)
  // ==========================================
  {
    const slide = pptx.addSlide();
    setSlideBg(slide, WHITE);
    addHeader(slide, 'Month 2 · Days 46 to 60', 'Phase 4: Discovery Audits & Client Pitching');

    // Left Column: Praveen
    slide.addShape(shapes.ROUNDED_RECTANGLE, {
      x: 0.6,
      y: 1.6,
      w: 5.9,
      h: 5.0,
      fill: { color: BG_LIGHT },
      line: { color: NAVY, width: 1.5 },
      rectRadius: 0.1,
    });

    slide.addText('PRAVEEN G. MENON — TECH & CONTENT', {
      x: 0.9,
      y: 1.9,
      w: 5.3,
      h: 0.4,
      fontSize: 12,
      fontFace: 'Helvetica',
      bold: true,
      color: NAVY,
    });

    const praveenItemsP4 = [
      '1. Lead Technical Discovery: Conduct in-depth technical audit calls for qualified prospects, mapping legacy bottlenecks.',
      '2. Deliver Roadmap Findings: Present custom IT strategy and modular ERP architecture roadmap presentations to prospective clients.',
      '3. RFP & Proposal Engineering: Tailor comprehensive commercial proposals detailing implementation scope, timelines, and deliverables.',
    ];

    slide.addText(praveenItemsP4.join('\n\n'), {
      x: 0.9,
      y: 2.4,
      w: 5.3,
      h: 3.9,
      fontSize: 11,
      fontFace: 'Helvetica',
      color: CHARCOAL,
      lineSpacing: 18,
    });

    // Right Column: Vishnu
    slide.addShape(shapes.ROUNDED_RECTANGLE, {
      x: 6.8,
      y: 1.6,
      w: 5.9,
      h: 5.0,
      fill: { color: BG_LIGHT },
      line: { color: BLUE, width: 1.5 },
      rectRadius: 0.1,
    });

    slide.addText('VISHNUDAS MENON — OPERATIONS & CX', {
      x: 7.1,
      y: 1.9,
      w: 5.3,
      h: 0.4,
      fontSize: 12,
      fontFace: 'Helvetica',
      bold: true,
      color: BLUE,
    });

    const vishnuItemsP4 = [
      '1. Commercial Discovery Calls: Lead commercial and business operations discovery discussions alongside Praveen.',
      '2. Proposal Follow-Up & Negotiation: Deliver commercial proposals, address operational questions, and finalize deal terms.',
      '3. Co-Selling Charters: Formalize initial co-selling alliance charters with responsive technology and channel partners.',
    ];

    slide.addText(vishnuItemsP4.join('\n\n'), {
      x: 7.1,
      y: 2.4,
      w: 5.3,
      h: 3.9,
      fontSize: 11,
      fontFace: 'Helvetica',
      color: CHARCOAL,
      lineSpacing: 18,
    });

    addFooter(slide, 6, TOTAL_SLIDES);
  }

  // ==========================================
  // SLIDE 7: Month 3 - Phase 5 (Days 61–75)
  // ==========================================
  {
    const slide = pptx.addSlide();
    setSlideBg(slide, WHITE);
    addHeader(slide, 'Month 3 · Days 61 to 75', 'Phase 5: Commercial Conversions & Project Onboarding');

    // Left Column: Praveen
    slide.addShape(shapes.ROUNDED_RECTANGLE, {
      x: 0.6,
      y: 1.6,
      w: 5.9,
      h: 5.0,
      fill: { color: BG_LIGHT },
      line: { color: NAVY, width: 1.5 },
      rectRadius: 0.1,
    });

    slide.addText('PRAVEEN G. MENON — TECH & CONTENT', {
      x: 0.9,
      y: 1.9,
      w: 5.3,
      h: 0.4,
      fontSize: 12,
      fontFace: 'Helvetica',
      bold: true,
      color: NAVY,
    });

    const praveenItemsP5 = [
      '1. Project Kick-Off Execution: Initiate Stage 1 Discovery Audits or Stage 2 SaaS/ERP builds for newly signed client accounts.',
      '2. Database & API Build: Begin database schema design, workflow automation setup, or content mapping per contract scope.',
      '3. Weekly Technical Reporting: Provide clear, structured weekly technical progress updates to active client stakeholders.',
    ];

    slide.addText(praveenItemsP5.join('\n\n'), {
      x: 0.9,
      y: 2.4,
      w: 5.3,
      h: 3.9,
      fontSize: 11,
      fontFace: 'Helvetica',
      color: CHARCOAL,
      lineSpacing: 18,
    });

    // Right Column: Vishnu
    slide.addShape(shapes.ROUNDED_RECTANGLE, {
      x: 6.8,
      y: 1.6,
      w: 5.9,
      h: 5.0,
      fill: { color: BG_LIGHT },
      line: { color: BLUE, width: 1.5 },
      rectRadius: 0.1,
    });

    slide.addText('VISHNUDAS MENON — OPERATIONS & CX', {
      x: 7.1,
      y: 1.9,
      w: 5.3,
      h: 0.4,
      fontSize: 12,
      fontFace: 'Helvetica',
      bold: true,
      color: BLUE,
    });

    const vishnuItemsP5 = [
      '1. Contracting & Invoicing: Execute formal client consulting agreements, issue deposit invoices, and manage payment terms.',
      '2. Client Onboarding: Lead smooth client onboarding sessions, establishing communication channels and delivery expectations.',
      '3. CX Quality Governance: Conduct bi-weekly check-in calls with active clients to ensure 100% operational satisfaction.',
    ];

    slide.addText(vishnuItemsP5.join('\n\n'), {
      x: 7.1,
      y: 2.4,
      w: 5.3,
      h: 3.9,
      fontSize: 11,
      fontFace: 'Helvetica',
      color: CHARCOAL,
      lineSpacing: 18,
    });

    addFooter(slide, 7, TOTAL_SLIDES);
  }

  // ==========================================
  // SLIDE 8: Month 3 - Phase 6 (Days 76–90)
  // ==========================================
  {
    const slide = pptx.addSlide();
    setSlideBg(slide, WHITE);
    addHeader(slide, 'Month 3 · Days 76 to 90', 'Phase 6: Retainer Conversion & Systemized Scale');

    // Left Column: Praveen
    slide.addShape(shapes.ROUNDED_RECTANGLE, {
      x: 0.6,
      y: 1.6,
      w: 5.9,
      h: 5.0,
      fill: { color: BG_LIGHT },
      line: { color: NAVY, width: 1.5 },
      rectRadius: 0.1,
    });

    slide.addText('PRAVEEN G. MENON — TECH & CONTENT', {
      x: 0.9,
      y: 1.9,
      w: 5.3,
      h: 0.4,
      fontSize: 12,
      fontFace: 'Helvetica',
      bold: true,
      color: NAVY,
    });

    const praveenItemsP6 = [
      '1. Project Cutover & Delivery: Complete initial implementation engagements and present final executive outcome reports.',
      '2. Retainer Proposals: Present monthly advisory retainer options to completed project clients for ongoing optimization.',
      '3. Real-World Case Study: Author and publish 1 detailed client transformation case study based on completed Month 2/3 work.',
    ];

    slide.addText(praveenItemsP6.join('\n\n'), {
      x: 0.9,
      y: 2.4,
      w: 5.3,
      h: 3.9,
      fontSize: 11,
      fontFace: 'Helvetica',
      color: CHARCOAL,
      lineSpacing: 18,
    });

    // Right Column: Vishnu
    slide.addShape(shapes.ROUNDED_RECTANGLE, {
      x: 6.8,
      y: 1.6,
      w: 5.9,
      h: 5.0,
      fill: { color: BG_LIGHT },
      line: { color: BLUE, width: 1.5 },
      rectRadius: 0.1,
    });

    slide.addText('VISHNUDAS MENON — OPERATIONS & CX', {
      x: 7.1,
      y: 1.9,
      w: 5.3,
      h: 0.4,
      fontSize: 12,
      fontFace: 'Helvetica',
      bold: true,
      color: BLUE,
    });

    const vishnuItemsP6 = [
      '1. Recurring Retainer Closing: Finalize ongoing monthly advisory retainers with satisfied project clients.',
      '2. Testimonials & Referrals: Request written executive testimonials from clients and secure 2 warm peer referrals.',
      '3. 90-Day Performance Review: Review 90-day revenue targets, refine prospect database, and set Month 4–6 growth targets.',
    ];

    slide.addText(vishnuItemsP6.join('\n\n'), {
      x: 7.1,
      y: 2.4,
      w: 5.3,
      h: 3.9,
      fontSize: 11,
      fontFace: 'Helvetica',
      color: CHARCOAL,
      lineSpacing: 18,
    });

    addFooter(slide, 8, TOTAL_SLIDES);
  }

  // ==========================================
  // SLIDE 9: 90-Day KPI Scorecard
  // ==========================================
  {
    const slide = pptx.addSlide();
    setSlideBg(slide, WHITE);
    addHeader(slide, 'Accountability & Targets', '90-Day Executive Key Performance Indicators (KPIs)');

    // Table of KPIs
    const rows: pptxgen.TableRow[] = [
      [
        { text: 'Key Performance Metric', options: { bold: true, fill: { color: NAVY }, color: WHITE } },
        { text: 'Praveen (Tech & Content)', options: { bold: true, fill: { color: NAVY }, color: WHITE } },
        { text: 'Vishnu (Operations & CX)', options: { bold: true, fill: { color: NAVY }, color: WHITE } },
        { text: 'Combined 90-Day Target', options: { bold: true, fill: { color: NAVY }, color: WHITE } },
      ],
      [
        { text: 'LinkedIn Authority Touchpoints' },
        { text: '8 Technical Posts / Articles' },
        { text: '4 Profile / Update Posts' },
        { text: '12 Authority Touchpoints' },
      ],
      [
        { text: 'Direct Outreach Connections' },
        { text: '20 Warm Tech Intros' },
        { text: '50 Direct Prospect Contacts' },
        { text: '70 Direct Connections' },
      ],
      [
        { text: 'Qualified Discovery Audits' },
        { text: '6 Technical Audits' },
        { text: '6 Commercial Audits' },
        { text: '6 Booked Audits' },
      ],
      [
        { text: 'Strategic Alliances Formed' },
        { text: '2 Co-Selling Technical Frameworks' },
        { text: '3 Alliance Charters Executed' },
        { text: '3 Active Partnerships' },
      ],
      [
        { text: 'Closed Client Accounts' },
        { text: '2 IT Strategy / SaaS Builds' },
        { text: '1 GTM / Advisory Retainer' },
        { text: '2 – 3 Closed Client Contracts' },
      ],
    ];

    slide.addTable(rows, {
      x: 0.6,
      y: 1.6,
      w: 12.13,
      h: 4.8,
      fontSize: 11,
      fontFace: 'Helvetica',
      border: { pt: 1, color: 'd0e8f8' },
      align: 'left',
      colW: [3.5, 2.9, 2.9, 2.83],
    });

    addFooter(slide, 9, TOTAL_SLIDES);
  }

  // Ensure public directory exists
  const publicDir = path.resolve('public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const outPathPublic = path.join(publicDir, 'Phoenix_Solutions_90_Day_Growth_Plan.pptx');
  const outPathRoot = path.resolve('Phoenix_Solutions_90_Day_Growth_Plan.pptx');

  await pptx.writeFile({ fileName: outPathPublic });
  await pptx.writeFile({ fileName: outPathRoot });

  console.log(`✅ PPTX Presentation successfully generated at:\n  - ${outPathPublic}\n  - ${outPathRoot}`);
}

buildPresentation().catch((err) => {
  console.error('❌ Error generating PPTX presentation:', err);
  process.exit(1);
});
