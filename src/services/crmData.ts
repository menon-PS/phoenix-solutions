/**
 * Phoenix Strategic Evolution - CRM & Operations Data Model & Mock Store
 */

export type UserRole = 'admin' | 'manager' | 'sales' | 'support' | 'client';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  title: string;
}

export type LeadSource = 'Website Form' | 'Chatbot' | 'Referral' | 'Event' | 'Manual' | 'LinkedIn';
export type ServiceInterest = 'Digital Forge' | 'Growth Architecture' | 'The Ascent' | 'Mixed';
export type LeadTemperature = 'Hot' | 'Warm' | 'Cold';
export type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Discovery Call Booked' | 'Proposal Sent' | 'Negotiation' | 'Won' | 'Lost';

export interface Lead {
  id: string;
  referenceId: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  industry: string;
  companySize: string;
  source: LeadSource;
  serviceInterest: ServiceInterest;
  projectType: string;
  coreGoal: string;
  keyRequirements: string;
  existingSystems: string;
  timeline: string;
  budgetRange: string;
  decisionMakers: string;
  leadTemperature: LeadTemperature;
  leadScore: number;
  ownerId: string;
  ownerName: string;
  status: LeadStatus;
  conversationTranscript?: string;
  suggestedNextStep?: string;
  consent: boolean;
  createdAt: string;
  updatedAt: string;
  isDuplicate?: boolean;
}

export type ClientLifecycle = 'Prospect' | 'Active' | 'Past';

export interface ContactPerson {
  id: string;
  name: string;
  title: string;
  email: string;
  phone: string;
  isPrimary: boolean;
}

export interface ClientCompany {
  id: string;
  name: string;
  industry: string;
  website: string;
  address: string;
  lifecycleStage: ClientLifecycle;
  tags: string[];
  ownerId: string;
  ownerName: string;
  contacts: ContactPerson[];
  totalDealsValue: number;
  activeProjectsCount: number;
  createdAt: string;
}

export type DealStage = 'Qualification' | 'Discovery' | 'Proposal Sent' | 'Negotiation' | 'Closed Won' | 'Closed Lost';

export interface Deal {
  id: string;
  title: string;
  clientId: string;
  clientName: string;
  leadId?: string;
  value: number;
  currency: 'INR' | 'USD' | 'EUR' | 'GBP';
  stage: DealStage;
  probability: number;
  expectedCloseDate: string;
  serviceLine: ServiceInterest;
  ownerId: string;
  ownerName: string;
  winLossReason?: string;
  createdAt: string;
}

export type TicketType = 'Prospect Enquiry' | 'Discovery Request' | 'Support Issue' | 'Change Request' | 'Project Task' | 'Billing Query';
export type TicketPriority = 'Low' | 'Medium' | 'High' | 'Urgent';
export type TicketStatus = 'Open' | 'In Progress' | 'Waiting on Client' | 'Resolved' | 'Closed';

export interface TicketComment {
  id: string;
  ticketId: string;
  authorName: string;
  authorRole: UserRole;
  text: string;
  isInternal: boolean;
  createdAt: string;
}

export interface Ticket {
  id: string;
  ticketNumber: string; // e.g., PSE-0001
  title: string;
  description: string;
  linkedEntityId?: string; // Lead or Client ID
  linkedEntityName?: string;
  linkedEntityType?: 'lead' | 'client';
  type: TicketType;
  priority: TicketPriority;
  status: TicketStatus;
  assigneeId: string;
  assigneeName: string;
  dueDate: string;
  slaBreachHours: number; // e.g., 2h for urgent, 24h for low
  isSlaBreached: boolean;
  tags: string[];
  comments: TicketComment[];
  createdAt: string;
  updatedAt: string;
}

export interface TaskItem {
  id: string;
  title: string;
  description: string;
  linkedType: 'lead' | 'client' | 'deal' | 'ticket';
  linkedId: string;
  linkedName: string;
  assigneeName: string;
  dueDate: string;
  isCompleted: boolean;
  priority: 'Low' | 'Medium' | 'High';
  createdAt: string;
}

export interface ProjectMilestone {
  id: string;
  title: string;
  dueDate: string;
  isCompleted: boolean;
}

export interface Project {
  id: string;
  title: string;
  clientId: string;
  clientName: string;
  dealId?: string;
  status: 'Planning' | 'In Progress' | 'Review' | 'Completed' | 'On Hold';
  ownerName: string;
  budget: number;
  actualSpent: number;
  progressPercent: number;
  startDate: string;
  targetEndDate: string;
  milestones: ProjectMilestone[];
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string; // e.g. INV-2026-001
  clientId: string;
  clientName: string;
  projectId?: string;
  amount: number;
  tax: number;
  totalAmount: number;
  currency: string;
  status: 'Draft' | 'Sent' | 'Paid' | 'Overdue';
  dueDate: string;
  issueDate: string;
  items: InvoiceItem[];
}

export interface AutomationRule {
  id: string;
  name: string;
  triggerEvent: 'lead.created' | 'lead.hot' | 'ticket.created' | 'ticket.sla_breached' | 'deal.won';
  conditionText: string;
  actionText: string;
  isEnabled: boolean;
}

export interface WebhookEndpoint {
  id: string;
  name: string;
  url: string;
  secret: string;
  events: string[];
  isActive: boolean;
  lastTriggeredAt?: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actorName: string;
  action: string;
  entityType: string;
  entityId: string;
  details: string;
}

// Initial System Seed Data
export const SEED_USERS: UserProfile[] = [
  { id: 'usr-1', name: 'Praveen G. Menon (PK)', email: 'pgmenon@live.com', role: 'admin', avatar: '', title: 'Founder & Managing Partner' },
  { id: 'usr-2', name: 'Vishnudas Menon (Vishnu)', email: 'vishnu@phoenixsolutions.com', role: 'manager', avatar: '', title: 'Co-Founder & Director of Operations' },
  { id: 'usr-3', name: 'Ananya Sharma', email: 'ananya@phoenixsolutions.com', role: 'sales', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80', title: 'Senior BD Manager' },
  { id: 'usr-4', name: 'Rohan Gupta', email: 'rohan@phoenixsolutions.com', role: 'support', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80', title: 'Lead Solution Architect' },
  { id: 'usr-5', name: 'Vikram Mehta', email: 'vikram@apextech.com', role: 'client', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80', title: 'VP of Engineering, Apex Technologies' }
];

export const SEED_LEADS: Lead[] = [];

export const SEED_CLIENTS: ClientCompany[] = [];

export const SEED_DEALS: Deal[] = [];

export const SEED_TICKETS: Ticket[] = [];

export const SEED_PROJECTS: Project[] = [];

export const SEED_INVOICES: Invoice[] = [];

export const SEED_AUTOMATION_RULES: AutomationRule[] = [
  {
    id: 'rule-1',
    name: 'Instant Hot Lead Manager Alert',
    triggerEvent: 'lead.hot',
    conditionText: 'When Lead Temperature == Hot OR Budget > ₹15M',
    actionText: 'Notify Praveen G. Menon (PK) via Email + Create Call Task',
    isEnabled: true
  },
  {
    id: 'rule-2',
    name: 'Auto Prospect Enquiry Ticket Creation',
    triggerEvent: 'lead.created',
    conditionText: 'When Lead Source in [Website Form, Chatbot]',
    actionText: 'Auto-create Support Ticket type "Prospect Enquiry"',
    isEnabled: true
  }
];

export const SEED_WEBHOOKS: WebhookEndpoint[] = [];

export interface PriceBookItem {
  id: string;
  code: string; // e.g. PRD-DF-01
  name: string;
  category: 'Practice Line' | 'SaaS Architecture' | 'Consulting Advisory' | 'Managed Support';
  pricingModel: 'Fixed Price' | 'Monthly Retainer' | 'Hourly Rate' | 'Milestone Based';
  unitPrice: number; // in INR
  currency: 'INR' | 'USD' | 'EUR' | 'GBP';
  taxRatePercent: number; // e.g. 18
  description: string;
  isActive: boolean;
  updatedAt: string;
}

export interface OrderLineItem {
  id: string;
  productId: string;
  productCode: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  discountPercent: number;
  taxRatePercent: number;
  totalPrice: number;
}

export type OrderStatus = 'Draft' | 'Pending Approval' | 'Confirmed' | 'In Execution' | 'Fulfilled' | 'Cancelled';

export interface Order {
  id: string;
  orderNumber: string; // e.g. ORD-2026-001
  clientId: string;
  clientName: string;
  dealId?: string;
  items: OrderLineItem[];
  subtotal: number;
  discountTotal: number;
  taxTotal: number;
  grandTotal: number;
  currency: 'INR' | 'USD' | 'EUR' | 'GBP';
  status: OrderStatus;
  paymentTerms: string; // e.g. 'Net 30', '50% Advance + 50% Milestone'
  notes: string;
  salesOwnerName: string;
  createdAt: string;
  updatedAt: string;
  deliveryTargetDate: string;
}

export const SEED_PRICEBOOK: PriceBookItem[] = [
  {
    id: 'pb-it-01',
    code: 'PRD-IT-01',
    name: 'Enterprise IT Strategy & Systems Blueprint',
    category: 'Practice Line',
    pricingModel: 'Milestone Based',
    unitPrice: 18000000,
    currency: 'INR',
    taxRatePercent: 18,
    description: 'Enterprise IT strategy auditing, legacy monolith decoupling, cloud deployment architecture, and automated API schemas.',
    isActive: true,
    updatedAt: '2026-10-01T00:00:00Z'
  },
  {
    id: 'pb-it-02',
    code: 'PRD-IT-02',
    name: 'Custom SaaS & Modular ERP System Development',
    category: 'SaaS Architecture',
    pricingModel: 'Milestone Based',
    unitPrice: 28000000,
    currency: 'INR',
    taxRatePercent: 18,
    description: 'Custom modular ERP and SaaS database design covering RFQ processing, vendor portals, automated invoicing, and executive revenue dashboards.',
    isActive: true,
    updatedAt: '2026-10-01T00:00:00Z'
  },
  {
    id: 'pb-it-03',
    code: 'PRD-IT-03',
    name: 'Managed Cloud Infrastructure & SLA Maintenance',
    category: 'Managed Support',
    pricingModel: 'Monthly Retainer',
    unitPrice: 1500000,
    currency: 'INR',
    taxRatePercent: 18,
    description: '24/7 API monitoring, automated security patching, high-availability Cloud Run & PostgreSQL database maintenance with guaranteed 2-hour SLA.',
    isActive: true,
    updatedAt: '2026-10-01T00:00:00Z'
  },
  {
    id: 'pb-bd-01',
    code: 'PRD-BD-01',
    name: 'Commercial GTM & Outbound Pipeline Engine',
    category: 'Practice Line',
    pricingModel: 'Milestone Based',
    unitPrice: 16000000,
    currency: 'INR',
    taxRatePercent: 18,
    description: 'Engineering B2B outbound acquisition models, commercial proposal frameworks, and joint co-selling alliance networks.',
    isActive: true,
    updatedAt: '2026-10-01T00:00:00Z'
  },
  {
    id: 'pb-bd-02',
    code: 'PRD-BD-02',
    name: 'Concept Creation & Commercial Feasibility Modeling',
    category: 'Consulting Advisory',
    pricingModel: 'Fixed Price',
    unitPrice: 10000000,
    currency: 'INR',
    taxRatePercent: 18,
    description: 'Structuring ambitious business concepts, financial unit economics modeling, and market execution feasibility testing.',
    isActive: true,
    updatedAt: '2026-10-01T00:00:00Z'
  },
  {
    id: 'pb-cm-01',
    code: 'PRD-CM-01',
    name: 'High-Authority B2B Content Marketing Ecosystem',
    category: 'Practice Line',
    pricingModel: 'Monthly Retainer',
    unitPrice: 2500000,
    currency: 'INR',
    taxRatePercent: 18,
    description: 'Architecting authority information architecture, topic-cluster content marketing funnels, and conversion copywriting.',
    isActive: true,
    updatedAt: '2026-10-01T00:00:00Z'
  },
  {
    id: 'pb-cm-02',
    code: 'PRD-CM-02',
    name: 'Executive LinkedIn Positioning & Thought Leadership',
    category: 'Consulting Advisory',
    pricingModel: 'Monthly Retainer',
    unitPrice: 1200000,
    currency: 'INR',
    taxRatePercent: 18,
    description: 'Executive ghostwriting, authority positioning, B2B pitch decks, and leadership communication campaigns.',
    isActive: true,
    updatedAt: '2026-10-01T00:00:00Z'
  },
  {
    id: 'pb-hr-01',
    code: 'PRD-HR-01',
    name: 'Leadership Behavioral & Emotional Intelligence Workshops',
    category: 'Consulting Advisory',
    pricingModel: 'Fixed Price',
    unitPrice: 8500000,
    currency: 'INR',
    taxRatePercent: 18,
    description: 'Experiential leadership workshops, middle-management capability matrices, and behavioral maturity tracking.',
    isActive: true,
    updatedAt: '2026-10-01T00:00:00Z'
  }
];

export const SEED_ORDERS: Order[] = [];

export const SEED_AUDIT_LOGS: AuditLogEntry[] = [];
