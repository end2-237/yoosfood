import React, { useState, useEffect } from "react";

// Import des composants (dans un vrai projet, ces imports seraient vers des fichiers séparés)
import PublicSite from "./pages/Home";
import AdminDashboard from "./pages/AdminDasboard";
import ProductsManager from "./pages/ProductsManage";
import OrdersManager from "./pages/OrderManager";
import ReviewsManager from "./pages/ReviewManager";

import { SupabaseService } from "./services/SupabaseServices";

const YossFoodApp = () => {
  // États globaux
  const [currentView, setCurrentView] = useState("public");
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  
  // Données
  const [config, setConfig] = useState(null);
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // Charger toutes les données au démarrage
  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    setLoading(true);
    try {
      // D'abord initialiser les données si nécessaire
      console.log("🔄 Initialisation des données...");
      await SupabaseService.initializeData();
      
      // Attendre un peu pour que le stockage soit bien écrit
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Ensuite charger toutes les données
      console.log("📥 Chargement des données...");
      const [configData, productsData, reviewsData, ordersData, statsData] = await Promise.all([
        SupabaseService.getConfig(),
        SupabaseService.getProducts(),
        SupabaseService.getReviews(),
        SupabaseService.getOrders(),
        SupabaseService.getStats()
      ]);

      console.log("✅ Données chargées:", {
        config: configData,
        products: productsData.length,
        reviews: reviewsData.length,
        orders: ordersData.length
      });

      setConfig(configData);
      setProducts(productsData);
      setReviews(reviewsData);
      setOrders(ordersData);
      setStats(statsData);
    } catch (error) {
      console.error("❌ Erreur chargement données:", error);
      // En cas d'erreur, initialiser avec des valeurs par défaut
      setConfig({
        name: "Yoss Food",
        slogan: "L'Excellence Culinaire à Votre Service",
        phone: "691 17 54 80",
        phone2: "651 58 06 28",
        whatsapp: "237691175480",
        address: "Bonamoussadi, Carrefour Maison Blanche, Douala",
      });
      setProducts([]);
      setReviews([]);
      setOrders([]);
      setStats({
        totalProducts: 0,
        totalOrders: 0,
        completedOrders: 0,
        pendingOrders: 0,
        preparingOrders: 0,
        deliveringOrders: 0,
        totalRevenue: 0,
        averageOrderValue: 0,
        totalReviews: 0,
        approvedReviews: 0
      });
    } finally {
      setLoading(false);
    }
  };

  const refreshStats = async () => {
    const statsData = await SupabaseService.getStats();
    setStats(statsData);
  };

  // Gestion de l'authentification admin
  const handleAdminLogin = () => {
    if (adminPassword === "yoss2024") {
      setIsAdmin(true);
      setCurrentView("admin-dashboard");
      setAdminPassword("");
    } else {
      alert("❌ Mot de passe incorrect");
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    setCurrentView("public");
  };

  // Gestion des produits
  const handleSaveProduct = async (productData, editingId, isDelete = false) => {
    if (isDelete) {
      await SupabaseService.deleteProduct(editingId);
    } else if (editingId) {
      await SupabaseService.updateProduct(editingId, productData);
    } else {
      await SupabaseService.addProduct(productData);
    }
    
    const updatedProducts = await SupabaseService.getProducts();
    setProducts(updatedProducts);
    await refreshStats();
  };

  // Gestion des avis
  const handleSaveReview = async (reviewData, editingId, isDelete = false) => {
    if (isDelete) {
      await SupabaseService.deleteReview(editingId);
    } else if (editingId) {
      await SupabaseService.updateReview(editingId, reviewData);
    } else {
      await SupabaseService.addReview(reviewData);
    }
    
    const updatedReviews = await SupabaseService.getReviews();
    setReviews(updatedReviews);
    await refreshStats();
  };

  // Gestion des commandes
  const handleSaveOrder = async (orderData, editingId, isDelete = false) => {
    if (isDelete) {
      await SupabaseService.deleteOrder(editingId);
    } else if (editingId && orderData.status) {
      // Mise à jour du statut uniquement
      await SupabaseService.updateOrderStatus(editingId, orderData.status);
    } else {
      // Nouvelle commande
      await SupabaseService.addOrder(orderData);
    }
    
    const updatedOrders = await SupabaseService.getOrders();
    setOrders(updatedOrders);
    await refreshStats();
  };

  // Navigation
  const handleNavigate = (view) => {
    setCurrentView(view);
  };

  // Affichage du chargement
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-900 via-amber-800 to-orange-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-amber-900 font-bold text-3xl mx-auto mb-6 shadow-2xl animate-pulse">
            YF
          </div>
          <div className="flex gap-2 justify-center">
            <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{animationDelay: "0s"}}></div>
            <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{animationDelay: "0.2s"}}></div>
            <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{animationDelay: "0.4s"}}></div>
          </div>
        </div>
      </div>
    );
  }

  // Login admin
  if (!isAdmin && currentView !== "public") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-900 via-amber-800 to-orange-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full flex items-center justify-center text-white font-bold text-3xl mx-auto mb-4 shadow-lg">
              YF
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Admin Yoss Food</h2>
            <p className="text-gray-600">Connectez-vous pour gérer la plateforme</p>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Mot de passe</label>
              <input
                type="password"
                placeholder="Entrez le mot de passe admin"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAdminLogin()}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-amber-600 focus:outline-none"
              />
              <p className="text-xs text-gray-500 mt-2">💡 Mot de passe par défaut: yoss2024</p>
            </div>
            <button
              onClick={handleAdminLogin}
              className="w-full py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl font-bold hover:from-amber-700 hover:to-amber-800 transition-all"
            >
              Se connecter
            </button>
            <button
              onClick={() => setCurrentView("public")}
              className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
            >
              Retour au site
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Rendu des différentes vues
  switch (currentView) {
    case "public":
      return (
        <PublicSite
          config={config}
          products={products}
          reviews={reviews}
          onAdminClick={() => setCurrentView("admin-login")}
        />
      );

    case "admin-dashboard":
      return (
        <AdminDashboard
          stats={stats}
          orders={orders}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
        />
      );

    case "products":
      return (
        <ProductsManager
          products={products}
          onSave={handleSaveProduct}
          onBack={() => handleNavigate("admin-dashboard")}
        />
      );

    case "orders":
      return (
        <OrdersManager
          orders={orders}
          products={products}
          onSave={handleSaveOrder}
          onBack={() => handleNavigate("admin-dashboard")}
        />
      );

    case "reviews":
      return (
        <ReviewsManager
          reviews={reviews}
          onSave={handleSaveReview}
          onBack={() => handleNavigate("admin-dashboard")}
        />
      );

    default:
      return (
        <PublicSite
          config={config}
          products={products}
          reviews={reviews}
          onAdminClick={() => setCurrentView("admin-login")}
        />
      );
  }
};

export default YossFoodApp;