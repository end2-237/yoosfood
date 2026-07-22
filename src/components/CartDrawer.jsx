"use client";

import React from "react";
import Link from "next/link";
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ChevronRight,
  MessageCircle,
  Truck,
  Sparkles,
  Drumstick,
  Pizza,
  CupSoda,
  IceCream,
  Sandwich,
  Cookie,
  Beef,
} from "lucide-react";
import { useCart, formatFCFA } from "../context/CartContext";

const WHATSAPP = "237691175480";
const FREE_DELIVERY = 5000;

/* doodles food subtils en fond du tiroir */
const DOODLE_ICONS = [Drumstick, Pizza, CupSoda, IceCream, Sandwich, Cookie, Beef];
const DOODLES = Array.from({ length: 16 }, (_, i) => {
  const r = (n) => {
    const x = Math.sin(i * 33.7 + n * 61.3) * 10000;
    return x - Math.floor(x);
  };
  return {
    Icon: DOODLE_ICONS[i % DOODLE_ICONS.length],
    top: `${(r(1) * 92).toFixed(1)}%`,
    left: `${(r(2) * 88).toFixed(1)}%`,
    size: 20 + Math.round(r(3) * 22),
    rot: Math.round(r(4) * 360),
  };
});

export default function CartDrawer() {
  const { items, isOpen, closeCart, setQty, removeItem, total, count } = useCart();

  const order = () => {
    if (!items.length) return;
    const lines = items
      .map((it) => `• ${it.qty} × ${it.name} — ${formatFCFA(it.qty * it.price)}`)
      .join("\n");
    const msg = `Bonjour YossFood ! Je souhaite commander :\n\n${lines}\n\nTotal : ${formatFCFA(
      total
    )}\n\nMerci !`;
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const remaining = Math.max(0, FREE_DELIVERY - total);
  const progress = Math.min(100, (total / FREE_DELIVERY) * 100);

  return (
    <>
      {/* voile */}
      <div
        onClick={closeCart}
        className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* panneau */}
      <aside
        className={`fixed right-0 top-0 z-[70] flex h-[100dvh] w-[94vw] max-w-md flex-col overflow-hidden bg-[#1a0505] text-white shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!isOpen}
      >
        {/* doodles de fond */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {DOODLES.map((d, i) => {
            const Icon = d.Icon;
            return (
              <span
                key={i}
                className="absolute text-white/[0.05]"
                style={{ top: d.top, left: d.left, transform: `rotate(${d.rot}deg)` }}
              >
                <Icon size={d.size} strokeWidth={1.6} />
              </span>
            );
          })}
        </div>
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-red-600/25 blur-3xl" />

        {/* header */}
        <header className="relative z-10 flex items-center justify-between px-6 pb-4 pt-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-400">Votre commande</p>
            <p className="mt-0.5 flex items-center gap-2 text-2xl font-black">
              <ShoppingBag size={22} className="text-red-500" /> Panier
              <span className="grid h-6 min-w-6 place-items-center rounded-full bg-red-600 px-1.5 text-sm font-black">
                {count}
              </span>
            </p>
          </div>
          <button
            onClick={closeCart}
            aria-label="Fermer"
            className="grid h-10 w-10 place-items-center rounded-full bg-white/10 transition hover:bg-white/20"
          >
            <X size={18} />
          </button>
        </header>

        {items.length === 0 ? (
          <div className="relative z-10 flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <div className="grid h-24 w-24 place-items-center rounded-full bg-white/5 text-red-500 ring-1 ring-white/10">
              <ShoppingBag size={40} />
            </div>
            <div>
              <p className="text-lg font-black">Votre panier est vide</p>
              <p className="mt-1 text-sm text-gray-400">Ajoutez vos plats préférés depuis le menu.</p>
            </div>
            <Link
              href="/menu"
              onClick={closeCart}
              className="rounded-full bg-gradient-to-r from-red-600 to-red-500 px-7 py-3 text-sm font-bold text-white shadow-lg shadow-red-900/40 transition hover:scale-105"
            >
              Découvrir le menu
            </Link>
          </div>
        ) : (
          <>
            {/* barre livraison offerte */}
            <div className="relative z-10 mx-6 mb-3 rounded-2xl border border-white/10 bg-white/5 p-3">
              <p className="flex items-center gap-2 text-xs font-semibold text-gray-200">
                <Truck size={15} className="text-amber-400" />
                {remaining > 0 ? (
                  <>Plus que <span className="font-black text-amber-400">{formatFCFA(remaining)}</span> pour la livraison offerte&nbsp;!</>
                ) : (
                  <span className="flex items-center gap-1 font-black text-green-400">
                    <Sparkles size={14} /> Livraison offerte débloquée !
                  </span>
                )}
              </p>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-amber-400 to-red-500 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* articles */}
            <div className="relative z-10 flex-1 space-y-3 overflow-y-auto px-6 py-1">
              {items.map((it) => (
                <div
                  key={it.id}
                  className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3 transition hover:bg-white/[0.07]"
                >
                  <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-white/10">
                    {it.img ? (
                      <img src={it.img} alt={it.name} className="h-full w-full object-cover" />
                    ) : (
                      <span className="grid h-full w-full place-items-center text-red-400">
                        <ShoppingBag size={24} />
                      </span>
                    )}
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <p className="line-clamp-2 text-sm font-bold leading-tight">{it.name}</p>
                      <button
                        onClick={() => removeItem(it.id)}
                        aria-label="Retirer"
                        className="shrink-0 text-gray-500 transition hover:text-red-500"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <p className="mt-0.5 text-xs text-gray-400">{formatFCFA(it.price)} / unité</p>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="flex items-center gap-1 rounded-full bg-black/40 p-1 ring-1 ring-white/10">
                        <button
                          onClick={() => setQty(it.id, it.qty - 1)}
                          aria-label="Diminuer"
                          className="grid h-7 w-7 place-items-center rounded-full bg-white/10 transition hover:bg-white/20"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="w-6 text-center text-sm font-black tabular-nums">{it.qty}</span>
                        <button
                          onClick={() => setQty(it.id, it.qty + 1)}
                          aria-label="Augmenter"
                          className="grid h-7 w-7 place-items-center rounded-full bg-red-600 transition hover:bg-red-700"
                        >
                          <Plus size={13} />
                        </button>
                      </div>
                      <p className="text-base font-black text-amber-400">{formatFCFA(it.qty * it.price)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* footer */}
            <footer className="relative z-10 border-t border-white/10 bg-black/30 p-6 backdrop-blur">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-300">
                  <span>Sous-total</span>
                  <span className="font-bold text-white">{formatFCFA(total)}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Livraison</span>
                  <span className="font-bold text-green-400">{remaining > 0 ? formatFCFA(800) : "Offerte"}</span>
                </div>
                <div className="mt-1 flex items-center justify-between border-t border-white/10 pt-3 text-lg">
                  <span className="font-black">Total</span>
                  <span className="font-black text-amber-400">
                    {formatFCFA(total + (remaining > 0 ? 800 : 0))}
                  </span>
                </div>
              </div>
              <button
                onClick={order}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-red-600 to-red-500 py-3.5 font-bold text-white shadow-lg shadow-red-900/40 transition hover:scale-[1.02]"
              >
                <MessageCircle size={18} /> Commander sur WhatsApp
              </button>
              <div className="mt-2 flex items-center justify-center gap-4 text-xs font-semibold text-gray-400">
                <button onClick={closeCart} className="transition hover:text-white">Continuer</button>
                <span className="h-3 w-px bg-white/15" />
                <Link href="/panier" onClick={closeCart} className="flex items-center gap-1 transition hover:text-white">
                  Panier complet <ChevronRight size={13} />
                </Link>
              </div>
            </footer>
          </>
        )}
      </aside>
    </>
  );
}
