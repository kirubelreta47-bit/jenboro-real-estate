import { motion } from "motion/react";
import { Hammer, Calendar, MapPin } from "lucide-react";

export default function ConstructionUpdates() {
  const updates = [
    {
      id: 1,
      title: "Obsidian Villa - Phase 3 Concrete Pour",
      date: "June 15, 2024",
      location: "Old Airport",
      image: "/images/construction-update-2.jpg",
      progress: 65,
      description: "Structural reinforcement and major concrete pouring for the primary living spaces and cantilevered terraces."
    },
    {
      id: 2,
      title: "The Courtyard - Foundation Completion",
      date: "June 10, 2024",
      location: "Bole",
      image: "/images/construction-update-1.jpg",
      progress: 25,
      description: "Excavation and foundation work completed for the central interior courtyard and subterranean parking."
    }
  ];

  return (
    <section className="py-20 bg-brand-navy text-white overflow-hidden" id="construction">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6">
          <div className="space-y-4">
            <div className="inline-flex items-center space-x-2.5">
              <span className="w-10 h-[1px] bg-brand-orange"></span>
              <span className="font-sans text-xs tracking-[0.25em] uppercase text-brand-orange font-bold">
                Project Transparency
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl tracking-tight">
              Construction Intel
            </h2>
            <p className="font-sans text-sm text-slate-400 max-w-xl font-light leading-relaxed">
              Track the physical evolution of our architectural portfolio. We document every milestone to ensure absolute alignment with our high-fidelity designs.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {updates.map((update) => (
            <motion.div
              key={update.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-brand-bg/5 border border-white/10 flex flex-col sm:flex-row overflow-hidden group"
            >
              <div className="sm:w-1/2 overflow-hidden">
                <img
                  src={update.image}
                  alt={update.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="p-6 sm:w-1/2 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-widest font-bold text-brand-orange font-sans">
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{update.date}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3" />
                      <span>{update.location}</span>
                    </span>
                  </div>
                  <h3 className="font-serif text-xl leading-tight group-hover:text-brand-orange transition-colors">
                    {update.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-light leading-relaxed">
                    {update.description}
                  </p>
                </div>

                <div className="mt-8 space-y-2">
                  <div className="flex justify-between text-[9px] uppercase tracking-tighter font-bold">
                    <span>Structural Milestones</span>
                    <span>{update.progress}%</span>
                  </div>
                  <div className="h-[2px] bg-white/10 w-full relative">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${update.progress}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className="absolute inset-y-0 left-0 bg-brand-orange"
                    ></motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
