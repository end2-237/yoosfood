// ─────────────────────────────────────────────────────────────────────────────
// Normalisation du numéro de téléphone.
//
// L'accusé de réception part sur WhatsApp : un numéro sans indicatif pays
// n'est joignable par personne. Le client tape « 691 17 54 80 », il faut en
// faire « 237691175480 » — ou refuser clairement plutôt que d'envoyer une
// commande dont la confirmation n'arrivera jamais.
//
// Cette règle vit ici parce qu'elle sert deux fois : dans le formulaire, pour
// prévenir tout de suite, et sur le serveur, parce qu'un contrôle qui n'existe
// que dans le navigateur ne contrôle rien.
// ─────────────────────────────────────────────────────────────────────────────

// Cameroun : 9 chiffres après l'indicatif. 6… mobile, 2… fixe.
const CM_CODE = "237";
const CM_LOCAL = /^[62]\d{8}$/;

/**
 * @param {string} raw ce que le client a tapé
 * @returns {{phone: string} | {error: string}} numéro en chiffres, indicatif compris
 */
export function normalizePhone(raw) {
  const txt = String(raw || "").trim();
  const digits = txt.replace(/\D/g, "");

  if (!digits) {
    return { error: "Indique ton numéro WhatsApp pour recevoir la confirmation." };
  }

  // Indicatif annoncé explicitement : +237…, 00237…, ou déjà 237…
  const explicit = txt.startsWith("+") || digits.startsWith("00");
  const intl = digits.replace(/^00/, "");

  if (explicit) {
    if (intl.length < 8 || intl.length > 15) {
      return { error: "Ce numéro international ne semble pas complet." };
    }
    return { phone: intl };
  }

  // Numéro camerounais complet, avec ou sans le +
  if (digits.startsWith(CM_CODE) && CM_LOCAL.test(digits.slice(CM_CODE.length))) {
    return { phone: digits };
  }

  // Numéro camerounais local : on ajoute l'indicatif nous-mêmes plutôt que de
  // renvoyer le client à sa saisie pour une évidence.
  if (CM_LOCAL.test(digits)) {
    return { phone: CM_CODE + digits };
  }

  // Un 0 de tête est une habitude française ; au Cameroun il n'existe pas.
  if (/^0[62]\d{8}$/.test(digits)) {
    return { phone: CM_CODE + digits.slice(1) };
  }

  return {
    error:
      "Ajoute l'indicatif du pays : 237 6 91 17 54 80 pour le Cameroun, " +
      "ou +33… , +1… si tu es à l'étranger.",
  };
}

/** Affichage lisible : 237 6 91 17 54 80 */
export function displayPhone(phone) {
  const d = String(phone || "");
  if (d.startsWith(CM_CODE) && d.length === CM_CODE.length + 9) {
    const n = d.slice(CM_CODE.length);
    return `${CM_CODE} ${n[0]} ${n.slice(1, 3)} ${n.slice(3, 5)} ${n.slice(5, 7)} ${n.slice(7)}`;
  }
  return `+${d}`;
}
