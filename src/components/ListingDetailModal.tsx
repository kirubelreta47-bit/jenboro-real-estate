import { useState, FormEvent } from "react";
import { X, Calendar, Clock, Phone, Mail, CheckCircle2, MapPin, Landmark, Hammer, ArrowRight } from "lucide-react";
import { Property, BookingRequest } from "../types";
import { motion, AnimatePresence } from "motion/react";

interface ListingDetailModalProps {
  property: Property | null;
  onClose: () => void;
  onBookTour: (request: Omit<BookingRequest, "propertyName" | "status">) => void;
}

export default function ListingDetailModal({ property, onClose, onBookTour }: ListingDetailModalProps) {
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!property) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail || !clientPhone || !preferredDate || !preferredTime) {
      alert("Please fill in all requested fields to secure your private tour reservation.");
      return;
    }

    onBookTour({
      propertyId: property.id,
      clientName,
      clientEmail,
      clientPhone,
      preferredDate,
      preferredTime,
      message,
    });

    setIsSubmitted(true);
  };

  const formattedPrice = property.price.toLocaleString();
  const priceDisplay = property.status === "For Rent" ? `$${formattedPrice}/mo` : `$${formattedPrice}`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto" id="listing-detail-modal">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-brand-navy/85 backdrop-blur-sm transition-opacity"
        ></motion.div>

        {/* Modal Wrapper Container */}
        <div className="flex min-h-screen items-center justify-center p-4 sm:p-6 md:p-10 relative z-10">
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 180 }}
            className="w-full max-w-5xl bg-[#FAFAF8] text-brand-navy border border-slate-300 shadow-2xl relative overflow-hidden flex flex-col md:flex-row md:max-h-[85vh]"
          >
            {/* Top Close Bar for mobile/universal */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-30 p-2.5 bg-brand-navy text-white hover:bg-brand-orange transition-colors duration-200"
              aria-label="Close modal"
              id="close-modal-top-btn"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Content / Media Portal */}
            <div className="w-full md:w-3/5 overflow-y-auto md:max-h-[85vh] scrollable-area">
              <div className="relative aspect-16/10">
                <img
                  src={property.image}
                  alt={property.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none"></div>
                <div className="absolute bottom-5 left-5 text-[#FAFAF8] space-y-1">
                  <span className="bg-brand-orange text-white text-[9px] tracking-widest uppercase font-bold px-2 py-0.5">
                    {property.status} &middot; {property.type}
                  </span>
                  <h2 className="font-serif text-xl sm:text-2xl tracking-wide">{property.title}</h2>
                </div>
              </div>

              {/* Gallery Thumbnails */}
              {property.gallery && property.gallery.length > 0 && (
                <div className="grid grid-cols-3 gap-2 p-4 bg-slate-50 border-b border-slate-200">
                  {property.gallery.map((img, idx) => (
                    <div key={idx} className="aspect-square relative group overflow-hidden bg-slate-200">
                      <img
                        src={img}
                        alt={`Interior view ${idx + 1}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Core info grids */}
              <div className="p-6 sm:p-8 space-y-8">
                {/* Highlights Strip */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-b border-slate-200 pb-6 text-center">
                  <div className="p-3 bg-slate-100/70">
                    <p className="text-[9px] tracking-widest uppercase text-slate-400">Listed At</p>
                    <p className="font-serif text-lg font-bold text-brand-navy mt-1">{priceDisplay}</p>
                  </div>
                  <div className="p-3 bg-slate-100/70">
                    <p className="text-[9px] tracking-widest uppercase text-slate-400">Bedrooms</p>
                    <p className="font-serif text-lg font-bold text-brand-navy mt-1">{property.bedrooms}</p>
                  </div>
                  <div className="p-3 bg-slate-100/70">
                    <p className="text-[9px] tracking-widest uppercase text-slate-400">Bathrooms</p>
                    <p className="font-serif text-lg font-bold text-brand-navy mt-1">{property.bathrooms}</p>
                  </div>
                  <div className="p-3 bg-slate-100/70">
                    <p className="text-[9px] tracking-widest uppercase text-slate-400">Area Size</p>
                    <p className="font-serif text-lg font-bold text-brand-navy mt-1">{property.area} m²</p>
                  </div>
                </div>

                {/* Narrative Description Section */}
                <div className="space-y-3">
                  <h3 className="font-serif text-xl font-semibold tracking-tight text-brand-navy">
                    Property Showcase
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-sans font-light">
                    {property.description}
                  </p>
                </div>

                {/* Features Checklist Grid */}
                <div className="space-y-4">
                  <h4 className="font-serif text-lg font-semibold tracking-tight text-brand-navy">
                    Bespoke Layout Features
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5" id="property-features-grid">
                    {property.features.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-2.5">
                        <CheckCircle2 className="w-4 h-4 text-brand-orange mt-0.5 flex-shrink-0" />
                        <span className="text-xs text-slate-700 font-sans tracking-wide">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Additional Metadata Strip */}
                <div className="pt-4 border-t border-slate-200 grid grid-cols-2 gap-4 text-xs font-sans">
                  <div className="flex items-center space-x-2">
                    <Hammer className="w-4 h-4 text-brand-orange" />
                    <span className="text-slate-400">Year Built:</span>
                    <span className="font-bold text-brand-navy">{property.yearBuilt}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Landmark className="w-4 h-4 text-brand-orange" />
                    <span className="text-slate-400">Location:</span>
                    <span className="font-bold text-brand-navy">{property.location.split(",")[0]}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Booking Engine & Agent Portal */}
            <div className="w-full md:w-2/5 bg-slate-100/80 border-t md:border-t-0 md:border-l border-slate-200 overflow-y-auto md:max-h-[85vh] p-6 sm:p-8 flex flex-col justify-between">
              
              {/* Agent info */}
              <div className="mb-6 pb-6 border-b border-slate-200">
                <span className="text-[9px] tracking-widest uppercase text-slate-400 block mb-3">Portfolio Advisor</span>
                <div className="flex items-center space-x-4">
                  <img
                    src={property.agent.image}
                    alt={property.agent.name}
                    className="w-14 h-14 object-cover"
                  />
                  <div>
                    <h5 className="font-serif text-base font-bold text-brand-navy">
                      {property.agent.name}
                    </h5>
                    <p className="font-sans text-[10px] text-brand-orange uppercase tracking-widest font-semibold">
                      {property.agent.role}
                    </p>
                    <div className="flex flex-col space-y-0.5 mt-2 text-[11px] text-slate-500 font-sans">
                      <a href={`tel:${property.agent.phone}`} className="flex items-center space-x-1.5 hover:text-brand-navy">
                        <Phone className="w-3 h-3 text-brand-orange" />
                        <span>{property.agent.phone}</span>
                      </a>
                      <a href={`mailto:${property.agent.email}`} className="flex items-center space-x-1.5 hover:text-brand-navy">
                        <Mail className="w-3 h-3 text-brand-orange" />
                        <span>{property.agent.email}</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Booking tour form */}
              <div className="flex-1">
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <h4 className="font-serif text-lg font-bold text-brand-navy leading-snug">
                        Schedule a Visit
                      </h4>
                      <p className="font-sans text-[11px] text-slate-400 mt-1">
                        Secure your exclusive, curated private viewing.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <input
                          type="text"
                          required
                          value={clientName}
                          onChange={(e) => setClientName(e.target.value)}
                          placeholder="Full Name"
                          className="w-full bg-[#FAFAF8] border border-slate-250 py-2 px-3 text-xs text-brand-navy focus:outline-none focus:border-brand-orange font-sans"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="email"
                          required
                          value={clientEmail}
                          onChange={(e) => setClientEmail(e.target.value)}
                          placeholder="Email Address"
                          className="w-full bg-[#FAFAF8] border border-slate-250 py-2 px-3 text-xs text-brand-navy focus:outline-none focus:border-brand-orange font-sans"
                        />
                        <input
                          type="tel"
                          required
                          value={clientPhone}
                          onChange={(e) => setClientPhone(e.target.value)}
                          placeholder="Phone / Mobile"
                          className="w-full bg-[#FAFAF8] border border-slate-250 py-2 px-3 text-xs text-brand-navy focus:outline-none focus:border-brand-orange font-sans"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="relative">
                          <Calendar className="absolute right-3 top-2.5 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                          <input
                            type="date"
                            required
                            value={preferredDate}
                            onChange={(e) => setPreferredDate(e.target.value)}
                            className="w-full bg-[#FAFAF8] border border-slate-250 py-2 pl-3 pr-8 text-xs text-brand-navy focus:outline-none focus:border-brand-orange font-sans appearance-none"
                          />
                        </div>
                        <div className="relative">
                          <Clock className="absolute right-3 top-2.5 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                          <input
                            type="time"
                            required
                            value={preferredTime}
                            onChange={(e) => setPreferredTime(e.target.value)}
                            className="w-full bg-[#FAFAF8] border border-slate-250 py-2 pl-3 pr-8 text-xs text-brand-navy focus:outline-none focus:border-brand-orange font-sans appearance-none"
                          />
                        </div>
                      </div>

                      <div>
                        <textarea
                          placeholder="Special requirements (e.g. airport picker, timing requests, security detail)"
                          value={message}
                          rows={2}
                          onChange={(e) => setMessage(e.target.value)}
                          className="w-full bg-[#FAFAF8] border border-slate-250 py-2 px-3 text-xs text-brand-navy focus:outline-none focus:border-brand-orange font-sans resize-none"
                        ></textarea>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-brand-navy text-white text-xs uppercase tracking-widest font-bold py-3 hover:bg-brand-orange hover:text-white transition-all duration-300 flex items-center justify-center space-x-1"
                    >
                      <span>Secure Invitation</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-6 bg-brand-navy border border-brand-navy-light text-center text-white space-y-4 shadow-xl"
                  >
                    <div className="h-12 w-12 rounded-full border border-brand-orange flex items-center justify-center mx-auto bg-brand-navy-light shrink-0">
                      <CheckCircle2 className="w-6 h-6 text-brand-orange animate-pulse" />
                    </div>
                    <div className="space-y-1.5">
                      <h4 className="font-serif text-lg font-bold tracking-wide">Invitation Placed</h4>
                      <p className="font-sans text-xs text-[#FDEBD0]/80 leading-relaxed">
                        Thank you, {clientName}. Meraf Solomon or Hann Alene will phone your line at <span className="text-brand-orange">{clientPhone}</span> shortly to approve your tour protocol.
                      </p>
                    </div>
                    <div className="pt-3">
                      <button
                        onClick={() => setIsSubmitted(false)}
                        className="text-[10px] uppercase font-bold tracking-widest text-[#FDEBD0] underline hover:text-brand-orange transition-colors"
                      >
                        Adjust Schedule
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Secure statement */}
              <p className="mt-4 text-[10px] text-center text-slate-400 font-sans tracking-wide leading-normal">
                🔐 Private viewing invitation protocols apply. Registered clients undergo standard security screening parameters.
              </p>

            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
