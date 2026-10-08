import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  Lock,
  Search,
  Users,
  Building2,
  Briefcase,
  Ticket as TicketIcon,
  Calendar,
  Layers,
  Zap,
  FileText,
  Plus,
  Download,
  CheckCircle2,
  AlertTriangle,
  Clock,
  TrendingUp,
  DollarSign,
  ArrowRight,
  Filter,
  UserCheck,
  Code,
  Globe,
  Send,
  MessageSquare,
  Sparkles,
  LogOut,
  ChevronRight,
  ExternalLink,
  Copy,
  Check
} from 'lucide-react';
import {
  crmStore,
  CrmStore
} from '../services/crmStore';
import {
  fetchRealtimeSearchAnalytics,
  RealtimeSearchAnalytics
} from '../services/searchAnalyticsService';
import {
  Lead,
  ClientCompany,
  Deal,
  Ticket,
  UserRole,
  DealStage,
  TicketStatus,
  LeadStatus
} from '../services/crmData';

interface CrmPageProps {
  reducedMotion?: boolean;
}

export const CrmPage: React.FC<CrmPageProps> = ({ reducedMotion }) => {
  const [, setTick] = useState(0);

  // Sync state with crmStore
  useEffect(() => {
    const unsubscribe = crmStore.subscribe(() => setTick((t) => t + 1));
    return unsubscribe;
  }, []);

  // IAM Auth State
  const currentUser = crmStore.getCurrentUser();
  const isAuthenticated = crmStore.isAuthenticated();

  // Login form state
  const [loginEmail, setLoginEmail] = useState('pgmenon@live.com');
  const [loginPasscode, setLoginPasscode] = useState('PHOENIX-2026');
  const [authError, setAuthError] = useState('');

  // Active Tab State
  const [activeTab, setActiveTab] = useState<'dashboard' | 'leads' | 'clients' | 'deals' | 'tickets' | 'tasks' | 'projects' | 'orders' | 'automations' | 'audit'>('dashboard');

  // Real-time Search Analytics State
  const [searchAnalytics, setSearchAnalytics] = useState<RealtimeSearchAnalytics | null>(null);
  const [isAuditingSearch, setIsAuditingSearch] = useState(false);

  useEffect(() => {
    fetchRealtimeSearchAnalytics().then((data) => {
      if (data) setSearchAnalytics(data);
    });
  }, []);

  const handleRunSearchAudit = async () => {
    setIsAuditingSearch(true);
    try {
      const data = await fetchRealtimeSearchAnalytics();
      setSearchAnalytics(data);
    } finally {
      setIsAuditingSearch(false);
    }
  };

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [leadTempFilter, setLeadTempFilter] = useState<'all' | 'Hot' | 'Warm' | 'Cold'>('all');
  const [leadStatusFilter, setLeadStatusFilter] = useState<'all' | LeadStatus>('all');
  const [dealStageFilter, setDealStageFilter] = useState<'all' | DealStage>('all');
  const [ticketStatusFilter, setTicketStatusFilter] = useState<'all' | TicketStatus>('all');

  // Modal States
  const [selectedLeadModal, setSelectedLeadModal] = useState<Lead | null>(null);
  const [selectedTicketModal, setSelectedTicketModal] = useState<Ticket | null>(null);
  const [isNewLeadModalOpen, setIsNewLeadModalOpen] = useState(false);
  const [isConvertModalOpen, setIsConvertModalOpen] = useState<Lead | null>(null);
  const [newCommentText, setNewCommentText] = useState('');
  const [isInternalComment, setIsInternalComment] = useState(false);
  const [copiedSnippet, setCopiedSnippet] = useState(false);

  // New Lead Form State
  const [newLeadForm, setNewLeadForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    industry: 'Enterprise Software & Cloud',
    serviceInterest: 'Digital Forge' as any,
    projectType: 'Modular ERP / Custom SaaS System',
    budgetRange: '₹15,000,000 - ₹30,000,000 INR',
    timeline: 'Q2 2026 (Start within 3 weeks)',
    leadTemperature: 'Hot' as any,
    keyRequirements: '',
    source: 'Manual' as any
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    const success = crmStore.loginWithIam(loginEmail, loginPasscode);
    if (!success) {
      setAuthError('Invalid IAM Credentials or Passcode. Please use PHOENIX-2026 or an authorized IAM email.');
    }
  };

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    crmStore.createLead(newLeadForm);
    setIsNewLeadModalOpen(false);
    setNewLeadForm({
      name: '',
      email: '',
      phone: '',
      company: '',
      industry: 'Enterprise Software & Cloud',
      serviceInterest: 'Digital Forge',
      projectType: 'Modular ERP / Custom SaaS System',
      budgetRange: '₹15,000,000 - ₹30,000,000 INR',
      timeline: 'Q2 2026 (Start within 3 weeks)',
      leadTemperature: 'Hot',
      keyRequirements: '',
      source: 'Manual'
    });
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTicketModal || !newCommentText.trim()) return;
    crmStore.addTicketComment(selectedTicketModal.id, newCommentText, isInternalComment);
    setNewCommentText('');
    // Refresh current ticket in modal
    const updated = crmStore.getTickets().find((t) => t.id === selectedTicketModal.id);
    if (updated) setSelectedTicketModal(updated);
  };

  const handleConvertLead = (lead: Lead) => {
    crmStore.convertLeadToClient(lead.id);
    setIsConvertModalOpen(null);
    setSelectedLeadModal(null);
    setActiveTab('deals');
  };

  // Filtered Lists
  const leads = crmStore.getLeads().filter((l) => {
    if (leadTempFilter !== 'all' && l.leadTemperature !== leadTempFilter) return false;
    if (leadStatusFilter !== 'all' && l.status !== leadStatusFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return l.name.toLowerCase().includes(q) || l.company.toLowerCase().includes(q) || l.email.toLowerCase().includes(q) || l.referenceId.toLowerCase().includes(q);
    }
    return true;
  });

  const clients = crmStore.getClients();
  const deals = crmStore.getDeals();
  const tickets = crmStore.getTickets().filter((t) => {
    if (ticketStatusFilter !== 'all' && t.status !== ticketStatusFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return t.ticketNumber.toLowerCase().includes(q) || t.title.toLowerCase().includes(q) || t.linkedEntityName?.toLowerCase().includes(q);
    }
    return true;
  });
  const projects = crmStore.getProjects();
  const invoices = crmStore.getInvoices();
  const automations = crmStore.getAutomations();
  const auditLogs = crmStore.getAuditLogs();

  // Metrics
  const totalLeadsCount = crmStore.getLeads().length;
  const hotLeadsCount = crmStore.getLeads().filter((l) => l.leadTemperature === 'Hot').length;
  const totalPipelineValue = deals.reduce((acc, d) => acc + d.value, 0);
  const openTicketsCount = tickets.filter((t) => t.status !== 'Resolved' && t.status !== 'Closed').length;

  // =========================================================================
  // RENDER SECURITY ACCESS GATE IF NOT AUTHENTICATED
  // =========================================================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#060e1a] text-slate-100 flex items-center justify-center p-4 sm:p-6 font-sans">
        <div className="max-w-md w-full bg-[#0a1828] border border-[#0077b6]/30 rounded-2xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,180,216,0.15)] relative overflow-hidden">
          {/* Top Decorative Amber/Cyan Accent */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#ff7b00] via-[#00b4d8] to-[#034078]" />

          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-[#032340] border border-[#0077b6]/40 flex items-center justify-center shadow-inner">
              <ShieldCheck className="w-9 h-9 text-[#00b4d8]" />
            </div>

            <div>
              <span className="px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#ff7b00] bg-[#ff7b00]/10 border border-[#ff7b00]/20 rounded-md">
                IAM &amp; ADMIN SECURITY GATE
              </span>
              <h1 className="mt-3 font-serif-display text-2xl sm:text-3xl font-bold text-white">
                Executive Operations Portal
              </h1>
              <p className="mt-1 text-xs text-slate-400">
                Phoenix Strategic Evolution • Protected CRM &amp; Public Endpoint Hub
              </p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            {authError && (
              <div className="p-3 rounded-lg bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-mono font-semibold uppercase text-slate-300 mb-1">
                IAM Authorized Email
              </label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="pgmenon@live.com"
                className="w-full px-3.5 py-2.5 bg-[#061220] border border-[#0077b6]/30 rounded-lg text-sm text-white focus:outline-none focus:border-[#00b4d8]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-semibold uppercase text-slate-300 mb-1">
                Security Passcode
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={loginPasscode}
                  onChange={(e) => setLoginPasscode(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 bg-[#061220] border border-[#0077b6]/30 rounded-lg text-sm text-white focus:outline-none focus:border-[#00b4d8]"
                />
                <Lock className="w-4 h-4 text-slate-500 absolute right-3 top-3" />
              </div>
              <p className="mt-1 text-[10px] font-mono text-slate-400">
                Default Security Key: <code className="text-[#00b4d8]">PHOENIX-2026</code>
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-[#0077b6] via-[#0096c7] to-[#00b4d8] text-white font-semibold text-sm rounded-lg hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Verify IAM Credentials &amp; Open CRM</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Preset Role Selector for Demo */}
          <div className="mt-6 pt-5 border-t border-[#0077b6]/20">
            <p className="text-[11px] font-mono text-slate-400 text-center mb-2">
              Quick IAM Role Preset Verification:
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  crmStore.switchRole('admin');
                }}
                className="px-2.5 py-2 text-xs font-mono bg-[#032845] border border-[#0077b6]/30 hover:border-[#00b4d8] text-[#00b4d8] rounded-lg transition-colors cursor-pointer text-left"
              >
                <strong>Admin (PK)</strong>
                <span className="block text-[10px] text-slate-400">Full Access</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  crmStore.switchRole('manager');
                }}
                className="px-2.5 py-2 text-xs font-mono bg-[#032845] border border-[#0077b6]/30 hover:border-[#00b4d8] text-[#00b4d8] rounded-lg transition-colors cursor-pointer text-left"
              >
                <strong>Manager (Vishnu)</strong>
                <span className="block text-[10px] text-slate-400">Ops &amp; Delivery</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // MAIN AUTHENTICATED EXECUTIVE CRM WORKSPACE
  // =========================================================================
  return (
    <div className="min-h-screen bg-[#060e1a] text-slate-100 font-sans flex flex-col">
      {/* Top IAM Control Bar */}
      <header className="bg-[#09182b] border-b border-[#0077b6]/30 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-40 shadow-md">
        <div className="flex items-center gap-3">
          {/* Phoenix Emblem */}
          <div className="w-9 h-9 rounded-xl bg-[#0077b6] flex items-center justify-center text-white shadow-md font-serif font-bold text-lg">
            Ψ
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif-display font-bold text-base text-white tracking-wide">
                PHOENIX STRATEGIC EVOLUTION
              </h1>
              <span className="px-2 py-0.5 text-[9px] font-mono font-bold uppercase text-[#ff7b00] bg-[#ff7b00]/15 border border-[#ff7b00]/30 rounded-md">
                CRM &amp; OPS
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono">
              From complexity, clarity rises.
            </p>
          </div>
        </div>

        {/* Global Search & Quick Actions */}
        <div className="flex items-center gap-3">
          <div className="relative hidden sm:block w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search leads, clients, deals..."
              className="w-full pl-9 pr-3 py-1.5 bg-[#031120] border border-[#0077b6]/30 rounded-lg text-xs text-white focus:outline-none focus:border-[#00b4d8]"
            />
          </div>

          <button
            type="button"
            onClick={() => setIsNewLeadModalOpen(true)}
            className="px-3 py-1.5 bg-[#0077b6] hover:bg-[#0096c7] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-md cursor-pointer transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Lead</span>
          </button>

          {/* User Profile Chip */}
          <div className="flex items-center gap-2 bg-[#031c33] border border-[#0077b6]/30 rounded-lg p-1.5">
            <img
              src={currentUser?.avatar || '/founder_praveen.svg'}
              alt={currentUser?.name}
              className="w-7 h-7 rounded-md object-cover border border-[#00b4d8]"
            />
            <div className="hidden lg:block text-left pr-2">
              <p className="text-xs font-bold text-white leading-none">{currentUser?.name}</p>
              <p className="text-[10px] font-mono text-[#00b4d8] uppercase leading-none mt-1">
                {currentUser?.role}
              </p>
            </div>
            <button
              type="button"
              onClick={() => crmStore.logout()}
              title="Logout IAM"
              className="p-1 text-slate-400 hover:text-rose-400 rounded-md transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace Grid: Navigation Sidebar + Content View */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Navigation Sidebar */}
        <aside className="w-full md:w-64 bg-[#081526] border-r border-[#0077b6]/20 p-3 space-y-1 shrink-0">
          <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400 px-3 py-1.5">
            Executive Modules
          </p>

          <button
            type="button"
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'dashboard'
                ? 'bg-[#0077b6] text-white shadow-md'
                : 'text-slate-300 hover:bg-[#0a1e33] hover:text-white'
            }`}
          >
            <TrendingUp className="w-4 h-4 text-[#00b4d8]" />
            <span>Dashboard &amp; Reports</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('leads')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'leads'
                ? 'bg-[#0077b6] text-white shadow-md'
                : 'text-slate-300 hover:bg-[#0a1e33] hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Users className="w-4 h-4 text-[#ff7b00]" />
              <span>Leads &amp; Prospects</span>
            </div>
            {hotLeadsCount > 0 && (
              <span className="px-1.5 py-0.5 text-[10px] font-mono font-bold bg-[#ff7b00] text-white rounded-md">
                {hotLeadsCount} Hot
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('clients')}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'clients'
                ? 'bg-[#0077b6] text-white shadow-md'
                : 'text-slate-300 hover:bg-[#0a1e33] hover:text-white'
            }`}
          >
            <Building2 className="w-4 h-4 text-[#38bdf8]" />
            <span>Clients &amp; Accounts</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('deals')}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'deals'
                ? 'bg-[#0077b6] text-white shadow-md'
                : 'text-slate-300 hover:bg-[#0a1e33] hover:text-white'
            }`}
          >
            <Briefcase className="w-4 h-4 text-[#10b981]" />
            <span>Deals Pipeline (Kanban)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('tickets')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'tickets'
                ? 'bg-[#0077b6] text-white shadow-md'
                : 'text-slate-300 hover:bg-[#0a1e33] hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <TicketIcon className="w-4 h-4 text-[#f59e0b]" />
              <span>Ticketing Engine</span>
            </div>
            {openTicketsCount > 0 && (
              <span className="px-1.5 py-0.5 text-[10px] font-mono font-bold bg-[#f59e0b] text-slate-900 rounded-md">
                {openTicketsCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('tasks')}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'tasks'
                ? 'bg-[#0077b6] text-white shadow-md'
                : 'text-slate-300 hover:bg-[#0a1e33] hover:text-white'
            }`}
          >
            <Calendar className="w-4 h-4 text-[#a855f7]" />
            <span>Tasks &amp; Discovery Calls</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('projects')}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'projects'
                ? 'bg-[#0077b6] text-white shadow-md'
                : 'text-slate-300 hover:bg-[#0a1e33] hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4 text-[#ec4899]" />
            <span>Projects &amp; Invoices</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'orders'
                ? 'bg-[#0077b6] text-white shadow-md'
                : 'text-slate-300 hover:bg-[#0a1e33] hover:text-white'
            }`}
          >
            <DollarSign className="w-4 h-4 text-[#10b981]" />
            <span>Orders &amp; Price Catalog</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('automations')}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'automations'
                ? 'bg-[#0077b6] text-white shadow-md'
                : 'text-slate-300 hover:bg-[#0a1e33] hover:text-white'
            }`}
          >
            <Zap className="w-4 h-4 text-[#38bdf8]" />
            <span>Public API &amp; Webhooks</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('audit')}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'audit'
                ? 'bg-[#0077b6] text-white shadow-md'
                : 'text-slate-300 hover:bg-[#0a1e33] hover:text-white'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-[#10b981]" />
            <span>IAM Audit Logs</span>
          </button>

          {/* Role Switcher Drawer */}
          <div className="pt-4 border-t border-[#0077b6]/20 mt-4">
            <p className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-2 px-1">
              Active IAM Role:
            </p>
            <select
              value={currentUser?.role}
              onChange={(e) => crmStore.switchRole(e.target.value as UserRole)}
              className="w-full px-2.5 py-1.5 bg-[#031120] border border-[#0077b6]/30 text-xs text-[#00b4d8] font-mono rounded-lg focus:outline-none"
            >
              <option value="admin">Admin (PK)</option>
              <option value="manager">Manager (Vishnu)</option>
              <option value="sales">Sales / BD Executive</option>
              <option value="support">Support / Delivery</option>
              <option value="client">Client Portal User</option>
            </select>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto space-y-6">
          {/* TAB 1: DASHBOARD & REPORTS */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-serif-display text-2xl font-bold text-white">
                    Executive Operations &amp; Intelligence Summary
                  </h2>
                  <p className="text-xs text-slate-400">
                    Real-time pipeline analytics, lead conversion metrics, and SLA status
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => crmStore.exportLeadsCsv()}
                  className="px-3.5 py-2 bg-[#0077b6]/30 border border-[#0077b6]/50 hover:bg-[#0077b6] text-white text-xs font-semibold rounded-lg flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Export CSV Report</span>
                </button>
              </div>

              {/* KPI Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#0a1828] border border-[#0077b6]/30 rounded-xl p-4 shadow-sm space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                    <span>TOTAL LEADS</span>
                    <Users className="w-4 h-4 text-[#ff7b00]" />
                  </div>
                  <p className="text-2xl font-bold text-white tabular-nums">{totalLeadsCount}</p>
                  <p className="text-[11px] text-[#ff7b00] font-semibold">{hotLeadsCount} Hot Prospects</p>
                </div>

                <div className="bg-[#0a1828] border border-[#0077b6]/30 rounded-xl p-4 shadow-sm space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                    <span>PIPELINE VALUE</span>
                    <DollarSign className="w-4 h-4 text-[#10b981]" />
                  </div>
                  <p className="text-2xl font-bold text-white tabular-nums">
                    ₹{(totalPipelineValue / 10000000).toFixed(2)} Cr
                  </p>
                  <p className="text-[11px] text-[#10b981] font-semibold">Active Commercial Deals</p>
                </div>

                <div className="bg-[#0a1828] border border-[#0077b6]/30 rounded-xl p-4 shadow-sm space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                    <span>OPEN TICKETS</span>
                    <TicketIcon className="w-4 h-4 text-[#f59e0b]" />
                  </div>
                  <p className="text-2xl font-bold text-white tabular-nums">{openTicketsCount}</p>
                  <p className="text-[11px] text-[#f59e0b] font-semibold">Active Response SLA</p>
                </div>

                <div className="bg-[#0a1828] border border-[#0077b6]/30 rounded-xl p-4 shadow-sm space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                    <span>CONVERSION TARGET</span>
                    <TrendingUp className="w-4 h-4 text-[#00b4d8]" />
                  </div>
                  <p className="text-2xl font-bold text-white tabular-nums">ACTIVE</p>
                  <p className="text-[11px] text-[#00b4d8] font-semibold">Discovery to Partner</p>
                </div>
              </div>

              {/* Real-Time Google & Search Engine Intelligence Module */}
              <div className="p-6 bg-gradient-to-br from-[#021627] via-[#042440] to-[#003554] border border-[#0077b6]/40 rounded-2xl text-white shadow-xl space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#0077b6]/30 pb-4">
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-2">
                      <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider bg-[#00b4d8] text-[#011627] rounded-md shadow-xs">
                        Google Search Grounded
                      </span>
                      <span className="text-xs font-mono text-[#90e0ef] font-semibold">
                        Real-Time Indexing &amp; Brand Authority
                      </span>
                    </div>
                    <h3 className="font-serif-display text-xl font-bold text-white flex items-center gap-2">
                      <Globe className="w-5 h-5 text-[#00b4d8]" />
                      <span>Google &amp; Search Engines Real-Time Analytics</span>
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={handleRunSearchAudit}
                    disabled={isAuditingSearch}
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold bg-[#0077b6] hover:bg-[#0096c7] text-white rounded-lg shadow-md transition-all cursor-pointer disabled:opacity-50 shrink-0"
                  >
                    <Search className={`w-4 h-4 ${isAuditingSearch ? 'animate-spin' : ''}`} />
                    <span>{isAuditingSearch ? 'Auditing Search Grounding...' : 'Run Search Engine Audit'}</span>
                  </button>
                </div>

                {searchAnalytics ? (
                  <div className="space-y-5">
                    {/* Top Metrics Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="p-4 bg-[#031c2e] border border-[#0077b6]/30 rounded-xl space-y-1">
                        <span className="text-[10px] font-mono uppercase text-[#00b4d8]">Search Visibility Score</span>
                        <p className="text-2xl font-mono font-bold text-[#10b981]">
                          {searchAnalytics.searchVisibilityScore} / 100
                        </p>
                        <p className="text-[11px] text-slate-300">Google &amp; AI Engine Index</p>
                      </div>

                      <div className="p-4 bg-[#031c2e] border border-[#0077b6]/30 rounded-xl space-y-1">
                        <span className="text-[10px] font-mono uppercase text-[#00b4d8]">Monthly Organic Impressions</span>
                        <p className="text-2xl font-mono font-bold text-[#38bdf8]">
                          {searchAnalytics.estimatedMonthlyImpressions.toLocaleString('en-US')}
                        </p>
                        <p className="text-[11px] text-slate-300">Enterprise Queries</p>
                      </div>

                      <div className="p-4 bg-[#031c2e] border border-[#0077b6]/30 rounded-xl space-y-1">
                        <span className="text-[10px] font-mono uppercase text-[#00b4d8]">Organic CTR</span>
                        <p className="text-2xl font-mono font-bold text-[#ff7b00]">
                          {searchAnalytics.organicCtrPercent}%
                        </p>
                        <p className="text-[11px] text-slate-300">High Executive Intent</p>
                      </div>
                    </div>

                    {/* AI Grounding Summary */}
                    <div className="p-4 bg-[#011425] border border-[#0077b6]/30 rounded-xl space-y-1.5">
                      <h4 className="text-xs font-mono font-bold text-[#90e0ef] uppercase flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-[#ff7b00]" />
                        <span>Live Search Engine Grounding Summary</span>
                      </h4>
                      <p className="text-xs text-slate-200 leading-relaxed">
                        {searchAnalytics.searchGroundingSummary}
                      </p>
                    </div>

                    {/* Search Engine Distribution & Keywords */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Share Breakdown */}
                      <div className="p-4 bg-[#031c2e] border border-[#0077b6]/30 rounded-xl space-y-3">
                        <h4 className="text-xs font-mono font-bold text-[#00b4d8] uppercase">
                          Search Engine Share Breakdown
                        </h4>
                        <div className="space-y-2">
                          {searchAnalytics.searchEngineDistribution.map((item, idx) => (
                            <div key={idx} className="space-y-1">
                              <div className="flex justify-between text-xs font-mono">
                                <span className="text-white font-bold">{item.engine}</span>
                                <span className="text-[#38bdf8] font-bold">{item.sharePercent}%</span>
                              </div>
                              <div className="w-full h-1.5 bg-[#011425] rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-[#0077b6] to-[#00b4d8] rounded-full"
                                  style={{ width: `${item.sharePercent}%` }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Top Ranked Keywords */}
                      <div className="p-4 bg-[#031c2e] border border-[#0077b6]/30 rounded-xl space-y-3">
                        <h4 className="text-xs font-mono font-bold text-[#00b4d8] uppercase">
                          Top Search Engine Rankings
                        </h4>
                        <div className="space-y-2">
                          {searchAnalytics.topKeywords.map((kw, idx) => (
                            <div
                              key={idx}
                              className="p-2 bg-[#011425] border border-[#0077b6]/20 rounded-lg flex items-center justify-between text-xs"
                            >
                              <p className="font-bold text-white truncate max-w-[200px]">{kw.keyword}</p>
                              <span className="px-2 py-0.5 bg-[#0077b6]/30 text-[#38bdf8] border border-[#0077b6]/40 text-[10px] font-mono font-bold rounded">
                                Rank #{kw.position}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-6 text-center text-slate-400 border border-dashed border-[#0077b6]/30 rounded-xl">
                    <p className="text-xs">Loading live Google &amp; Search Engine analytics...</p>
                  </div>
                )}
              </div>

              {/* Recent Hot Leads & Active Tickets */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Hot Prospects */}
                <div className="bg-[#0a1828] border border-[#0077b6]/30 rounded-xl p-5 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#0077b6]/20">
                    <h3 className="font-serif-display font-bold text-base text-white flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#ff7b00]" />
                      <span>Priority Hot Prospects</span>
                    </h3>
                    <button
                      type="button"
                      onClick={() => setActiveTab('leads')}
                      className="text-xs text-[#00b4d8] hover:underline"
                    >
                      View All Leads →
                    </button>
                  </div>

                  <div className="space-y-3">
                    {crmStore.getLeads().slice(0, 3).map((lead) => (
                      <div
                        key={lead.id}
                        onClick={() => setSelectedLeadModal(lead)}
                        className="p-3.5 bg-[#031221] border border-[#0077b6]/20 rounded-xl hover:border-[#00b4d8] transition-colors cursor-pointer space-y-1.5"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono font-bold text-[#00b4d8]">
                            {lead.referenceId}
                          </span>
                          <span className="px-2 py-0.5 text-[10px] font-mono font-bold text-white bg-[#ff7b00] rounded-md">
                            {lead.leadTemperature} ({lead.leadScore}/100)
                          </span>
                        </div>
                        <h4 className="font-bold text-sm text-white">{lead.company}</h4>
                        <p className="text-xs text-slate-300">
                          {lead.name} • {lead.projectType}
                        </p>
                        <p className="text-[11px] text-slate-400 font-mono">
                          Budget: {lead.budgetRange}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Active Tickets */}
                <div className="bg-[#0a1828] border border-[#0077b6]/30 rounded-xl p-5 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#0077b6]/20">
                    <h3 className="font-serif-display font-bold text-base text-white flex items-center gap-2">
                      <TicketIcon className="w-4 h-4 text-[#f59e0b]" />
                      <span>Active Operations Tickets</span>
                    </h3>
                    <button
                      type="button"
                      onClick={() => setActiveTab('tickets')}
                      className="text-xs text-[#00b4d8] hover:underline"
                    >
                      View All Tickets →
                    </button>
                  </div>

                  <div className="space-y-3">
                    {tickets.slice(0, 3).map((ticket) => (
                      <div
                        key={ticket.id}
                        onClick={() => setSelectedTicketModal(ticket)}
                        className="p-3.5 bg-[#031221] border border-[#0077b6]/20 rounded-xl hover:border-[#00b4d8] transition-colors cursor-pointer space-y-1.5"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono font-bold text-[#f59e0b]">
                            {ticket.ticketNumber}
                          </span>
                          <span className="px-2 py-0.5 text-[10px] font-mono font-bold text-white bg-rose-600 rounded-md">
                            {ticket.priority} SLA
                          </span>
                        </div>
                        <h4 className="font-bold text-sm text-white">{ticket.title}</h4>
                        <p className="text-xs text-slate-300">
                          Assignee: {ticket.assigneeName} • Status: {ticket.status}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: LEADS & PROSPECTS */}
          {activeTab === 'leads' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-serif-display text-2xl font-bold text-white">
                    Leads &amp; Prospects Management
                  </h2>
                  <p className="text-xs text-slate-400">
                    Inquiries automatically flowing from Website Contact Form and Ember AI Chatbot
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsNewLeadModalOpen(true)}
                  className="px-4 py-2 bg-[#0077b6] hover:bg-[#0096c7] text-white text-xs font-semibold rounded-lg flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Lead Manually</span>
                </button>
              </div>

              {/* Filters Bar */}
              <div className="flex flex-wrap items-center gap-3 bg-[#0a1828] border border-[#0077b6]/20 p-3 rounded-xl">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                  <Filter className="w-3.5 h-3.5" />
                  <span>Filter By:</span>
                </div>
                <select
                  value={leadTempFilter}
                  onChange={(e) => setLeadTempFilter(e.target.value as any)}
                  className="px-2.5 py-1.5 bg-[#031120] border border-[#0077b6]/30 text-xs text-white rounded-lg focus:outline-none"
                >
                  <option value="all">All Temperatures</option>
                  <option value="Hot">Hot Prospects</option>
                  <option value="Warm">Warm Prospects</option>
                  <option value="Cold">Cold Prospects</option>
                </select>

                <select
                  value={leadStatusFilter}
                  onChange={(e) => setLeadStatusFilter(e.target.value as any)}
                  className="px-2.5 py-1.5 bg-[#031120] border border-[#0077b6]/30 text-xs text-white rounded-lg focus:outline-none"
                >
                  <option value="all">All Statuses</option>
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Qualified">Qualified</option>
                  <option value="Discovery Call Booked">Discovery Booked</option>
                  <option value="Proposal Sent">Proposal Sent</option>
                  <option value="Won">Won</option>
                  <option value="Lost">Lost</option>
                </select>
              </div>

              {/* Leads Table */}
              <div className="bg-[#0a1828] border border-[#0077b6]/30 rounded-xl overflow-hidden shadow-md">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#031221] border-b border-[#0077b6]/30 text-slate-400 font-mono text-[10px] uppercase">
                      <tr>
                        <th className="p-3">Ref ID</th>
                        <th className="p-3">Company &amp; Contact</th>
                        <th className="p-3">Source &amp; Practice</th>
                        <th className="p-3">Temperature</th>
                        <th className="p-3">Budget Range</th>
                        <th className="p-3">Status</th>
                        <th className="p-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#0077b6]/15">
                      {leads.map((lead) => (
                        <tr
                          key={lead.id}
                          className="hover:bg-[#081e33] transition-colors cursor-pointer"
                          onClick={() => setSelectedLeadModal(lead)}
                        >
                          <td className="p-3 font-mono font-bold text-[#00b4d8]">
                            {lead.referenceId}
                            {lead.isDuplicate && (
                              <span className="ml-2 px-1.5 py-0.5 text-[9px] bg-amber-500/20 text-amber-300 rounded border border-amber-500/40">
                                Dup
                              </span>
                            )}
                          </td>
                          <td className="p-3">
                            <p className="font-bold text-white text-sm">{lead.company}</p>
                            <p className="text-slate-400 text-[11px]">{lead.name} • {lead.email}</p>
                          </td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded bg-[#03243f] text-[#38bdf8] font-mono text-[10px]">
                              {lead.source}
                            </span>
                            <p className="text-slate-400 text-[11px] mt-1">{lead.serviceInterest}</p>
                          </td>
                          <td className="p-3">
                            <span
                              className={`px-2 py-0.5 text-[10px] font-mono font-bold rounded ${
                                lead.leadTemperature === 'Hot'
                                  ? 'bg-[#ff7b00] text-white'
                                  : lead.leadTemperature === 'Warm'
                                  ? 'bg-amber-500 text-slate-900'
                                  : 'bg-slate-700 text-slate-200'
                              }`}
                            >
                              {lead.leadTemperature} ({lead.leadScore})
                            </span>
                          </td>
                          <td className="p-3 text-slate-300 font-mono">
                            {lead.budgetRange}
                          </td>
                          <td className="p-3">
                            <span className="px-2.5 py-1 text-[10px] font-semibold bg-[#0077b6]/20 text-[#00b4d8] border border-[#0077b6]/40 rounded-md">
                              {lead.status}
                            </span>
                          </td>
                          <td className="p-3 text-right" onClick={(e) => e.stopPropagation()}>
                            <button
                              type="button"
                              onClick={() => handleConvertLead(lead)}
                              className="px-2.5 py-1 bg-[#10b981] hover:bg-[#059669] text-white text-[11px] font-bold rounded transition-colors cursor-pointer"
                            >
                              Convert → Client
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CLIENTS & ACCOUNTS */}
          {activeTab === 'clients' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif-display text-2xl font-bold text-white">
                  Clients &amp; Corporate Accounts
                </h2>
                <p className="text-xs text-slate-400">
                  Active enterprise accounts, primary contacts, and total historical deal value
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {clients.map((client) => (
                  <div
                    key={client.id}
                    className="bg-[#0a1828] border border-[#0077b6]/30 rounded-xl p-5 space-y-4 shadow-sm"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="px-2 py-0.5 text-[10px] font-mono font-bold text-[#10b981] bg-[#10b981]/15 border border-[#10b981]/30 rounded">
                          {client.lifecycleStage} Client
                        </span>
                        <h3 className="font-serif-display text-xl font-bold text-white mt-1">
                          {client.name}
                        </h3>
                        <p className="text-xs text-slate-400">{client.industry} • {client.address}</p>
                      </div>
                      <span className="font-mono text-sm font-bold text-[#38bdf8]">
                        ₹{(client.totalDealsValue / 1000000).toFixed(1)}M INR
                      </span>
                    </div>

                    <div className="pt-3 border-t border-[#0077b6]/20 space-y-2">
                      <p className="text-xs font-mono font-bold text-[#00b4d8] uppercase">
                        Primary Contact:
                      </p>
                      {client.contacts.map((cnt) => (
                        <div key={cnt.id} className="text-xs text-slate-300">
                          <strong>{cnt.name}</strong> ({cnt.title}) • {cnt.email} • {cnt.phone}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: DEALS PIPELINE (KANBAN) */}
          {activeTab === 'deals' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif-display text-2xl font-bold text-white">
                  Deals &amp; Commercial Pipeline (Kanban)
                </h2>
                <p className="text-xs text-slate-400">
                  Drag and drop deals across commercial qualification stages
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto pb-4">
                {(['Qualification', 'Discovery', 'Proposal Sent', 'Negotiation', 'Closed Won'] as DealStage[]).map(
                  (stage) => {
                    const stageDeals = deals.filter((d) => d.stage === stage);
                    const stageValue = stageDeals.reduce((acc, d) => acc + d.value, 0);

                    return (
                      <div
                        key={stage}
                        className="bg-[#081526] border border-[#0077b6]/25 rounded-xl p-3 space-y-3 min-w-[220px]"
                      >
                        <div className="flex items-center justify-between border-b border-[#0077b6]/20 pb-2">
                          <span className="font-mono text-xs font-bold text-[#00b4d8]">
                            {stage} ({stageDeals.length})
                          </span>
                          <span className="text-[10px] font-mono text-slate-400">
                            ₹{(stageValue / 1000000).toFixed(1)}M
                          </span>
                        </div>

                        <div className="space-y-2">
                          {stageDeals.map((deal) => (
                            <div
                              key={deal.id}
                              className="bg-[#031221] border border-[#0077b6]/30 rounded-lg p-3 space-y-2 hover:border-[#00b4d8] transition-colors"
                            >
                              <p className="text-xs font-bold text-white leading-snug">{deal.title}</p>
                              <p className="text-[11px] text-slate-400">{deal.clientName}</p>
                              <div className="flex items-center justify-between text-[11px] font-mono">
                                <span className="font-bold text-[#10b981]">
                                  ₹{(deal.value / 1000000).toFixed(1)}M
                                </span>
                                <span className="text-slate-400">{deal.probability}% Prob</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          )}

          {/* TAB 5: TICKETING ENGINE */}
          {activeTab === 'tickets' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif-display text-2xl font-bold text-white">
                  Ticketing &amp; SLA Management
                </h2>
                <p className="text-xs text-slate-400">
                  Auto-created Prospect Enquiry tickets and Client Service Tickets with SLA breach tracking
                </p>
              </div>

              <div className="space-y-3">
                {tickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    onClick={() => setSelectedTicketModal(ticket)}
                    className="bg-[#0a1828] border border-[#0077b6]/30 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#00b4d8] transition-colors cursor-pointer"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[#f59e0b]">
                          {ticket.ticketNumber}
                        </span>
                        <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-[#ff7b00] text-white rounded">
                          {ticket.priority} SLA ({ticket.slaBreachHours}h)
                        </span>
                        <span className="px-2 py-0.5 text-[10px] font-mono bg-[#03243f] text-[#38bdf8] rounded">
                          {ticket.type}
                        </span>
                      </div>
                      <h3 className="font-bold text-sm text-white">{ticket.title}</h3>
                      <p className="text-xs text-slate-400">{ticket.description}</p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className="px-2.5 py-1 text-xs font-bold bg-[#0077b6]/20 text-[#00b4d8] border border-[#0077b6]/40 rounded-md">
                        {ticket.status}
                      </span>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: TASKS & DISCOVERY CALENDAR */}
          {activeTab === 'tasks' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif-display text-2xl font-bold text-white">
                  Discovery Call Calendar &amp; Action Tasks
                </h2>
                <p className="text-xs text-slate-400">
                  Discovery call bookings from public website and team follow-up reminders
                </p>
              </div>

              <div className="bg-[#0a1828] border border-[#0077b6]/30 rounded-xl p-5 space-y-4">
                <h3 className="font-mono text-xs font-bold text-[#00b4d8] uppercase">
                  Available Discovery Booking Slots (Public API Engine):
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 bg-[#031221] border border-[#0077b6]/20 rounded-lg text-xs space-y-1">
                    <p className="font-bold text-white">Thursday, Oct 3, 2026</p>
                    <p className="text-slate-400">10:00 AM - 10:45 AM IST</p>
                    <span className="px-2 py-0.5 text-[10px] font-mono bg-emerald-500/20 text-emerald-300 rounded">Available</span>
                  </div>
                  <div className="p-3 bg-[#031221] border border-[#0077b6]/20 rounded-lg text-xs space-y-1">
                    <p className="font-bold text-white">Friday, Oct 4, 2026</p>
                    <p className="text-slate-400">02:30 PM - 03:15 PM IST</p>
                    <span className="px-2 py-0.5 text-[10px] font-mono bg-emerald-500/20 text-emerald-300 rounded">Available</span>
                  </div>
                  <div className="p-3 bg-[#031221] border border-[#0077b6]/20 rounded-lg text-xs space-y-1">
                    <p className="font-bold text-white">Monday, Oct 7, 2026</p>
                    <p className="text-slate-400">11:00 AM - 11:45 AM IST</p>
                    <span className="px-2 py-0.5 text-[10px] font-mono bg-emerald-500/20 text-emerald-300 rounded">Available</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: PROJECTS & INVOICES */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif-display text-2xl font-bold text-white">
                  Projects &amp; Invoice Billing Tracking
                </h2>
                <p className="text-xs text-slate-400">
                  Won deal execution milestones, budget vs. actuals, and aging invoices
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Active Projects */}
                <div className="bg-[#0a1828] border border-[#0077b6]/30 rounded-xl p-5 space-y-4">
                  <h3 className="font-serif-display font-bold text-lg text-white">Active Projects</h3>
                  {projects.map((p) => (
                    <div key={p.id} className="p-3.5 bg-[#031221] border border-[#0077b6]/20 rounded-xl space-y-2">
                      <div className="flex justify-between text-xs font-bold text-white">
                        <span>{p.title}</span>
                        <span className="text-[#38bdf8]">{p.progressPercent}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#0077b6] to-[#00b4d8]" style={{ width: `${p.progressPercent}%` }} />
                      </div>
                      <p className="text-[11px] text-slate-400">Budget: ₹{(p.budget / 1000000).toFixed(1)}M INR</p>
                    </div>
                  ))}
                </div>

                {/* Invoices */}
                <div className="bg-[#0a1828] border border-[#0077b6]/30 rounded-xl p-5 space-y-4">
                  <h3 className="font-serif-display font-bold text-lg text-white">Invoices &amp; Billing</h3>
                  {invoices.map((inv) => (
                    <div key={inv.id} className="p-3.5 bg-[#031221] border border-[#0077b6]/20 rounded-xl flex items-center justify-between text-xs">
                      <div>
                        <p className="font-bold text-white">{inv.invoiceNumber} • {inv.clientName}</p>
                        <p className="text-slate-400 text-[11px]">Due: {inv.dueDate}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-mono font-bold text-[#10b981]">₹{(inv.totalAmount / 1000000).toFixed(2)}M</p>
                        <span className={`px-2 py-0.5 text-[10px] font-mono rounded ${inv.status === 'Paid' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'}`}>
                          {inv.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB: ORDERS & PRICE CATALOG */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-serif-display text-2xl font-bold text-white">
                    Orders &amp; Service Pricing Catalog
                  </h2>
                  <p className="text-xs text-slate-400">
                    Manage service pricing models, unit rates, tax configurations, and client orders
                  </p>
                </div>
              </div>

              {/* Price Book Catalog */}
              <div className="bg-[#0a1828] border border-[#0077b6]/30 rounded-xl p-5 space-y-4 shadow-md">
                <div className="flex items-center justify-between border-b border-[#0077b6]/20 pb-3">
                  <h3 className="font-serif-display font-bold text-lg text-white flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-[#ff7b00]" />
                    <span>Portfolio Service Price Book (18% GST Standard)</span>
                  </h3>
                  <span className="text-xs font-mono text-[#00b4d8] font-bold">{crmStore.getPriceBook().length} Active Offerings</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {crmStore.getPriceBook().map((item) => (
                    <div
                      key={item.id}
                      className="p-4 bg-[#031221] border border-[#0077b6]/25 rounded-xl space-y-2 hover:border-[#00b4d8] transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-[#00b4d8]">{item.code}</span>
                        <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-[#03243f] text-[#38bdf8] rounded">
                          {item.pricingModel}
                        </span>
                      </div>
                      <h4 className="font-bold text-sm text-white">{item.name}</h4>
                      <p className="text-xs text-slate-400 line-clamp-2">{item.description}</p>
                      <div className="pt-2 border-t border-[#0077b6]/15 flex items-center justify-between font-mono text-xs">
                        <span className="text-slate-400">Rate:</span>
                        <span className="font-bold text-[#10b981] text-sm">
                          ₹{item.unitPrice.toLocaleString('en-IN')} INR
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Client Orders List */}
              <div className="bg-[#0a1828] border border-[#0077b6]/30 rounded-xl p-5 space-y-4 shadow-md">
                <div className="flex items-center justify-between border-b border-[#0077b6]/20 pb-3">
                  <h3 className="font-serif-display font-bold text-lg text-white flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-[#00b4d8]" />
                    <span>Client Orders &amp; Executed Agreements</span>
                  </h3>
                  <span className="text-xs font-mono text-[#10b981]">Live Synchronization</span>
                </div>

                <div className="space-y-3">
                  {crmStore.getOrders().length === 0 ? (
                    <div className="p-8 text-center text-slate-400 border border-dashed border-[#0077b6]/30 rounded-xl space-y-2">
                      <p className="font-serif-display text-base font-bold text-white">No Executed Orders Currently Logged</p>
                      <p className="text-xs">Qualified client proposals and executed agreements will appear here once converted from won deals or leads.</p>
                    </div>
                  ) : (
                    crmStore.getOrders().map((order) => (
                      <div
                        key={order.id}
                        className="p-4 bg-[#031221] border border-[#0077b6]/25 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 font-mono">
                            <span className="font-bold text-[#ff7b00]">{order.orderNumber}</span>
                            <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded">
                              {order.status}
                            </span>
                          </div>
                          <h4 className="font-bold text-sm text-white">{order.clientName}</h4>
                          <p className="text-slate-400">
                            Owner: {order.salesOwnerName} • Terms: {order.paymentTerms}
                          </p>
                          <div className="text-slate-300 space-y-0.5 pt-1">
                            {order.items.map((it) => (
                              <p key={it.id} className="font-mono text-[11px]">
                                • {it.productCode}: {it.productName} (Qty: {it.quantity})
                              </p>
                            ))}
                          </div>
                        </div>

                        <div className="flex flex-col md:items-end justify-between gap-2 shrink-0">
                          <div className="text-right">
                            <p className="text-[10px] font-mono text-slate-400 uppercase">Grand Total (inc 18% GST)</p>
                            <p className="font-mono text-lg font-bold text-[#10b981]">
                              ₹{order.grandTotal.toLocaleString('en-IN')} INR
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              crmStore.convertOrderToInvoice(order.id);
                              setActiveTab('projects');
                            }}
                            className="px-3 py-1.5 bg-[#0077b6] hover:bg-[#0096c7] text-white font-bold text-xs rounded-lg transition-colors cursor-pointer"
                          >
                            Generate Invoice →
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: AUTOMATIONS & PUBLIC API ENDPOINTS */}
          {activeTab === 'automations' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif-display text-2xl font-bold text-white">
                  Public REST API, Webhooks &amp; Embed Snippets
                </h2>
                <p className="text-xs text-slate-400">
                  Exposed public endpoints for website forms, chatbot summary webhook, and discovery bookings
                </p>
              </div>

              {/* Embed JS Snippet Generator */}
              <div className="bg-[#0a1828] border border-[#0077b6]/30 rounded-xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-mono text-xs font-bold text-[#00b4d8] uppercase flex items-center gap-2">
                    <Code className="w-4 h-4" />
                    <span>Drop-In Website Contact Form Embed Snippet:</span>
                  </h3>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(`<script src="https://phoenixsolutions.com/widget.js" data-phoenix-key="phx_live_99201"></script>`);
                      setCopiedSnippet(true);
                      setTimeout(() => setCopiedSnippet(false), 2000);
                    }}
                    className="px-2.5 py-1 text-xs bg-[#0077b6] text-white rounded flex items-center gap-1 cursor-pointer"
                  >
                    {copiedSnippet ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedSnippet ? 'Copied!' : 'Copy Code'}</span>
                  </button>
                </div>
                <pre className="p-3 bg-[#030d1a] border border-[#0077b6]/20 rounded-lg text-xs font-mono text-emerald-300 overflow-x-auto">
                  {`<script src="https://phoenixsolutions.com/widget.js" data-phoenix-key="phx_live_99201" data-[#0077b6]="true"></script>`}
                </pre>
              </div>

              {/* Public Endpoints List */}
              <div className="bg-[#0a1828] border border-[#0077b6]/30 rounded-xl p-5 space-y-4">
                <h3 className="font-serif-display font-bold text-lg text-white">Public API Endpoints</h3>
                <div className="space-y-2 text-xs font-mono">
                  <div className="p-3 bg-[#031221] border border-[#0077b6]/20 rounded-lg flex items-center justify-between">
                    <span className="text-emerald-400 font-bold">POST /api/public/leads</span>
                    <span className="text-slate-400">Website Contact Form Submission</span>
                  </div>
                  <div className="p-3 bg-[#031221] border border-[#0077b6]/20 rounded-lg flex items-center justify-between">
                    <span className="text-emerald-400 font-bold">POST /api/public/chatbot-leads</span>
                    <span className="text-slate-400">Ember AI Chatbot Lead Summary Receiver</span>
                  </div>
                  <div className="p-3 bg-[#031221] border border-[#0077b6]/20 rounded-lg flex items-center justify-between">
                    <span className="text-emerald-400 font-bold">GET /api/public/booking-slots</span>
                    <span className="text-slate-400">Available Discovery Call Slots</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 9: IAM AUDIT LOGS */}
          {activeTab === 'audit' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif-display text-2xl font-bold text-white">
                  IAM Security Audit Trail
                </h2>
                <p className="text-xs text-slate-400">
                  Immutable security audit log of all system actions and lead intake events
                </p>
              </div>

              <div className="bg-[#0a1828] border border-[#0077b6]/30 rounded-xl overflow-hidden">
                <div className="p-4 bg-[#031221] border-b border-[#0077b6]/30 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>TIMESTAMP &amp; ACTOR</span>
                  <span>ACTION &amp; DETAILS</span>
                </div>
                <div className="divide-y divide-[#0077b6]/15">
                  {auditLogs.map((log) => (
                    <div key={log.id} className="p-3.5 text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-slate-400 text-[11px]">{new Date(log.timestamp).toLocaleString()}</span>
                        <span className="font-mono text-[#00b4d8] font-bold">{log.actorName}</span>
                      </div>
                      <p className="text-slate-200">{log.details}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* MODAL: LEAD DETAIL & CONVERT */}
      {selectedLeadModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#0a1828] border border-[#0077b6]/40 rounded-2xl max-w-2xl w-full p-6 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-[#0077b6]/20 pb-3">
              <div>
                <span className="text-xs font-mono text-[#00b4d8] font-bold">{selectedLeadModal.referenceId}</span>
                <h3 className="font-serif-display text-xl font-bold text-white">{selectedLeadModal.company}</h3>
                <p className="text-xs text-slate-400">{selectedLeadModal.name} • {selectedLeadModal.email}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedLeadModal(null)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <p><strong>Service Interest:</strong> {selectedLeadModal.serviceInterest}</p>
              <p><strong>Project Goal:</strong> {selectedLeadModal.projectType}</p>
              <p><strong>Requirements:</strong> {selectedLeadModal.keyRequirements}</p>
              <p><strong>Budget Range:</strong> {selectedLeadModal.budgetRange}</p>
              <p><strong>Lead Temperature:</strong> {selectedLeadModal.leadTemperature} ({selectedLeadModal.leadScore}/100)</p>

              {selectedLeadModal.conversationTranscript && (
                <div className="p-3 bg-[#031221] rounded-lg border border-[#0077b6]/20 font-mono text-[11px] text-slate-300">
                  <p className="text-[#00b4d8] font-bold mb-1">Ember Chat Transcript:</p>
                  <pre className="whitespace-pre-wrap">{selectedLeadModal.conversationTranscript}</pre>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-[#0077b6]/20 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => handleConvertLead(selectedLeadModal)}
                className="px-4 py-2 bg-[#10b981] text-white text-xs font-bold rounded-lg cursor-pointer hover:bg-[#059669]"
              >
                1-Click Convert to Client + Deal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: TICKET DETAIL & COMMENTS */}
      {selectedTicketModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#0a1828] border border-[#0077b6]/40 rounded-2xl max-w-2xl w-full p-6 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-[#0077b6]/20 pb-3">
              <div>
                <span className="text-xs font-mono text-[#f59e0b] font-bold">{selectedTicketModal.ticketNumber}</span>
                <h3 className="font-serif-display text-xl font-bold text-white">{selectedTicketModal.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedTicketModal(null)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-300">{selectedTicketModal.description}</p>

            {/* Comments Thread */}
            <div className="space-y-3 pt-3 border-t border-[#0077b6]/20">
              <p className="text-xs font-mono font-bold text-[#00b4d8] uppercase">Discussion Thread:</p>
              <div className="space-y-2">
                {selectedTicketModal.comments.map((cm) => (
                  <div
                    key={cm.id}
                    className={`p-3 rounded-lg text-xs space-y-1 ${
                      cm.isInternal ? 'bg-[#031d33] border border-[#0077b6]/30' : 'bg-slate-800'
                    }`}
                  >
                    <div className="flex justify-between text-[10px] font-mono text-slate-400">
                      <span>{cm.authorName} ({cm.authorRole.toUpperCase()})</span>
                      <span>{new Date(cm.createdAt).toLocaleTimeString()}</span>
                    </div>
                    <p className="text-slate-200">{cm.text}</p>
                  </div>
                ))}
              </div>

              {/* Add Comment Form */}
              <form onSubmit={handleAddComment} className="space-y-2 pt-2">
                <textarea
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  placeholder="Type response or internal note..."
                  className="w-full p-2.5 bg-[#031120] border border-[#0077b6]/30 rounded-lg text-xs text-white focus:outline-none"
                  rows={2}
                />
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isInternalComment}
                      onChange={(e) => setIsInternalComment(e.target.checked)}
                    />
                    <span>Internal Note (Team only)</span>
                  </label>
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-[#0077b6] text-white text-xs font-bold rounded-lg cursor-pointer"
                  >
                    Post Comment
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: MANUAL NEW LEAD */}
      {isNewLeadModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#0a1828] border border-[#0077b6]/40 rounded-2xl max-w-lg w-full p-6 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-[#0077b6]/20">
              <h3 className="font-serif-display font-bold text-lg text-white">Add New Lead</h3>
              <button onClick={() => setIsNewLeadModalOpen(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleCreateLead} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">Company Name</label>
                <input
                  type="text"
                  required
                  value={newLeadForm.company}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, company: e.target.value })}
                  className="w-full p-2 bg-[#031120] border border-[#0077b6]/30 rounded text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Contact Name</label>
                <input
                  type="text"
                  required
                  value={newLeadForm.name}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, name: e.target.value })}
                  className="w-full p-2 bg-[#031120] border border-[#0077b6]/30 rounded text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={newLeadForm.email}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, email: e.target.value })}
                  className="w-full p-2 bg-[#031120] border border-[#0077b6]/30 rounded text-white"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsNewLeadModalOpen(false)}
                  className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#0077b6] text-white font-bold rounded"
                >
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
