import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Flame, Clock, Layers, Sparkles, Plus, Image as ImageIcon } from 'lucide-react';
import {
  fetchProjectUpdatesSupabase as fetchProjectUpdates,
  ProjectUpdateRecordSupabase as ProjectUpdateRecord,
} from '../services/supabaseService';
import { ASSETS } from '../data/siteContent';
import {
  PageTransition,
  getStaggerContainerVariants,
  getFadeUpItemVariants,
} from '../components/PageTransition';

interface UpdatesPageProps {
  reducedMotion: boolean;
}

export const UpdatesPage: React.FC<UpdatesPageProps> = ({ reducedMotion }) => {
  const [updates, setUpdates] = useState<ProjectUpdateRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'gallery'>('all');

  const containerVariants = getStaggerContainerVariants(reducedMotion);
  const itemVariants = getFadeUpItemVariants(reducedMotion);

  useEffect(() => {
    loadUpdates();
  }, []);

  const loadUpdates = async () => {
    setIsLoading(true);
    try {
      const fetched = await fetchProjectUpdates();
      setUpdates(fetched);
    } catch (error) {
      console.error('Error loading project updates:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredUpdates = filter === 'gallery'
    ? updates.filter((u) => u.image_url && u.image_url.trim().length > 0)
    : updates;

  // Static / Fallback curated timeline updates if Supabase has no records yet
  const fallbackUpdates: ProjectUpdateRecord[] = [
    {
      id: 'fb-1',
      project_name: 'Enterprise Cloud ERP Deployment',
      description: 'Successfully migrated procurement workflows to the cloud, eliminating manual vendor quotation spreadsheets and unifying live dashboard reporting.',
      image_url: ASSETS.heroBanner,
      created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      created_by: 'pgmenon@live.com',
    },
    {
      id: 'fb-2',
      project_name: 'B2B Brand positioning & Thought Leadership Strategy',
      description: 'Engineered a conversion-focused LinkedIn ecosystem and publication series, driving high-intent inbound engagement for strategic advisory partners.',
      image_url: ASSETS.logoEmblem,
      created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      created_by: 'pgmenon@live.com',
    },
  ];

  const displayedUpdates = updates.length > 0 ? filteredUpdates : fallbackUpdates;

  return (
    <PageTransition reducedMotion={reducedMotion}>
      <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-16"
        >
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#0077b6]/20">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-[#0077b6]">
                <Flame className="w-4 h-4 text-[#00b4d8]" aria-hidden="true" />
                <span>Phoenix Dynamic Feed</span>
              </div>
              <h1
                id="page-main-heading"
                tabIndex={-1}
                className="mt-2.5 font-serif-display text-3xl sm:text-5xl font-bold text-gradient-phoenix tracking-tight focus:outline-none"
              >
                Project Updates & Dynamic Gallery
              </h1>
              <p className="mt-3 text-sm sm:text-base text-[#1e3a5f] leading-relaxed">
                Live timelines, dynamic images, and strategic milestones published in real-time directly from our Supabase PostgreSQL core.
              </p>
            </div>

            {/* Filter controls */}
            <div className="flex items-center gap-2 p-1 bg-[#f0f7fe] border border-[#0077b6]/20 rounded-lg">
              <button
                type="button"
                onClick={() => setFilter('all')}
                className={`px-4 py-2 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                  filter === 'all'
                    ? 'bg-[#0077b6] text-white shadow-sm'
                    : 'text-[#042440] hover:text-[#0077b6]'
                }`}
              >
                All Milestones
              </button>
              <button
                type="button"
                onClick={() => setFilter('gallery')}
                className={`px-4 py-2 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                  filter === 'gallery'
                    ? 'bg-[#0077b6] text-white shadow-sm'
                    : 'text-[#042440] hover:text-[#0077b6]'
                }`}
              >
                Visual Gallery
              </button>
            </div>
          </div>

          {/* Dynamic Feed Display */}
          {isLoading && updates.length === 0 ? (
            <div className="py-12 text-center text-[#1e3a5f]">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0077b6] mx-auto mb-4" />
              <p className="text-xs font-mono">Synchronizing dynamic project updates...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Timeline feed column */}
              <div className="lg:col-span-8 space-y-8">
                {displayedUpdates.map((update) => (
                  <motion.article
                    key={update.id}
                    variants={itemVariants}
                    className="card-phoenix rounded-xl p-6 sm:p-8 space-y-6 relative overflow-hidden"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#0077b6]/15 pb-4">
                      <div>
                        <span className="inline-block text-[11px] font-mono font-bold uppercase tracking-wider text-[#0077b6]">
                          Project Update
                        </span>
                        <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-[#042440] mt-0.5">
                          {update.project_name}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-mono text-[#5b7a99] bg-[#f0f7fe] px-3 py-1.5 rounded-lg border border-[#0077b6]/15 tabular-nums">
                        <Clock className="w-3.5 h-3.5 text-[#00b4d8]" />
                        <span>{new Date(update.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                      <div className={`md:col-span-${update.image_url ? '7' : '12'} space-y-4`}>
                        <p className="text-sm sm:text-base text-[#1e3a5f] leading-relaxed">
                          {update.description}
                        </p>
                        {update.created_by && (
                          <div className="flex items-center gap-2 text-xs text-[#0077b6] font-medium pt-2">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Published by {update.created_by}</span>
                          </div>
                        )}
                      </div>

                      {/* Display image if present */}
                      {update.image_url && (
                        <div className="md:col-span-5 relative group overflow-hidden rounded-xl border border-[#0077b6]/20 shadow-sm max-h-48">
                          <img
                            src={update.image_url}
                            alt={update.project_name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover block transition-transform duration-300 group-hover:scale-105"
                            onError={(e) => {
                              // Styled CSS/SVG fallback if the dynamic image fails to load
                              e.currentTarget.style.display = 'none';
                              const parent = e.currentTarget.parentElement;
                              if (parent) {
                                const fallback = document.createElement('div');
                                fallback.className = 'w-full h-36 bg-[#f0f7fe] flex flex-col items-center justify-center text-center p-4 text-[#0077b6]';
                                fallback.innerHTML = `
                                  <svg class="w-8 h-8 opacity-60 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                  <span class="text-xs font-mono font-semibold uppercase">Image Preview</span>
                                `;
                                parent.appendChild(fallback);
                              }
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </motion.article>
                ))}
              </div>

              {/* Sidebar Info/Database stats Column */}
              <div className="lg:col-span-4 space-y-6">
                <div className="card-phoenix rounded-xl p-5 space-y-4">
                  <div className="flex items-center gap-2 text-[#0077b6]">
                    <Layers className="w-5 h-5" />
                    <h4 className="font-serif-display font-semibold text-lg text-[#042440]">
                      Database Transition Setup
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-[#1e3a5f] leading-relaxed">
                    This CMS and Project Updates engine utilizes completely flattened, snake_case schemas engineered for perfect transfer to a PostgreSQL-backed **Supabase** instance.
                  </p>
                  <div className="p-4 bg-[#f8fbff] border border-[#0077b6]/15 rounded-lg space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span>SUPABASE COMPATIBLE</span>
                      <span className="text-[#00b4d8] font-bold">100%</span>
                    </div>
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span>PRIMARY KEY LOGIC</span>
                      <span className="text-[#0077b6] font-semibold">id SERIAL</span>
                    </div>
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span>TIMESTAMP TYPE</span>
                      <span className="text-[#034078] font-semibold">timestamptz</span>
                    </div>
                  </div>
                </div>

                <div className="card-phoenix rounded-xl p-5 space-y-3">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0077b6]">
                    Dynamic Gallery Coverage
                  </span>
                  <p className="text-xs text-[#1e3a5f] leading-relaxed">
                    Live imagery from enterprise cloud transformation deployments can be dynamically submitted here by authenticated administrators via the Google Sign-In CMS Admin portal in the Footer.
                  </p>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </PageTransition>
  );
};
