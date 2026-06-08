import { useState, FormEvent } from "react";
import { X, CheckCircle, FileText, DollarSign, MapPin, Sparkles } from "lucide-react";
import { NewListingInput, PropertyType } from "../types";
import { motion, AnimatePresence } from "motion/react";

interface ListPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (input: NewListingInput) => void;
}

export default function ListPropertyModal({ isOpen, onClose, onSubmit }: ListPropertyModalProps) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState<PropertyType>("Villa");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [bedrooms, setBedrooms] = useState("3");
  const [bathrooms, setBathrooms] = useState("2.5");
  const [area, setArea] = useState("");
  const [description, setDescription] = useState("");
  const [featuresCsv, setFeaturesCsv] = useState("");
  const [status, setStatus] = useState<"For Sale" | "For Rent">("For Sale");
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!title || !price || !location || !area || !description) {
      alert("Please provide all essential metadata details for this properties listing.");
      return;
    }

    const priceNum = parseFloat(price);
    const areaNum = parseFloat(area);
    const bedsNum = parseInt(bedrooms);
    const bathsNum = parseFloat(bathrooms);

    if (isNaN(priceNum) || isNaN(areaNum)) {
      alert("Please ensure valid mathematical numbers are introduced for Price and Area parameters.");
      return;
    }

    const featuresList = featuresCsv
      ? featuresCsv.split(",").map((f) => f.trim()).filter((f) => f.length > 0)
      : ["Smart Home Grid", "Private Entry Gate", "Scenic Outlook", "High Ventilation Design"];

    onSubmit({
      title,
      type,
      price: priceNum,
      location,
      bedrooms: bedsNum,
      bathrooms: bathsNum,
      area: areaNum,
      description,
      features: featuresList,
      status,
    });

    setIsSuccess(true);
  };

  const handleResetAndClose = () => {
    setTitle("");
    setPrice("");
    setLocation("");
    setArea("");
    setDescription("");
    setFeaturesCsv("");
    setIsSuccess(false);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto" id="list-property-modal">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-brand-navy/80 backdrop-blur-sm"
        ></motion.div>

        {/* Form Container */}
        <div className="flex min-h-screen items-center justify-center p-4 sm:p-6 md:p-10 relative z-10">
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 180 }}
            className="w-full max-w-2xl bg-[#FAFAF8] border border-slate-300 shadow-2xl relative overflow-hidden"
          >
            {/* Top Close Bar */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-20 p-2 text-[#0F2D52] hover:text-brand-orange hover:bg-slate-100 transition-all"
              aria-label="Close modal"
              id="list-property-close-btn"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Accent Border Line */}
            <div className="w-full h-1.5 bg-brand-orange"></div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 md:p-10">
              {!isSuccess ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Header info */}
                  <div className="space-y-1.5">
                    <h3 className="font-serif text-2xl font-bold tracking-tight text-brand-navy">
                      Settle Your Property Listing
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-slate-500 font-light">
                      Submit details of your luxury villa or premium penthouse. Our team will verify and authorize publication.
                    </p>
                  </div>

                  {/* Form fields */}
                  <div className="space-y-4">
                    {/* Title */}
                    <div className="space-y-1">
                      <label className="block text-[10px] tracking-widest uppercase text-brand-navy/70 font-semibold font-sans">
                        Property Official Title
                      </label>
                      <input
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. The Travertine Canopy Estate"
                        className="w-full bg-slate-100/50 border border-slate-200 py-2.5 px-3 text-xs text-brand-navy focus:outline-none focus:border-brand-orange font-sans"
                        id="list-prop-title-input"
                      />
                    </div>

                    {/* Type, Price, Status Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {/* Property Type */}
                      <div className="space-y-1">
                        <label className="block text-[10px] tracking-widest uppercase text-brand-navy/70 font-semibold font-sans">
                          Property Type
                        </label>
                        <select
                          value={type}
                          onChange={(e) => setType(e.target.value as PropertyType)}
                          className="w-full bg-slate-100/50 border border-slate-200 py-2.5 px-3 text-xs text-brand-navy focus:outline-none focus:border-brand-orange font-sans appearance-none"
                        >
                          <option value="Villa">Villa</option>
                          <option value="Penthouse">Penthouse</option>
                          <option value="Townhome">Townhome</option>
                          <option value="Apartment">Apartment</option>
                        </select>
                      </div>

                      {/* Listing Contract Type */}
                      <div className="space-y-1">
                        <label className="block text-[10px] tracking-widest uppercase text-brand-navy/70 font-semibold font-sans">
                          Contract Offer
                        </label>
                        <div className="flex space-x-1.5 pt-0.5">
                          <button
                            type="button"
                            onClick={() => setStatus("For Sale")}
                            className={`flex-1 text-[10px] tracking-wider uppercase font-bold py-2 border transition-all ${
                              status === "For Sale"
                                ? "bg-brand-navy text-white border-brand-navy"
                                : "bg-white text-brand-navy border-slate-205 hover:bg-slate-50"
                            }`}
                          >
                            For Sale
                          </button>
                          <button
                            type="button"
                            onClick={() => setStatus("For Rent")}
                            className={`flex-1 text-[10px] tracking-wider uppercase font-bold py-2 border transition-all ${
                              status === "For Rent"
                                ? "bg-brand-navy text-white border-brand-navy"
                                : "bg-white text-brand-navy border-slate-205 hover:bg-slate-50"
                            }`}
                          >
                            For Rent
                          </button>
                        </div>
                      </div>

                      {/* Pricing Valuation */}
                      <div className="space-y-1">
                        <label className="block text-[10px] tracking-widest uppercase text-brand-navy/70 font-semibold font-sans">
                          Valuation ($ USD)
                        </label>
                        <div className="relative">
                          <DollarSign className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-slate-400" />
                          <input
                            type="number"
                            required
                            min="1000"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="e.g. 1750000"
                            className="w-full bg-slate-100/50 border border-slate-200 py-2.5 pl-7 pr-3 text-xs text-brand-navy focus:outline-none focus:border-brand-orange font-sans"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Location & Area Metric */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Location details */}
                      <div className="space-y-1">
                        <label className="block text-[10px] tracking-widest uppercase text-[#0F2D52]/70 font-semibold font-sans">
                          Property Location / District
                        </label>
                        <div className="relative">
                          <MapPin className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-slate-400" />
                          <input
                            type="text"
                            required
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="e.g. Bole, Addis Ababa"
                            className="w-full bg-slate-100/50 border border-slate-200 py-2.5 pl-7 pr-3 text-xs text-brand-navy focus:outline-none focus:border-brand-orange font-sans"
                          />
                        </div>
                      </div>

                      {/* Area size sqm */}
                      <div className="space-y-1">
                        <label className="block text-[10px] tracking-widest uppercase text-[#0F2D52]/70 font-semibold font-sans">
                          Build Area (sq. meters)
                        </label>
                        <input
                          type="number"
                          required
                          value={area}
                          onChange={(e) => setArea(e.target.value)}
                          placeholder="e.g. 450"
                          className="w-full bg-slate-100/50 border border-slate-200 py-2.5 px-3 text-xs text-brand-navy focus:outline-none focus:border-brand-orange font-sans"
                        />
                      </div>
                    </div>

                    {/* Beds and Baths selectors */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="block text-[10px] tracking-widest uppercase text-brand-navy/70 font-semibold font-sans">
                          Bedrooms count
                        </label>
                        <select
                          value={bedrooms}
                          onChange={(e) => setBedrooms(e.target.value)}
                          className="w-full bg-slate-100/50 border border-slate-200 py-2.5 px-3 text-xs text-brand-navy focus:outline-none focus:border-brand-orange font-sans appearance-none"
                        >
                          <option value="1">1 Bed</option>
                          <option value="2">2 Beds</option>
                          <option value="3">3 Beds</option>
                          <option value="4">4 Beds</option>
                          <option value="5">5 Beds</option>
                          <option value="6">6+ Beds</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[10px] tracking-widest uppercase text-brand-navy/70 font-semibold font-sans">
                          Bathrooms count
                        </label>
                        <select
                          value={bathrooms}
                          onChange={(e) => setBathrooms(e.target.value)}
                          className="w-full bg-slate-100/50 border border-slate-200 py-2.5 px-3 text-xs text-brand-navy focus:outline-none focus:border-brand-orange font-sans appearance-none"
                        >
                          <option value="1">1 Bath</option>
                          <option value="1.5">1.5 Baths</option>
                          <option value="2">2 Baths</option>
                          <option value="2.5">2.5 Baths</option>
                          <option value="3">3 Baths</option>
                          <option value="3.5">3.5 Baths</option>
                          <option value="4">4+ Baths</option>
                        </select>
                      </div>
                    </div>

                    {/* Features CSV */}
                    <div className="space-y-1">
                      <label className="block text-[10px] tracking-widest uppercase text-[#0F2D52]/70 font-semibold font-sans">
                        Luxury Features (separated by commas)
                      </label>
                      <input
                        type="text"
                        value={featuresCsv}
                        onChange={(e) => setFeaturesCsv(e.target.value)}
                        placeholder="e.g. Underfloor Heating, Infinity Pool, Smart Grid, Sky Deck"
                        className="w-full bg-slate-100/50 border border-slate-200 py-2.5 px-3 text-xs text-brand-navy focus:outline-none focus:border-brand-orange font-sans"
                      />
                    </div>

                    {/* Narrative description */}
                    <div className="space-y-1">
                      <label className="block text-[10px] tracking-widest uppercase text-[#0F2D52]/70 font-semibold font-sans">
                        Narrative Editorial Description
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Detail the architectural style, material finishes, sunset perspectives..."
                        className="w-full bg-slate-100/50 border border-slate-200 py-2.5 px-3 text-xs text-brand-navy focus:outline-none focus:border-brand-orange font-sans resize-none"
                      ></textarea>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full bg-brand-navy hover:bg-brand-orange text-white text-xs uppercase tracking-widest font-bold py-3.5 transition-all duration-300"
                      id="list-prop-submit-btn"
                    >
                      Authenticate and List Property
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-center py-10 space-y-6">
                  <div className="w-16 h-16 bg-brand-orange-light text-brand-orange flex items-center justify-center rounded-full mx-auto animate-bounce">
                    <CheckCircle className="w-8 h-8" />
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-serif text-2xl font-bold tracking-tight text-brand-navy">
                      Authorized & Published Successfully
                    </h4>
                    <p className="font-sans text-sm text-slate-500 font-light max-w-md mx-auto leading-relaxed">
                      Your property, <span className="font-bold text-brand-navy">"{title}"</span>, has been uploaded and successfully integrated into our real-time inventory catalog.
                    </p>
                  </div>

                  <div className="p-4 bg-slate-100 text-left border border-slate-200 divide-y divide-slate-150 space-y-2">
                    <div className="flex items-center justify-between text-xs font-sans">
                      <span className="text-slate-400">Title:</span>
                      <span className="font-semibold text-brand-navy">{title}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs font-sans pt-2">
                      <span className="text-slate-400">Valuation:</span>
                      <span className="font-bold text-brand-navy">
                        ${parseFloat(price).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs font-sans pt-2">
                      <span className="text-slate-400">Location:</span>
                      <span className="font-semibold text-brand-navy">{location}</span>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-center space-x-3">
                    <button
                      type="button"
                      onClick={handleResetAndClose}
                      className="inline-flex items-center space-x-1.5 px-6 py-2.5 bg-brand-navy text-white text-xs uppercase tracking-widest font-semibold hover:bg-brand-orange transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Back to Catalog</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
