import { useState, FormEvent } from "react";
import { ArrowRight, Sparkles, CheckCircle2, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function CTABanner() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [interests, setInterests] = useState("Buy");
  const [submitted, setSubmitted] = useState(false);

  const handleConsultSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      alert("Please fill in your name and email direction to establish connection.");
      return;
    }
    setSubmitted(true);
  };

  const handleLinkClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <section className="bg-brand-navy relative overflow-hidden py-24 sm:py-32 border-y border-brand-navy-light/40 z-20">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-[5px] bg-gradient-to-r from-brand-orange via-[#FDEBD0] to-brand-orange"></div>
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-orange/10 blur-[80px] rounded-full pointer-events-none"></div>
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-brand-orange/10 blur-[80px] rounded-full pointer-events-none"></div>

      {/* Decorative architectural layout grids */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
        <div className="h-full w-full border-x border-[#FAFAF8] max-w-7xl mx-auto flex justify-between">
          <div className="w-[1px] h-full bg-[#FAFAF8]"></div>
          <div className="w-[1px] h-full bg-[#FAFAF8]"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10 text-center space-y-10">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center space-x-3 uppercase tracking-[0.4em] text-[10px] sm:text-xs font-black text-brand-orange"
        >
          <Sparkles className="w-5 h-5 animate-pulse" />
          <span>Curated Consultation</span>
        </motion.div>

        <motion.h3 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#FAFAF8] tracking-tight max-w-4xl mx-auto leading-[1.1] font-bold"
        >
          Elevate Your Living Standard
        </motion.h3>

        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-sans text-sm sm:text-base text-[#FAFAF8]/70 max-w-2xl mx-auto leading-relaxed font-light"
        >
          Establish contact with our executive procurement partners to review off-market listings, customized structural commissions, or exclusive diplomatic tenancy contracts across Addis Ababa.
        </motion.p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-5 pt-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsConsultationOpen(true)}
            className="w-full sm:w-auto px-10 py-5 bg-brand-orange text-white text-[11px] tracking-[0.3em] uppercase font-black transition-all shadow-[0_15px_30px_rgba(255,176,102,0.3)] hover:shadow-[0_20px_40px_rgba(255,176,102,0.4)] flex items-center justify-center space-x-3"
            id="cta-book-consult-btn"
          >
            <span>Request Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleLinkClick("#properties")}
            className="w-full sm:w-auto px-10 py-5 bg-transparent text-white text-[11px] tracking-[0.3em] uppercase font-black border-2 border-white/20 hover:border-brand-orange transition-all flex items-center justify-center space-x-3 group"
            id="cta-browse-listings-btn"
          >
            <span className="group-hover:text-brand-orange transition-colors">Browse Horizons</span>
          </motion.button>
        </div>
      </div>

      {/* Embedded slide consultation form */}
      <AnimatePresence>
        {isConsultationOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-navy/95 backdrop-blur-xl" id="consultation-overlay">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-white text-brand-navy p-8 sm:p-12 border-t-[12px] border-brand-orange shadow-[0_50px_100px_rgba(0,0,0,0.6)] relative overflow-hidden"
            >
              {/* Background accent */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-orange/5 rounded-full blur-3xl"></div>

              <button
                onClick={() => {
                  setIsConsultationOpen(false);
                  setSubmitted(false);
                }}
                className="absolute right-6 top-6 p-2 rounded-full hover:bg-slate-100 text-brand-navy transition-colors z-10"
                aria-label="Close form"
                id="cta-close-consult-btn"
              >
                <X className="w-6 h-6" />
              </button>

              {!submitted ? (
                <form onSubmit={handleConsultSubmit} className="space-y-8 relative z-10">
                  <div className="space-y-2">
                    <h4 className="font-serif text-3xl font-bold tracking-tight text-brand-navy">Executive Protocol</h4>
                    <p className="font-sans text-xs text-slate-500 uppercase tracking-widest font-black">Besoke Acquisition Interface</p>
                  </div>

                  <div className="space-y-5 pt-4">
                    <div className="space-y-1.5 focus-within:translate-x-1 transition-transform">
                      <label className="block text-[10px] uppercase tracking-[0.3em] text-brand-navy/40 font-black mb-1">Your Identity</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Dr. / Mr. / Ms."
                        className="w-full bg-slate-50 border-b-2 border-slate-200 py-3.5 px-4 text-sm text-brand-navy focus:outline-none focus:border-brand-orange focus:bg-white transition-all font-bold"
                      />
                    </div>

                    <div className="space-y-1.5 focus-within:translate-x-1 transition-transform">
                      <label className="block text-[10px] uppercase tracking-[0.3em] text-brand-navy/40 font-black mb-1">Encrypted Mail</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@domain.com"
                        className="w-full bg-slate-50 border-b-2 border-slate-200 py-3.5 px-4 text-sm text-brand-navy focus:outline-none focus:border-brand-orange focus:bg-white transition-all font-bold"
                      />
                    </div>

                    <div className="space-y-1.5 focus-within:translate-x-1 transition-transform">
                      <label className="block text-[10px] uppercase tracking-[0.3em] text-brand-navy/40 font-black mb-1">Investment Intent</label>
                      <div className="relative">
                        <select
                          value={interests}
                          onChange={(e) => setInterests(e.target.value)}
                          className="w-full bg-slate-50 border-b-2 border-slate-200 py-3.5 px-4 text-sm text-brand-navy focus:outline-none focus:border-brand-orange focus:bg-white appearance-none transition-all font-bold cursor-pointer"
                        >
                          <option value="Buy">Acquire Private Estate</option>
                          <option value="Sell">Property Divestment</option>
                          <option value="Rent">Diplomatic Tenancy</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-brand-orange">
                          <ArrowRight className="w-4 h-4 rotate-90" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02, backgroundColor: "#0F2D52" }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-brand-navy text-white text-[11px] uppercase tracking-[0.4em] font-black py-5 shadow-xl shadow-brand-navy/20 transition-all hover:bg-brand-navy-light"
                  >
                    Initiate Security Brief
                  </motion.button>
                </form>
              ) : (
                <div className="text-center py-12 space-y-8 relative z-10">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-20 h-20 rounded-full bg-brand-orange/10 text-brand-orange flex items-center justify-center mx-auto"
                  >
                    <CheckCircle2 className="w-10 h-10" />
                  </motion.div>
                  <div className="space-y-3">
                    <h4 className="font-serif text-3xl font-bold">Protocol Initiated</h4>
                    <p className="font-sans text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
                      Thank you, {name}. A senior acquisitions manager has been assigned to your profile. You will receive an encrypted brief on your designated terminal: <span className="font-bold text-brand-navy italic">{email}</span>.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setIsConsultationOpen(false);
                      setSubmitted(false);
                    }}
                    className="mt-6 text-[11px] text-brand-orange font-black uppercase tracking-[0.3em] hover:underline"
                  >
                    Dismiss Dialogue
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>

  );

  function handleSearchSubmit(e: FormEvent) {
    e.preventDefault();
  }
}
