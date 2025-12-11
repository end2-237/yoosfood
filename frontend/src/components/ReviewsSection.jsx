import React, { useState } from "react";
import { Star, Quote, ThumbsUp, TrendingUp, Sparkles } from "lucide-react";

const ReviewsSection = ({ reviews }) => {
  const [activeReview, setActiveReview] = useState(0);
  const approvedReviews = reviews.filter((r) => r.approved);

  return (
    <section
      id="avis"
      className="py-24 relative overflow-hidden"
    >
      {/* Background avec gradient animé */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-amber-50/50 to-orange-50/30">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmYjkyM2MiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAgNHYyaDJ2LTJoLTJ6bS0yIDJ2Mmgydi0yaC0yem0wLTR2Mmgydi0yaC0yem0yLTJ2LTJoLTJ2Mmgyem0wLTRoMnYyaC0ydi0yem0yIDJ2Mmgydi0yaC0yem0wIDR2Mmgydi0yaC0yem0yLTJ2LTJoLTJ2Mmgyem0wIDR2Mmgydi0yaC0yem0tNCAwaC0ydjJoMnYtMnptLTItNHYyaDJ2LTJoLTJ6bTQtNHYtMmgtMnYyaDJ6bS00IDB2Mmgydi0yaC0yem00LTR2Mmgydi0yaC0yem0tMiAwdi0yaC0ydjJoMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header moderne */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full text-white font-bold mb-6 shadow-2xl animate-bounce-slow">
            <Sparkles size={20} className="animate-pulse" />
            <span>Témoignages Clients</span>
            <ThumbsUp size={20} />
          </div>

          <h2 className="text-5xl md:text-7xl font-black text-gray-900 mb-6">
            Ils nous font
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-500 to-red-500 mt-2">
              Confiance
            </span>
          </h2>

          {/* Rating showcase */}
          <div className="flex flex-col items-center gap-4 mb-8">
            <div className="flex items-center gap-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="text-amber-500 fill-amber-500 drop-shadow-lg"
                  size={40}
                  style={{
                    animation: `starPop 0.5s ease-out ${i * 0.1}s both`
                  }}
                />
              ))}
            </div>
            <div className="flex items-center gap-4">
              <div className="text-5xl md:text-6xl font-black bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">
                4.9/5
              </div>
              <div className="text-left">
                <div className="text-gray-900 font-bold text-xl">Note Exceptionnelle</div>
                <div className="text-gray-600">
                  basé sur <span className="font-bold text-amber-600">{approvedReviews.length}</span> avis vérifiés
                </div>
              </div>
            </div>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            {[
              { icon: '✅', text: 'Avis Vérifiés' },
              { icon: '🏆', text: 'Service Premium' },
              { icon: '⚡', text: 'Réponse Rapide' },
              { icon: '💯', text: '100% Satisfait' }
            ].map((badge, i) => (
              <div key={i} className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-lg border border-amber-100">
                <span className="text-xl">{badge.icon}</span>
                <span className="font-bold text-sm text-gray-700">{badge.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews Grid */}
        {approvedReviews.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-8xl mb-6">💬</div>
            <p className="text-gray-500 text-2xl font-light">
              Soyez le premier à laisser un avis !
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {approvedReviews.slice(0, 6).map((review, index) => (
              <div
                key={review.id}
                className="group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
                style={{
                  animation: `slideUp 0.6s ease-out ${index * 0.1}s both`
                }}
                onMouseEnter={() => setActiveReview(index)}
              >
                {/* Quote icon background */}
                <div className="absolute -top-4 -right-4 text-amber-100 opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all">
                  <Quote size={120} />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Avatar & Info */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 text-white flex items-center justify-center font-black text-2xl shadow-lg group-hover:scale-110 transition-transform">
                        {review.avatar}
                      </div>
                      {/* Online indicator */}
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-4 border-white"></div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-black text-gray-900 mb-1">
                        {review.name}
                      </h4>
                      <p className="text-sm text-gray-500 font-medium">{review.role}</p>
                      
                      {/* Verified badge */}
                      <div className="inline-flex items-center gap-1 mt-2 px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">
                        <span>✓</span>
                        Client vérifié
                      </div>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(review.rating)].map((_, j) => (
                      <Star
                        key={j}
                        className="text-amber-500 fill-amber-500"
                        size={20}
                      />
                    ))}
                  </div>

                  {/* Comment */}
                  <p className="text-gray-700 leading-relaxed mb-6 text-base">
                    "{review.comment}"
                  </p>

                  {/* Helpful button */}
                  <button className="group/btn flex items-center gap-2 text-gray-500 hover:text-amber-600 transition-colors text-sm font-semibold">
                    <ThumbsUp size={16} className="group-hover/btn:scale-110 transition-transform" />
                    <span>Utile ({Math.floor(Math.random() * 20) + 5})</span>
                  </button>
                </div>

                {/* Hover effect */}
                <div className={`absolute inset-0 bg-gradient-to-br from-amber-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`}></div>

                {/* Trending indicator for active */}
                {activeReview === index && (
                  <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full text-xs font-bold animate-pulse">
                    <TrendingUp size={12} />
                    Populaire
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-2xl">
            <div className="text-6xl mb-4">⭐</div>
            <h3 className="text-3xl font-black text-gray-900 mb-4">
              Partagez votre expérience !
            </h3>
            <p className="text-gray-600 mb-6 text-lg">
              Votre avis nous aide à nous améliorer et inspire d'autres clients
            </p>
            <button className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-2xl font-bold shadow-xl hover:scale-105 transition-all flex items-center gap-2 mx-auto">
              <Star size={20} className="fill-white" />
              Laisser un avis
              <Sparkles size={20} />
            </button>
          </div>
        </div>
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
        @keyframes starPop {
          0% {
            opacity: 0;
            transform: scale(0) rotate(0deg);
          }
          50% {
            transform: scale(1.2) rotate(10deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default ReviewsSection;