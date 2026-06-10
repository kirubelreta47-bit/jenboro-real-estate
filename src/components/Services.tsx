import { KeyRound, ShieldAlert, ArrowRightLeft, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";

export default function Services() {
  const services = [
    {
      title: "Acquire & Belong",
      subtitle: "For Private Investors",
      description: "Our acquisition services prioritize discretion and architectural longevity. We represent purchasers seeking bespoke villas, geometric modern structures, and elite vertical penthouses in Addis Ababa's prime master-planned zones. We match aesthetic ambitions to structures constructed to international specifications.",
      icon: KeyRound,
      features: ["Verified Clear Title Deeds", "Structural Engineering Verifications", "Discreet Capital Settlements"]
    },
    {
      title: "Boutique Divestment",
      subtitle: "For Property Custodians",
      description: "Divest luxury assets with absolute positioning authority. Jenboro bypasses traditional real-estate clutter using customized editorial presentations, high-definition digital assets, and pre-screened client tours. We coordinate and direct off-market private transactions for maximum equity realization.",
      icon: ArrowRightLeft,
      features: ["Premium Photographic Styling", "Global Ethiopian Diaspora Networks", "Tailored Legal Protocols"]
    },
    {
      title: "Conserved Tenancy",
      subtitle: "For Diplomatic Missions",
      description: "We manage and lease elite residential holdings suited to the safety specifications of embassies, multilateral organizations, and international executives. Our property managers enforce absolute functional standards, emergency system contingencies, and premier concierge maintenance services.",
      icon: ShieldCheck,
      features: ["Embassy-grade Security Audits", "Dual-line Power Backups Grid", "24/7 Dedicated Concierge Response"]
    }
  ];

  return (
    <section id="services" className="py-12 sm:py-28 bg-[#FAFAF8] relative z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading with animation */}
        <div className="space-y-3 sm:space-y-4 max-w-2xl mb-8 sm:mb-16 text-center lg:text-left mx-auto lg:ml-0">
          <motion.div 
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2.5 justify-center lg:justify-start"
          >
            <span className="w-10 h-[1px] bg-brand-orange"></span>
            <span className="font-sans text-xs tracking-[0.25em] uppercase text-brand-orange font-bold">
              Prestige Operational Protocols
            </span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-2xl sm:text-4xl md:text-5xl text-brand-navy tracking-tight font-bold"
          >
            How We Partner
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-sans text-sm text-slate-500 font-light leading-relaxed max-w-lg mx-auto lg:ml-0"
          >
            Minimalist operational frameworks tailored purely to the capital preservation, layout expectations, and safety mandates of selective global actors.
          </motion.p>
        </div>

        {/* Services Grid layout with staggered entrance */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-14" id="services-grid">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
              className="border-t-2 border-slate-100 pt-6 sm:pt-10 flex flex-col justify-between space-y-6 sm:space-y-8 group hover:border-brand-orange transition-colors duration-500"
            >
              <div className="space-y-6">
                {/* Clean Minimal Icon */}
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-12 h-12 border border-slate-200 text-brand-navy flex items-center justify-center transition-all duration-300 group-hover:bg-brand-navy group-hover:text-white group-hover:border-brand-navy shadow-sm"
                >
                  <service.icon className="w-5 h-5" />
                </motion.div>

                <div className="space-y-2 text-left">
                  <span className="text-[10px] uppercase font-sans font-black tracking-[0.2em] text-brand-orange">
                    {service.subtitle}
                  </span>
                  <h3 className="font-serif text-2xl text-brand-navy tracking-wide font-bold">
                    {service.title}
                  </h3>
                </div>

                <p className="font-sans text-[13px] text-slate-600 leading-relaxed font-light text-left group-hover:text-slate-900 transition-colors">
                  {service.description}
                </p>
              </div>

              {/* Sub-bullets */}
              <ul className="space-y-3 pt-6 border-t border-slate-50 font-sans text-[11px] text-brand-navy">
                {service.features.map((feature, idx) => (
                  <motion.li 
                    key={idx} 
                    whileHover={{ x: 5 }}
                    className="flex items-center space-x-3"
                  >
                    <span className="w-2 h-[2px] bg-brand-orange rounded-none"></span>
                    <span className="font-bold tracking-wide text-left uppercase text-[9px]">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
