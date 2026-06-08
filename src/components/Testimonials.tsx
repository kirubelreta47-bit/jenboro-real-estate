import { Quote } from "lucide-react";
import { motion } from "motion/react";

export default function Testimonials() {
  const testimonials = [
    {
      quote: "Jenboro represents a paradigm shift in the Ethiopian real estate market. Their architectural eye is absolute. They located a modernist concrete villa that perfectly matched my expectations for layout authenticity and security parameters.",
      author: "Dr. Alula Bekele",
      title: "Senior Global Health Lead, UNECA",
      location: "Kazanchis, Addis Ababa"
    },
    {
      quote: "Leasing diplomatic holdings in Bole requires extreme scrutiny regarding access control and mechanical resilience. Hanna Alene navigated our strict embassy oversight committees with transparent reports and deep professional discipline.",
      author: "H.E. Marie-Claire Dupont",
      title: "Consular General representative",
      location: "Old Airport Diplomatic Enclave"
    },
    {
      quote: "Selling our family's architectural estate was deeply emotional. Jenboro's boutique, off-market editorial listing kept the transaction strictly private while securing a buyer aligned with the legacy of the design.",
      author: "Zenebech Abera",
      title: "Boutique Hotelier & Art Conservator",
      location: "Entoto Foothills"
    }
  ];

  return (
    <section id="testimonials" className="py-20 sm:py-32 bg-[#FAFAF8] border-t border-slate-200 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="space-y-4 max-w-2xl mb-20 text-center mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2.5"
          >
            <span className="w-10 h-[1px] bg-brand-orange"></span>
            <span className="font-sans text-xs tracking-[0.25em] uppercase text-brand-orange font-black">
              Testimonials
            </span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl text-brand-navy tracking-tight font-bold"
          >
            Client Perspectives
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-sans text-xs sm:text-sm text-slate-500 font-light max-w-md mx-auto leading-relaxed"
          >
            Direct, unedited reviews expressing the absolute standards of discretion and satisfaction delivered to our global network.
          </motion.p>
        </div>

        {/* Testimonials grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14" id="testimonials-grid">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="bg-white p-8 sm:p-10 border border-slate-100 relative flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-500"
            >
              {/* Quote icon as decoration */}
              <div className="absolute top-8 right-8 text-brand-orange/10 pointer-events-none">
                <Quote className="w-12 h-12" />
              </div>

              {/* Quote content */}
              <div className="space-y-6 relative z-10">
                <span className="font-serif text-5xl text-brand-orange/40 select-none leading-none block">“</span>
                <p className="font-sans text-sm sm:text-base text-slate-600 leading-relaxed font-light italic text-left">
                  {item.quote}
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-8 mt-10 border-t border-slate-50 text-left">
                <p className="font-serif text-base font-black text-brand-navy">{item.author}</p>
                <p className="font-sans text-[10px] text-slate-400 mt-1 uppercase tracking-widest font-bold">
                  {item.title}
                </p>
                <div className="mt-3 inline-flex items-center space-x-2 bg-brand-orange/5 px-3 py-1 border border-brand-orange/10">
                  <div className="w-1.5 h-1.5 bg-brand-orange rounded-none"></div>
                  <span className="font-sans text-[9px] font-black text-brand-orange uppercase tracking-widest">
                    {item.location}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
