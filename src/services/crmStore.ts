import {
  Lead,
  LeadStatus,
  ClientCompany,
  Deal,
  DealStage,
  Ticket,
  TicketStatus,
  TicketComment,
  TaskItem,
  Project,
  Invoice,
  AutomationRule,
  WebhookEndpoint,
  AuditLogEntry,
  UserProfile,
  UserRole,
  PriceBookItem,
  Order,
  OrderLineItem,
  OrderStatus,
  SEED_USERS,
  SEED_LEADS,
  SEED_CLIENTS,
  SEED_DEALS,
  SEED_TICKETS,
  SEED_PROJECTS,
  SEED_INVOICES,
  SEED_AUTOMATION_RULES,
  SEED_WEBHOOKS,
  SEED_AUDIT_LOGS,
  SEED_PRICEBOOK,
  SEED_ORDERS
} from './crmData';

const STORAGE_KEYS = {
  LEADS: 'phoenix_crm_leads',
  CLIENTS: 'phoenix_crm_clients',
  DEALS: 'phoenix_crm_deals',
  TICKETS: 'phoenix_crm_tickets',
  TASKS: 'phoenix_crm_tasks',
  PROJECTS: 'phoenix_crm_projects',
  INVOICES: 'phoenix_crm_invoices',
  PRICEBOOK: 'phoenix_crm_pricebook',
  ORDERS: 'phoenix_crm_orders',
  AUTOMATIONS: 'phoenix_crm_automations',
  WEBHOOKS: 'phoenix_crm_webhooks',
  AUDIT_LOGS: 'phoenix_crm_audit_logs',
  IAM_AUTH: 'phoenix_crm_iam_session'
};

// Helper for local storage read/write
function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    return fallback;
  }
}

function saveToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Storage save error:', e);
  }
}

export class CrmStore {
  private leads: Lead[];
  private clients: ClientCompany[];
  private deals: Deal[];
  private tickets: Ticket[];
  private tasks: TaskItem[];
  private projects: Project[];
  private invoices: Invoice[];
  private pricebook: PriceBookItem[];
  private orders: Order[];
  private automations: AutomationRule[];
  private webhooks: WebhookEndpoint[];
  private auditLogs: AuditLogEntry[];
  private currentUser: UserProfile | null;
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.leads = loadFromStorage(STORAGE_KEYS.LEADS, SEED_LEADS);
    this.clients = loadFromStorage(STORAGE_KEYS.CLIENTS, SEED_CLIENTS);
    this.deals = loadFromStorage(STORAGE_KEYS.DEALS, SEED_DEALS);
    this.tickets = loadFromStorage(STORAGE_KEYS.TICKETS, SEED_TICKETS);
    this.tasks = loadFromStorage(STORAGE_KEYS.TASKS, []);
    this.projects = loadFromStorage(STORAGE_KEYS.PROJECTS, SEED_PROJECTS);
    this.invoices = loadFromStorage(STORAGE_KEYS.INVOICES, SEED_INVOICES);
    
    // Always sync pricebook with latest portfolio offerings if empty or old seed
    const storedPb = loadFromStorage<PriceBookItem[]>(STORAGE_KEYS.PRICEBOOK, []);
    if (!storedPb || storedPb.length < 8) {
      this.pricebook = SEED_PRICEBOOK;
      saveToStorage(STORAGE_KEYS.PRICEBOOK, SEED_PRICEBOOK);
    } else {
      this.pricebook = storedPb;
    }

    this.orders = loadFromStorage(STORAGE_KEYS.ORDERS, SEED_ORDERS);
    this.automations = loadFromStorage(STORAGE_KEYS.AUTOMATIONS, SEED_AUTOMATION_RULES);
    this.webhooks = loadFromStorage(STORAGE_KEYS.WEBHOOKS, SEED_WEBHOOKS);
    this.auditLogs = loadFromStorage(STORAGE_KEYS.AUDIT_LOGS, SEED_AUDIT_LOGS);
    this.currentUser = loadFromStorage(STORAGE_KEYS.IAM_AUTH, null);
  }

  public purgeDummyData(): void {
    this.leads = [];
    this.clients = [];
    this.deals = [];
    this.tickets = [];
    this.tasks = [];
    this.projects = [];
    this.invoices = [];
    this.orders = [];
    this.auditLogs = [];

    saveToStorage(STORAGE_KEYS.LEADS, []);
    saveToStorage(STORAGE_KEYS.CLIENTS, []);
    saveToStorage(STORAGE_KEYS.DEALS, []);
    saveToStorage(STORAGE_KEYS.TICKETS, []);
    saveToStorage(STORAGE_KEYS.TASKS, []);
    saveToStorage(STORAGE_KEYS.PROJECTS, []);
    saveToStorage(STORAGE_KEYS.INVOICES, []);
    saveToStorage(STORAGE_KEYS.ORDERS, []);
    saveToStorage(STORAGE_KEYS.AUDIT_LOGS, []);

    this.notify();
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify(): void {
    this.listeners.forEach((l) => l());
  }

  // IAM Auth Methods
  public getCurrentUser(): UserProfile | null {
    return this.currentUser;
  }

  public isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  public loginWithIam(email: string, passcode: string): boolean {
    // Standard IAM & Admin passcodes or user lookup
    const user = SEED_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (user || passcode.toUpperCase() === 'PHOENIX-2026' || passcode.toUpperCase() === 'ADMIN') {
      const activeUser = user || SEED_USERS[0];
      this.currentUser = activeUser;
      saveToStorage(STORAGE_KEYS.IAM_AUTH, activeUser);
      this.logAudit('IAM_LOGIN_SUCCESS', 'User', activeUser.id, `IAM User ${activeUser.name} logged in successfully as ${activeUser.role.toUpperCase()}`);
      this.notify();
      return true;
    }
    return false;
  }

  public switchRole(role: UserRole): void {
    const user = SEED_USERS.find((u) => u.role === role) || {
      id: `usr-${role}`,
      name: `IAM ${role.toUpperCase()} User`,
      email: `${role}@phoenixsolutions.com`,
      role: role,
      avatar: '/founder_praveen.svg',
      title: `IAM ${role.toUpperCase()} Officer`
    };
    this.currentUser = user;
    saveToStorage(STORAGE_KEYS.IAM_AUTH, user);
    this.logAudit('IAM_ROLE_SWITCH', 'User', user.id, `Switched IAM Role to ${role.toUpperCase()}`);
    this.notify();
  }

  public logout(): void {
    if (this.currentUser) {
      this.logAudit('IAM_LOGOUT', 'User', this.currentUser.id, `User ${this.currentUser.name} logged out`);
    }
    this.currentUser = null;
    localStorage.removeItem(STORAGE_KEYS.IAM_AUTH);
    this.notify();
  }

  // Getters
  public getLeads(): Lead[] { return this.leads; }
  public getClients(): ClientCompany[] { return this.clients; }
  public getDeals(): Deal[] { return this.deals; }
  public getTickets(): Ticket[] { return this.tickets; }
  public getTasks(): TaskItem[] { return this.tasks; }
  public getProjects(): Project[] { return this.projects; }
  public getInvoices(): Invoice[] { return this.invoices; }
  public getPriceBook(): PriceBookItem[] { return this.pricebook; }
  public getOrders(): Order[] { return this.orders; }
  public getAutomations(): AutomationRule[] { return this.automations; }
  public getWebhooks(): WebhookEndpoint[] { return this.webhooks; }
  public getAuditLogs(): AuditLogEntry[] { return this.auditLogs; }

  // PriceBook Methods
  public addPriceBookItem(itemData: Partial<PriceBookItem>): PriceBookItem {
    const newItem: PriceBookItem = {
      id: `pb-${Date.now()}`,
      code: itemData.code || `PRD-CST-${Math.floor(10 + Math.random() * 90)}`,
      name: itemData.name || 'New Enterprise Service',
      category: itemData.category || 'Practice Line',
      pricingModel: itemData.pricingModel || 'Milestone Based',
      unitPrice: itemData.unitPrice || 10000000,
      currency: itemData.currency || 'INR',
      taxRatePercent: itemData.taxRatePercent ?? 18,
      description: itemData.description || '',
      isActive: true,
      updatedAt: new Date().toISOString()
    };

    this.pricebook = [newItem, ...this.pricebook];
    saveToStorage(STORAGE_KEYS.PRICEBOOK, this.pricebook);
    this.logAudit('PRICEBOOK_ITEM_ADDED', 'PriceBook', newItem.id, `Added service "${newItem.name}" at ₹${newItem.unitPrice.toLocaleString('en-IN')}`);
    this.notify();
    return newItem;
  }

  public updatePriceBookItem(id: string, updates: Partial<PriceBookItem>): void {
    this.pricebook = this.pricebook.map((p) => (p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p));
    saveToStorage(STORAGE_KEYS.PRICEBOOK, this.pricebook);
    this.logAudit('PRICEBOOK_ITEM_UPDATED', 'PriceBook', id, `Updated pricebook entry pricing or details`);
    this.notify();
  }

  // Order Methods
  public createOrder(orderData: {
    clientId: string;
    clientName: string;
    dealId?: string;
    items: OrderLineItem[];
    paymentTerms?: string;
    notes?: string;
    deliveryTargetDate?: string;
  }): Order {
    const count = this.orders.length + 1;
    const orderNum = `ORD-2026-${String(count).padStart(3, '0')}`;
    const newId = `ord-${Date.now()}`;

    let subtotal = 0;
    let discountTotal = 0;
    let taxTotal = 0;

    orderData.items.forEach((item) => {
      const lineSub = item.quantity * item.unitPrice;
      const lineDisc = lineSub * (item.discountPercent / 100);
      const lineTaxable = lineSub - lineDisc;
      const lineTax = lineTaxable * (item.taxRatePercent / 100);

      subtotal += lineSub;
      discountTotal += lineDisc;
      taxTotal += lineTax;
    });

    const grandTotal = subtotal - discountTotal + taxTotal;

    const newOrder: Order = {
      id: newId,
      orderNumber: orderNum,
      clientId: orderData.clientId,
      clientName: orderData.clientName,
      dealId: orderData.dealId,
      items: orderData.items,
      subtotal,
      discountTotal,
      taxTotal,
      grandTotal,
      currency: 'INR',
      status: 'Confirmed',
      paymentTerms: orderData.paymentTerms || '50% Advance + 50% Milestone',
      notes: orderData.notes || '',
      salesOwnerName: this.currentUser ? this.currentUser.name : 'Praveen G. Menon (PK)',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      deliveryTargetDate: orderData.deliveryTargetDate || new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    };

    this.orders = [newOrder, ...this.orders];
    saveToStorage(STORAGE_KEYS.ORDERS, this.orders);
    this.logAudit(
      'ORDER_CREATED',
      'Order',
      newOrder.id,
      `Created Order ${newOrder.orderNumber} for "${newOrder.clientName}" valued at ₹${newOrder.grandTotal.toLocaleString('en-IN')}`
    );
    this.notify();
    return newOrder;
  }

  public updateOrderStatus(orderId: string, status: OrderStatus): void {
    this.orders = this.orders.map((o) => (o.id === orderId ? { ...o, status, updatedAt: new Date().toISOString() } : o));
    saveToStorage(STORAGE_KEYS.ORDERS, this.orders);
    this.logAudit('ORDER_STATUS_UPDATE', 'Order', orderId, `Updated order status to ${status}`);
    this.notify();
  }

  public convertOrderToInvoice(orderId: string): Invoice {
    const order = this.orders.find((o) => o.id === orderId);
    if (!order) throw new Error('Order not found');

    const invoiceNum = `INV-2026-${String(this.invoices.length + 1).padStart(3, '0')}`;
    const newInvoice: Invoice = {
      id: `inv-${Date.now()}`,
      invoiceNumber: invoiceNum,
      clientId: order.clientId,
      clientName: order.clientName,
      amount: order.subtotal - order.discountTotal,
      tax: order.taxTotal,
      totalAmount: order.grandTotal,
      currency: order.currency,
      status: 'Sent',
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      issueDate: new Date().toISOString().split('T')[0],
      items: order.items.map((i) => ({
        description: `${i.productCode} — ${i.productName}`,
        quantity: i.quantity,
        unitPrice: i.unitPrice,
        total: i.totalPrice
      }))
    };

    this.invoices = [newInvoice, ...this.invoices];
    saveToStorage(STORAGE_KEYS.INVOICES, this.invoices);
    this.updateOrderStatus(order.id, 'In Execution');

    this.logAudit(
      'ORDER_CONVERTED_INVOICE',
      'Invoice',
      newInvoice.id,
      `Generated Invoice ${newInvoice.invoiceNumber} from Order ${order.orderNumber} for ₹${newInvoice.totalAmount.toLocaleString('en-IN')}`
    );
    this.notify();
    return newInvoice;
  }

  // Audit Log
  public logAudit(action: string, entityType: string, entityId: string, details: string): void {
    const entry: AuditLogEntry = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      actorName: this.currentUser ? `${this.currentUser.name} (${this.currentUser.role.toUpperCase()})` : 'System API',
      action,
      entityType,
      entityId,
      details
    };
    this.auditLogs = [entry, ...this.auditLogs];
    saveToStorage(STORAGE_KEYS.AUDIT_LOGS, this.auditLogs);
    this.notify();
  }

  // Duplicate Check
  public checkDuplicate(email: string, company: string): { isDuplicate: boolean; matchedLead?: Lead } {
    const matched = this.leads.find(
      (l) => l.email.toLowerCase() === email.toLowerCase() || (company && l.company.toLowerCase() === company.toLowerCase())
    );
    return { isDuplicate: !!matched, matchedLead: matched };
  }

  // Public & Manual Lead Creation
  public createLead(leadData: Partial<Lead>): Lead {
    const dupInfo = this.checkDuplicate(leadData.email || '', leadData.company || '');
    const newId = `ld-${Date.now()}`;
    const newRef = `LEAD-2026-${Math.floor(100 + Math.random() * 900)}`;

    const temperature = leadData.leadTemperature || (leadData.budgetRange?.includes('25') ? 'Hot' : 'Warm');
    const score = temperature === 'Hot' ? 90 : temperature === 'Warm' ? 70 : 45;

    const newLead: Lead = {
      id: newId,
      referenceId: newRef,
      name: leadData.name || 'Anonymous Inquiry',
      email: leadData.email || 'pending@contact.com',
      phone: leadData.phone || '',
      company: leadData.company || 'Individual / Unspecified',
      industry: leadData.industry || 'IT & Business Services',
      companySize: leadData.companySize || '10-50 employees',
      source: leadData.source || 'Website Form',
      serviceInterest: leadData.serviceInterest || 'Digital Forge',
      projectType: leadData.projectType || 'General Consulting Enquiry',
      coreGoal: leadData.coreGoal || '',
      keyRequirements: leadData.keyRequirements || '',
      existingSystems: leadData.existingSystems || '',
      timeline: leadData.timeline || '1-3 months',
      budgetRange: leadData.budgetRange || 'To be discussed',
      decisionMakers: leadData.decisionMakers || '',
      leadTemperature: temperature,
      leadScore: score,
      ownerId: leadData.ownerId || 'usr-3',
      ownerName: leadData.ownerName || 'Ananya Sharma',
      status: 'New',
      conversationTranscript: leadData.conversationTranscript || '',
      suggestedNextStep: leadData.suggestedNextStep || 'Initial discovery review',
      consent: leadData.consent ?? true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isDuplicate: dupInfo.isDuplicate
    };

    this.leads = [newLead, ...this.leads];
    saveToStorage(STORAGE_KEYS.LEADS, this.leads);

    // Auto-create Prospect Enquiry Ticket
    this.createTicket({
      title: `Prospect Enquiry: ${newLead.company} (${newLead.name})`,
      description: `Inquiry via ${newLead.source}. Goal: ${newLead.projectType}. Requirements: ${newLead.keyRequirements}`,
      linkedEntityId: newLead.id,
      linkedEntityName: `${newLead.name} (${newLead.company})`,
      linkedEntityType: 'lead',
      type: 'Prospect Enquiry',
      priority: temperature === 'Hot' ? 'Urgent' : 'High',
      assigneeId: newLead.ownerId,
      assigneeName: newLead.ownerName,
      slaBreachHours: temperature === 'Hot' ? 2 : 12,
      tags: [newLead.source, newLead.serviceInterest]
    });

    this.logAudit(
      'LEAD_CREATED',
      'Lead',
      newLead.id,
      `New Lead "${newLead.name} (${newLead.company})" created from ${newLead.source}. Duplicate: ${dupInfo.isDuplicate ? 'YES' : 'NO'}`
    );

    this.notify();
    return newLead;
  }

  // Update Lead Status
  public updateLeadStatus(id: string, status: LeadStatus): void {
    this.leads = this.leads.map((l) => (l.id === id ? { ...l, status, updatedAt: new Date().toISOString() } : l));
    saveToStorage(STORAGE_KEYS.LEADS, this.leads);
    this.logAudit('LEAD_STATUS_UPDATE', 'Lead', id, `Updated lead status to ${status}`);
    this.notify();
  }

  // Convert Lead to Client + Deal
  public convertLeadToClient(leadId: string): { client: ClientCompany; deal: Deal } {
    const lead = this.leads.find((l) => l.id === leadId);
    if (!lead) throw new Error('Lead not found');

    const clientId = `cli-${Date.now()}`;
    const dealId = `deal-${Date.now()}`;

    // Estimated deal value numeric parser
    let estimatedVal = 15000000; // default ₹15M INR
    if (lead.budgetRange.includes('25')) estimatedVal = 30000000;
    if (lead.budgetRange.includes('8')) estimatedVal = 10000000;

    const newClient: ClientCompany = {
      id: clientId,
      name: lead.company,
      industry: lead.industry,
      website: `https://${lead.company.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`,
      address: 'Corporate Headquarters',
      lifecycleStage: 'Active',
      tags: ['Converted Lead', lead.serviceInterest],
      ownerId: lead.ownerId,
      ownerName: lead.ownerName,
      contacts: [
        {
          id: `cnt-${Date.now()}`,
          name: lead.name,
          title: 'Primary Contact / Executive Decision Maker',
          email: lead.email,
          phone: lead.phone,
          isPrimary: true
        }
      ],
      totalDealsValue: estimatedVal,
      activeProjectsCount: 1,
      createdAt: new Date().toISOString()
    };

    const newDeal: Deal = {
      id: dealId,
      title: `${lead.company} — ${lead.projectType}`,
      clientId: newClient.id,
      clientName: newClient.name,
      leadId: lead.id,
      value: estimatedVal,
      currency: 'INR',
      stage: 'Proposal Sent',
      probability: 75,
      expectedCloseDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      serviceLine: lead.serviceInterest,
      ownerId: lead.ownerId,
      ownerName: lead.ownerName,
      createdAt: new Date().toISOString()
    };

    // Mark Lead as Won
    this.updateLeadStatus(lead.id, 'Won');

    this.clients = [newClient, ...this.clients];
    this.deals = [newDeal, ...this.deals];

    saveToStorage(STORAGE_KEYS.CLIENTS, this.clients);
    saveToStorage(STORAGE_KEYS.DEALS, this.deals);

    this.logAudit(
      'LEAD_CONVERTED',
      'Client',
      newClient.id,
      `Converted Lead "${lead.name} (${lead.company})" to Client and Deal "${newDeal.title}" valued at ₹${estimatedVal.toLocaleString('en-IN')}`
    );

    this.notify();
    return { client: newClient, deal: newDeal };
  }

  // Deals Kanban Drag & Drop
  public updateDealStage(id: string, newStage: DealStage, winLossReason?: string): void {
    this.deals = this.deals.map((d) => {
      if (d.id === id) {
        let prob = d.probability;
        if (newStage === 'Qualification') prob = 20;
        if (newStage === 'Discovery') prob = 40;
        if (newStage === 'Proposal Sent') prob = 70;
        if (newStage === 'Negotiation') prob = 85;
        if (newStage === 'Closed Won') prob = 100;
        if (newStage === 'Closed Lost') prob = 0;

        return { ...d, stage: newStage, probability: prob, winLossReason: winLossReason || d.winLossReason };
      }
      return d;
    });

    saveToStorage(STORAGE_KEYS.DEALS, this.deals);
    this.logAudit('DEAL_STAGE_UPDATE', 'Deal', id, `Moved deal stage to ${newStage}${winLossReason ? ` (Reason: ${winLossReason})` : ''}`);
    this.notify();
  }

  // Create Ticket
  public createTicket(ticketData: Partial<Ticket>): Ticket {
    const count = this.tickets.length + 1;
    const ticketNum = `PSE-${String(count).padStart(4, '0')}`;
    const newId = `tkt-${Date.now()}`;

    const newTicket: Ticket = {
      id: newId,
      ticketNumber: ticketNum,
      title: ticketData.title || 'New Inquiry Ticket',
      description: ticketData.description || '',
      linkedEntityId: ticketData.linkedEntityId,
      linkedEntityName: ticketData.linkedEntityName,
      linkedEntityType: ticketData.linkedEntityType || 'lead',
      type: ticketData.type || 'Prospect Enquiry',
      priority: ticketData.priority || 'Medium',
      status: 'Open',
      assigneeId: ticketData.assigneeId || 'usr-3',
      assigneeName: ticketData.assigneeName || 'Ananya Sharma',
      dueDate: ticketData.dueDate || new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      slaBreachHours: ticketData.slaBreachHours || 12,
      isSlaBreached: false,
      tags: ticketData.tags || ['Enquiry'],
      comments: [
        {
          id: `cm-${Date.now()}`,
          ticketId: newId,
          authorName: 'Phoenix System Engine',
          authorRole: 'admin',
          text: `Ticket ${ticketNum} logged. Priority ${ticketData.priority || 'Medium'}. SLA Timer active.`,
          isInternal: true,
          createdAt: new Date().toISOString()
        }
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.tickets = [newTicket, ...this.tickets];
    saveToStorage(STORAGE_KEYS.TICKETS, this.tickets);
    this.logAudit('TICKET_CREATED', 'Ticket', newTicket.id, `Ticket ${newTicket.ticketNumber} "${newTicket.title}" created with priority ${newTicket.priority}`);
    this.notify();
    return newTicket;
  }

  // Add Comment to Ticket
  public addTicketComment(ticketId: string, text: string, isInternal: boolean): void {
    const author = this.currentUser ? this.currentUser.name : 'Ember Concierge';
    const role = this.currentUser ? this.currentUser.role : 'support';

    const comment: TicketComment = {
      id: `cm-${Date.now()}`,
      ticketId,
      authorName: author,
      authorRole: role,
      text,
      isInternal,
      createdAt: new Date().toISOString()
    };

    this.tickets = this.tickets.map((t) => {
      if (t.id === ticketId) {
        return {
          ...t,
          comments: [...t.comments, comment],
          updatedAt: new Date().toISOString()
        };
      }
      return t;
    });

    saveToStorage(STORAGE_KEYS.TICKETS, this.tickets);
    this.logAudit('TICKET_COMMENT', 'Ticket', ticketId, `Added ${isInternal ? 'internal note' : 'customer response'} to ticket`);
    this.notify();
  }

  // Update Ticket Status
  public updateTicketStatus(ticketId: string, status: TicketStatus): void {
    this.tickets = this.tickets.map((t) => (t.id === ticketId ? { ...t, status, updatedAt: new Date().toISOString() } : t));
    saveToStorage(STORAGE_KEYS.TICKETS, this.tickets);
    this.logAudit('TICKET_STATUS', 'Ticket', ticketId, `Updated ticket status to ${status}`);
    this.notify();
  }

  // Global Search across Leads, Clients, Deals, Tickets
  public globalSearch(query: string): {
    leads: Lead[];
    clients: ClientCompany[];
    deals: Deal[];
    tickets: Ticket[];
  } {
    const q = query.toLowerCase().trim();
    if (!q) return { leads: [], clients: [], deals: [], tickets: [] };

    return {
      leads: this.leads.filter((l) => l.name.toLowerCase().includes(q) || l.company.toLowerCase().includes(q) || l.email.toLowerCase().includes(q) || l.referenceId.toLowerCase().includes(q)),
      clients: this.clients.filter((c) => c.name.toLowerCase().includes(q) || c.industry.toLowerCase().includes(q)),
      deals: this.deals.filter((d) => d.title.toLowerCase().includes(q) || d.clientName.toLowerCase().includes(q)),
      tickets: this.tickets.filter((t) => t.ticketNumber.toLowerCase().includes(q) || t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q))
    };
  }

  // Export Leads to CSV
  public exportLeadsCsv(): void {
    const headers = ['Reference ID', 'Name', 'Email', 'Phone', 'Company', 'Industry', 'Service Interest', 'Lead Temperature', 'Status', 'Budget Range', 'Created At'];
    const rows = this.leads.map((l) => [
      l.referenceId,
      `"${l.name}"`,
      l.email,
      l.phone,
      `"${l.company}"`,
      `"${l.industry}"`,
      `"${l.serviceInterest}"`,
      l.leadTemperature,
      l.status,
      `"${l.budgetRange}"`,
      l.createdAt
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Phoenix_Leads_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

// Singleton Store Instance
export const crmStore = new CrmStore();
