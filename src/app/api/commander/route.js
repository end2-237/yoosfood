// ─────────────────────────────────────────────────────────────────────────────
// POST /api/commander — relais vers Camille.
//
// Le panier du site passe par ICI, jamais directement de navigateur à Camille :
// la création de commande exige une clé secrète, et une clé secrète envoyée au
// navigateur n'est plus secrète. Cette route est le seul endroit où elle vit.
//
// Camille se charge ensuite de tout : accusé de réception WhatsApp au client,
// alerte au commerçant, apparition dans l'app, bon de commande PDF.
// ─────────────────────────────────────────────────────────────────────────────
import { NextResponse } from "next/server";
import { normalizePhone } from "../../../lib/phone";

const CAMILLE_URL = (
  process.env.NEXT_PUBLIC_CAMILLE_URL || "https://camille.vps.buyticle.com"
).replace(/\/$/, "");

const SECRET = process.env.CAMILLE_SECRET_KEY || "";

export async function POST(request) {
  if (!SECRET) {
    return NextResponse.json(
      { error: "Commandes indisponibles — CAMILLE_SECRET_KEY absente côté serveur." },
      { status: 503 }
    );
  }

  const body = await request.json().catch(() => ({}));

  const items = Array.isArray(body.items) ? body.items : [];
  if (!items.length) {
    return NextResponse.json({ error: "Ton panier est vide." }, { status: 400 });
  }

  // Un numéro sans indicatif pays ne recevra jamais l'accusé WhatsApp : mieux
  // vaut refuser la commande ici que la créer et la laisser sans confirmation.
  const tel = normalizePhone(body.customer?.phone);
  if (tel.error) {
    return NextResponse.json({ error: tel.error }, { status: 400 });
  }
  const phone = tel.phone;

  try {
    const res = await fetch(`${CAMILLE_URL}/api/public/v1/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Camille-Key": SECRET,
      },
      body: JSON.stringify({
        // On ne transmet QUE l'id et la quantité quand l'id existe : Camille
        // relit le prix en base. Un prix venu du navigateur n'est pas fiable.
        items: items.map((it) => (
          it.id
            ? { id: it.id, qty: Number(it.qty) || 1, variant: it.variant || "" }
            : { name: it.name, qty: Number(it.qty) || 1, price: Number(it.price) || 0, variant: it.variant || "" }
        )),
        customer: {
          name: String(body.customer?.name || "").slice(0, 60),
          phone,
        },
        delivery: {
          address: String(body.delivery?.address || "").slice(0, 200),
          lat: body.delivery?.lat,
          lng: body.delivery?.lng,
        },
        note: String(body.note || "").slice(0, 200),
      }),
    });

    const d = await res.json().catch(() => ({}));
    if (!res.ok || d.error) {
      return NextResponse.json(
        { error: d.error || `Camille a répondu ${res.status}` },
        { status: res.status === 400 ? 400 : 502 }
      );
    }

    return NextResponse.json({
      ok: true,
      order: d.order,
      whatsapp_notified: d.whatsapp_notified,
    });
  } catch (e) {
    return NextResponse.json(
      { error: `Camille injoignable : ${e.message}` },
      { status: 502 }
    );
  }
}
