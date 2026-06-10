import { useState, useMemo } from "react";
import Navbar from "./components/Navbar";
import Hero, { FilterState } from "./components/Hero";
import Stats from "./components/Stats";
import ListingCard from "./components/ListingCard";
import Services from "./components/Services";
import Testimonials from "./components/Testimonials";
import CTABanner from "./components/CTABanner";
import Footer from "./components/Footer";
import ListPropertyModal from "./components/ListPropertyModal";
import ListingDetailModal from "./components/ListingDetailModal";
import ConciergeChat from "./components/ConciergeChat";
import ConstructionUpdates from "./components/ConstructionUpdates";
import PropertyInquiry from "./components/PropertyInquiry";
import BackToTop from "./components/BackToTop";


import { INITIAL_PROPERTIES, AGENTS } from "./data/listings";
import { Property, NewListingInput, PropertyType } from "./types";
import { SlidersHorizontal, ArrowUpDown, RefreshCw, Layers } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [properties, setProperties] = useState<Property[]>(INITIAL_PROPERTIES);
  const [filters, setFilters] = useState<FilterState>({
    keyword: "",
    type: "All",
    maxPrice: 6000000,
  });

  // Sort state
  const [sortBy, setSortBy] = useState<"price-asc" | "price-desc" | "area-desc" | "default">("default");

  // Property modal triggers
  const [isListPropertyOpen, setIsListPropertyOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  // Computed location tags
  const availableLocations = useMemo(() => {
    const locations = properties.map((p) => p.location);
    return Array.from(new Set(locations));
  }, [properties]);

  // Handle live search & filtering
  const filteredProperties = useMemo(() => {
    let result = properties.filter((prop) => {
      // Filter by Keyword (matching location, title, or description)
      const matchesKeyword =
        filters.keyword === "" ||
        prop.location.toLowerCase().includes(filters.keyword.toLowerCase()) ||
        prop.title.toLowerCase().includes(filters.keyword.toLowerCase()) ||
        prop.description.toLowerCase().includes(filters.keyword.toLowerCase());

      // Filter by Property Type
      const matchesType = filters.type === "All" || prop.type === filters.type;

      // Filter by Maximum Budget Limit
      const matchesPrice = prop.price <= filters.maxPrice;

      return matchesKeyword && matchesType && matchesPrice;
    });

    // Apply Sorting logic
    if (sortBy === "price-asc") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortBy === "area-desc") {
      result = [...result].sort((a, b) => b.area - a.area);
    }

    return result;
  }, [properties, filters, sortBy]);

  // Handle adding a new property listed by the client
  const handleAddNewListing = (input: NewListingInput) => {
    // Choose a gorgeous realistic Unsplash luxury property image dynamically based on architectural type
    const preloadedImages: Record<PropertyType, string[]> = {
      Villa: [
        "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      ],
      Penthouse: [
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
      ],
      Townhome: [
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
      ],
      Apartment: [
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
      ],
    };

    const typeImages = preloadedImages[input.type] || preloadedImages.Villa;
    const randomImage = typeImages[Math.floor(Math.random() * typeImages.length)];

    // Assign a random partner broker to the newly listed property
    const randomAgent = AGENTS[Math.floor(Math.random() * AGENTS.length)];

    const newProperty: Property = {
      id: `prop-custom-${Date.now()}`,
      title: input.title,
      type: input.type,
      price: input.price,
      location: input.location,
      bedrooms: input.bedrooms,
      bathrooms: input.bathrooms,
      area: input.area,
      image: randomImage,
      description: input.description,
      features: input.features.length > 0 ? input.features : ["Security screening", "Integrated power backup", "Modern styling"],
      agent: randomAgent,
      yearBuilt: new Date().getFullYear(),
      status: input.status,
    };

    setProperties((prev) => [newProperty, ...prev]);
  };

  const handleResetFilters = () => {
    setFilters({
      keyword: "",
      type: "All",
      maxPrice: 6000000,
    });
    setSortBy("default");
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="bg-brand-bg min-h-screen text-brand-navy flex flex-col font-sans selection:bg-brand-orange-light selection:text-brand-navy relative overflow-x-hidden w-full"
    >
      <BackToTop />
      
      {/* Decorative Page-wide Elements */}
      <div className="fixed inset-0 pointer-events-none z-[5] overflow-hidden">
        <div className="absolute top-[15%] right-[-5%] w-[40vw] h-[40vw] bg-brand-orange/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[10%] left-[-10%] w-[50vw] h-[50vw] bg-brand-navy/5 blur-[150px] rounded-full"></div>
      </div>

      {/* 40px Sticky Navbar */}
      <Navbar 
        onListPropertyClick={() => setIsListPropertyOpen(true)}
        onCategorySelect={(type) => setFilters(prev => ({ ...prev, type: type as any }))}
      />

      {/* Hero Header Search */}
      <Hero
        onFilterChange={setFilters}
        availableLocations={availableLocations}
      />

      {/* Trust & Experience Strip */}
      <Stats />

      {/* Primary Catalog Showcase */}
      <main id="properties" className="py-12 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12 gap-6">
          {/* Section heading */}
          <div className="space-y-4">
            <div className="inline-flex items-center space-x-2.5">
              <span className="w-10 h-[1px] bg-brand-orange"></span>
              <span className="font-sans text-xs tracking-[0.25em] uppercase text-brand-orange font-bold">
                Exclusive Catalog
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-brand-navy tracking-tight">
              Featured Horizons
            </h2>
            <p className="font-sans text-xs sm:text-sm text-slate-500 max-w-xl font-light leading-relaxed">
              Browse our architectural listings, from monolith steel frames to modern brutalist concrete structures. Set your constraints to match your design palette.
            </p>
          </div>

          {/* Filtering Quick Tab Buttons & Sorting controls */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 gap-6 overflow-hidden">
            {/* Category horizontal filters */}
            <div className="flex bg-slate-100/80 p-1 border border-slate-200 rounded-none overflow-x-auto max-w-full hide-scrollbar touch-pan-x">
              {(["All", "Villa", "Penthouse", "Townhome", "Apartment"] as const).map((t) => (
                <motion.button
                  key={t}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFilters((prev) => ({ ...prev, type: t }))}
                  className={`px-5 py-2 text-[10px] font-sans uppercase font-black tracking-[0.2em] transition-all duration-300 whitespace-nowrap ${
                    filters.type === t
                      ? "bg-brand-navy text-white shadow-xl"
                      : "text-brand-navy/50 hover:text-brand-navy"
                  }`}
                >
                  {t}
                </motion.button>
              ))}
            </div>

            {/* Price/Area Sorter */}
            <div className="relative group">
              <div className="flex items-center space-x-2 bg-[#FAFAF8] border border-slate-200 px-4 py-2.5 transition-all group-hover:border-brand-orange">
                <ArrowUpDown className="w-3.5 h-3.5 text-brand-orange" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent border-none text-[10px] font-black font-sans tracking-[0.15em] uppercase text-brand-navy focus:outline-none appearance-none pr-8 cursor-pointer"
                >
                  <option value="default">Authoritative Order</option>
                  <option value="price-asc">Price: Ascending</option>
                  <option value="price-desc">Price: Descending</option>
                  <option value="area-desc">Area: Premium size</option>
                </select>
                <div className="pointer-events-none absolute right-3 top-4 flex items-center text-slate-400">
                  <svg className="fill-current h-3 h-3 transition-transform group-focus-within:rotate-180" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Filter Tags Status bar */}
        {(filters.keyword !== "" || filters.type !== "All" || filters.maxPrice < 6000000) && (
          <div className="mb-6 flex flex-wrap items-center gap-2 pt-2 pb-4 animate-fadeIn">
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Active Limits:</span>
            {filters.keyword !== "" && (
              <span className="bg-brand-orange-light text-brand-orange text-[10px] tracking-wider uppercase font-bold px-2.5 py-1 flex items-center space-x-1 border border-brand-orange/10">
                <span>"{filters.keyword}"</span>
                <button
                  onClick={() => setFilters((prev) => ({ ...prev, keyword: "" }))}
                  className="font-bold hover:text-brand-navy ml-1"
                >
                  &times;
                </button>
              </span>
            )}
            {filters.type !== "All" && (
              <span className="bg-brand-orange-light text-brand-orange text-[10px] tracking-wider uppercase font-bold px-2.5 py-1 flex items-center space-x-1 border border-brand-orange/10">
                <span>Type: {filters.type}</span>
                <button
                  onClick={() => setFilters((prev) => ({ ...prev, type: "All" }))}
                  className="font-bold hover:text-brand-navy ml-1"
                >
                  &times;
                </button>
              </span>
            )}
            {filters.maxPrice < 6000000 && (
              <span className="bg-brand-orange-light text-brand-orange text-[10px] tracking-wider uppercase font-bold px-2.5 py-1 flex items-center space-x-1 border border-brand-orange/10">
                <span>Max: ${filters.maxPrice.toLocaleString()}</span>
                <button
                  onClick={() => setFilters((prev) => ({ ...prev, maxPrice: 6000000 }))}
                  className="font-bold hover:text-brand-navy ml-1"
                >
                  &times;
                </button>
              </span>
            )}
            <button
              onClick={handleResetFilters}
              className="text-[10px] text-brand-navy font-bold hover:text-brand-orange uppercase tracking-wider underline ml-2 flex items-center space-x-1"
            >
              <RefreshCw className="w-3 h-3 text-brand-orange" />
              <span>Reset State</span>
            </button>
          </div>
        )}

        {/* 3-Column Card Grid Container with Layout Animation */}
        <AnimatePresence mode="popLayout">
          {filteredProperties.length > 0 ? (
            <motion.div
              layout
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-11"
              id="properties-grid"
            >
              {filteredProperties.map((property) => (
                <motion.div
                  key={property.id}
                  layout
                  variants={{
                    hidden: { opacity: 0, y: 30, scale: 0.95 },
                    visible: { opacity: 1, y: 0, scale: 1 }
                  }}
                  exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <ListingCard
                    property={property}
                    onViewDetails={() => setSelectedProperty(property)}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-24 bg-slate-50 border border-slate-200 space-y-4 max-w-xl mx-auto"
              id="empty-properties-state"
            >
              <div className="w-12 h-12 rounded-full border border-slate-350 flex items-center justify-center mx-auto text-slate-450 bg-white">
                <Layers className="w-5 h-5 text-slate-400" />
              </div>
              <div className="space-y-1.5">
                <h4 className="font-serif text-xl font-bold tracking-tight text-brand-navy">
                  No Properties Match Your Parameters
                </h4>
                <p className="font-sans text-xs text-slate-450 leading-relaxed font-light">
                  Our current curation does not contain listings in these exact budget or spatial configurations. Try scaling back your query constraints.
                </p>
              </div>
              <button
                type="button"
                onClick={handleResetFilters}
                className="px-6 py-2 bg-brand-navy text-[#FAFAF8] text-xs font-semibold uppercase tracking-widest hover:bg-brand-orange hover:text-white transition-all duration-300"
              >
                Clear Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Construction Updates Section */}
      <ConstructionUpdates />

      {/* Bespoke Property Inquiry / "What you want" Section */}
      <PropertyInquiry />


      {/* Curated operational services list */}
      <Services />

      {/* Diplomatic Client Testimonials */}
      <Testimonials />

      {/* Engaging call to action */}
      <CTABanner />

      {/* Absolute responsive footer with office listings */}
      <Footer />

      {/* Modals & Dialog Portals */}
      <ListPropertyModal
        isOpen={isListPropertyOpen}
        onClose={() => setIsListPropertyOpen(false)}
        onSubmit={handleAddNewListing}
      />

      <ListingDetailModal
        property={selectedProperty}
        onClose={() => setSelectedProperty(null)}
        onBookTour={(request) => {
          // Store tour requests locally or handle them
          console.log("Visit Scheduler request securely placed:", request);
        }}
      />

      {/* Floating Concierge Chat Workspace */}
      <ConciergeChat />
    </motion.div>
  );
}
