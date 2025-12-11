import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  "https://fvaqtwhecttpuoyadbxy.supabase.co";
const supabaseKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ2YXF0d2hlY3R0cHVveWFkYnh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUxNDE0MzcsImV4cCI6MjA4MDcxNzQzN30.fJ_JyL8q4b84A-61auPPHfBk7AtLj6wzhMMkUtyOx5A";

// Export du client Supabase pour l'authentification
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

export const SupabaseService = {
  // ============================================
  // AUTHENTIFICATION
  // ============================================

  /**
   * Connexion admin avec email et mot de passe
   */
  async signIn(email, password) {
    try {
      console.log("🔐 Tentative de connexion pour:", email);

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("❌ Erreur auth:", error);
        throw error;
      }

      console.log("✅ Authentification réussie!");
      console.log("👤 User ID:", data.user.id);
      console.log("📧 Email:", data.user.email);

      // Vérifier si l'utilisateur a le rôle admin
      const isAdmin = await this.checkAdminRole(data.user.id);

      console.log("🎭 Résultat final - Is Admin:", isAdmin);

      return {
        success: true,
        user: data.user,
        session: data.session,
        isAdmin,
      };
    } catch (error) {
      console.error("❌ Erreur connexion:", error);
      return {
        success: false,
        error: error.message,
      };
    }
  },

  /**
   * Déconnexion
   */
  async signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error("Erreur déconnexion:", error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Récupérer la session actuelle
   */
  async getSession() {
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error) throw error;

      if (session) {
        const isAdmin = await this.checkAdminRole(session.user.id);
        return {
          session,
          user: session.user,
          isAdmin,
        };
      }

      return null;
    } catch (error) {
      console.error("Erreur récupération session:", error);
      return null;
    }
  },

  /**
   * Vérifier si un utilisateur est admin
   */
  async checkAdminRole(userId) {
    try {
      console.log("🔍 Vérification du rôle pour userId:", userId);

      const { data, error } = await supabase
        .from("users")
        .select("role, email, full_name")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("❌ Erreur vérification rôle:", error);
        console.error("❌ Code erreur:", error.code);
        console.error("❌ Message:", error.message);
        console.error("❌ Details:", error.details);
        console.error("❌ Hint:", error.hint);
        console.log(
          "💡 L'utilisateur n'existe peut-être pas dans la table users"
        );
        console.log(
          "🔧 Solution: Exécutez le SQL pour créer l'utilisateur dans la table users"
        );
        return false;
      }

      console.log("✅ Données utilisateur:", data);
      console.log(
        `📋 Rôle: ${data?.role} | Is Admin: ${data?.role === "admin"}`
      );

      return data?.role === "admin";
    } catch (error) {
      console.error("❌ Exception vérification rôle:", error);
      return false;
    }
  },

  /**
   * Créer un compte admin (uniquement pour initialisation)
   */
  async createAdminAccount(email, password, fullName) {
    try {
      // 1. Créer l'utilisateur dans auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (authError) throw authError;

      // 2. Ajouter l'utilisateur dans la table users avec le rôle admin
      const { error: userError } = await supabase.from("users").insert([
        {
          id: authData.user.id,
          email,
          full_name: fullName,
          role: "admin",
          created_at: new Date().toISOString(),
        },
      ]);

      if (userError) throw userError;

      return {
        success: true,
        user: authData.user,
      };
    } catch (error) {
      console.error("Erreur création compte admin:", error);
      return {
        success: false,
        error: error.message,
      };
    }
  },

  /**
   * Écouter les changements d'authentification
   */
  onAuthStateChange(callback) {
    return supabase.auth.onAuthStateChange(async (event, session) => {
      let isAdmin = false;
      if (session?.user) {
        isAdmin = await this.checkAdminRole(session.user.id);
      }
      callback(event, session, isAdmin);
    });
  },

  // ============================================
  // PRODUITS
  // ============================================
  async getProducts() {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error("Erreur chargement produits:", error);
      return [];
    }
  },

  async addProduct(product) {
    try {
      console.log("📦 Ajout produit:", product);
      
      // ✅ Nettoyer l'objet et enlever l'ID s'il existe
      const cleanProduct = {
        name: product.name,
        description: product.description || "",
        price: product.price,
        category: product.category,
        image: product.image || "",
        popular: product.popular || false,
        badge: product.badge || "",
        stock: product.stock || 0,
        created_at: new Date().toISOString(),
      };

      console.log("🧹 Produit nettoyé:", cleanProduct);

      const { data, error } = await supabase
        .from("products")
        .insert([cleanProduct])
        .select();

      if (error) {
        console.error("❌ Erreur Supabase:", error);
        throw error;
      }

      console.log("✅ Produit créé:", data[0]);
      return data[0];
    } catch (error) {
      console.error("❌ Erreur ajout produit:", error);
      throw error; // ✅ Propager l'erreur au lieu de retourner null
    }
  },

  async updateProduct(id, updates) {
    try {
      const { data, error } = await supabase
        .from("products")
        .update(updates)
        .eq("id", id)
        .select();

      if (error) throw error;
      return data[0];
    } catch (error) {
      console.error("Erreur mise à jour produit:", error);
      return null;
    }
  },

  async deleteProduct(id) {
    try {
      const { error } = await supabase.from("products").delete().eq("id", id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error("Erreur suppression produit:", error);
      return false;
    }
  },

  // ============================================
  // AVIS
  // ============================================
  async getReviews() {
    try {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error("Erreur chargement avis:", error);
      return [];
    }
  },

  async addReview(review) {
    try {
      const { data, error } = await supabase
        .from("reviews")
        .insert([
          {
            ...review,
          },
        ])
        .select();

      if (error) throw error;
      return data[0];
    } catch (error) {
      console.error("Erreur ajout avis:", error);
      return null;
    }
  },

  async updateReview(id, updates) {
    try {
      const { data, error } = await supabase
        .from("reviews")
        .update(updates)
        .eq("id", id)
        .select();

      if (error) throw error;
      return data[0];
    } catch (error) {
      console.error("Erreur mise à jour avis:", error);
      return null;
    }
  },

  async toggleReviewApproval(id) {
    try {
      const { data: review } = await supabase
        .from("reviews")
        .select("approved")
        .eq("id", id)
        .single();

      const { data, error } = await supabase
        .from("reviews")
        .update({ approved: !review.approved })
        .eq("id", id)
        .select();

      if (error) throw error;
      return data[0];
    } catch (error) {
      console.error("Erreur approbation avis:", error);
      return null;
    }
  },

  async deleteReview(id) {
    try {
      const { error } = await supabase.from("reviews").delete().eq("id", id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error("Erreur suppression avis:", error);
      return false;
    }
  },

  // ============================================
  // COMMANDES
  // ============================================
  async getOrders() {
    try {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error("Erreur chargement commandes:", error);
      return [];
    }
  },

  async addOrder(order) {
    console.log("Donnees reçues", order);
    try {
      const { data, error } = await supabase
        .from("orders")
        .insert([
          {
            customer_name: order.customerName || order.customer_name,
            phone: order.phone,
            address: order.address || "",
            items: order.items || [],
            total: order.total || 0,
            status: order.status || "pending",
            notes: order.notes || "",
            status: order.status || "pending",
          },
        ])
        .select();

      if (error) throw error;
      return data[0];
    } catch (error) {
      console.error("Erreur ajout commande:", error);
      return null;
    }
  },

  async updateOrderStatus(id, status) {
    try {
      const { data, error } = await supabase
        .from("orders")
        .update({
          status,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select();

      if (error) throw error;
      return data[0];
    } catch (error) {
      console.error("Erreur mise à jour commande:", error);
      return null;
    }
  },

  async deleteOrder(id) {
    try {
      const { error } = await supabase.from("orders").delete().eq("id", id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error("Erreur suppression commande:", error);
      return false;
    }
  },

  // ============================================
  // STATS
  // ============================================
  async getStats() {
    try {
      const orders = await this.getOrders();
      const products = await this.getProducts();
      const reviews = await this.getReviews();

      const completedOrders = orders.filter((o) => o.status === "completed");
      const totalRevenue = completedOrders.reduce(
        (sum, o) => sum + (o.total || 0),
        0
      );
      const pendingOrders = orders.filter((o) => o.status === "pending").length;
      const preparingOrders = orders.filter(
        (o) => o.status === "preparing"
      ).length;
      const deliveringOrders = orders.filter(
        (o) => o.status === "delivering"
      ).length;

      return {
        totalProducts: products.length,
        totalOrders: orders.length,
        completedOrders: completedOrders.length,
        pendingOrders,
        preparingOrders,
        deliveringOrders,
        totalRevenue,
        averageOrderValue:
          completedOrders.length > 0
            ? totalRevenue / completedOrders.length
            : 0,
        totalReviews: reviews.length,
        approvedReviews: reviews.filter((r) => r.approved).length,
      };
    } catch (error) {
      console.error("Erreur calcul stats:", error);
      return {
        totalProducts: 0,
        totalOrders: 0,
        completedOrders: 0,
        pendingOrders: 0,
        preparingOrders: 0,
        deliveringOrders: 0,
        totalRevenue: 0,
        averageOrderValue: 0,
        totalReviews: 0,
        approvedReviews: 0,
      };
    }
  },

  // ============================================
  // CONFIG
  // ============================================
  async getConfig() {
    try {
      const { data, error } = await supabase
        .from("config")
        .select("*")
        .eq("id", 1)
        .single();

      if (error) throw error;
      return (
        data || {
          name: "Yoss Food",
          slogan: "L'Excellence Culinaire à Votre Service",
          phone: "691 17 54 80",
          phone2: "651 58 06 28",
          whatsapp: "237691175480",
          address: "Bonamoussadi, Carrefour Maison Blanche, Douala",
        }
      );
    } catch (error) {
      console.error("Erreur chargement config:", error);
      return {
        name: "Yoss Food",
        slogan: "L'Excellence Culinaire à Votre Service",
        phone: "691 17 54 80",
        phone2: "651 58 06 28",
        whatsapp: "237691175480",
        address: "Bonamoussadi, Carrefour Maison Blanche, Douala",
      };
    }
  },

  async saveConfig(config) {
    try {
      const { error } = await supabase
        .from("config")
        .update(config)
        .eq("id", 1);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error("Erreur sauvegarde config:", error);
      return false;
    }
  },

  // ============================================
  // INITIALISATION
  // ============================================
  async initializeData() {
    try {
      console.log("🔄 Vérification des données initiales...");

      const products = await this.getProducts();

      if (products.length === 0) {
        console.log("📦 Création des produits initiaux...");

        const initialProducts = [
          {
            name: "Burger Premium Signature",
            description:
              "Pain artisanal doré, viande Angus 200g, cheddar vieilli, laitue croquante",
            price: 2800,
            category: "Burgers",
            image:
              "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=400&fit=crop&q=80",
            popular: true,
            badge: "Best Seller",
            stock: 50,
          },
          {
            name: "Shawarma Poulet Royal",
            description:
              "Poulet mariné aux épices orientales, pain libanais frais, sauce tahini crémeuse",
            price: 2200,
            category: "Shawarma",
            image:
              "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=600&h=400&fit=crop&q=80",
            popular: true,
            stock: 40,
          },
          {
            name: "Poulet Braisé Premium",
            description:
              "Poulet fermier mariné 12h, grillé au charbon, frites maison",
            price: 3500,
            category: "Grillades",
            image:
              "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=600&h=400&fit=crop&q=80",
            stock: 30,
          },
        ];

        for (const product of initialProducts) {
          await this.addProduct(product);
        }

        console.log("✅ Produits initiaux créés");
      }

      const reviews = await this.getReviews();

      if (reviews.length === 0) {
        console.log("💬 Création des avis initiaux...");

        const initialReviews = [
          {
            name: "Marie Kouam",
            role: "Cliente fidèle",
            rating: 5,
            comment:
              "Une qualité irréprochable ! Les saveurs sont authentiques et les portions généreuses.",
            avatar: "MK",
            approved: true,
          },
          {
            name: "Jean-Paul Mbida",
            role: "Entrepreneur",
            rating: 5,
            comment:
              "Service rapide et professionnel. La livraison est toujours à l'heure.",
            avatar: "JM",
            approved: true,
          },
          {
            name: "Fatima Bello",
            role: "Food Blogger",
            rating: 5,
            comment:
              "J'ai testé plusieurs restaurants, mais Yoss Food se démarque vraiment par la fraîcheur.",
            avatar: "FB",
            approved: true,
          },
        ];

        for (const review of initialReviews) {
          await this.addReview(review);
        }

        console.log("✅ Avis initiaux créés");
      }

      console.log("✅ Initialisation terminée");
      return true;
    } catch (error) {
      console.error("❌ Erreur initialisation:", error);
      return false;
    }
  },
};

export default SupabaseService;
