import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://fvaqtwhecttpuoyadbxy.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ2YXF0d2hlY3R0cHVveWFkYnh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUxNDE0MzcsImV4cCI6MjA4MDcxNzQzN30.fJ_JyL8q4b84A-61auPPHfBk7AtLj6wzhMMkUtyOx5A'

// Export du client Supabase pour l'authentification
export const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: true, // Persiste la session dans le navigateur
      autoRefreshToken: true, // Rafraîchit automatiquement le token
      detectSessionInUrl: true
    }
  })

export const SupabaseService = {
  // PRODUITS
  async getProducts() {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return data || []
    } catch (error) {
      console.error("Erreur chargement produits:", error)
      return []
    }
  },

  async saveProducts(products) {
    // Pas utilisé avec Supabase (on fait addProduct/updateProduct à la place)
    return true
  },

  async addProduct(product) {
    try {
      const { data, error } = await supabase
        .from('products')
        .insert([{
          ...product,
          created_at: new Date().toISOString()
        }])
        .select()
      
      if (error) throw error
      return data[0]
    } catch (error) {
      console.error("Erreur ajout produit:", error)
      return null
    }
  },

  async updateProduct(id, updates) {
    try {
      const { data, error } = await supabase
        .from('products')
        .update(updates)
        .eq('id', id)
        .select()
      
      if (error) throw error
      return data[0]
    } catch (error) {
      console.error("Erreur mise à jour produit:", error)
      return null
    }
  },

  async deleteProduct(id) {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      return true
    } catch (error) {
      console.error("Erreur suppression produit:", error)
      return false
    }
  },

  // AVIS
  async getReviews() {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return data || []
    } catch (error) {
      console.error("Erreur chargement avis:", error)
      return []
    }
  },

  async saveReviews(reviews) {
    return true
  },

  async addReview(review) {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .insert([{
          ...review,
          date: new Date().toISOString()
        }])
        .select()
      
      if (error) throw error
      return data[0]
    } catch (error) {
      console.error("Erreur ajout avis:", error)
      return null
    }
  },

  async updateReview(id, updates) {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .update(updates)
        .eq('id', id)
        .select()
      
      if (error) throw error
      return data[0]
    } catch (error) {
      console.error("Erreur mise à jour avis:", error)
      return null
    }
  },

  async toggleReviewApproval(id) {
    try {
      // D'abord récupérer l'avis actuel
      const { data: review } = await supabase
        .from('reviews')
        .select('approved')
        .eq('id', id)
        .single()
      
      // Inverser le statut
      const { data, error } = await supabase
        .from('reviews')
        .update({ approved: !review.approved })
        .eq('id', id)
        .select()
      
      if (error) throw error
      return data[0]
    } catch (error) {
      console.error("Erreur approbation avis:", error)
      return null
    }
  },

  async deleteReview(id) {
    try {
      const { error } = await supabase
        .from('reviews')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      return true
    } catch (error) {
      console.error("Erreur suppression avis:", error)
      return false
    }
  },

  // COMMANDES
  async getOrders() {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return data || []
    } catch (error) {
      console.error("Erreur chargement commandes:", error)
      return []
    }
  },

  async saveOrders(orders) {
    return true
  },

  async addOrder(order) {
    try {
      const { data, error } = await supabase
        .from('orders')
        .insert([{
          ...order,
          created_at: new Date().toISOString(),
          status: order.status || 'pending'
        }])
        .select()
      
      if (error) throw error
      return data[0]
    } catch (error) {
      console.error("Erreur ajout commande:", error)
      return null
    }
  },

  async updateOrderStatus(id, status) {
    try {
      const { data, error } = await supabase
        .from('orders')
        .update({ 
          status, 
          updated_at: new Date().toISOString() 
        })
        .eq('id', id)
        .select()
      
      if (error) throw error
      return data[0]
    } catch (error) {
      console.error("Erreur mise à jour commande:", error)
      return null
    }
  },

  async deleteOrder(id) {
    try {
      const { error } = await supabase
        .from('orders')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      return true
    } catch (error) {
      console.error("Erreur suppression commande:", error)
      return false
    }
  },

  // STATS
  async getStats() {
    try {
      const orders = await this.getOrders()
      const products = await this.getProducts()
      const reviews = await this.getReviews()

      const completedOrders = orders.filter(o => o.status === 'completed')
      const totalRevenue = completedOrders.reduce((sum, o) => sum + (o.total || 0), 0)
      const pendingOrders = orders.filter(o => o.status === 'pending').length
      const preparingOrders = orders.filter(o => o.status === 'preparing').length
      const deliveringOrders = orders.filter(o => o.status === 'delivering').length

      return {
        totalProducts: products.length,
        totalOrders: orders.length,
        completedOrders: completedOrders.length,
        pendingOrders,
        preparingOrders,
        deliveringOrders,
        totalRevenue,
        averageOrderValue: completedOrders.length > 0 ? totalRevenue / completedOrders.length : 0,
        totalReviews: reviews.length,
        approvedReviews: reviews.filter(r => r.approved).length
      }
    } catch (error) {
      console.error("Erreur calcul stats:", error)
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
        approvedReviews: 0
      }
    }
  },

  // CONFIG
  async getConfig() {
    try {
      const { data, error } = await supabase
        .from('config')
        .select('*')
        .eq('id', 1)
        .single()
      
      if (error) throw error
      return data || {
        name: "Yoss Food",
        slogan: "L'Excellence Culinaire à Votre Service",
        phone: "691 17 54 80",
        phone2: "651 58 06 28",
        whatsapp: "237691175480",
        address: "Bonamoussadi, Carrefour Maison Blanche, Douala",
      }
    } catch (error) {
      console.error("Erreur chargement config:", error)
      return {
        name: "Yoss Food",
        slogan: "L'Excellence Culinaire à Votre Service",
        phone: "691 17 54 80",
        phone2: "651 58 06 28",
        whatsapp: "237691175480",
        address: "Bonamoussadi, Carrefour Maison Blanche, Douala",
      }
    }
  },

  async saveConfig(config) {
    try {
      const { error } = await supabase
        .from('config')
        .update(config)
        .eq('id', 1)
      
      if (error) throw error
      return true
    } catch (error) {
      console.error("Erreur sauvegarde config:", error)
      return false
    }
  },

  // INITIALISATION
  async initializeData() {
    try {
      console.log("🔄 Vérification des données initiales...");
      
      // Vérifier si des produits existent
      const products = await this.getProducts()
      
      if (products.length === 0) {
        console.log("📦 Création des produits initiaux...");
        
        const initialProducts = [
          {
            name: "Burger Premium Signature",
            description: "Pain artisanal doré, viande Angus 200g, cheddar vieilli, laitue croquante",
            price: 2800,
            category: "Burgers",
            image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=400&fit=crop&q=80",
            popular: true,
            badge: "Best Seller",
            stock: 50
          },
          {
            name: "Shawarma Poulet Royal",
            description: "Poulet mariné aux épices orientales, pain libanais frais, sauce tahini crémeuse",
            price: 2200,
            category: "Shawarma",
            image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=600&h=400&fit=crop&q=80",
            popular: true,
            stock: 40
          },
          {
            name: "Poulet Braisé Premium",
            description: "Poulet fermier mariné 12h, grillé au charbon, frites maison",
            price: 3500,
            category: "Grillades",
            image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=600&h=400&fit=crop&q=80",
            stock: 30
          }
        ]

        for (const product of initialProducts) {
          await this.addProduct(product)
        }
        
        console.log("✅ Produits initiaux créés");
      }

      // Vérifier si des avis existent
      const reviews = await this.getReviews()
      
      if (reviews.length === 0) {
        console.log("💬 Création des avis initiaux...");
        
        const initialReviews = [
          {
            name: "Marie Kouam",
            role: "Cliente fidèle",
            rating: 5,
            comment: "Une qualité irréprochable ! Les saveurs sont authentiques et les portions généreuses.",
            avatar: "MK",
            approved: true
          },
          {
            name: "Jean-Paul Mbida",
            role: "Entrepreneur",
            rating: 5,
            comment: "Service rapide et professionnel. La livraison est toujours à l'heure.",
            avatar: "JM",
            approved: true
          },
          {
            name: "Fatima Bello",
            role: "Food Blogger",
            rating: 5,
            comment: "J'ai testé plusieurs restaurants, mais Yoss Food se démarque vraiment par la fraîcheur.",
            avatar: "FB",
            approved: true
          }
        ]

        for (const review of initialReviews) {
          await this.addReview(review)
        }
        
        console.log("✅ Avis initiaux créés");
      }

      console.log("✅ Initialisation terminée");
      return true
    } catch (error) {
      console.error("❌ Erreur initialisation:", error)
      return false
    }
  }
}

export default SupabaseService