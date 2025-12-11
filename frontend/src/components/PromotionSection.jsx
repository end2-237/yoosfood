import React from "react";
import { Clock, ChevronRight } from "lucide-react";

const PromoSection = ({ promos, onOrderClick }) => {
  return (
    <section className="py-20 bg-gradient-to-br from-amber-900 via-amber-800 to-orange-900 text-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col justify-center items-center mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Promotions Exceptionnelles
          </h2>
          <p className="text-xl text-amber-200">
            Profitez de nos offres exclusives dès maintenant
          </p>
        </div>

        {/* Promo Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {promos.map((promo) => (
            <div
              key={promo.id}
              className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:border-white/40 transition-all hover:scale-105 hover:shadow-2xl group"
            >
              {/* Savings Badge */}
              <div className="absolute top-4 right-4 px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                Économisez {promo.savings}
              </div>

              {/* Title & Description */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-3">{promo.title}</h3>
                <p className="text-amber-200">{promo.description}</p>
              </div>

              {/* Pricing */}
              <div className="flex items-end gap-4 mb-6">
                <div>
                  <div className="text-sm text-amber-300 mb-1">Prix normal</div>
                  <div className="text-2xl line-through text-white/60">
                    {promo.oldPrice} XAF
                  </div>
                </div>
                <div>
                  <div className="text-sm text-green-300 mb-1">Prix promo</div>
                  <div className="text-5xl font-bold text-white">
                    {promo.newPrice} <span className="text-2xl">XAF</span>
                  </div>
                </div>
              </div>

              {/* Validity */}
              <div className="flex items-center gap-2 text-sm text-amber-300 mb-6">
                <Clock size={16} />
                Valable {promo.valid}
              </div>

              {/* CTA Button */}
              <button
                onClick={() => onOrderClick(promo.title)}
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
  );
};

export default PromoSection;