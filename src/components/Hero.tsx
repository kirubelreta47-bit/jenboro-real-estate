import { useState, FormEvent } from "react";
import { Search, MapPin, Home as HomeIcon, DollarSign, SlidersHorizontal, Landmark } from "lucide-react";
import { PropertyType } from "../types";
import { motion, AnimatePresence } from "motion/react";
import heroImage from "../assets/images/jenboro_hero_1780653832668.png";
import CompanyLogo from "../assets/images/jenboro_logo_varieties_02.png";

const NEIGHBORHOOD_SUGGESTIONS = ["Bole", "Sarbet", "Kazanchis", "Old Airport", "Ayat", "Megenagna", "Gerji", "CMC", "Lideta", "Piassa"];


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
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredSuggestions = NEIGHBORHOOD_SUGGESTIONS.filter(s => 
    s.toLowerCase().includes(keyword.toLowerCase()) && keyword.length > 0
  );

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
      className="relative bg-brand-navy pt-48 pb-16 sm:pt-40 sm:pb-32 overflow-hidden"
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
          
          {/* Text/Slogan Content */}
          <div className="lg:col-span-7 flex flex-col text-center lg:text-left order-1">
            <div className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="inline-flex items-center space-x-0 justify-center lg:justify-start mt-20 sm:mt-0"
              >
                <span className="font-sans text-xs sm:text-sm tracking-[0.4em] uppercase text-[#FFB066] font-bold">
                  Bespoke Architectural Legacies
                </span>
              </motion.div>

              <div className="max-w-[500px] mx-auto lg:ml-0 relative py-12">
                {/* Logo Image with Drop & Settle Physics */}
                <motion.img 
                  initial={{ y: -1200, opacity: 1 }}
                  animate={{ 
                    y: [-1200, 0, -30, 0],
                    scaleY: [1, 0.75, 1.1, 1],
                    scaleX: [1, 1.25, 0.9, 1]
                  }}
                  transition={{ 
                    times: [0, 0.45, 0.7, 1],
                    duration: 3, 
                    ease: ["easeIn", "easeOut", "easeInOut"]
                  }}
                  src="/images/begize gibu.png" 
                  alt="Begize Gibu" 
                  className="w-full h-auto block filter drop-shadow-[0_0_15px_rgba(255,176,102,0.3)] relative z-10"
                  style={{ transformOrigin: 'bottom' }}
                />

                {/* Enhanced Ground Crack Visual Effect */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.2 }}
                  animate={{ 
                    opacity: [0, 1, 0.8, 0.6], 
                    scale: [0.5, 1.1, 1],
                  }}
                  transition={{ delay: 1.35, duration: 2, ease: "easeOut" }}
                  className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full h-8 z-0 pointer-events-none"
                >
                  {/* Impact Flash */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: [0, 0.9, 0], scale: [0, 1.5, 2.5] }}
                    transition={{ delay: 1.35, duration: 0.5 }}
                    className="absolute inset-0 bg-brand-orange/30 blur-xl rounded-full"
                  />

                  {/* Main Fracture Lines */}
                  <div className="absolute top-1/2 left-0 w-full h-[1px] bg-brand-orange/60 skew-x-[35deg]"></div>
                  <div className="absolute top-1/2 left-0 w-full h-[1px] bg-brand-orange/40 -skew-x-[45deg] translate-y-1"></div>
                  <div className="absolute top-1/2 left-1/4 w-1/2 h-[1.5px] bg-brand-orange/80 skew-x-[60deg] -translate-y-1"></div>
                  <div className="absolute top-1/2 right-1/4 w-1/3 h-[1px] bg-brand-orange/50 -skew-x-[20deg] translate-y-2"></div>
                  
                  {/* Dust/Energy particles simplified */}
                  <div className="absolute inset-0 bg-brand-orange/10 blur-md h-full rounded-full group-hover:bg-brand-orange/20 transition-colors"></div>
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

            {/* Large Hero Image - Placed here for Mobile Ordering [Slogan -> Image -> Form] */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.98, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
              className="lg:absolute lg:top-0 lg:right-0 lg:w-[40%] xl:w-[35%] lg:h-[700px] relative mt-12 lg:mt-0 flex flex-col items-center lg:items-start w-full order-2"
            >
              <div className="absolute -left-8 -top-8 w-32 h-32 border-l-2 border-t-2 border-brand-orange opacity-20 hidden sm:block"></div>
              <div className="absolute -right-8 -bottom-8 w-32 h-32 border-r-2 border-b-2 border-brand-orange opacity-20 hidden sm:block"></div>
              
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
                {/* Floating Logo Overlay (No Background) */}
                <div className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 sm:p-3 z-50">
                  <img src={CompanyLogo} alt="Logo" className="w-12 h-12 sm:w-16 sm:h-16 object-contain" />
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="mt-6 p-4 sm:p-8 bg-[#FAFAF8] border-l-4 border-brand-orange flex flex-col items-center sm:flex-row sm:items-center sm:justify-between gap-6 shadow-2xl relative w-full lg:max-w-md mx-auto lg:mx-0 z-40"
              >
                <div className="text-center sm:text-left space-y-1">
                  <span className="font-sans text-[11px] tracking-[0.4em] uppercase text-brand-orange font-black">
                    Featured Horizon
                  </span>
                  <p className="font-serif text-lg sm:text-xl text-brand-navy font-bold italic">
                    Bespoke High-Rise Living
                  </p>
                </div>
                <div className="flex -space-x-3">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-10 h-10 rounded-none border-2 border-white bg-slate-200 overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="Agent" className="w-full h-full object-cover" />
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-none border-2 border-white bg-brand-navy text-white flex items-center justify-center text-[10px] font-black">
                    +15
                  </div>
                </div>
              </motion.div>
            </motion.div>
            <motion.form
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45, ease: "easeOut" }}
              onSubmit={handleSearchSubmit}
              className="bg-white p-4 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-t-8 border-brand-orange max-w-2xl mx-auto lg:ml-0 relative z-30 transition-all duration-500 hover:shadow-[0_25px_60px_rgba(0,0,0,0.4)] order-3 mt-12 lg:mt-0"
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
                      onChange={(e) => {
                        setKeyword(e.target.value);
                        setShowSuggestions(true);
                      }}
                      onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                      onFocus={() => setShowSuggestions(true)}
                      placeholder="e.g. Bole, Old Airport..."
                      className="w-full bg-[#FAFAF8] border border-slate-200 py-3 pl-10 pr-4 text-brand-navy focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all placeholder:text-slate-400 font-sans text-sm"
                    />

                    {/* Suggestions Dropdown */}
                    <AnimatePresence>
                      {showSuggestions && filteredSuggestions.length > 0 && (
                        <motion.ul
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute top-full left-0 right-0 mt-1 bg-brand-navy border border-white/10 shadow-2xl z-[100] max-h-60 overflow-y-auto"
                        >
                          {filteredSuggestions.map((suggestion) => (
                            <li
                              key={suggestion}
                              onClick={() => {
                                setKeyword(suggestion);
                                setShowSuggestions(false);
                              }}
                              className="px-4 py-3 text-white/80 hover:text-white hover:bg-brand-orange/20 cursor-none transition-colors border-b border-white/5 last:border-b-0 text-xs font-sans tracking-wide"
                            >
                              {suggestion}
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
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
        </div>
      </div>
    </section>
  );
}
