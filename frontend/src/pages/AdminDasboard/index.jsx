import React from "react";
import {
  Package, ShoppingBag, CheckCircle, Clock, DollarSign, TrendingUp,
  Users, Star, AlertCircle, Home as HomeIcon, BarChart3, MessageSquare
} from "lucide-react";

const AdminDashboard = ({ stats, orders, onNavigate, onLogout }) => {
  const recentOrders = orders.slice(0, 5);

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
      case "completed": return "Complétée";
      case "delivering": return "En livraison";
      case "preparing": return "En préparation";
      case "pending": return "En attente";
      case "cancelled": return "Annulée";
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-amber-800 rounded-xl flex items-center justify-center text-white font-bold">
                YF
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">Tableau de bord Yoss Food</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => onNavigate("public")} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 flex items-center gap-2">
                <HomeIcon size={18} />
                <span className="hidden sm:inline">Site Public</span>
              </button>
              <button onClick={onLogout} className="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600">
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto py-2">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold bg-amber-600 text-white">
              <BarChart3 size={18} />
              Tableau de bord
            </button>
            <button onClick={() => onNavigate("products")} className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200">
              <Package size={18} />
              Produits
            </button>
            <button onClick={() => onNavigate("orders")} className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200">
              <ShoppingBag size={18} />
              Commandes
            </button>
            <button onClick={() => onNavigate("reviews")} className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200">
              <MessageSquare size={18} />
              Avis
            </button>
          </div>
        </div>
      </div>

      {/* Contenu */}
      <div className="container mx-auto px-4 py-8">
        {/* Statistiques principales */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-blue-500">
            <div className="flex items-center justify-between mb-2">
              <Package className="text-blue-500" size={32} />
              <span className="text-3xl font-bold text-gray-900">{stats.totalProducts}</span>
            </div>
            <p className="text-gray-600 font-semibold">Produits actifs</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-orange-500">
            <div className="flex items-center justify-between mb-2">
              <ShoppingBag className="text-orange-500" size={32} />
              <span className="text-3xl font-bold text-gray-900">{stats.totalOrders}</span>
            </div>
            <p className="text-gray-600 font-semibold">Commandes totales</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-green-500">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="text-green-500" size={32} />
              <span className="text-3xl font-bold text-gray-900">{stats.completedOrders}</span>
            </div>
            <p className="text-gray-600 font-semibold">Complétées</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-amber-500">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="text-amber-500" size={32} />
              <span className="text-3xl font-bold text-gray-900">{stats.totalRevenue.toLocaleString()}</span>
            </div>
            <p className="text-gray-600 font-semibold">Revenu total (XAF)</p>
          </div>
        </div>

        {/* Statistiques secondaires */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <Clock size={32} />
              <span className="text-3xl font-bold">{stats.pendingOrders}</span>
            </div>
            <p className="font-semibold">En attente</p>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <Package size={32} />
              <span className="text-3xl font-bold">{stats.preparingOrders}</span>
            </div>
            <p className="font-semibold">En préparation</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp size={32} />
              <span className="text-3xl font-bold">{stats.averageOrderValue.toLocaleString()}</span>
            </div>
            <p className="font-semibold">Panier moyen (XAF)</p>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <Star size={32} />
              <span className="text-3xl font-bold">{stats.approvedReviews}</span>
            </div>
            <p className="font-semibold">Avis approuvés</p>
          </div>
        </div>

        {/* Commandes récentes */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">Commandes récentes</h3>
            <button onClick={() => onNavigate("orders")} className="text-amber-600 hover:text-amber-700 font-semibold">
              Voir tout →
            </button>
          </div>

          {recentOrders.length === 0 ? (
            <div className="text-center py-12">
              <AlertCircle size={64} className="mx-auto text-gray-300 mb-4" />
              <p className="text-xl text-gray-600">Aucune commande pour le moment</p>
              <p className="text-gray-500 mt-2">Les commandes apparaîtront ici quand les clients commanderont via WhatsApp</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentOrders.map(order => (
                <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <p className="font-bold text-gray-900">#{order.id}</p>
                      <span className={`text-xs px-3 py-1 rounded-full font-semibold ${getStatusColor(order.status)}`}>
                        {getStatusLabel(order.status)}
                      </span>
                    </div>
                    <p className="text-gray-600">{order.customerName || "Client"}</p>
                    <p className="text-sm text-gray-500">{order.items?.length || 0} article(s)</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-amber-700 text-xl">{order.total} XAF</p>
                    <p className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleDateString('fr-FR')}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info box */}
        <div className="mt-8 bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-500 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <AlertCircle className="text-amber-600 flex-shrink-0" size={24} />
            <div>
              <h4 className="font-bold text-gray-900 mb-2">💡 Comment fonctionnent les commandes ?</h4>
              <p className="text-gray-700 leading-relaxed">
                Les clients commandent directement via WhatsApp. Vous recevez leurs messages et pouvez ensuite 
                <span className="font-semibold text-amber-700"> ajouter manuellement les commandes</span> dans la section "Commandes" 
                pour un meilleur suivi et calcul automatique du chiffre d'affaires.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;