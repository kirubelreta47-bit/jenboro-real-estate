import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight, Play } from "lucide-react";

interface VirtualTourProps {
  isOpen: boolean;
  onClose: () => void;
}

const SLIDES = [
  { image: "/images/construction-update-1.jpg", label: "Building Progress" },
  { image: "/images/construction-update-2.jpg", label: "Construction Update" },
  { image: "/images/interior-1.jpg", label: "Interior Living Space" },
  { image: "/images/interior-2.jpg", label: "Interior Design" },
  { image: "/images/interior-3.jpg", label: "Interior Finishing" },
  { image: "/images/interior-4.jpg", label: "Interior Details" },
  { image: "/images/listing-ad-1.jpg", label: "Residence View" },
  { image: "/images/listing-ad-2.jpg", label: "Building Exterior" },
  { image: "/images/listing-ad-3.jpg", label: "Property Overview" },
  { image: "/images/listing-ad-4.jpg", label: "Surrounding Area" },
  { image: "/images/listing-ad-5.jpg", label: "Neighborhood" },
  { image: "/images/listing-ad-6.jpg", label: "Location View" },
];

export default function VirtualTour({ isOpen, onClose }: VirtualTourProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const totalSlides = SLIDES.length;
  const isFinalSlide = currentIndex === totalSlides;

  const nextSlide = useCallback(() => {
    if (currentIndex < totalSlides) {
      setCurrentIndex((prev) => prev + 1);
    }
  }, [currentIndex, totalSlides]);

  const prevSlide = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex]);

  useEffect(() => {
    if (!isOpen) {
      setCurrentIndex(0);
      setIsAutoPlaying(true);
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setIsAutoPlaying(false);
        nextSlide();
      } else if (e.key === "ArrowLeft") {
        setIsAutoPlaying(false);
        prevSlide();
      } else if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, nextSlide, prevSlide, onClose]);

  useEffect(() => {
    if (isOpen && isAutoPlaying && !isFinalSlide) {
      const interval = setInterval(() => {
        nextSlide();
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isOpen, isAutoPlaying, isFinalSlide, nextSlide]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center overflow-hidden h-svh w-full">
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-white/10 z-[10010]">
        <motion.div
          className="h-full bg-brand-orange"
          initial={{ width: "0%" }}
          animate={{ width: `${((currentIndex + 1) / (totalSlides + 1)) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>

      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-[10010] p-2 text-white/70 hover:text-white transition-colors"
      >
        <X className="w-8 h-8" />
      </button>

      {/* Content */}
      <div className="relative w-full h-full flex flex-col">
        <AnimatePresence mode="wait">
          {!isFinalSlide ? (
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0"
            >
              <div className="relative w-full h-full overflow-hidden">
                {/* Ken Burns Image */}
                <motion.img
                  key={`img-${currentIndex}`}
                  src={SLIDES[currentIndex].image}
                  className="w-full h-full object-cover"
                  initial={{ scale: 1 }}
                  animate={{ scale: 1.08 }}
                  transition={{ duration: 6, ease: "linear" }}
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />

                {/* Text Content */}
                <div className="absolute bottom-12 left-8 sm:bottom-20 sm:left-20 z-10">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                  >
                    <span className="text-brand-orange text-[10px] sm:text-xs tracking-[0.4em] uppercase font-bold block mb-2">
                      VIRTUAL TOUR
                    </span>
                    <h2 className="text-white text-3xl sm:text-5xl md:text-6xl font-black font-serif tracking-tight mb-4">
                      {SLIDES[currentIndex].label}
                    </h2>
                    <span className="text-white/50 text-xs sm:text-sm font-sans tracking-widest font-black uppercase">
                      {String(currentIndex + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
                    </span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="final-slide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black flex flex-col items-center justify-center text-center p-6"
            >
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <div className="space-y-4">
                  <h1 className="text-white text-4xl sm:text-6xl font-serif font-black tracking-tight uppercase">
                    JENBORO REAL ESTATE
                  </h1>
                  <p className="text-white/70 text-lg sm:text-2xl font-light">
                    Experience it in person
                  </p>
                </div>

                <motion.a
                  href="https://wa.me/251911000000?text=I'd like to book a private viewing"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center space-x-3 bg-brand-orange text-white px-8 py-4 sm:px-12 sm:py-5 text-sm sm:text-base font-black uppercase tracking-[0.2em] shadow-[0_0_30px_rgba(232,119,34,0.4)] hover:shadow-[0_0_50px_rgba(232,119,34,0.6)] transition-all duration-300"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Book a Private Viewing</span>
                </motion.a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Arrows */}
        {!isFinalSlide && (
          <>
            <button
              onClick={() => {
                setIsAutoPlaying(false);
                prevSlide();
              }}
              disabled={currentIndex === 0}
              className={`absolute left-4 sm:left-10 top-1/2 -translate-y-1/2 z-[10010] w-12 h-12 sm:w-16 sm:h-16 rounded-full border border-white/20 bg-white/10 flex items-center justify-center text-white hover:bg-white hover:text-brand-navy transition-all duration-300 ${currentIndex === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button
              onClick={() => {
                setIsAutoPlaying(false);
                nextSlide();
              }}
              className="absolute right-4 sm:right-10 top-1/2 -translate-y-1/2 z-[10010] w-12 h-12 sm:w-16 sm:h-16 rounded-full border border-white/20 bg-white/10 flex items-center justify-center text-white hover:bg-white hover:text-brand-navy transition-all duration-300"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </>
        )}

        {/* Navigation Dots */}
        {!isFinalSlide && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[10010] flex space-x-3">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setCurrentIndex(i);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-500 ${i === currentIndex ? 'w-8 bg-brand-orange' : 'bg-white/30'}`}
              />
            ))}
            <button
              onClick={() => {
                setIsAutoPlaying(false);
                setCurrentIndex(totalSlides);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-500 ${isFinalSlide ? 'w-8 bg-brand-orange' : 'bg-white/30'}`}
            />
          </div>
        )}
      </div>
    </div>
  );
}
