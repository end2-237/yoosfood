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
  Settings,
  Menu as MenuIcon,
} from "lucide-react";

const PublicSite = ({ config, products, reviews, onAdminClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [scrolled, setScrolled] = useState(false);
  const promos = [
    {
      id: 1,
      savings: "25%",
      title: "Speciel Noel",
      description:
        "Prifitez de la promos noel familiale pour beneficier de notre menu Poulet Sauce chedar.",
      oldPrice: 8000,
      newPrice: 5000,
      valid: "12h",
    },
    {
      id: 2,
      savings: "25%",
      title: "Speciel Noel",
      description:
        "Prifitez de la promos noel familiale pour beneficier de notre menu Poulet Sauce chedar.",
      oldPrice: 8000,
      newPrice: 5000,
      valid: "12h",
    },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const categories = [
    "Tous",
    "Burgers",
    "Shawarma",
    "Grillades",
    "Boissons",
    "Desserts",
  ];
  const filteredProducts =
    selectedCategory === "Tous"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const approvedReviews = reviews.filter((r) => r.approved);

  const handleWhatsAppOrder = (itemName = "", itemPrice = "") => {
    const message = itemName
      ? `Bonjour Yoss Food ! Je souhaite commander :\n\n${itemName}${
          itemPrice ? `\nPrix: ${itemPrice} XAF` : ""
        }\n\nMerci !`
      : `Bonjour Yoss Food ! Je souhaite passer une commande.`;
    window.open(
      `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  const stats = [
    { number: "5000+", label: "Clients Satisfaits", icon: Heart },
    { number: "4.9/5", label: "Note Moyenne", icon: Star },
    { number: "30min", label: "Livraison Rapide", icon: Zap },
    { number: "100%", label: "Ingrédients Frais", icon: Award },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
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
              <button
                onClick={onAdminClick}
                className={`p-2 rounded-full ${
                  scrolled ? "hover:bg-gray-100" : "hover:bg-white/10"
                }`}
              >
                <Settings
                  size={20}
                  className={scrolled ? "text-gray-700" : "text-white"}
                />
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
                <MenuIcon
                  size={28}
                  className={scrolled ? "text-gray-900" : "text-white"}
                />
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
              <button
                onClick={() => {
                  onAdminClick();
                  setIsMenuOpen(false);
                }}
                className="w-full py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold"
              >
                Admin
              </button>
            </nav>
          )}
        </div>
      </header>

      {/* Hero */}
      <section id="accueil" className="relative min-h-screen flex items-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent z-10"></div>
          <img
            src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=2400&h=1600&fit=crop&q=80"
            alt="Burger"
            className="w-full h-full object-cover"
          />
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
              {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-white/90"
                  >
                    <div className="w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center">
                      <Icon className="text-amber-400" size={20} />
                    </div>
                    <span className="text-sm font-medium">{stat.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 bg-gradient-to-br from-amber-900 via-amber-800 to-orange-900 text-white">
      <div className=" flex flex-col justify-center items-center mb-7 text-center"><h2 className="text-4xl md:text-5xl font-bold mb-4">
              Promotions Exceptionnelles
            </h2>
            <p className="text-xl text-amber-200">
              Profitez de nos offres exclusives dès maintenant
            </p></div>
      <div className="grid md:grid-cols-1 gap-8 max-w-6xl mx-auto">
            

            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {promos.map((promo, index) => (
                <div
                  key={index}
                  className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:border-white/40 transition-all hover:scale-105 hover:shadow-2xl group m-2"
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

      {/* Menu */}
      <section id="menu" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-semibold mb-4">
              🍽️ Notre Sélection
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Menu Gastronomique
            </h2>
            <p className="text-xl text-gray-600">
              Produits frais, saveurs authentiques
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

          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-xl">
                Aucun produit dans cette catégorie
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((item) => (
                <div
                  key={item.id}
                  className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl overflow-hidden transition-all hover:-translate-y-2"
                >
                  <div className="relative h-56">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {item.badge && (
                      <div className="absolute top-4 right-4 px-3 py-1 bg-amber-500 text-white text-xs font-bold rounded-full">
                        {item.badge}
                      </div>
                    )}
                    {item.popular && (
                      <div className="absolute top-4 left-4 flex items-center gap-1 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full">
                        <TrendingUp size={14} className="text-red-500" />
                        <span className="text-xs font-bold text-gray-900">
                          Populaire
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="text-3xl font-bold text-amber-700">
                        {item.price}{" "}
                        <span className="text-lg text-gray-600">XAF</span>
                      </div>
                      <button
                        onClick={() =>
                          handleWhatsAppOrder(item.name, item.price)
                        }
                        className="px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl font-semibold hover:scale-105 transition-all flex items-center gap-2"
                      >
                        <ShoppingBag size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Avis */}
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
              <span className="text-gray-600 text-lg">
                basé sur {approvedReviews.length} avis
              </span>
            </p>
          </div>

          {approvedReviews.length === 0 ? (
            <p className="text-center text-gray-500">
              Aucun avis pour le moment
            </p>
          ) : (
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {approvedReviews.slice(0, 6).map((review) => (
                <div
                  key={review.id}
                  className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-xl">
                      {review.avatar}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900">
                        {review.name}
                      </h4>
                      <p className="text-sm text-gray-600">{review.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">"{review.comment}"</p>
                  <div className="flex gap-1">
                    {[...Array(review.rating)].map((_, j) => (
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
          )}
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="py-20 bg-gradient-to-br from-amber-900 via-amber-800 to-orange-900 text-white"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Restons en Contact
            </h2>
            <p className="text-xl text-amber-200">Commandez dès maintenant</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center">
              <Phone className="mx-auto mb-4 text-amber-300" size={40} />
              <h3 className="font-bold text-xl mb-2">Téléphone</h3>
              <p className="text-amber-200">{config.phone}</p>
              <p className="text-amber-200">{config.phone2}</p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center">
              <MapPin className="mx-auto mb-4 text-amber-300" size={40} />
              <h3 className="font-bold text-xl mb-2">Adresse</h3>
              <p className="text-amber-200">{config.address}</p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center">
              <Clock className="mx-auto mb-4 text-amber-300" size={40} />
              <h3 className="font-bold text-xl mb-2">Horaires</h3>
              <p className="text-amber-200">Lun-Dim: 10h - 22h</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => handleWhatsAppOrder()}
              className="px-12 py-4 bg-white text-amber-900 rounded-full font-bold text-xl hover:bg-amber-50 transition-all hover:scale-105 shadow-2xl inline-flex items-center gap-3"
            >
              <span className="text-2xl">💬</span>
              Commander maintenant
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
            YF
          </div>
          <h3 className="text-2xl font-bold mb-2">{config.name}</h3>
          <p className="text-gray-400 mb-6">{config.slogan}</p>
          <div className="flex justify-center gap-6 mb-6">
            <a
              href="#"
              className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all"
            >
              <Facebook size={24} />
            </a>
            <a
              href="#"
              className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all"
            >
              <Instagram size={24} />
            </a>
          </div>
          <p className="text-gray-500">
            © 2024 {config.name}. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PublicSite;
