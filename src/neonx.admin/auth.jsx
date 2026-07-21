"use client";

import React, { useState, useEffect } from "react";

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASS || "neonx123"; // mot de passe via .env
const SESSION_DURATION = 60 * 1000; // 1 minute en millisecondes

export function ProtectedRoute({ children }) {
  const [authorized, setAuthorized] = useState(() => {
    if (typeof window === "undefined") return false;
    const auth = localStorage.getItem("neon.admin.auth") === "true";
    const timestamp = parseInt(localStorage.getItem("neon.admin.timestamp")) || 0;
    const now = Date.now();
    // Vérifie si la session est toujours valide
    if (auth && now - timestamp < SESSION_DURATION) return true;
    // Si expiré, on réinitialise
    localStorage.setItem("neon.admin.auth", "false");
    return false;
  });

  const [input, setInput] = useState("");

  // Déconnexion automatique après 1 minute
  useEffect(() => {
    if (authorized) {
      const timer = setTimeout(() => {
        localStorage.setItem("neon.admin.auth", "false");
        setAuthorized(false);
        alert("⏰ Votre session a expiré.");
      }, SESSION_DURATION);
      return () => clearTimeout(timer);
    }
  }, [authorized]);

  if (authorized) return children;

  const handleLogin = (e) => {
    e.preventDefault();
    if (input === ADMIN_PASSWORD) {
      localStorage.setItem("neon.admin.auth", "true");
      localStorage.setItem("neon.admin.timestamp", Date.now());
      setAuthorized(true);
    } else {
      alert("Mot de passe incorrect");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-900 text-white">
      <form onSubmit={handleLogin} className="bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl mb-4 font-bold">🔐 Accès Administration</h2>
        <input
          type="password"
          placeholder="Mot de passe"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="p-2 rounded w-full mb-4 text-black"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded"
        >
          Entrer
        </button>
      </form>
    </div>
  );
}
