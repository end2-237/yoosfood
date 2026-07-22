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
} from "lucide-react";
import { useCart, formatFCFA } from "../context/CartContext";

const WHATSAPP = "237691175480";

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
        className={`fixed right-0 top-0 z-[70] flex h-[100dvh] w-[92vw] max-w-sm flex-col bg-gradient-to-b from-[#1c0404] to-[#0d0202] text-white shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!isOpen}
      >
        <header className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <p className="flex items-center gap-2 text-lg font-black">
            <ShoppingBag size={20} className="text-red-500" /> Votre panier{" "}
            <span className="text-red-500">({count})</span>
          </p>
          <button
            onClick={closeCart}
            aria-label="Fermer"
            className="grid h-9 w-9 place-items-center rounded-full bg-white/10 transition hover:bg-white/20"
          >
            <X size={18} />
          </button>
        </header>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <div className="grid h-20 w-20 place-items-center rounded-full bg-white/10 text-red-500">
              <ShoppingBag size={34} />
            </div>
            <p className="font-bold">Votre panier est vide</p>
            <Link
              href="/menu"
              onClick={closeCart}
              className="rounded-full bg-red-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-red-700"
            >
              Voir le menu
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {items.map((it) => (
                <div
                  key={it.id}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-2.5"
                >
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-white/10">
                    {it.img ? (
                      <img src={it.img} alt={it.name} className="h-full w-full object-cover" />
                    ) : (
                      <span className="grid h-full w-full place-items-center text-red-400">
                        <ShoppingBag size={22} />
                      </span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold">{it.name}</p>
                    <p className="text-sm font-black text-amber-400">{formatFCFA(it.price)}</p>
                    <div className="mt-1 flex items-center gap-2">
                      <button
                        onClick={() => setQty(it.id, it.qty - 1)}
                        aria-label="Diminuer"
                        className="grid h-6 w-6 place-items-center rounded-full bg-white/10 hover:bg-white/20"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-5 text-center text-sm font-black tabular-nums">{it.qty}</span>
                      <button
                        onClick={() => setQty(it.id, it.qty + 1)}
                        aria-label="Augmenter"
                        className="grid h-6 w-6 place-items-center rounded-full bg-red-600 hover:bg-red-700"
                      >
                        <Plus size={12} />
                      </button>
                      <button
                        onClick={() => removeItem(it.id)}
                        aria-label="Retirer"
                        className="ml-auto text-gray-400 transition hover:text-red-500"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <footer className="border-t border-white/10 p-4">
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-gray-300">
                  <span>Sous-total</span>
                  <span className="font-bold text-white">{formatFCFA(total)}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Livraison</span>
                  <span className="font-bold text-green-400">Offerte</span>
                </div>
                <div className="flex justify-between border-t border-white/10 pt-2 text-base">
                  <span className="font-black">Total</span>
                  <span className="font-black text-amber-400">{formatFCFA(total)}</span>
                </div>
              </div>
              <button
                onClick={order}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-red-600 to-red-500 py-3 font-bold text-white transition hover:from-red-700 hover:to-red-600"
              >
                <MessageCircle size={18} /> Commander
              </button>
              <Link
                href="/panier"
                onClick={closeCart}
                className="mt-2 flex w-full items-center justify-center gap-1 rounded-full border border-white/15 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Voir le panier complet <ChevronRight size={15} />
              </Link>
            </footer>
          </>
        )}
      </aside>
    </>
  );
}
