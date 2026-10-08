import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, CheckCircle2, Sparkles, Flame } from 'lucide-react';
import { SITE_CONTENT, ASSETS } from '../data/siteContent';
import { PhoenixLogo } from '../components/PhoenixLogo';
import { saveNewsletterSignup, useCmsValue } from '../services/supabaseService';
import {
  PageTransition,
  getStaggerContainerVariants,
  getFadeUpItemVariants,
} from '../components/PageTransition';

interface HomePageProps {
  reducedMotion: boolean;
}

export const HomePage: React.FC<HomePageProps> = ({ reducedMotion }) => {
  const containerVariants = getStaggerContainerVariants(reducedMotion);
  const itemVariants = getFadeUpItemVariants(reducedMotion);

  // Dynamic Extensive CMS contents
  const headlinePrefix = useCmsValue('home_hero_headline_prefix', SITE_CONTENT.hero.headlinePrefix);
  const headlineGradient = useCmsValue('home_hero_headline_gradient', SITE_CONTENT.hero.headlineGradient);
  const subHeadline = useCmsValue('home_hero_subheadline', SITE_CONTENT.hero.subHeadline);

  const itTitle = useCmsValue('home_it_title', SITE_CONTENT.homeTeaser.items[0].title);
  const itSummary = useCmsValue('home_it_summary', SITE_CONTENT.homeTeaser.items[0].summary);

  const bdTitle = useCmsValue('home_bd_title', SITE_CONTENT.homeTeaser.items[1].title);
  const bdSummary = useCmsValue('home_bd_summary', SITE_CONTENT.homeTeaser.items[1].summary);

  const mktgTitle = useCmsValue('home_mktg_title', SITE_CONTENT.homeTeaser.items[2].title);
  const mktgSummary = useCmsValue('home_mktg_summary', SITE_CONTENT.homeTeaser.items[2].summary);

  // Secure newsletter states
  const [newsEmail, setNewsEmail] = useState('');
  const [newsSubmitting, setNewsSubmitting] = useState(false);
  const [newsSuccess, setNewsSuccess] = useState(false);
  const [newsError, setNewsError] = useState('');

  const handleNewsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsEmail.trim()) return;
    setNewsSubmitting(true);
    setNewsError('');
    try {
      await saveNewsletterSignup(newsEmail);
      setNewsSuccess(true);
      setNewsEmail('');
    } catch (err) {
      console.error(err);
      setNewsError('Formatting error. Please use a valid email address.');
    } finally {
      setNewsSubmitting(false);
    }
  };

  return (
    <PageTransition reducedMotion={reducedMotion}>
      {/* 1. HERO VIEWPORT — PHOENIX EMERGING FROM THE ASHES WITH SPREADING BLUE FLAMES */}
      <section
        aria-labelledby="page-main-heading"
        className="relative min-h-[calc(100vh-4rem)] py-16 sm:py-24 flex flex-col justify-center overflow-hidden"
      >
        {/* Ambient Blue Flame Wing Glows Spreading Left & Right in the Hero */}
        <div
          className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
          aria-hidden="true"
        >
          <div
            className="absolute -left-24 top-1/4 w-96 h-96 rounded-full blur-3xl opacity-45"
            style={{
              background:
                'radial-gradient(circle, rgba(0, 180, 216, 0.45) 0%, rgba(3, 64, 120, 0.18) 55%, transparent 75%)',
            }}
          />
          <div
            className="absolute -right-24 top-1/4 w-96 h-96 rounded-full blur-3xl opacity-45"
            style={{
              background:
                'radial-gradient(circle, rgba(56, 189, 248, 0.45) 0%, rgba(0, 119, 182, 0.18) 55%, transparent 75%)',
            }}
          />
        </div>



        {/* Central Staggered Hero Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8 sm:pt-16"
        >
          {/* Main Display Headline (Focusable h1 for route accessibility) */}
          <motion.h1
            id="page-main-heading"
            tabIndex={-1}
            variants={itemVariants}
            className="font-serif-display text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.08] text-[#042440] max-w-4xl mx-auto drop-shadow-[0_2px_14px_rgba(255,255,255,0.98)] focus:outline-none"
            style={{ textWrap: 'balance' }}
          >
            <span>{headlinePrefix} </span>
            <span className="text-gradient-phoenix block sm:inline mt-1 sm:mt-0">
              {headlineGradient}
            </span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            variants={itemVariants}
            className="mt-6 sm:mt-8 text-base sm:text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-normal"
            style={{ textWrap: 'balance' }}
          >
            {subHeadline}
          </motion.p>

          {/* 3D Tactile Router CTA Buttons: "Our Services" and "Get in Touch" */}
          <motion.div
            variants={itemVariants}
            className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/services"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-sm font-semibold tracking-wide rounded-md btn-3d-primary whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0077b6]"
            >
              <span>{SITE_CONTENT.hero.primaryCta}</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>

            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-md btn-3d-secondary whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0077b6]"
            >
              <Sparkles className="w-4 h-4 text-[#0077b6]" aria-hidden="true" />
              <span>{SITE_CONTENT.hero.secondaryCta}</span>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* 2. SHORT TEASER ROW PREVIEWING THE THREE SERVICES (IT Solutions, Business Strategies, Content Solutions) */}
      <section
        aria-labelledby="home-services-teaser-heading"
        className="relative z-20 py-20 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#0077b6]/20"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {/* Section Header */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
          >
            <div className="max-w-2xl">
              <p className="text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-[#0077b6]">
                {SITE_CONTENT.homeTeaser.eyebrow}
              </p>
              <h2
                id="home-services-teaser-heading"
                className="mt-2 font-serif-display text-3xl sm:text-4xl font-semibold text-[#042440] tracking-tight"
                style={{ textWrap: 'balance' }}
              >
                {SITE_CONTENT.homeTeaser.headline}
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#1e3a5f] leading-relaxed">
                {SITE_CONTENT.homeTeaser.subHeadline}
              </p>
            </div>

            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#0077b6] hover:text-[#034078] transition-colors shrink-0 focus-visible:outline-2 focus-visible:outline-[#0077b6] rounded-sm"
            >
              <span>Explore All Services</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </motion.div>

          {/* Three 3D Service Teaser Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {SITE_CONTENT.homeTeaser.items.map((service, idx) => {
              const tierIndex = idx as 0 | 1 | 2;
              return (
                <motion.article
                  key={service.id}
                  variants={itemVariants}
                  className="card-phoenix rounded-xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden"
                >
                  <div
                    className="absolute top-0 inset-x-0 h-1.5"
                    style={{ backgroundColor: service.chevronColor }}
                    aria-hidden="true"
                  />

                  <div>
                    <div className="flex items-center justify-between gap-4 mb-5">
                      <span className="font-mono text-xs font-semibold tracking-widest uppercase text-[#0077b6]">
                        {service.index} · {service.codename}
                      </span>
                      <PhoenixLogo
                        size={28}
                        variant="chevron"
                        activeTier={tierIndex}
                        title={`${service.title} Chevron Tier`}
                      />
                    </div>

                    <h3 className="font-serif-display text-2xl font-semibold text-[#042440]">
                      {idx === 0 ? itTitle : idx === 1 ? bdTitle : mktgTitle}
                    </h3>

                    <p className="mt-3 text-sm text-[#1e3a5f] leading-relaxed">
                      {idx === 0 ? itSummary : idx === 1 ? bdSummary : mktgSummary}
                    </p>

                    <ul className="mt-5 pt-4 border-t border-[#0077b6]/15 space-y-2">
                      {service.highlights.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-xs text-[#1e3a5f] font-medium"
                        >
                          <CheckCircle2
                            className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#0077b6]"
                            aria-hidden="true"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-7 pt-4 border-t border-[#0077b6]/15">
                    <Link
                      to={`/services?group=${service.id}`}
                      className="inline-flex items-center justify-between w-full text-xs font-semibold text-[#0077b6] hover:text-[#034078] transition-colors focus-visible:outline-2 focus-visible:outline-[#0077b6] rounded-sm"
                    >
                      <span>Inspect {service.title}</span>
                      <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                    </Link>
                  </div>
                </motion.article>
              );
            })}
          </div>

          {/* SECURE NEWSLETTER SIGNUP CARD */}
          <motion.div
            variants={itemVariants}
            className="mt-12 relative overflow-hidden rounded-2xl border border-[#0077b6]/20 bg-gradient-to-br from-white/95 via-[#f6fbff]/90 to-[#eaf5fe]/70 backdrop-blur-md p-6 sm:p-8 shadow-[0_12px_40px_rgba(3,64,120,0.06)]"
          >
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12">
              <div className="text-left max-w-xl">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-mono font-bold tracking-wider text-[#0077b6] bg-[#0077b6]/8 border border-[#0077b6]/15 uppercase">
                  <Flame className="w-3.5 h-3.5 text-[#00b4d8] animate-pulse" />
                  Business Development Updates
                </span>
                <h3 className="mt-3 font-serif-display text-xl sm:text-2xl font-bold text-[#042440]">
                  Subscribe to the Phoenix Intelligence Brief
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-[#1e3a5f] leading-relaxed">
                  Join our list of enterprise leaders, technology architects, and GTM specialists receiving actionable updates on IT Strategy, high-authority Content Marketing, and concept creation innovation.
                </p>
              </div>

              <div className="w-full md:max-w-md shrink-0">
                {newsSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[#0f5132] text-xs sm:text-sm font-semibold text-center"
                  >
                    🔥 Subscription Activated! You are now allowlisted for upcoming intelligence briefs.
                  </motion.div>
                ) : (
                  <form onSubmit={handleNewsSubmit} className="space-y-2">
                    <div className="flex flex-col sm:flex-row gap-2 text-left">
                      <input
                        type="email"
                        required
                        value={newsEmail}
                        onChange={(e) => setNewsEmail(e.target.value)}
                        placeholder="your.email@enterprise.com"
                        className="flex-1 px-4 py-3 text-xs sm:text-sm font-medium rounded-lg border border-[#0077b6]/25 bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#0077b6]/40 focus:border-[#0077b6] shadow-sm placeholder:text-[#a0aec0] text-[#011627]"
                        disabled={newsSubmitting}
                      />
                      <button
                        type="submit"
                        disabled={newsSubmitting}
                        className="px-5 py-3 text-xs font-bold tracking-wide rounded-lg btn-3d-primary whitespace-nowrap flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                      >
                        <span>{newsSubmitting ? 'Verifying...' : 'Subscribe Now'}</span>
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </div>
                    {newsError && (
                      <p className="text-[11px] font-semibold text-rose-500 text-left pl-1">
                        ⚠️ {newsError}
                      </p>
                    )}
                  </form>
                )}
              </div>
            </div>
          </motion.div>

          {/* Bottom 3D Call-to-Action Strip with "Get in Touch" & "About Us" Router Links */}
          <motion.div
            variants={itemVariants}
            className="mt-12 card-phoenix rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
          >
            <div>
              <p className="text-xs font-mono font-semibold uppercase tracking-widest text-[#0077b6]">
                Ready to Architect Your Next Evolution?
              </p>
              <p className="mt-1 font-serif-display text-xl sm:text-2xl font-semibold text-[#042440]">
                Turn organizational ambiguity into structured, measurable outcomes.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0 w-full sm:w-auto">
              <Link
                to="/about"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center px-5 py-3 text-xs font-semibold tracking-wide rounded-md btn-3d-secondary whitespace-nowrap"
              >
                About Us
              </Link>
              <Link
                to="/contact"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold tracking-wide rounded-md btn-3d-primary whitespace-nowrap"
              >
                <span>Get in Touch</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </PageTransition>
  );
};
