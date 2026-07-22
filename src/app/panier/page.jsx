"use client";

import React from "react";
import Link from "next/link";
import {
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  ChevronLeft,
  Utensils,
  MessageCircle,
  MapPin,
} from "lucide-react";
import { useCart, formatFCFA } from "../../context/CartContext";

const logo = "/yfl1.png";
const WHATSAPP = "237691175480";

export default function CartPage() {
  const { items, setQty, removeItem, clear, count, total, ready } = useCart();

  const order = () => {
    const lines = items
      .map((it) => `• ${it.qty} × ${it.name} — ${formatFCFA(it.qty * it.price)}`)
      .join("\n");
    const msg = `Bonjour YossFood ! Je souhaite commander :\n\n${lines}\n\nTotal : ${formatFCFA(
      total
    )}\n\nMerci !`;
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-[#fff8ef] text-gray-900">
      {/* header */}
      <header className="sticky top-0 z-40 border-b border-black/5 bg-[#fff8ef]/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-2.5 md:px-6">
          <Link href="/menu" className="flex items-center gap-2 text-sm font-bold text-gray-700 hover:text-red-600">
            <ChevronLeft size={18} /> Continuer mes achats
          </Link>
          <Link href="/" className="flex shrink-0 items-center">
            <img src={logo} alt="YossFood" className="h-14 w-14 object-contain md:h-16 md:w-16" />
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-10 md:px-6">
        <div className="mb-8 flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-red-600 text-white shadow-lg">
            <ShoppingBag size={22} />
          </span>
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tight text-gray-900">Mon Panier</h1>
            <p className="text-sm text-gray-500">
              {count} article{count > 1 ? "s" : ""} dans votre commande
            </p>
          </div>
        </div>

        {ready && items.length === 0 ? (
          <div className="rounded-3xl border-2 border-dashed border-gray-300 bg-white p-12 text-center">
            <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-red-100 text-red-600">
              <ShoppingBag size={34} />
            </div>
            <p className="mt-5 text-lg font-black text-gray-900">Votre panier est vide</p>
            <p className="mt-1 text-sm text-gray-500">Ajoutez de délicieux plats depuis notre menu.</p>
            <Link
              href="/menu"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-red-600 px-6 py-3 font-bold text-white shadow-lg shadow-red-600/30 transition hover:bg-red-700"
            >
              <Utensils size={18} /> Voir le menu
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-3">
            {/* liste articles */}
            <div className="space-y-4 lg:col-span-2">
              {items.map((it) => (
                <article
                  key={it.id}
                  className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-3 shadow-sm"
                >
                  <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-red-100 to-amber-100">
                    {it.img ? (
                      <img src={it.img} alt={it.name} className="h-full w-full object-cover" />
                    ) : (
                      <span className="grid h-full w-full place-items-center text-red-500">
                        <Utensils size={26} />
                      </span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-base font-black text-gray-900">{it.name}</h3>
                    <p className="text-sm font-bold text-red-600">{formatFCFA(it.price)}</p>
                    <div className="mt-2 flex items-center gap-3">
                      <div className="flex items-center gap-2 rounded-full border border-gray-200 p-1">
                        <button
                          onClick={() => setQty(it.id, it.qty - 1)}
                          aria-label="Diminuer"
                          className="grid h-7 w-7 place-items-center rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-6 text-center text-sm font-black tabular-nums">{it.qty}</span>
                        <button
                          onClick={() => setQty(it.id, it.qty + 1)}
                          aria-label="Augmenter"
                          className="grid h-7 w-7 place-items-center rounded-full bg-red-600 text-white hover:bg-red-700"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(it.id)}
                        className="flex items-center gap-1 text-xs font-semibold text-gray-400 hover:text-red-600"
                      >
                        <Trash2 size={14} /> Retirer
                      </button>
                    </div>
                  </div>
                  <p className="hidden shrink-0 text-base font-black text-gray-900 sm:block">
                    {formatFCFA(it.qty * it.price)}
                  </p>
                </article>
              ))}

              <button
                onClick={clear}
                className="text-sm font-semibold text-gray-400 hover:text-red-600"
              >
                Vider le panier
              </button>
            </div>

            {/* résumé */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                <h2 className="text-lg font-black text-gray-900">Résumé</h2>
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Sous-total</span>
                    <span className="font-bold text-gray-900">{formatFCFA(total)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Livraison</span>
                    <span className="font-bold text-green-600">Offerte</span>
                  </div>
                  <div className="my-2 border-t border-dashed border-gray-200" />
                  <div className="flex justify-between text-base">
                    <span className="font-black text-gray-900">Total</span>
                    <span className="font-black text-red-600">{formatFCFA(total)}</span>
                  </div>
                </div>
                <button
                  onClick={order}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-red-600 py-3.5 font-bold text-white shadow-lg shadow-red-600/30 transition hover:bg-red-700"
                >
                  <MessageCircle size={18} /> Commander sur WhatsApp
                </button>
                <p className="mt-3 flex items-center justify-center gap-1 text-xs text-gray-500">
                  <MapPin size={13} className="text-red-500" /> Livraison Douala & environs
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .khadyo-script { font-family: 'Brush Script MT', 'Segoe Script', cursive; }
      `}</style>
    </main>
  );
}
