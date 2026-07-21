"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Phone,
  User,
  ShoppingBag,
  Star,
  Truck,
  Pizza,
  Beef,
  Drumstick,
  CupSoda,
  Salad,
  Utensils,
  UtensilsCrossed,
  Flame,
  Leaf,
  Plus,
  ChevronRight,
  Clock,
  MapPin,
  Instagram,
  Facebook,
  Twitter,
  Bike,
  BadgePercent,
  Menu as MenuIcon,
} from "lucide-react";

const logo = "/yfl1.png";
const CURRENCY = "FCFA";

/* Images (Unsplash) */
const IMG = {
  heroBurger:
    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=900&q=80&auto=format&fit=crop",
  burger1:
    "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80&auto=format&fit=crop",
  burger2:
    "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=800&q=80&auto=format&fit=crop",
  burger3:
    "https://images.unsplash.com/photo-1610440042657-612c34d95e9f?w=800&q=80&auto=format&fit=crop",
  fries:
    "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=800&q=80&auto=format&fit=crop",
  chickenFingers:
    "https://images.unsplash.com/photo-1562967914-608f82629710?w=600&q=80&auto=format&fit=crop",
  nuggets:
    "https://images.unsplash.com/photo-1619881590738-a111d176d906?w=600&q=80&auto=format&fit=crop",
  broast:
    "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=600&q=80&auto=format&fit=crop",
  tempura:
    "https://images.unsplash.com/photo-1608039755401-742074f0548d?w=600&q=80&auto=format&fit=crop",
  wings:
    "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=600&q=80&auto=format&fit=crop",
  grilled:
    "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=600&q=80&auto=format&fit=crop",
  pizza1:
    "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=80&auto=format&fit=crop",
  pizza2:
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80&auto=format&fit=crop",
  pizza3:
    "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&q=80&auto=format&fit=crop",
  pizza4:
    "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=600&q=80&auto=format&fit=crop",
  cola:
    "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=600&q=80&auto=format&fit=crop",
  juice:
    "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=600&q=80&auto=format&fit=crop",
  coffee:
    "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80&auto=format&fit=crop",
  shake:
    "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&q=80&auto=format&fit=crop",
  sauce1:
    "https://images.unsplash.com/photo-1472476443507-c7a5948772fc?w=600&q=80&auto=format&fit=crop",
  sauce2:
    "https://images.unsplash.com/photo-1607013251379-e6eecfffe234?w=600&q=80&auto=format&fit=crop",
  combo1:
    "https://images.unsplash.com/photo-1610440042657-612c34d95e9f?w=600&q=80&auto=format&fit=crop",
  combo2:
    "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=600&q=80&auto=format&fit=crop",
  rider:
    "https://images.unsplash.com/photo-1526367790999-0150786686a2?w=900&q=80&auto=format&fit=crop",
};

/* Image avec fallback icône (aucun emoji) */
function Dish({ src, alt, Icon = Utensils, className = "", imgClass = "" }) {
  const [error, setError] = useState(false);
  if (error || !src) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-red-100 to-amber-100 ${className}`}>
        <Icon className="h-1/3 w-1/3 min-h-6 min-w-6 text-red-500" />
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setError(true)}
      className={`${className} ${imgClass}`}
    />
  );
}

/* Titre script rouge ("Le Meilleur en Ville"...) */
const Script = ({ children, className = "" }) => (
  <p className={`khadyo-script text-2xl text-red-600 ${className}`}>{children}</p>
);

/* ---------------------------------------------------------------- */
/*  MENU COMPLET (données) — prix en FCFA                          */
/* ---------------------------------------------------------------- */
const CATEGORIES = [
  {
    id: "pizza",
    label: "Pizza",
    Icon: Pizza,
    items: [
      { name: "Margherita Classique", desc: "Sauce tomate, mozzarella, basilic frais", price: "3 500", img: IMG.pizza1, Icon: Pizza },
      { name: "Pepperoni Suprême", desc: "Pepperoni, mozzarella, origan", price: "4 500", img: IMG.pizza2, Icon: Pizza },
      { name: "BBQ Chicken", desc: "Poulet grillé, sauce BBQ, oignons rouges", price: "5 000", img: IMG.pizza3, Icon: Pizza },
      { name: "Veggie Garden", desc: "Poivrons, champignons, olives, maïs", price: "4 000", img: IMG.pizza4, Icon: Pizza },
    ],
  },
  {
    id: "burger",
    label: "Burger",
    Icon: Beef,
    items: [
      { name: "Signature Beef Burger", desc: "Bœuf 200g, cheddar vieilli, laitue, BBQ", price: "3 500", img: IMG.heroBurger, Icon: Beef },
      { name: "Double Cheese", desc: "Double steak, double cheddar, cornichons", price: "4 500", img: IMG.burger1, Icon: Beef },
      { name: "Crispy Chicken Burger", desc: "Poulet pané croustillant, sauce blanche", price: "3 000", img: IMG.burger2, Icon: Drumstick },
      { name: "Spicy BBQ Burger", desc: "Steak épicé, oignons frits, sauce BBQ", price: "3 800", img: IMG.burger3, Icon: Flame },
    ],
  },
  {
    id: "chicken",
    label: "Chicken",
    Icon: Drumstick,
    items: [
      { name: "Golden Chicken Fingers", desc: "10 pièces poulet, sauce, frites", price: "3 500", img: IMG.chickenFingers, Icon: Drumstick },
      { name: "Chicken Nuggets", desc: "10 pièces poulet, sauce, frites", price: "3 000", img: IMG.nuggets, Icon: Drumstick },
      { name: "Chicken Broast", desc: "Poulet entier, sauce, frites moyennes", price: "6 500", img: IMG.broast, Icon: Drumstick },
      { name: "Tempura Chicken", desc: "12 pièces poulet, sauce, frites", price: "6 900", img: IMG.tempura, Icon: Drumstick },
      { name: "Buffalo Wings", desc: "8 ailes épicées, sauce ranch", price: "4 000", img: IMG.wings, Icon: Flame },
      { name: "Grilled Chicken", desc: "Poulet grillé mariné, frites maison", price: "5 500", img: IMG.grilled, Icon: Drumstick },
    ],
  },
  {
    id: "drinks",
    label: "Drinks",
    Icon: CupSoda,
    items: [
      { name: "Jus d'Orange Frais", desc: "Pressé minute, 100% naturel", price: "1 000", img: IMG.juice, Icon: CupSoda },
      { name: "Soda Glacé", desc: "Cola bien frais, glaçons", price: "800", img: IMG.cola, Icon: CupSoda },
      { name: "Iced Coffee", desc: "Café glacé, lait, caramel", price: "1 500", img: IMG.coffee, Icon: CupSoda },
      { name: "Milkshake Vanille", desc: "Onctueux, chantilly maison", price: "2 000", img: IMG.shake, Icon: CupSoda },
    ],
  },
  {
    id: "sauces",
    label: "Sauces",
    Icon: Salad,
    items: [
      { name: "Sauce BBQ Maison", desc: "Fumée, légèrement sucrée", price: "500", img: IMG.sauce1, Icon: Salad },
      { name: "Garlic Mayo", desc: "Mayonnaise à l'ail crémeuse", price: "500", img: IMG.sauce2, Icon: Salad },
      { name: "Cheddar Fondu", desc: "Sauce fromagère onctueuse", price: "700", img: IMG.sauce1, Icon: Salad },
      { name: "Hot Chili", desc: "Piment fort, pour les audacieux", price: "700", img: IMG.sauce2, Icon: Flame },
    ],
  },
  {
    id: "combo",
    label: "Combo Menu",
    Icon: UtensilsCrossed,
    items: [
      { name: "Family Combo", desc: "4 burgers, 2 frites, 4 boissons", price: "12 000", img: IMG.combo1, Icon: UtensilsCrossed },
      { name: "Duo Combo", desc: "2 burgers, 1 frites XL, 2 sodas", price: "6 500", img: IMG.combo2, Icon: UtensilsCrossed },
      { name: "Party Bucket", desc: "12 pièces poulet, frites, 4 sauces", price: "9 500", img: IMG.broast, Icon: Drumstick },
      { name: "Solo Meal", desc: "1 burger, frites, 1 boisson", price: "3 000", img: IMG.burger1, Icon: Beef },
    ],
  },
];

/* ================================================================ */
/*  HEADER                                                          */
/* ================================================================ */
function Header() {
  const [open, setOpen] = useState(false);
  const nav = [
    { label: "Accueil", href: "/" },
    { label: "Menu", href: "#menu" },
    { label: "À propos", href: "#about" },
    { label: "Favoris", href: "#favourites" },
    { label: "Contact", href: "#contact" },
  ];
  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-[#fff8ef]/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2.5 md:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <img src={logo} alt="YoosFood" className="h-16 w-16 object-contain md:h-20 md:w-20" />
          <span className="text-2xl font-black tracking-tight text-red-600">YoosFood</span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {nav.map((n) => (
            <a key={n.label} href={n.href} className="text-sm font-bold uppercase tracking-wide text-gray-700 transition hover:text-red-600">
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 md:flex">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-red-100 text-red-600">
              <Truck size={18} />
            </span>
            <div className="leading-tight">
              <p className="text-[10px] font-semibold text-gray-500">Commande & Livraison</p>
              <p className="text-sm font-black text-gray-900">237 691 17 54 80</p>
            </div>
          </div>
          <button className="flex items-center gap-2 rounded-full bg-red-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-red-600/25 transition hover:bg-red-700">
            <User size={16} /> Connexion
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Ouvrir le menu"
            className="grid h-10 w-10 place-items-center rounded-full text-gray-700 lg:hidden"
          >
            <MenuIcon size={22} />
          </button>
        </div>
      </div>

      {/* menu mobile */}
      {open && (
        <div className="border-t border-black/5 bg-[#fff8ef] lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col px-4 py-2">
            {nav.map((n) => (
              <a
                key={n.label}
                href={n.href}
                onClick={() => setOpen(false)}
                className="border-b border-black/5 py-3 text-sm font-bold uppercase tracking-wide text-gray-700"
              >
                {n.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

/* ================================================================ */
/*  HERO                                                            */
/* ================================================================ */
function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#fff8ef]">
      <div className="pointer-events-none absolute -right-24 top-1/2 h-[420px] w-[420px] max-w-full -translate-y-1/2 rounded-full bg-amber-200/40 blur-3xl" />
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 md:px-6 md:py-16 lg:grid-cols-2">
        {/* texte */}
        <div className="relative z-10 text-center lg:text-left">
          <Script>Le Meilleur en Ville</Script>
          <h1 className="mt-2 text-4xl font-black uppercase leading-[1.05] tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            Régalez-vous avec notre{" "}
            <span className="text-red-600">Signature</span> Mighty Beef Burger
          </h1>
          <p className="mx-auto mt-4 max-w-md text-gray-600 lg:mx-0">
            Garni de pommes de terre croustillantes & sauce BBQ maison.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            <button className="flex items-center gap-2 rounded-full bg-red-600 px-7 py-3.5 font-bold text-white shadow-lg shadow-red-600/30 transition hover:bg-red-700">
              Commander <ChevronRight size={18} />
            </button>
            <p className="text-sm font-semibold text-gray-700">
              Seulement <span className="text-2xl font-black text-red-600">3 500 {CURRENCY}</span>
            </p>
          </div>
        </div>

        {/* visuel */}
        <div className="relative z-10 mx-auto w-full max-w-md">
          <div className="relative">
            <Dish
              src={IMG.heroBurger}
              alt="Mighty Beef Burger"
              Icon={Beef}
              className="aspect-square w-full rounded-full object-cover shadow-2xl"
              imgClass="rounded-full object-cover"
            />
            <div className="absolute -left-2 top-2 grid h-24 w-24 rotate-[-12deg] place-items-center rounded-full bg-red-600 text-center text-white shadow-xl md:h-28 md:w-28">
              <div>
                <p className="text-[11px] font-semibold uppercase">Promo</p>
                <p className="text-2xl font-black leading-none">50%</p>
                <p className="text-[11px] font-bold uppercase">Off</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================ */
/*  BENTO PROMOS                                                    */
/* ================================================================ */
function Promos() {
  return (
    <section className="bg-[#fff8ef] pb-4">
      <div className="mx-auto grid max-w-7xl gap-4 px-4 md:px-6 lg:grid-cols-3">
        {/* grande carte */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-400 to-amber-500 p-6 lg:col-span-2">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-3xl font-black uppercase italic text-white drop-shadow sm:text-4xl">Burger</p>
              <p className="text-sm font-bold uppercase tracking-wide text-white/90">
                Le goût parfait pour vous — super facile
              </p>
              <button className="mt-4 flex items-center gap-2 rounded-full bg-gray-900 px-5 py-2 text-xs font-bold text-white">
                Commander <ChevronRight size={14} />
              </button>
            </div>
            <Dish src={IMG.burger1} alt="Burger" Icon={Beef} className="h-28 w-28 shrink-0 rounded-2xl object-cover shadow-lg sm:h-36 sm:w-36" imgClass="rounded-2xl object-cover" />
          </div>
        </div>

        {/* carte réduction */}
        <div className="relative flex items-center gap-4 overflow-hidden rounded-3xl bg-gradient-to-br from-red-500 to-red-600 p-6">
          <div>
            <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-black uppercase text-white">
              <BadgePercent size={12} /> -50%
            </span>
            <p className="mt-2 text-2xl font-black uppercase text-white">Super Délicieux Burger</p>
            <button className="mt-3 rounded-full bg-white px-4 py-1.5 text-xs font-bold text-red-600">Commander</button>
          </div>
          <Dish src={IMG.burger2} alt="Burger" Icon={Beef} className="h-24 w-24 shrink-0 rounded-2xl object-cover" imgClass="rounded-2xl object-cover" />
        </div>

        {/* 3 petites cartes */}
        <div className="relative flex items-center gap-3 overflow-hidden rounded-3xl bg-gray-900 p-5">
          <div className="min-w-0">
            <p className="text-lg font-black uppercase text-white">Grilled Burger</p>
            <p className="text-xs text-gray-300">Offre spéciale du jour</p>
            <p className="mt-1 text-xl font-black text-amber-400">3 000 {CURRENCY}</p>
          </div>
          <Dish src={IMG.burger3} alt="Burger" Icon={Beef} className="h-20 w-20 shrink-0 rounded-2xl object-cover" imgClass="rounded-2xl object-cover" />
        </div>

        <div className="relative flex items-center gap-3 overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 to-red-500 p-5">
          <div className="min-w-0">
            <p className="text-lg font-black uppercase text-white">Hot Burger</p>
            <p className="text-xs text-white/80">Croustillant & épicé</p>
            <span className="mt-1 inline-block rounded-full bg-white px-2 py-0.5 text-xs font-black text-red-600">3 800 {CURRENCY}</span>
          </div>
          <Dish src={IMG.fries} alt="Hot burger" Icon={Beef} className="h-20 w-20 shrink-0 rounded-2xl object-cover" imgClass="rounded-2xl object-cover" />
        </div>

        <div className="relative flex items-center gap-3 overflow-hidden rounded-3xl bg-gradient-to-br from-[#4a0606] to-[#7a0d0d] p-5">
          <div className="min-w-0">
            <span className="inline-block rounded-full bg-amber-500 px-2 py-0.5 text-[10px] font-black text-black">-50% OFF</span>
            <p className="mt-1 text-lg font-black uppercase text-white">Triple Stack Burger</p>
            <p className="text-xs text-gray-300">Édition limitée</p>
          </div>
          <Dish src={IMG.burger1} alt="Triple stack" Icon={Beef} className="h-20 w-20 shrink-0 rounded-2xl object-cover" imgClass="rounded-2xl object-cover" />
        </div>
      </div>
    </section>
  );
}

/* ================================================================ */
/*  CUSTOMER FAVOURITES — LE MENU COMPLET                          */
/* ================================================================ */
function Favourites() {
  const [active, setActive] = useState("chicken");
  const current = CATEGORIES.find((c) => c.id === active) || CATEGORIES[0];

  return (
    <section id="menu" className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="text-center">
          <Script>Notre Sélection Menu</Script>
          <h2 id="favourites" className="mt-1 text-3xl font-black uppercase tracking-tight text-gray-900 sm:text-4xl">
            Les <span className="text-red-600">Favoris</span> de nos Clients
          </h2>
        </div>

        {/* onglets catégories */}
        <div className="hide-scroll mt-8 flex items-center justify-start gap-3 overflow-x-auto pb-2 sm:justify-center">
          {CATEGORIES.map((c) => {
            const Icon = c.Icon;
            const on = c.id === active;
            return (
              <button
                key={c.id}
                onClick={() => setActive(c.id)}
                className={`flex shrink-0 flex-col items-center gap-1.5 rounded-2xl border px-5 py-3 transition ${
                  on
                    ? "border-red-600 bg-red-600 text-white shadow-lg shadow-red-600/25"
                    : "border-gray-200 bg-white text-gray-600 hover:border-red-300 hover:text-red-600"
                }`}
              >
                <Icon size={24} />
                <span className="text-xs font-bold">{c.label}</span>
              </button>
            );
          })}
        </div>

        {/* grille produits */}
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {current.items.map((item) => (
            <article
              key={item.name}
              className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-[#fff8ef] p-3 shadow-sm transition hover:shadow-md"
            >
              <Dish
                src={item.img}
                alt={item.name}
                Icon={item.Icon}
                className="h-24 w-24 shrink-0 rounded-xl object-cover sm:h-28 sm:w-28"
                imgClass="rounded-xl object-cover"
              />
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-lg font-black text-gray-900">{item.name}</h3>
                <p className="mt-0.5 line-clamp-2 text-sm text-gray-500">{item.desc}</p>
                <div className="mt-2 flex items-center justify-between">
                  <p className="text-lg font-black text-red-600">{item.price} {CURRENCY}</p>
                  <button className="flex items-center gap-1 rounded-full bg-gray-900 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-red-600">
                    <Plus size={13} /> Ajouter
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================ */
/*  PREMIUM INGREDIENTS                                             */
/* ================================================================ */
function Premium() {
  const labels = [
    { Icon: Leaf, t: "Légumes du Jardin Frais" },
    { Icon: Beef, t: "Cheddar Premium" },
    { Icon: Flame, t: "Steak Grillé au Charbon" },
    { Icon: Salad, t: "Sauce Signature Maison" },
  ];
  return (
    <section id="about" className="bg-[#fff8ef] py-16">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 md:px-6 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          <Script>Pourquoi nos Clients nous Aiment</Script>
          <h2 className="mt-1 text-3xl font-black uppercase tracking-tight text-gray-900 sm:text-4xl">
            Préparé avec des <span className="text-red-600">Ingrédients</span> de Qualité Premium
          </h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {labels.map((l) => {
              const Icon = l.Icon;
              return (
                <div key={l.t} className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-3 shadow-sm">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-red-100 text-red-600">
                    <Icon size={20} />
                  </span>
                  <p className="text-sm font-bold text-gray-800">{l.t}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-7 flex flex-wrap items-center gap-5">
            <div>
              <p className="text-sm font-semibold text-gray-500">Notre Signature Beef Burger</p>
              <p className="text-3xl font-black text-red-600">3 500 {CURRENCY}</p>
            </div>
            <button className="flex items-center gap-2 rounded-full bg-red-600 px-6 py-3 font-bold text-white shadow-lg shadow-red-600/30 transition hover:bg-red-700">
              Commander <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="relative order-1 mx-auto w-full max-w-md lg:order-2">
          <Dish
            src={IMG.heroBurger}
            alt="Ingrédients premium"
            Icon={Beef}
            className="aspect-square w-full rounded-3xl object-cover shadow-2xl"
            imgClass="rounded-3xl object-cover"
          />
          <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-white px-3 py-1.5 shadow-lg">
            <Star size={14} className="fill-amber-400 text-amber-400" />
            <span className="text-xs font-black text-gray-900">4.9 / 5</span>
          </div>
          <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-red-600 px-3 py-1.5 text-white shadow-lg">
            <Clock size={14} />
            <span className="text-xs font-black">Prêt en 20 min</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================ */
/*  DELIVERY CTA                                                    */
/* ================================================================ */
function DeliveryCTA() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 md:px-6 lg:grid-cols-2">
        <div className="text-center lg:text-left">
          <h2 className="text-3xl font-black uppercase leading-tight tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
            Votre Fast Food préféré{" "}
            <span className="text-red-600">Frais & Rapide</span> à votre Porte
          </h2>
          <p className="mx-auto mt-4 max-w-md text-gray-600 lg:mx-0">
            Commandez en ligne et faites-vous livrer chaud, croustillant et à l'heure,
            partout à Douala.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            <button className="flex items-center gap-2 rounded-full bg-red-600 px-7 py-3.5 font-bold text-white shadow-lg shadow-red-600/30 transition hover:bg-red-700">
              <ShoppingBag size={18} /> Commander maintenant
            </button>
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <MapPin size={16} className="text-red-600" /> Livraison Douala & environs
            </div>
          </div>
          <div className="mt-8 grid max-w-md grid-cols-3 gap-4 text-center lg:mx-0 lg:text-left">
            {[
              ["12K+", "Livraisons"],
              ["4.9★", "Note client"],
              ["20 min", "En moyenne"],
            ].map(([n, l]) => (
              <div key={l}>
                <p className="text-2xl font-black text-red-600">{n}</p>
                <p className="text-xs font-semibold text-gray-500">{l}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <Dish src={IMG.rider} alt="Livraison rapide" Icon={Bike} className="aspect-video w-full rounded-3xl object-cover shadow-2xl" imgClass="rounded-3xl object-cover" />
          <div className="absolute -bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-gray-900 px-5 py-2.5 text-white shadow-xl">
            <Bike size={18} className="text-amber-400" />
            <span className="text-sm font-bold">Livraison express</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================ */
/*  FOOTER                                                          */
/* ================================================================ */
function Footer() {
  return (
    <footer id="contact" className="bg-gray-900 text-gray-300">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-4 md:px-6">
        <div>
          <div className="flex items-center gap-2">
            <img src={logo} alt="YoosFood" className="h-12 w-12 object-contain" />
            <span className="text-2xl font-black text-red-500">YoosFood</span>
          </div>
          <p className="mt-3 text-sm text-gray-400">
            L'Excellence Culinaire à Votre Service. Burgers, poulet & grillades à Douala.
          </p>
          <div className="mt-4 flex gap-3">
            {[Instagram, Facebook, Twitter].map((Icon, i) => (
              <a key={i} href="#" className="grid h-9 w-9 place-items-center rounded-full bg-white/10 transition hover:bg-red-600">
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-3 text-sm font-black uppercase tracking-wide text-white">Menu</p>
          <ul className="space-y-2 text-sm">
            {CATEGORIES.map((c) => (
              <li key={c.id}>
                <a href="#menu" className="transition hover:text-red-400">{c.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-3 text-sm font-black uppercase tracking-wide text-white">Liens</p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="transition hover:text-red-400">Accueil</Link></li>
            <li><a href="#about" className="transition hover:text-red-400">À propos</a></li>
            <li><a href="#favourites" className="transition hover:text-red-400">Favoris</a></li>
            <li><a href="#contact" className="transition hover:text-red-400">Contact</a></li>
          </ul>
        </div>

        <div>
          <p className="mb-3 text-sm font-black uppercase tracking-wide text-white">Contact</p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2"><Phone size={14} className="text-red-500" /> 237 691 17 54 80</li>
            <li className="flex items-center gap-2"><MapPin size={14} className="text-red-500" /> Bonamoussadi, Douala</li>
            <li className="flex items-center gap-2"><Clock size={14} className="text-red-500" /> 10h – 02h, 7j/7</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} YoosFood. Tous droits réservés.
      </div>
    </footer>
  );
}

/* ================================================================ */
/*  PAGE                                                            */
/* ================================================================ */
export default function MenuPage() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-[#fff8ef] text-gray-900">
      <Header />
      <Hero />
      <Promos />
      <Favourites />
      <Premium />
      <DeliveryCTA />
      <Footer />

      <style>{`
        .khadyo-script {
          font-family: 'Brush Script MT', 'Segoe Script', cursive;
          font-weight: 400;
        }
        .hide-scroll { scrollbar-width: none; -ms-overflow-style: none; }
        .hide-scroll::-webkit-scrollbar { display: none; }
      `}</style>
    </main>
  );
}
