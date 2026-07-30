"use client";

import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);

const toNumber = (p) => Number(String(p).replace(/[^\d.,]/g, "").replace(/\s/g, "").replace(",", ".")) || 0;

export function CartProvider({ children }) {
  const [items, setItems] = useState([]); // { id, camilleId, name, price:number, img, qty }
  const [ready, setReady] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("yoss-cart");
      if (raw) setItems(JSON.parse(raw));
    } catch (e) {
      /* ignore */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) {
      try {
        localStorage.setItem("yoss-cart", JSON.stringify(items));
      } catch (e) {
        /* ignore */
      }
    }
  }, [items, ready]);

  const addItem = (item, qty = 1) => {
    const id = item.id || item.name;
    const price = toNumber(item.price);
    setItems((prev) => {
      const idx = prev.findIndex((p) => p.id === id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + qty };
        return copy;
      }
      // camilleId : l'identifiant produit côté Camille. Conservé jusqu'à la
      // commande pour que Camille relise le prix en base (le navigateur ment).
      return [...prev, { id, camilleId: item.camilleId || null, name: item.name, price, img: item.img || "", qty }];
    });
    setIsOpen(true); // ouvre le panier-tiroir à chaque ajout (intuitif)
  };

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const toggleCart = () => setIsOpen((v) => !v);

  const removeItem = (id) => setItems((prev) => prev.filter((x) => x.id !== id));
  const setQty = (id, qty) =>
    setItems((prev) => prev.map((x) => (x.id === id ? { ...x, qty: Math.max(1, qty) } : x)));
  const clear = () => setItems([]);

  /**
   * Retire les lignes dont le produit n'existe plus dans le catalogue Camille.
   *
   * Le panier survit dans localStorage. Si le marchand change de compte, ou
   * supprime un produit, les identifiants gardés ici appartiennent à un
   * catalogue qui n'est plus le sien : Camille refuse alors la commande avec
   * « Produit introuvable », et le client reste bloqué sans comprendre.
   * On préfère perdre une ligne en silence qu'un client à la caisse.
   *
   * @param {string[]} validIds identifiants présents dans le catalogue courant
   */
  const pruneMissing = (validIds) => {
    if (!Array.isArray(validIds) || !validIds.length) return;
    const known = new Set(validIds);
    setItems((prev) =>
      prev.filter((x) => !x.camilleId || known.has(x.camilleId))
    );
  };

  const count = items.reduce((s, x) => s + x.qty, 0);
  const total = items.reduce((s, x) => s + x.qty * x.price, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, setQty, clear, pruneMissing, count, total, ready, isOpen, openCart, closeCart, toggleCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return (
    useContext(CartContext) || {
      items: [],
      addItem: () => {},
      removeItem: () => {},
      setQty: () => {},
      clear: () => {},
      count: 0,
      total: 0,
      ready: false,
      isOpen: false,
      openCart: () => {},
      closeCart: () => {},
      toggleCart: () => {},
    }
  );
}

export const formatFCFA = (n) => `${Math.round(n).toLocaleString("fr-FR").replace(/ /g, " ")} FCFA`;
