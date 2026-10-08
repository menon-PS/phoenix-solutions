import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { ArrowUp, ShieldCheck, Flame } from 'lucide-react';
import { PhoenixLogo } from './PhoenixLogo';
import { SITE_CONTENT } from '../data/siteContent';
import { saveNewsletterSignup } from '../services/supabaseService';

interface FooterProps {
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  const [footerEmail, setFooterEmail] = useState('');
  const [footerSubmitting, setFooterSubmitting] = useState(false);
  const [footerSuccess, setFooterSuccess] = useState(false);
  const [footerError, setFooterError] = useState('');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  const handleFooterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!footerEmail.trim()) return;
    setFooterSubmitting(true);
    setFooterError('');
    try {
      await saveNewsletterSignup(footerEmail);
      setFooterSuccess(true);
      setFooterEmail('');
    } catch (err) {
      console.error(err);
      setFooterError('Formatting error. Use correct email structure.');
    } finally {
      setFooterSubmitting(false);
    }
  };

  return (
    <footer
      role="contentinfo"
      className="relative z-20 bg-[#f8fbff] text-[#1e3a5f] border-t border-[#0077b6]/20 py-12 px-4 sm:px-6 lg:px-8 shadow-[inset_0_1px_0_0_#ffffff]"
    >
      <div className="max-w-7xl mx-auto space-y-10">
        {/* TOP ROW: Brand and Secure Newsletter Subscription Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-8 border-b border-[#0077b6]/12">
          {/* Brand & Mission Statement */}
          <div className="lg:col-span-5 space-y-2 text-left">
            <Link
              to="/"
              className="inline-flex items-center gap-3 group focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0077b6] rounded-sm"
              aria-label="Phoenix Solutions — Go to Home page"
            >
              <PhoenixLogo size={34} variant="emblem" />
              <span className="font-serif-display text-lg font-semibold text-[#042440] group-hover:text-[#0077b6] transition-colors tracking-wide">
                {SITE_CONTENT.brand.fullName}
              </span>
            </Link>
            <p className="text-xs text-[#2c4c6e] font-medium leading-relaxed">
              {SITE_CONTENT.footer.statement}
            </p>
            <p className="text-xs text-[#5b7a99]">
              {SITE_CONTENT.footer.copyright}
            </p>
          </div>

          {/* Secure Newsletter Section */}
          <div className="lg:col-span-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-5 rounded-xl border border-[#0077b6]/15 bg-white/70 backdrop-blur-sm">
            <div className="text-left space-y-1">
              <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold tracking-widest text-[#0077b6] uppercase">
                <Flame className="w-3 h-3 text-[#00b4d8]" aria-hidden="true" />
                Briefing Service
              </span>
              <p className="text-sm font-bold text-[#042440]">
                Receive Executive Growth Insights
              </p>
              <p className="text-xs text-[#5b7a99]">
                Capturing emails securely for business strategy updates.
              </p>
            </div>

            <div className="w-full md:max-w-xs shrink-0 text-left">
              {footerSuccess ? (
                <div className="p-3 text-center text-xs font-semibold text-emerald-700 bg-emerald-500/8 border border-emerald-500/18 rounded-lg">
                  ✓ Intelligence Briefing Enabled!
                </div>
              ) : (
                <form onSubmit={handleFooterSubmit} className="space-y-1.5">
                  <div className="flex gap-1.5">
                    <input
                      type="email"
                      required
                      value={footerEmail}
                      onChange={(e) => setFooterEmail(e.target.value)}
                      placeholder="your.name@enterprise.com"
                      className="flex-1 min-w-0 px-3 py-2 text-xs rounded-lg border border-[#0077b6]/25 bg-white focus:outline-none focus:ring-2 focus:ring-[#0077b6]/40 text-[#011627] placeholder:text-[#a0aec0]"
                      disabled={footerSubmitting}
                    />
                    <button
                      type="submit"
                      disabled={footerSubmitting}
                      className="px-4 py-2 text-xs font-bold rounded-lg btn-3d-primary whitespace-nowrap disabled:opacity-50 cursor-pointer"
                    >
                      {footerSubmitting ? 'Verifying...' : 'Subscribe'}
                    </button>
                  </div>
                  {footerError && (
                    <p className="text-[10px] font-semibold text-rose-500 pl-1">
                      ⚠️ {footerError}
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>

        {/* BOTTOM ROW: Navigation Links, Admin Access & Top anchor */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 pt-2">
          {/* Navigation Links */}
          <div className="flex flex-wrap items-center gap-6">
            <nav
              aria-label="Footer Navigation"
              className="flex flex-wrap items-center gap-6 text-xs font-medium"
            >
              {SITE_CONTENT.navigation.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/'}
                  className={({ isActive }) =>
                    `transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0077b6] rounded-sm ${
                      isActive
                        ? 'text-[#0077b6] font-semibold'
                        : 'text-[#1e3a5f] hover:text-[#0077b6]'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <NavLink
                to="/one-pager"
                className={({ isActive }) =>
                  `transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0077b6] rounded-sm ${
                    isActive
                      ? 'text-[#0077b6] font-semibold'
                      : 'text-[#1e3a5f] hover:text-[#0077b6]'
                  }`
                }
              >
                Executive One-Pager
              </NavLink>
              <a
                href="/api/download-pptx"
                download="Phoenix_Solutions_90_Day_Growth_Plan.pptx"
                className="text-[#0077b6] hover:underline font-semibold flex items-center gap-1"
                title="Download 30-60-90 Day Growth Plan Presentation"
              >
                <span>PPTX Plan</span>
              </a>
            </nav>

            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-md btn-3d-secondary cursor-pointer focus-visible:outline-2 focus-visible:outline-[#0077b6]"
              aria-label="Scroll back to top of current page"
            >
              <span>Top</span>
              <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
