import React, { useState } from "react";
import { Plus, Edit2, Trash2, Save, X, ArrowLeft, Package } from "lucide-react";

const ProductsManager = ({ products, onSave, onBack }) => {
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const categories = ["Burgers", "Poulet", "Menu Composé", "Supplements"];

  const handleAdd = () => {
    const newProduct = {
      name: "",
      description: "",
      price: 0,
      category: "Poulet",
      image: "",
      popular: false,
      badge: "",
      stock: 0
    };
    setFormData(newProduct);
    setEditingProduct(null);
  };

  const handleEdit = (product) => {
    // ✅ Ne pas inclure l'ID dans formData pour éviter les conflits
    const { id, created_at, ...productData } = product;
    setFormData(productData);
    setEditingProduct(id);
  };

  const handleCancel = () => {
    setFormData(null);
    setEditingProduct(null);
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.price || !formData.category) {
      alert("Veuillez remplir tous les champs obligatoires (Nom, Prix, Catégorie)");
      return;
    }

    setIsSaving(true);
    try {
      // ✅ Ne pas passer l'ID dans les données du produit
      const productData = {
        name: formData.name,
        description: formData.description,
        price: formData.price,
        category: formData.category,
        image: formData.image,
        popular: formData.popular,
        badge: formData.badge,
        stock: formData.stock
      };

      console.log("💾 Sauvegarde produit:", productData);
      await onSave(productData, editingProduct);
      
      setFormData(null);
      setEditingProduct(null);
      alert("✅ Produit enregistré avec succès !");
    } catch (error) {
      console.error("❌ Erreur sauvegarde:", error);
      alert("❌ Erreur lors de l'enregistrement: " + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Supprimer ce produit ?")) {
      try {
        await onSave(null, id, true); // true = delete
        alert("✅ Produit supprimé avec succès !");
      } catch (error) {
        console.error("❌ Erreur suppression:", error);
        alert("❌ Erreur lors de la suppression: " + error.message);
      }
    }
  };

  if (formData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b shadow-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-3">
              <button onClick={handleCancel} className="p-2 hover:bg-gray-100 rounded-lg">
                <ArrowLeft size={24} />
              </button>
              <h1 className="text-2xl font-bold text-gray-900">
                {editingProduct ? "Modifier" : "Nouveau"} Produit
              </h1>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-3xl mx-auto">
            <div className="space-y-6">
              {/* Nom */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nom du produit *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-amber-600 focus:outline-none"
                  placeholder="Ex: Burger Premium"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-amber-600 focus:outline-none"
                  placeholder="Description détaillée du produit"
                />
              </div>

              {/* Prix et Stock */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Prix (XAF) *
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: parseInt(e.target.value) || 0})}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-amber-600 focus:outline-none"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Stock disponible
                  </label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({...formData, stock: parseInt(e.target.value) || 0})}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-amber-600 focus:outline-none"
                    min="0"
                  />
                </div>
              </div>

              {/* Catégorie et Badge */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Catégorie *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-amber-600 focus:outline-none"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Badge (optionnel)
                  </label>
                  <input
                    type="text"
                    value={formData.badge}
                    onChange={(e) => setFormData({...formData, badge: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-amber-600 focus:outline-none"
                    placeholder="Ex: Nouveau, Best Seller"
                  />
                </div>
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  URL de l'image
                </label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-amber-600 focus:outline-none"
                  placeholder="https://..."
                />
                {formData.image && (
                  <div className="mt-3">
                    <img 
                      src={formData.image} 
                      alt="Aperçu" 
                      className="w-40 h-40 object-cover rounded-xl border-2 border-gray-200"
                      onError={(e) => e.target.style.display = 'none'}
                    />
                  </div>
                )}
                <p className="text-xs text-gray-500 mt-2">
                  💡 Astuce : Utilisez des images Unsplash (ex: https://images.unsplash.com/photo-...)
                </p>
              </div>

              {/* Populaire */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="popular"
                  checked={formData.popular}
                  onChange={(e) => setFormData({...formData, popular: e.target.checked})}
                  className="w-5 h-5 text-amber-600 rounded"
                />
                <label htmlFor="popular" className="text-sm font-semibold text-gray-700">
                  Marquer comme populaire
                </label>
              </div>

              {/* Boutons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleSubmit}
                  disabled={isSaving}
                  className="flex-1 py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl font-bold hover:from-amber-700 hover:to-amber-800 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save size={20} />
                  {isSaving ? "Enregistrement..." : "Enregistrer"}
                </button>
                <button
                  onClick={handleCancel}
                  disabled={isSaving}
                  className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-300 disabled:opacity-50"
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg">
                <ArrowLeft size={24} />
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Gestion des Produits</h1>
            </div>
            <button
              onClick={handleAdd}
              className="px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl font-bold hover:from-amber-700 hover:to-amber-800 flex items-center gap-2"
            >
              <Plus size={20} />
              Nouveau Produit
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {products.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <Package size={64} className="mx-auto text-gray-300 mb-4" />
            <p className="text-xl text-gray-600 mb-4">Aucun produit pour le moment</p>
            <button
              onClick={handleAdd}
              className="px-6 py-3 bg-amber-600 text-white rounded-xl font-bold hover:bg-amber-700"
            >
              Ajouter votre premier produit
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(product => (
              <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all">
                <div className="relative h-48">
                  {product.image ? (
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23f3f4f6' width='400' height='300'/%3E%3Ctext fill='%239ca3af' x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='18'%3EImage non disponible%3C/text%3E%3C/svg%3E";
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                      <Package size={48} />
                    </div>
                  )}
                  {product.badge && (
                    <div className="absolute top-3 right-3 px-3 py-1 bg-amber-500 text-white text-xs font-bold rounded-full">
                      {product.badge}
                    </div>
                  )}
                  {product.popular && (
                    <div className="absolute top-3 left-3 px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                      Populaire
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-xs text-gray-500">Prix</p>
                      <p className="text-2xl font-bold text-amber-700">{product.price} XAF</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Stock</p>
                      <p className="text-lg font-semibold text-gray-900">{product.stock || 0}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="flex-1 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 flex items-center justify-center gap-2"
                    >
                      <Edit2 size={16} />
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="flex-1 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 flex items-center justify-center gap-2"
                    >
                      <Trash2 size={16} />
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsManager;