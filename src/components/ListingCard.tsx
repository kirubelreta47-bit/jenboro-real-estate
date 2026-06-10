import { Bed, Bath, Move, MapPin, ArrowRight } from "lucide-react";
import { Property } from "../types";
import { motion } from "motion/react";

interface ListingCardProps {
  property: Property;
  onViewDetails: () => void;
}

export default function ListingCard({ property, onViewDetails }: ListingCardProps) {
  // Format price nicely
  const formattedPrice = property.price.toLocaleString();
  const priceDisplay = property.status === "For Rent" ? `$${formattedPrice}/mo` : `$${formattedPrice}`;

  return (
    <article
      id={`property-card-${property.id}`}
      className="bg-[#FAFAF8] group border border-slate-200 overflow-hidden hover:border-brand-orange transition-all duration-500 hover:-translate-y-2 flex flex-col h-full shadow-sm hover:shadow-2xl relative"
    >
      {/* Property Image Container */}
      <div className="relative overflow-hidden aspect-4/3">
        {/* Shimmer Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 z-10 pointer-events-none"></div>

        {/* Status Tag */}
        <div className="absolute top-4 left-4 z-20 flex space-x-1.5 translate-y-0 group-hover:-translate-y-1 transition-transform duration-300">
          <span className="bg-brand-navy text-white text-[9px] tracking-[0.2em] uppercase font-black px-3 py-1.5 shadow-lg">
            {property.status}
          </span>
          <span className="bg-white/90 backdrop-blur-md text-brand-navy border border-white/20 text-[9px] tracking-[0.2em] uppercase font-black px-3 py-1.5 shadow-lg">
            {property.type}
          </span>
        </div>

        <motion.img
          src={property.image}
          alt={property.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />

        {/* Dynamic Shadow Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-brand-navy/0 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500 z-10"></div>
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between relative z-20 bg-white">
        <div className="space-y-3">
          {/* Neighborhood / Location tag in Orange */}
          <div className="flex items-center space-x-1.5 text-brand-orange">
            <MapPin className="w-3.5 h-3.5" />
            <span className="font-sans text-[10px] tracking-[0.25em] uppercase font-black">
              {property.location}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-serif text-lg sm:text-xl text-brand-navy leading-tight group-hover:text-brand-orange transition-colors duration-300 font-bold">
            {property.title}
          </h3>

          <p className="font-sans text-xs text-slate-500 line-clamp-2 leading-relaxed font-light">
            {property.description}
          </p>
        </div>

        {/* Metrics & Price Block */}
        <div className="mt-4 pt-3 sm:mt-6 sm:pt-5 border-t border-slate-100 space-y-4 sm:space-y-5">
          <div className="flex items-center justify-between text-slate-500">
            <div className="flex items-center space-x-2" title="Bedrooms">
              <Bed className="w-4 h-4 text-brand-orange" />
              <span className="text-[11px] font-bold font-sans uppercase tracking-tighter">
                {property.bedrooms} Bed
              </span>
            </div>

            <div className="flex items-center space-x-2" title="Bathrooms">
              <Bath className="w-4 h-4 text-brand-orange" />
              <span className="text-[11px] font-bold font-sans uppercase tracking-tighter">
                {property.bathrooms} Bath
              </span>
            </div>

            <div className="flex items-center space-x-2" title="Area size">
              <Move className="w-4 h-4 text-brand-orange" />
              <span className="text-[11px] font-bold font-sans uppercase tracking-tighter">{property.area} m²</span>
            </div>
          </div>

          <div className="flex justify-between items-center pt-1 border-t border-slate-50 pt-5">
            <div className="flex flex-col">
              <span className="text-[8px] tracking-[0.3em] uppercase text-slate-400 font-black">Private Valuation</span>
              <span className="font-serif text-xl font-black text-brand-navy tracking-tight">
                {priceDisplay}
              </span>
            </div>

            <motion.button
              onClick={onViewDetails}
              whileHover={{ x: 3 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-1.5 text-[10px] uppercase tracking-[0.25em] font-black text-brand-orange hover:text-brand-navy transition-all duration-300"
              id={`view-details-btn-${property.id}`}
            >
              <span>Explore</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </motion.button>
          </div>
        </div>
      </div>
    </article>
  );
}
