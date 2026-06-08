import { useState, useEffect, useRef, FormEvent } from "react";
import { 
  MessageSquare, Send, X, ArrowDown, ChevronDown, ChevronLeft, Check, 
  Sparkles, Phone, Mail, UserCheck, ShieldCheck, MapPin, Calendar, Building, Landmark, Loader2 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: Date;
  inputType?: "form" | "none";
}

export default function ConciergeChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial-1",
      sender: "bot",
      text: "Welcome to physical space curations. I am Solomon, Director of Acquisitions & Client Care at Jenboro Real Estate.",
      timestamp: new Date(),
    },
    {
      id: "initial-2",
      sender: "bot",
      text: "How may we coordinate your architectural ambitions today? Select a pathway below for discreet assistance.",
      timestamp: new Date(),
    },
  ]);
  
  const [isTyping, setIsTyping] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [showQuickOptions, setShowQuickOptions] = useState(true);
  const [clientForm, setClientForm] = useState({
    name: "",
    phone: "",
    email: "",
    location: "Bole",
    notes: ""
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeFormType, setActiveFormType] = useState<string | null>(null);
  const [hasNewMessage, setHasNewMessage] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  useEffect(() => {
    // Show user a subtle attention-getter after 4 seconds only if chat is closed
    if (!isOpen) {
      const timer = setTimeout(() => {
        setHasNewMessage(true);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const quickOptions = [
    { label: "🔑 Inquire about buying a Property", id: "buy" },
    { label: "🖋️ Book an off-market Tour", id: "tour" },
    { label: "💼 Request asset appraisal/listing", id: "sell" },
    { label: "🏢 Diplomatic / Ambassador housing", id: "diplomat" }
  ];

  const handleOptionSelect = (optionLabel: string, optionId: string) => {
    // Add user message
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: optionLabel,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMsg]);
    setShowQuickOptions(false);
    setIsTyping(true);
    setActiveFormType(optionId);

    setTimeout(() => {
      setIsTyping(false);
      let replyText = "";
      
      switch(optionId) {
        case "buy":
          replyText = "An elegant selection. Our off-market registry houses bespoke villas, design landmarks, and modern vertical penthouses across Addis Ababa's diplomatic zones. Please specify your coordinates underneath so we can coordinate a tailored portfolio briefing.";
          break;
        case "tour":
          replyText = "We orchestrate private, high-security tours with premium transportation. Kindly disclose your availability and contact nodes below to lock in an authoritative reservation slot.";
          break;
        case "sell":
          replyText = "Our divesting services represent assets with absolute editorial precision. To evaluate your holding under complete discretion, please complete the client manifest below.";
          break;
        case "diplomat":
          replyText = "We represent preferred leaseholds vetted to the highest security parameters of multilateral agencies and foreign embassies. Kindly share your space requirements below so our ambassadorial department can deliver fitments immediately.";
          break;
        default:
          replyText = "To connect you with the appropriate equity partner, please verify your details inside this contact ticket.";
      }

      setMessages(prev => [
        ...prev, 
        {
          id: `bot-reply-${Date.now()}`,
          sender: "bot",
          text: replyText,
          timestamp: new Date()
        },
        {
          id: `bot-form-${Date.now()}`,
          sender: "bot",
          text: "",
          timestamp: new Date(),
          inputType: "form"
        }
      ]);
    }, 1200);
  };

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const userMsg: Message = {
      id: `user-custom-${Date.now()}`,
      sender: "user",
      text: userInput,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setUserInput("");
    setIsTyping(true);

    const isPersonal = /personal|contact|whatsapp|phone|email/i.test(userInput);

    setTimeout(() => {
      setIsTyping(false);
      const newMessages: Message[] = [
        {
          id: `bot-custom-reply-${Date.now()}`,
          sender: "bot",
          text: "I have registered your special considerations. Let us secure a reliable connection channel. Please formalize your coordinate manifest below so our elite brokerage desks can deliver immediate solutions.",
          timestamp: new Date()
        },
        {
          id: `bot-custom-form-${Date.now()}`,
          sender: "bot",
          text: "",
          timestamp: new Date(),
          inputType: "form"
        }
      ];
      if (isPersonal) {
        newMessages.push({
          id: `bot-whatsapp-${Date.now()}`,
          sender: "bot",
          // WhatsApp link with placeholder number; user can replace with actual number later
          text: "For personal inquiries you can reach us via WhatsApp: https://wa.me/1234567890 (click to chat)",
          timestamp: new Date()
        });
      }
      setMessages(prev => [...prev, ...newMessages]);
    }, 1200);
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!clientForm.name || !clientForm.phone || !clientForm.email) {
      alert("Kindly fill out your identity credentials so we can reach you securely.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
      
      const successMsg: Message = {
        id: `bot-success-${Date.now()}`,
        sender: "bot",
        text: `Manifest verified. Thank you, ${clientForm.name}. Solomon or an equity partner will contact you at ${clientForm.phone} or via ${clientForm.email} within 2 hours to coordinate your request.`,
        timestamp: new Date()
      };

      setMessages(prev => [
        ...prev.filter(m => m.inputType !== "form"), // remove form message
        successMsg
      ]);
    }, 1000);
  };

  // Return to initial quick options (first questions)
  const handleBackToStart = () => {
    setShowQuickOptions(true);
  };

  return (
    <>
      {/* Floating Chat Bubble widget */}
      <div className="fixed bottom-6 right-6 z-50 select-none">
        <button
          id="chat-concierge-trigger"
          onClick={() => {
            setIsOpen(!isOpen);
            setHasNewMessage(false);
          }}
          className="relative w-14 h-14 bg-brand-navy border border-brand-orange/40 text-[#FAFAF8] shadow-2xl flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95 group focus:outline-none"
        >
          {/* Subtle golden halo glow effect if new activity */}
          {hasNewMessage && (
            <span className="absolute -inset-1.5 bg-brand-orange/35 rounded-none animate-ping duration-1000"></span>
          )}

          {isOpen ? (
            <X className="w-6 h-6 text-brand-orange" />
          ) : (
            <div className="relative">
              <MessageSquare className="w-6 h-6 text-[#FAFAF8] group-hover:text-brand-orange transition-colors duration-200" />
              {hasNewMessage && (
                <span className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-brand-orange border border-brand-navy rounded-none"></span>
              )}
            </div>
          )}
        </button>

        {/* Small floating chat badge alert */}
        {hasNewMessage && !isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="absolute bottom-16 right-0 w-64 bg-brand-navy border border-brand-orange/30 p-3 shadow-2xl space-y-1"
            id="chat-teaser-bubble"
          >
            <div className="flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 bg-brand-orange rounded-none animate-pulse"></span>
              <span className="font-sans text-[10px] tracking-widest text-brand-orange uppercase font-bold">
                Solomon &middot; Concierge
              </span>
            </div>
            <p className="font-sans text-xs text-white/90 leading-tight">
              "How may we coordinate your acquisition or rental desires today?"
            </p>
          </motion.div>
        )}
      </div>

      {/* Floating Concierge Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="chat-concierge-panel"
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.96 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="fixed bottom-24 right-4 sm:right-6 w-[92vw] sm:w-[410px] max-h-[80vh] h-[550px] bg-brand-navy border border-brand-navy-light/60 shadow-2xl flex flex-col z-50 text-white"
          >
            {/* Header: Concierge Card Profile */}
            <div className="p-4 bg-brand-navy border-b border-white/[0.06] flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative w-10 h-10 border border-brand-orange/50 flex items-center justify-center bg-brand-navy-light text-brand-orange">
                  <Landmark className="w-5 h-5" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border border-brand-navy rounded-none"></span>
                </div>
                <div className="text-left">
                  <h4 className="font-serif text-sm font-semibold tracking-wide text-white flex items-center space-x-1.5">
                    <span>Solomon Kebede</span>
                    <Sparkles className="w-3 h-3 text-brand-orange animate-pulse" />
                  </h4>
                  <p className="font-sans text-[10px] tracking-wider text-brand-orange/80 uppercase font-bold">
                    Acquisitions Director
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-[10px] text-slate-400 bg-white/5 px-2 py-0.5 font-sans">
                  Active Security
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                  aria-label="Minimize Chat"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
                <button
                  onClick={handleBackToStart}
                  className="p-1 ml-2 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                  aria-label="Back to First Questions"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Conversation Core Flow Area with Custom Scrollbar */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs font-sans">
              <div className="text-center py-2">
                <span className="text-[9px] tracking-widest text-slate-500 uppercase bg-brand-navy-light/40 px-2.5 py-1">
                  Private Session Securely Rooted
                </span>
              </div>

              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"} space-y-1`}
                >
                  {/* Sender title label */}
                  <span className="text-[9px] text-slate-400 px-1 font-mono">
                    {msg.sender === "user" ? "Client" : "Solomon"} &middot; {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>

                  {/* Render content */}
                  {msg.inputType === "form" ? (
                    <div className="w-full bg-[#132A4A] border border-brand-orange/20 p-4 space-y-3.5 text-left text-white shadow-xl">
                      <div className="border-b border-white/[0.08] pb-1.5">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-brand-orange flex items-center space-x-1">
                          <UserCheck className="w-3.5 h-3.5" />
                          <span>Client Admission Ticket</span>
                        </span>
                      </div>

                      <form onSubmit={handleFormSubmit} className="space-y-3">
                        <div className="space-y-1">
                          <label className="text-[9px] uppercase tracking-widest text-slate-400 font-semibold block">Full Identity</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Admiral / Hon. Ambassador"
                            value={clientForm.name}
                            onChange={(e) => setClientForm(prev => ({ ...prev, name: e.target.value }))}
                            className="w-full bg-[#091A30] border border-white/10 py-1.5 px-2.5 text-xs focus:outline-none focus:border-brand-orange text-white"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <label className="text-[9px] uppercase tracking-widest text-slate-400 font-semibold block">Secure Mobile</label>
                            <input
                              type="tel"
                              required
                              placeholder="+251 91..."
                              value={clientForm.phone}
                              onChange={(e) => setClientForm(prev => ({ ...prev, phone: e.target.value }))}
                              className="w-full bg-[#091A30] border border-white/10 py-1.5 px-2.5 text-xs focus:outline-none focus:border-brand-orange text-white"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[9px] uppercase tracking-widest text-slate-400 font-semibold block">Email Channel</label>
                            <input
                              type="email"
                              required
                              placeholder="client@domain.com"
                              value={clientForm.email}
                              onChange={(e) => setClientForm(prev => ({ ...prev, email: e.target.value }))}
                              className="w-full bg-[#091A30] border border-white/10 py-1.5 px-2.5 text-xs focus:outline-none focus:border-brand-orange text-white"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <label className="text-[9px] uppercase tracking-widest text-slate-400 font-semibold block">Primary Zone</label>
                            <select
                              value={clientForm.location}
                              onChange={(e) => setClientForm(prev => ({ ...prev, location: e.target.value }))}
                              className="w-full bg-[#091A30] border border-white/10 p-1.5 text-xs focus:outline-none focus:border-brand-orange text-white appearance-none"
                            >
                              <option value="Bole">Bole Estate</option>
                              <option value="Old Airport">Old Airport Diplomatic</option>
                              <option value="Kazanchis">Kazanchis Business</option>
                              <option value="Entoto Hills">Highland Retreats</option>
                            </select>
                          </div>
                          <div className="space-y-1">
                            <label className="text-[9px] uppercase tracking-widest text-slate-400 font-semibold block">Urgency Timeline</label>
                            <select
                              className="w-full bg-[#091A30] border border-white/10 p-1.5 text-xs focus:outline-none focus:border-brand-orange text-white"
                            >
                              <option>Immediate Acquisition</option>
                              <option>Within 30 Days</option>
                              <option>Strategic Watchlist</option>
                            </select>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[9px] uppercase tracking-widest text-slate-400 font-semibold block">Special Specifications / Requests</label>
                          <textarea
                            rows={2}
                            placeholder="e.g. Bulletproof glazing, 500sqm showroom..."
                            value={clientForm.notes}
                            onChange={(e) => setClientForm(prev => ({ ...prev, notes: e.target.value }))}
                            className="w-full bg-[#091A30] border border-white/10 py-1.5 px-2.5 text-xs focus:outline-none focus:border-brand-orange text-white resize-none"
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full py-2 bg-brand-orange text-white font-bold tracking-widest uppercase text-[10px] hover:bg-brand-orange/95 cursor-pointer disabled:opacity-55 flex items-center justify-center space-x-2"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              <span>ENCRYPTING TICKET...</span>
                            </>
                          ) : (
                            <>
                              <ShieldCheck className="w-3.5 h-3.5 text-[#FDEBD0]" />
                              <span>SUBMIT PRIVATE MANIFEST</span>
                            </>
                          )}
                        </button>
                      </form>
                    </div>
                  ) : (
                    <div
                      className={`p-3 max-w-[85%] text-left leading-relaxed ${
                        msg.sender === "user"
                          ? "bg-brand-orange text-[#FAFAF8] rounded-none border border-brand-orange-light/10"
                          : "bg-[#132A4A] border border-white/[0.04] text-white/95"
                      }`}
                    >
                      {msg.text}
                    </div>
                  )}
                </div>
              ))}

              {/* Bot typing simulation */}
              {isTyping && (
                <div className="flex flex-col items-start space-y-1">
                  <span className="text-[9px] text-slate-400 px-1 font-mono">
                    Solomon is typing...
                  </span>
                  <div className="bg-[#132A4A] p-3 text-slate-400 flex items-center space-x-1.5">
                    <span className="w-1.5 h-1.5 bg-brand-orange rounded-none animate-bounce delay-100"></span>
                    <span className="w-1.5 h-1.5 bg-brand-orange rounded-none animate-bounce delay-200"></span>
                    <span className="w-1.5 h-1.5 bg-brand-orange rounded-none animate-bounce delay-300"></span>
                  </div>
                </div>
              )}

              {/* Quick option path buttons if state supports */}
              {showQuickOptions && !isTyping && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-2 pt-2"
                  id="chat-quick-options"
                >
                  <p className="text-[9px] text-slate-500 uppercase tracking-widest font-bold text-left px-1">
                    Select Curated Pathway:
                  </p>
                  <div className="flex flex-col space-y-1.5">
                    {quickOptions.map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => handleOptionSelect(opt.label, opt.id)}
                        className="w-full text-left p-2.5 bg-[#1C3B61]/60 border border-white/[0.05] hover:bg-brand-navy-light text-slate-200 hover:text-brand-orange transition-all duration-200 text-xs font-medium focus:outline-none"
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Custom Manual Send Form (Footer segment) */}
            <form
              onSubmit={handleSendMessage}
              className="p-3 bg-[#0A1A30] border-t border-white/[0.06] flex items-center space-x-2"
              id="concierge-manual-input-form"
            >
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Submit custom questions / constraints..."
                className="flex-1 bg-brand-navy border border-white/10 text-xs py-2 px-3 text-white focus:outline-none focus:border-brand-orange placeholder:text-slate-500"
              />
              <button
                type="submit"
                className="p-2 bg-brand-navy-light border border-white/10 hover:bg-brand-orange hover:border-brand-orange text-[#FAFAF8] cursor-pointer transition-colors"
                aria-label="Send message"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
