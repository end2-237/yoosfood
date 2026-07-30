"use client";

// ─────────────────────────────────────────────────────────────────────────────
// YoosFood — site public.
//
// Il n'y a plus de tableau de bord ici : la gestion (produits, commandes,
// statuts, notifications) se fait dans Camille. Ce site est un client de son
// API — il lit le catalogue et lui transmet les commandes, rien de plus.
// ─────────────────────────────────────────────────────────────────────────────
import React from "react";

import PublicSite from "./views/Home";

const CONFIG = {
  name: "Yoss Food",
  slogan: "L'Excellence Culinaire à Votre Service",
  phone: "691 17 54 80",
  phone2: "651 58 06 28",
  whatsapp: "237691175480",
  address: "Bonamoussadi, Carrefour Maison Blanche, Douala",
};

const YossFoodApp = () => <PublicSite config={CONFIG} />;

export default YossFoodApp;
