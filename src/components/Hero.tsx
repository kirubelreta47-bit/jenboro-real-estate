import { useState, FormEvent } from "react";
import { Search, MapPin, Home as HomeIcon, DollarSign, SlidersHorizontal, Landmark } from "lucide-react";
import { PropertyType } from "../types";
import { motion, AnimatePresence } from "motion/react";
import heroImage from "../assets/images/jenboro_hero_1780653832668.png";


export interface FilterState {
  keyword: string;
  type: "All" | PropertyType;
  maxPrice: number;
}

interface HeroProps {
  onFilterChange: (filters: FilterState) => void;
  availableLocations: string[];
}

export default function Hero({ onFilterChange, availableLocations }: HeroProps) {
  const [keyword, setKeyword] = useState("");
  const [type, setType] = useState<"All" | PropertyType>("All");
  const [maxPrice, setMaxPrice] = useState<number>(6000000); // Default high valuation
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    onFilterChange({ keyword, type, maxPrice });
    
    // Smooth scroll to properties section to show filtered results immediately
    const propertiesSection = document.getElementById("properties");
    if (propertiesSection) {
      window.scrollTo({
        top: propertiesSection.offsetTop - 85,
        behavior: "smooth"
      });
    }
  };

  const handleReset = () => {
    setKeyword("");
    setType("All");
    setMaxPrice(6000000);
    onFilterChange({ keyword: "", type: "All", maxPrice: 6000000 });
  };

  return (
    <section
      id="home"
      className="relative bg-brand-navy pt-24 pb-16 sm:pt-40 sm:pb-32 overflow-hidden"
    >
      {/* Dynamic background element */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-brand-orange/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-brand-orange/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/4 pointer-events-none"></div>
      
      {/* Subtle Transparent Building Background Texture */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.35] overflow-hidden">
        <motion.img 
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          src="/images/luxury-estate-exterior.jpg" 
          className="w-full h-full object-cover brightness-[0.5] contrast-[1.1]"
          alt=""
        />
        <div className="absolute inset-0 bg-brand-navy/50 backdrop-blur-[1px]"></div>
      </div>

      {/* Decorative architectural layout grids */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="h-full w-full border-x border-[#FAFAF8] max-w-7xl mx-auto flex justify-between relative">
          <div className="w-[1px] h-full bg-[#FAFAF8]"></div>
          <div className="w-[1px] h-full bg-[#FAFAF8]"></div>
          <div className="w-[1px] h-full bg-[#FAFAF8]"></div>
          
          {/* Moving decorative line */}
          <motion.div 
            animate={{ y: ["0%", "100%"] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute left-1/4 w-[1px] h-20 bg-gradient-to-b from-transparent via-brand-orange to-transparent"
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Text Content */}
          <div className="lg:col-span-7 space-y-8 sm:space-y-10 text-center lg:text-left">
            <div className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="inline-flex items-center space-x-2.5 justify-center lg:justify-start"
              >
                <span className="w-10 h-[1px] bg-brand-orange"></span>
                <span className="font-sans text-xs sm:text-sm tracking-[0.4em] uppercase text-brand-orange font-bold">
                  Bespoke Architectural Legacies
                </span>
              </motion.div>

              <div className="max-w-[500px] mx-auto lg:ml-0 relative py-12">
                {/* Logo Image with Drop & Settle Physics */}
                <motion.img 
                  initial={{ y: -800, opacity: 0 }}
                  animate={{ 
                    y: [-800, 0, -15, 0],
                    opacity: [0, 1, 1, 1],
                    scaleY: [1, 0.85, 1.05, 1],
                    scaleX: [1, 1.1, 0.95, 1]
                  }}
                  transition={{ 
                    times: [0, 0.4, 0.6, 1],
                    duration: 3, 
                    ease: ["easeIn", "easeOut", "easeInOut"]
                  }}
                  src="/images/begize gibu.png" 
                  alt="Begize Gibu" 
                  className="w-full h-auto block filter drop-shadow-[0_0_15px_rgba(255,176,102,0.3)] relative z-10"
                  style={{ transformOrigin: 'bottom' }}
                />

                {/* Ground Crack Visual Effect */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0, filter: "blur(4px)" }}
                  animate={{ 
                    opacity: [0, 1, 0.3], 
                    scale: [0, 1.2, 1],
                    filter: ["blur(4px)", "blur(0px)", "blur(2px)"]
                  }}
                  transition={{ delay: 1.2, duration: 1.5 }}
                  className="absolute bottom-10 left-1/2 -translate-x-1/2 w-4/5 h-2 z-0 pointer-events-none"
                >
                  <div className="absolute inset-0 bg-brand-orange/40 skew-x-[30deg] h-[1px]"></div>
                  <div className="absolute inset-0 bg-brand-orange/30 -skew-x-[45deg] h-[1px] translate-y-1"></div>
                  <div className="absolute inset-0 bg-brand-orange/20 blur-sm h-full rounded-full"></div>
                </motion.div>
              </div>

              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                className="font-sans text-sm sm:text-lg text-[#FAFAF8]/75 leading-relaxed max-w-xl font-light mx-auto lg:ml-0"
              >
                Jenboro Real Estate represents a curated suite of luxury architectural retreats, high-end design landmarks, and modernist residences in Addis Ababa and beyond.
              </motion.p>
            </div>
            <motion.form
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45, ease: "easeOut" }}
              onSubmit={handleSearchSubmit}
              className="bg-white p-4 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-t-8 border-brand-orange max-w-2xl mx-auto lg:ml-0 relative z-30 transition-all duration-500 hover:shadow-[0_25px_60px_rgba(0,0,0,0.4)]"
              id="hero-search-form"
            >
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-4 items-end">
                
                {/* Location Search Input */}
                <div className="sm:col-span-12 lg:col-span-5 space-y-2 text-left">
                  <label className="block text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-brand-navy/60 font-bold mb-1">
                    Desired Location
                  </label>
                  <div className="relative group/input">
                    <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 text-brand-orange w-3.5 transition-all group-focus-within/input:scale-110" />
                    <input
                      type="text"
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                      placeholder="e.g. Bole, Old Airport"
                      className="w-full bg-slate-50 border-b-2 border-slate-200 py-2.5 sm:py-3.5 pl-10 sm:pl-11 pr-4 text-xs sm:text-sm text-brand-navy focus:outline-none focus:border-brand-orange focus:bg-white font-sans placeholder:text-slate-400 transition-all rounded-t-sm"
                    />
                  </div>
                </div>

                {/* Property Type Dropdown */}
                <div className="sm:col-span-7 lg:col-span-4 space-y-2 text-left">
                  <label className="block text-[11px] tracking-[0.2em] uppercase text-brand-navy/60 font-bold mb-1">
                    Property Type
                  </label>
                  <div className="relative group/input">
                    <HomeIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 text-brand-orange w-4" />
                    <select
                      value={type}
                      onChange={(e) => setType(e.target.value as "All" | PropertyType)}
                      className="w-full bg-slate-50 border-b-2 border-slate-200 py-3.5 pl-11 pr-8 text-sm text-brand-navy focus:outline-none focus:border-brand-orange focus:bg-white font-sans appearance-none transition-all cursor-pointer rounded-t-sm"
                    >
                      <option value="All">All Horizons</option>
                      <option value="Villa">Villa</option>
                      <option value="Penthouse">Penthouse</option>
                      <option value="Townhome">Townhome</option>
                      <option value="Apartment">Apartment</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-brand-navy/30">
                      <svg className="fill-current h-4 w-4 transition-transform group-focus-within/input:rotate-180" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Search Button */}
                <div className="sm:col-span-12 lg:col-span-3">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02, backgroundColor: "#0F2D52" }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-brand-navy text-[#FAFAF8] py-4 px-6 text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center space-x-3 shadow-xl shadow-brand-navy/20 group"
                  >
                    <Search className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                    <span>Search</span>
                  </motion.button>
                </div>

              </div>

              {/* Advanced filter toggle and quick recommendations */}
              <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                <button
                  type="button"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="inline-flex items-center space-x-2.5 text-[10px] tracking-[0.25em] uppercase font-black text-brand-navy/60 hover:text-brand-orange transition-all group"
                >
                  <SlidersHorizontal className={`w-4 h-4 text-brand-orange transition-transform duration-300 ${showAdvanced ? 'rotate-90' : ''}`} />
                  <span>{showAdvanced ? "Hide Protocol" : "Price Filter"}</span>
                </button>

                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Premium Zones:</span>
                  <div className="flex flex-wrap gap-2">
                    {availableLocations.slice(0, 3).map((loc) => {
                      const simpleLoc = loc.split(",")[0];
                      return (
                        <motion.button
                          key={loc}
                          type="button"
                          whileHover={{ y: -2, backgroundColor: "#0F2D52", color: "#FFFFFF" }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setKeyword(simpleLoc);
                            onFilterChange({ keyword: simpleLoc, type, maxPrice });
                          }}
                          className="bg-slate-100/80 text-[10px] text-brand-navy px-3.5 py-1.5 transition-all font-black uppercase tracking-widest border border-transparent hover:border-brand-navy/10"
                        >
                          {simpleLoc}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Advanced Sliders */}
              <AnimatePresence>
                {showAdvanced && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0, marginTop: 0 }}
                    animate={{ height: "auto", opacity: 1, marginTop: 24 }}
                    exit={{ height: 0, opacity: 0, marginTop: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 bg-slate-50 border-l-4 border-brand-orange space-y-5">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] tracking-[0.25em] uppercase font-black text-brand-navy/60">Maximum Valuation</span>
                        <span className="font-serif text-2xl font-bold text-brand-navy">
                          ${maxPrice.toLocaleString()}
                        </span>
                      </div>
                      <div className="relative px-1">
                        <input
                          type="range"
                          min="10000"
                          max="6000000"
                          step="50000"
                          value={maxPrice}
                          onChange={(e) => {
                            const val = parseInt(e.target.value);
                            setMaxPrice(val);
                            onFilterChange({ keyword, type, maxPrice: val });
                          }}
                          className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-orange focus:outline-none"
                        />
                        <div className="flex justify-between mt-3 text-[10px] text-slate-400 font-black uppercase tracking-widest">
                          <span>$10k</span>
                          <span>$3M</span>
                          <span>$6M+</span>
                        </div>
                      </div>
                      <div className="pt-2 flex justify-end">
                        <button
                          type="button"
                          onClick={handleReset}
                          className="text-[10px] text-red-500 uppercase font-black tracking-[0.25em] hover:underline transition-all"
                        >
                          Reset Registry
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.form>
          </div>

          {/* Large Hero Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
            className="lg:col-span-5 relative mt-16 lg:mt-0 flex flex-col items-center lg:items-start w-full lg:w-auto"
          >
            {/* Multi-layered decorative frames */}
            <div className="absolute -left-8 -top-8 w-32 h-32 border-l-2 border-t-2 border-brand-orange opacity-20 hidden sm:block"></div>
            <div className="absolute -right-8 -bottom-8 w-32 h-32 border-r-2 border-b-2 border-brand-orange opacity-20 hidden sm:block"></div>
            
            {/* Animated floating subtle interaction */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="border-[12px] border-white overflow-hidden relative shadow-[0_30px_60px_rgba(0,0,0,0.5)] group mx-auto w-full max-w-sm sm:max-w-none"
            >
              <img
                src={heroImage}
                alt="Bespoke Minimal Architecture"
                referrerPolicy="no-referrer"
                className="w-full h-[260px] sm:h-[600px] object-cover transition-transform duration-[2000ms] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-brand-navy/20 group-hover:bg-transparent transition-all duration-700"></div>
              
              {/* Floating Badge */}
              <div className="absolute top-6 right-6 bg-brand-orange p-3 shadow-xl">
                <Landmark className="w-6 h-6 text-white" />
              </div>
            </motion.div>

            {/* Featured Horizon with Sculpted Living Sanctuaries Caption Underneath */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-6 p-4 sm:p-8 bg-[#FAFAF8] border-l-4 border-brand-orange flex flex-col items-center sm:flex-row sm:items-center sm:justify-between gap-6 shadow-2xl relative w-full lg:w-auto mx-auto lg:mx-0"
            >
              <div className="text-center sm:text-left space-y-1">
                <span className="font-sans text-[11px] tracking-[0.4em] uppercase text-brand-orange font-black">
                  Featured Horizon
                </span>
                <h4 className="font-serif text-brand-navy text-2xl font-bold">
                  Sculpted Living Sanctuaries
                </h4>
              </div>
              
              <div className="flex flex-wrap items-center justify-center gap-4 sm:text-right sm:flex-col sm:items-end sm:justify-end sm:gap-2 text-xs text-brand-navy font-sans">
                <span className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-brand-orange animate-ping"></span>
                  <span className="font-black uppercase tracking-widest text-[10px]">Old Airport Estate</span>
                </span>
                <span className="text-[10px] uppercase font-black tracking-[0.2em] text-white bg-brand-navy py-1.5 px-4 shadow-lg">
                  Architectural Villa
                </span>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
