import React, { useState } from "react";
import { Plus, Edit2, Trash2, Save, X, ArrowLeft, CheckCircle, XCircle, Star, MessageSquare } from "lucide-react";

const ReviewsManager = ({ reviews, onSave, onBack }) => {
  const [editingReview, setEditingReview] = useState(null);
  const [formData, setFormData] = useState(null);

  const handleAdd = () => {
    const newReview = {
      name: "",
      role: "",
      rating: 5,
      comment: "",
      avatar: "",
      approved: false
    };
    setFormData(newReview);
    setEditingReview(null);
  };

  const handleEdit = (review) => {
    setFormData({...review});
    setEditingReview(review.id);
  };

  const handleCancel = () => {
    setFormData(null);
    setEditingReview(null);
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.comment) {
      alert("Veuillez remplir au moins le nom et le commentaire");
      return;
    }

    // Générer les initiales automatiquement si vide
    if (!formData.avatar) {
      const names = formData.name.split(" ");
      const initials = names.length >= 2 
        ? names[0][0] + names[1][0]
        : formData.name.substring(0, 2);
      formData.avatar = initials.toUpperCase();
    }

    await onSave(formData, editingReview);
    setFormData(null);
    setEditingReview(null);
  };

  const handleToggleApproval = async (id) => {
    const review = reviews.find(r => r.id === id);
    if (review) {
      await onSave({ ...review, approved: !review.approved }, id);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Supprimer cet avis ?")) {
      await onSave(null, id, true); // true = delete
    }
  };

  const approvedReviews = reviews.filter(r => r.approved);
  const pendingReviews = reviews.filter(r => !r.approved);

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
                {editingReview ? "Modifier" : "Nouvel"} Avis
              </h1>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-3xl mx-auto">
            <div className="space-y-6">
              {/* Nom et Rôle */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nom du client *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-amber-600 focus:outline-none"
                    placeholder="Ex: Marie Kouam"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Rôle/Profession
                  </label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-amber-600 focus:outline-none"
                    placeholder="Ex: Cliente fidèle"
                  />
                </div>
              </div>

              {/* Initiales */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Initiales (avatar)
                </label>
                <input
                  type="text"
                  value={formData.avatar}
                  onChange={(e) => setFormData({...formData, avatar: e.target.value.toUpperCase().substring(0, 2)})}
                  maxLength={2}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-amber-600 focus:outline-none"
                  placeholder="Ex: MK (laissez vide pour générer automatiquement)"
                />
                <p className="text-xs text-gray-500 mt-2">
                  💡 Les initiales seront générées automatiquement à partir du nom si vous laissez ce champ vide
                </p>
              </div>

              {/* Note */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Note (sur 5) *
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(n => (
                    <button
                      key={n}
                      onClick={() => setFormData({...formData, rating: n})}
                      className={`p-3 rounded-xl transition-all ${
                        formData.rating >= n 
                          ? "bg-amber-500 text-white" 
                          : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                      }`}
                    >
                      <Star size={24} className={formData.rating >= n ? "fill-current" : ""} />
                    </button>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Note sélectionnée : <span className="font-bold">{formData.rating}/5</span>
                </p>
              </div>

              {/* Commentaire */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Commentaire *
                </label>
                <textarea
                  value={formData.comment}
                  onChange={(e) => setFormData({...formData, comment: e.target.value})}
                  rows={5}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-amber-600 focus:outline-none"
                  placeholder="Le commentaire du client..."
                />
              </div>

              {/* Approuvé */}
              <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-xl">
                <input
                  type="checkbox"
                  id="approved"
                  checked={formData.approved}
                  onChange={(e) => setFormData({...formData, approved: e.target.checked})}
                  className="w-5 h-5 text-amber-600 rounded"
                />
                <label htmlFor="approved" className="text-sm font-semibold text-gray-700">
                  ✅ Approuver pour publication sur le site public
                </label>
              </div>

              {/* Aperçu */}
              <div className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border-2 border-amber-200">
                <p className="text-sm font-semibold text-gray-700 mb-4">📋 Aperçu</p>
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-xl">
                      {formData.avatar || formData.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900">{formData.name || "Nom du client"}</h4>
                      <p className="text-sm text-gray-600">{formData.role || "Rôle"}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">"{formData.comment || "Commentaire..."}"</p>
                  <div className="flex gap-1">
                    {[...Array(formData.rating)].map((_, i) => (
                      <Star key={i} className="text-amber-500 fill-amber-500" size={20} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Boutons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleSubmit}
                  className="flex-1 py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl font-bold hover:from-amber-700 hover:to-amber-800 flex items-center justify-center gap-2"
                >
                  <Save size={20} />
                  Enregistrer
                </button>
                <button
                  onClick={handleCancel}
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
              <h1 className="text-2xl font-bold text-gray-900">Gestion des Avis Clients</h1>
            </div>
            <button
              onClick={handleAdd}
              className="px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl font-bold hover:from-amber-700 hover:to-amber-800 flex items-center gap-2"
            >
              <Plus size={20} />
              Nouvel Avis
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Avis en attente */}
        {pendingReviews.length > 0 && (
          <div className="mb-8">
            <div className="bg-orange-100 border-l-4 border-orange-500 rounded-xl p-4 mb-4">
              <div className="flex items-center gap-2">
                <XCircle className="text-orange-600" size={24} />
                <h3 className="text-lg font-bold text-orange-900">
                  {pendingReviews.length} avis en attente d'approbation
                </h3>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pendingReviews.map(review => (
                <div key={review.id} className="bg-white rounded-2xl shadow-lg p-6 border-2 border-orange-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-xl">
                      {review.avatar}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900">{review.name}</h4>
                      <p className="text-sm text-gray-600">{review.role}</p>
                    </div>
                  </div>
                  <div className="flex gap-1 mb-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="text-amber-500 fill-amber-500" size={16} />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4">"{review.comment}"</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleToggleApproval(review.id)}
                      className="flex-1 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 flex items-center justify-center gap-2"
                    >
                      <CheckCircle size={16} />
                      Approuver
                    </button>
                    <button
                      onClick={() => handleEdit(review)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(review.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Avis approuvés */}
        <div>
          <div className="bg-green-100 border-l-4 border-green-500 rounded-xl p-4 mb-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="text-green-600" size={24} />
              <h3 className="text-lg font-bold text-green-900">
                {approvedReviews.length} avis approuvés (visibles sur le site)
              </h3>
            </div>
          </div>

          {approvedReviews.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <MessageSquare size={64} className="mx-auto text-gray-300 mb-4" />
              <p className="text-xl text-gray-600 mb-4">Aucun avis approuvé pour le moment</p>
              <button
                onClick={handleAdd}
                className="px-6 py-3 bg-amber-600 text-white rounded-xl font-bold hover:bg-amber-700"
              >
                Ajouter le premier avis
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {approvedReviews.map(review => (
                <div key={review.id} className="bg-white rounded-2xl shadow-lg p-6 border-2 border-green-200">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-xl">
                      {review.avatar}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900">{review.name}</h4>
                      <p className="text-sm text-gray-600">{review.role}</p>
                    </div>
                  </div>
                  <div className="flex gap-1 mb-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="text-amber-500 fill-amber-500" size={16} />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4">"{review.comment}"</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleToggleApproval(review.id)}
                      className="flex-1 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 flex items-center justify-center gap-2"
                    >
                      <XCircle size={16} />
                      Masquer
                    </button>
                    <button
                      onClick={() => handleEdit(review)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(review.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewsManager;