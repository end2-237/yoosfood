"use client";

// ─────────────────────────────────────────────────────────────────────────────
// Squelettes de chargement du catalogue.
//
// Tant que Camille n'a pas répondu, on ne montre RIEN qui ressemble à un
// produit : afficher le menu de démonstration pendant une seconde donne des
// prix et des plats qui n'existent pas, et le client peut cliquer dessus.
// Un squelette dit « ça arrive » sans jamais mentir sur le contenu.
// ─────────────────────────────────────────────────────────────────────────────
import React from "react";

/** Bloc gris animé. `dark` pour les panneaux sur fond sombre. */
export function Shimmer({ className = "", dark = false }) {
  return (
    <span
      aria-hidden="true"
      className={`yf-shimmer block rounded ${dark ? "yf-shimmer-dark" : ""} ${className}`}
    />
  );
}

/** Carte produit du menu : image carrée, titre, description, prix. */
export function ProductCardSkeleton() {
  return (
    <div className="flex items-center gap-4 rounded-2xl border-2 border-dashed border-gray-200 bg-white p-3">
      <Shimmer className="h-20 w-20 shrink-0 rounded-xl sm:h-24 sm:w-24" />
      <div className="min-w-0 flex-1 space-y-2">
        <Shimmer className="h-4 w-2/5 rounded-md" />
        <Shimmer className="h-3 w-4/5 rounded-md" />
        <Shimmer className="h-4 w-24 rounded-md" />
      </div>
      <Shimmer className="h-9 w-9 shrink-0 rounded-full" />
    </div>
  );
}

/** Onglet de catégorie (vignette + libellé). */
export function CategoryTabSkeleton() {
  return (
    <div className="flex w-24 shrink-0 flex-col items-center gap-2 rounded-2xl border border-gray-200 bg-white p-3">
      <Shimmer className="h-14 w-14 rounded-xl" />
      <Shimmer className="h-3 w-12 rounded-md" />
    </div>
  );
}

/** Ligne produit des panneaux d'accueil (fond sombre). */
export function DarkProductRowSkeleton() {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/30 p-2.5">
      <div className="min-w-0 flex-1 space-y-2">
        <Shimmer dark className="h-3 w-3/5 rounded-md" />
        <Shimmer dark className="h-4 w-20 rounded-md" />
      </div>
      <Shimmer dark className="h-14 w-14 shrink-0 rounded-xl" />
    </div>
  );
}

/** Carte vedette des panneaux d'accueil (fond sombre). */
export function DarkFeaturedSkeleton() {
  return (
    <div className="w-40 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-black/40 sm:w-44">
      <Shimmer dark className="h-24 w-full rounded-none" />
      <div className="space-y-2 p-3">
        <Shimmer dark className="h-3 w-4/5 rounded-md" />
        <Shimmer dark className="h-2.5 w-1/2 rounded-md" />
        <Shimmer dark className="h-4 w-16 rounded-md" />
      </div>
    </div>
  );
}

/** Répète un squelette n fois. */
export function Repeat({ n = 4, children }) {
  return Array.from({ length: n }, (_, i) => (
    <React.Fragment key={i}>{children}</React.Fragment>
  ));
}
