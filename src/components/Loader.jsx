import React from "react";
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

// Beaucoup d'icônes food en arrière-plan, dispersées de façon déterministe.
const ICONS = [
  Pizza, Beef, Drumstick, CupSoda, IceCream, Cookie, Salad, Croissant,
  Coffee, Fish, Egg, Carrot, Flame, Sandwich, Cherry, Utensils, Star, Heart,
];

const rand = (i, n) => {
  const x = Math.sin(i * 127.1 + n * 311.7) * 43758.5453;
  return x - Math.floor(x);
};

const DOODLES = Array.from({ length: 54 }, (_, i) => ({
  Icon: ICONS[i % ICONS.length],
  top: `${(rand(i, 1) * 96).toFixed(2)}%`,
  left: `${(rand(i, 2) * 96).toFixed(2)}%`,
  size: 16 + Math.round(rand(i, 3) * 34),
  rot: Math.round(rand(i, 4) * 360),
  dur: (3 + rand(i, 5) * 5).toFixed(2),
  delay: (rand(i, 6) * 4).toFixed(2),
  tone: i % 3, // 0 blanc, 1 ambre, 2 rouge
}));

const toneClass = ["text-white/10", "text-amber-300/20", "text-red-400/20"];

export default function Loader() {
  return (
    <div className="relative flex min-h-[100dvh] w-full items-center justify-center overflow-hidden bg-gradient-to-br from-[#2a0303] via-[#6d0d0d] to-[#3a0505]">
      {/* halos */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500/20 blur-[120px]" />
      <div className="pointer-events-none absolute right-10 top-10 h-64 w-64 rounded-full bg-amber-500/10 blur-[90px]" />

      {/* doodles / icônes en arrière-plan (beaucoup) */}
      <div className="pointer-events-none absolute inset-0">
        {DOODLES.map((d, i) => {
          const Icon = d.Icon;
          return (
            <span
              key={i}
              className={`loader-float absolute ${toneClass[d.tone]}`}
              style={{
                top: d.top,
                left: d.left,
                transform: `rotate(${d.rot}deg)`,
                animationDuration: `${d.dur}s`,
                animationDelay: `${d.delay}s`,
              }}
            >
              <Icon size={d.size} strokeWidth={1.75} />
            </span>
          );
        })}
      </div>

      {/* bloc central */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <div className="relative h-44 w-44">
          {/* anneau de progression qui tourne */}
          <div className="loader-spin absolute inset-0 rounded-full border-[6px] border-white/10 border-t-amber-400 border-r-red-500" />
          {/* pointillés qui tournent à l'envers */}
          <div className="loader-spin-rev absolute inset-1.5 rounded-full border-2 border-dashed border-white/20" />
          {/* image de burger */}
          <img
            src={burger}
            alt="YossFood"
            className="absolute inset-3 rounded-full object-cover shadow-2xl"
          />
          {/* logo au centre */}
          <div className="absolute inset-0 grid place-items-center">
            <div className="grid h-24 w-24 place-items-center rounded-full bg-white/95 shadow-xl ring-4 ring-white/40">
              <img src={logo} alt="YossFood" className="h-20 w-20 object-contain" />
            </div>
          </div>
        </div>

        <p className="mt-8 text-2xl font-black tracking-tight text-white">YossFood</p>
        <p className="mt-1 text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">
          La passion dans chaque bouchée
        </p>

        {/* barre de progression stylée (indéterminée) */}
        <div className="mt-6 h-2.5 w-64 max-w-[70vw] overflow-hidden rounded-full bg-white/15 shadow-inner">
          <div className="loader-bar h-full w-2/5 rounded-full bg-gradient-to-r from-amber-400 via-red-500 to-amber-400" />
        </div>
        <p className="mt-3 flex items-center gap-2 text-xs font-semibold text-gray-300">
          <Flame size={13} className="text-red-400" /> Préparation de votre festin…
        </p>
      </div>

      <style>{`
        @keyframes loaderSpin { to { transform: rotate(360deg); } }
        @keyframes loaderSpinRev { to { transform: rotate(-360deg); } }
        @keyframes loaderBar {
          0% { transform: translateX(-130%); }
          100% { transform: translateX(320%); }
        }
        @keyframes loaderFloat {
          0%, 100% { transform: translateY(0) rotate(var(--r,0deg)); }
          50% { transform: translateY(-10px) rotate(var(--r,0deg)); }
        }
        .loader-spin { animation: loaderSpin 1.1s linear infinite; }
        .loader-spin-rev { animation: loaderSpinRev 3.5s linear infinite; }
        .loader-bar { animation: loaderBar 1.25s ease-in-out infinite; }
        .loader-float { animation: loaderFloat 5s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
