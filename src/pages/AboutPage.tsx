import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle2,
  Layers,
  Sparkles,
  Compass,
  Users,
  Building2,
  X,
  Briefcase,
  Award,
  TrendingUp,
  Target,
  Shield,
  ExternalLink,
  FileText,
  Mail,
  ChevronRight,
  Star,
} from 'lucide-react';
import {
  SITE_CONTENT,
  ASSETS,
  SelectedExperienceItem,
} from '../data/siteContent';
import { PhoenixLogo } from '../components/PhoenixLogo';
import {
  PageTransition,
  getStaggerContainerVariants,
  getFadeUpItemVariants,
} from '../components/PageTransition';
import { useCmsValue } from '../services/supabaseService';

interface AboutPageProps {
  reducedMotion: boolean;
}

type ExperienceFilter = 'all' | SelectedExperienceItem['category'];
type TeamMemberView = 'all' | 'founder' | 'cofounder';

export const AboutPage: React.FC<AboutPageProps> = ({ reducedMotion }) => {
  const { aboutSection } = SITE_CONTENT;
  const location = useLocation();
  const [experienceFilter, setExperienceFilter] =
    useState<ExperienceFilter>('all');
  const [selectedProfileModal, setSelectedProfileModal] = useState<'founder' | 'cofounder' | null>(null);

  const containerVariants = getStaggerContainerVariants(reducedMotion);
  const itemVariants = getFadeUpItemVariants(reducedMotion);

  // Dynamic Extensive CMS Content
  const missionTitle = useCmsValue('about_mission_title', aboutSection.companyOverview.headline);
  const missionDesc = useCmsValue('about_mission_desc', aboutSection.companyOverview.leadParagraph);
  const missionImage = useCmsValue('about_mission_image', ASSETS.heroBanner);

  const pmTitle = useCmsValue('about_pm_title', aboutSection.name);
  const pmRole = useCmsValue('about_pm_role', 'Founder & Managing Partner');
  const pmDesc = useCmsValue('about_pm_desc', aboutSection.leadParagraph);
  const pmHeadline = useCmsValue('about_pm_headline', aboutSection.headline);
  const founderImage = useCmsValue('about_pm_image', ASSETS.founderPortrait || '/founder_praveen.svg');
  const founderContributionsCms = useCmsValue('about_pm_contributions', '');

  const vmTitle = useCmsValue('about_vm_title', aboutSection.coFounderProfile.name);
  const vmRole = useCmsValue('about_vm_role', 'Co-Founder & Director of Operations');
  const vmDesc = useCmsValue('about_vm_desc', aboutSection.coFounderProfile.leadParagraph);
  const vmHeadline = useCmsValue('about_vm_headline', aboutSection.coFounderProfile.headline);
  const cofounderImage = useCmsValue('about_vm_image', ASSETS.cofounderPortrait || '/cofounder_vishnudas.svg');
  const cofounderContributionsCms = useCmsValue('about_vm_contributions', '');

  const dynamicLogo = useCmsValue('logo_emblem_url', ASSETS.logoEmblem);

  // URL Query & Hash listener to open pop-up automatically without redirecting away
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const modalParam = searchParams.get('modal') || searchParams.get('profile');
    const hash = (location.hash || '').toLowerCase();

    if (modalParam === 'founder' || hash === '#founder' || hash === '#founder-praveen-menon') {
      setSelectedProfileModal('founder');
    } else if (
      modalParam === 'cofounder' ||
      modalParam === 'co-founder' ||
      hash === '#cofounder' ||
      hash === '#cofounder-vishnudas-menon'
    ) {
      setSelectedProfileModal('cofounder');
    }
  }, [location.search, location.hash]);

  // Handle ESC key to dismiss modal and disable body scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProfileModal(null);
      }
    };
    if (selectedProfileModal) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedProfileModal]);

  const filteredExperience =
    experienceFilter === 'all'
      ? aboutSection.selectedExperience
      : aboutSection.selectedExperience.filter(
          (item) => item.category === experienceFilter
        );

  return (
    <PageTransition reducedMotion={reducedMotion}>
      <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-20"
        >
          {/* Quick Page Section Navigation Bar (Section 1: About Phoenix Solutions | Section 2: Meet the Team) */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pb-4 border-b border-[#0077b6]/20"
          >
            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-[0.2em] text-[#0077b6]">
              <Sparkles className="w-3.5 h-3.5 text-[#00b4d8]" aria-hidden="true" />
              <span>{aboutSection.eyebrow}</span>
            </div>

            <div
              className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2 sm:gap-2.5 w-full sm:w-auto"
              role="navigation"
              aria-label="About Us Page Sections"
            >
              <a
                href="#about-phoenix-solutions"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById('about-phoenix-solutions')
                    ?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 text-xs font-semibold rounded-md btn-3d-secondary text-center truncate"
              >
                <Building2 className="w-3.5 h-3.5 text-[#0077b6] shrink-0" aria-hidden="true" />
                <span className="truncate">1. About Phoenix</span>
              </a>
              <a
                href="#meet-the-team"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById('meet-the-team')
                    ?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 text-xs font-semibold rounded-md btn-3d-primary text-center truncate"
              >
                <Users className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                <span className="truncate">2. Meet the Team</span>
              </a>
            </div>
          </motion.div>

          {/* =====================================================================
              SECTION 1: ABOUT PHOENIX SOLUTIONS
          ===================================================================== */}
          <motion.section
            id="about-phoenix-solutions"
            variants={itemVariants}
            aria-labelledby="page-main-heading"
            className="space-y-12"
          >
            {/* 1A. Corporate Hero Card with 3D White & Aqua Phoenix Banner (Mobile Optimized) */}
            <div className="card-phoenix rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative min-h-[290px] sm:min-h-0 sm:h-64 w-full overflow-hidden border-b border-[#0077b6]/20 bg-gradient-to-b from-[#e8f4fc] to-white flex items-stretch sm:items-center">
                <img
                  src={missionImage}
                  alt="Phoenix Solutions 3D White and Aqua Phoenix rising banner"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.endsWith(ASSETS.heroBannerFallback)) {
                      target.src = ASSETS.heroBannerFallback;
                    }
                  }}
                  className="absolute inset-0 w-full h-full object-cover object-[center_28%] sm:object-center opacity-100 block transition-transform duration-700"
                />

                {/* Responsive Dual-Layer Gradient: Vertical fade on mobile, horizontal fade on desktop */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-white via-white/85 via-50% to-transparent sm:bg-gradient-to-r sm:from-white/95 sm:via-white/70 sm:to-white/80 pointer-events-none"
                />
                <div
                  className="absolute inset-0 bg-radial-at-tr from-cyan-400/10 via-transparent to-transparent pointer-events-none"
                />

                <div className="relative z-10 w-full px-4 sm:px-8 lg:px-10 py-5 sm:py-0 flex flex-col justify-between sm:flex-row sm:items-center gap-4 sm:gap-6">
                  {/* Mobile Top Row: Header Badge & 3D Logo Emblem */}
                  <div className="flex sm:hidden items-center justify-between w-full">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-xs border border-[#0077b6]/20 shadow-xs">
                      <span className="w-2 h-2 rounded-full bg-[#00b4d8] animate-pulse" />
                      <span className="text-[10px] font-mono font-bold tracking-widest text-[#0077b6] uppercase">
                        {aboutSection.companyOverview.eyebrow}
                      </span>
                    </div>

                    <div className="logo-frame-3d w-14 h-14 rounded-xl overflow-hidden p-1.5 shrink-0 shadow-md bg-white/95 backdrop-blur-xs border border-[#0077b6]/20">
                      <img
                        src={dynamicLogo}
                        alt="Phoenix Solutions White and Aqua Emblem"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (!target.src.endsWith(ASSETS.logoEmblemFallback)) {
                            target.src = ASSETS.logoEmblemFallback;
                          }
                        }}
                        className="w-full h-full object-contain block"
                      />
                    </div>
                  </div>

                  {/* Main Title & Subtitle Info Box (Enhanced frosted card on mobile for flawless contrast) */}
                  <div className="max-w-2xl bg-white/90 sm:bg-transparent backdrop-blur-md sm:backdrop-blur-none p-4 sm:p-0 rounded-xl text-left border border-[#0077b6]/15 sm:border-0 shadow-xs sm:shadow-none">
                    <p className="hidden sm:block text-[10px] sm:text-xs font-mono font-semibold uppercase tracking-[0.25em] text-[#0077b6]">
                      {aboutSection.companyOverview.eyebrow}
                    </p>
                    <h1
                      id="page-main-heading"
                      tabIndex={-1}
                      className="mt-0.5 sm:mt-1 font-serif-display text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gradient-phoenix focus:outline-none leading-tight"
                    >
                      {aboutSection.companyOverview.title}
                    </h1>
                    <p className="mt-1 sm:mt-1.5 text-[11px] sm:text-xs font-mono font-semibold uppercase tracking-wider text-[#034078]">
                      {aboutSection.companyOverview.subtitle}
                    </p>
                  </div>

                  {/* Desktop Logo Emblem */}
                  <div className="hidden sm:flex logo-frame-3d w-20 h-20 sm:w-22 sm:h-22 lg:w-28 lg:h-28 rounded-2xl overflow-hidden p-2 shrink-0 shadow-md bg-white">
                    <img
                      src={dynamicLogo}
                      alt="Phoenix Solutions White and Aqua Emblem"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (!target.src.endsWith(ASSETS.logoEmblemFallback)) {
                          target.src = ASSETS.logoEmblemFallback;
                        }
                      }}
                      className="w-full h-full object-contain block"
                    />
                  </div>
                </div>
              </div>

              {/* Corporate Narrative & Three Integrated Pillars */}
              <div className="p-6 sm:p-10 lg:p-12 space-y-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                  <div className="lg:col-span-7 space-y-4">
                    <h2
                      className="font-serif-display text-2xl sm:text-4xl font-semibold text-[#042440] leading-tight"
                      style={{ textWrap: 'balance' }}
                    >
                      {missionTitle}
                    </h2>
                    <p className="text-base sm:text-lg text-[#1e3a5f] leading-relaxed">
                      {missionDesc}
                    </p>
                  </div>

                  {/* Intersection Manifesto Box */}
                  <div className="lg:col-span-5 bg-[#f4f9fe] border border-[#0077b6]/20 rounded-xl p-6 space-y-4 shadow-[inset_0_2px_6px_rgba(4,36,64,0.05)]">
                    <p className="text-xs font-mono font-semibold uppercase tracking-widest text-[#0077b6]">
                      The Phoenix Solutions Thesis
                    </p>
                    <p className="font-serif-display text-lg font-semibold text-[#042440]">
                      {aboutSection.intersectionManifesto.lead}
                    </p>
                    <p className="text-xs sm:text-sm text-[#1e3a5f] leading-relaxed">
                      {aboutSection.intersectionManifesto.body}
                    </p>
                    <div className="pt-3 border-t border-[#0077b6]/15 space-y-2">
                      {aboutSection.intersectionManifesto.crescendo.map(
                        (line, idx) => (
                          <div
                            key={line}
                            className="flex items-center gap-2.5 px-3 py-2 bg-white border border-[#0077b6]/20 rounded-lg shadow-2xs"
                          >
                            <span className="font-mono text-xs font-bold text-[#0077b6] tabular-nums">
                              0{idx + 1}
                            </span>
                            <span className="font-serif-display text-sm font-semibold text-[#042440]">
                              {line}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>

                {/* Three Core Practice Pillars of Phoenix Solutions */}
                <div className="pt-8 border-t border-[#0077b6]/15">
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
                    <div>
                      <p className="text-xs font-mono font-semibold uppercase tracking-widest text-[#0077b6]">
                        Integrated Practice Architecture
                      </p>
                      <h3 className="mt-1 font-serif-display text-xl sm:text-2xl font-semibold text-[#042440]">
                        Three Pillars of Organizational Rebirth
                      </h3>
                    </div>
                    <Link
                      to="/services"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0077b6] hover:text-[#034078]"
                    >
                      <span>Explore Full Practice Suites</span>
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {aboutSection.companyOverview.corePillars.map(
                      (pillar, idx) => {
                        const tierIndex = idx as 0 | 1 | 2;
                        return (
                          <div
                            key={pillar.title}
                            className="p-6 bg-white border border-[#0077b6]/20 border-b-3 border-b-[#034078]/25 rounded-xl shadow-sm relative overflow-hidden flex flex-col justify-between"
                          >
                            <div
                              className="absolute top-0 inset-x-0 h-1.5"
                              style={{ backgroundColor: pillar.accentColor }}
                              aria-hidden="true"
                            />
                            <div>
                              <div className="flex items-center justify-between gap-3 mb-3">
                                <span className="font-mono text-xs font-semibold text-[#0077b6]">
                                  PILLAR {pillar.index}
                                </span>
                                <PhoenixLogo
                                  size={24}
                                  variant="chevron"
                                  activeTier={tierIndex}
                                />
                              </div>
                              <h4 className="font-serif-display text-xl font-semibold text-[#042440]">
                                {pillar.title}
                              </h4>
                              <p className="text-xs font-medium text-[#0077b6] mt-0.5">
                                {pillar.subtitle}
                              </p>
                              <p className="mt-3 text-xs sm:text-sm text-[#1e3a5f] leading-relaxed">
                                {pillar.summary}
                              </p>
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>

                {/* 6-Step Execution Methodology of Phoenix Solutions */}
                <div className="pt-8 border-t border-[#0077b6]/15">
                  <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-[0.2em] text-[#0077b6] mb-1">
                    <Compass className="w-4 h-4" aria-hidden="true" />
                    <span>Our 6-Step Execution Methodology</span>
                  </div>
                  <h3 className="font-serif-display text-xl sm:text-2xl font-semibold text-[#042440] mb-6">
                    From Discovery to Scalable Systems
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
                    {aboutSection.myApproach.map((step) => (
                      <div
                        key={step.step}
                        className="p-4 bg-[#f8fbff] border border-[#0077b6]/20 border-t-3 rounded-xl shadow-2xs"
                        style={{ borderTopColor: step.color }}
                      >
                        <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                          <span className="text-[#0077b6] font-bold">
                            {step.step}
                          </span>
                          <span className="text-[#5b7a99]">→</span>
                        </div>
                        <h4 className="font-serif-display text-base font-semibold text-[#042440]">
                          {step.title}
                        </h4>
                        <p className="mt-1 text-xs text-[#1e3a5f] leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* =====================================================================
              SECTION 2: MEET THE TEAM
              (1. Founder - Praveen G. Menon | 2. Co-Founder - Vishnudas Menon)
          ===================================================================== */}
          <motion.section
            id="meet-the-team"
            variants={itemVariants}
            aria-labelledby="meet-the-team-heading"
            className="pt-8 border-t-2 border-[#0077b6]/20 space-y-12"
          >
            {/* Section 2 Header */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="max-w-2xl">
                <p className="text-xs font-mono font-semibold uppercase tracking-[0.25em] text-[#0077b6]">
                  {aboutSection.teamOverview.eyebrow}
                </p>
                <h2
                  id="meet-the-team-heading"
                  className="mt-1.5 font-serif-display text-3xl sm:text-5xl font-bold text-[#042440] tracking-tight"
                >
                  {aboutSection.teamOverview.title}
                </h2>
                <p className="mt-3 text-sm sm:text-base text-[#1e3a5f] leading-relaxed">
                  {aboutSection.teamOverview.subtitle}
                </p>
              </div>
            </div>

            {/* Executive Leadership Showcase Cards (Clickable to open rich Pop-up Dossier) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Card 1: Praveen G. Menon (Founder) */}
              <div
                onClick={() => setSelectedProfileModal('founder')}
                className="card-phoenix rounded-2xl p-7 flex flex-col justify-between gap-6 border-l-4 border-l-[#034078] text-left cursor-pointer w-full hover:shadow-[0_16px_36px_rgba(0,119,182,0.16)] transition-all duration-300 group hover:-translate-y-1 bg-white/70"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedProfileModal('founder');
                  }
                }}
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="inline-flex items-center gap-2">
                        <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider text-white bg-[#034078] rounded-md shadow-2xs">
                          {pmRole}
                        </span>
                        <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#0077b6]">
                          Managing Partner
                        </span>
                      </div>
                      <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#042440] group-hover:text-[#0077b6] transition-colors">
                        {pmTitle}
                      </h3>
                      <p className="text-xs text-[#0077b6] font-semibold">
                        Phoenix Solutions Executive Leadership
                      </p>
                    </div>

                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl shrink-0 flex items-center justify-center bg-gradient-to-br from-[#034078] to-[#0077b6] text-white font-serif-display font-bold text-lg sm:text-xl shadow-md border border-[#00e5ff]/30">
                      PK
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#1e3a5f] leading-relaxed line-clamp-3">
                    {pmDesc}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {aboutSection.domains.slice(0, 3).map((domain) => (
                      <span
                        key={domain}
                        className="px-2 py-0.5 text-[11px] font-medium bg-[#f0f7fe] text-[#034078] border border-[#0077b6]/20 rounded-md"
                      >
                        {domain}
                      </span>
                    ))}
                    <span className="px-2 py-0.5 text-[11px] font-medium bg-[#f0f7fe] text-[#0077b6] border border-[#0077b6]/20 rounded-md">
                      + More
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#0077b6]/15 flex items-center justify-between text-xs font-bold text-[#0077b6] group-hover:text-[#034078]">
                  <span className="inline-flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#00b4d8]" />
                    <span>View Experience & Contributions</span>
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] uppercase tracking-wider font-mono">
                    <span>Open Pop-up Dossier</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>

              {/* Card 2: Vishnudas Menon (Co-Founder) */}
              <div
                onClick={() => setSelectedProfileModal('cofounder')}
                className="card-phoenix rounded-2xl p-7 flex flex-col justify-between gap-6 border-l-4 border-l-[#00b4d8] text-left cursor-pointer w-full hover:shadow-[0_16px_36px_rgba(0,180,216,0.16)] transition-all duration-300 group hover:-translate-y-1 bg-white/70"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedProfileModal('cofounder');
                  }
                }}
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="inline-flex items-center gap-2">
                        <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider text-white bg-[#0077b6] rounded-md shadow-2xs">
                          {vmRole}
                        </span>
                        <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#0077b6]">
                          Director of Operations
                        </span>
                      </div>
                      <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#042440] group-hover:text-[#0077b6] transition-colors">
                        {vmTitle}
                      </h3>
                      <p className="text-xs text-[#0077b6] font-semibold">
                        Phoenix Solutions Executive Leadership
                      </p>
                    </div>

                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl shrink-0 flex items-center justify-center bg-gradient-to-br from-[#0077b6] to-[#00b4d8] text-white font-serif-display font-bold text-lg sm:text-xl shadow-md border border-[#90e0ef]/30">
                      VM
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#1e3a5f] leading-relaxed line-clamp-3">
                    {vmDesc}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {aboutSection.coFounderProfile.domains.slice(0, 3).map((domain) => (
                      <span
                        key={domain}
                        className="px-2 py-0.5 text-[11px] font-medium bg-[#f0f7fe] text-[#034078] border border-[#0077b6]/20 rounded-md"
                      >
                        {domain}
                      </span>
                    ))}
                    <span className="px-2 py-0.5 text-[11px] font-medium bg-[#f0f7fe] text-[#0077b6] border border-[#0077b6]/20 rounded-md">
                      + More
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#0077b6]/15 flex items-center justify-between text-xs font-bold text-[#0077b6] group-hover:text-[#034078]">
                  <span className="inline-flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#00b4d8]" />
                    <span>View Experience & Contributions</span>
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] uppercase tracking-wider font-mono">
                    <span>Open Pop-up Dossier</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </div>

            {/* Direct Strategic Advisory Consultation Strip */}
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#034078]/8 via-[#0077b6]/6 to-white border border-[#0077b6]/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs">
              <div className="space-y-1.5 max-w-2xl text-left">
                <div className="inline-flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-[#00b4d8] animate-pulse" />
                  <span className="text-[11px] font-mono font-bold tracking-widest uppercase text-[#0077b6]">
                    Direct Executive Governance
                  </span>
                </div>
                <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-[#042440]">
                  Engage Directly with Praveen G. Menon &amp; Vishnudas Menon
                </h3>
                <p className="text-xs sm:text-sm text-[#1e3a5f] leading-relaxed">
                  Every consulting engagement at Phoenix Solutions is directly supervised by our founding principals, pairing structural IT architecture with rigorous operational execution.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setSelectedProfileModal('founder')}
                  className="px-4 py-2.5 text-xs font-semibold rounded-lg btn-3d-secondary cursor-pointer"
                >
                  Founder Dossier
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedProfileModal('cofounder')}
                  className="px-4 py-2.5 text-xs font-semibold rounded-lg btn-3d-secondary cursor-pointer"
                >
                  Co-Founder Dossier
                </button>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-lg btn-3d-primary"
                >
                  <span>Initiate Briefing</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </motion.section>
        </motion.div>
      </div>

      {/* =========================================================================
          EXECUTIVE POP-UP MODAL (FOUNDER & CO-FOUNDER)
          Includes:
          - High-Res Portrait Images
          - Dedicated "Our Experience & Professional Background" Section
          - Dedicated "What We Are Contributing to the Organization" Section
          - Interactive Switcher between Praveen G. Menon and Vishnudas Menon
          - Zero-Redirect In-Place Modal Flow
      ========================================================================= */}
      <AnimatePresence>
        {selectedProfileModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-md overflow-y-auto"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setSelectedProfileModal(null);
              }
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="relative bg-white w-full max-w-5xl my-auto rounded-2xl shadow-2xl border border-[#0077b6]/25 p-5 sm:p-8 lg:p-10 text-[#042440] max-h-[92vh] overflow-y-auto focus:outline-none"
              tabIndex={-1}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-executive-title"
            >
              {/* Top Navigation & Quick Switcher Strip */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#0077b6]/20">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#0077b6]">
                  <span className="w-2 h-2 rounded-full bg-[#00b4d8]" />
                  <span>Executive Leadership Profile</span>
                  <span className="text-[#94a3b8]">/</span>
                  <span className="text-[#034078]">
                    {selectedProfileModal === 'founder' ? 'Founder' : 'Co-Founder'}
                  </span>
                </div>

                {/* Profile Switcher Tabs */}
                <div className="flex items-center gap-1.5 p-1 bg-[#f0f7fe] rounded-xl border border-[#0077b6]/20 self-start sm:self-auto">
                  <button
                    type="button"
                    onClick={() => setSelectedProfileModal('founder')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                      selectedProfileModal === 'founder'
                        ? 'bg-[#034078] text-white shadow-sm'
                        : 'text-[#1e3a5f] hover:text-[#0077b6]'
                    }`}
                  >
                    Praveen G. Menon (Founder)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedProfileModal('cofounder')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                      selectedProfileModal === 'cofounder'
                        ? 'bg-[#0077b6] text-white shadow-sm'
                        : 'text-[#1e3a5f] hover:text-[#0077b6]'
                    }`}
                  >
                    Vishnudas Menon (Co-Founder)
                  </button>
                </div>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setSelectedProfileModal(null)}
                  className="absolute top-4 right-4 sm:top-6 sm:right-6 text-slate-400 hover:text-slate-700 p-2 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
                  aria-label="Close executive pop-up"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {selectedProfileModal === 'founder' ? (
                /* =============================================================
                   FOUNDER POP-UP CONTENT (PRAVEEN G. MENON)
                ============================================================= */
                <div className="mt-6 space-y-8 text-left">
                  {/* Executive Header Banner Card with Image */}
                  <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#021b30] via-[#042f55] to-[#034078] text-white shadow-md relative overflow-hidden">
                    <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-8">
                      {/* Founder Monogram Badge */}
                      <div className="relative shrink-0">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center bg-gradient-to-br from-[#00e5ff] via-[#0077b6] to-[#034078] text-white font-serif-display font-bold text-2xl sm:text-3xl shadow-xl border border-[#00e5ff]/40">
                          PK
                        </div>
                        <span className="absolute -bottom-2 -right-2 px-2 py-0.5 bg-[#00e5ff] text-[#021b30] text-[10px] font-mono font-bold uppercase rounded-md shadow-md">
                          Verified
                        </span>
                      </div>

                      {/* Header Credentials */}
                      <div className="flex-1 text-center md:text-left space-y-3">
                        <div className="inline-flex items-center gap-2">
                          <span className="px-3 py-1 text-xs font-mono font-bold uppercase tracking-widest text-[#021b30] bg-[#00e5ff] rounded-md shadow-xs">
                            {pmRole}
                          </span>
                          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#90e0ef]">
                            Phoenix Solutions
                          </span>
                        </div>

                        <h2
                          id="modal-executive-title"
                          className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white"
                        >
                          {pmTitle}
                        </h2>

                        <p className="text-sm sm:text-base text-[#caf0f8] font-medium leading-snug">
                          {pmHeadline}
                        </p>

                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-1">
                          {aboutSection.domains.map((d) => (
                            <span
                              key={d}
                              className="px-2.5 py-1 text-[11px] font-medium bg-white/10 text-white rounded-md border border-white/20"
                            >
                              {d}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Founder Executive Overview / Bio */}
                  <div className="p-6 rounded-xl bg-[#f8fbff] border border-[#0077b6]/20 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#0077b6]">
                      <FileText className="w-4 h-4" />
                      <span>Executive Overview</span>
                    </div>
                    <p className="text-sm sm:text-base text-[#1e3a5f] leading-relaxed">
                      {pmDesc}
                    </p>
                  </div>

                  {/* ===========================================================
                      SECTION 1: OUR EXPERIENCE & PROFESSIONAL BACKGROUND
                  =========================================================== */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 pb-2 border-b border-[#0077b6]/20">
                      <Briefcase className="w-5 h-5 text-[#0077b6]" />
                      <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-[#042440]">
                        Our Experience &amp; Professional Background
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm text-[#1e3a5f] leading-relaxed">
                      {aboutSection.experienceSummary}
                    </p>

                    {/* What I Do - 4 Core Pillars */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      {aboutSection.whatIDo.map((pillar) => (
                        <div
                          key={pillar.id}
                          className="bg-white border border-[#0077b6]/20 border-l-4 rounded-xl p-5 shadow-2xs space-y-3"
                          style={{ borderLeftColor: pillar.accentColor }}
                        >
                          <div className="flex items-center justify-between text-xs font-mono font-bold text-[#0077b6]">
                            <span>PILLAR {pillar.index}</span>
                            <span className="text-[10px] text-[#5b7a99] uppercase tracking-wider font-sans font-semibold">
                              Strategic Mastery
                            </span>
                          </div>
                          <h4 className="font-serif-display text-base sm:text-lg font-bold text-[#042440]">
                            {pillar.title}
                          </h4>
                          <ul className="space-y-2">
                            {pillar.items.map((item) => (
                              <li
                                key={item}
                                className="flex items-start gap-2 text-xs text-[#1e3a5f] leading-relaxed"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#0077b6] shrink-0 mt-0.5" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

                    {/* Practice Spectrum Tags */}
                    <div className="pt-3">
                      <p className="text-xs font-mono font-semibold uppercase tracking-wider text-[#0077b6] mb-2">
                        Domain Competencies &amp; Practice Spectrum:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {aboutSection.experienceTags.map((tag, idx) => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#f0f7fe] text-[#034078] border border-[#0077b6]/20 rounded-md text-xs font-medium"
                          >
                            <span className="font-mono text-[10px] font-bold text-[#0077b6]">
                              0{idx + 1}
                            </span>
                            <span>{tag}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* ===========================================================
                      SECTION 2: WHAT WE ARE CONTRIBUTING TO THE ORGANIZATION
                  =========================================================== */}
                  <div className="space-y-4 pt-4 border-t-2 border-[#0077b6]/20">
                    <div className="flex items-center gap-2 pb-2 border-b border-[#0077b6]/20">
                      <Target className="w-5 h-5 text-[#034078]" />
                      <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-[#042440]">
                        What We Are Contributing to the Organization
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm text-[#1e3a5f] leading-relaxed">
                      {founderContributionsCms ||
                        'As Founder and Managing Partner of Phoenix Solutions, Praveen G. Menon actively steers the strategic architecture, technical standards, and commercial outbound engines that power our client transformations:'}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                      {aboutSection.contributionsToOrg?.map((contrib) => (
                        <div
                          key={contrib.index}
                          className="p-5 rounded-xl bg-gradient-to-br from-white to-[#f4f9fe] border border-[#0077b6]/25 shadow-2xs space-y-2 relative overflow-hidden"
                        >
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-md bg-[#034078] text-white flex items-center justify-center font-mono text-xs font-bold shrink-0">
                              {contrib.index}
                            </span>
                            <h4 className="font-serif-display text-sm sm:text-base font-bold text-[#042440]">
                              {contrib.title}
                            </h4>
                          </div>
                          <p className="text-xs sm:text-sm text-[#1e3a5f] leading-relaxed pl-8">
                            {contrib.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Modal Action CTA */}
                  <div className="pt-6 border-t border-[#0077b6]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-xs text-[#5b7a99] text-center sm:text-left">
                      Direct executive advisory brief available for enterprise clients.
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setSelectedProfileModal('cofounder')}
                        className="px-4 py-2 text-xs font-semibold rounded-lg btn-3d-secondary cursor-pointer"
                      >
                        View Co-Founder Dossier →
                      </button>
                      <Link
                        to="/contact"
                        onClick={() => setSelectedProfileModal(null)}
                        className="inline-flex items-center gap-2 px-5 py-2 text-xs font-semibold rounded-lg btn-3d-primary"
                      >
                        <span>Schedule Advisory Brief</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                /* =============================================================
                   CO-FOUNDER POP-UP CONTENT (VISHNUDAS MENON)
                ============================================================= */
                <div className="mt-6 space-y-8 text-left">
                  {/* Executive Header Banner Card with Image */}
                  <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#021c2f] via-[#003554] to-[#0077b6] text-white shadow-md relative overflow-hidden">
                    <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-8">
                      {/* Co-Founder Monogram Badge */}
                      <div className="relative shrink-0">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center bg-gradient-to-br from-[#90e0ef] via-[#00b4d8] to-[#0077b6] text-white font-serif-display font-bold text-2xl sm:text-3xl shadow-xl border border-[#90e0ef]/40">
                          VM
                        </div>
                        <span className="absolute -bottom-2 -right-2 px-2 py-0.5 bg-[#90e0ef] text-[#021c2f] text-[10px] font-mono font-bold uppercase rounded-md shadow-md">
                          Verified
                        </span>
                      </div>

                      {/* Header Credentials */}
                      <div className="flex-1 text-center md:text-left space-y-3">
                        <div className="inline-flex items-center gap-2">
                          <span className="px-3 py-1 text-xs font-mono font-bold uppercase tracking-widest text-[#021c2f] bg-[#90e0ef] rounded-md shadow-xs">
                            {vmRole}
                          </span>
                          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#caf0f8]">
                            Phoenix Solutions
                          </span>
                        </div>

                        <h2
                          id="modal-executive-title"
                          className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white"
                        >
                          {vmTitle}
                        </h2>

                        <p className="text-sm sm:text-base text-[#caf0f8] font-medium leading-snug">
                          {vmHeadline}
                        </p>

                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-1">
                          {aboutSection.coFounderProfile.domains.map((d) => (
                            <span
                              key={d}
                              className="px-2.5 py-1 text-[11px] font-medium bg-white/10 text-white rounded-md border border-white/20"
                            >
                              {d}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Co-Founder Executive Overview / Bio */}
                  <div className="p-6 rounded-xl bg-[#f8fbff] border border-[#0077b6]/20 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#0077b6]">
                      <FileText className="w-4 h-4" />
                      <span>Executive Overview</span>
                    </div>
                    <p className="text-sm sm:text-base text-[#1e3a5f] leading-relaxed">
                      {vmDesc}
                    </p>
                  </div>

                  {/* ===========================================================
                      SECTION 1: OUR EXPERIENCE & PROFESSIONAL BACKGROUND
                  =========================================================== */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 pb-2 border-b border-[#0077b6]/20">
                      <Briefcase className="w-5 h-5 text-[#0077b6]" />
                      <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-[#042440]">
                        Our Experience &amp; Professional Background
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm text-[#1e3a5f] leading-relaxed">
                      {aboutSection.coFounderProfile.experienceSummary ||
                        'Vishnudas Menon brings extensive professional experience across enterprise business consulting, customer experience, client engagement, business operations, and multi-tier coordination.'}
                    </p>

                    {/* Detailed Experience Highlights Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      {aboutSection.coFounderProfile.experienceHighlights?.map((exp, idx) => (
                        <div
                          key={exp.title}
                          className="bg-white border border-[#0077b6]/20 border-l-4 border-l-[#00b4d8] rounded-xl p-5 shadow-2xs space-y-2"
                        >
                          <div className="flex items-center justify-between text-xs font-mono font-bold text-[#0077b6]">
                            <span>DOMAIN 0{idx + 1}</span>
                            <span className="text-[10px] text-[#5b7a99] uppercase tracking-wider font-sans font-semibold">
                              Operations &amp; Engagement
                            </span>
                          </div>
                          <h4 className="font-serif-display text-base font-bold text-[#042440]">
                            {exp.title}
                          </h4>
                          <p className="text-xs sm:text-sm text-[#1e3a5f] leading-relaxed">
                            {exp.description}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Strategic Focus Pillars */}
                    <div className="space-y-3 pt-3">
                      <p className="text-xs font-mono font-semibold uppercase tracking-wider text-[#0077b6]">
                        Strategic Focus Pillars:
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {aboutSection.coFounderProfile.focusPillars.map((pillar) => (
                          <div
                            key={pillar.index}
                            className="p-4 bg-[#f0f7fe] border border-[#0077b6]/20 rounded-xl space-y-1.5"
                          >
                            <span className="font-mono text-xs font-bold text-[#0077b6]">
                              {pillar.index}
                            </span>
                            <h5 className="font-serif-display text-sm font-bold text-[#042440]">
                              {pillar.title}
                            </h5>
                            <p className="text-xs text-[#1e3a5f] leading-relaxed">
                              {pillar.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* ===========================================================
                      SECTION 2: WHAT WE ARE CONTRIBUTING TO THE ORGANIZATION
                  =========================================================== */}
                  <div className="space-y-4 pt-4 border-t-2 border-[#0077b6]/20">
                    <div className="flex items-center gap-2 pb-2 border-b border-[#0077b6]/20">
                      <Target className="w-5 h-5 text-[#0077b6]" />
                      <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-[#042440]">
                        What We Are Contributing to the Organization
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm text-[#1e3a5f] leading-relaxed">
                      {cofounderContributionsCms ||
                        'As Co-Founder and Director of Operations at Phoenix Solutions, Vishnudas Menon anchors the company’s client engagement, delivery rigor, and customer experience excellence:'}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                      {aboutSection.coFounderProfile.contributionsToOrg?.map((contrib) => (
                        <div
                          key={contrib.index}
                          className="p-5 rounded-xl bg-gradient-to-br from-white to-[#f4f9fe] border border-[#0077b6]/25 shadow-2xs space-y-2 relative overflow-hidden"
                        >
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-md bg-[#0077b6] text-white flex items-center justify-center font-mono text-xs font-bold shrink-0">
                              {contrib.index}
                            </span>
                            <h4 className="font-serif-display text-sm sm:text-base font-bold text-[#042440]">
                              {contrib.title}
                            </h4>
                          </div>
                          <p className="text-xs sm:text-sm text-[#1e3a5f] leading-relaxed pl-8">
                            {contrib.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Modal Action CTA */}
                  <div className="pt-6 border-t border-[#0077b6]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-xs text-[#5b7a99] text-center sm:text-left">
                      Client support and operational governance coordinated directly with executive sponsors.
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setSelectedProfileModal('founder')}
                        className="px-4 py-2 text-xs font-semibold rounded-lg btn-3d-secondary cursor-pointer"
                      >
                        View Founder Dossier →
                      </button>
                      <Link
                        to="/contact"
                        onClick={() => setSelectedProfileModal(null)}
                        className="inline-flex items-center gap-2 px-5 py-2 text-xs font-semibold rounded-lg btn-3d-primary"
                      >
                        <span>Schedule Advisory Brief</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
};
