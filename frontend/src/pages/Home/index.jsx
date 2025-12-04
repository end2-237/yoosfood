import React, { useState, useEffect } from "react";
import {
  Phone,
  MapPin,
  Clock,
  Star,
  ShoppingBag,
  ChevronRight,
  Award,
  Zap,
  Heart,
  TrendingUp,
  X,
  Instagram,
  Facebook,
} from "lucide-react";

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const config = {
    name: "Yoss Food",
    slogan: "L'Excellence Culinaire à Votre Service",
    phone: "691 17 54 80",
    phone2: "651 58 06 28",
    whatsapp: "237691175480",
    address: "Bonamoussadi, Carrefour Maison Blanche, Douala",
  };

  const menuItems = [
    {
      id: 1,
      name: "Burger Premium Signature",
      description:
        "Pain artisanal doré, viande Angus 200g, cheddar vieilli, laitue croquante, tomates fraîches, oignons caramélisés, sauce maison",
      price: 2800,
      category: "Burgers",
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=400&fit=crop&q=80",
      popular: true,
      badge: "Best Seller",
    },
    {
      id: 2,
      name: "Burger Royal Deluxe",
      description:
        "Double viande premium, bacon croustillant, œuf fermier, triple fromage, champignons sautés, sauce BBQ fumée",
      price: 3500,
      category: "Burgers",
      image:
        "https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&h=400&fit=crop&q=80",
      badge: "Premium",
    },
    {
      id: 3,
      name: "Shawarma Poulet Royal",
      description:
        "Poulet mariné aux épices orientales, pain libanais frais, sauce tahini crémeuse, légumes croquants",
      price: 2200,
      category: "Shawarma",
      image:
        "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=600&h=400&fit=crop&q=80",
      popular: true,
    },
    {
      id: 4,
      name: "Shawarma Mixte Gourmand",
      description:
        "Poulet et viande mélangés, double sauce signature, portions généreuses",
      price: 2800,
      category: "Shawarma",
      image:
        "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&h=400&fit=crop&q=80",
      badge: "Nouveau",
    },
    {
      id: 5,
      name: "Poulet Braisé Premium",
      description:
        "Poulet fermier mariné 12h, grillé au charbon, frites maison, salade fraîche",
      price: 3500,
      category: "Grillades",
      image:
        "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=600&h=400&fit=crop&q=80",
      popular: true,
    },
    {
      id: 6,
      name: "Côtes BBQ Signature",
      description:
        "Côtes tendres glacées sauce BBQ maison, accompagnement au choix",
      price: 4200,
      category: "Grillades",
      image:
        "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&h=400&fit=crop&q=80",
    },
  ];

  const promos = [
    {
      title: "Menu Executive Lunch",
      description: "Burger Premium + Frites XXL + Boisson + Dessert",
      oldPrice: 5000,
      newPrice: 3800,
      savings: "1200 XAF",
      valid: "Lun-Ven 11h-15h",
    },
    {
      title: "Formule Famille Royale",
      description: "3 Burgers + 2 Shawarmas + 5 Boissons + Frites",
      oldPrice: 12000,
      newPrice: 9500,
      savings: "2500 XAF",
      valid: "Week-end uniquement",
    },
  ];

  const reviews = [
    {
      name: "Marie Kouam",
      role: "Cliente fidèle",
      rating: 5,
      comment:
        "Une qualité irréprochable ! Les saveurs sont authentiques et les portions vraiment généreuses. Je recommande le Burger Signature.",
      avatar: "MK",
    },
    {
      name: "Jean-Paul Mbida",
      role: "Entrepreneur",
      rating: 5,
      comment:
        "Service rapide et professionnel. La livraison est toujours à l'heure. Le meilleur fast-food de Douala !",
      avatar: "JM",
    },
    {
      name: "Fatima Bello",
      role: "Food Blogger",
      rating: 5,
      comment:
        "J'ai testé plusieurs restaurants à Douala, mais Yoss Food se démarque vraiment par la fraîcheur des ingrédients.",
      avatar: "FB",
    },
  ];

  const stats = [
    { number: "5000+", label: "Clients Satisfaits", icon: Heart },
    { number: "4.9/5", label: "Note Moyenne", icon: Star },
    { number: "30min", label: "Livraison Rapide", icon: Zap },
    { number: "100%", label: "Ingrédients Frais", icon: Award },
  ];

  const categories = ["Tous", "Burgers", "Shawarma", "Grillades"];
  const filteredMenu =
    selectedCategory === "Tous"
      ? menuItems
      : menuItems.filter((item) => item.category === selectedCategory);

  const handleWhatsAppOrder = (itemName = "") => {
    const message = itemName
      ? `Bonjour Yoss Food ! Je souhaite commander : ${itemName}`
      : `Bonjour Yoss Food ! Je souhaite passer une commande.`;
    window.open(
      `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header Premium */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white shadow-xl py-3" : "bg-transparent py-4"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                YF
              </div>
              <div>
                <h1
                  className={`text-2xl font-bold ${
                    scrolled ? "text-gray-900" : "text-white"
                  }`}
                >
                  {config.name}
                </h1>
                <p
                  className={`text-xs ${
                    scrolled ? "text-gray-600" : "text-amber-200"
                  }`}
                >
                  {config.slogan}
                </p>
              </div>
            </div>

            <nav className="hidden lg:flex items-center gap-8">
              <a
                href="#accueil"
                className={`font-medium ${
                  scrolled
                    ? "text-gray-700 hover:text-amber-600"
                    : "text-white hover:text-amber-300"
                }`}
              >
                Accueil
              </a>
              <a
                href="#menu"
                className={`font-medium ${
                  scrolled
                    ? "text-gray-700 hover:text-amber-600"
                    : "text-white hover:text-amber-300"
                }`}
              >
                Menu
              </a>
              <a
                href="#promos"
                className={`font-medium ${
                  scrolled
                    ? "text-gray-700 hover:text-amber-600"
                    : "text-white hover:text-amber-300"
                }`}
              >
                Promotions
              </a>
              <a
                href="#avis"
                className={`font-medium ${
                  scrolled
                    ? "text-gray-700 hover:text-amber-600"
                    : "text-white hover:text-amber-300"
                }`}
              >
                Avis
              </a>
              <a
                href="#contact"
                className={`font-medium ${
                  scrolled
                    ? "text-gray-700 hover:text-amber-600"
                    : "text-white hover:text-amber-300"
                }`}
              >
                Contact
              </a>
              <button
                onClick={() => handleWhatsAppOrder()}
                className="px-6 py-2.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white rounded-full font-semibold transition-all hover:scale-105 shadow-lg flex items-center gap-2"
              >
                <ShoppingBag size={18} />
                Commander
              </button>
            </nav>

            <button
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X
                  size={28}
                  className={scrolled ? "text-gray-900" : "text-white"}
                />
              ) : (
                <div className="space-y-1.5">
                  <span
                    className={`block w-7 h-0.5 ${
                      scrolled ? "bg-gray-900" : "bg-white"
                    }`}
                  ></span>
                  <span
                    className={`block w-7 h-0.5 ${
                      scrolled ? "bg-gray-900" : "bg-white"
                    }`}
                  ></span>
                  <span
                    className={`block w-7 h-0.5 ${
                      scrolled ? "bg-gray-900" : "bg-white"
                    }`}
                  ></span>
                </div>
              )}
            </button>
          </div>

          {isMenuOpen && (
            <nav className="lg:hidden mt-4 pb-4 bg-white rounded-lg shadow-xl p-4 space-y-3">
              <a
                href="#accueil"
                className="block py-2 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Accueil
              </a>
              <a
                href="#menu"
                className="block py-2 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Menu
              </a>
              <a
                href="#promos"
                className="block py-2 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Promotions
              </a>
              <a
                href="#avis"
                className="block py-2 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Avis
              </a>
              <a
                href="#contact"
                className="block py-2 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
              <button
                onClick={() => handleWhatsAppOrder()}
                className="w-full py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-lg font-semibold"
              >
                Commander
              </button>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section Ultra Premium avec vraie image */}
      <section id="accueil" className="relative min-h-screen flex items-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent z-10"></div>
          <img
            src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=2400&h=1600&fit=crop&q=80"
            alt="Burger Premium"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="absolute inset-0 z-10 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-amber-500 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="container mx-auto px-4 relative z-20 py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 backdrop-blur-sm border border-amber-400/30 rounded-full text-amber-400 text-sm font-semibold mb-6">
              <Zap size={16} className="animate-bounce" />
              Livraison Express en 30 minutes
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Savourez l'Authenticité
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                Redéfinie
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed">
              Découvrez une cuisine raffinée où chaque plat est une œuvre d'art.
              Des ingrédients premium, des saveurs exceptionnelles.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button
                onClick={() => handleWhatsAppOrder()}
                className="group px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-full font-bold text-lg transition-all hover:scale-105 shadow-2xl flex items-center justify-center gap-3"
              >
                <span className="text-2xl">💬</span>
                Commander sur WhatsApp
                <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              <a
                href="#menu"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 hover:bg-white/20 text-white rounded-full font-bold text-lg transition-all hover:scale-105 flex items-center justify-center gap-2"
              >
                Découvrir le Menu
                <ChevronRight />
              </a>
            </div>

            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2 text-white/90">
                <div className="w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center">
                  <Award className="text-amber-400" size={20} />
                </div>
                <span className="text-sm font-medium">Ingrédients Premium</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <div className="w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center">
                  <Star className="text-amber-400" size={20} />
                </div>
                <span className="text-sm font-medium">Note 4.9/5</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <div className="w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center">
                  <Heart className="text-amber-400" size={20} />
                </div>
                <span className="text-sm font-medium">
                  5000+ Clients Heureux
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white/60 rounded-full animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-amber-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="text-center group hover:scale-105 transition-transform"
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-amber-500 to-amber-700 rounded-2xl flex items-center justify-center shadow-lg">
                    <Icon className="text-white" size={28} />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Promotions */}
      <section
        id="promos"
        className="py-20 bg-gradient-to-br from-amber-900 via-amber-800 to-orange-900 text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-semibold mb-4">
              🔥 Offres Limitées
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Promotions Exceptionnelles
            </h2>
            <p className="text-xl text-amber-200">
              Profitez de nos offres exclusives dès maintenant
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {promos.map((promo, index) => (
              <div
                key={index}
                className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:border-white/40 transition-all hover:scale-105 hover:shadow-2xl group"
              >
                <div className="absolute top-4 right-4 px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                  Économisez {promo.savings}
                </div>
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-3">{promo.title}</h3>
                  <p className="text-amber-200">{promo.description}</p>
                </div>
                <div className="flex items-end gap-4 mb-6">
                  <div>
                    <div className="text-sm text-amber-300 mb-1">
                      Prix normal
                    </div>
                    <div className="text-2xl line-through text-white/60">
                      {promo.oldPrice} XAF
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-green-300 mb-1">
                      Prix promo
                    </div>
                    <div className="text-5xl font-bold text-white">
                      {promo.newPrice} <span className="text-2xl">XAF</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-amber-300 mb-6">
                  <Clock size={16} />
                  {promo.valid}
                </div>
                <button
                  onClick={() => handleWhatsAppOrder(promo.title)}
                  className="w-full py-4 bg-white text-amber-900 rounded-xl font-bold text-lg transition-all hover:bg-amber-50 group-hover:shadow-xl flex items-center justify-center gap-2"
                >
                  Commander cette offre
                  <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Menu avec vraies images */}
      <section id="menu" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-semibold mb-4">
              🍽️ Notre Sélection
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Menu Gastronomique
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Chaque plat est préparé avec des ingrédients soigneusement
              sélectionnés
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-3 rounded-full font-semibold transition-all ${
                  selectedCategory === cat
                    ? "bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-lg scale-105"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMenu.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl overflow-hidden transition-all hover:-translate-y-2 border border-gray-100"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                  {item.badge && (
                    <div className="absolute top-4 right-4 px-3 py-1 bg-amber-500 text-white text-xs font-bold rounded-full shadow-lg">
                      {item.badge}
                    </div>
                  )}

                  {item.popular && (
                    <div className="absolute top-4 left-4 flex items-center gap-1 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full shadow-lg">
                      <TrendingUp size={14} className="text-red-500" />
                      <span className="text-xs font-bold text-gray-900">
                        Populaire
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-amber-700 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Prix</div>
                      <div className="text-3xl font-bold text-amber-700">
                        {item.price}{" "}
                        <span className="text-lg text-gray-600">XAF</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleWhatsAppOrder(item.name)}
                      className="px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white rounded-xl font-semibold transition-all hover:scale-105 shadow-lg flex items-center gap-2"
                    >
                      <ShoppingBag size={18} />
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION AVIS --- */}
      <section
        id="avis"
        className="py-20 bg-gradient-to-br from-gray-50 to-amber-50"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-semibold mb-4">
              💬 Témoignages
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Ils nous font confiance
            </h2>
            <div className="flex items-center justify-center gap-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="text-amber-500 fill-amber-500"
                  size={32}
                />
              ))}
            </div>
            <p className="text-2xl font-bold text-gray-900">
              4.9/5{" "}
              <span className="text-gray-600 text-lg">basé sur 230+ avis</span>
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {reviews.map((rev, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all border border-gray-100"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-xl">
                    {rev.avatar}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900">
                      {rev.name}
                    </h4>
                    <p className="text-sm text-gray-600">{rev.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  “{rev.comment}”
                </p>
                <div className="flex gap-1">
                  {[...Array(rev.rating)].map((_, j) => (
                    <Star
                      key={j}
                      className="text-amber-500 fill-amber-500"
                      size={20}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION CONTACT --- */}
      <section
        id="contact"
        className="py-20 bg-gradient-to-br from-amber-900 via-amber-800 to-orange-900 text-white relative overflow-hidden"
      >
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-white/10 rounded-full text-sm font-semibold mb-4">
              📞 Contact & Localisation
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Restons en Contact
            </h2>
            <p className="text-xl text-amber-200 max-w-2xl mx-auto">
              Commandez, contactez-nous dès maintenant ou localisez notre restaurant facilement
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto"></div>
        </div>
      </section>
    </div>
  );
};
export default Home;
