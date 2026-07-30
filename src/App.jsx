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

const YossFoodApp = () => <PublicSite />;

export default YossFoodApp;
