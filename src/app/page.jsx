"use client";

import dynamic from "next/dynamic";

// L'application est fortement pilotée par l'état client (auth Supabase,
// localStorage, navigation par vues). On la rend uniquement côté client
// pour éviter tout souci de SSR (window/localStorage).
const YossFoodApp = dynamic(() => import("../App"), { ssr: false });

export default function Page() {
  return <YossFoodApp />;
}
