import React, { useState, useEffect } from "react";

// Import des composants
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
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  
  // États du formulaire de connexion
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // Données
  const [config, setConfig] = useState(null);
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // Vérifier la session au démarrage
  useEffect(() => {
    checkSession();
    
    // Écouter les changements d'authentification
    const { data: { subscription } } = SupabaseService.onAuthStateChange(
      async (event, session, isAdmin) => {
        console.log('Auth event:', event, 'Is Admin:', isAdmin);
        
        if (session && isAdmin) {
          setSession(session);
          setUser(session.user);
          setIsAdmin(true);
          if (currentView === "public" || currentView === "admin-login") {
            setCurrentView("admin-dashboard");
          }
        } else if (event === 'SIGNED_OUT') {
          setSession(null);
          setUser(null);
          setIsAdmin(false);
          setCurrentView("public");
        }
      }
    );

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  // Charger les données au démarrage
  useEffect(() => {
    loadAllData();
  }, []);

  const checkSession = async () => {
    const sessionData = await SupabaseService.getSession();
    if (sessionData && sessionData.isAdmin) {
      setSession(sessionData.session);
      setUser(sessionData.user);
      setIsAdmin(true);
    }
  };

  const loadAllData = async () => {
    setLoading(true);
    try {
      console.log("🔄 Initialisation des données...");
      await SupabaseService.initializeData();
      
      await new Promise(resolve => setTimeout(resolve, 100));
      
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
  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    setIsLoading(true);

    try {
      const result = await SupabaseService.signIn(email, password);
      
      if (result.success && result.isAdmin) {
        setSession(result.session);
        setUser(result.user);
        setIsAdmin(true);
        setCurrentView("admin-dashboard");
        setEmail("");
        setPassword("");
      } else if (result.success && !result.isAdmin) {
        setLoginError("❌ Vous n'avez pas les droits d'administrateur");
        await SupabaseService.signOut();
      } else {
        setLoginError("❌ Email ou mot de passe incorrect");
      }
    } catch (error) {
      setLoginError("❌ Erreur de connexion: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await SupabaseService.signOut();
    setIsAdmin(false);
    setUser(null);
    setSession(null);
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
      await SupabaseService.updateOrderStatus(editingId, orderData.status);
    } else {
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
            <p className="text-gray-600">Connectez-vous avec votre compte</p>
            {user && (
              <p className="text-sm text-amber-600 mt-2">
                Connecté en tant que: {user.email}
              </p>
            )}
          </div>
          
          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="admin@yossfood.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-amber-600 focus:outline-none"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Mot de passe
              </label>
              <input
                type="password"
                placeholder="Entrez votre mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-amber-600 focus:outline-none"
              />
            </div>

            {loginError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl font-bold hover:from-amber-700 hover:to-amber-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Connexion..." : "Se connecter"}
            </button>
            
            <button
              type="button"
              onClick={() => setCurrentView("public")}
              className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
            >
              Retour au site
            </button>
          </form>

          <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-200">
            <p className="text-xs text-gray-600 text-center">
              💡 Créez votre compte admin via Supabase Dashboard
            </p>
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
          user={user}
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