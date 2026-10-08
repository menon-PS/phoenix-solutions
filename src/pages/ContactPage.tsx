import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  AlertCircle,
  CheckCircle2,
  Send,
  RotateCcw,
  ArrowLeft,
  Flame,
} from 'lucide-react';
import { SITE_CONTENT, ASSETS } from '../data/siteContent';
import { useCmsValue } from '../services/supabaseService';
import {
  ContactFormInput,
  ContactValidationErrors,
  ContactSubmissionResult,
  validateContactForm,
  submitContactInquiry,
} from '../services/contactService';
import {
  PageTransition,
  getStaggerContainerVariants,
  getFadeUpItemVariants,
} from '../components/PageTransition';

interface ContactPageProps {
  reducedMotion: boolean;
}

interface LocationState {
  selectedPillar?: string;
}

const SERVICE_PILLAR_CHIPS = [
  'IT Solutions',
  'Business Strategies',
  'Content Solutions',
] as const;

export const ContactPage: React.FC<ContactPageProps> = ({ reducedMotion }) => {
  const location = useLocation();
  const state = location.state as LocationState | null;
  const incomingPillar = state?.selectedPillar;

  const [formData, setFormData] = useState<ContactFormInput>({
    name: '',
    email: '',
    organization: '',
    message: incomingPillar
      ? `We would like to discuss ${incomingPillar} and explore how we can turn this opportunity into a structured business outcome.`
      : '',
    selectedPillar: incomingPillar || 'IT Solutions',
  });

  const [touched, setTouched] = useState<
    Record<keyof ContactValidationErrors, boolean>
  >({
    name: false,
    email: false,
    organization: false,
    message: false,
  });

  const [errors, setErrors] = useState<ContactValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] =
    useState<ContactSubmissionResult | null>(null);

  useEffect(() => {
    if (incomingPillar) {
      setFormData((prev) => ({
        ...prev,
        selectedPillar: incomingPillar,
        message:
          prev.message.trim().length === 0
            ? `We would like to discuss ${incomingPillar} and explore how we can turn this opportunity into a structured business outcome.`
            : prev.message,
      }));
    }
  }, [incomingPillar]);

  const handleFieldChange = (
    field: keyof ContactValidationErrors,
    value: string
  ) => {
    const nextData = { ...formData, [field]: value };
    setFormData(nextData);

    if (touched[field]) {
      const validation = validateContactForm(nextData);
      setErrors((prev) => ({ ...prev, [field]: validation[field] }));
    }
  };

  const handleFieldBlur = (field: keyof ContactValidationErrors) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const validation = validateContactForm(formData);
    setErrors((prev) => ({ ...prev, [field]: validation[field] }));
  };

  const handleSelectPillarChip = (pillar: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedPillar: pillar,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTouched({
      name: true,
      email: true,
      organization: true,
      message: true,
    });

    const validationErrors = validateContactForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await submitContactInquiry(formData);
      setSubmissionResult(result);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmissionResult(null);
    setFormData({
      name: '',
      email: '',
      organization: '',
      message: '',
      selectedPillar: 'IT Solutions',
    });
    setTouched({
      name: false,
      email: false,
      organization: false,
      message: false,
    });
    setErrors({});
  };

  const { riseContactSection } = SITE_CONTENT;
  const containerVariants = getStaggerContainerVariants(reducedMotion);
  const itemVariants = getFadeUpItemVariants(reducedMotion);

  const contactEmail = useCmsValue('contact_email', riseContactSection.directContact.email);
  const contactSla = useCmsValue('contact_sla', riseContactSection.directContact.responseSla);
  const dynamicHero = useCmsValue('hero_banner_url', ASSETS.heroBanner);
  const dynamicLogo = useCmsValue('logo_emblem_url', ASSETS.logoEmblem);

  return (
    <PageTransition reducedMotion={reducedMotion}>
      <section
        aria-labelledby="page-main-heading"
        className="relative min-h-[calc(100vh-4rem)] py-14 sm:py-20 px-4 sm:px-6 lg:px-8 flex items-center overflow-hidden"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-6xl mx-auto w-full"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left Column: Phoenix Rising from the Ashes Proposition Card */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-5 text-[#042440] space-y-6"
            >
              {/* Visual Phoenix Emerging & Blue Flames Banner Strip */}
              <div className="card-phoenix rounded-2xl overflow-hidden">
                <div className="relative h-36 sm:h-44 w-full overflow-hidden border-b border-[#0077b6]/20">
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
                    className="w-full h-full object-cover object-center opacity-100 block"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(to top, rgba(255, 255, 255, 0.75) 0%, rgba(255, 255, 255, 0.3) 60%, rgba(255, 255, 255, 0.6) 100%)',
                    }}
                  />
                  <div className="absolute inset-0 p-5 flex items-end justify-between gap-4">
                    <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-[#0077b6] bg-white/85 backdrop-blur-xs px-3 py-1.5 rounded-lg">
                      <Flame className="w-4 h-4 text-[#00b4d8]" aria-hidden="true" />
                      <span>{riseContactSection.eyebrow}</span>
                    </div>
                    <div className="logo-frame-3d w-14 h-14 rounded-xl overflow-hidden p-1.5 shrink-0">
                      <img
                        src={dynamicLogo}
                        alt="Phoenix Solutions White and Aqua Crest"
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

                <div className="p-6 space-y-4">
                  <h1
                    id="page-main-heading"
                    tabIndex={-1}
                    className="font-serif-display text-3xl sm:text-4xl font-bold tracking-tight leading-[1.1] text-gradient-phoenix focus:outline-none"
                    style={{ textWrap: 'balance' }}
                  >
                    {riseContactSection.headline}
                  </h1>

                  <p className="text-sm sm:text-base text-[#1e3a5f] leading-relaxed">
                    {riseContactSection.subHeadline}
                  </p>
                </div>
              </div>

              {/* Executive Direct Metadata Card */}
              <div className="card-phoenix rounded-xl p-5 space-y-3 text-sm text-[#042440]">
                <div>
                  <span className="block text-xs uppercase tracking-wider font-semibold text-[#0077b6]">
                    {riseContactSection.directContact.principal}
                  </span>
                  <a
                    href={`mailto:${contactEmail}`}
                    className="mt-1 inline-block font-semibold text-base text-[#034078] underline decoration-[#00b4d8]/60 hover:decoration-[#034078]"
                  >
                    {contactEmail}
                  </a>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-xs font-medium tracking-wide text-[#2c4c6e] pt-2 border-t border-[#0077b6]/15">
                  <span>{riseContactSection.directContact.focusAreas}</span>
                  <span aria-hidden="true">·</span>
                  <span>{contactSla}</span>
                </div>
              </div>

              {/* Router link back to Services */}
              <div>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0077b6] hover:text-[#034078] hover:underline focus-visible:outline-2 focus-visible:outline-[#0077b6] rounded-sm"
                >
                  <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Review Our Services</span>
                </Link>
              </div>
            </motion.div>

            {/* Right Column: 3D Sculpted White Executive Discovery Card */}
            <motion.div variants={itemVariants} className="lg:col-span-7">
              <div className="card-phoenix rounded-2xl p-6 sm:p-10">
                {submissionResult ? (
                  <div
                    role="status"
                    aria-live="polite"
                    className="py-6 space-y-6 text-[#042440]"
                  >
                    <div className="inline-flex items-center gap-3 text-[#0077b6]">
                      <CheckCircle2
                        className="w-7 h-7 shrink-0"
                        aria-hidden="true"
                      />
                      <span className="text-xs font-mono uppercase tracking-widest font-semibold">
                        Briefing Logged · Ref {submissionResult.referenceId}
                      </span>
                    </div>

                    <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#042440]">
                      Your strategic inquiry has been received.
                    </h2>

                    <p className="text-sm sm:text-base text-[#1e3a5f] leading-relaxed">
                      Thank you,{' '}
                      <strong className="font-semibold text-[#042440]">
                        {submissionResult.payload.name}
                      </strong>
                      . Praveen Menon will review the brief for{' '}
                      <strong className="font-semibold text-[#042440]">
                        {submissionResult.payload.organization}
                      </strong>{' '}
                      and respond directly at{' '}
                      <span className="underline text-[#0077b6]">
                        {submissionResult.payload.email}
                      </span>{' '}
                      within one business day.
                    </p>

                    <div className="p-4 bg-[#f2f8fd] border border-[#0077b6]/20 rounded-lg text-xs space-y-1.5 text-[#1e3a5f]">
                      <div className="flex items-center justify-between font-mono">
                        <span>TRANSMISSION TIMESTAMP</span>
                        <span className="tabular-nums font-semibold">
                          {new Date(
                            submissionResult.submittedAt
                          ).toLocaleString()}
                        </span>
                      </div>
                      {submissionResult.payload.selectedPillar && (
                        <div className="flex items-center justify-between font-mono">
                          <span>PRIMARY SERVICE FOCUS</span>
                          <span className="font-semibold text-[#0077b6]">
                            {submissionResult.payload.selectedPillar}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-4 pt-2">
                      <button
                        type="button"
                        onClick={handleReset}
                        className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold tracking-wide rounded-md btn-3d-secondary cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Submit Another Inquiry</span>
                      </button>

                      <Link
                        to="/"
                        className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold tracking-wide rounded-md btn-3d-primary"
                      >
                        <span>Return Home</span>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="space-y-5">
                    <div className="border-b border-[#0077b6]/15 pb-4 mb-2 flex flex-wrap items-center justify-between gap-2">
                      <h2 className="font-serif-display text-xl sm:text-2xl font-semibold text-[#042440]">
                        Executive Discovery Briefing
                      </h2>
                      <span className="text-xs font-medium text-[#4a6b8c]">
                        All fields required
                      </span>
                    </div>

                    {/* Service Pillar 3D Selection Buttons */}
                    <div>
                      <span className="block text-xs font-semibold uppercase tracking-wider text-[#1e3a5f] mb-2">
                        Primary Service Area
                      </span>
                      <div
                        className="flex flex-wrap gap-2"
                        role="group"
                        aria-label="Primary Service Area"
                      >
                        {SERVICE_PILLAR_CHIPS.map((chip) => {
                          const isSelected = formData.selectedPillar === chip;
                          return (
                            <button
                              key={chip}
                              type="button"
                              onClick={() => handleSelectPillarChip(chip)}
                              aria-pressed={isSelected}
                              className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                                isSelected
                                  ? 'btn-3d-primary'
                                  : 'btn-3d-secondary'
                              }`}
                            >
                              {chip}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Name Field */}
                      <div>
                        <label
                          htmlFor="contact-name"
                          className="block text-xs font-semibold uppercase tracking-wider text-[#1e3a5f] mb-1.5"
                        >
                          {riseContactSection.formLabels.name}
                        </label>
                        <input
                          id="contact-name"
                          name="name"
                          type="text"
                          autoComplete="name"
                          required
                          value={formData.name}
                          onChange={(e) =>
                            handleFieldChange('name', e.target.value)
                          }
                          onBlur={() => handleFieldBlur('name')}
                          placeholder={
                            riseContactSection.formLabels.namePlaceholder
                          }
                          aria-invalid={Boolean(touched.name && errors.name)}
                          aria-describedby={
                            touched.name && errors.name
                              ? 'contact-name-error'
                              : undefined
                          }
                          className={`w-full px-3.5 py-2.5 text-sm bg-[#f8fbff] text-[#042440] placeholder-[#6b8aa8] border rounded-md shadow-[inset_0_1px_3px_rgba(4,36,64,0.06)] transition-colors focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#0077b6] ${
                            touched.name && errors.name
                              ? 'border-[#b91c1c] bg-[#fef2f2]'
                              : 'border-[#0077b6]/28'
                          }`}
                        />
                        {touched.name && errors.name && (
                          <p
                            id="contact-name-error"
                            role="alert"
                            className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-[#b91c1c]"
                          >
                            <AlertCircle
                              className="w-3.5 h-3.5 shrink-0"
                              aria-hidden="true"
                            />
                            <span>{errors.name}</span>
                          </p>
                        )}
                      </div>

                      {/* Email Field */}
                      <div>
                        <label
                          htmlFor="contact-email"
                          className="block text-xs font-semibold uppercase tracking-wider text-[#1e3a5f] mb-1.5"
                        >
                          {riseContactSection.formLabels.email}
                        </label>
                        <input
                          id="contact-email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          required
                          value={formData.email}
                          onChange={(e) =>
                            handleFieldChange('email', e.target.value)
                          }
                          onBlur={() => handleFieldBlur('email')}
                          placeholder={
                            riseContactSection.formLabels.emailPlaceholder
                          }
                          aria-invalid={Boolean(touched.email && errors.email)}
                          aria-describedby={
                            touched.email && errors.email
                              ? 'contact-email-error'
                              : undefined
                          }
                          className={`w-full px-3.5 py-2.5 text-sm bg-[#f8fbff] text-[#042440] placeholder-[#6b8aa8] border rounded-md shadow-[inset_0_1px_3px_rgba(4,36,64,0.06)] transition-colors focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#0077b6] ${
                            touched.email && errors.email
                              ? 'border-[#b91c1c] bg-[#fef2f2]'
                              : 'border-[#0077b6]/28'
                          }`}
                        />
                        {touched.email && errors.email && (
                          <p
                            id="contact-email-error"
                            role="alert"
                            className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-[#b91c1c]"
                          >
                            <AlertCircle
                              className="w-3.5 h-3.5 shrink-0"
                              aria-hidden="true"
                            />
                            <span>{errors.email}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Organization Field */}
                    <div>
                      <label
                        htmlFor="contact-organization"
                        className="block text-xs font-semibold uppercase tracking-wider text-[#1e3a5f] mb-1.5"
                      >
                        {riseContactSection.formLabels.organization}
                      </label>
                      <input
                        id="contact-organization"
                        name="organization"
                        type="text"
                        autoComplete="organization"
                        required
                        value={formData.organization}
                        onChange={(e) =>
                          handleFieldChange('organization', e.target.value)
                        }
                        onBlur={() => handleFieldBlur('organization')}
                        placeholder={
                          riseContactSection.formLabels.organizationPlaceholder
                        }
                        aria-invalid={Boolean(
                          touched.organization && errors.organization
                        )}
                        aria-describedby={
                          touched.organization && errors.organization
                            ? 'contact-organization-error'
                            : undefined
                        }
                        className={`w-full px-3.5 py-2.5 text-sm bg-[#f8fbff] text-[#042440] placeholder-[#6b8aa8] border rounded-md shadow-[inset_0_1px_3px_rgba(4,36,64,0.06)] transition-colors focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#0077b6] ${
                          touched.organization && errors.organization
                            ? 'border-[#b91c1c] bg-[#fef2f2]'
                            : 'border-[#0077b6]/28'
                        }`}
                      />
                      {touched.organization && errors.organization && (
                        <p
                          id="contact-organization-error"
                          role="alert"
                          className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-[#b91c1c]"
                        >
                          <AlertCircle
                            className="w-3.5 h-3.5 shrink-0"
                            aria-hidden="true"
                          />
                          <span>{errors.organization}</span>
                        </p>
                      )}
                    </div>

                    {/* Message Field */}
                    <div>
                      <label
                        htmlFor="contact-message"
                        className="block text-xs font-semibold uppercase tracking-wider text-[#1e3a5f] mb-1.5"
                      >
                        {riseContactSection.formLabels.message}
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        rows={4}
                        required
                        value={formData.message}
                        onChange={(e) =>
                          handleFieldChange('message', e.target.value)
                        }
                        onBlur={() => handleFieldBlur('message')}
                        placeholder={
                          riseContactSection.formLabels.messagePlaceholder
                        }
                        aria-invalid={Boolean(
                          touched.message && errors.message
                        )}
                        aria-describedby={
                          touched.message && errors.message
                            ? 'contact-message-error'
                            : undefined
                        }
                        className={`w-full px-3.5 py-2.5 text-sm bg-[#f8fbff] text-[#042440] placeholder-[#6b8aa8] border rounded-md shadow-[inset_0_1px_3px_rgba(4,36,64,0.06)] transition-colors focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#0077b6] resize-y ${
                          touched.message && errors.message
                            ? 'border-[#b91c1c] bg-[#fef2f2]'
                            : 'border-[#0077b6]/28'
                        }`}
                      />
                      {touched.message && errors.message && (
                        <p
                          id="contact-message-error"
                          role="alert"
                          className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-[#b91c1c]"
                        >
                          <AlertCircle
                            className="w-3.5 h-3.5 shrink-0"
                            aria-hidden="true"
                          />
                          <span>{errors.message}</span>
                        </p>
                      )}
                    </div>

                    {/* 3D Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-semibold tracking-wide rounded-md btn-3d-primary disabled:opacity-60 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0077b6] cursor-pointer"
                      >
                        <span>
                          {isSubmitting
                            ? riseContactSection.formLabels.submittingButton
                            : riseContactSection.formLabels.submitButton}
                        </span>
                        <Send className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </PageTransition>
  );
};
