import React, { useState } from "react";
import {
  X,
  ChevronRight,
  Award,
  Zap,
  TrendingUp,
} from "lucide-react";

const ProductDetailModal = ({ product, config, onClose }) => {
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const handleWhatsAppOrder = () => {
    const message = `Bonjour Yoss Food ! Je souhaite commander :
  
  ${product.name}
  Prix unitaire: ${product.price} XAF
  Quantité: ${quantity}
  Total: ${product.price * quantity} XAF
  
  Merci !`;
    
    window.open(
      `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="mt-20 bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all shadow-lg"
          >
            <X size={24} className="text-gray-700" />
          </button>

          <div className="relative h-80 md:h-96">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.badge && (
              <div className="absolute top-4 left-4 px-4 py-2 bg-amber-500 text-white text-sm font-bold rounded-full shadow-lg">
                {product.badge}
              </div>
            )}
            {product.popular && (
              <div className="absolute top-4 left-4 flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg mt-14">
                <TrendingUp size={16} className="text-red-500" />
                <span className="text-sm font-bold text-gray-900">
                  Populaire
                </span>
              </div>
            )}
          </div>

          <div className="p-8">
            <div className="mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                    {product.name}
                  </h2>
                  <div className="inline-block px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-semibold">
                    {product.category}
                  </div>
                </div>
              </div>

              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                {product.description}
              </p>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-xl">
                  <Award className="text-amber-600" size={24} />
                  <div>
                    <div className="text-sm text-gray-600">Qualité</div>
                    <div className="font-semibold text-gray-900">
                      100% Premium
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl">
                  <Zap className="text-green-600" size={24} />
                  <div>
                    <div className="text-sm text-gray-600">Livraison</div>
                    <div className="font-semibold text-gray-900">
                      30 minutes
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">
                      Prix unitaire
                    </div>
                    <div className="text-4xl font-bold text-amber-700">
                      {product.price}{" "}
                      <span className="text-xl text-gray-600">XAF</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-xl font-bold text-xl transition-all"
                    >
                      -
                    </button>
                    <span className="text-2xl font-bold w-12 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-xl font-bold text-xl transition-all"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-gray-700">
                      Total
                    </span>
                    <span className="text-3xl font-bold text-amber-700">
                      {product.price * quantity} XAF
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl font-bold text-lg transition-all hover:scale-105 shadow-lg flex items-center justify-center gap-3"
                >
                  <span className="text-2xl">💬</span>
                  Commander sur WhatsApp
                  <ChevronRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;