"use client";

import dynamic from "next/dynamic";

// L'expérience d'accueil est fortement pilotée par l'état client (panier en
// localStorage, animations, catalogue chargé depuis Camille). On la rend
// uniquement côté client pour éviter tout souci de SSR (window/localStorage).
const YossFoodApp = dynamic(() => import("../App"), { ssr: false });

export default function Page() {
  return <YossFoodApp />;
}
