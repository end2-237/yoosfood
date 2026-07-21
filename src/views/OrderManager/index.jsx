import React, { useState } from "react";
import { ArrowLeft, Search, Eye, X, Phone, Plus, Save, Trash2, ShoppingBag } from "lucide-react";

const OrdersManager = ({ orders, products, onSave, onBack }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isAddingOrder, setIsAddingOrder] = useState(false);
  const [formData, setFormData] = useState(null);

  const getStatusColor = (status) => {
    switch(status) {
      case "completed": return "bg-green-100 text-green-700";
      case "delivering": return "bg-blue-100 text-blue-700";
      case "preparing": return "bg-orange-100 text-orange-700";
      case "pending": return "bg-yellow-100 text-yellow-700";
      case "cancelled": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusLabel = (status) => {
    switch(status) {
      case "completed": return "✅ Complétée";
      case "delivering": return "🚚 En livraison";
      case "preparing": return "👨‍🍳 En préparation";
      case "pending": return "⏳ En attente";
      case "cancelled": return "❌ Annulée";
      default: return status;
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = (order.customerName?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
                         order.id.toString().includes(searchTerm);
    const matchesFilter = filterStatus === "all" || order.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleAddOrder = () => {
    setFormData({
      customerName: "",
      phone: "",
      address: "",
      items: [],
      notes: "",
      total: 0
    });
    setIsAddingOrder(true);
  };

  const handleAddItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { productId: products[0]?.id || "", quantity: 1 }]
    });
  };

  const handleRemoveItem = (index) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: newItems });
    calculateTotal({ ...formData, items: newItems });
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = value;
    setFormData({ ...formData, items: newItems });
    calculateTotal({ ...formData, items: newItems });
  };

  const calculateTotal = (data) => {
    const total = data.items.reduce((sum, item) => {
      const product = products.find(p => p.id === item.productId);
      return sum + (product ? product.price * item.quantity : 0);
    }, 0);
    setFormData({ ...data, total });
  };

  const handleSubmit = async () => {
    if (!formData.customerName || !formData.phone || formData.items.length === 0) {
      alert("Veuillez remplir tous les champs obligatoires");
      return;
    }

    const order = {
      ...formData,
      items: formData.items.map(item => {
        const product = products.find(p => p.id === item.productId);
        return {
          ...item,
          name: product?.name || "",
          price: product?.price || 0
        };
      })
    };

    await onSave(order);
    setIsAddingOrder(false);
    setFormData(null);
  };

  const handleStatusChange = async (orderId, newStatus) => {
    await onSave({ id: orderId, status: newStatus }, orderId);
  };

  const handleDeleteOrder = async (orderId) => {
    if (window.confirm("Supprimer cette commande ?")) {
      await onSave(null, orderId, true);
    }
  };

  if (isAddingOrder) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b shadow-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-3">
              <button onClick={() => setIsAddingOrder(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <ArrowLeft size={24} />
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Nouvelle Commande</h1>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
            <div className="space-y-6">
              {/* Informations client */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Informations client</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Nom du client *</label>
                    <input
                      type="text"
                      value={formData.customerName}
                      onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-amber-600 focus:outline-none"
                      placeholder="Ex: Jean Dupont"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Téléphone *</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-amber-600 focus:outline-none"
                      placeholder="Ex: 691 17 54 80"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Adresse de livraison</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-amber-600 focus:outline-none"
                    placeholder="Ex: Bonamoussadi, Carrefour..."
                  />
                </div>
              </div>

              {/* Articles */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Articles</h3>
                  <button
                    onClick={handleAddItem}
                    className="px-4 py-2 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700 flex items-center gap-2"
                  >
                    <Plus size={18} />
                    Ajouter article
                  </button>
                </div>

                {formData.items.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">Aucun article. Cliquez sur "Ajouter article"</p>
                ) : (
                  <div className="space-y-3">
                    {formData.items.map((item, index) => (
                      <div key={index} className="flex gap-3 items-center p-4 bg-gray-50 rounded-xl">
                        <select
                          value={item.productId}
                          onChange={(e) => handleItemChange(index, "productId", e.target.value)}
                          className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-amber-600 focus:outline-none"
                        >
                          {products.map(product => (
                            <option key={product.id} value={product.id}>
                              {product.name} - {product.price} XAF
                            </option>
                          ))}
                        </select>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => handleItemChange(index, "quantity", parseInt(e.target.value) || 1)}
                          className="w-24 px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-amber-600 focus:outline-none"
                          placeholder="Qté"
                        />
                        <button
                          onClick={() => handleRemoveItem(index)}
                          className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Notes (optionnel)</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-amber-600 focus:outline-none"
                  placeholder="Remarques, instructions spéciales..."
                />
              </div>

              {/* Total */}
              <div className="p-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border-2 border-amber-200">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-gray-900">Total de la commande</span>
                  <span className="text-3xl font-bold text-amber-700">{formData.total} XAF</span>
                </div>
              </div>

              {/* Boutons */}
              <div className="flex gap-3">
                <button
                  onClick={handleSubmit}
                  className="flex-1 py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl font-bold hover:from-amber-700 hover:to-amber-800 flex items-center justify-center gap-2"
                >
                  <Save size={20} />
                  Enregistrer la commande
                </button>
                <button
                  onClick={() => setIsAddingOrder(false)}
                  className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-300"
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
              <h1 className="text-2xl font-bold text-gray-900">Gestion des Commandes</h1>
            </div>
            <button
              onClick={handleAddOrder}
              className="px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl font-bold hover:from-amber-700 hover:to-amber-800 flex items-center gap-2"
            >
              <Plus size={20} />
              Nouvelle Commande
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Filtres */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Rechercher par nom ou numéro..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:border-amber-600 focus:outline-none"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-amber-600 focus:outline-none"
            >
              <option value="all">Tous les statuts</option>
              <option value="pending">En attente</option>
              <option value="preparing">En préparation</option>
              <option value="delivering">En livraison</option>
              <option value="completed">Complétées</option>
              <option value="cancelled">Annulées</option>
            </select>
          </div>
        </div>

        {/* Liste */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <ShoppingBag size={64} className="mx-auto text-gray-300 mb-4" />
            <p className="text-xl text-gray-600 mb-4">Aucune commande trouvée</p>
            <button
              onClick={handleAddOrder}
              className="px-6 py-3 bg-amber-600 text-white rounded-xl font-bold hover:bg-amber-700"
            >
              Ajouter une commande
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map(order => (
              <div key={order.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">Commande #{order.id}</h3>
                    <p className="text-gray-600">{order.customerName}</p>
                    <p className="text-sm text-gray-500">{order.phone}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-amber-700">{order.total} XAF</p>
                    <p className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleString('fr-FR')}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Statut</label>
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-amber-600 focus:outline-none font-semibold"
                  >
                    <option value="pending">⏳ En attente</option>
                    <option value="preparing">👨‍🍳 En préparation</option>
                    <option value="delivering">🚚 En livraison</option>
                    <option value="completed">✅ Complétée</option>
                    <option value="cancelled">❌ Annulée</option>
                  </select>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="flex-1 py-3 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-600 flex items-center justify-center gap-2"
                  >
                    <Eye size={20} />
                    Détails
                  </button>
                  <button
                    onClick={() => handleDeleteOrder(order.id)}
                    className="px-4 py-3 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal Détails */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedOrder(null)}>
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-900">Commande #{selectedOrder.id}</h3>
              <button onClick={() => setSelectedOrder(null)} className="p-2 hover:bg-gray-100 rounded-full">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-600 mb-1">Client</p>
                  <p className="font-bold text-gray-900">{selectedOrder.customerName}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-600 mb-1">Téléphone</p>
                  <p className="font-bold text-gray-900">{selectedOrder.phone}</p>
                </div>
              </div>

              {selectedOrder.address && (
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-600 mb-1">Adresse</p>
                  <p className="font-bold text-gray-900">{selectedOrder.address}</p>
                </div>
              )}

              <div>
                <p className="text-sm font-semibold text-gray-700 mb-3">Articles</p>
                <div className="space-y-2">
                  {selectedOrder.items?.map((item, idx) => (
                    <div key={idx} className="flex justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <p className="font-bold text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-600">Quantité: {item.quantity}</p>
                      </div>
                      <p className="font-bold text-gray-900">{(item.price * item.quantity)} XAF</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border-2 border-amber-200">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-gray-900">Total</span>
                  <span className="text-3xl font-bold text-amber-700">{selectedOrder.total} XAF</span>
                </div>
              </div>

              <a
                href={`https://wa.me/${selectedOrder.phone}?text=Bonjour, concernant votre commande #${selectedOrder.id}...`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 flex items-center justify-center gap-2"
              >
                <Phone size={20} />
                Contacter via WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersManager;