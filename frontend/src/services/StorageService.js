// ============================================================================
// SERVICE DE STOCKAGE - Gestion de toutes les données
// Compatible avec localStorage (navigateur standard)
// ============================================================================

export const StorageService = {
  // ========== PRODUITS ==========
  async getProducts() {
    try {
      const data = localStorage.getItem("yossfood-products");
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Erreur chargement produits:", error);
      return [];
    }
  },

  async saveProducts(products) {
    try {
      localStorage.setItem("yossfood-products", JSON.stringify(products));
      return true;
    } catch (error) {
      console.error("Erreur sauvegarde produits:", error);
      return false;
    }
  },

  async addProduct(product) {
    const products = await this.getProducts();
    const newProduct = {
      ...product,
      id: Date.now(),
      createdAt: new Date().toISOString()
    };
    products.push(newProduct);
    await this.saveProducts(products);
    return newProduct;
  },

  async updateProduct(id, updates) {
    const products = await this.getProducts();
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
      products[index] = { ...products[index], ...updates, updatedAt: new Date().toISOString() };
      await this.saveProducts(products);
      return products[index];
    }
    return null;
  },

  async deleteProduct(id) {
    const products = await this.getProducts();
    const filtered = products.filter(p => p.id !== id);
    await this.saveProducts(filtered);
    return true;
  },

  // ========== AVIS CLIENTS ==========
  async getReviews() {
    try {
      const data = localStorage.getItem("yossfood-reviews");
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Erreur chargement avis:", error);
      return [];
    }
  },

  async saveReviews(reviews) {
    try {
      localStorage.setItem("yossfood-reviews", JSON.stringify(reviews));
      return true;
    } catch (error) {
      console.error("Erreur sauvegarde avis:", error);
      return false;
    }
  },

  async addReview(review) {
    const reviews = await this.getReviews();
    const newReview = {
      ...review,
      id: Date.now(),
      date: new Date().toISOString(),
      approved: false // Par défaut non approuvé
    };
    reviews.push(newReview);
    await this.saveReviews(reviews);
    return newReview;
  },

  async updateReview(id, updates) {
    const reviews = await this.getReviews();
    const index = reviews.findIndex(r => r.id === id);
    if (index !== -1) {
      reviews[index] = { ...reviews[index], ...updates };
      await this.saveReviews(reviews);
      return reviews[index];
    }
    return null;
  },

  async toggleReviewApproval(id) {
    const reviews = await this.getReviews();
    const index = reviews.findIndex(r => r.id === id);
    if (index !== -1) {
      reviews[index].approved = !reviews[index].approved;
      await this.saveReviews(reviews);
      return reviews[index];
    }
    return null;
  },

  async deleteReview(id) {
    const reviews = await this.getReviews();
    const filtered = reviews.filter(r => r.id !== id);
    await this.saveReviews(filtered);
    return true;
  },

  // ========== COMMANDES ==========
  async getOrders() {
    try {
      const data = localStorage.getItem("yossfood-orders");
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Erreur chargement commandes:", error);
      return [];
    }
  },

  async saveOrders(orders) {
    try {
      localStorage.setItem("yossfood-orders", JSON.stringify(orders));
      return true;
    } catch (error) {
      console.error("Erreur sauvegarde commandes:", error);
      return false;
    }
  },

  async addOrder(order) {
    const orders = await this.getOrders();
    const newOrder = {
      ...order,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      status: "pending" // pending, preparing, delivering, completed, cancelled
    };
    orders.unshift(newOrder); // Ajouter au début
    await this.saveOrders(orders);
    return newOrder;
  },

  async updateOrderStatus(id, status) {
    const orders = await this.getOrders();
    const index = orders.findIndex(o => o.id === id);
    if (index !== -1) {
      orders[index].status = status;
      orders[index].updatedAt = new Date().toISOString();
      await this.saveOrders(orders);
      return orders[index];
    }
    return null;
  },

  async deleteOrder(id) {
    const orders = await this.getOrders();
    const filtered = orders.filter(o => o.id !== id);
    await this.saveOrders(filtered);
    return true;
  },

  // ========== STATISTIQUES ==========
  async getStats() {
    const orders = await this.getOrders();
    const products = await this.getProducts();
    const reviews = await this.getReviews();

    const completedOrders = orders.filter(o => o.status === "completed");
    const totalRevenue = completedOrders.reduce((sum, o) => sum + (o.total || 0), 0);
    const pendingOrders = orders.filter(o => o.status === "pending").length;
    const preparingOrders = orders.filter(o => o.status === "preparing").length;
    const deliveringOrders = orders.filter(o => o.status === "delivering").length;

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
    };
  },

  // ========== CONFIGURATION ==========
  async getConfig() {
    try {
      const data = localStorage.getItem("yossfood-config");
      return data ? JSON.parse(data) : {
        name: "Yoss Food",
        slogan: "L'Excellence Culinaire à Votre Service",
        phone: "691 17 54 80",
        phone2: "651 58 06 28",
        whatsapp: "237691175480",
        address: "Bonamoussadi, Carrefour Maison Blanche, Douala",
      };
    } catch (error) {
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
      localStorage.setItem("yossfood-config", JSON.stringify(config));
      return true;
    } catch (error) {
      console.error("Erreur sauvegarde config:", error);
      return false;
    }
  },

  // ========== INITIALISATION ==========
  async initializeData() {
    try {
      // Vérifier si les produits existent déjà
      let products = await this.getProducts();
      
      // Si vide, créer les produits initiaux
      if (products.length === 0) {
        console.log("Initialisation des produits...");
        const initialProducts = [
          {
            id: Date.now() + 1,
            name: "Burger Premium Signature",
            description: "Pain artisanal doré, viande Angus 200g, cheddar vieilli, laitue croquante",
            price: 2800,
            category: "Burgers",
            image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=400&fit=crop&q=80",
            popular: true,
            badge: "Best Seller",
            stock: 50,
            createdAt: new Date().toISOString()
          },
          {
            id: Date.now() + 2,
            name: "Shawarma Poulet Royal",
            description: "Poulet mariné aux épices orientales, pain libanais frais, sauce tahini crémeuse",
            price: 2200,
            category: "Shawarma",
            image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=600&h=400&fit=crop&q=80",
            popular: true,
            stock: 40,
            createdAt: new Date().toISOString()
          },
          {
            id: Date.now() + 3,
            name: "Poulet Braisé Premium",
            description: "Poulet fermier mariné 12h, grillé au charbon, frites maison",
            price: 3500,
            category: "Grillades",
            image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=600&h=400&fit=crop&q=80",
            stock: 30,
            createdAt: new Date().toISOString()
          }
        ];
        
        const saved = await this.saveProducts(initialProducts);
        if (saved) {
          console.log("✅ Produits initialisés avec succès");
          products = initialProducts;
        }
      }

      // Vérifier si les avis existent déjà
      let reviews = await this.getReviews();
      
      // Si vide, créer les avis initiaux
      if (reviews.length === 0) {
        console.log("Initialisation des avis...");
        const initialReviews = [
          {
            id: Date.now(),
            name: "Marie Kouam",
            role: "Cliente fidèle",
            rating: 5,
            comment: "Une qualité irréprochable ! Les saveurs sont authentiques et les portions généreuses.",
            avatar: "MK",
            date: new Date().toISOString(),
            approved: true
          },
          {
            id: Date.now() + 1,
            name: "Jean-Paul Mbida",
            role: "Entrepreneur",
            rating: 5,
            comment: "Service rapide et professionnel. La livraison est toujours à l'heure.",
            avatar: "JM",
            date: new Date().toISOString(),
            approved: true
          },
          {
            id: Date.now() + 2,
            name: "Fatima Bello",
            role: "Food Blogger",
            rating: 5,
            comment: "J'ai testé plusieurs restaurants, mais Yoss Food se démarque vraiment par la fraîcheur.",
            avatar: "FB",
            date: new Date().toISOString(),
            approved: true
          }
        ];
        
        const saved = await this.saveReviews(initialReviews);
        if (saved) {
          console.log("✅ Avis initialisés avec succès");
          reviews = initialReviews;
        }
      }

      return { products, reviews };
    } catch (error) {
      console.error("❌ Erreur lors de l'initialisation:", error);
      return { products: [], reviews: [] };
    }
  }
};

export default StorageService;