"use client";

import React, { useEffect, useState } from "react";
import {
  Pizza,
  Beef,
  Drumstick,
  CupSoda,
  IceCream,
  Cookie,
  Salad,
  Croissant,
  Coffee,
  Fish,
  Egg,
  Carrot,
  Flame,
  Sandwich,
  Cherry,
  Utensils,
  Star,
  Heart,
} from "lucide-react";

const logo = "/yfl1.png";
const burger = "/food/photo-1571091718767-18b5b1457add.jpg";

// Beaucoup d'icônes food en arrière-plan (subtiles), dispersées.
const ICONS = [
  Pizza, Beef, Drumstick, CupSoda, IceCream, Cookie, Salad, Croissant,
  Coffee, Fish, Egg, Carrot, Flame, Sandwich, Cherry, Utensils, Star, Heart,
];
const rand = (i, n) => {
  const x = Math.sin(i * 127.1 + n * 311.7) * 43758.5453;
  return x - Math.floor(x);
};
const DOODLES = Array.from({ length: 46 }, (_, i) => ({
  Icon: ICONS[i % ICONS.length],
  top: `${(rand(i, 1) * 96).toFixed(2)}%`,
  left: `${(rand(i, 2) * 96).toFixed(2)}%`,
  size: 16 + Math.round(rand(i, 3) * 30),
  rot: Math.round(rand(i, 4) * 360),
  dur: (3 + rand(i, 5) * 5).toFixed(2),
  delay: (rand(i, 6) * 4).toFixed(2),
}));

export default function Loader() {
  const [pct, setPct] = useState(6);

  useEffect(() => {
    const id = setInterval(() => {
      setPct((p) => (p >= 100 ? 100 : p + Math.max(2, Math.round((100 - p) * 0.14))));
    }, 45);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative min-h-[100dvh] w-full overflow-hidden bg-[#1a0303] text-white">
      {/* image de burger PLEIN ÉCRAN */}
      <img
        src={burger}
        alt="YossFood"
        className="loader-zoom absolute inset-0 h-full w-full object-cover"
      />
      {/* voile sombre pour lisibilité */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/80" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.65)_100%)]" />

      {/* doodles food subtils */}
      <div className="pointer-events-none absolute inset-0">
        {DOODLES.map((d, i) => {
          const Icon = d.Icon;
          return (
            <span
              key={i}
              className="loader-float absolute text-white/10"
              style={{
                top: d.top,
                left: d.left,
                transform: `rotate(${d.rot}deg)`,
                animationDuration: `${d.dur}s`,
                animationDelay: `${d.delay}s`,
              }}
            >
              <Icon size={d.size} strokeWidth={1.6} />
            </span>
          );
        })}
      </div>

      {/* contenu */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <img src={logo} alt="YossFood" className="loader-pop h-40 w-40 object-contain drop-shadow-2xl md:h-48 md:w-48" />

        <h1 className="mt-2 text-4xl font-black tracking-tight text-white drop-shadow-lg sm:text-5xl">
          Yoss<span className="text-red-500">Food</span>
        </h1>
        <p className="mt-2 text-xs font-semibold uppercase tracking-[0.35em] text-amber-300">
          La passion dans chaque bouchée
        </p>

        {/* barre de progression stylée */}
        <div className="relative mt-8 h-3 w-80 max-w-[82vw] rounded-full bg-white/15 ring-1 ring-white/20">
          <div
            className="h-full rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-red-600 shadow-[0_0_16px_rgba(249,115,22,0.6)] transition-[width] duration-150 ease-out"
            style={{ width: `${pct}%` }}
          >
            <div className="loader-shimmer h-full w-full rounded-full" />
          </div>
          {/* flamme qui glisse au bout de la barre */}
          <div
            className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 transition-[left] duration-150 ease-out"
            style={{ left: `${pct}%` }}
          >
            <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-red-600 shadow-lg ring-2 ring-red-500/40">
              <Flame size={16} />
            </span>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 text-sm font-bold text-white">
          <span className="tabular-nums">{pct}%</span>
          <span className="text-gray-300">·</span>
          <span className="font-semibold text-gray-300">Préparation de votre commande…</span>
        </div>
      </div>

      <style>{`
        @keyframes loaderFloat {
          0%, 100% { transform: translateY(0) rotate(var(--r,0deg)); }
          50% { transform: translateY(-8px) rotate(var(--r,0deg)); }
        }
        @keyframes loaderShimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes loaderZoom {
          0% { transform: scale(1.12); }
          100% { transform: scale(1); }
        }
        @keyframes loaderPop {
          0% { transform: scale(0.85); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .loader-float { animation: loaderFloat 5s ease-in-out infinite; }
        .loader-shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent);
          animation: loaderShimmer 1.1s linear infinite;
        }
        .loader-zoom { animation: loaderZoom 6s ease-out both; }
        .loader-pop { animation: loaderPop 0.5s ease-out both; }
      `}</style>
    </div>
  );
}
