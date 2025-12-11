import React, { useState, useEffect } from "react";
import { ChevronRight, TrendingUp, Sparkles, Heart, ShoppingBag, Star } from "lucide-react";

const MenuSection = ({ products, onProductClick }) => {
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const categories = [
    { name: "Tous", icon: "🍽️", color: "from-purple-500 to-pink-500" },
    { name: "Burgers", icon: "🍔", color: "from-amber-500 to-orange-500" },
    { name: "Poulet", icon: "🍗", color: "from-red-500 to-pink-500" },
    { name: "Menu Composé", icon: "🎁", color: "from-green-500 to-emerald-500" },
    { name: "Supplements", icon: "➕", color: "from-blue-500 to-cyan-500" },
  ];

  const filteredProducts =
    selectedCategory === "Tous"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const toggleFavorite = (productId) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <section id="menu" className="py-24 bg-gradient-to-b from-white via-amber-50/30 to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-20 left-10 text-9xl">🍔</div>
        <div className="absolute top-40 right-20 text-8xl">🍗</div>
        <div className="absolute bottom-20 left-1/4 text-7xl">🍟</div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header avec animation */}
        <div className="text-center mb-16">
          <div 
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full text-white font-bold mb-6 shadow-2xl animate-bounce-slow"
            style={{ animation: 'float 3s ease-in-out infinite' }}
          >
            <Sparkles size={20} className="animate-spin-slow" />
            <span className="text-sm md:text-base">Notre Sélection Premium</span>
            <Star size={20} className="animate-pulse" />
          </div>
          
          <h2 className="text-5xl md:text-7xl font-black text-gray-900 mb-6">
            Menu
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-500 to-red-500 mt-2">
              Gastronomique
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-600 font-light max-w-3xl mx-auto">
            Produits frais du jour • Saveurs authentiques • Qualité garantie
          </p>
        </div>

        {/* Category Filter amélioré */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name)}
              className={`group relative px-6 md:px-8 py-4 rounded-2xl font-bold text-sm md:text-base transition-all duration-300 overflow-hidden ${
                selectedCategory === cat.name
                  ? "text-white shadow-2xl scale-105"
                  : "bg-white text-gray-700 hover:bg-gray-50 shadow-lg hover:scale-105"
              }`}
            >
              {selectedCategory === cat.name && (
                <div className={`absolute inset-0 bg-gradient-to-r ${cat.color}`}></div>
              )}
              <span className="relative flex items-center gap-2">
                <span className="text-2xl">{cat.icon}</span>
                {cat.name}
                {selectedCategory === cat.name && (
                  <Sparkles size={16} className="animate-pulse" />
                )}
              </span>
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-8xl mb-6">🔍</div>
            <p className="text-gray-500 text-2xl font-light">
              Aucun produit dans cette catégorie
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((item, index) => (
              <div
                key={item.id}
                className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2"
                style={{
                  animation: `slideUp 0.6s ease-out ${index * 0.1}s both`
                }}
                onMouseEnter={() => setHoveredProduct(item.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                {/* Image Container avec overlay */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700"
                  />
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Badges */}
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                    {item.badge && (
                      <div className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-black rounded-full shadow-lg animate-pulse-slow">
                        ✨ {item.badge}
                      </div>
                    )}
                    {item.popular && (
                      <div className="flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full shadow-lg">
                        <TrendingUp size={14} />
                        <span className="text-xs font-black">Populaire</span>
                      </div>
                    )}
                  </div>

                  {/* Favorite button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(item.id);
                    }}
                    className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform"
                  >
                    <Heart
                      size={20}
                      className={`transition-all ${
                        favorites.includes(item.id)
                          ? "fill-red-500 text-red-500"
                          : "text-gray-400"
                      }`}
                    />
                  </button>

                  {/* Quick view overlay */}
                  {hoveredProduct === item.id && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                      <button
                        onClick={() => onProductClick(item)}
                        className="px-8 py-4 bg-white text-gray-900 rounded-2xl font-bold shadow-2xl hover:scale-110 transition-transform flex items-center gap-2"
                      >
                        <ShoppingBag size={20} />
                        Voir détails
                      </button>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Category tag */}
                  <div className="inline-block px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full mb-3">
                    {item.category}
                  </div>

                  <h3 className="text-2xl font-black text-gray-900 mb-3 group-hover:text-amber-600 transition-colors line-clamp-1">
                    {item.name}
                  </h3>
                  
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className="text-amber-400 fill-amber-400"
                      />
                    ))}
                    <span className="text-sm text-gray-500 ml-2">(4.9)</span>
                  </div>

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Prix</div>
                      <div className="text-3xl font-black bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">
                        {item.price.toLocaleString()}
                        <span className="text-lg ml-1">XAF</span>
                      </div>
                    </div>
                    <button
                      onClick={() => onProductClick(item)}
                      className="group/btn px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl font-bold transition-all hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
                    >
                      Commander
                      <ChevronRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>

                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none"></div>
              </div>
            ))}
          </div>
        )}

        {/* CTA Bottom */}
        {filteredProducts.length > 0 && (
          <div className="text-center mt-16">
            <p className="text-gray-600 text-lg mb-6">
              Vous ne trouvez pas ce que vous cherchez ?
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-2xl font-bold shadow-2xl hover:scale-105 transition-all"
            >
              <span className="text-2xl">💬</span>
              Contactez-nous
              <ChevronRight />
            </a>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        .animate-bounce-slow {
          animation: float 3s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default MenuSection;