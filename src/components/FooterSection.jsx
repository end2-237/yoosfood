import React from "react";
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone, Heart, ArrowUp } from "lucide-react";

const Footer = ({ config }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { 
      icon: Facebook, 
      href: "#", 
      label: "Facebook",
      gradient: "from-blue-600 to-blue-700",
      hoverGradient: "hover:from-blue-700 hover:to-blue-800"
    },
    { 
      icon: Instagram, 
      href: "#", 
      label: "Instagram",
      gradient: "from-pink-600 to-purple-600",
      hoverGradient: "hover:from-pink-700 hover:to-purple-700"
    },
    { 
      icon: Twitter, 
      href: "#", 
      label: "Twitter",
      gradient: "from-sky-600 to-blue-600",
      hoverGradient: "hover:from-sky-700 hover:to-blue-700"
    }
  ];

  const quickLinks = [
    { label: "Accueil", href: "#accueil" },
    { label: "Menu", href: "#menu" },
    { label: "Avis", href: "#avis" },
    { label: "Contact", href: "#contact" }
  ];

  const legalLinks = [
    { label: "Mentions légales", href: "#" },
    { label: "Politique de confidentialité", href: "#" },
    { label: "CGV", href: "#" }
  ];

  return (
    <footer className="relative bg-gray-900 text-white overflow-hidden">
      {/* Decorative gradient top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500"></div>

      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAgNHYyaDJ2LTJoLTJ6bS0yIDJ2Mmgydi0yaC0yem0wLTR2Mmgydi0yaC0yem0yLTJ2LTJoLTJ2Mmgyem0wLTRoMnYyaC0ydi0yem0yIDJ2Mmgydi0yaC0yem0wIDR2Mmgydi0yaC0yem0yLTJ2LTJoLTJ2Mmgyem0wIDR2Mmgydi0yaC0yem0tNCAwaC0ydjJoMnYtMnptLTItNHYyaDJ2LTJoLTJ6bTQtNHYtMmgtMnYyaDJ6bS00IDB2Mmgydi0yaC0yem00LTR2Mmgydi0yaC0yem0tMiAwdi0yaC0ydjJoMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Top Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative w-20 h-20 bg-gradient-to-br from-amber-600 to-orange-700 rounded-3xl flex items-center justify-center text-white font-black text-3xl shadow-2xl group hover:scale-110 transition-all">
                <span className="relative z-10">YF</span>
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-600 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity"></div>
              </div>
              <div>
                <h3 className="text-3xl font-black mb-1">{config.name}</h3>
                <p className="text-amber-400 font-semibold text-sm">{config.slogan}</p>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6 max-w-md">
              Découvrez l'excellence culinaire africaine avec nos plats authentiques préparés avec passion. 
              Livraison rapide, qualité garantie, satisfaction assurée. 🍔✨
            </p>
            
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className={`group relative w-14 h-14 bg-gradient-to-br ${social.gradient} ${social.hoverGradient} rounded-2xl flex items-center justify-center transition-all hover:scale-110 hover:rotate-6 shadow-lg`}
                  >
                    <Icon size={24} className="relative z-10" />
                    <div className={`absolute inset-0 bg-gradient-to-br ${social.gradient} rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity`}></div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-black mb-6 flex items-center gap-2">
              <span className="text-2xl">🔗</span>
              Liens Rapides
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="group flex items-center gap-2 text-gray-400 hover:text-amber-400 transition-colors font-semibold"
                  >
                    <span className="w-2 h-2 bg-amber-500 rounded-full group-hover:scale-150 transition-transform"></span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-black mb-6 flex items-center gap-2">
              <span className="text-2xl">📞</span>
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400">
                <Phone size={20} className="text-amber-500 mt-0.5 flex-shrink-0" />
                <div className="space-y-1">
                  <a href={`tel:${config.phone}`} className="hover:text-amber-400 transition-colors block font-semibold">
                    {config.phone}
                  </a>
                  <a href={`tel:${config.phone2}`} className="hover:text-amber-400 transition-colors block font-semibold">
                    {config.phone2}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin size={20} className="text-amber-500 mt-0.5 flex-shrink-0" />
                <span className="leading-relaxed">{config.address}</span>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <Mail size={20} className="text-amber-500 mt-0.5 flex-shrink-0" />
                <a href={`mailto:contact@${config.name.toLowerCase().replace(/\s/g, '')}.com`} className="hover:text-amber-400 transition-colors">
                  contact@yossfood.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <span>© {new Date().getFullYear()} {config.name}.</span>
            <span className="hidden md:inline">•</span>
            <span className="flex items-center gap-1">
              Fait avec <Heart size={14} className="text-red-500 fill-red-500 animate-pulse" /> au Cameroun
            </span>
          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap items-center gap-4 text-sm">
            {legalLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-gray-400 hover:text-amber-400 transition-colors font-semibold"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Scroll to Top */}
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 rounded-full font-bold shadow-xl hover:shadow-2xl transition-all hover:scale-105"
            aria-label="Retour en haut"
          >
            <ArrowUp size={18} className="group-hover:-translate-y-1 transition-transform" />
            <span className="hidden md:inline">Haut de page</span>
          </button>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-wrap justify-center gap-8 text-gray-500 text-sm">
            {[
              { icon: '🔒', text: 'Paiement Sécurisé' },
              { icon: '⚡', text: 'Livraison Express' },
              { icon: '✅', text: 'Qualité Garantie' },
              { icon: '💯', text: 'Service Client 24/7' }
            ].map((badge, i) => (
              <div key={i} className="flex items-center gap-2 bg-gray-800/50 px-4 py-2 rounded-full hover:bg-gray-800 transition-colors">
                <span className="text-xl">{badge.icon}</span>
                <span className="font-semibold">{badge.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;