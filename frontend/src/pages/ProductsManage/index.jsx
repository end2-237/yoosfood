import React, { useState, useEffect } from "react";
import {
  X,
  ChevronRight,
  Award,
  Zap,
  TrendingUp,
  Star,
  Heart,
  Share2,
  ShoppingBag,
  Clock,
  Flame,
  CheckCircle,
} from "lucide-react";

const ProductDetailModal = ({ product, config, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Bloquer le scroll du body quand le modal est ouvert
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  // Fermer avec Échap
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!product) return null;

  const handleWhatsAppOrder = () => {
    const message = `🍽️ *Nouvelle Commande - Yoss Food*\n\n📦 *Produit:* ${product.name}\n💰 *Prix unitaire:* ${product.price} XAF\n📊 *Quantité:* ${quantity}\n💵 *Total:* ${product.price * quantity} XAF\n\n✅ Merci de confirmer ma commande !`;
    
    window.open(
      `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
    onClose();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Découvrez ${product.name} chez Yoss Food !`,
        url: window.location.href,
      });
    } else {
      setShowShareMenu(true);
      setTimeout(() => setShowShareMenu(false), 3000);
    }
  };

  const features = [
    { icon: Flame, label: "Fraîchement préparé", color: "text-orange-500" },
    { icon: Award, label: "Ingrédients premium", color: "text-amber-600" },
    { icon: Zap, label: "Livraison en 30min", color: "text-green-600" },
    { icon: CheckCircle, label: "Satisfait ou remboursé", color: "text-blue-600" },
  ];

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-md z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300"
      onClick={onClose}
    >
      
      <div 
        className=" bg-white rounded-3xl max-w-5xl w-full max-h-[95vh] overflow-hidden shadow-2xl animate-in zoom-in slide-in-from-bottom-4 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header avec actions */}
        <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-gradient-to-b from-black/50 to-transparent">
          <div className="flex gap-2">
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="w-11 h-11 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-all shadow-lg"
            >
              <Heart 
                size={20} 
                className={isFavorite ? "text-red-500 fill-red-500" : "text-gray-700"} 
              />
            </button>
            <button
              onClick={handleShare}
              className="w-11 h-11 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-all shadow-lg"
            >
              <Share2 size={20} className="text-gray-700" />
            </button>
          </div>
          
          <button
            onClick={onClose}
            className=" w-11 h-11 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 hover:rotate-90 transition-all shadow-lg group"
          >
            <X size={22} className="text-gray-700 group-hover:text-red-600" />
          </button>
        </div>

        {/* Notification de partage */}
        {showShareMenu && (
          <div className="absolute top-20 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-20 animate-in slide-in-from-top-2">
            ✓ Lien copié !
          </div>
        )}

        <div className="overflow-y-auto max-h-[95vh] custom-scrollbar">
          {/* Image principale */}
          <div className="relative h-80 md:h-[450px] bg-gradient-to-br from-amber-100 to-orange-100">
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            <img
              src={product.image}
              alt={product.name}
              onLoad={() => setImageLoaded(true)}
              className={`w-full h-full object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            />
            
            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.badge && (
                <div className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-bold rounded-full shadow-xl flex items-center gap-2">
                  <Star size={16} className="fill-white" />
                  {product.badge}
                </div>
              )}
              {product.popular && (
                <div className="px-4 py-2 bg-white/95 backdrop-blur-sm rounded-full shadow-xl flex items-center gap-2">
                  <TrendingUp size={16} className="text-red-500" />
                  <span className="text-sm font-bold text-gray-900">
                    Populaire
                  </span>
                </div>
              )}
            </div>

            {/* Indicateur de stock */}
            {product.stock && product.stock < 10 && (
              <div className="absolute bottom-4 left-4 px-4 py-2 bg-red-500 text-white text-sm font-bold rounded-full shadow-xl animate-pulse">
                ⚡ Plus que {product.stock} en stock !
              </div>
            )}
          </div>

          {/* Contenu */}
          <div className="p-6 md:p-8">
            {/* En-tête produit */}
            <div className="mb-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 leading-tight">
                    {product.name}
                  </h2>
                  <div className="flex items-center gap-3 flex-wrap">
                    <div className="px-3 py-1 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 rounded-full text-sm font-bold">
                      {product.category}
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className="text-amber-500 fill-amber-500"
                        />
                      ))}
                      <span className="text-sm text-gray-600 ml-1">(4.9)</span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-lg text-gray-700 leading-relaxed mb-6 bg-gray-50 p-4 rounded-xl border-l-4 border-amber-500">
                {product.description}
              </p>

              {/* Features */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {features.map((feature, idx) => {
                  const Icon = feature.icon;
                  return (
                    <div
                      key={idx}
                      className="flex flex-col items-center gap-2 p-4 bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200 hover:border-amber-300 hover:shadow-lg transition-all"
                    >
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
                        <Icon className={feature.color} size={24} />
                      </div>
                      <span className="text-xs text-center font-semibold text-gray-700 leading-tight">
                        {feature.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Informations complémentaires */}
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <Clock className="text-amber-600" size={24} />
                  </div>
                  <div>
                    <div className="text-xs text-gray-600 font-medium">Temps de préparation</div>
                    <div className="font-bold text-gray-900">15-20 min</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <Zap className="text-green-600" size={24} />
                  </div>
                  <div>
                    <div className="text-xs text-gray-600 font-medium">Livraison</div>
                    <div className="font-bold text-gray-900">30 minutes</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <Award className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <div className="text-xs text-gray-600 font-medium">Qualité</div>
                    <div className="font-bold text-gray-900">Premium</div>
                  </div>
                </div>
              </div>

              {/* Section prix et commande */}
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border-2 border-gray-200 shadow-inner">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-6">
                  <div>
                    <div className="text-sm text-gray-600 mb-1 font-medium">
                      Prix unitaire
                    </div>
                    <div className="text-5xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                      {product.price}
                      <span className="text-2xl text-gray-600 ml-1">XAF</span>
                    </div>
                    <div className="text-xs text-green-600 font-semibold mt-1">
                      ✓ Prix fixe - Pas de frais cachés
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-gray-700">Quantité:</span>
                    <div className="flex items-center gap-3 bg-white rounded-xl shadow-lg p-1">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 hover:from-amber-100 hover:to-amber-200 rounded-lg font-bold text-xl transition-all hover:scale-110 active:scale-95"
                      >
                        -
                      </button>
                      <span className="text-3xl font-bold w-16 text-center text-amber-700">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 hover:from-amber-100 hover:to-amber-200 rounded-lg font-bold text-xl transition-all hover:scale-110 active:scale-95"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Total */}
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl p-5 mb-6 shadow-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-white/90 text-sm font-medium mb-1">
                        Total à payer
                      </div>
                      <div className="text-4xl font-bold text-white flex items-baseline gap-2">
                        {product.price * quantity}
                        <span className="text-xl">XAF</span>
                      </div>
                    </div>
                    <ShoppingBag className="text-white/30" size={48} />
                  </div>
                </div>

                {/* Bouton commander */}
                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full py-5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl font-bold text-lg transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl hover:shadow-2xl flex items-center justify-center gap-3 group"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform">💬</span>
                  Commander sur WhatsApp
                  <ChevronRight className="group-hover:translate-x-1 transition-transform" size={24} />
                </button>

                <p className="text-center text-xs text-gray-500 mt-3">
                  🔒 Paiement sécurisé à la livraison
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #d97706;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #b45309;
        }
      `}</style>
    </div>
  );
};

export default ProductDetailModal;