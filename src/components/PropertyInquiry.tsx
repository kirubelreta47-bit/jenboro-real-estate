import { useState } from 'react';
import { motion } from 'motion/react';
import { Send, User, Mail, MessageSquare, Briefcase } from 'lucide-react';

export default function PropertyInquiry() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    want: '',
    budget: 'Premium'
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    console.log('Inquiry submitted:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="inquiry" className="py-12 sm:py-24 bg-brand-navy relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-brand-orange/5 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-brand-orange/5 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="space-y-6 sm:space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center space-x-3"
            >
              <div className="w-12 h-[1px] bg-brand-orange"></div>
              <span className="font-sans text-sm tracking-[0.3em] uppercase text-brand-orange font-bold">
                Tailored Acquisition
              </span>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-bold leading-tight"
            >
              Define Your <span className="text-brand-orange italic">Vision</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-white/70 text-lg sm:text-xl font-light leading-relaxed max-w-xl"
            >
              Cant find the exact horizon you seek? Describe your architectural desires, and our concierge team will curate a bespoke selection of off-market gems and upcoming legacies just for you.
            </motion.p>

            <div className="space-y-6 pt-4">
              <div className="flex items-start space-x-4">
                <div className="bg-brand-orange/10 p-3 rounded-full mt-1">
                  <Briefcase className="w-5 h-5 text-brand-orange" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg">Off-Market Access</h4>
                  <p className="text-white/50 text-sm">Access exclusive listings not available to the general public.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-brand-orange/10 p-3 rounded-full mt-1">
                  <User className="w-5 h-5 text-brand-orange" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg">Dedicated Consultant</h4>
                  <p className="text-white/50 text-sm">A personal advisor to guide you through legalities and design choices.</p>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 p-5 sm:p-12 shadow-2xl relative"
          >
            {submitted ? (
              <div className="h-[400px] flex flex-col items-center justify-center text-center space-y-6">
                <div className="w-20 h-20 bg-brand-orange/20 rounded-full flex items-center justify-center">
                  <Send className="w-10 h-10 text-brand-orange animate-pulse" />
                </div>
                <h3 className="font-serif text-3xl text-white font-bold">Inquiry Received</h3>
                <p className="text-white/60">Our concierge team has been notified. We will reach out to you within 24 hours to discuss your vision.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-brand-orange font-bold">Full Name</label>
                    <div className="relative group">
                      <User className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within:text-brand-orange transition-colors" />
                      <input 
                        required
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="John Doe"
                        className="w-full bg-transparent border-b border-white/20 py-3 pl-8 text-white focus:outline-none focus:border-brand-orange transition-all placeholder:text-white/20 font-sans"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-brand-orange font-bold">Contact Email</label>
                    <div className="relative group">
                      <Mail className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within:text-brand-orange transition-colors" />
                      <input 
                        required
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="john@example.com"
                        className="w-full bg-transparent border-b border-white/20 py-3 pl-8 text-white focus:outline-none focus:border-brand-orange transition-all placeholder:text-white/20 font-sans"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-brand-orange font-bold">Tell us your vision</label>
                  <div className="relative group">
                    <MessageSquare className="absolute left-0 top-4 w-4 h-4 text-white/30 group-focus-within:text-brand-orange transition-colors" />
                    <textarea 
                      required
                      rows={4}
                      value={formData.want}
                      onChange={(e) => setFormData({...formData, want: e.target.value})}
                      placeholder="e.g. A 5-bedroom brutalist villa in Old Airport with a panoramic terrace..."
                      className="w-full bg-transparent border-b border-white/20 py-3 pl-8 text-white focus:outline-none focus:border-brand-orange transition-all placeholder:text-white/20 font-sans resize-none"
                    ></textarea>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-brand-orange font-bold">Target investment tier</label>
                  <div className="flex flex-wrap gap-3">
                    {['Bespoke', 'Premium', 'Legacy'].map((tier) => (
                      <button
                        key={tier}
                        type="button"
                        onClick={() => setFormData({...formData, budget: tier})}
                        className={`px-6 py-2 text-[10px] uppercase tracking-[0.2em] font-bold border transition-all ${
                          formData.budget === tier 
                            ? 'bg-brand-orange border-brand-orange text-brand-navy' 
                            : 'border-white/20 text-white hover:border-brand-orange/50'
                        }`}
                      >
                        {tier}
                      </button>
                    ))}
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-white text-brand-navy py-4 px-8 font-sans font-bold uppercase tracking-[0.3em] hover:bg-brand-orange hover:text-brand-navy transition-all duration-300 shadow-xl"
                >
                  Initiate Concierge
                </button>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
