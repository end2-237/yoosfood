"use client";

import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);

const toNumber = (p) => Number(String(p).replace(/[^\d.,]/g, "").replace(/\s/g, "").replace(",", ".")) || 0;

export function CartProvider({ children }) {
  const [items, setItems] = useState([]); // { id, name, price:number, img, qty }
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
      return [...prev, { id, name: item.name, price, img: item.img || "", qty }];
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

  const count = items.reduce((s, x) => s + x.qty, 0);
  const total = items.reduce((s, x) => s + x.qty * x.price, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, setQty, clear, count, total, ready, isOpen, openCart, closeCart, toggleCart }}
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
