// ─────────────────────────────────────────────────────────────────────────────
// GET /api/catalogue — relais de lecture du catalogue Camille.
//
// Pourquoi un relais alors que la lecture accepte une clé publique ?
// Pour que le site fonctionne avec une SEULE clé. Si NEXT_PUBLIC_CAMILLE_PUBLIC_KEY
// est renseignée, le navigateur interroge Camille directement et cette route
// n'est jamais appelée. Sinon on lit ici, côté serveur, avec la clé secrète —
// qui ne quitte jamais le serveur.
// ─────────────────────────────────────────────────────────────────────────────
import { NextResponse } from "next/server";

const CAMILLE_URL = (
  process.env.NEXT_PUBLIC_CAMILLE_URL || "https://camille.vps.buyticle.com"
).replace(/\/$/, "");

const KEY = process.env.CAMILLE_SECRET_KEY || process.env.NEXT_PUBLIC_CAMILLE_PUBLIC_KEY || "";

export async function GET(request) {
  if (!KEY) {
    return NextResponse.json(
      { products: [], total: 0, error: "Aucune clé Camille configurée côté serveur." },
      { status: 503 }
    );
  }

  const src = new URL(request.url).searchParams;
  const qs = new URLSearchParams();
  for (const k of ["q", "category", "limit", "offset"]) {
    const v = src.get(k);
    if (v) qs.set(k, v);
  }

  try {
    const res = await fetch(`${CAMILLE_URL}/api/public/v1/catalog?${qs}`, {
      headers: { "X-Camille-Key": KEY },
      cache: "no-store",
    });
    const d = await res.json().catch(() => ({}));
    if (!res.ok || d.error) {
      return NextResponse.json(
        { products: [], total: 0, error: d.error || `Camille a répondu ${res.status}` },
        { status: res.ok ? 502 : res.status }
      );
    }
    return NextResponse.json(
      { products: d.products || [], total: d.total ?? 0 },
      // Une minute de cache : le catalogue change rarement, et cela évite de
      // frapper Camille à chaque visiteur.
      { headers: { "Cache-Control": "s-maxage=60, stale-while-revalidate=300" } }
    );
  } catch (e) {
    return NextResponse.json(
      { products: [], total: 0, error: `Camille injoignable : ${e.message}` },
      { status: 502 }
    );
  }
}
