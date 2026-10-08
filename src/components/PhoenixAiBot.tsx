import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Flame, Sparkles, ShieldCheck, Globe } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  groundingSources?: { title: string; url: string }[];
}

interface PhoenixAiBotProps {
  onOpenAdmin?: () => void;
}

export const PhoenixAiBot: React.FC<PhoenixAiBotProps> = ({ onOpenAdmin }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      text: "Welcome to Phoenix Solutions! 🔥 I'm Ember, your AI strategy concierge. We help businesses turn complexity into clarity across technology, growth and performance. What brings you here today: a new website or application, growing your business, sharpening your marketing, or something else?",
      sender: 'bot',
    },
  ]);
  const [inputValue, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the latest message
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userText = inputValue.trim();
    setInput('');
    setError('');

    // Append user message
    const userMsgId = 'msg_user_' + Date.now();
    const updatedMessages: Message[] = [...messages, { id: userMsgId, text: userText, sender: 'user' }];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText, history: updatedMessages }),
      });

      if (!response.ok) {
        throw new Error('Server returned an error');
      }

      const data = await response.json();
      const botText = data.response || 'Apologies. I am currently reconciling systems. Please try again.';
      const sources = data.groundingSources || [];

      setMessages((prev) => [
        ...prev,
        {
          id: 'msg_bot_' + Date.now(),
          text: botText,
          sender: 'bot',
          groundingSources: sources,
        },
      ]);
    } catch (err) {
      console.error('Chat bot error:', err);
      setError('System connection timeout. Please resend.');
      setMessages((prev) => [
        ...prev,
        {
          id: 'msg_err_' + Date.now(),
          text: 'Reconciliation error. I am unable to contact Ember. Please check your connection.',
          sender: 'bot',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 text-left select-none flex items-center gap-2" aria-live="polite">
      {/* Hidden Admin/CMS Trigger right next to the chat bot */}
      {onOpenAdmin && (
        <button
          type="button"
          onClick={onOpenAdmin}
          className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/40 border border-white/30 text-[#0077b6]/30 hover:text-[#0077b6]/70 flex items-center justify-center cursor-pointer transition-all duration-200 focus-visible:outline-2 focus-visible:outline-[#0077b6] shadow-xs"
          title="Secure Strategic Governance"
          aria-label="Secure Strategic Governance"
        >
          <ShieldCheck className="w-4 h-4" />
        </button>
      )}

      {/* Floating Trigger Button */}
      <motion.button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#034078] via-[#0077b6] to-[#00b4d8] text-white flex items-center justify-center shadow-[0_8px_32px_rgba(3,64,120,0.35)] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0077b6]"
        aria-label={isOpen ? 'Close Phoenix AI Assistant' : 'Open Phoenix AI Assistant'}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="relative"
            >
              <Flame className="w-6 h-6 text-white animate-pulse" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full border border-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Glassmorphic Chat Widget Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="absolute bottom-18 right-0 w-[350px] sm:w-[400px] h-[500px] rounded-2xl border border-[#0077b6]/25 bg-white/95 backdrop-blur-md shadow-[0_16px_50px_rgba(3,64,120,0.18)] flex flex-col overflow-hidden"
          >
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-[#034078] to-[#0077b6] p-4 text-white flex items-center justify-between shadow-[0_2px_12px_rgba(3,64,120,0.1)]">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-white/10 flex items-center justify-center">
                  <Flame className="w-5 h-5 text-white animate-pulse" />
                </div>
                <div>
                  <h4 className="font-serif-display text-sm font-extrabold tracking-wide uppercase leading-tight">
                    Ember · Strategy Concierge
                  </h4>
                  <p className="text-[10px] text-white/70 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
                    Warm · Sharp · Commercially Minded
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors cursor-pointer"
                aria-label="Close Chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Stream Container - Copy protected explicitly */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gradient-to-b from-[#f6fbff]/30 to-white/10 select-none pointer-events-auto">
              {messages.map((msg) => {
                const isBot = msg.sender === 'bot';
                return (
                  <div
                    key={msg.id}
                    className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed font-medium shadow-sm ${
                        isBot
                          ? 'bg-[#f0f8ff] border border-[#0077b6]/10 text-[#042440] rounded-tl-none'
                          : 'bg-gradient-to-br from-[#034078] to-[#0077b6] text-white rounded-tr-none'
                      }`}
                      style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
                    >
                      <p className="whitespace-pre-line">{msg.text}</p>

                      {isBot && msg.groundingSources && msg.groundingSources.length > 0 && (
                        <div className="mt-2.5 pt-2 border-t border-[#0077b6]/15 text-[10px] space-y-1">
                          <span className="font-mono text-[#0077b6] font-bold flex items-center gap-1">
                            <Globe className="w-3 h-3 text-[#00b4d8]" />
                            <span>Verified Market Sources:</span>
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {msg.groundingSources.slice(0, 3).map((src, idx) => (
                              <a
                                key={idx}
                                href={src.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#0077b6] bg-white border border-[#0077b6]/25 px-1.5 py-0.5 rounded hover:underline truncate max-w-[180px] block"
                                title={src.title}
                              >
                                {src.title}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-[#f0f8ff] border border-[#0077b6]/10 rounded-2xl rounded-tl-none px-4 py-3 text-xs text-[#042440] font-medium shadow-sm flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#00b4d8] animate-spin" />
                    <span>Processing strategic response...</span>
                  </div>
                </div>
              )}

              {error && (
                <p className="text-[10px] text-rose-500 font-bold text-center">
                  ⚠️ {error}
                </p>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Typing Inputs - Typing is enabled explicitly so form typing works perfectly */}
            <form
              onSubmit={handleSend}
              className="p-3 border-t border-[#0077b6]/15 bg-white flex gap-2 items-center"
            >
              <input
                type="text"
                required
                value={inputValue}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about IT strategy, Content marketing..."
                className="flex-1 px-3.5 py-2.5 text-xs rounded-xl border border-[#0077b6]/25 bg-white/70 focus:outline-none focus:ring-2 focus:ring-[#0077b6]/40 focus:border-[#0077b6] text-[#011627] placeholder:text-[#a0aec0] pointer-events-auto"
                style={{ userSelect: 'text', WebkitUserSelect: 'text' }}
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="w-9 h-9 rounded-xl bg-[#0077b6] text-white flex items-center justify-center shrink-0 cursor-pointer disabled:opacity-40 transition-opacity pointer-events-auto"
                aria-label="Send Query"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
