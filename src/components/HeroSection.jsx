import React, { useState, useEffect } from "react";
import { Zap, ChevronRight, Heart, Star, Award, Sparkles, Gift } from "lucide-react";

const HeroSection = ({ onOrderClick }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const heroSlides = [
    {
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=2400&h=1600&fit=crop&q=80",
      title: "Savourez l'Excellence",
      subtitle: "Culinaire Africaine",
      badge: "🎄 Spécial Noël",
      color: "from-red-600 to-green-600"
    },
    {
      image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=2400&h=1600&fit=crop&q=80",
      title: "Menu Festif",
      subtitle: "Pour Toute la Famille",
      badge: "🎁 Offres Exclusives",
      color: "from-amber-600 to-orange-600"
    },
    {
      image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=2400&h=1600&fit=crop&q=80",
      title: "Livraison Express",
      subtitle: "En 30 Minutes",
      badge: "⚡ Commandez Maintenant",
      color: "from-blue-600 to-purple-600"
    }
  ];

  useEffect(() => {
    setIsVisible(true);
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const stats = [
    { number: "5000+", label: "Clients Satisfaits", icon: Heart, gradient: "from-pink-500 to-red-500" },
    { number: "4.9/5", label: "Note Moyenne", icon: Star, gradient: "from-yellow-500 to-orange-500" },
    { number: "30min", label: "Livraison Express", icon: Zap, gradient: "from-blue-500 to-cyan-500" },
    { number: "100%", label: "Ingrédients Frais", icon: Award, gradient: "from-green-500 to-emerald-500" },
  ];

  const currentHero = heroSlides[currentSlide];

  return (
    <section id="accueil" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Animated Background avec particules de Noël */}
      <div className="absolute inset-0 z-0">
        {/* Gradient overlay moderne */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-transparent z-10"></div>
        
        {/* Images en transition */}
        {heroSlides.map((slide, index) => (
          <img
            key={index}
            src={slide.image}
            alt={`Hero ${index + 1}`}
            className={`absolute w-full h-full object-cover transition-all duration-1000 ${
              index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
            }`}
          />
        ))}

        {/* Particules de Noël animées */}
        <div className="absolute inset-0 z-10">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 10}s`
              }}
            >
              <Sparkles 
                size={Math.random() * 20 + 10} 
                className="text-amber-400/30"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-20 py-24 md:py-32">
        <div className="max-w-4xl">
          {/* Badge animé avec effet de lueur */}
          <div 
            className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${currentHero.color} backdrop-blur-sm rounded-full text-white text-sm md:text-base font-bold mb-6 shadow-2xl animate-pulse-slow transform transition-all duration-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
            }`}
          >
            <Gift size={20} className="animate-bounce" />
            {currentHero.badge}
          </div>

          {/* Titre principal avec animation en cascade */}
          <h1 
            className={`text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-none transform transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="block mb-2">{currentHero.title}</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-orange-500 animate-gradient">
              {currentHero.subtitle}
            </span>
          </h1>

          {/* Description moderne */}
          <p 
            className={`text-xl md:text-2xl lg:text-3xl text-gray-200 mb-10 leading-relaxed font-light max-w-2xl transform transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            🎄 Menu de fête exclusif  • Réductions jusqu'à <span className="text-red-400 font-bold">-25%</span>
          </p>

          {/* CTA Buttons avec effets modernes */}
          <div 
            className={`flex flex-col sm:flex-row gap-4 mb-12 transform transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <button
              onClick={onOrderClick}
              className="group relative px-8 py-5 bg-gradient-to-r from-green-500 via-green-600 to-emerald-600 text-white rounded-2xl font-bold text-lg overflow-hidden shadow-2xl hover:shadow-green-500/50 transition-all hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
              <span className="relative flex items-center justify-center gap-3">
                <span className="text-2xl">💬</span>
                Commander sur WhatsApp
                <ChevronRight className="group-hover:translate-x-2 transition-transform" />
              </span>
            </button>
            
            <a
              href="#menu"
              className="group px-8 py-5 bg-white/10 backdrop-blur-md border-2 border-white/40 hover:bg-white/20 text-white rounded-2xl font-bold text-lg transition-all hover:scale-105 flex items-center justify-center gap-2 shadow-xl"
            >
              <span className="text-xl">🎁</span>
              Voir les Promos
              <ChevronRight className="group-hover:translate-x-2 transition-transform" />
            </a>
          </div>

          {/* Stats Cards modernes avec glassmorphism */}
          <div 
            className={`grid grid-cols-2 md:grid-cols-4 gap-4 transform transition-all duration-700 delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div
                  key={i}
                  className="group relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-4 hover:bg-white/20 transition-all hover:scale-105 hover:border-white/40"
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition-transform`}>
                    <Icon className="text-white" size={24} />
                  </div>
                  <div className="text-3xl font-black text-white mb-1">{stat.number}</div>
                  <div className="text-xs text-gray-300 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>

          {/* Indicateurs de slide */}
          <div className="flex gap-2 mt-8">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'w-12 bg-gradient-to-r from-amber-400 to-orange-500' 
                    : 'w-6 bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Floating scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <a href="#menu" className="flex flex-col items-center gap-2 text-white/80 hover:text-white transition-colors">
          <span className="text-sm font-medium">Découvrir</span>
          <ChevronRight size={24} className="rotate-90" />
        </a>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.9; transform: scale(1.05); }
        }
        .animate-float {
          animation: float linear infinite;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;