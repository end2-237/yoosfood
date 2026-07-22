"use client";

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

const ICONS = [
  Pizza, Beef, Drumstick, CupSoda, IceCream, Cookie, Salad, Croissant,
  Coffee, Fish, Egg, Carrot, Flame, Sandwich, Cherry, Utensils, Star, Heart,
];

// Anneau de doodles disposés en cercle
const ring = (count, radius, startAt = 0) =>
  Array.from({ length: count }, (_, i) => {
    const angle = startAt + (360 / count) * i;
    const Icon = ICONS[(i + startAt) % ICONS.length];
    const size = 22 + ((i * 7) % 16);
    return { Icon, angle, radius, size };
  });

const RINGS = [
  { items: ring(18, 300), spin: "loader-orbit", tone: "text-white/25" },
  { items: ring(13, 210, 4), spin: "loader-orbit-rev", tone: "text-amber-300/30" },
  { items: ring(9, 130, 7), spin: "loader-orbit-slow", tone: "text-red-400/30" },
];

export default function Loader() {
  return (
    <div className="relative grid min-h-[100dvh] w-full place-items-center overflow-hidden bg-gradient-to-br from-[#2a0303] via-[#6d0d0d] to-[#3a0505]">
      <div className="relative grid h-[680px] max-h-[100dvh] w-[680px] max-w-full place-items-center">
        {/* image blur rouge (le halo qu'on a dans le site) */}
        <div className="pointer-events-none absolute h-72 w-72 rounded-full bg-red-500/40 blur-[90px]" />
        <div className="pointer-events-none absolute h-96 w-96 rounded-full bg-red-600/20 blur-[130px]" />

        {/* anneaux de doodles qui tournent autour du halo */}
        {RINGS.map((r, ri) => (
          <div key={ri} className={`pointer-events-none absolute h-full w-full ${r.spin}`}>
            {r.items.map((d, i) => {
              const Icon = d.Icon;
              return (
                <span
                  key={i}
                  className={`absolute left-1/2 top-1/2 ${r.tone}`}
                  style={{
                    transform: `translate(-50%, -50%) rotate(${d.angle}deg) translateY(-${d.radius}px) rotate(${-d.angle}deg)`,
                  }}
                >
                  <Icon size={d.size} strokeWidth={1.8} />
                </span>
              );
            })}
          </div>
        ))}

        {/* gros logo au centre */}
        <img
          src={logo}
          alt="YossFood"
          className="loader-pulse relative z-10 h-64 w-64 object-contain drop-shadow-2xl md:h-80 md:w-80"
        />
      </div>

      <style>{`
        @keyframes loaderOrbit { to { transform: rotate(360deg); } }
        @keyframes loaderOrbitRev { to { transform: rotate(-360deg); } }
        @keyframes loaderPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.06); }
        }
        .loader-orbit { animation: loaderOrbit 26s linear infinite; }
        .loader-orbit-rev { animation: loaderOrbitRev 20s linear infinite; }
        .loader-orbit-slow { animation: loaderOrbit 34s linear infinite; }
        .loader-pulse { animation: loaderPulse 2.2s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
