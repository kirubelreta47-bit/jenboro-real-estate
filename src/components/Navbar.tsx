import { useState, useEffect, MouseEvent } from "react";
import { Menu, X, Landmark, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import CompanyLogo from "../assets/images/jenboro_logo_varieties_02.png";

interface NavbarProps {
  onListPropertyClick: () => void;
  onCategorySelect?: (category: string) => void;
}

export default function Navbar({ onListPropertyClick, onCategorySelect }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      
      // Determine if scrolled enough for glass effect
      setIsScrolled(currentScrollY > 20);

      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false); // scrolling down
      } else {
        setIsVisible(true); // scrolling up
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Properties", href: "#properties" },
    { label: "Services", href: "#services" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
  ];

  const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <>
    <nav
      id="navbar"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 transform ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      } ${
        isScrolled
          ? "glass-dark py-2 shadow-2xl"
          : "bg-brand-navy/90 sm:bg-transparent py-4 sm:py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo Section */}
          <motion.a
            href="#home"
            onClick={(e) => handleLinkClick(e, "#home")}
            className="flex items-center select-none group relative z-[60]"
            id="nav-logo"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center select-none overflow-hidden h-14 sm:h-16">
              <img
                src={CompanyLogo}
                alt="Jenboro Real Estate Logo"
                className="w-auto object-contain transition-all duration-300"
                style={{ height: '100%', maxHeight: '60px', minHeight: '32px' }}
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = "none";
                  const fallback = document.getElementById("nav-logo-fallback");
                  if (fallback) fallback.style.display = "flex";
                }}
              />
              <div id="nav-logo-fallback" className="hidden items-center space-x-2">
                <div className="w-8 h-8 bg-brand-orange text-white flex items-center justify-center">
                  <Landmark className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-sm tracking-wide leading-none font-bold text-white">JENBORO</span>
                </div>
              </div>
            </div>
          </motion.a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-xs tracking-[0.2em] font-sans uppercase font-bold text-[#FAFAF8]/80 hover:text-brand-orange transition-all duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-orange transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* List Property Button */}
          <div className="hidden md:block">
            <motion.button
              onClick={onListPropertyClick}
              whileHover={{ scale: 1.05, backgroundColor: "#FFB066" }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center space-x-2 px-6 py-2.5 bg-transparent border border-brand-orange text-brand-orange hover:text-white text-[10px] uppercase tracking-[0.2em] font-bold transition-all duration-300"
              id="list-property-btn-desktop"
            >
              <span>List Property</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden relative z-[60]">
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.9 }}
              className="p-2 text-white hover:text-brand-orange focus:outline-none"
              aria-label="Toggle menu"
              id="mobile-menu-toggle"
            >
              {isMobileMenuOpen ? (
                <X className="w-7 h-7" />
              ) : (
                <Menu className="w-7 h-7" />
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </nav>

    {/* Mobile Drawer Backdrop - OUTSIDE nav to avoid inheriting nav transforms */}
    <AnimatePresence>
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 z-[998] bg-black/50 backdrop-blur-sm md:hidden"
        />
      )}
    </AnimatePresence>

    {/* Premium Side Bar Mobile Menu - OUTSIDE nav */}
    <AnimatePresence>
      {isMobileMenuOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed top-0 right-0 h-full w-[75%] max-w-sm z-[999] bg-[#0B1D3A] border-l border-white/10 flex flex-col px-6 py-8 md:hidden shadow-2xl overflow-y-auto"
          id="mobile-side-bar"
        >
          {/* Close Button */}
          <div className="flex justify-end mb-6">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-white hover:text-brand-orange transition-colors"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Sections */}
          <div className="flex flex-col w-full text-left">
            <h4 className="text-[10px] tracking-[0.25em] font-sans uppercase font-bold text-brand-orange mb-3">
              Sections
            </h4>
            {navLinks.map((link, index) => (
              <motion.a
                key={link.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 + index * 0.05 }}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="block text-lg font-serif tracking-wide text-white hover:text-brand-orange transition-colors duration-300 border-b border-white/10 py-4"
              >
                {link.label}
              </motion.a>
            ))}
          </div>

          {/* Categories Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35 }}
            className="mt-8"
          >
            <h4 className="text-[10px] tracking-[0.25em] font-sans uppercase font-bold text-brand-orange mb-4">
              Collections
            </h4>
            <div className="flex flex-col space-y-3 pl-3 border-l-2 border-brand-orange/30">
              {(["All", "Villa", "Penthouse", "Townhome", "Apartment"]).map((cat) => (
                <button
                  key={cat}
                  className="text-left text-sm font-sans tracking-wide text-white/70 hover:text-brand-orange transition-colors py-1"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    if (onCategorySelect) onCategorySelect(cat);
                    setTimeout(() => {
                      const element = document.querySelector("#properties");
                      if (element) {
                        const offsetPosition = element.getBoundingClientRect().top + window.scrollY - 80;
                        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
                      }
                    }, 100);
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>

          {/* List Property CTA */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.45 }}
            className="mt-auto pt-8"
          >
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onListPropertyClick();
              }}
              className="w-full flex items-center justify-center space-x-2 py-4 bg-brand-orange text-white text-[10px] uppercase tracking-[0.25em] font-bold shadow-lg"
              id="list-property-btn-mobile"
            >
              <span>List Property</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </motion.div>

          <div className="pt-6 text-brand-orange/40 text-[9px] tracking-[0.3em] font-sans uppercase font-bold text-center">
            Jenboro &copy; {new Date().getFullYear()}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}
