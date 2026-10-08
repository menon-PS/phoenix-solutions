import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Bot,
  User,
  Send,
  Sparkles,
  CheckCircle2,
  Brain,
  Download,
  Activity,
  Layers,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react';
import {
  ServiceCategory,
  ChatMessage,
  RequirementBrief,
  BotAnalyticsSession,
  QuickReply,
} from './types';
import {
  createInitialSession,
  getInitialBotMessage,
  INITIAL_PROBING_QUESTIONS,
  generateStructuredBriefFromHistory,
} from './serviceProbingEngine';
import { probeServiceRequirements } from './botClient';

export const ServiceRequirementProbingBot: React.FC = () => {
  const [session, setSession] = useState<BotAnalyticsSession>(createInitialSession());
  const [messages, setMessages] = useState<ChatMessage[]>([getInitialBotMessage()]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | null>(null);
  const [activeBrief, setActiveBrief] = useState<RequirementBrief | null>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSelectCategory = async (category: ServiceCategory) => {
    setSelectedCategory(category);
    const updatedSession = { ...session, selectedCategory: category, probingStage: 'technical_depth' as const };
    setSession(updatedSession);

    const userCategoryMsg: ChatMessage = {
      id: `msg_usr_${Date.now()}`,
      sender: 'user',
      text: `Selected Category: ${category.toUpperCase()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const firstQuestions = INITIAL_PROBING_QUESTIONS[category];
    const initialQuestion = firstQuestions ? firstQuestions[0] : 'What core operational bottleneck are you aiming to solve?';

    const botProbeMsg: ChatMessage = {
      id: `msg_bot_${Date.now()}`,
      sender: 'bot',
      text: `Excellent. Focusing on **${category.toUpperCase()}**.\n\n${initialQuestion}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      stage: 'technical_depth',
      quickReplies: [
        { label: 'System Monolith Bottleneck', value: 'Legacy spreadsheet and database fragmentation' },
        { label: 'Sales & Alliances Gap', value: 'Co-selling outreach and RFP proposal engineering' },
        { label: 'Brand & GEO Authority Goal', value: 'AI Overview citations and LinkedIn positioning' },
      ],
    };

    const updatedMessages = [...messages, userCategoryMsg, botProbeMsg];
    setMessages(updatedMessages);

    // Initial Brief Generation
    const brief = generateStructuredBriefFromHistory(updatedSession, updatedMessages);
    setActiveBrief(brief);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const messageContent = textToSend || inputText;
    if (!messageContent.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg_usr_${Date.now()}`,
      sender: 'user',
      text: messageContent,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInputText('');
    setIsTyping(true);

    // Call Independent LLM Backend Route
    const categoryToUse = selectedCategory || 'it-solutions';
    const llmResult = await probeServiceRequirements(categoryToUse, messageContent, newMessages);

    setIsTyping(false);

    const botReplyMsg: ChatMessage = {
      id: `msg_bot_${Date.now()}`,
      sender: 'bot',
      text: llmResult.botReply,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      quickReplies: llmResult.suggestedQuickReplies?.map((reply) => ({
        label: reply,
        value: reply,
      })),
    };

    const updatedHistory = [...newMessages, botReplyMsg];
    setMessages(updatedHistory);

    // Update session analytics and active brief
    const updatedSession: BotAnalyticsSession = {
      ...session,
      updatedAt: new Date().toISOString(),
      messagesCount: updatedHistory.length,
      userEngagementScore: Math.min(session.userEngagementScore + 15, 100),
      isCompleted: updatedHistory.length > 5,
    };
    setSession(updatedSession);

    const brief = generateStructuredBriefFromHistory(updatedSession, updatedHistory);
    if (llmResult.readinessScore) {
      brief.readinessScore = llmResult.readinessScore;
    }
    setActiveBrief(brief);
  };

  const handleQuickReplyClick = (reply: QuickReply) => {
    if (reply.categoryHint && !selectedCategory) {
      handleSelectCategory(reply.categoryHint);
    } else {
      handleSendMessage(reply.value);
    }
  };

  const handleExportBriefJson = () => {
    if (!activeBrief) return;
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(activeBrief, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `Phoenix_Requirement_Brief_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleReset = () => {
    setSession(createInitialSession());
    setMessages([getInitialBotMessage()]);
    setSelectedCategory(null);
    setActiveBrief(null);
    setInputText('');
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-[#041a2f] text-white rounded-2xl border border-[#0077b6]/30 shadow-2xl space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-[#0077b6]/25">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00b4d8] to-[#034078] flex items-center justify-center shadow-lg border border-[#00b4d8]/40">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#00b4d8] bg-[#0077b6]/20 px-2 py-0.5 rounded">
                Robust LLM Engine · Gemini 3 Pro
              </span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </div>
            <h2 className="font-serif-display text-xl sm:text-2xl font-bold text-white">
              AI Service Requirement Intelligence Module
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleReset}
            className="px-3 py-1.5 text-xs font-mono text-slate-300 hover:text-white bg-[#032340] border border-[#0077b6]/30 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Session</span>
          </button>

          {activeBrief && (
            <button
              type="button"
              onClick={handleExportBriefJson}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-[#0077b6] to-[#00b4d8] rounded-lg flex items-center gap-1.5 shadow-sm transition-all cursor-pointer hover:opacity-90"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Brief (.JSON)</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Grid: Left Chat Stream | Right Brief & Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Chat Conversation Stream */}
        <div className="lg:col-span-7 flex flex-col h-[520px] bg-[#021326] border border-[#0077b6]/20 rounded-xl overflow-hidden shadow-inner">
          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-8 h-8 rounded-lg bg-[#0077b6] flex items-center justify-center text-white shrink-0 mt-1">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#0077b6] text-white rounded-tr-none'
                      : 'bg-[#042440] border border-[#0077b6]/30 text-slate-100 rounded-tl-none shadow-sm'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                  <span className="block text-[10px] font-mono text-slate-400 mt-2 text-right">
                    {msg.timestamp}
                  </span>

                  {/* Quick Replies */}
                  {msg.quickReplies && msg.quickReplies.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-[#0077b6]/20 flex flex-wrap gap-2">
                      {msg.quickReplies.map((qr, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleQuickReplyClick(qr)}
                          className="px-2.5 py-1 text-xs font-medium rounded-lg bg-[#0077b6]/20 hover:bg-[#0077b6] text-[#00b4d8] hover:text-white border border-[#0077b6]/40 transition-all cursor-pointer"
                        >
                          {qr.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {msg.sender === 'user' && (
                  <div className="w-8 h-8 rounded-lg bg-[#00b4d8] flex items-center justify-center text-white shrink-0 mt-1">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </motion.div>
            ))}

            {isTyping && (
              <div className="flex gap-2 items-center text-xs font-mono text-[#00b4d8] p-2">
                <Sparkles className="w-4 h-4 animate-spin" />
                <span>Independent Gemini Pro LLM is analyzing requirements...</span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Controls */}
          <div className="p-3 bg-[#031d38] border-t border-[#0077b6]/25 flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your operational or technical requirement details..."
              className="flex-1 bg-[#021326] border border-[#0077b6]/30 rounded-lg px-3 py-2 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#00b4d8]"
            />
            <button
              type="button"
              onClick={() => handleSendMessage()}
              className="p-2.5 rounded-lg bg-gradient-to-r from-[#0077b6] to-[#00b4d8] text-white hover:opacity-90 transition-all cursor-pointer shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Column: Dynamic Requirement Brief Card & Analytics Meter */}
        <div className="lg:col-span-5 space-y-4">
          {/* Readiness Score Card */}
          <div className="p-4 bg-[#032340] border border-[#0077b6]/30 rounded-xl space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-slate-300">
              <span className="flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-[#00b4d8]" />
                <span>REQUIREMENT READINESS SCORE</span>
              </span>
              <span className="font-bold text-[#00b4d8]">{activeBrief?.readinessScore || 20}%</span>
            </div>

            {/* Score Bar */}
            <div className="w-full h-2.5 bg-[#021326] rounded-full overflow-hidden border border-[#0077b6]/20">
              <div
                className="h-full bg-gradient-to-r from-[#0077b6] via-[#00b4d8] to-emerald-400 transition-all duration-500 rounded-full"
                style={{ width: `${activeBrief?.readinessScore || 20}%` }}
              />
            </div>

            <p className="text-[11px] text-slate-300 leading-normal">
              Score reflects completeness of technical stack details, bottleneck clarity, and timeline expectations.
            </p>
          </div>

          {/* Structured Brief Summary */}
          {activeBrief ? (
            <div className="p-5 bg-[#032340] border border-[#0077b6]/35 rounded-xl space-y-4 shadow-lg">
              <div className="flex items-center justify-between border-b border-[#0077b6]/20 pb-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <h3 className="font-serif-display font-semibold text-sm text-white">
                    Generated Consulting Brief
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
                  {activeBrief.priorityLevel}
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-slate-400 font-mono block text-[10px] uppercase">Primary Domain</span>
                  <span className="font-semibold text-[#00b4d8]">{activeBrief.primaryDomain}</span>
                </div>

                <div>
                  <span className="text-slate-400 font-mono block text-[10px] uppercase">Core Bottleneck Identified</span>
                  <p className="text-slate-200 mt-0.5 leading-snug">{activeBrief.coreBottleneck}</p>
                </div>

                <div>
                  <span className="text-slate-400 font-mono block text-[10px] uppercase">Recommended Lead Advisor</span>
                  <span className="font-medium text-amber-400">{activeBrief.suggestedLeadAdvisor}</span>
                </div>

                <div>
                  <span className="text-slate-400 font-mono block text-[10px] uppercase mb-1">Actionable Next Steps</span>
                  <ul className="space-y-1 text-slate-300">
                    {activeBrief.actionableNextSteps.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#00b4d8] shrink-0 mt-0.5" />
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 bg-[#032340] border border-[#0077b6]/20 rounded-xl text-center space-y-3 text-slate-400">
              <Layers className="w-8 h-8 text-[#0077b6] mx-auto opacity-60" />
              <p className="text-xs">
                Select a practice category in the conversation stream to start building your structured consultation brief.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
