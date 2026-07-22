import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Search,
  User,
  ShoppingBag,
  ChevronRight,
  ChevronLeft,
  Flame,
  Bike,
  Star,
  Clock,
  MapPin,
  Instagram,
  Play,
  Heart,
  Zap,
  Gift,
  Trophy,
  QrCode,
  Plus,
  Navigation,
  Drumstick,
  Sandwich,
  Pizza,
  CupSoda,
  IceCream,
  Salad,
  Cookie,
  ChefHat,
  Carrot,
  Store,
  Smartphone,
  Crown,
  Calendar,
  Sparkles,
  Check,
  Apple,
  Utensils,
  Beef,
  UtensilsCrossed,
  Send,
} from "lucide-react";
import { useCart } from "../../context/CartContext";
import { SupabaseService } from "../../services/SupabaseServices";

// Le logo est servi depuis /public (fond détouré -> voir public/yfl1.png)
const logo = "/yfl1.png";

/* ------------------------------------------------------------------ */
/*  Media helper : image de plat avec fallback dégradé + icône pro     */
/* ------------------------------------------------------------------ */
const Food = ({ src, alt, Icon = Drumstick, className = "", imgClass = "" }) => {
  const [error, setError] = useState(false);
  if (error || !src) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-red-700 via-red-600 to-amber-600 ${className}`}
      >
        <Icon className="h-1/3 w-1/3 min-h-6 min-w-6 text-white/90 drop-shadow" />
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
};

/* Banque d'images (poulet, burgers, wraps...) */
const IMG = {
  bucket:
    "/food/photo-1626645738196-c2a7c87a8f58.jpg",
  chicken:
    "/food/photo-1567620832903-9fc6debc209f.jpg",
  burger:
    "/food/photo-1568901346375-23c9450c58cd.jpg",
  wings:
    "/food/photo-1608039755401-742074f0548d.jpg",
  wrap:
    "/food/photo-1626700051175-6818013e1d4f.jpg",
  boxmeal:
    "/food/photo-1513104890138-7c749659a591.jpg",
  combo:
    "/food/photo-1550547660-d9450f859349.jpg",
  chef:
    "/food/photo-1556910103-1c02745aae4d.jpg",
  spices:
    "/food/photo-1596040033229-a9821ebd058d.jpg",
  tomato:
    "/food/photo-1596040033229-a9821ebd058d.jpg",
  kitchen:
    "/food/photo-1517248135467-4c7edcad34c4.jpg",
  friedmade:
    "/food/photo-1610057099443-fde8c4d50f91.jpg",
  store:
    "/food/photo-1552566626-52f8b828add9.jpg",
  rider:
    "/food/photo-1526367790999-0150786686a2.jpg",
  fries: "/food/photo-1630384060421-cb20d0e0649d.jpg",
  nuggets: "/food/photo-1619881590738-a111d176d906.jpg",
  pizza: "/food/photo-1565299624946-b28f40a0ae38.jpg",
  cola: "/food/photo-1554866585-cd94860890b7.jpg",
  juice: "/food/photo-1600271886742-f049cd451bba.jpg",
  shake: "/food/photo-1572490122747-3968b75cc699.jpg",
  sauce: "/food/photo-1472476443507-c7a5948772fc.jpg",
};

/* Catalogue de produits par catégorie (panneaux 1 & 2) */
const PRODUCTS_BY_CAT = {
  "Pour Vous": [
    { tag: "HOT", meta: "670 kcal", name: "Menu Burger Zinger", price: "2 900 F", img: IMG.burger, Icon: Beef, popular: true },
    { tag: "POPULAIRE", meta: "3 Pièces", name: "Poulet 3 Pièces", price: "3 500 F", img: IMG.chicken, Icon: Drumstick },
    { tag: "NOUVEAU", meta: "8 Pièces", name: "Bucket Extreme", price: "8 900 F", img: IMG.bucket, Icon: Drumstick },
    { tag: "", meta: "Wrap", name: "Menu Twister", price: "2 500 F", img: IMG.wrap, Icon: Sandwich },
  ],
  Buckets: [
    { tag: "FAMILLE", meta: "8 Pièces", name: "Bucket Familial", price: "8 900 F", img: IMG.bucket, Icon: Drumstick, popular: true },
    { tag: "XL", meta: "12 Pièces", name: "Bucket Extreme", price: "12 900 F", img: IMG.bucket, Icon: Drumstick },
    { tag: "", meta: "6 Ailes", name: "Bucket Ailes", price: "3 400 F", img: IMG.wings, Icon: Drumstick },
    { tag: "DUO", meta: "6 Pièces", name: "Bucket Duo", price: "6 500 F", img: IMG.friedmade, Icon: Drumstick },
  ],
  Burgers: [
    { tag: "HOT", meta: "670 kcal", name: "Burger Zinger", price: "2 900 F", img: IMG.burger, Icon: Beef, popular: true },
    { tag: "", meta: "Double", name: "Double Cheese", price: "3 900 F", img: IMG.combo, Icon: Beef },
    { tag: "", meta: "Crispy", name: "Crispy Chicken", price: "3 200 F", img: IMG.chicken, Icon: Drumstick },
    { tag: "ÉPICÉ", meta: "Spicy", name: "Spicy BBQ", price: "3 500 F", img: IMG.burger, Icon: Flame },
  ],
  Menus: [
    { tag: "", meta: "950 kcal", name: "Menu Box Crispy", price: "3 900 F", img: IMG.boxmeal, Icon: Utensils },
    { tag: "", meta: "Wrap", name: "Menu Twister", price: "2 500 F", img: IMG.wrap, Icon: Sandwich },
    { tag: "HOT", meta: "Zinger", name: "Menu Zinger", price: "3 250 F", img: IMG.burger, Icon: Beef, popular: true },
    { tag: "KIDS", meta: "Enfant", name: "Menu Enfant", price: "2 200 F", img: IMG.nuggets, Icon: Cookie },
  ],
  Accompagnements: [
    { tag: "", meta: "Portion", name: "Frites Maison", price: "1 200 F", img: IMG.fries, Icon: Salad },
    { tag: "POPULAIRE", meta: "9 Pièces", name: "Nuggets", price: "2 500 F", img: IMG.nuggets, Icon: Drumstick, popular: true },
    { tag: "", meta: "6 Ailes", name: "Ailes de Poulet", price: "3 400 F", img: IMG.wings, Icon: Drumstick },
    { tag: "", meta: "Onion", name: "Onion Rings", price: "1 500 F", img: IMG.fries, Icon: Salad },
  ],
  Desserts: [
    { tag: "", meta: "Glacé", name: "Milkshake", price: "2 000 F", img: IMG.shake, Icon: IceCream, popular: true },
    { tag: "", meta: "Sundae", name: "Sundae Choco", price: "1 500 F", img: IMG.shake, Icon: IceCream },
    { tag: "", meta: "Maison", name: "Cookie", price: "800 F", img: IMG.boxmeal, Icon: Cookie },
    { tag: "", meta: "Moelleux", name: "Donut", price: "1 000 F", img: IMG.boxmeal, Icon: Cookie },
  ],
  Boissons: [
    { tag: "", meta: "33cl", name: "Soda Glacé", price: "800 F", img: IMG.cola, Icon: CupSoda },
    { tag: "FRAIS", meta: "Pressé", name: "Jus d'Orange", price: "1 000 F", img: IMG.juice, Icon: CupSoda, popular: true },
    { tag: "", meta: "Glacé", name: "Iced Coffee", price: "1 500 F", img: IMG.juice, Icon: CupSoda },
    { tag: "", meta: "50cl", name: "Eau Minérale", price: "500 F", img: IMG.cola, Icon: CupSoda },
  ],
  Sauces: [
    { tag: "", meta: "Maison", name: "Sauce BBQ", price: "500 F", img: IMG.sauce, Icon: Salad },
    { tag: "", meta: "Crémeuse", name: "Garlic Mayo", price: "500 F", img: IMG.sauce, Icon: Salad },
    { tag: "", meta: "Fondue", name: "Cheddar", price: "700 F", img: IMG.sauce, Icon: Salad },
    { tag: "FORT", meta: "Piment", name: "Hot Chili", price: "700 F", img: IMG.sauce, Icon: Flame },
  ],
  Wraps: [
    { tag: "", meta: "Poulet", name: "Wrap Twister", price: "2 500 F", img: IMG.wrap, Icon: Sandwich, popular: true },
    { tag: "", meta: "Crispy", name: "Wrap Crispy", price: "2 700 F", img: IMG.wrap, Icon: Sandwich },
    { tag: "ÉPICÉ", meta: "Spicy", name: "Wrap Spicy", price: "2 800 F", img: IMG.wrap, Icon: Flame },
    { tag: "", meta: "Veggie", name: "Wrap Veggie", price: "2 300 F", img: IMG.wrap, Icon: Salad },
  ],
  "Menus Enfant": [
    { tag: "KIDS", meta: "Nuggets", name: "Menu Nuggets", price: "2 200 F", img: IMG.nuggets, Icon: Cookie, popular: true },
    { tag: "", meta: "Mini", name: "Mini Burger", price: "2 000 F", img: IMG.burger, Icon: Beef },
    { tag: "", meta: "+ Jouet", name: "Happy Kids", price: "2 500 F", img: IMG.boxmeal, Icon: Cookie },
    { tag: "", meta: "Frites", name: "Kids Frites", price: "1 500 F", img: IMG.fries, Icon: Salad },
  ],
};

/* ------------------------------------------------------------------ */
/*  Barre de navigation fixe (commune aux 4 panneaux)                  */
/* ------------------------------------------------------------------ */
const NavBar = ({ current, goTo }) => {
  const { count } = useCart();
  const links = [
    { label: "Accueil", panel: 0 },
    { label: "Menu", panel: 1 },
    { label: "Histoire", panel: 2 },
    { label: "App Mobile", panel: 3 },
  ];
  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-40 flex items-center justify-between gap-3 px-4 py-2 md:px-10 md:py-3">
      {/* Logo */}
      <button
        onClick={() => goTo(0)}
        className="pointer-events-auto flex shrink-0 items-center gap-2"
      >
        <img src={logo} alt="YossFood" className="h-14 w-14 object-contain drop-shadow-lg md:h-16 md:w-16" />
      </button>

      {/* Liens centraux */}
      <nav className="pointer-events-auto hidden items-center gap-1 rounded-full border border-white/10 bg-black/30 px-2 py-1.5 backdrop-blur-md lg:flex">
        {links.map((l) => (
          <button
            key={l.label}
            onClick={() => goTo(l.panel)}
            className={`relative rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
              current === l.panel ? "text-white" : "text-gray-300 hover:text-white"
            }`}
          >
            {l.label}
            {current === l.panel && (
              <span className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-white" />
            )}
          </button>
        ))}
      </nav>

      {/* Actions droite */}
      <div className="pointer-events-auto flex shrink-0 items-center gap-2 text-white md:gap-3">
        <button className="hidden rounded-full p-2 transition hover:bg-white/10 sm:block">
          <Search size={20} />
        </button>
        <button className="hidden rounded-full p-2 transition hover:bg-white/10 sm:block">
          <User size={20} />
        </button>
        <Link href="/panier" aria-label="Panier" className="relative rounded-full p-2 transition hover:bg-white/10">
          <ShoppingBag size={20} />
          {count > 0 && (
            <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-red-600 px-1 text-[9px] font-black text-white">
              {count}
            </span>
          )}
        </Link>
        <Link
          href="/menu"
          className="hidden items-center gap-2 rounded-full border border-white/25 px-4 py-2 text-sm font-bold text-white transition hover:bg-white/10 sm:flex"
        >
          <UtensilsCrossed size={16} />
          Menu complet
        </Link>
        <button className="flex items-center gap-2 rounded-full bg-gradient-to-r from-red-600 to-red-500 px-4 py-2.5 text-sm font-bold shadow-lg shadow-red-900/40 transition hover:scale-105 md:px-5">
          <ShoppingBag size={16} />
          <span className="hidden sm:inline">Commander</span>
        </button>
      </div>
    </header>
  );
};

/* Petit bandeau réutilisable "OUR MENU. MADE FRESH." */
const Kicker = ({ children }) => (
  <div className="mb-4 flex items-center gap-2">
    <span className="flex gap-0.5">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={`h-3 w-2 ${i % 2 ? "bg-red-500" : "bg-white"} skew-x-[-12deg]`}
        />
      ))}
    </span>
    <span className="text-xs font-bold tracking-[0.2em] text-gray-300">
      {children}
    </span>
  </div>
);

/* Enveloppe de panneau : centre le contenu et le rend scrollable
   verticalement sur les petits écrans (plus rien n'est coupé). */
const PanelShell = ({ children, className = "" }) => (
  <div
    className={`hide-scroll relative z-10 flex h-full flex-col overflow-y-auto px-5 pb-24 pt-24 md:px-10 md:pt-28 ${className}`}
  >
    <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-start lg:justify-center">
      {children}
    </div>
  </div>
);

/* Beaucoup de doodles food en fond du hero */
const HERO_DOODLE_ICONS = [
  Pizza, Beef, Drumstick, CupSoda, IceCream, Cookie, Salad, Carrot,
  Flame, Sandwich, Utensils, Star, Gift, ChefHat,
];
const HERO_DOODLES = Array.from({ length: 50 }, (_, i) => {
  const r = (n) => {
    const x = Math.sin(i * 71.3 + n * 41.7) * 10000;
    return x - Math.floor(x);
  };
  return {
    Icon: HERO_DOODLE_ICONS[i % HERO_DOODLE_ICONS.length],
    top: `${(r(1) * 96).toFixed(1)}%`,
    left: `${(r(2) * 97).toFixed(1)}%`,
    size: 16 + Math.round(r(3) * 30),
    rot: Math.round(r(4) * 360),
    dur: (4 + r(5) * 5).toFixed(2),
    delay: (r(6) * 5).toFixed(2),
    tone: ["text-white/10", "text-amber-300/20", "text-red-400/20"][i % 3],
  };
});

const HeroDoodles = () => (
  <div className="pointer-events-none absolute inset-0 z-[2] overflow-hidden">
    {HERO_DOODLES.map((d, i) => {
      const Icon = d.Icon;
      return (
        <span
          key={i}
          className={`hero-float absolute ${d.tone}`}
          style={{
            top: d.top,
            left: d.left,
            "--r": `${d.rot}deg`,
            animationDuration: `${d.dur}s`,
            animationDelay: `${d.delay}s`,
          }}
        >
          <Icon size={d.size} strokeWidth={1.7} />
        </span>
      );
    })}
  </div>
);

/* ================================================================== */
/*  PANNEAU 1 — ACCUEIL / HERO                                         */
/* ================================================================== */
const PanelHero = () => {
  const { addItem } = useCart();
  const features = [
    { icon: Bike, color: "from-red-600 to-red-500", top: "Livraison en", big: "20 Minutes", sub: "Rapide, chaud & frais à votre porte." },
    { icon: Flame, color: "from-amber-500 to-yellow-500", top: "100%", big: "Poulet Frais", sub: "Pané à la main, cuit à la commande." },
    { icon: Sparkles, color: "from-red-600 to-red-500", top: "Menus", big: "Tendance", sub: "Les favoris de nos clients !" },
    { icon: Star, color: "from-amber-500 to-yellow-500", top: "Note Client", big: "4.9 ★", sub: "Basé sur 58K+ avis clients." },
  ];

  const cats = [
    { label: "Pour Vous", icon: Flame },
    { label: "Buckets", icon: Drumstick },
    { label: "Burgers", icon: Beef },
    { label: "Menus", icon: Utensils },
    { label: "Accompagnements", icon: Salad },
    { label: "Desserts", icon: IceCream },
    { label: "Boissons", icon: CupSoda },
    { label: "Sauces", icon: Cookie },
  ];
  const [cat, setCat] = useState(0);
  const [anim, setAnim] = useState("cat-in");
  const switchCat = (i) => {
    if (i === cat) return;
    setAnim("cat-out");
    setTimeout(() => {
      setCat(i);
      setAnim("cat-in");
    }, 260);
  };
  const products = PRODUCTS_BY_CAT[cats[cat].label] || [];

  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-[#3a0505] via-[#7a0d0d] to-[#4a0606]">
      {/* fond : carrousel infini de vidéos TikTok @12yossfood (autoplay muet) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <TikTokMarquee className="h-full w-full" />
      </div>
      {/* voile dégradé : sombre à gauche (texte lisible), clair à droite (vidéos visibles) */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-[#2a0303]/95 via-[#3a0505]/45 to-transparent" />

      <div className="pointer-events-none absolute left-1/2 top-1/3 z-0 h-[600px] w-[600px] max-w-full -translate-x-1/2 rounded-full bg-red-500/20 blur-[120px]" />

      <HeroDoodles />

      <PanelShell>
        <div className="grid grid-cols-12 gap-6">
          {/* Colonne gauche : texte */}
          <div className="col-span-12 flex flex-col justify-center lg:col-span-4">
            <Kicker>NOUVELLE EXPÉRIENCE. VRAI YOOSFOOD.</Kicker>
            <h1 className="font-black leading-[0.9] tracking-tight text-white [text-shadow:0_4px_20px_rgba(0,0,0,0.4)]">
              <span className="block text-4xl sm:text-5xl md:text-6xl">Croustillant.</span>
              <span className="block text-4xl sm:text-5xl md:text-6xl">Audacieux.</span>
              <span className="block bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-4xl text-transparent sm:text-5xl md:text-6xl">
                Irrésistible.
              </span>
            </h1>
            <p className="mt-5 max-w-sm text-sm text-gray-300 md:text-base">
              L'expérience poulet préférée du Cameroun — plus rapide, plus
              maligne et plus délicieuse que jamais.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <button className="flex items-center gap-3 rounded-full bg-gradient-to-r from-red-600 to-red-500 px-6 py-3.5 font-bold text-white shadow-lg shadow-red-900/40 transition hover:scale-105">
                Commander
                <span className="grid h-6 w-6 place-items-center rounded-full bg-white/20">
                  <ChevronRight size={16} />
                </span>
              </button>
              <Link
                href="/menu"
                className="flex items-center gap-3 rounded-full border border-white/25 px-6 py-3.5 font-bold text-white transition hover:bg-white/10"
              >
                Voir le Menu
                <UtensilsCrossed size={16} />
              </Link>
            </div>
            {/* Carte app */}
            <div className="mt-7 flex max-w-xs items-center gap-3 rounded-2xl border border-white/10 bg-black/30 p-3 backdrop-blur">
              <div className="grid h-14 w-12 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-red-600 to-red-800 text-white">
                <Smartphone size={24} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-white">App YoosFood</p>
                <p className="text-xs text-gray-400">
                  Commande rapide, offres exclusives & récompenses !
                </p>
              </div>
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/10 text-white">
                <ChevronRight size={16} />
              </span>
            </div>
          </div>

          {/* Colonne centre : visuel bucket */}
          <div className="col-span-12 flex items-center justify-center py-6 lg:col-span-4 lg:py-0">
            <div className="relative">
              <Food
                src={IMG.bucket}
                alt="Bucket YoosFood"
                Icon={Drumstick}
                className="h-64 w-64 rounded-full object-cover shadow-2xl sm:h-80 sm:w-80 md:h-[400px] md:w-[400px]"
                imgClass="rounded-full object-cover"
              />
              <div className="absolute -left-3 top-4 grid h-20 w-20 rotate-[-12deg] place-items-center rounded-full border-2 border-dashed border-white bg-white text-center shadow-xl md:h-24 md:w-24">
                <div>
                  <Flame className="mx-auto text-red-600" size={18} />
                  <p className="text-sm font-black leading-none text-red-600">Hot</p>
                  <p className="script text-lg font-bold leading-none text-red-600">Deals</p>
                </div>
              </div>
              <div className="absolute -right-2 top-14 grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-center text-white shadow-xl md:h-24 md:w-24">
                <div>
                  <p className="text-[10px] font-semibold">Dès</p>
                  <p className="text-lg font-black leading-none">1990</p>
                  <p className="text-[10px] font-bold">FCFA</p>
                </div>
              </div>
              <div className="absolute -bottom-1 right-6 grid h-16 w-16 rotate-[10deg] place-items-center rounded-full border-2 border-dashed border-white bg-red-600 text-center text-white shadow-xl md:h-20 md:w-20">
                <div>
                  <p className="script text-base font-bold leading-none">Nouveau</p>
                  <p className="text-[10px] font-bold">Menu</p>
                </div>
              </div>
            </div>
          </div>

          {/* Colonne droite : features */}
          <div className="col-span-12 flex flex-col justify-center gap-3 lg:col-span-4">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div
                  key={i}
                  className="flex items-center gap-4 rounded-2xl border border-white/10 bg-black/25 p-3.5 backdrop-blur transition hover:bg-black/40"
                >
                  <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-to-br ${f.color}`}>
                    <Icon className="text-white" size={22} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-300">{f.top}</p>
                    <p className="text-lg font-black leading-none text-white">{f.big}</p>
                    <p className="mt-1 text-[11px] text-gray-400">{f.sub}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Rangée basse : catégories + produits */}
        <div className="mt-6 lg:mt-4">
          <div className="hide-scroll mb-3 flex items-center gap-2 overflow-x-auto pb-1">
            {cats.map((c, i) => {
              const Icon = c.icon;
              return (
                <button
                  key={c.label}
                  onClick={() => switchCat(i)}
                  className={`flex shrink-0 items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-semibold transition ${
                    i === cat
                      ? "bg-gradient-to-r from-red-600 to-red-500 text-white"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  <Icon size={14} />
                  {c.label}
                </button>
              );
            })}
          </div>
          <div className={`grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4 ${anim}`}>
            {products.map((p) => (
              <div
                key={p.name}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/30 p-2.5 backdrop-blur transition hover:bg-black/50"
              >
                <div className="min-w-0 flex-1">
                  {p.tag && (
                    <span className="mb-1 inline-block rounded bg-amber-500 px-1.5 py-0.5 text-[9px] font-black text-black">
                      {p.tag}
                    </span>
                  )}
                  <p className="truncate text-sm font-bold text-white">{p.name}</p>
                  <p className="text-sm font-black text-amber-400">{p.price}</p>
                </div>
                <Food
                  src={p.img}
                  alt={p.name}
                  Icon={p.Icon}
                  className="h-14 w-14 shrink-0 rounded-xl object-cover"
                  imgClass="rounded-xl object-cover"
                />
                <button
                  onClick={() => addItem({ name: p.name, price: p.price, img: p.img })}
                  className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-red-600 text-white transition hover:scale-110"
                >
                  <Plus size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </PanelShell>
    </div>
  );
};

/* 3 styles de "like" façon réseaux sociaux (utilisés en même temps) */
const LikeBadge = ({ size }) => (
  <div
    className="relative flex items-center gap-1 rounded-xl bg-red-600 px-2 shadow-lg"
    style={{ height: size }}
  >
    <Heart size={size * 0.5} className="text-white" fill="currentColor" />
    <span className="font-black leading-none text-white" style={{ fontSize: size * 0.42 }}>1</span>
    <span className="absolute -bottom-1 left-3 h-2.5 w-2.5 rotate-45 rounded-[2px] bg-red-600" />
  </div>
);
const LikeCircle = ({ size }) => (
  <div
    className="grid place-items-center rounded-full bg-gradient-to-br from-rose-400 to-red-500 shadow-lg"
    style={{ width: size, height: size }}
  >
    <Heart size={size * 0.55} className="text-white" fill="currentColor" />
  </div>
);
const LikeNeon = ({ size }) => (
  <Heart
    size={size}
    className="text-black"
    fill="currentColor"
    style={{ filter: "drop-shadow(3px 3px 0 #22d3ee)" }}
  />
);
const LIKE_VARIANTS = [LikeBadge, LikeCircle, LikeNeon];

/* Likes qui montent en continu (façon live TikTok) — en ARRIÈRE-PLAN,
   au même niveau que les vidéos de l'accueil (derrière le contenu). */
const HEARTS = Array.from({ length: 27 }, (_, i) => {
  const r = (n) => {
    const x = Math.sin(i * 99.7 + n * 57.3) * 10000;
    return x - Math.floor(x);
  };
  return {
    left: `${(r(1) * 100).toFixed(1)}%`,
    size: 26 + Math.round(r(2) * 26),
    dur: (4.5 + r(3) * 5).toFixed(2),
    delay: (r(4) * 8).toFixed(2),
    drift: `${Math.round(r(5) * 80 - 40)}px`,
    variant: i % 3,
  };
});

const HeartsRain = () => (
  <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
    {HEARTS.map((h, i) => {
      const Like = LIKE_VARIANTS[h.variant];
      return (
        <span
          key={i}
          className="tt-heart absolute -bottom-12"
          style={{
            left: h.left,
            animationDuration: `${h.dur}s`,
            animationDelay: `${h.delay}s`,
            "--drift": h.drift,
          }}
        >
          <Like size={h.size} />
        </span>
      );
    })}
  </div>
);

/* ================================================================== */
/*  PANNEAU 2 — MENU                                                   */
/* ================================================================== */
const PanelMenu = () => {
  const { addItem } = useCart();
  const cats = [
    { label: "Burgers", Icon: Beef },
    { label: "Buckets", Icon: Drumstick },
    { label: "Wraps", Icon: Sandwich },
    { label: "Boissons", Icon: CupSoda },
    { label: "Desserts", Icon: IceCream },
    { label: "Menus Enfant", Icon: Cookie },
    { label: "Sauces", Icon: Salad },
  ];
  const [cat, setCat] = useState(0);
  const [anim, setAnim] = useState("cat-in");
  const switchCat = (i) => {
    if (i === cat) return;
    setAnim("cat-out");
    setTimeout(() => {
      setCat(i);
      setAnim("cat-in");
    }, 260);
  };
  const featured = PRODUCTS_BY_CAT[cats[cat].label] || [];
  const sauces = [
    { c: "bg-red-500", n: "Piquante" },
    { c: "bg-amber-400", n: "Miel" },
    { c: "bg-amber-800", n: "BBQ" },
    { c: "bg-gray-100", n: "Blanche" },
  ];

  // Personnalisez votre menu (interactif)
  const SUPP_PRICE = { Fromage: 250, "Extra Crispy": 300, "Extra Poulet": 600 };
  const SIZE_PRICE = { Normal: 0, Grand: 500, XL: 1000 };
  const BASE = 2500;
  const [supp, setSupp] = useState({ Fromage: true, "Extra Crispy": true, "Extra Poulet": false });
  const [size, setSize] = useState("Grand");
  const [sauceSel, setSauceSel] = useState("Piquante");
  const menuTotal =
    BASE +
    SIZE_PRICE[size] +
    Object.keys(supp).reduce((s, k) => s + (supp[k] ? SUPP_PRICE[k] : 0), 0);
  const toggleSupp = (k) => setSupp((p) => ({ ...p, [k]: !p[k] }));

  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-[#2a0404] via-[#5c0909] to-[#320505]">
      <HeartsRain />
      <PanelShell>
        {/* haut : titre + cartes vedettes */}
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 flex flex-col justify-center lg:col-span-3">
            <Kicker>NOTRE MENU. FAIT FRAIS.</Kicker>
            <h2 className="font-black leading-[0.9] text-white">
              <span className="block text-4xl md:text-5xl">Vrai Poulet.</span>
              <span className="block bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-4xl text-transparent md:text-5xl">
                Vrai Bon.
              </span>
            </h2>
            <p className="mt-4 max-w-xs text-sm text-gray-300">
              Pané à la main. Fraîchement cuit. Fait pour vous. Uniquement chez
              YoosFood.
            </p>
            <Link
              href="/menu"
              className="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-white transition hover:bg-white/20"
            >
              <UtensilsCrossed size={15} /> Menu complet
            </Link>
          </div>
          <div className="col-span-12 lg:col-span-9">
            <p className="mb-3 text-xs font-bold tracking-[0.2em] text-gray-400">
              MENUS VEDETTES —
            </p>
            <div className={`hide-scroll flex gap-3 overflow-x-auto pb-2 ${anim}`}>
              {featured.map((f, i) => (
                <div
                  key={f.name}
                  className={`relative w-40 shrink-0 overflow-hidden rounded-2xl border bg-black/40 backdrop-blur sm:w-44 ${
                    i === 0 ? "border-amber-500" : "border-white/10"
                  }`}
                >
                  {f.popular && (
                    <span className="absolute left-2 top-2 z-10 rounded bg-amber-500 px-1.5 py-0.5 text-[9px] font-black text-black">
                      POPULAIRE
                    </span>
                  )}
                  <Food
                    src={f.img}
                    alt={f.name}
                    Icon={f.Icon}
                    className="h-24 w-full object-cover"
                    imgClass="object-cover"
                  />
                  <div className="p-3">
                    <p className="truncate text-sm font-bold text-white">{f.name}</p>
                    <p className="text-[11px] text-gray-400">{f.meta}</p>
                    <p className="mt-1 text-base font-black text-amber-400">{f.price}</p>
                  </div>
                  <button
                    onClick={() => addItem({ name: f.name, price: f.price, img: f.img })}
                    className="absolute bottom-3 right-2 grid h-7 w-7 place-items-center rounded-full bg-white text-red-600 transition hover:scale-110"
                  >
                    <Plus size={15} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* catégories */}
        <div className="hide-scroll my-4 flex gap-2 overflow-x-auto">
          {cats.map((c, i) => {
            const Icon = c.Icon;
            return (
              <button
                key={c.label}
                onClick={() => switchCat(i)}
                className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                  i === cat
                    ? "bg-gradient-to-r from-red-600 to-red-500 text-white"
                    : "border border-white/10 bg-black/20 text-gray-300 hover:text-white"
                }`}
              >
                <Icon size={15} />
                {c.label}
              </button>
            );
          })}
        </div>

        {/* bas : personnalisation + deals de minuit */}
        <div className="grid grid-cols-12 gap-6">
          {/* personnalisation */}
          <div className="col-span-12 rounded-2xl border border-white/10 bg-black/30 p-5 backdrop-blur lg:col-span-6">
            <p className="mb-4 text-sm font-black tracking-wide text-white">
              PERSONNALISEZ VOTRE MENU
            </p>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <div>
                <p className="mb-2 text-xs text-gray-400">Suppléments</p>
                {Object.keys(SUPP_PRICE).map((n) => {
                  const on = supp[n];
                  return (
                    <button
                      key={n}
                      type="button"
                      onClick={() => toggleSupp(n)}
                      className="mb-1.5 flex w-full items-center gap-2 text-left text-xs text-white"
                    >
                      <span
                        className={`grid h-4 w-4 shrink-0 place-items-center rounded transition ${
                          on ? "bg-red-600" : "border border-white/30"
                        }`}
                      >
                        {on && <Check size={11} className="text-white" />}
                      </span>
                      <span className="flex-1">{n}</span>
                      <span className="text-gray-400">+{SUPP_PRICE[n]} F</span>
                    </button>
                  );
                })}
              </div>
              <div>
                <p className="mb-2 text-xs text-gray-400">Sauce</p>
                <div className="grid grid-cols-2 gap-1.5">
                  {sauces.map((s) => (
                    <button
                      key={s.n}
                      type="button"
                      title={s.n}
                      onClick={() => setSauceSel(s.n)}
                      className={`grid h-9 place-items-center rounded-lg border bg-black/40 transition ${
                        sauceSel === s.n ? "border-red-500 ring-2 ring-red-500/40" : "border-white/10"
                      }`}
                    >
                      <span className={`h-4 w-4 rounded-full ${s.c}`} />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-2 text-xs text-gray-400">Taille</p>
                {["Normal", "Grand", "XL"].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setSize(t)}
                    className={`mb-1.5 block w-full rounded-lg px-2 py-1.5 text-center text-xs font-semibold transition ${
                      size === t ? "bg-red-600 text-white" : "bg-black/40 text-gray-300 hover:bg-black/60"
                    }`}
                  >
                    {t}
                    {SIZE_PRICE[t] > 0 && <span className="ml-1 text-[10px] opacity-70">+{SIZE_PRICE[t]} F</span>}
                  </button>
                ))}
              </div>
              <div>
                <p className="mb-2 text-xs text-gray-400">Votre Menu</p>
                <div className="rounded-xl bg-black/40 p-3 text-center">
                  <p className="text-xs text-gray-400">Menu Zinger · {size}</p>
                  <p className="my-1 text-xl font-black text-amber-400">
                    {menuTotal.toLocaleString("fr-FR")} F
                  </p>
                  <button
                    onClick={() =>
                      addItem({
                        name: `Menu Zinger ${size} · Sauce ${sauceSel}`,
                        price: menuTotal,
                        img: IMG.burger,
                      })
                    }
                    className="w-full rounded-full bg-gradient-to-r from-red-600 to-red-500 py-2 text-xs font-bold text-white transition hover:from-red-700 hover:to-red-600"
                  >
                    Ajouter au panier
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* deals de minuit */}
          <div className="col-span-12 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#1a0202] to-[#3a0505] p-5 lg:col-span-6">
            <span className="mb-2 inline-block rounded bg-red-600 px-2 py-0.5 text-[9px] font-black text-white">
              TEMPS LIMITÉ
            </span>
            <h3 className="text-2xl font-black leading-none text-white">
              DEALS POULET <span className="text-red-500">DE MINUIT</span>
            </h3>
            <p className="mt-1 text-xs text-gray-400">
              Des offres imbattables. Uniquement la nuit.
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {["02", "47", "39"].map((t, i) => (
                <React.Fragment key={i}>
                  <span className="rounded-lg bg-black/50 px-3 py-1.5 text-xl font-black text-white">
                    {t}
                  </span>
                  {i < 2 && <span className="text-white">:</span>}
                </React.Fragment>
              ))}
              <span className="ml-1 flex items-center gap-1 rounded-full bg-amber-500 px-2 py-1 text-[10px] font-black text-black">
                <Clock size={11} /> 22h – 02h
              </span>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {[
                { n: "Bucket Nuit", p: "3 990 F", o: "6 590 F", img: IMG.bucket, Icon: Drumstick },
                { n: "Zinger Minuit", p: "3 490 F", o: "5 590 F", img: IMG.burger, Icon: Beef },
                { n: "Ailes Nuit", p: "1 990 F", o: "3 290 F", img: IMG.wings, Icon: Drumstick },
              ].map((d) => (
                <button
                  key={d.n}
                  onClick={() => addItem({ name: d.n, price: d.p, img: d.img })}
                  className="group rounded-xl border border-white/10 bg-black/40 p-2 text-left transition hover:border-red-500/60 hover:bg-black/60"
                >
                  <Food
                    src={d.img}
                    alt={d.n}
                    Icon={d.Icon}
                    className="mb-1 h-14 w-full rounded-lg object-cover"
                    imgClass="rounded-lg object-cover"
                  />
                  <p className="truncate text-[11px] font-bold text-white">{d.n}</p>
                  <p className="text-sm font-black text-amber-400">{d.p}</p>
                  <p className="text-[10px] text-gray-500 line-through">{d.o}</p>
                  <span className="mt-1 flex items-center gap-1 text-[10px] font-bold text-red-400 opacity-0 transition group-hover:opacity-100">
                    <Plus size={11} /> Ajouter
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </PanelShell>
    </div>
  );
};

/* Sélecteur d'étoiles */
const StarPicker = ({ value, onChange }) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map((n) => (
      <button
        key={n}
        type="button"
        onClick={() => onChange(n)}
        aria-label={`${n} étoile${n > 1 ? "s" : ""}`}
        className={n <= value ? "text-amber-400" : "text-gray-600"}
      >
        <Star size={20} fill="currentColor" />
      </button>
    ))}
  </div>
);

/* Formulaire "laisser un avis" */
const ReviewForm = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [sent, setSent] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;
    const clean = name.trim();
    onAdd({ t: comment.trim(), u: "@" + clean.toLowerCase().replace(/\s+/g, ""), rating });
    try {
      await SupabaseService.addReview({
        name: clean,
        role: "Client",
        rating,
        comment: comment.trim(),
        avatar: clean.slice(0, 2).toUpperCase(),
        approved: false,
      });
    } catch (e2) {
      /* hors-ligne : l'avis reste affiché localement */
    }
    setName("");
    setComment("");
    setRating(5);
    setSent(true);
    setTimeout(() => setSent(false), 2500);
  };

  return (
    <form onSubmit={submit} className="space-y-2">
      <p className="flex items-center gap-2 text-xs font-black uppercase tracking-wide text-white">
        <Star size={13} className="text-amber-400" fill="currentColor" /> Laisser un avis
      </p>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Votre nom"
          className="w-full rounded-lg bg-white/10 px-3 py-2 text-sm text-white placeholder-gray-400 outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-red-500 sm:w-40"
        />
        <StarPicker value={rating} onChange={setRating} />
      </div>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Partagez votre expérience…"
        rows={2}
        className="w-full resize-none rounded-lg bg-white/10 px-3 py-2 text-sm text-white placeholder-gray-400 outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-red-500"
      />
      <button
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-red-600 to-red-500 py-2 text-xs font-bold text-white transition hover:from-red-700 hover:to-red-600"
      >
        {sent ? (
          "Merci pour votre avis ✓"
        ) : (
          <>
            <Send size={14} /> Publier mon avis
          </>
        )}
      </button>
    </form>
  );
};

/* ================================================================== */
/*  PANNEAU 3 — HISTOIRE / SOCIAL / BOUTIQUES                          */
/* ================================================================== */
const PanelStory = () => {
  const social = [
    { user: "@foodie.douala", time: "2h", likes: "1 254", img: IMG.chicken, Icon: Drumstick },
    { user: "@tasty.cmr", time: "4h", likes: "2 103", img: IMG.combo, Icon: Sandwich },
    { user: "@chicken.lover", time: "1j", likes: "3 987", img: IMG.wings, Icon: Drumstick, video: true },
    { user: "@bazaar.eats", time: "2j", likes: "1 876", img: IMG.store, Icon: Store },
  ];
  const [reviews, setReviews] = useState([
    { t: "La meilleure expérience poulet en ligne.", u: "@paulnkeng", rating: 5 },
    { t: "Commander est fluide et moderne.", u: "@ayssaguel", rating: 5 },
    { t: "Ce redesign me donne faim instantanément.", u: "@berthefoodie", rating: 4 },
    { t: "Livraison rapide et poulet croustillant, top !", u: "@delphine", rating: 5 },
  ]);
  const stores = [
    { n: "YoosFood Bonamoussadi", a: "Carrefour Maison Blanche", s: "Ouvert", km: "1.2 km", c: "text-green-400" },
    { n: "YoosFood Akwa", a: "Bd de la Liberté", s: "Ouvert", km: "2.1 km", c: "text-green-400" },
    { n: "YoosFood Bonapriso", a: "Rue Njo-Njo", s: "Ferme bientôt", km: "2.8 km", c: "text-amber-400" },
    { n: "YoosFood Deido", a: "Rond-point Deido", s: "Fermé", km: "3.4 km", c: "text-red-400" },
  ];
  const gallery = [
    { src: IMG.chef, Icon: ChefHat, label: "Préparé avec Soin", span: "col-span-2 row-span-2" },
    { src: IMG.chicken, Icon: Drumstick, label: "Fait Frais" },
    { src: IMG.spices, Icon: Flame, label: "11 Herbes & Épices" },
    { src: IMG.tomato, Icon: Carrot, label: "Ingrédients" },
    { src: IMG.kitchen, Icon: Flame, label: "En Coulisses" },
    { src: IMG.friedmade, Icon: Drumstick, label: "Excellence" },
  ];

  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-[#1a0202] via-[#3d0606] to-[#1a0202]">
      <PanelShell>
        <div className="grid grid-cols-12 gap-5">
          {/* Colonne gauche : histoire de marque */}
          <div className="col-span-12 flex flex-col lg:col-span-6">
            <Kicker>NOTRE HISTOIRE</Kicker>
            <h2 className="font-black leading-[0.9] text-white">
              <span className="block text-3xl sm:text-4xl md:text-5xl">Le Goût que</span>
              <span className="block bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-3xl text-transparent sm:text-4xl md:text-5xl">
                le Cameroun Aime
              </span>
            </h2>
            <p className="mt-3 max-w-md text-sm text-gray-300">
              Depuis des années, nous perfectionnons l'essentiel : de vrais
              ingrédients, 11 herbes & épices, et la joie de partager du bon poulet
              avec ceux qu'on aime.
            </p>
            <div className="mt-4 grid grid-cols-3 grid-rows-3 gap-2" style={{ minHeight: "18rem" }}>
              {gallery.map((g) => (
                <div key={g.label} className={`relative overflow-hidden rounded-2xl ${g.span || ""}`}>
                  <Food src={g.src} alt={g.label} Icon={g.Icon} className="h-full min-h-24 w-full object-cover" imgClass="object-cover" />
                  <span className="absolute bottom-1.5 left-2 rounded bg-black/50 px-2 py-0.5 text-[11px] font-bold text-white">
                    {g.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Colonne droite : social + avis + boutiques (sticky en desktop) */}
          <div className="col-span-12 flex flex-col gap-4 lg:col-span-6 lg:sticky lg:top-24 lg:self-start">
            {/* social */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-xl font-black text-white sm:text-2xl">Aimé. Partagé. Adoré.</h3>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white">
                  +12K amateurs
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {social.map((s) => (
                  <div key={s.user} className="overflow-hidden rounded-xl border border-white/10 bg-black/40">
                    <div className="relative">
                      <Food src={s.img} alt={s.user} Icon={s.Icon} className="h-24 w-full object-cover" imgClass="object-cover" />
                      {s.video && (
                        <span className="absolute inset-0 grid place-items-center">
                          <span className="grid h-8 w-8 place-items-center rounded-full bg-white/80 text-red-600">
                            <Play size={14} />
                          </span>
                        </span>
                      )}
                      <Instagram size={14} className="absolute right-1.5 top-1.5 text-white" />
                    </div>
                    <div className="p-1.5">
                      <p className="truncate text-[10px] font-bold text-white">{s.user}</p>
                      <p className="flex items-center gap-1 text-[10px] text-gray-400">
                        <Heart size={9} className="text-red-500" /> {s.likes}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* avis */}
            <div>
              <p className="mb-2 text-xs font-bold tracking-[0.2em] text-gray-400">
                CE QUE DISENT NOS CLIENTS ({reviews.length})
              </p>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {reviews.map((r, idx) => (
                  <div key={`${r.u}-${idx}`} className="rounded-xl border border-white/10 bg-black/40 p-3">
                    <div className="mb-1 flex">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <Star
                          key={i}
                          size={10}
                          fill="currentColor"
                          className={i < (r.rating || 5) ? "text-amber-400" : "text-gray-600"}
                        />
                      ))}
                    </div>
                    <p className="text-[11px] text-white">"{r.t}"</p>
                    <p className="mt-1 text-[10px] text-gray-500">{r.u}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* boutiques */}
            <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
              <div className="mb-2 flex items-center gap-2">
                <MapPin size={16} className="text-red-500" />
                <p className="text-sm font-black text-white">Une YoosFood près de vous</p>
              </div>
              <div className="space-y-1.5">
                {stores.map((st) => (
                  <div key={st.n} className="flex items-center justify-between rounded-lg bg-black/40 px-3 py-2">
                    <div className="min-w-0">
                      <p className="truncate text-xs font-bold text-white">{st.n}</p>
                      <p className="truncate text-[10px] text-gray-500">{st.a}</p>
                    </div>
                    <div className="flex shrink-0 items-center gap-3">
                      <span className={`text-[10px] font-bold ${st.c}`}>{st.s}</span>
                      <span className="text-[10px] text-gray-400">{st.km}</span>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-red-600 to-red-500 py-2 text-xs font-bold text-white">
                <Navigation size={14} /> Utiliser ma position
              </button>
            </div>

            {/* formulaire d'avis */}
            <div className="z-30 rounded-2xl border border-white/10 bg-black/80 p-3 shadow-2xl backdrop-blur">
              <ReviewForm onAdd={(r) => setReviews((p) => [r, ...p])} />
            </div>
          </div>
        </div>
      </PanelShell>
    </div>
  );
};

/* ================================================================== */
/*  PANNEAU 4 — APP MOBILE                                             */
/* ================================================================== */
const PanelApp = () => {
  const rewards = [
    { Icon: Drumstick, title: "Poulet Gratuit", sub: "Cumulez des points & régalez-vous.", cta: "12 450 pts" },
    { Icon: Calendar, title: "Deals Quotidiens", sub: "De nouvelles offres chaque jour.", cta: "Explorer" },
    { Icon: Gift, title: "Tourne & Gagne", sub: "Jouez chaque jour & gagnez des prix.", cta: "Jouer" },
    { Icon: Crown, title: "Accès VIP", sub: "Offres exclusives & accès anticipé.", cta: "Rejoindre" },
  ];
  const perks = [
    { icon: Zap, t: "Commande Express", s: "Recommandez vos favoris en un clic." },
    { icon: Star, t: "Récompenses Exclusives", s: "Deals & poulet gratuit dans l'app." },
    { icon: Bike, t: "Suivi en Direct", s: "Suivez votre commande en temps réel." },
  ];

  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-[#160101] via-[#4a0808] to-[#160101]">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/20 blur-[120px]" />

      <PanelShell>
        <div className="grid grid-cols-12 gap-5">
          {/* gauche : titre + perks + rewards */}
          <div className="col-span-12 flex flex-col justify-center lg:col-span-5">
            <Kicker>APP YOOSFOOD. PLUS DE SAVEUR.</Kicker>
            <h2 className="font-black leading-[0.85] text-white">
              <span className="block text-4xl sm:text-5xl md:text-6xl">YoosFood</span>
              <span className="block bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-4xl text-transparent sm:text-5xl md:text-6xl">
                Dans Votre Poche.
              </span>
            </h2>
            <p className="mt-3 text-sm text-gray-300">
              Commandez plus vite. Gagnez plus. Livré chaud & frais.
            </p>
            <div className="mt-5 space-y-2.5">
              {perks.map((p) => {
                const Icon = p.icon;
                return (
                  <div key={p.t} className="flex items-center gap-3">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-red-600 to-red-500">
                      <Icon size={18} className="text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">{p.t}</p>
                      <p className="text-[11px] text-gray-400">{p.s}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-5 grid grid-cols-2 gap-2 md:grid-cols-4">
              {rewards.map((r) => {
                const Icon = r.Icon;
                return (
                  <div key={r.title} className="rounded-xl border border-white/10 bg-black/40 p-2.5 text-center">
                    <div className="mx-auto grid h-9 w-9 place-items-center rounded-full bg-white/10 text-amber-400">
                      <Icon size={18} />
                    </div>
                    <p className="mt-1 text-[11px] font-bold text-white">{r.title}</p>
                    <p className="mt-0.5 text-[9px] text-gray-400">{r.sub}</p>
                    <span className="mt-1.5 inline-block rounded-full bg-amber-500 px-2 py-0.5 text-[9px] font-black text-black">
                      {r.cta}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* centre : téléphones */}
          <div className="col-span-12 flex items-center justify-center py-4 lg:col-span-3 lg:py-0">
            <div className="relative flex items-end gap-2">
              <Phone tilt="-rotate-6" small>
                <div className="p-2 text-white">
                  <p className="text-[9px] text-gray-400">Bonjour,</p>
                  <p className="text-xs font-black">Berk !</p>
                  <Food src={IMG.chicken} alt="" Icon={Drumstick} className="my-1.5 h-16 w-full rounded-lg object-cover" imgClass="rounded-lg object-cover" />
                  <div className="rounded-lg bg-red-600 p-1.5 text-[8px]">Menu Twister · 1 790 F</div>
                </div>
              </Phone>
              <Phone tilt="rotate-0" big>
                <div className="p-2 text-white">
                  <div className="rounded-lg bg-gradient-to-r from-red-600 to-red-500 p-2">
                    <p className="text-[8px]">YoosFood VIP</p>
                    <p className="text-lg font-black">12 450</p>
                    <p className="text-[8px]">Points</p>
                  </div>
                  <div className="mt-1.5 rounded-lg bg-white/10 p-1.5">
                    <div className="h-1.5 w-full rounded-full bg-white/20">
                      <div className="h-1.5 w-3/4 rounded-full bg-amber-400" />
                    </div>
                    <p className="mt-1 text-[7px] text-gray-300">Membre Gold · 12 450 / 20 000</p>
                  </div>
                  <Food src={IMG.wrap} alt="" Icon={Sandwich} className="mt-1.5 h-16 w-full rounded-lg object-cover" imgClass="rounded-lg object-cover" />
                </div>
              </Phone>
              <Phone tilt="rotate-6" small>
                <div className="p-2 text-white">
                  <p className="text-[9px] text-gray-400">Suivi commande</p>
                  <p className="text-xs font-black">20 Min</p>
                  <div className="my-2 grid place-items-center text-amber-400">
                    <Bike size={30} />
                  </div>
                  <div className="space-y-1 text-[8px]">
                    <p className="flex items-center gap-1 text-green-400"><Check size={9} /> Commande confirmée</p>
                    <p className="flex items-center gap-1 text-green-400"><Check size={9} /> En préparation</p>
                    <p className="flex items-center gap-1 text-amber-400"><Bike size={9} /> En route</p>
                  </div>
                </div>
              </Phone>
            </div>
          </div>

          {/* droite : livraison + téléchargement */}
          <div className="col-span-12 flex flex-col justify-center gap-4 lg:col-span-4">
            <div>
              <Kicker>EXPÉRIENCE LIVRAISON</Kicker>
              <h3 className="font-black leading-none text-white">
                <span className="block text-3xl md:text-4xl">Livré</span>
                <span className="block bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-3xl text-transparent md:text-4xl">
                  Chaud & Frais.
                </span>
              </h3>
            </div>
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/40">
              <Food src={IMG.rider} alt="Livreur" Icon={Bike} className="h-24 w-full object-cover" imgClass="object-cover" />
              <div className="grid grid-cols-3 divide-x divide-white/10 p-3 text-center">
                {[
                  ["12K+", "Livraisons"],
                  ["95%", "À l'heure"],
                  ["4.9★", "Note"],
                ].map(([n, l]) => (
                  <div key={l}>
                    <p className="text-lg font-black text-amber-400">{n}</p>
                    <p className="text-[10px] text-gray-400">{l}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-black/40 p-4">
              <div className="grid h-20 w-20 shrink-0 place-items-center rounded-xl bg-white">
                <QrCode size={56} className="text-black" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-black text-white">Téléchargez l'App YoosFood</p>
                <p className="text-[11px] text-gray-400">Meilleurs deals. Livraison rapide.</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="flex items-center gap-1 rounded-lg bg-black px-2 py-1 text-[9px] text-white">
                    <Apple size={11} /> App Store
                  </span>
                  <span className="flex items-center gap-1 rounded-lg bg-black px-2 py-1 text-[9px] text-white">
                    <Play size={11} /> Google Play
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PanelShell>
    </div>
  );
};

/* Cadre de téléphone stylisé */
const Phone = ({ children, tilt = "", small, big }) => (
  <div
    className={`${tilt} ${big ? "z-10 w-32 sm:w-36" : "w-24 opacity-95 sm:w-28"} overflow-hidden rounded-[1.5rem] border-4 border-gray-800 bg-gradient-to-b from-[#2a0505] to-[#160303] shadow-2xl`}
  >
    <div className="mx-auto mt-1 h-1 w-8 rounded-full bg-gray-700" />
    <div className={`${big ? "h-60 sm:h-64" : "h-48 sm:h-52"}`}>{children}</div>
  </div>
);

/* ================================================================== */
/*  VIDÉOS TIKTOK (fond du 1er panneau) — lecture auto en chaîne       */
/* ================================================================== */
const TIKTOKS = ["7531761938645126421", "7500251493874896148", "7623476718837337364"];

// Carrousel infini (marquee) : les vidéos défilent lentement en continu et
// se lancent automatiquement en muet (autoplay autorisé par les navigateurs).
// Le jeu est dupliqué pour une boucle sans couture.
const TikTokMarquee = ({ className = "" }) => {
  const items = [...TIKTOKS, ...TIKTOKS];
  return (
    <div className={`overflow-hidden ${className}`}>
      <div className="tt-marquee flex h-full w-max items-center">
        {items.map((id, i) => (
          <div key={i} className="h-full shrink-0 px-2" style={{ width: "300px" }}>
            <iframe
              src={`https://www.tiktok.com/player/v1/${id}?autoplay=1&muted=1&loop=1&controls=0&description=0&music_info=0&rel=0`}
              title={`Vidéo TikTok @12yossfood ${(i % TIKTOKS.length) + 1}`}
              allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
              allowFullScreen
              className="h-full w-full rounded-xl border-0"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

/* ================================================================== */
/*  CONTENEUR SLIDER HORIZONTAL                                        */
/* ================================================================== */
const HorizontalExperience = () => {
  const scroller = useRef(null);
  const [current, setCurrent] = useState(0);
  const panels = [PanelHero, PanelMenu, PanelStory, PanelApp];

  const goTo = (i) => {
    const el = scroller.current;
    if (!el) return;
    const idx = Math.max(0, Math.min(panels.length - 1, i));
    el.scrollTo({ left: idx * el.clientWidth, behavior: "smooth" });
  };

  // molette verticale -> défilement horizontal (sauf si le panneau défile
  // déjà verticalement, ex. mobile / petits écrans)
  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const onWheel = (e) => {
      const target = e.target.closest(".hide-scroll");
      const canScrollV = target && target.scrollHeight > target.clientHeight + 4;
      if (!canScrollV && Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  // clavier
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") goTo(current + 1);
      if (e.key === "ArrowLeft") goTo(current - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current]);

  const onScroll = () => {
    const el = scroller.current;
    if (!el) return;
    setCurrent(Math.round(el.scrollLeft / el.clientWidth));
  };

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-black text-white">
      <NavBar current={current} goTo={goTo} />

      {/* piste de défilement */}
      <div
        ref={scroller}
        onScroll={onScroll}
        className="hide-scroll flex h-full w-full snap-x snap-mandatory overflow-x-auto overflow-y-hidden scroll-smooth"
      >
        {panels.map((Panel, i) => (
          <section key={i} className="h-full w-full shrink-0 snap-start">
            <Panel />
          </section>
        ))}
      </div>

      {/* flèches */}
      <button
        onClick={() => goTo(current - 1)}
        disabled={current === 0}
        aria-label="Panneau précédent"
        className="absolute left-3 top-1/2 z-30 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur transition hover:bg-black/70 disabled:opacity-0 sm:grid"
      >
        <ChevronLeft size={22} />
      </button>
      <button
        onClick={() => goTo(current + 1)}
        disabled={current === panels.length - 1}
        aria-label="Panneau suivant"
        className="absolute right-3 top-1/2 z-30 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur transition hover:bg-black/70 disabled:opacity-0 sm:grid"
      >
        <ChevronRight size={22} />
      </button>

      {/* pagination + progression */}
      <div className="absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 items-center gap-4">
        <div className="flex items-center gap-2 rounded-full border border-white/15 bg-black/50 px-4 py-2 backdrop-blur">
          {["Accueil", "Menu", "Histoire", "App"].map((label, i, arr) => (
            <button key={label} onClick={() => goTo(i)} className="flex items-center gap-2">
              <span className={`text-xs font-semibold transition ${current === i ? "text-white" : "text-gray-500"}`}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className={`hidden text-xs font-semibold transition sm:inline ${current === i ? "text-white" : "text-gray-500"}`}>
                {label}
              </span>
              {i < arr.length - 1 && <span className="text-gray-600">·</span>}
            </button>
          ))}
        </div>
      </div>

      {/* barre de progression */}
      <div className="absolute bottom-0 left-0 z-30 h-1 w-full bg-white/10">
        <div
          className="h-full bg-gradient-to-r from-red-600 to-amber-500 transition-all duration-500"
          style={{ width: `${((current + 1) / panels.length) * 100}%` }}
        />
      </div>

      <style>{`
        .script { font-family: 'Brush Script MT', cursive; }
        .hide-scroll { scrollbar-width: none; -ms-overflow-style: none; }
        .hide-scroll::-webkit-scrollbar { display: none; }
        @keyframes ttMarquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .tt-marquee { animation: ttMarquee 60s linear infinite; }
        @keyframes ttHeart {
          0% { transform: translateY(0) translateX(0) scale(0.5); opacity: 0; }
          12% { opacity: 0.95; }
          75% { opacity: 0.9; }
          100% { transform: translateY(-108vh) translateX(var(--drift, 0)) scale(1.15); opacity: 0; }
        }
        .tt-heart { animation-name: ttHeart; animation-timing-function: linear; animation-iteration-count: infinite; will-change: transform, opacity; }
        @keyframes catOut { from { transform: none; opacity: 1; } to { transform: translateX(-42px) scaleX(0.35); opacity: 0; } }
        @keyframes catIn { 0% { transform: translateX(-42px) scaleX(0.35); opacity: 0; } 100% { transform: none; opacity: 1; } }
        .cat-out { animation: catOut 0.26s ease-in forwards; transform-origin: left center; }
        .cat-in { animation: catIn 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards; transform-origin: left center; }
        @keyframes heroFloat { 0%, 100% { transform: translateY(0) rotate(var(--r, 0deg)); } 50% { transform: translateY(-9px) rotate(var(--r, 0deg)); } }
        .hero-float { animation: heroFloat 6s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default HorizontalExperience;
