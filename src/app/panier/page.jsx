"use client";

import React, { useState } from "react";
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
  Check,
  Loader2,
} from "lucide-react";
import { useCart, formatFCFA } from "../../context/CartContext";
import CamilleService from "../../services/CamilleService";
import { useCamilleCatalog } from "../../hooks/useCamilleCatalog";
import { normalizePhone, displayPhone } from "../../lib/phone";

const logo = "/yfl1.png";
// Repli seulement : le numéro fait autorité côté agent Camille.
const WHATSAPP_FALLBACK = "237691175480";

export default function CartPage() {
  const { items, setQty, removeItem, clear, count, total, ready } = useCart();
  const { merchant } = useCamilleCatalog();
  const whatsapp = String(merchant?.whatsapp || WHATSAPP_FALLBACK).replace(/[^0-9]/g, "");

  const [form, setForm] = useState({ name: "", phone: "", address: "", note: "" });
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(null);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  // Commande réelle : elle part chez Camille, qui envoie l'accusé de réception
  // WhatsApp au client, prévient le commerçant et fait apparaître la commande
  // dans son application. Le site n'a aucune base de données à lui.
  const submit = async (e) => {
    e.preventDefault();
    setError("");

    const tel = normalizePhone(form.phone);
    if (tel.error) {
      setError(tel.error);
      return;
    }

    setSending(true);
    const r = await CamilleService.createOrder({
      items: items.map((it) => ({
        id: it.camilleId || undefined,
        name: it.name,
        qty: it.qty,
        price: it.price,
      })),
      customer: { name: form.name, phone: tel.phone },
      delivery: { address: form.address },
      note: form.note,
    });
    setSending(false);

    if (!r.ok) {
      setError(r.error || "La commande n'a pas pu être envoyée.");
      return;
    }
    setDone(r.order || {});
    clear();
  };

  // WhatsApp ouvre une conversation, il ne prend pas la commande : celle-ci
  // passe par l'API Camille juste au-dessus. Envoyer le panier en texte
  // obligeait l'agent à le reconstituer à la lecture, et il s'y trompait.
  const askOnWhatsApp = () => {
    const msg = "Bonjour ! J'ai une question avant de commander.";
    window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(msg)}`, "_blank");
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

        {done ? (
          <div className="rounded-3xl border border-green-200 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-green-100 text-green-600">
              <Check size={38} />
            </div>
            <p className="mt-5 text-2xl font-black text-gray-900">Commande envoyée !</p>
            {done.ref && (
              <p className="mt-1 text-sm text-gray-500">
                Référence <span className="font-black text-gray-900">{done.ref}</span>
              </p>
            )}
            <p className="mx-auto mt-3 max-w-md text-sm text-gray-600">
              Tu vas recevoir la confirmation sur WhatsApp au{" "}
              <span className="font-black text-gray-900">
                {displayPhone(normalizePhone(form.phone).phone || "")}
              </span>
              . Notre équipe te rappelle pour la livraison.
            </p>
            <Link
              href="/menu"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-red-600 px-6 py-3 font-bold text-white shadow-lg shadow-red-600/30 transition hover:bg-red-700"
            >
              <Utensils size={18} /> Retour au menu
            </Link>
          </div>
        ) : ready && items.length === 0 ? (
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
                <form onSubmit={submit} className="mt-5 space-y-3">
                  <input
                    value={form.name}
                    onChange={set("name")}
                    placeholder="Ton nom"
                    className="w-full rounded-xl border-2 border-gray-200 px-4 py-2.5 text-sm font-semibold outline-none focus:border-red-500"
                  />
                  <input
                    value={form.phone}
                    onChange={set("phone")}
                    inputMode="tel"
                    required
                    placeholder="WhatsApp avec indicatif (ex. 237 6 91 17 54 80)"
                    className="w-full rounded-xl border-2 border-gray-200 px-4 py-2.5 text-sm font-semibold outline-none focus:border-red-500"
                  />
                  <input
                    value={form.address}
                    onChange={set("address")}
                    placeholder="Quartier / adresse de livraison"
                    className="w-full rounded-xl border-2 border-gray-200 px-4 py-2.5 text-sm font-semibold outline-none focus:border-red-500"
                  />
                  <textarea
                    value={form.note}
                    onChange={set("note")}
                    rows={2}
                    placeholder="Une précision ? (facultatif)"
                    className="w-full resize-none rounded-xl border-2 border-gray-200 px-4 py-2.5 text-sm font-semibold outline-none focus:border-red-500"
                  />

                  {error && (
                    <p className="rounded-xl bg-red-50 px-3 py-2 text-xs font-semibold text-red-700">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={sending}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-red-600 py-3.5 font-bold text-white shadow-lg shadow-red-600/30 transition hover:bg-red-700 disabled:opacity-60"
                  >
                    {sending ? (
                      <>
                        <Loader2 size={18} className="animate-spin" /> Envoi…
                      </>
                    ) : (
                      <>
                        <ShoppingBag size={18} /> Valider ma commande
                      </>
                    )}
                  </button>
                </form>

                <button
                  onClick={askOnWhatsApp}
                  className="mt-2 flex w-full items-center justify-center gap-2 rounded-full border-2 border-gray-200 py-3 text-sm font-bold text-gray-700 transition hover:border-green-500 hover:text-green-600"
                >
                  <MessageCircle size={17} /> Une question ? Écris-nous
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
