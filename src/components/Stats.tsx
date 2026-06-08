import { Award, ShieldCheck, MapPin } from "lucide-react";
import { motion } from "motion/react";

export default function Stats() {
  const statsList = [
    {
      value: "500+",
      label: "Properties Curated",
      icon: MapPin,
    },
    {
      value: "12 Yrs",
      label: "Boutique Experience",
      icon: Award,
    },
    {
      value: "98%",
      label: "Client Satisfaction",
      icon: ShieldCheck,
    },
  ];

  return (
    <section className="bg-brand-navy border-y border-brand-navy-light/40 py-10 sm:py-16 relative z-20 overflow-hidden">
      {/* Decorative pulse background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-brand-orange/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-around items-center gap-12 md:gap-0">
          {statsList.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: idx * 0.2 }}
              className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-5 text-center md:text-left group w-full md:w-auto"
            >
              <motion.div 
                whileHover={{ rotate: 10, scale: 1.1 }}
                className="p-4 bg-brand-navy-light text-brand-orange border border-brand-orange/20 rounded-none transition-all duration-300 group-hover:border-brand-orange shadow-lg shadow-black/20"
              >
                <stat.icon className="w-6 h-6" />
              </motion.div>
              <div className="space-y-1">
                <p className="font-serif text-3xl sm:text-4xl text-white font-bold tracking-tight">
                  {stat.value}
                </p>
                <p className="font-sans text-[10px] sm:text-xs tracking-[0.25em] uppercase text-[#FDEBD0]/60 font-bold">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
