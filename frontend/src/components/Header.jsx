import React, { useState, useEffect } from "react";
import { ShoppingBag, Settings, Menu as MenuIcon, X, Sparkles, Gift } from "lucide-react";

const Header = ({ config, onAdminClick, onOrderClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showPromo, setShowPromo] = useState(true);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#accueil", label: "Accueil", icon: "🏠" },
    { href: "#menu", label: "Menu", icon: "🍽️" },
    { href: "#avis", label: "Avis", icon: "⭐" },
    { href: "#contact", label: "Contact", icon: "📞" },
  ];

  return (
    <>
      {/* Promo Banner - Spécial Fêtes */}
      {showPromo && !scrolled && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-red-600 via-amber-600 to-green-600 text-white py-2 px-4 animate-slideDown">
          <div className="container mx-auto flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 flex-1 justify-center md:justify-start">
              <Gift size={16} className="animate-bounce" />
              <span className="font-bold">
                🎄 SPÉCIAL FÊTES : -25% sur tous les menus | Livraison GRATUITE
              </span>
              <Sparkles size={16} className="animate-pulse" />
            </div>
            <button
              onClick={() => setShowPromo(false)}
              className="hover:bg-white/20 rounded-full p-1 transition-colors ml-2"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Main Header */}
      <header
        className={`fixed left-0 right-0 z-40 transition-all duration-500 ${
          showPromo && !scrolled ? 'top-10' : 'top-0'
        } ${
          scrolled 
            ? "bg-white/95 backdrop-blur-xl shadow-2xl py-3" 
            : "bg-gradient-to-b from-black/60 to-transparent backdrop-blur-sm py-4"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo avec animation */}
            <a href="#accueil" className="flex items-center gap-3 group">
              <div className={`relative w-14 h-14 bg-gradient-to-br from-amber-600 to-orange-700 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-2xl transition-all group-hover:scale-110 group-hover:rotate-6 ${
                scrolled ? '' : 'ring-4 ring-white/20'
              }`}>
                <span className="relative z-10">YF</span>
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-600 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity"></div>
              </div>
              <div>
                <h1
                  className={`text-2xl font-black transition-colors ${
                    scrolled ? "text-gray-900" : "text-white drop-shadow-lg"
                  }`}
                >
                  {config.name}
                </h1>
                <p
                  className={`text-xs font-semibold ${
                    scrolled ? "text-amber-600" : "text-amber-300"
                  }`}
                >
                  {config.slogan}
                </p>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`group relative font-bold transition-all hover:scale-110 ${
                    scrolled
                      ? "text-gray-700 hover:text-amber-600"
                      : "text-white hover:text-amber-300"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>{link.icon}</span>
                    {link.label}
                  </span>
                  <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-600 to-orange-500 group-hover:w-full transition-all duration-300`}></span>
                </a>
              ))}
              
              {/* CTA Button */}
              <button
                onClick={onOrderClick}
                className="group relative px-6 py-3 bg-gradient-to-r from-green-500 via-green-600 to-emerald-600 text-white rounded-full font-black overflow-hidden shadow-lg hover:shadow-green-500/50 transition-all hover:scale-110"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <span className="relative flex items-center gap-2">
                  <ShoppingBag size={18} />
                  Commander
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs animate-pulse">
                    🔥
                  </span>
                </span>
              </button>

              {/* Admin Button */}
              <button
                onClick={onAdminClick}
                className={`group p-3 rounded-full transition-all hover:scale-110 ${
                  scrolled 
                    ? "hover:bg-gray-100 text-gray-700" 
                    : "hover:bg-white/10 text-white"
                }`}
                title="Administration"
              >
                <Settings
                  size={20}
                  className="group-hover:rotate-90 transition-transform duration-300"
                />
              </button>
            </nav>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden p-2 rounded-full hover:bg-white/10 transition-all"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X size={28} className={scrolled ? "text-gray-900" : "text-white"} />
              ) : (
                <MenuIcon size={28} className={scrolled ? "text-gray-900" : "text-white"} />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav 
              className="lg:hidden mt-4 pb-4 bg-white rounded-3xl shadow-2xl p-6 space-y-3 animate-slideDown border-2 border-amber-100"
            >
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-3 py-3 px-4 font-bold text-gray-700 hover:text-amber-600 hover:bg-amber-50 rounded-2xl transition-all hover:scale-105"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="text-2xl">{link.icon}</span>
                  {link.label}
                </a>
              ))}
              
              <div className="pt-4 space-y-3 border-t-2 border-gray-100">
                <button
                  onClick={() => {
                    onOrderClick();
                    setIsMenuOpen(false);
                  }}
                  className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl font-black shadow-xl hover:shadow-green-500/50 transition-all hover:scale-105 flex items-center justify-center gap-2"
                >
                  <ShoppingBag size={20} />
                  Commander Maintenant
                  <span className="text-xl">🔥</span>
                </button>
                <button
                  onClick={() => {
                    onAdminClick();
                    setIsMenuOpen(false);
                  }}
                  className="w-full py-4 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-2xl font-bold hover:from-gray-200 hover:to-gray-300 transition-all flex items-center justify-center gap-2"
                >
                  <Settings size={20} />
                  Administration
                </button>
              </div>
            </nav>
          )}
        </div>
      </header>

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.5s ease-out;
        }
      `}</style>
    </>
  );
};

export default Header;