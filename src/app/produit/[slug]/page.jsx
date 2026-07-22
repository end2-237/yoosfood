"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ChevronLeft,
  ShoppingBag,
  Plus,
  Minus,
  Star,
  Truck,
  Flame,
  Clock,
  Check,
  ChevronRight,
  Utensils,
  Leaf,
  Pizza,
  Beef,
  Drumstick,
  CupSoda,
  Salad,
  IceCream,
  Cookie,
} from "lucide-react";
import { useCart, formatFCFA } from "../../../context/CartContext";
import { getProduct, relatedProducts } from "../../../data/menu";

const logo = "/yfl1.png";
const priceNum = (p) => Number(String(p).replace(/[^\d]/g, "")) || 0;

/* doodles food en fond (léger) */
const SCATTER_ICONS = [Pizza, Beef, Drumstick, CupSoda, Salad, IceCream, Cookie, Leaf, Flame, Utensils];
const SCATTER = Array.from({ length: 24 }, (_, i) => {
  const r = (n) => {
    const x = Math.sin(i * 47.3 + n * 71.1) * 10000;
    return x - Math.floor(x);
  };
  return {
    Icon: SCATTER_ICONS[i % SCATTER_ICONS.length],
    top: `${(r(1) * 94).toFixed(1)}%`,
    left: `${(r(2) * 95).toFixed(1)}%`,
    size: 18 + Math.round(r(3) * 26),
    rot: Math.round(r(4) * 360),
    tone: ["text-red-200", "text-amber-200", "text-orange-200"][i % 3],
  };
});
function Scatter() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {SCATTER.map((d, i) => {
        const Icon = d.Icon;
        return (
          <span key={i} className={`absolute ${d.tone}`} style={{ top: d.top, left: d.left, transform: `rotate(${d.rot}deg)` }}>
            <Icon size={d.size} strokeWidth={1.6} />
          </span>
        );
      })}
    </div>
  );
}

function MiniHeader() {
  const { count, openCart } = useCart();
  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-[#fff8ef]/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2.5 md:px-6">
        <Link href="/menu" className="flex items-center gap-2 text-sm font-bold text-gray-700 hover:text-red-600">
          <ChevronLeft size={18} /> Retour au menu
        </Link>
        <Link href="/" className="flex shrink-0 items-center">
          <img src={logo} alt="YossFood" className="h-12 w-12 object-contain md:h-14 md:w-14" />
        </Link>
        <button
          onClick={openCart}
          aria-label="Panier"
          className="relative grid h-10 w-10 place-items-center rounded-full bg-red-100 text-red-600 transition hover:bg-red-200"
        >
          <ShoppingBag size={18} />
          {count > 0 && (
            <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-red-600 px-1 text-[10px] font-black text-white">
              {count}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}

export default function ProductPage() {
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const product = getProduct(slug);
  const { addItem, openCart } = useCart();
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#fff8ef] px-6 text-center">
        <div>
          <p className="text-2xl font-black text-gray-900">Produit introuvable</p>
          <Link href="/menu" className="mt-4 inline-flex items-center gap-2 rounded-full bg-red-600 px-6 py-3 font-bold text-white">
            <Utensils size={18} /> Voir le menu
          </Link>
        </div>
      </main>
    );
  }

  const related = relatedProducts(product, 4);
  const Icon = product.Icon || Utensils;
  const totalPrice = priceNum(product.price) * qty;

  const add = () => addItem({ name: product.name, price: product.price, img: product.img }, qty);

  const ingredients = product.desc.split(/,\s*/).filter(Boolean);
  const features = [
    { Icon: Truck, t: "Livraison rapide", s: "30–45 min" },
    { Icon: Flame, t: "Chaud & frais", s: "Cuit à la commande" },
    { Icon: Star, t: "4.9 / 5", s: "Avis clients" },
  ];

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-[#fff8ef] text-gray-900">
      <MiniHeader />

      <div className="relative">
        <Scatter />
        <div className="relative z-10 mx-auto max-w-6xl px-4 py-6 md:px-6 md:py-10">
          {/* fil d'ariane */}
          <nav className="mb-6 flex flex-wrap items-center gap-1 text-xs font-semibold text-gray-500">
            <Link href="/" className="hover:text-red-600">Accueil</Link>
            <ChevronRight size={13} />
            <Link href="/menu" className="hover:text-red-600">Menu</Link>
            <ChevronRight size={13} />
            <span className="text-red-600">{product.category}</span>
            <ChevronRight size={13} />
            <span className="truncate text-gray-800">{product.name}</span>
          </nav>

          {/* détail */}
          <div className="grid items-start gap-8 lg:grid-cols-2">
            {/* image */}
            <div className="relative">
              <div className="overflow-hidden rounded-3xl shadow-2xl ring-1 ring-black/5">
                <img src={product.img} alt={product.name} className="aspect-square w-full object-cover" />
              </div>
              <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-black text-red-600 shadow">
                <Icon size={14} /> {product.category}
              </div>
              <div className="absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full bg-red-600 px-3 py-1.5 text-xs font-black text-white shadow-lg">
                <Star size={13} className="fill-white" /> Best-seller
              </div>
            </div>

            {/* infos */}
            <div>
              <p className="khadyo-script text-2xl text-red-600">Fait maison</p>
              <h1 className="mt-1 text-4xl font-black uppercase leading-[1.05] tracking-tight text-gray-900 sm:text-5xl">
                {product.name}
              </h1>
              <p className="mt-4 max-w-md text-gray-600">{product.desc}. Préparé avec des ingrédients frais et notre sauce signature — à déguster bien chaud.</p>

              <div className="mt-5 flex items-end gap-3">
                <p className="text-4xl font-black text-red-600">{product.price} FCFA</p>
                <p className="mb-1 text-sm text-gray-400 line-through">{Math.round(priceNum(product.price) * 1.2).toLocaleString("fr-FR")} FCFA</p>
              </div>

              {/* qty + add */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 rounded-full border-2 border-gray-200 bg-white p-1">
                  <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Diminuer" className="grid h-9 w-9 place-items-center rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200">
                    <Minus size={16} />
                  </button>
                  <span className="w-8 text-center text-lg font-black tabular-nums">{qty}</span>
                  <button onClick={() => setQty((q) => q + 1)} aria-label="Augmenter" className="grid h-9 w-9 place-items-center rounded-full bg-red-600 text-white hover:bg-red-700">
                    <Plus size={16} />
                  </button>
                </div>
                <button
                  onClick={add}
                  className="flex flex-1 items-center justify-center gap-2 rounded-full bg-red-600 px-7 py-3.5 font-bold text-white shadow-lg shadow-red-600/30 transition hover:bg-red-700 sm:flex-none"
                >
                  <ShoppingBag size={18} /> Ajouter au panier · {formatFCFA(totalPrice)}
                </button>
              </div>

              {/* features */}
              <div className="mt-6 grid grid-cols-3 gap-3">
                {features.map((f) => {
                  const FI = f.Icon;
                  return (
                    <div key={f.t} className="rounded-2xl border border-gray-100 bg-white p-3 text-center shadow-sm">
                      <FI size={20} className="mx-auto text-red-600" />
                      <p className="mt-1 text-xs font-black text-gray-900">{f.t}</p>
                      <p className="text-[10px] text-gray-500">{f.s}</p>
                    </div>
                  );
                })}
              </div>

              {/* ingrédients */}
              <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                <p className="mb-3 flex items-center gap-2 text-sm font-black uppercase tracking-wide text-gray-900">
                  <Leaf size={16} className="text-red-600" /> Ingrédients
                </p>
                <div className="flex flex-wrap gap-2">
                  {ingredients.map((ing) => (
                    <span key={ing} className="flex items-center gap-1.5 rounded-full bg-[#fff8ef] px-3 py-1.5 text-xs font-semibold text-gray-700 ring-1 ring-black/5">
                      <Check size={13} className="text-green-600" /> {ing}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* vous aimerez aussi */}
          {related.length > 0 && (
            <section className="mt-16">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-black uppercase tracking-tight text-gray-900">
                  Vous aimerez <span className="text-red-600">aussi</span>
                </h2>
                <Link href="/menu" className="flex items-center gap-1 text-sm font-bold text-red-600 hover:underline">
                  Tout le menu <ChevronRight size={15} />
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                {related.map((p) => (
                  <div key={p.slug} className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md">
                    <Link href={`/produit/${p.slug}`} className="block">
                      <img src={p.img} alt={p.name} className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105" />
                    </Link>
                    <div className="p-3">
                      <Link href={`/produit/${p.slug}`}>
                        <h3 className="truncate text-sm font-black text-gray-900 hover:text-red-600">{p.name}</h3>
                      </Link>
                      <div className="mt-1 flex items-center justify-between">
                        <p className="text-sm font-black text-red-600">{p.price} FCFA</p>
                        <button
                          onClick={() => {
                            addItem({ name: p.name, price: p.price, img: p.img });
                          }}
                          aria-label="Ajouter"
                          className="grid h-8 w-8 place-items-center rounded-full bg-gray-900 text-white transition hover:bg-red-600"
                        >
                          <Plus size={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      <style>{`
        .khadyo-script { font-family: 'Brush Script MT', 'Segoe Script', cursive; }
      `}</style>
    </main>
  );
}
