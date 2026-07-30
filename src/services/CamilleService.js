// ─────────────────────────────────────────────────────────────────────────────
// Camille — source unique du catalogue et destination des commandes.
//
// YoosFood est un CLIENT de l'API Camille : il s'authentifie avec une clé et
// Camille en déduit l'agent. Aucune base partagée, aucun couplage.
//
//   • Catalogue : lu directement depuis le navigateur si une clé publique est
//     configurée ; sinon via /api/catalogue, notre relais serveur. Le site
//     marche donc avec la seule clé secrète, sans jamais l'exposer.
//   • Commandes : envoyées à /api/commander, notre propre route serveur, qui
//     seule détient la clé secrète. Elle ne doit JAMAIS arriver au navigateur.
//
// Variables d'environnement :
//   NEXT_PUBLIC_CAMILLE_URL      défaut https://camille.vps.buyticle.com
//   NEXT_PUBLIC_CAMILLE_PUBLIC_KEY   cam_pk_… (lecture)
//   CAMILLE_SECRET_KEY               cam_sk_… (serveur uniquement)
// ─────────────────────────────────────────────────────────────────────────────

const CAMILLE_URL = (
  process.env.NEXT_PUBLIC_CAMILLE_URL || "https://camille.vps.buyticle.com"
).replace(/\/$/, "");

const PUBLIC_KEY = process.env.NEXT_PUBLIC_CAMILLE_PUBLIC_KEY || "";

/** Camille renvoie des montants en chaîne ("1000.00") : on normalise. */
function toNumber(v) {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

/**
 * Adapte un produit Camille à la forme attendue par les composants YoosFood.
 * Le reste du site continue de parler sa langue — l'adaptation vit ici, à la
 * frontière, pas dispersée dans les vues.
 */
function adapt(p) {
  return {
    id: p.id,
    name: p.name,
    description: p.description || "",
    price: toNumber(p.price),
    price_max: p.price_max != null ? toNumber(p.price_max) : null,
    currency: p.currency || "XAF",
    category: p.category || "Autres",
    image: p.image_url || "",
    image_url: p.image_url || "",
    images: Array.isArray(p.images) ? p.images : [],
    variants: Array.isArray(p.variants) ? p.variants : [],
    stock: p.stock,
    available: p.stock == null || toNumber(p.stock) > 0,
    tags: Array.isArray(p.tags) ? p.tags : [],
    // Repère d'origine : utile pour distinguer un produit Camille en debug.
    source: "camille",
  };
}

export const CamilleService = {
  /**
   * Une clé publique permet la lecture directe. Sans elle on passe par le
   * relais serveur — donc le catalogue reste disponible dans les deux cas.
   */
  configured() {
    return true;
  },

  /**
   * Catalogue de l'agent lié à la clé.
   * @param {{ q?: string, category?: string, limit?: number, offset?: number }} opts
   * @returns {Promise<{products: object[], merchant: object, total: number, error?: string}>}
   */
  async getProducts(opts = {}) {
    const qs = new URLSearchParams();
    if (opts.q) qs.set("q", opts.q);
    if (opts.category) qs.set("category", opts.category);
    qs.set("limit", String(opts.limit ?? 100));
    if (opts.offset) qs.set("offset", String(opts.offset));

    // Lecture directe si une clé publique est configurée, sinon via notre
    // relais serveur (clé secrète côté serveur uniquement).
    const direct = async () => {
      const res = await fetch(`${CAMILLE_URL}/api/public/v1/catalog?${qs}`, {
        headers: { "X-Camille-Key": PUBLIC_KEY },
        cache: "no-store",
      });
      return { res, d: await res.json().catch(() => ({})) };
    };
    const viaRelay = async () => {
      const res = await fetch(`/api/catalogue?${qs}`, { cache: "no-store" });
      return { res, d: await res.json().catch(() => ({})) };
    };

    try {
      let { res, d } = PUBLIC_KEY ? await direct() : await viaRelay();

      // Une clé publique périmée, révoquée ou mal recopiée ne doit pas vider
      // la boutique : on repasse par le relais, qui porte la clé secrète.
      if (PUBLIC_KEY && (res.status === 401 || res.status === 403)) {
        ({ res, d } = await viaRelay());
      }

      if (!res.ok || d.error) {
        return { products: [], merchant: {}, total: 0, error: d.error || `HTTP ${res.status}` };
      }
      return {
        products: (d.products || []).map(adapt),
        // Coordonnées du marchand telles que configurées sur l'agent : c'est
        // lui qui fait autorité sur son numéro WhatsApp, pas ce site.
        merchant: d.merchant || {},
        total: d.total ?? 0,
      };
    } catch (e) {
      return { products: [], merchant: {}, total: 0, error: e.message };
    }
  },

  /**
   * Envoie une commande à Camille, via notre relais serveur.
   *
   * @param {{ items: {id?: string, name?: string, qty: number, price?: number, variant?: string}[],
   *           customer: { name?: string, phone: string },
   *           delivery?: { address?: string, lat?: number, lng?: number },
   *           note?: string }} order
   * @returns {Promise<{ok: boolean, order?: object, error?: string}>}
   */
  async createOrder(order) {
    try {
      const res = await fetch("/api/commander", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });
      const d = await res.json();
      if (!res.ok || d.error) return { ok: false, error: d.error || `HTTP ${res.status}` };
      return { ok: true, order: d.order };
    } catch (e) {
      return { ok: false, error: e.message };
    }
  },
};

export default CamilleService;
