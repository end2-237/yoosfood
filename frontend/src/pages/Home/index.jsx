import React, { useState } from "react";
import Header from "../../components/Header";
import HeroSection from "../../components/HeroSection";
import PromoSection from "../../components/PromotionSection";
import MenuSection from "../../components/MenuSection";
import ReviewsSection from "../../components/ReviewsSection";
import ContactSection from "../../components/ContactSection";
import Footer from "../../components/FooterSection";
import ProductDetailModal from "../ProductsDetails";

const PublicSite = ({ config, products, reviews, onAdminClick }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Données des promotions (à déplacer dans la BDD plus tard)
  const promos = [
    {
      id: 1,
      savings: "25%",
      title: "Spécial Noël",
      description:
        "Profitez de la promo Noël familiale pour bénéficier de notre menu Poulet Sauce Cheddar.",
      oldPrice: 8000,
      newPrice: 6000,
      valid: "Jusqu'au 31 Décembre",
    },
    {
      id: 2,
      savings: "20%",
      title: "Menu Famille",
      description:
        "Le menu parfait pour partager des moments inoubliables en famille.",
      oldPrice: 10000,
      newPrice: 8000,
      valid: "Tous les weekends",
    },
  ];

  // Fonction pour ouvrir WhatsApp avec un message pré-rempli
  const handleWhatsAppOrder = (itemName = "", itemPrice = "") => {
    const message = itemName
      ? `Bonjour Yoss Food ! Je souhaite commander :\n\n${itemName}${
          itemPrice ? `\nPrix: ${itemPrice} XAF` : ""
        }\n\nMerci !`
      : `Bonjour Yoss Food ! Je souhaite passer une commande.`;
    
    window.open(
      `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Modal Détails Produit */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          config={config}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {/* Header */}
      <Header
        config={config}
        onAdminClick={onAdminClick}
        onOrderClick={() => handleWhatsAppOrder()}
      />

      {/* Hero Section */}
      <HeroSection onOrderClick={() => handleWhatsAppOrder()} />

      {/* Promo Section */}
      <PromoSection
        promos={promos}
        onOrderClick={(itemName) => handleWhatsAppOrder(itemName)}
      />

      {/* Menu Section */}
      <MenuSection
        products={products}
        onProductClick={setSelectedProduct}
      />

      {/* Reviews Section */}
      <ReviewsSection reviews={reviews} />

      {/* Contact Section */}
      <ContactSection
        config={config}
        onOrderClick={() => handleWhatsAppOrder()}
      />

      {/* Footer */}
      <Footer config={config} />
    </div>
  );
};

export default PublicSite;