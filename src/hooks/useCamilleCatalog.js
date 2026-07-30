"use client";

// ─────────────────────────────────────────────────────────────────────────────
// Catalogue Camille pour les vues YoosFood.
//
// Un seul principe : si Camille répond, c'est lui la source de vérité ; sinon
// on garde le catalogue de démonstration du site. Le site reste donc debout
// même sans clé, hors ligne, ou pendant que l'API répond.
//
// Les composants continuent de parler leur langue (label, img, price affiché) :
// toute la traduction se fait ici.
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect, useState } from "react";
import {
  Pizza,
  Beef,
  Drumstick,
  CupSoda,
  Salad,
  IceCream,
  Cookie,
  Sandwich,
  Utensils,
  Flame,
} from "lucide-react";
import CamilleService from "../services/CamilleService";

export const slugify = (s) =>
  String(s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/* Une icône plausible par catégorie — purement décoratif, jamais bloquant. */
const ICONS = [
  [/pizza/, Pizza],
  [/burger|sandwich|wrap/, Beef],
  [/poulet|chicken|bucket|aile|nugget/, Drumstick],
  [/boisson|jus|soda|drink|caf/, CupSoda],
  [/dessert|glace|creme/, IceCream],
  [/cookie|patiss|snack|enfant|kids/, Cookie],
  [/salade|accompagn|legume/, Salad],
  [/sauce|epic|piment|spicy/, Flame],
  [/menu|combo|formule/, Sandwich],
];
function iconFor(label) {
  const l = slugify(label).replace(/-/g, " ");
  for (const [re, Icon] of ICONS) if (re.test(l)) return Icon;
  return Utensils;
}

// Le site affiche tantôt "3 500" suivi d'une devise, tantôt "3 500 F" seul.
// On fournit les deux formes plutôt que d'imposer la nôtre aux vues.
const fmtPrice = (n) => Number(n || 0).toLocaleString("fr-FR");

/**
 * Transforme un produit Camille en article tel que les vues l'attendent.
 * `camilleId` est le seul champ nouveau : il voyage jusqu'à la commande pour
 * que Camille relise le prix en base plutôt que de croire le navigateur.
 */
function toItem(p) {
  return {
    camilleId: p.id,
    id: p.id,
    slug: slugify(p.name),
    name: p.name,
    desc: p.description || "",
    meta: p.description ? String(p.description).slice(0, 28) : "",
    tag: p.stock != null && Number(p.stock) <= 0 ? "RUPTURE" : "",
    price: fmtPrice(p.price),
    priceF: `${fmtPrice(p.price)} F`,
    priceNumber: Number(p.price) || 0,
    img: p.image || p.image_url || "",
    category: p.category || "Autres",
    categoryId: slugify(p.category || "autres"),
    Icon: iconFor(p.category),
    available: p.available !== false,
  };
}

function group(items) {
  const byCat = {};
  const order = [];
  for (const it of items) {
    if (!byCat[it.category]) {
      byCat[it.category] = [];
      order.push(it.category);
    }
    byCat[it.category].push(it);
  }
  const cats = order.map((label) => ({
    id: slugify(label),
    label,
    // Les vues lisent tantôt `icon`, tantôt `Icon` : on fournit les deux.
    icon: iconFor(label),
    Icon: iconFor(label),
    thumb: (byCat[label].find((i) => i.img) || {}).img || "",
    items: byCat[label],
  }));
  return { cats, byCat };
}

/**
 * @returns {{ready: boolean, live: boolean, products: object[], cats: object[],
 *            byCat: Record<string, object[]>, error: string}}
 *          `live` vaut false tant que Camille n'a rien fourni : les vues
 *          doivent alors conserver leur catalogue statique.
 */
// Le tiroir panier est monté sur toutes les pages, en plus des vues qui
// listent les produits : sans mise en commun, chaque page ferait deux appels
// identiques. On partage la promesse pour la durée de vie de l'onglet.
let inflight = null;
function fetchCatalogOnce() {
  if (!inflight) {
    inflight = CamilleService.getProducts({ limit: 100 }).catch((e) => {
      inflight = null;
      return { products: [], merchant: {}, total: 0, error: e.message };
    });
  }
  return inflight;
}

export function useCamilleCatalog() {
  const [state, setState] = useState({
    ready: false,
    live: false,
    products: [],
    cats: [],
    byCat: {},
    merchant: {},
    error: "",
  });

  useEffect(() => {
    let cancelled = false;
    if (!CamilleService.configured()) {
      setState((s) => ({ ...s, ready: true, error: "clé publique Camille absente" }));
      return;
    }
    fetchCatalogOnce().then((r) => {
      if (cancelled) return;
      const products = (r.products || []).map(toItem);
      if (!products.length) {
        setState({
          ready: true, live: false, products: [], cats: [], byCat: {},
          merchant: r.merchant || {}, error: r.error || "",
        });
        return;
      }
      setState({
        ready: true, live: true, products, ...group(products),
        merchant: r.merchant || {}, error: "",
      });
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}

export default useCamilleCatalog;
