"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  ShoppingCart,
  UtensilsCrossed,
  Tags,
  Wallet,
  Megaphone,
  Users,
  Star,
  Bell,
  Settings,
  LogOut,
  Search,
  Menu as MenuIcon,
  Plus,
  Filter,
  Download,
  TrendingUp,
  Pencil,
  Trash2,
  Eye,
  Banknote,
  Clock,
  Package,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  X,
} from "lucide-react";
import { ALL_PRODUCTS } from "../../data/menu";

const logo = "/yfl1.png";
const priceNum = (p) => Number(String(p).replace(/[^\d]/g, "")) || 0;
const fmt = (n) => n.toLocaleString("fr-FR");

/* ---- données dérivées des produits du menu ---- */
const seededProducts = ALL_PRODUCTS.map((p, i) => {
  const r = (n) => {
    const x = Math.sin(i * 13.1 + n * 7.7) * 10000;
    return x - Math.floor(x);
  };
  const stock = Math.round(r(1) * 60);
  const status = stock === 0 ? "rupture" : stock < 12 ? "faible" : "stock";
  const sales = 20 + Math.round(r(2) * 320);
  return {
    ...p,
    sku: `YF-${26550000 + i * 137}`,
    stock,
    status,
    sales,
    earning: sales * priceNum(p.price),
    variation: `${1 + Math.round(r(3) * 3)} taille${r(3) > 0.4 ? "s" : ""}`,
  };
});

const ORDERS = [
  { id: "CMD-2041", client: "Marie Kouam", phone: "691 17 54 80", items: 3, total: 9500, date: "22 Juil", status: "preparation" },
  { id: "CMD-2040", client: "Jean-Paul Mbida", phone: "651 58 06 28", items: 1, total: 3500, date: "22 Juil", status: "attente" },
  { id: "CMD-2039", client: "Fatima Bello", phone: "690 22 11 33", items: 5, total: 18400, date: "21 Juil", status: "livree" },
  { id: "CMD-2038", client: "Paul Nkeng", phone: "678 90 12 34", items: 2, total: 6900, date: "21 Juil", status: "route" },
  { id: "CMD-2037", client: "Delphine A.", phone: "699 88 77 66", items: 4, total: 12000, date: "20 Juil", status: "livree" },
  { id: "CMD-2036", client: "Berthe F.", phone: "677 45 66 88", items: 1, total: 2500, date: "20 Juil", status: "annulee" },
];

const STAT_CARDS = [
  { label: "Revenus totaux", value: 1245000, sub: "2.5k cette semaine", trend: "+10%", tone: "red", Icon: Wallet, points: [10, 14, 9, 16, 12, 20, 15, 22] },
  { label: "Disponible au retrait", value: 680000, sub: "450 cette semaine", trend: "+8%", tone: "amber", Icon: Banknote, points: [8, 12, 10, 9, 15, 13, 18, 16] },
  { label: "Paiement en attente", value: 152000, sub: "1.2k cette semaine", trend: "+4%", tone: "green", Icon: Clock, points: [6, 8, 7, 11, 9, 12, 10, 13] },
];

const NAV = [
  { id: "dashboard", label: "Tableau de bord", Icon: LayoutDashboard },
  { id: "orders", label: "Commandes", Icon: ShoppingCart, badge: 2 },
  { id: "products", label: "Produits", Icon: UtensilsCrossed },
  { id: "categories", label: "Catégories", Icon: Tags },
  { id: "earning", label: "Revenus", Icon: Wallet },
  { id: "promotions", label: "Promotions", Icon: Megaphone },
  { id: "customers", label: "Clients", Icon: Users },
  { id: "reviews", label: "Avis", Icon: Star },
  { id: "alerts", label: "Alertes", Icon: Bell, badge: 0 },
];

const toneMap = {
  red: { bg: "bg-red-100", text: "text-red-600", stroke: "#dc2626" },
  amber: { bg: "bg-amber-100", text: "text-amber-600", stroke: "#d97706" },
  green: { bg: "bg-emerald-100", text: "text-emerald-600", stroke: "#059669" },
};

function Sparkline({ points, stroke }) {
  const w = 120, h = 40, max = Math.max(...points), min = Math.min(...points);
  const d = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * w;
      const y = h - ((p - min) / (max - min || 1)) * h;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-10 w-28" fill="none">
      <path d={d} stroke={stroke} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const StatusBadge = ({ status }) => {
  const map = {
    stock: ["En stock", "bg-emerald-50 text-emerald-600 ring-emerald-200"],
    faible: ["Stock faible", "bg-amber-50 text-amber-600 ring-amber-200"],
    rupture: ["Rupture", "bg-red-50 text-red-600 ring-red-200"],
  };
  const [txt, cls] = map[status] || map.stock;
  return <span className={`rounded-full px-2.5 py-1 text-xs font-bold ring-1 ${cls}`}>{txt}</span>;
};

const OrderBadge = ({ status }) => {
  const map = {
    attente: ["En attente", "bg-gray-100 text-gray-600 ring-gray-200"],
    preparation: ["En préparation", "bg-amber-50 text-amber-600 ring-amber-200"],
    route: ["En route", "bg-blue-50 text-blue-600 ring-blue-200"],
    livree: ["Livrée", "bg-emerald-50 text-emerald-600 ring-emerald-200"],
    annulee: ["Annulée", "bg-red-50 text-red-600 ring-red-200"],
  };
  const [txt, cls] = map[status] || map.attente;
  return <span className={`rounded-full px-2.5 py-1 text-xs font-bold ring-1 ${cls}`}>{txt}</span>;
};

export default function AdminPage() {
  const [view, setView] = useState("dashboard");
  const [mobileNav, setMobileNav] = useState(false);
  const [products, setProducts] = useState(seededProducts);
  const [query, setQuery] = useState("");

  const filtered = useMemo(
    () => products.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()) || p.sku.includes(query)),
    [products, query]
  );
  const lowStock = products.filter((p) => p.status !== "stock");
  const pending = ORDERS.filter((o) => o.status === "attente" || o.status === "preparation");
  const alertsCount = lowStock.length + pending.length;

  const del = (slug) => setProducts((p) => p.filter((x) => x.slug !== slug));

  const nav = NAV.map((n) => (n.id === "alerts" ? { ...n, badge: alertsCount } : n));

  return (
    <div className="flex min-h-screen bg-[#f6f7fb] text-gray-800">
      {/* ---- SIDEBAR ---- */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 shrink-0 border-r border-gray-100 bg-white transition-transform lg:static lg:translate-x-0 ${
          mobileNav ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4">
          <Link href="/" className="flex items-center gap-2">
            <img src={logo} alt="YossFood" className="h-10 w-10 object-contain" />
            <span className="text-lg font-black text-red-600">YossFood</span>
          </Link>
          <button onClick={() => setMobileNav(false)} className="text-gray-400 lg:hidden">
            <X size={20} />
          </button>
        </div>

        <nav className="mt-2 space-y-1 px-3">
          {nav.map((n) => {
            const Icon = n.Icon;
            const active = view === n.id;
            return (
              <button
                key={n.id}
                onClick={() => {
                  setView(n.id);
                  setMobileNav(false);
                }}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                  active ? "bg-red-50 text-red-600" : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Icon size={18} />
                <span className="flex-1 text-left">{n.label}</span>
                {n.badge > 0 && (
                  <span className="grid h-5 min-w-5 place-items-center rounded-full bg-red-600 px-1 text-[10px] font-black text-white">
                    {n.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="mt-6 space-y-1 border-t border-gray-100 px-3 pt-4">
          <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50">
            <Settings size={18} /> Paramètres
          </button>
          <Link href="/" className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50">
            <LogOut size={18} /> Retour au site
          </Link>
        </div>
      </aside>

      {mobileNav && <div onClick={() => setMobileNav(false)} className="fixed inset-0 z-30 bg-black/40 lg:hidden" />}

      {/* ---- MAIN ---- */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* topbar */}
        <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-gray-100 bg-white px-4 py-3 md:px-6">
          <button onClick={() => setMobileNav(true)} className="text-gray-500 lg:hidden">
            <MenuIcon size={22} />
          </button>
          <div className="relative hidden flex-1 sm:block sm:max-w-md">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher un produit, une commande…"
              className="w-full rounded-full border border-gray-200 bg-gray-50 py-2 pl-9 pr-4 text-sm outline-none focus:border-red-400 focus:bg-white"
            />
          </div>
          <div className="ml-auto flex items-center gap-3">
            <span className="hidden items-center gap-2 rounded-full border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-600 md:flex">
              <Clock size={14} /> 22 Juil, 2026
            </span>
            <button className="relative grid h-9 w-9 place-items-center rounded-full text-gray-500 hover:bg-gray-100">
              <Bell size={18} />
              {alertsCount > 0 && <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-600" />}
            </button>
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-red-600 text-sm font-black text-white">YF</span>
              <div className="hidden leading-tight sm:block">
                <p className="text-sm font-bold text-gray-900">Admin YossFood</p>
                <p className="text-[11px] text-gray-400">Gérant</p>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6">
          {view === "dashboard" && <DashboardView products={filtered} del={del} lowStock={lowStock} pending={pending} setView={setView} />}
          {view === "products" && <ProductsView products={filtered} del={del} query={query} setQuery={setQuery} />}
          {view === "orders" && <OrdersView />}
          {view === "alerts" && <AlertsView lowStock={lowStock} pending={pending} />}
          {!["dashboard", "products", "orders", "alerts"].includes(view) && <Placeholder label={NAV.find((n) => n.id === view)?.label} />}
        </main>
      </div>
    </div>
  );
}

/* ================= VUES ================= */

function PageHead({ title, sub, children }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="text-2xl font-black text-gray-900">{title}</h1>
        {sub && <p className="mt-1 text-sm text-gray-500">{sub}</p>}
      </div>
      <div className="flex items-center gap-2">{children}</div>
    </div>
  );
}

function DashboardView({ products, del, lowStock, pending, setView }) {
  return (
    <>
      <PageHead title="Revenus" sub="Aperçu de vos gains — gérez produits, commandes et stock.">
        <button className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-50">
          <Download size={16} /> Exporter
        </button>
        <button className="flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-red-600/25 hover:bg-red-700">
          <Plus size={16} /> Nouveau produit
        </button>
      </PageHead>

      {/* stat cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {STAT_CARDS.map((s) => {
          const t = toneMap[s.tone];
          const Icon = s.Icon;
          return (
            <div key={s.label} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className={`grid h-11 w-11 place-items-center rounded-xl ${t.bg} ${t.text}`}>
                    <Icon size={20} />
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-gray-500">{s.label}</p>
                    <p className="text-2xl font-black text-gray-900">{fmt(s.value)} F</p>
                  </div>
                </div>
                <Sparkline points={s.points} stroke={t.stroke} />
              </div>
              <div className="mt-3 flex items-center justify-between text-xs">
                <span className="text-gray-400">{s.sub}</span>
                <span className="flex items-center gap-1 font-bold text-emerald-600">
                  <TrendingUp size={13} /> {s.trend}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* alerte rapide */}
      {lowStock.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-amber-100 text-amber-600">
            <AlertTriangle size={20} />
          </span>
          <p className="flex-1 text-sm font-semibold text-amber-800">
            {lowStock.length} produit(s) en stock faible ou en rupture · {pending.length} commande(s) en attente.
          </p>
          <button onClick={() => setView("alerts")} className="flex items-center gap-1 rounded-full bg-amber-600 px-4 py-2 text-xs font-bold text-white">
            Voir les alertes <ChevronRight size={14} />
          </button>
        </div>
      )}

      {/* table produits */}
      <div className="mt-6">
        <h2 className="mb-3 text-lg font-black text-gray-900">Historique des revenus</h2>
        <ProductTable products={products} del={del} />
      </div>
    </>
  );
}

function ProductsView({ products, del, query, setQuery }) {
  return (
    <>
      <PageHead title="Produits" sub={`${products.length} produits · gérez images, prix et stock.`}>
        <button className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-50">
          <Filter size={16} /> Filtrer
        </button>
        <button className="flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-red-600/25 hover:bg-red-700">
          <Plus size={16} /> Ajouter
        </button>
      </PageHead>
      <div className="relative mb-4 sm:hidden">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Rechercher…" className="w-full rounded-full border border-gray-200 bg-white py-2 pl-9 pr-4 text-sm outline-none" />
      </div>
      <ProductTable products={products} del={del} />
    </>
  );
}

function ProductTable({ products, del }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[820px] text-left text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-xs uppercase tracking-wide text-gray-400">
              <th className="px-5 py-3 font-semibold">Produit</th>
              <th className="px-3 py-3 font-semibold">Variation</th>
              <th className="px-3 py-3 font-semibold">Prix</th>
              <th className="px-3 py-3 font-semibold">Ventes</th>
              <th className="px-3 py-3 font-semibold">Revenu</th>
              <th className="px-3 py-3 font-semibold">Statut</th>
              <th className="px-3 py-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.slug} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/60">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <img src={p.img} alt={p.name} className="h-12 w-12 rounded-xl object-cover" />
                    <div className="min-w-0">
                      <p className="truncate font-bold text-gray-900">{p.name}</p>
                      <p className="text-xs text-gray-400">
                        {p.category} · <span className="text-gray-400">{p.sku}</span>
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-3 text-gray-600">{p.variation}</td>
                <td className="px-3 py-3 font-semibold text-gray-800">{p.price} F</td>
                <td className="px-3 py-3">
                  <span className="flex items-center gap-1 text-gray-600"><ShoppingCart size={13} /> {p.sales}</span>
                </td>
                <td className="px-3 py-3 font-bold text-red-600">{fmt(p.earning)} F</td>
                <td className="px-3 py-3"><StatusBadge status={p.status} /></td>
                <td className="px-3 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <a href={`/produit/${p.slug}`} target="_blank" rel="noreferrer" className="grid h-8 w-8 place-items-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700" title="Voir">
                      <Eye size={16} />
                    </a>
                    <button className="grid h-8 w-8 place-items-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-blue-600" title="Modifier">
                      <Pencil size={16} />
                    </button>
                    <button onClick={() => del(p.slug)} className="grid h-8 w-8 place-items-center rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-600" title="Supprimer">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={7} className="px-5 py-10 text-center text-gray-400">Aucun produit trouvé.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function OrdersView() {
  return (
    <>
      <PageHead title="Commandes" sub={`${ORDERS.length} commandes récentes.`}>
        <button className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-50">
          <Download size={16} /> Exporter
        </button>
      </PageHead>
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-xs uppercase tracking-wide text-gray-400">
                <th className="px-5 py-3 font-semibold">N°</th>
                <th className="px-3 py-3 font-semibold">Client</th>
                <th className="px-3 py-3 font-semibold">Articles</th>
                <th className="px-3 py-3 font-semibold">Total</th>
                <th className="px-3 py-3 font-semibold">Date</th>
                <th className="px-3 py-3 font-semibold">Statut</th>
                <th className="px-3 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {ORDERS.map((o) => (
                <tr key={o.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/60">
                  <td className="px-5 py-3 font-bold text-gray-900">{o.id}</td>
                  <td className="px-3 py-3">
                    <p className="font-semibold text-gray-800">{o.client}</p>
                    <p className="text-xs text-gray-400">{o.phone}</p>
                  </td>
                  <td className="px-3 py-3 text-gray-600">{o.items} article(s)</td>
                  <td className="px-3 py-3 font-bold text-red-600">{fmt(o.total)} F</td>
                  <td className="px-3 py-3 text-gray-500">{o.date}</td>
                  <td className="px-3 py-3"><OrderBadge status={o.status} /></td>
                  <td className="px-3 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button className="grid h-8 w-8 place-items-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700"><Eye size={16} /></button>
                      <button className="grid h-8 w-8 place-items-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-emerald-600"><CheckCircle2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function AlertsView({ lowStock, pending }) {
  return (
    <>
      <PageHead title="Alertes" sub="Stock faible, ruptures et commandes à traiter." />
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <h2 className="mb-4 flex items-center gap-2 font-black text-gray-900">
            <Package size={18} className="text-amber-600" /> Stock à surveiller ({lowStock.length})
          </h2>
          <div className="space-y-2">
            {lowStock.map((p) => (
              <div key={p.slug} className="flex items-center gap-3 rounded-xl border border-gray-100 p-2.5">
                <img src={p.img} alt={p.name} className="h-10 w-10 rounded-lg object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-gray-800">{p.name}</p>
                  <p className="text-xs text-gray-400">Stock : {p.stock}</p>
                </div>
                <StatusBadge status={p.status} />
              </div>
            ))}
            {lowStock.length === 0 && <p className="text-sm text-gray-400">Tout est en stock 👍</p>}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <h2 className="mb-4 flex items-center gap-2 font-black text-gray-900">
            <ShoppingCart size={18} className="text-red-600" /> Commandes à traiter ({pending.length})
          </h2>
          <div className="space-y-2">
            {pending.map((o) => (
              <div key={o.id} className="flex items-center gap-3 rounded-xl border border-gray-100 p-2.5">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-red-50 text-red-600"><ShoppingCart size={18} /></span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-gray-800">{o.id} · {o.client}</p>
                  <p className="text-xs text-gray-400">{o.items} article(s) · {fmt(o.total)} F</p>
                </div>
                <OrderBadge status={o.status} />
              </div>
            ))}
            {pending.length === 0 && <p className="text-sm text-gray-400">Aucune commande en attente.</p>}
          </div>
        </div>
      </div>
    </>
  );
}

function Placeholder({ label }) {
  return (
    <div className="grid min-h-[50vh] place-items-center">
      <div className="text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-red-50 text-red-500">
          <Settings size={28} />
        </div>
        <p className="mt-4 text-lg font-black text-gray-900">{label}</p>
        <p className="mt-1 text-sm text-gray-400">Section bientôt disponible.</p>
      </div>
    </div>
  );
}
