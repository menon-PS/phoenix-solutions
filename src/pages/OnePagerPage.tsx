import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Flame,
  ShieldCheck,
  Award,
  Layers,
  Sparkles,
  ArrowRight,
  Send,
  CheckCircle2,
  ChevronDown,
  Building2,
  Cpu,
  Target,
  Share2,
  HelpCircle,
  Clock,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
} from 'lucide-react';
import { SITE_CONTENT, ASSETS } from '../data/siteContent';
import { submitContactInquiry } from '../services/contactService';
import {
  PageTransition,
  getStaggerContainerVariants,
  getFadeUpItemVariants,
} from '../components/PageTransition';

interface OnePagerPageProps {
  reducedMotion: boolean;
}

export const OnePagerPage: React.FC<OnePagerPageProps> = ({ reducedMotion }) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    organization: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const containerVariants = getStaggerContainerVariants(reducedMotion);
  const itemVariants = getFadeUpItemVariants(reducedMotion);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      await submitContactInquiry({
        name: formState.name,
        email: formState.email,
        organization: formState.organization,
        message: formState.message,
      });
      setSubmitted(true);
      setFormState({ name: '', email: '', organization: '', message: '' });
    } catch (err: any) {
      console.error('Submission error:', err);
      setErrorMessage(
        err?.message || 'Unable to transmit brief. Please try emailing directly at pgmenon@live.com'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
    }
  };

  const faqs = [
    {
      q: 'What is Phoenix Solutions and what does the firm do?',
      a: 'Phoenix Solutions is an enterprise consulting firm headquartered in Bengaluru, India. Founded by Praveen G. Menon and Co-Founder Vishnudas Menon, the firm provides IT Strategy consulting, Custom Modular SaaS/ERP Architecture, Corporate Business Development programs, and High-Authority B2B Content Marketing systems for growing enterprises.',
    },
    {
      q: 'What core practice suites does Phoenix Solutions provide?',
      a: 'Phoenix Solutions operates three integrated practice suites: 1) Enterprise IT Strategy & Custom Modular SaaS Architecture (monolith decoupling, database schema design, automated API setups), 2) Business Development & Strategic GTM Alliances (outbound pipeline engineering, co-selling charters), and 3) High-Authority B2B Content Marketing Systems (topic-authority mapping, executive C-suite LinkedIn positioning, GEO AI search optimization).',
    },
    {
      q: 'How does modular ERP differ from traditional monolithic ERP?',
      a: 'Modular ERP separates business functions (procurement, CRM, invoicing, vendor RFQs) into independent, cloud-native services connected via secure REST APIs. Unlike monolithic ERPs that bind all data into rigid codebases, modular ERPs allow individual components to scale independently with zero downtime.',
    },
    {
      q: 'How quickly does leadership respond to consultation briefs?',
      a: 'All executive consultation briefs submitted through this portal undergo direct review by leadership with a guaranteed response within 1 business day.',
    },
  ];

  return (
    <PageTransition reducedMotion={reducedMotion}>
      <div className="relative w-full overflow-hidden text-[#042440]">
        {/* Sticky Floating Anchor Bar */}
        <div className="sticky top-20 z-40 bg-white/85 backdrop-blur-md border-b border-[#0077b6]/20 shadow-xs">
          <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0077b6] shrink-0 flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-[#00b4d8]" />
              Executive One-Pager
            </span>
            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'leadership', label: 'Leadership' },
                { id: 'services', label: 'Practice Suites' },
                { id: 'methodology', label: 'Methodology' },
                { id: 'faqs', label: 'FAQs' },
                { id: 'contact', label: 'Book Advisory' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => scrollToSection(tab.id)}
                  className="px-3 py-1.5 text-xs font-medium rounded-full text-[#1e3a5f] hover:text-[#0077b6] hover:bg-[#0077b6]/10 transition-colors cursor-pointer"
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
          {/* Section 1: Hero & Corporate Vision */}
          <section id="overview" className="scroll-mt-36">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white/80 backdrop-blur-md border border-[#0077b6]/20 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xl relative overflow-hidden space-y-8"
            >
              <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#00b4d8]/15 via-[#0077b6]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

              <div className="space-y-4 max-w-4xl relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f0f7fe] border border-[#0077b6]/20 text-xs font-mono font-bold uppercase tracking-wider text-[#0077b6]">
                  <Sparkles className="w-3.5 h-3.5 text-[#00b4d8]" />
                  <span>Phoenix Strategic Evolution · Corporate Profile</span>
                </div>
                <h1 className="font-serif-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gradient-phoenix leading-[1.1]">
                  Integrating Structural Technology with High-Authority GTM Communication
                </h1>
                <p className="text-base sm:text-xl text-[#1e3a5f] leading-relaxed font-normal">
                  Phoenix Solutions architects the seamless convergence of enterprise IT strategies, custom modular ERP architectures, commercial business development frameworks, and high-authority B2B content marketing systems.
                </p>
              </div>

              {/* Quick Pillars Snapshot Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 relative z-10">
                <div className="p-6 rounded-2xl bg-gradient-to-br from-[#f8fbff] to-[#f0f7fe] border border-[#0077b6]/20 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#034078] text-white flex items-center justify-center font-serif-display font-bold text-lg shadow-md">
                    01
                  </div>
                  <h3 className="font-serif-display text-lg font-bold text-[#042440]">
                    Enterprise IT Strategy
                  </h3>
                  <p className="text-xs text-[#1e3a5f] leading-relaxed">
                    Decoupling legacy monoliths, designing modular relational database schemas, and deploying secure cloud API middleware.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-gradient-to-br from-[#f8fbff] to-[#f0f7fe] border border-[#0077b6]/20 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0077b6] text-white flex items-center justify-center font-serif-display font-bold text-lg shadow-md">
                    02
                  </div>
                  <h3 className="font-serif-display text-lg font-bold text-[#042440]">
                    Business Development Alliances
                  </h3>
                  <p className="text-xs text-[#1e3a5f] leading-relaxed">
                    Outbound pipeline engineering, joint-venture co-selling charters, RFP proposal models, and C-suite negotiation coaching.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-gradient-to-br from-[#f8fbff] to-[#f0f7fe] border border-[#0077b6]/20 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#00b4d8] text-white flex items-center justify-center font-serif-display font-bold text-lg shadow-md">
                    03
                  </div>
                  <h3 className="font-serif-display text-lg font-bold text-[#042440]">
                    B2B Content Marketing & GEO
                  </h3>
                  <p className="text-xs text-[#1e3a5f] leading-relaxed">
                    Topic-authority content mapping, C-suite LinkedIn positioning, and Schema.org knowledge graph optimization for AI search.
                  </p>
                </div>
              </div>

              {/* Action Bar */}
              <div className="pt-2 flex flex-wrap items-center gap-4 relative z-10 border-t border-[#0077b6]/15">
                <button
                  type="button"
                  onClick={() => scrollToSection('contact')}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#034078] via-[#0077b6] to-[#00b4d8] text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Initiate Executive Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href="https://wa.me/918179093087?text=Hello%20Phoenix%20Solutions%2C%20I%20would%20like%20to%20discuss%20an%20executive%20consultation."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl bg-white border border-[#0077b6]/30 text-[#0077b6] hover:bg-[#f0f7fe] font-semibold text-sm transition-all flex items-center gap-2"
                >
                  <span>Direct WhatsApp Connect</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          </section>

          {/* Section 2: Executive Leadership */}
          <section id="leadership" className="scroll-mt-36">
            <div className="bg-white/80 backdrop-blur-md border border-[#0077b6]/20 rounded-3xl p-6 sm:p-10 shadow-xl space-y-8">
              <div className="border-b border-[#0077b6]/15 pb-4">
                <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#0077b6]">
                  <Award className="w-4 h-4 text-[#00b4d8]" />
                  <span>Leadership & Executive Credentials</span>
                </div>
                <h2 className="font-serif-display text-2xl sm:text-4xl font-bold text-[#042440] mt-1">
                  Executive Practice Leadership
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Founder */}
                <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#021b30] via-[#042f55] to-[#034078] text-white shadow-lg space-y-4 relative overflow-hidden">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#00e5ff] via-[#0077b6] to-[#034078] text-white font-serif-display font-bold text-xl flex items-center justify-center shadow-md border border-white/20">
                      PM
                    </div>
                    <div>
                      <h3 className="font-serif-display text-xl font-bold text-white">
                        PRAVEEN G. MENON
                      </h3>
                      <p className="text-xs font-mono text-[#00b4d8]">
                        Founder & Managing Partner
                      </p>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    Enterprise IT strategist and management consultant specializing in custom ERP/SaaS architectures, commercial outbound pipeline models, B2B content authority systems, and experiential leadership development.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {['IT Strategy', 'ERP Architecture', 'B2B Content', 'Partnership Alliances'].map((tag) => (
                      <span key={tag} className="px-2.5 py-1 rounded-md bg-white/10 text-[11px] font-mono text-[#90e0ef]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Co-Founder */}
                <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#021c2f] via-[#003554] to-[#0077b6] text-white shadow-lg space-y-4 relative overflow-hidden">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#90e0ef] via-[#00b4d8] to-[#0077b6] text-white font-serif-display font-bold text-xl flex items-center justify-center shadow-md border border-white/20">
                      VM
                    </div>
                    <div>
                      <h3 className="font-serif-display text-xl font-bold text-white">
                        VISHNUDAS MENON
                      </h3>
                      <p className="text-xs font-mono text-[#90e0ef]">
                        Co-Founder & Director of Operations
                      </p>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    Operations lead and business consultant with extensive background in customer experience (CX) architecture, key account client engagement, service level agreement (SLA) governance, and cross-departmental coordination.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {['Business Operations', 'CX Architecture', 'SLA Governance', 'Client Engagement'].map((tag) => (
                      <span key={tag} className="px-2.5 py-1 rounded-md bg-white/10 text-[11px] font-mono text-[#90e0ef]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: The 3 Core Practice Suites */}
          <section id="services" className="scroll-mt-36">
            <div className="bg-white/80 backdrop-blur-md border border-[#0077b6]/20 rounded-3xl p-6 sm:p-10 shadow-xl space-y-8">
              <div className="border-b border-[#0077b6]/15 pb-4">
                <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#0077b6]">
                  <Cpu className="w-4 h-4 text-[#00b4d8]" />
                  <span>Integrated Practice Suites</span>
                </div>
                <h2 className="font-serif-display text-2xl sm:text-4xl font-bold text-[#042440] mt-1">
                  Core Enterprise Offerings
                </h2>
              </div>

              <div className="space-y-8">
                {/* Practice 1 */}
                <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#0077b6]/20 shadow-sm space-y-4 relative">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#0077b6]/15 pb-3">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-[#034078] text-white flex items-center justify-center font-bold text-xs font-mono">
                        01
                      </span>
                      <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-[#042440]">
                        Enterprise IT Strategy & Custom Modular SaaS/ERP
                      </h3>
                    </div>
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#f0f7fe] text-[#0077b6] font-semibold border border-[#0077b6]/20 w-fit">
                      Technology Architecture
                    </span>
                  </div>
                  <p className="text-sm text-[#1e3a5f] leading-relaxed">
                    We transition spreadsheet operations and legacy monolith databases into modular, cloud-native software architectures. Solutions feature normalized relational database tables for buyers, vendors, RFQs, quotations, multi-tier invoices, and automated financial reporting.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    <div className="p-3 rounded-lg bg-[#f8fbff] border border-[#0077b6]/15 text-xs text-[#042440] font-medium">
                      ✓ Legacy Monolith Decoupling
                    </div>
                    <div className="p-3 rounded-lg bg-[#f8fbff] border border-[#0077b6]/15 text-xs text-[#042440] font-medium">
                      ✓ Modular Relational ERP Schemas
                    </div>
                    <div className="p-3 rounded-lg bg-[#f8fbff] border border-[#0077b6]/15 text-xs text-[#042440] font-medium">
                      ✓ Express RESTful Cloud APIs
                    </div>
                  </div>
                </div>

                {/* Practice 2 */}
                <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#0077b6]/20 shadow-sm space-y-4 relative">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#0077b6]/15 pb-3">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-[#0077b6] text-white flex items-center justify-center font-bold text-xs font-mono">
                        02
                      </span>
                      <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-[#042440]">
                        Business Development & Strategic GTM Alliances
                      </h3>
                    </div>
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#f0f7fe] text-[#0077b6] font-semibold border border-[#0077b6]/20 w-fit">
                      Commercial Growth
                    </span>
                  </div>
                  <p className="text-sm text-[#1e3a5f] leading-relaxed">
                    Engineering modern B2B outbound growth pipelines, joint-venture co-selling charters, and corporate partnership networks. We bridge the strategic execution gap through standardized RFP proposals and C-suite negotiation coaching.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    <div className="p-3 rounded-lg bg-[#f8fbff] border border-[#0077b6]/15 text-xs text-[#042440] font-medium">
                      ✓ Outbound Lead Scoring & Outreach
                    </div>
                    <div className="p-3 rounded-lg bg-[#f8fbff] border border-[#0077b6]/15 text-xs text-[#042440] font-medium">
                      ✓ Joint Venture Co-Selling Charters
                    </div>
                    <div className="p-3 rounded-lg bg-[#f8fbff] border border-[#0077b6]/15 text-xs text-[#042440] font-medium">
                      ✓ RFP Proposal Engineering
                    </div>
                  </div>
                </div>

                {/* Practice 3 */}
                <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#0077b6]/20 shadow-sm space-y-4 relative">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#0077b6]/15 pb-3">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-[#00b4d8] text-white flex items-center justify-center font-bold text-xs font-mono">
                        03
                      </span>
                      <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-[#042440]">
                        High-Authority B2B Content Marketing & GEO
                      </h3>
                    </div>
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#f0f7fe] text-[#0077b6] font-semibold border border-[#0077b6]/20 w-fit">
                      Market Authority
                    </span>
                  </div>
                  <p className="text-sm text-[#1e3a5f] leading-relaxed">
                    Structuring topic-authority content graphs, C-suite LinkedIn thought leadership campaigns, and Schema.org JSON-LD structured data to ensure high citation frequency across conversational AI search engines (Gemini, Perplexity, ChatGPT).
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    <div className="p-3 rounded-lg bg-[#f8fbff] border border-[#0077b6]/15 text-xs text-[#042440] font-medium">
                      ✓ Generative Engine Optimization (GEO)
                    </div>
                    <div className="p-3 rounded-lg bg-[#f8fbff] border border-[#0077b6]/15 text-xs text-[#042440] font-medium">
                      ✓ Executive LinkedIn Positioning
                    </div>
                    <div className="p-3 rounded-lg bg-[#f8fbff] border border-[#0077b6]/15 text-xs text-[#042440] font-medium">
                      ✓ Topic-Authority Content Graphs
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Methodology */}
          <section id="methodology" className="scroll-mt-36">
            <div className="bg-white/80 backdrop-blur-md border border-[#0077b6]/20 rounded-3xl p-6 sm:p-10 shadow-xl space-y-8">
              <div className="border-b border-[#0077b6]/15 pb-4">
                <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#0077b6]">
                  <Target className="w-4 h-4 text-[#00b4d8]" />
                  <span>The Phoenix Lifecycle</span>
                </div>
                <h2 className="font-serif-display text-2xl sm:text-4xl font-bold text-[#042440] mt-1">
                  Three-Stage Execution Framework
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-white border border-[#0077b6]/20 shadow-xs space-y-3">
                  <span className="text-xs font-mono font-bold text-[#034078]">STAGE 01</span>
                  <h3 className="font-serif-display text-xl font-bold text-[#042440]">IGNITE</h3>
                  <p className="text-xs text-[#1e3a5f] leading-relaxed">
                    Auditing institutional complexities, mapping technology requirements, and identifying high-value commercial gaps.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-[#0077b6]/20 shadow-xs space-y-3">
                  <span className="text-xs font-mono font-bold text-[#0077b6]">STAGE 02</span>
                  <h3 className="font-serif-display text-xl font-bold text-[#042440]">FORGE</h3>
                  <p className="text-xs text-[#1e3a5f] leading-relaxed">
                    Designing integrated IT strategy blueprints, relational database schemas, and joint venture co-selling charters.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-[#0077b6]/20 shadow-xs space-y-3">
                  <span className="text-xs font-mono font-bold text-[#00b4d8]">STAGE 03</span>
                  <h3 className="font-serif-display text-xl font-bold text-[#042440]">SOAR</h3>
                  <p className="text-xs text-[#1e3a5f] leading-relaxed">
                    Deploying production-ready SaaS/ERP databases, executing go-to-market outreach, and systemizing operations for compound scale.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: FAQs */}
          <section id="faqs" className="scroll-mt-36">
            <div className="bg-white/80 backdrop-blur-md border border-[#0077b6]/20 rounded-3xl p-6 sm:p-10 shadow-xl space-y-8">
              <div className="border-b border-[#0077b6]/15 pb-4">
                <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#0077b6]">
                  <HelpCircle className="w-4 h-4 text-[#00b4d8]" />
                  <span>AI Grounded Executive Q&A</span>
                </div>
                <h2 className="font-serif-display text-2xl sm:text-4xl font-bold text-[#042440] mt-1">
                  Frequently Asked Questions
                </h2>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, idx) => {
                  const isOpen = activeFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="rounded-xl bg-white border border-[#0077b6]/20 overflow-hidden transition-all shadow-2xs"
                    >
                      <button
                        type="button"
                        onClick={() => setActiveFaq(isOpen ? null : idx)}
                        className="w-full px-6 py-4 text-left font-serif-display font-semibold text-base sm:text-lg text-[#042440] flex items-center justify-between gap-4 cursor-pointer hover:bg-[#f0f7fe] transition-colors"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-5 h-5 text-[#0077b6] shrink-0 transition-transform duration-200 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-5 pt-1 text-sm text-[#1e3a5f] leading-relaxed border-t border-[#0077b6]/10 bg-[#f8fbff]">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Section 6: Direct Executive Briefing / Contact */}
          <section id="contact" className="scroll-mt-36">
            <div className="bg-white/80 backdrop-blur-md border border-[#0077b6]/20 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xl space-y-8 relative overflow-hidden">
              <div className="border-b border-[#0077b6]/15 pb-4">
                <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#0077b6]">
                  <Send className="w-4 h-4 text-[#00b4d8]" />
                  <span>Direct Executive Channel</span>
                </div>
                <h2 className="font-serif-display text-2xl sm:text-4xl font-bold text-[#042440] mt-1">
                  Book an Executive Consultation
                </h2>
                <p className="mt-2 text-sm text-[#1e3a5f]">
                  Direct review by Founders Praveen G. Menon & Vishnudas Menon within 1 business day.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-5 space-y-6">
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-[#021627] to-[#042f55] text-white space-y-4 shadow-md">
                    <h3 className="font-serif-display text-xl font-bold text-white">
                      Phoenix Solutions Headquarters
                    </h3>
                    <div className="space-y-3 text-xs sm:text-sm text-slate-200">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-4 h-4 text-[#00b4d8] shrink-0 mt-0.5" />
                        <span>Bengaluru, Karnataka, India</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="w-4 h-4 text-[#00b4d8] shrink-0" />
                        <span>+91 8179093087</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="w-4 h-4 text-[#00b4d8] shrink-0" />
                        <span>pgmenon@live.com</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7">
                  {submitted ? (
                    <div className="p-8 rounded-2xl bg-[#f0f7fe] border border-[#0077b6]/30 text-center space-y-4">
                      <CheckCircle2 className="w-12 h-12 text-[#00b4d8] mx-auto" />
                      <h3 className="font-serif-display text-2xl font-bold text-[#042440]">
                        Consultation Brief Received
                      </h3>
                      <p className="text-sm text-[#1e3a5f]">
                        Thank you. Your strategic brief has been logged and transmitted directly to leadership. You will receive a direct response within 1 business day.
                      </p>
                      <button
                        type="button"
                        onClick={() => setSubmitted(false)}
                        className="mt-4 px-6 py-2.5 rounded-xl bg-[#0077b6] text-white font-semibold text-xs cursor-pointer"
                      >
                        Send Another Brief
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {errorMessage && (
                        <div className="p-3 rounded-lg bg-red-50 text-red-700 text-xs border border-red-200">
                          {errorMessage}
                        </div>
                      )}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-mono font-bold uppercase text-[#042440] mb-1">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={formState.name}
                            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                            placeholder="Praveen Kumar"
                            className="w-full px-4 py-3 rounded-xl bg-white border border-[#0077b6]/25 text-sm text-[#042440] focus:outline-none focus:ring-2 focus:ring-[#0077b6]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-mono font-bold uppercase text-[#042440] mb-1">
                            Work Email *
                          </label>
                          <input
                            type="email"
                            required
                            value={formState.email}
                            onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                            placeholder="praveen@enterprise.com"
                            className="w-full px-4 py-3 rounded-xl bg-white border border-[#0077b6]/25 text-sm text-[#042440] focus:outline-none focus:ring-2 focus:ring-[#0077b6]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-mono font-bold uppercase text-[#042440] mb-1">
                          Organization
                        </label>
                        <input
                          type="text"
                          value={formState.organization}
                          onChange={(e) => setFormState({ ...formState, organization: e.target.value })}
                          placeholder="Global Tech Enterprise"
                          className="w-full px-4 py-3 rounded-xl bg-white border border-[#0077b6]/25 text-sm text-[#042440] focus:outline-none focus:ring-2 focus:ring-[#0077b6]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono font-bold uppercase text-[#042440] mb-1">
                          Brief Initiative / Project Description *
                        </label>
                        <textarea
                          required
                          rows={4}
                          value={formState.message}
                          onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                          placeholder="Describe your target IT strategy needs, ERP architecture goals, business development initiatives, or content marketing objectives..."
                          className="w-full px-4 py-3 rounded-xl bg-white border border-[#0077b6]/25 text-sm text-[#042440] focus:outline-none focus:ring-2 focus:ring-[#0077b6]"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#034078] via-[#0077b6] to-[#00b4d8] text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <span>Transmitting Strategic Brief...</span>
                        ) : (
                          <>
                            <span>Transmit Strategic Consultation Brief</span>
                            <Send className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </PageTransition>
  );
};
