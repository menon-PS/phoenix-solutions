import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, CheckCircle2, Flame } from 'lucide-react';
import {
  SITE_CONTENT,
  ASSETS,
  ServiceGroup,
  LifecycleStage,
} from '../data/siteContent';
import { PhoenixLogo } from '../components/PhoenixLogo';
import { useCmsValue } from '../services/supabaseService';
import {
  PageTransition,
  getStaggerContainerVariants,
  getFadeUpItemVariants,
} from '../components/PageTransition';

interface ServicesPageProps {
  reducedMotion: boolean;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ reducedMotion }) => {
  const [searchParams] = useSearchParams();
  const requestedGroup = searchParams.get('group') as ServiceGroup['id'] | null;

  const [expandedCaseId, setExpandedCaseId] = useState<ServiceGroup['id'] | null>(
    requestedGroup || 'it-solutions'
  );
  const [activeStageId, setActiveStageId] =
    useState<LifecycleStage['id']>('ignite');

  useEffect(() => {
    if (
      requestedGroup &&
      ['it-solutions', 'business-strategies', 'content-solutions'].includes(
        requestedGroup
      )
    ) {
      setExpandedCaseId(requestedGroup);
    }
  }, [requestedGroup]);

  const toggleCaseStudy = (id: ServiceGroup['id']) => {
    setExpandedCaseId((prev) => (prev === id ? null : id));
  };

  const activeStage =
    SITE_CONTENT.methodSection.stages.find((s) => s.id === activeStageId) ||
    SITE_CONTENT.methodSection.stages[0];

  const containerVariants = getStaggerContainerVariants(reducedMotion);
  const itemVariants = getFadeUpItemVariants(reducedMotion);

  // Dynamic CMS values for practice area descriptions
  const serviceItDesc = useCmsValue('service_it_desc', SITE_CONTENT.servicesSection.groups[0].description);
  const serviceBdDesc = useCmsValue('service_bd_desc', SITE_CONTENT.servicesSection.groups[1].description);
  const serviceContentDesc = useCmsValue('service_content_desc', SITE_CONTENT.servicesSection.groups[2].description);
  const dynamicHero = useCmsValue('hero_banner_url', ASSETS.heroBanner);
  const dynamicLogo = useCmsValue('logo_emblem_url', ASSETS.logoEmblem);

  return (
    <PageTransition reducedMotion={reducedMotion}>
      <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-20"
        >
          {/* 1. SERVICES HERO BANNER & THREE FULL SERVICE GROUPS */}
          <section aria-labelledby="page-main-heading">
            {/* Phoenix Emerging from Ashes & Blue Flames Header Banner */}
            <motion.div
              variants={itemVariants}
              className="card-phoenix rounded-2xl overflow-hidden mb-10"
            >
              <div className="relative p-6 sm:p-10 lg:p-12 overflow-hidden">
                <img
                  src={dynamicHero}
                  alt="Phoenix emerging from the ashes with spreading blue flames"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.endsWith(ASSETS.heroBannerFallback)) {
                      target.src = ASSETS.heroBannerFallback;
                    }
                  }}
                  className="absolute inset-0 w-full h-full object-cover object-center opacity-100 pointer-events-none block"
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(90deg, rgba(255, 255, 255, 0.75) 0%, rgba(255, 255, 255, 0.3) 55%, rgba(240, 249, 255, 0.6) 100%)',
                  }}
                  aria-hidden="true"
                />

                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                  <div className="max-w-3xl bg-white/80 backdrop-blur-xs p-5 rounded-xl lg:bg-transparent lg:p-0 lg:backdrop-blur-none text-left">
                    <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-[#0077b6]">
                      <Flame className="w-4 h-4 text-[#00b4d8]" aria-hidden="true" />
                      <span>{SITE_CONTENT.servicesSection.eyebrow}</span>
                    </div>
                    <h1
                      id="page-main-heading"
                      tabIndex={-1}
                      className="mt-2.5 font-serif-display text-3xl sm:text-5xl font-bold text-gradient-phoenix tracking-tight leading-tight focus:outline-none"
                      style={{ textWrap: 'balance' }}
                    >
                      {SITE_CONTENT.servicesSection.headline}
                    </h1>
                    <p className="mt-4 text-base sm:text-lg text-[#1e3a5f] leading-relaxed font-medium">
                      {SITE_CONTENT.servicesSection.subHeadline}
                    </p>

                    {/* Quick Service Pillar 3D Jump Buttons */}
                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      {SITE_CONTENT.servicesSection.groups.map((group) => {
                        const isFocused = requestedGroup === group.id;
                        return (
                          <Link
                            key={group.id}
                            to={`/services?group=${group.id}`}
                            className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
                              isFocused ? 'btn-3d-primary' : 'btn-3d-secondary'
                            }`}
                          >
                            <span className="font-mono">{group.index}.</span>
                            <span>{group.title}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>

                  <div className="logo-frame-3d w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden p-2.5 shrink-0 self-start lg:self-center">
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
            </motion.div>

            {/* Three Comprehensive 3D Service Group Cards */}
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch"
            >
              {SITE_CONTENT.servicesSection.groups.map((group, idx) => {
                const isHighlighted = requestedGroup === group.id;
                const isCaseExpanded = expandedCaseId === group.id;
                const tierIndex = idx as 0 | 1 | 2;

                return (
                  <motion.article
                    key={group.id}
                    variants={itemVariants}
                    className={`card-phoenix rounded-xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden ${
                      isHighlighted
                        ? 'ring-2 ring-[#0077b6] border-[#0077b6]'
                        : ''
                    }`}
                  >
                    {/* Top Accent Bar matching the Chevron Aqua/Navy Tone */}
                    <div
                      className="absolute top-0 inset-x-0 h-1.5"
                      style={{ backgroundColor: group.chevronColor }}
                      aria-hidden="true"
                    />

                    <div>
                      {/* Card Header: Editorial Index */}
                      <div className="flex items-center justify-between gap-4 mb-4">
                        <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wider uppercase text-[#0077b6]">
                          <span className="text-sm text-[#034078] font-bold tabular-nums">
                            {group.index}
                          </span>
                          <span>·</span>
                          <span>{group.codename}</span>
                        </div>
                      </div>

                      {/* Primary Service Group Title (IT Solutions / Business Strategies / Content Solutions) */}
                      <h2 className="font-serif-display text-2xl sm:text-3xl font-semibold text-[#042440] tracking-wide leading-snug">
                        {group.title}
                      </h2>

                      {/* Description */}
                      <p className="mt-3 text-sm sm:text-base text-[#1e3a5f] leading-relaxed">
                        {group.id === 'it-solutions'
                          ? serviceItDesc
                          : group.id === 'business-strategies'
                          ? serviceBdDesc
                          : serviceContentDesc}
                      </p>

                      {/* Ash-to-Blue-Flame Resolution Line */}
                      <p className="mt-4 pt-3 border-t border-[#0077b6]/15 text-xs text-[#334155] font-mono flex items-center gap-1.5">
                        <Flame className="w-3.5 h-3.5 text-[#00b4d8] shrink-0" aria-hidden="true" />
                        <span>{group.ashOrigin}</span>
                      </p>

                      {/* Core Capabilities List */}
                      <div className="mt-5">
                        <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#0077b6] mb-2.5">
                          Core Capabilities
                        </h3>
                        <ul
                          className="space-y-2"
                          aria-label={`${group.title} core capabilities`}
                        >
                          {group.capabilities.map((cap) => (
                            <li
                              key={cap}
                              className="flex items-start gap-2 text-xs sm:text-sm text-[#1e3a5f]"
                            >
                              <CheckCircle2
                                className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#0077b6]"
                                aria-hidden="true"
                              />
                              <span>{cap}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Workflow / Format Chips */}
                      <div className="mt-5 pt-4 border-t border-[#0077b6]/15">
                        <span className="block text-[11px] font-mono font-semibold uppercase tracking-wider text-[#0077b6] mb-2">
                          {group.workflowProgression.label}:
                        </span>
                        <div className="flex flex-wrap items-center gap-1.5 text-xs font-medium text-[#042440]">
                          {group.workflowProgression.steps.map((step, sIdx) => (
                            <React.Fragment key={step}>
                              <span className="px-2.5 py-0.5 bg-[#f0f7fe] border border-[#0077b6]/25 rounded-md">
                                {step}
                              </span>
                              {sIdx <
                                group.workflowProgression.steps.length - 1 && (
                                <span
                                  className="text-[#0077b6] font-mono font-bold"
                                  aria-hidden="true"
                                >
                                  →
                                </span>
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Proof & Router Action Block */}
                    <div className="mt-8 pt-6 border-t border-[#0077b6]/20">
                      {/* Quantified Outcome Metric */}
                      <div className="flex items-baseline justify-between gap-2">
                        <div>
                          <span className="block font-serif-display text-2xl sm:text-3xl font-bold text-gradient-phoenix tabular-nums">
                            {group.outcomeMetric.value}
                          </span>
                          <span className="block text-xs font-semibold text-[#042440] mt-0.5">
                            {group.outcomeMetric.label}
                          </span>
                        </div>
                        <span className="text-[11px] text-[#4a6b8c] tabular-nums text-right">
                          {group.outcomeMetric.timeframe}
                        </span>
                      </div>

                      {/* Expandable Attributable Case Evidence */}
                      <div className="mt-4">
                        <button
                          type="button"
                          onClick={() => toggleCaseStudy(group.id)}
                          aria-expanded={isCaseExpanded}
                          className="w-full flex items-center justify-between py-2 text-xs font-semibold text-[#0077b6] hover:text-[#034078] transition-colors focus-visible:outline-2 focus-visible:outline-[#0077b6] rounded-sm cursor-pointer"
                        >
                          <span>
                            {isCaseExpanded
                              ? 'Hide Client Evidence'
                              : 'Inspect Client Evidence'}
                          </span>
                          <span className="font-mono" aria-hidden="true">
                            {isCaseExpanded ? '−' : '+'}
                          </span>
                        </button>

                        {isCaseExpanded && (
                          <div className="mt-2 pt-3 border-t border-[#0077b6]/15 text-xs space-y-1.5 text-[#1e3a5f]">
                            <p className="font-semibold text-[#042440]">
                              {group.caseProof.clientProfile}
                            </p>
                            <p>
                              <span className="text-[#4a6b8c] font-semibold">
                                Challenge:{' '}
                              </span>
                              {group.caseProof.beforeState}
                            </p>
                            <p>
                              <span className="text-[#0077b6] font-semibold">
                                Outcome:{' '}
                              </span>
                              {group.caseProof.afterOutcome}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Router Link to Contact Page with Preselected Service Group */}
                      <Link
                        to="/contact"
                        state={{ selectedPillar: group.title }}
                        className="mt-4 w-full inline-flex items-center justify-between px-4 py-2.5 text-xs font-semibold tracking-wide rounded-md btn-3d-secondary whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#0077b6]"
                      >
                        <span>Scope {group.title}</span>
                        <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                      </Link>
                    </div>
                  </motion.article>
                );
              })}
            </motion.div>
          </section>

          {/* 2. THE PHOENIX LIFECYCLE METHODOLOGY (IGNITE -> FORGE -> SOAR) */}
          <section
            aria-labelledby="method-heading"
            className="pt-16 border-t border-[#0077b6]/20"
          >
            <motion.div variants={itemVariants} className="max-w-3xl">
              <p className="text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-[#0077b6]">
                {SITE_CONTENT.methodSection.eyebrow}
              </p>
              <h2
                id="method-heading"
                className="mt-3 font-serif-display text-3xl sm:text-4xl font-semibold text-[#042440] tracking-tight leading-tight"
                style={{ textWrap: 'balance' }}
              >
                {SITE_CONTENT.methodSection.headline}
              </h2>
              <p className="mt-4 text-base sm:text-lg text-[#1e3a5f] leading-relaxed">
                {SITE_CONTENT.methodSection.subHeadline}
              </p>
            </motion.div>

            <div className="mt-12 relative">
              <div
                className="hidden md:block absolute top-14 left-[12%] right-[12%] h-[1px] bg-gradient-to-r from-[#034078] via-[#0077b6] to-[#00b4d8] opacity-40 pointer-events-none"
                aria-hidden="true"
              />

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
              >
                {SITE_CONTENT.methodSection.stages.map((stage, idx) => {
                  const isSelected = stage.id === activeStageId;

                  return (
                    <motion.div
                      key={stage.id}
                      variants={itemVariants}
                      onClick={() => setActiveStageId(stage.id)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setActiveStageId(stage.id);
                        }
                      }}
                      role="button"
                      tabIndex={0}
                      aria-pressed={isSelected}
                      className={`card-phoenix rounded-xl p-6 sm:p-8 text-left flex flex-col justify-between cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0077b6] ${
                        isSelected
                          ? 'ring-2 ring-[#0077b6] border-[#0077b6]'
                          : 'opacity-95 hover:opacity-100'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-3 mb-6">
                          <div className="inline-flex items-center gap-3">
                            <span
                              className="w-10 h-10 rounded-lg flex items-center justify-center font-mono text-sm font-semibold text-white shadow-sm tabular-nums"
                              style={{ backgroundColor: stage.chevronColor }}
                            >
                              {stage.stepNumber}
                            </span>
                            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#2c4c6e]">
                              {stage.duration}
                            </span>
                          </div>

                          {idx < 2 && (
                            <ArrowRight
                              className="hidden md:block w-4 h-4 text-[#0077b6]/70"
                              aria-hidden="true"
                            />
                          )}
                        </div>

                        <h3 className="font-serif-display text-2xl sm:text-3xl font-semibold tracking-wide text-gradient-phoenix">
                          {stage.name}
                        </h3>

                        <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-[#0077b6]">
                          {stage.tagline}
                        </p>

                        <p className="mt-4 text-sm sm:text-base text-[#1e3a5f] leading-relaxed">
                          {stage.description}
                        </p>

                        <ul
                          className="mt-6 pt-5 border-t border-[#0077b6]/15 space-y-2 text-xs sm:text-sm text-[#1e3a5f]"
                          aria-label={`${stage.name} phase outputs`}
                        >
                          {stage.keyOutputs.map((output) => (
                            <li key={output} className="flex items-start gap-2">
                              <span
                                className="mt-1.5 w-1.5 h-1.5 rotate-45 shrink-0"
                                style={{ backgroundColor: stage.chevronColor }}
                                aria-hidden="true"
                              />
                              <span>{output}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-6 pt-4 border-t border-[#0077b6]/15">
                        <p className="text-xs italic text-[#4a6b8c]">
                          “{stage.executiveQuestion}”
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>

            {/* Interactive Phase Summary Strip + Get in Touch Router CTA */}
            <motion.div
              variants={itemVariants}
              className="mt-8 card-phoenix rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
              aria-live="polite"
            >
              <div className="space-y-1">
                <span className="block font-mono text-xs uppercase tracking-wider text-[#0077b6] font-semibold">
                  Active Lifecycle Focus: {activeStage.stepNumber} ·{' '}
                  {activeStage.name}
                </span>
                <p className="text-sm font-medium text-[#042440]">
                  {activeStage.executiveQuestion}
                </p>
              </div>

              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold tracking-wide rounded-md btn-3d-primary shrink-0 whitespace-nowrap"
              >
                <span>Get in Touch</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </motion.div>
          </section>
        </motion.div>
      </div>
    </PageTransition>
  );
};
