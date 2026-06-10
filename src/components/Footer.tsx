import { MouseEvent } from "react";
import { Landmark, Mail, Phone, MapPin, Instagram, Linkedin, Twitter } from "lucide-react";
import { motion } from "motion/react";
import CompanyLogo from "../assets/images/jenboro_logo_varieties_02.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: "Home", href: "#home" },
    { label: "Properties Catalog", href: "#properties" },
    { label: "Boutique Services", href: "#services" },
    { label: "Client Testimonials", href: "#testimonials" },
  ];

  const primeZones = [
    { name: "Bole District", cords: "Zone-1 Elite Retail" },
    { name: "Old Airport", cords: "Zone-2 Diplomatic" },
    { name: "Kazanchis", cords: "Zone-3 Corporate" },
    { name: "Entoto Hills", cords: "Zone-4 Highland Retreats" },
  ];

  const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - bodyRect > 0 ? elementPosition - offset : 0;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <footer id="contact" className="bg-[#0A1E37] text-white pt-24 pb-12 border-t border-brand-navy-light relative z-20">
      
      {/* Decorative vertical lines */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none overflow-hidden">
        <div className="max-w-7xl mx-auto h-full grid grid-cols-4 gap-0">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="border-r border-white h-full"></div>
          ))}
        </div>
      </div>

      {/* Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 pb-20 border-b border-white/[0.06]">
          
          {/* Logo & Manifesto Block */}
          <div className="md:col-span-4 space-y-8 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center">
              <img
                src={CompanyLogo}
                alt="Jenboro Real Estate Logo"
                className="h-10 w-auto object-contain"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = "none";
                  const fallback = document.getElementById("footer-logo-fallback");
                  if (fallback) fallback.style.display = "flex";
                }}
              />
              <div id="footer-logo-fallback" className="hidden items-center space-x-2.5">
                <div className="w-9 h-9 bg-brand-orange text-white flex items-center justify-center">
                  <Landmark className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-base tracking-wide font-bold">JENBORO</span>
                  <span className="font-sans text-[9px] tracking-widest text-[#FDEBD0]/80">REAL ESTATE</span>
                </div>
              </div>
            </div>

            <p className="font-sans text-sm text-slate-400 font-light leading-relaxed max-w-sm">
              An authoritative registry of luxury architecture. Establishing timeless structures and offering premium acquisition consultation since 2014.
            </p>

            {/* Social icons */}
            <div className="flex items-center space-x-5">
              <motion.a 
                href="https://www.instagram.com/jenboro_realestate_aa/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, color: "#FFB066" }}
                className="w-10 h-10 rounded-none border border-white/10 flex items-center justify-center text-slate-400 hover:border-brand-orange transition-all duration-300"
              >
                <Instagram className="w-4 h-4" />
              </motion.a>
              {[Linkedin, Twitter].map((Icon, i) => (
                <motion.a 
                  key={i}
                  href={`#social-${i}`} 
                  whileHover={{ y: -3, color: "#FFB066" }}
                  className="w-10 h-10 rounded-none border border-white/10 flex items-center justify-center text-slate-400 hover:border-brand-orange transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links column */}
          <div className="md:col-span-2 space-y-6 text-center md:text-left">
            <h4 className="font-serif text-[10px] font-black tracking-[0.25em] text-brand-orange uppercase">
              Discover
            </h4>
            <ul className="space-y-4 font-sans text-xs text-slate-400 font-bold uppercase tracking-widest">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="hover:text-white transition-colors flex items-center justify-center md:justify-start group"
                  >
                    <span className="w-0 h-[1px] bg-brand-orange transition-all duration-300 group-hover:w-2 mr-0 group-hover:mr-2"></span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details Column */}
          <div className="md:col-span-3 space-y-6 text-center md:text-left">
            <h4 className="font-serif text-[10px] font-black tracking-[0.25em] text-brand-orange uppercase">
              Headquarters
            </h4>
            <ul className="space-y-5 font-sans text-[11px] text-slate-400 font-medium">
              <li className="flex flex-col md:flex-row items-center md:items-start space-y-2 md:space-y-0 md:space-x-3">
                <MapPin className="w-4 h-4 text-brand-orange shrink-0" />
                <span className="leading-relaxed hover:text-white transition-colors">
                  Africa Avenue Road, House #1405, 12th Floor, Addis Ababa
                </span>
              </li>
              <li className="flex flex-col md:flex-row items-center md:items-start space-y-2 md:space-y-0 md:space-x-3">
                <Phone className="w-4 h-4 text-brand-orange shrink-0" />
                <span className="hover:text-white transition-colors">+251 911 234 567 / +251 116 888 999</span>
              </li>
              <li className="flex flex-col md:flex-row items-center md:items-start space-y-2 md:space-y-0 md:space-x-3">
                <Mail className="w-4 h-4 text-brand-orange shrink-0" />
                <span className="hover:text-white transition-colors lowercase">concierge@jenbororealestate.com</span>
              </li>
            </ul>
          </div>

          {/* Prime Zone Registry representation */}
          <div className="md:col-span-3 space-y-6 text-center md:text-left">
            <h4 className="font-serif text-[10px] font-black tracking-[0.25em] text-brand-orange uppercase">
              Prime Zones
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {primeZones.map((zone, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-white/[0.02] border border-white/[0.04] text-[10px] space-y-1 hover:bg-white/[0.05] transition-colors"
                >
                  <p className="font-black text-white tracking-widest uppercase">{zone.name}</p>
                  <p className="text-slate-500 font-bold tracking-tighter">{zone.cords}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Sub-footer copyright */}
        <div className="pt-10 flex flex-col sm:flex-row justify-between items-center text-[9px] text-slate-500 font-sans tracking-[0.3em] uppercase font-bold text-center sm:text-left space-y-6 sm:space-y-0">
          <p className="leading-loose">&copy; {currentYear} Jenboro Architectural Real Estate. <br className="sm:hidden" /> All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <a href="#privacy" className="hover:text-brand-orange transition-colors">Privacy Code</a>
            <span className="text-white/10 hidden sm:block">|</span>
            <a href="#terms" className="hover:text-brand-orange transition-colors">Transaction Protocol</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
